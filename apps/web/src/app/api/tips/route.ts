import { NextRequest, NextResponse } from "next/server";
import { tipsService } from "@/services/tips";
import { paginationSchema, tipSchema } from "@/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      page: searchParams.get("page") || "1",
      pageSize: searchParams.get("pageSize") || "20",
      category: searchParams.get("category") || undefined,
      difficulty: searchParams.get("difficulty") || undefined,
    };

    const validated = paginationSchema.extend({
      category: tipSchema.shape.category.optional(),
      difficulty: tipSchema.shape.difficulty.optional(),
    }).parse(params);

    const result = await tipsService.getAll(validated);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching tips:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tips" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = tipSchema.parse(body);
    const result = await tipsService.create(validated);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("Error creating tip:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create tip" },
      { status: 500 }
    );
  }
}
