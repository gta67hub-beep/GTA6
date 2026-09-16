import { NextRequest, NextResponse } from "next/server";
import { missionsService } from "@/services/database";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await missionsService.getBySlug(slug);

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Mission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching mission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch mission" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const mission = await missionsService.getBySlug(slug);

    if (!mission) {
      return NextResponse.json(
        { success: false, error: "Mission not found" },
        { status: 404 }
      );
    }

    const result = await missionsService.update(mission.id, body);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error updating mission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update mission" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const mission = await missionsService.getBySlug(slug);

    if (!mission) {
      return NextResponse.json(
        { success: false, error: "Mission not found" },
        { status: 404 }
      );
    }

    await missionsService.delete(mission.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting mission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete mission" },
      { status: 500 }
    );
  }
}
