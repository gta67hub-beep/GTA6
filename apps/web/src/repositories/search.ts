import { prisma } from "@/database/client";

export interface SearchResult {
  type: string;
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
}

export const searchRepository = {
  async search(query: string, category?: string): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const searchFilter = {
      contains: query,
    };

    const shouldSearch = !category || category === "vehicles";
    if (shouldSearch) {
      const vehicles = await prisma.vehicle.findMany({
        where: {
          OR: [
            { name: searchFilter },
            { description: searchFilter },
          ],
        },
        take: 10,
      });
      results.push(
        ...vehicles.map((v) => ({
          type: "vehicle",
          id: v.id,
          name: v.name,
          slug: v.slug,
          description: v.description,
          image: v.image,
        }))
      );
    }

    const shouldSearchWeapons = !category || category === "weapons";
    if (shouldSearchWeapons) {
      const weapons = await prisma.weapon.findMany({
        where: {
          OR: [
            { name: searchFilter },
            { description: searchFilter },
          ],
        },
        take: 10,
      });
      results.push(
        ...weapons.map((w) => ({
          type: "weapon",
          id: w.id,
          name: w.name,
          slug: w.slug,
          description: w.description,
          image: w.image,
        }))
      );
    }

    const shouldSearchCharacters = !category || category === "characters";
    if (shouldSearchCharacters) {
      const characters = await prisma.character.findMany({
        where: {
          OR: [
            { name: searchFilter },
            { description: searchFilter },
          ],
        },
        take: 10,
      });
      results.push(
        ...characters.map((c) => ({
          type: "character",
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          image: c.image,
        }))
      );
    }

    const shouldSearchNews = !category || category === "news";
    if (shouldSearchNews) {
      const news = await prisma.news.findMany({
        where: {
          status: "published",
          OR: [
            { title: searchFilter },
            { description: searchFilter },
          ],
        },
        take: 10,
      });
      results.push(
        ...news.map((n) => ({
          type: "news",
          id: n.id,
          name: n.title,
          slug: n.slug,
          description: n.description,
          image: n.coverImage,
        }))
      );
    }

    const shouldSearchTips = !category || category === "tips";
    if (shouldSearchTips) {
      const tips = await prisma.tip.findMany({
        where: {
          status: "published",
          OR: [
            { title: searchFilter },
            { shortDescription: searchFilter },
          ],
        },
        take: 10,
      });
      results.push(
        ...tips.map((t) => ({
          type: "tip",
          id: t.id,
          name: t.title,
          slug: t.slug,
          description: t.shortDescription,
          image: t.image,
        }))
      );
    }

    const shouldSearchLocations = !category || category === "locations";
    if (shouldSearchLocations) {
      const locations = await prisma.location.findMany({
        where: {
          OR: [
            { name: searchFilter },
            { description: searchFilter },
          ],
        },
        take: 10,
      });
      results.push(
        ...locations.map((l) => ({
          type: "location",
          id: l.id,
          name: l.name,
          slug: l.slug,
          description: l.description,
          image: l.image,
        }))
      );
    }

    return results;
  },
};
