import {
  newsSchema,
  tipSchema,
  favoriteSchema,
  searchSchema,
} from "../../src/validators";

describe("Validators", () => {
  describe("newsSchema", () => {
    it("should validate valid news data", () => {
      const validData = {
        title: "Test News",
        slug: "test-news",
        description: "Test description",
        content: "Test content",
        category: "gta6",
        source: "Test Source",
        sourceUrl: "https://example.com",
        publishedAt: new Date().toISOString(),
      };

      const result = newsSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid news data", () => {
      const invalidData = {
        title: "",
        slug: "",
        description: "",
        content: "",
        category: "invalid",
        source: "",
        sourceUrl: "not-a-url",
        publishedAt: "not-a-date",
      };

      const result = newsSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("tipSchema", () => {
    it("should validate valid tip data", () => {
      const validData = {
        title: "Test Tip",
        slug: "test-tip",
        shortDescription: "Short desc",
        fullExplanation: "Full explanation",
        category: "money",
        difficulty: "beginner",
      };

      const result = tipSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid tip data", () => {
      const invalidData = {
        title: "",
        slug: "",
        shortDescription: "",
        fullExplanation: "",
        category: "invalid",
        difficulty: "invalid",
      };

      const result = tipSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("favoriteSchema", () => {
    it("should validate valid favorite data", () => {
      const validData = {
        entityType: "news",
        entityId: "news-1",
      };

      const result = favoriteSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid favorite data", () => {
      const invalidData = {
        entityType: "invalid",
        entityId: "",
      };

      const result = favoriteSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe("searchSchema", () => {
    it("should validate valid search data", () => {
      const validData = {
        q: "test query",
        category: "vehicles",
      };

      const result = searchSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid search data", () => {
      const invalidData = {
        q: "",
        category: "invalid",
      };

      const result = searchSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
