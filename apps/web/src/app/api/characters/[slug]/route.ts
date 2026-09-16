import { NextRequest, NextResponse } from "next/server";
import { charactersService } from "@/services/database";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await charactersService.getBySlug(slug);

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Character not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching character:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch character" },
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
    const character = await charactersService.getBySlug(slug);

    if (!character) {
      return NextResponse.json(
        { success: false, error: "Character not found" },
        { status: 404 }
      );
    }

    const result = await charactersService.update(character.id, body);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error updating character:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update character" },
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
    const character = await charactersService.getBySlug(slug);

    if (!character) {
      return NextResponse.json(
        { success: false, error: "Character not found" },
        { status: 404 }
      );
    }

    await charactersService.delete(character.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting character:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete character" },
      { status: 500 }
    );
  }
}
