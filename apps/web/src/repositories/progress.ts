import { prisma } from "@/database/client";

export const progressRepository = {
  async findByUser(userId: string) {
    return prisma.progress.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
  },

  async find(userId: string, entityType: string, entityId: string) {
    return prisma.progress.findUnique({
      where: {
        userId_entityType_entityId: {
          userId,
          entityType,
          entityId,
        },
      },
    });
  },

  async toggle(userId: string, entityType: string, entityId: string) {
    const existing = await prisma.progress.findUnique({
      where: {
        userId_entityType_entityId: {
          userId,
          entityType,
          entityId,
        },
      },
    });

    if (existing) {
      return prisma.progress.update({
        where: { id: existing.id },
        data: {
          completed: !existing.completed,
          completedAt: !existing.completed ? new Date() : null,
        },
      });
    }

    return prisma.progress.create({
      data: {
        userId,
        entityType,
        entityId,
        completed: true,
        completedAt: new Date(),
      },
    });
  },

  async getSummary(userId: string) {
    const allProgress = await prisma.progress.findMany({
      where: { userId },
    });

    const byCategory: Record<
      string,
      { total: number; completed: number; percentage: number }
    > = {};

    const entityTypes: string[] = [
      "mission",
      "collectible",
      "vehicle",
      "weapon",
      "location",
      "tip",
    ];

    for (const type of entityTypes) {
      const typeProgress = allProgress.filter((p) => p.entityType === type);
      const completed = typeProgress.filter((p) => p.completed).length;
      byCategory[type] = {
        total: typeProgress.length,
        completed,
        percentage: typeProgress.length > 0 ? Math.round((completed / typeProgress.length) * 100) : 0,
      };
    }

    const totalCompleted = allProgress.filter((p) => p.completed).length;

    return {
      total: allProgress.length,
      completed: totalCompleted,
      percentage: allProgress.length > 0 ? Math.round((totalCompleted / allProgress.length) * 100) : 0,
      byCategory,
    };
  },
};
