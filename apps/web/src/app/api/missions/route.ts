import { NextRequest, NextResponse } from "next/server";
import { missionsService } from "@/services/database";
import { paginationSchema, missionSchema } from "@/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      page: searchParams.get("page") || "1",
      pageSize: searchParams.get("pageSize") || "20",
      search: searchParams.get("search") || undefined,
    };

    const validated = paginationSchema.extend({
      search: missionSchema.shape.name.optional(),
    }).parse(params);

    const result = await missionsService.getAll(validated);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching missions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch missions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = missionSchema.parse(body);
    const result = await missionsService.create(validated);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("Error creating mission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create mission" },
      { status: 500 }
    );
  }
}
