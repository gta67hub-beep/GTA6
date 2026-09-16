import { prisma } from "@/database/client";

export const favoritesRepository = {
  async findByUser(userId: string) {
    return prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async find(userId: string, entityType: string, entityId: string) {
    return prisma.favorite.findUnique({
      where: {
        userId_entityType_entityId: {
          userId,
          entityType,
          entityId,
        },
      },
    });
  },

  async add(userId: string, entityType: string, entityId: string) {
    return prisma.favorite.create({
      data: { userId, entityType, entityId },
    });
  },

  async remove(userId: string, entityType: string, entityId: string) {
    return prisma.favorite.delete({
      where: {
        userId_entityType_entityId: {
          userId,
          entityType,
          entityId,
        },
      },
    });
  },

  async check(userId: string, entityType: string, entityId: string) {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_entityType_entityId: {
          userId,
          entityType,
          entityId,
        },
      },
    });
    return !!favorite;
  },

  async countByEntityType(userId: string) {
    const counts = await prisma.favorite.groupBy({
      by: ["entityType"],
      where: { userId },
      _count: true,
    });
    return counts.reduce(
      (acc, item) => ({ ...acc, [item.entityType]: item._count }),
      {} as Record<string, number>
    );
  },
};
