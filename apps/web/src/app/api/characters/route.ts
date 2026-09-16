import { NextRequest, NextResponse } from "next/server";
import { charactersService } from "@/services/database";
import { paginationSchema, characterSchema } from "@/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      page: searchParams.get("page") || "1",
      pageSize: searchParams.get("pageSize") || "20",
      search: searchParams.get("search") || undefined,
    };

    const validated = paginationSchema.extend({
      search: characterSchema.shape.name.optional(),
    }).parse(params);

    const result = await charactersService.getAll(validated);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching characters:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch characters" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = characterSchema.parse(body);
    const result = await charactersService.create(validated);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("Error creating character:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create character" },
      { status: 500 }
    );
  }
}
