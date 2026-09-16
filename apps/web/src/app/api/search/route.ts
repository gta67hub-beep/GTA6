import { NextRequest, NextResponse } from "next/server";
import { searchService } from "@/services/search";
import { searchSchema } from "@/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      q: searchParams.get("q") || "",
      category: searchParams.get("category") || undefined,
    };

    const validated = searchSchema.parse(params);
    const result = await searchService.search(
      validated.q,
      validated.category
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error searching:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search" },
      { status: 500 }
    );
  }
}
