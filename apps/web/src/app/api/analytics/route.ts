import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events } = body;

    console.log(`[Analytics] Received ${events?.length || 0} events`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to process analytics" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Analytics endpoint",
    status: "active",
  });
}
