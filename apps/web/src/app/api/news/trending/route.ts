import { NextRequest, NextResponse } from "next/server";
import { newsService } from "@/services/news";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "10";
    const result = await newsService.getTrending(parseInt(limit));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching trending news:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch trending news" },
      { status: 500 }
    );
  }
}
