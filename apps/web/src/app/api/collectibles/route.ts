import { NextRequest, NextResponse } from "next/server";
import { collectiblesService } from "@/services/database";
import { paginationSchema, collectibleSchema } from "@/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      page: searchParams.get("page") || "1",
      pageSize: searchParams.get("pageSize") || "20",
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
    };

    const validated = paginationSchema.extend({
      search: collectibleSchema.shape.name.optional(),
      category: collectibleSchema.shape.category.optional(),
    }).parse(params);

    const result = await collectiblesService.getAll(validated);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching collectibles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch collectibles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = collectibleSchema.parse(body);
    const result = await collectiblesService.create(validated);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("Error creating collectible:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create collectible" },
      { status: 500 }
    );
  }
}
