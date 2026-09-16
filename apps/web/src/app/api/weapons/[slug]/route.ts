import { NextRequest, NextResponse } from "next/server";
import { weaponsService } from "@/services/database";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await weaponsService.getBySlug(slug);

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Weapon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching weapon:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch weapon" },
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
    const weapon = await weaponsService.getBySlug(slug);

    if (!weapon) {
      return NextResponse.json(
        { success: false, error: "Weapon not found" },
        { status: 404 }
      );
    }

    const result = await weaponsService.update(weapon.id, body);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error updating weapon:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update weapon" },
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
    const weapon = await weaponsService.getBySlug(slug);

    if (!weapon) {
      return NextResponse.json(
        { success: false, error: "Weapon not found" },
        { status: 404 }
      );
    }

    await weaponsService.delete(weapon.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting weapon:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete weapon" },
      { status: 500 }
    );
  }
}
