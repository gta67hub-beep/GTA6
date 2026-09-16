import { favoritesService } from "../../src/services/favorites";

jest.mock("../../src/database/client", () => ({
  prisma: {
    favorite: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("FavoritesService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all favorites for a user", async () => {
    const mockFavorites = [
      { id: "1", entityType: "news", entityId: "news-1" },
    ];

    const { prisma } = require("../../src/database/client");
    prisma.favorite.findMany.mockResolvedValue(mockFavorites);

    const result = await favoritesService.getAll("user-1");

    expect(prisma.favorite.findMany).toHaveBeenCalledWith({
      where: { userId: "user-1" },
      orderBy: { createdAt: "desc" },
    });
    expect(result).toEqual(mockFavorites);
  });

  it("should add a favorite", async () => {
    const mockFavorite = {
      id: "1",
      entityType: "news",
      entityId: "news-1",
      userId: "user-1",
    };

    const { prisma } = require("../../src/database/client");
    prisma.favorite.create.mockResolvedValue(mockFavorite);

    const result = await favoritesService.add("user-1", "news", "news-1");

    expect(prisma.favorite.create).toHaveBeenCalledWith({
      data: {
        userId: "user-1",
        entityType: "news",
        entityId: "news-1",
      },
    });
    expect(result).toEqual(mockFavorite);
  });

  it("should remove a favorite", async () => {
    const { prisma } = require("../../src/database/client");
    prisma.favorite.delete.mockResolvedValue(null);

    await favoritesService.remove("user-1", "news", "news-1");

    expect(prisma.favorite.delete).toHaveBeenCalledWith({
      where: {
        userId_entityType_entityId: {
          userId: "user-1",
          entityType: "news",
          entityId: "news-1",
        },
      },
    });
  });
});
