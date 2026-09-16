import { NextRequest, NextResponse } from "next/server";
import { tipsService } from "@/services/tips";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "10";
    const result = await tipsService.getTrending(parseInt(limit));
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching trending tips:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch trending tips" },
      { status: 500 }
    );
  }
}
