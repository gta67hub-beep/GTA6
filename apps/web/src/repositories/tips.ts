import { prisma } from "@/database/client";

export interface FindManyOptions {
  page?: number;
  pageSize?: number;
  category?: string;
  difficulty?: string;
  status?: string;
}

export const tipsRepository = {
  async findMany(options: FindManyOptions) {
    const { page = 1, pageSize = 20, category, difficulty, status = "published" } = options;
    const skip = (page - 1) * pageSize;

    const where: any = {
      ...(status && { status }),
      ...(category && { category }),
      ...(difficulty && { difficulty }),
    };

    const [data, total] = await Promise.all([
      prisma.tip.findMany({
        where,
        orderBy: { trendingScore: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.tip.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  },

  async findBySlug(slug: string) {
    return prisma.tip.findUnique({
      where: { slug },
    });
  },

  async findTrending(limit = 10) {
    return prisma.tip.findMany({
      where: { status: "published" },
      orderBy: { trendingScore: "desc" },
      take: limit,
    });
  },

  async incrementViews(id: string) {
    return prisma.tip.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  },

  async create(data: any) {
    return prisma.tip.create({ data });
  },

  async update(id: string, data: any) {
    return prisma.tip.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.tip.delete({ where: { id } });
  },
};
