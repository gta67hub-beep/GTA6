import { NextRequest, NextResponse } from "next/server";
import { weaponsService } from "@/services/database";
import { paginationSchema, weaponSchema } from "@/validators";

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
      search: weaponSchema.shape.name.optional(),
      category: weaponSchema.shape.category.optional(),
    }).parse(params);

    const result = await weaponsService.getAll(validated);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching weapons:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch weapons" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = weaponSchema.parse(body);
    const result = await weaponsService.create(validated);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("Error creating weapon:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create weapon" },
      { status: 500 }
    );
  }
}
