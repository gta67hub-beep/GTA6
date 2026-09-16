import { NextRequest, NextResponse } from "next/server";
import { tipsService } from "@/services/tips";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await tipsService.getBySlug(slug);

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Tip not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching tip:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tip" },
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
    const tip = await tipsService.getBySlug(slug);

    if (!tip) {
      return NextResponse.json(
        { success: false, error: "Tip not found" },
        { status: 404 }
      );
    }

    const result = await tipsService.update(tip.id, body);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error updating tip:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update tip" },
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
    const tip = await tipsService.getBySlug(slug);

    if (!tip) {
      return NextResponse.json(
        { success: false, error: "Tip not found" },
        { status: 404 }
      );
    }

    await tipsService.delete(tip.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tip:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete tip" },
      { status: 500 }
    );
  }
}
