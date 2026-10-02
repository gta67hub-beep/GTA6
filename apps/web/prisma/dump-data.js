const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  const [news, tips, vehicles, characters, locations, weapons] = await Promise.all([
    prisma.news.findMany({ orderBy: { publishedAt: "desc" } }),
    prisma.tip.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.vehicle.findMany(),
    prisma.character.findMany(),
    prisma.location.findMany(),
    prisma.weapon.findMany(),
  ]);

  const data = { news, tips, vehicles, characters, locations, weapons };

  const outDir = path.join(__dirname, "..", "src", "data");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "static-data.json"), JSON.stringify(data, null, 2));

  console.log("Dumped:", Object.entries(data).map(([k, v]) => `${k}=${v.length}`).join(", "));
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
