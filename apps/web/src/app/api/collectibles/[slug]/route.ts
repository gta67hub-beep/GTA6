import { NextRequest, NextResponse } from "next/server";
import { collectiblesService } from "@/services/database";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await collectiblesService.getBySlug(slug);

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Collectible not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching collectible:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch collectible" },
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
    const collectible = await collectiblesService.getBySlug(slug);

    if (!collectible) {
      return NextResponse.json(
        { success: false, error: "Collectible not found" },
        { status: 404 }
      );
    }

    const result = await collectiblesService.update(collectible.id, body);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error updating collectible:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update collectible" },
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
    const collectible = await collectiblesService.getBySlug(slug);

    if (!collectible) {
      return NextResponse.json(
        { success: false, error: "Collectible not found" },
        { status: 404 }
      );
    }

    await collectiblesService.delete(collectible.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting collectible:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete collectible" },
      { status: 500 }
    );
  }
}
