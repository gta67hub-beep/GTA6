import { NextRequest, NextResponse } from "next/server";
import { vehiclesService } from "@/services/database";
import { paginationSchema, vehicleSchema } from "@/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      page: searchParams.get("page") || "1",
      pageSize: searchParams.get("pageSize") || "20",
      search: searchParams.get("search") || undefined,
      class: searchParams.get("class") || undefined,
    };

    const validated = paginationSchema.extend({
      search: vehicleSchema.shape.name.optional(),
      class: vehicleSchema.shape.class.optional(),
    }).parse(params);

    const result = await vehiclesService.getAll(validated);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = vehicleSchema.parse(body);
    const result = await vehiclesService.create(validated);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
