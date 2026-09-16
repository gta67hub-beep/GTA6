import Link from "next/link";

async function getNews(slug: string) {
  const res = await fetch(`http://localhost:3000/api/news/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNews(slug);

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Not found</h1>
          <Link href="/" className="text-red-500 hover:text-red-400">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-gray-400 hover:text-white text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
              {news.category}
            </span>
            <span className="text-gray-500 text-sm">
              {new Date(news.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">{news.title}</h1>

          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>Source: {news.source}</span>
            <span>•</span>
            <span>{news.views.toLocaleString()} views</span>
            <span>•</span>
            <span>{news.likes.toLocaleString()} likes</span>
          </div>
        </header>

        {news.coverImage && (
          <div className="mb-8">
            <img
              src={news.coverImage}
              alt={news.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 mb-6">{news.description}</p>

          <div
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>

        <footer className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">
              Published on{" "}
              {new Date(news.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <a
              href={news.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 text-sm"
            >
              View original source →
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
}
