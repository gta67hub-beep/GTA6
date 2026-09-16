import { getAuthUserId, requireAuth, unauthorizedResponse } from "../../src/lib/auth-helpers";

jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

describe("AuthHelpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return userId when authenticated", async () => {
    const { auth } = require("@clerk/nextjs/server");
    auth.mockResolvedValue({ userId: "user-123" });

    const userId = await getAuthUserId();

    expect(userId).toBe("user-123");
  });

  it("should return null when not authenticated", async () => {
    const { auth } = require("@clerk/nextjs/server");
    auth.mockResolvedValue({ userId: null });

    const userId = await getAuthUserId();

    expect(userId).toBeNull();
  });

  it("should return userId with requireAuth", async () => {
    const { auth } = require("@clerk/nextjs/server");
    auth.mockResolvedValue({ userId: "user-123" });

    const userId = await requireAuth();

    expect(userId).toBe("user-123");
  });

  it("should throw with requireAuth when not authenticated", async () => {
    const { auth } = require("@clerk/nextjs/server");
    auth.mockResolvedValue({ userId: null });

    await expect(requireAuth()).rejects.toThrow("Unauthorized");
  });

  it("should return unauthorized response", () => {
    const response = unauthorizedResponse();

    expect(response.status).toBe(401);
  });
});
