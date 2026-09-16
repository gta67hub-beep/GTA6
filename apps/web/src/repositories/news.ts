import { prisma } from "@/database/client";

export interface FindManyOptions {
  page?: number;
  pageSize?: number;
  category?: string;
  status?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const newsRepository = {
  async findMany(options: FindManyOptions) {
    const { page = 1, pageSize = 20, category, status = "published" } = options;
    const skip = (page - 1) * pageSize;

    const where: any = {
      ...(status && { status }),
      ...(category && { category }),
    };

    const [data, total] = await Promise.all([
      prisma.news.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.news.count({ where }),
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
    return prisma.news.findUnique({
      where: { slug },
    });
  },

  async findTrending(limit = 10) {
    return prisma.news.findMany({
      where: { status: "published" },
      orderBy: { trendingScore: "desc" },
      take: limit,
    });
  },

  async incrementViews(id: string) {
    return prisma.news.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  },

  async create(data: any) {
    return prisma.news.create({ data });
  },

  async update(id: string, data: any) {
    return prisma.news.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.news.delete({ where: { id } });
  },
};
