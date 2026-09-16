import { NextRequest, NextResponse } from "next/server";
import { locationsService } from "@/services/database";
import { paginationSchema, locationSchema } from "@/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      page: searchParams.get("page") || "1",
      pageSize: searchParams.get("pageSize") || "20",
      search: searchParams.get("search") || undefined,
    };

    const validated = paginationSchema.extend({
      search: locationSchema.shape.name.optional(),
    }).parse(params);

    const result = await locationsService.getAll(validated);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = locationSchema.parse(body);
    const result = await locationsService.create(validated);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("Error creating location:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create location" },
      { status: 500 }
    );
  }
}
