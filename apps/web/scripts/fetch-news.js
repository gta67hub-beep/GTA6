const { PrismaClient } = require("@prisma/client");
const Parser = require("rss-parser");

const prisma = new PrismaClient();
const parser = new Parser();

const RSS_FEEDS = [
  {
    name: "Rockstar Newswire",
    url: "https://www.rockstargames.com/newswire/rss",
    category: "rockstar",
    source: "Rockstar Games",
  },
  {
    name: "IGN GTA",
    url: "https://feeds.feedburner.com/ign/games-all",
    category: "gta6",
    source: "IGN",
  },
  {
    name: "GameSpot",
    url: "https://www.gamespot.com/feeds/mashup/",
    category: "gameplay",
    source: "GameSpot",
  },
  {
    name: "Kotaku",
    url: "https://kotaku.com/rss",
    category: "community",
    source: "Kotaku",
  },
  {
    name: "Polygon",
    url: "https://www.polygon.com/rss/index.xml",
    category: "updates",
    source: "Polygon",
  },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 100);
}

async function fetchFromFeed(feed) {
  try {
    // Check if we recently fetched from this source (within 2 hours)
    const recentFromSource = await prisma.news.findFirst({
      where: {
        source: feed.source,
        createdAt: {
          gte: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
      },
      select: { id: true },
    });

    if (recentFromSource) {
      console.log(`Skipping ${feed.name} (fetched recently)`);
      return 0;
    }

    console.log(`Fetching from ${feed.name}...`);
    const feedData = await parser.parseURL(feed.url);

    const articles = feedData.items
      .filter(
        (item) =>
          item.title &&
          item.link &&
          (item.title.toLowerCase().includes("gta") ||
            item.title.toLowerCase().includes("grand theft auto") ||
            item.title.toLowerCase().includes("rockstar") ||
            item.title.toLowerCase().includes("leonida"))
      )
      .slice(0, 5); // Max 5 articles per feed

    console.log(`  Found ${articles.length} relevant articles`);

    let created = 0;
    for (const article of articles) {
      const slug = slugify(article.title);

      // Check if article already exists by slug
      const existingBySlug = await prisma.news.findUnique({
        where: { slug },
      });

      if (existingBySlug) {
        console.log(`  Skipped (duplicate slug): ${article.title}`);
        continue;
      }

      // Check if article already exists by URL
      const existingByUrl = await prisma.news.findFirst({
        where: { sourceUrl: article.link },
      });

      if (existingByUrl) {
        console.log(`  Skipped (duplicate URL): ${article.title}`);
        continue;
      }

      // Check if similar title already exists (fuzzy match)
      const allNews = await prisma.news.findMany({
        select: { title: true, slug: true },
      });
      
      const similarTitle = allNews.find(n => {
        const existingWords = n.title.toLowerCase().split(' ');
        const newWords = article.title.toLowerCase().split(' ');
        const commonWords = existingWords.filter(w => newWords.includes(w) && w.length > 3);
        return commonWords.length >= Math.min(existingWords.length, newWords.length) * 0.6;
      });

      if (similarTitle) {
        console.log(`  Skipped (similar title): ${article.title} ~= ${similarTitle.title}`);
        continue;
      }

      try {
        await prisma.news.create({
          data: {
            title: article.title,
            slug: slug,
            description: article.contentSnippet || article.title,
            content: article.content || article.contentSnippet || "",
            category: feed.category,
            source: feed.source,
            sourceUrl: article.link,
            publishedAt: article.pubDate
              ? new Date(article.pubDate)
              : new Date(),
            views: 0,
            likes: 0,
            trendingScore: 50,
            status: "published",
            coverImage: `/GTAVI_Screenshots/Places/Vice City/Vice_City_0${(created % 10) + 1}.jpg`,
          },
        });
        created++;
        console.log(`  Created: ${article.title}`);
      } catch (error) {
        console.error(`  Error creating article: ${error.message}`);
      }
    }

    return created;
  } catch (error) {
    console.error(`  Error fetching ${feed.name}: ${error.message}`);
    return 0;
  }
}

async function main() {
  console.log("=== GTA 6 News Fetcher ===\n");

  // Check current news count and limit
  const currentCount = await prisma.news.count();
  console.log(`Current news in database: ${currentCount}`);
  
  if (currentCount >= 50) {
    console.log("Database has 50+ news articles. Cleaning old ones...");
    // Keep only the 20 most viewed articles, delete the rest
    const topArticles = await prisma.news.findMany({
      orderBy: { views: 'desc' },
      take: 20,
      select: { id: true },
    });
    const topIds = topArticles.map(a => a.id);
    
    await prisma.news.deleteMany({
      where: {
        id: { notIn: topIds },
        source: { notIn: ['Rockstar Games'] }, // Never delete official Rockstar news
      },
    });
    console.log("Old articles cleaned.");
  }

  let totalCreated = 0;

  for (const feed of RSS_FEEDS) {
    const created = await fetchFromFeed(feed);
    totalCreated += created;
  }

  console.log(`\n=== Done! Created ${totalCreated} new articles ===`);

  // Update trending scores
  console.log("\nUpdating trending scores...");
  await prisma.news.updateMany({
    data: {
      trendingScore: {
        increment: 1,
      },
    },
  });

  // Update view counts with random numbers
  const news = await prisma.news.findMany();
  for (const item of news) {
    await prisma.news.update({
      where: { id: item.id },
      data: {
        views: item.views + Math.floor(Math.random() * 100),
        likes: item.likes + Math.floor(Math.random() * 50),
      },
    });
  }

  console.log("Trending scores updated!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
