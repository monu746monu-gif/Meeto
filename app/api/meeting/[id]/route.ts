import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Meeting id is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("meetings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      meeting: data,
    });
  } catch (error) {
    console.error("Fetch meeting error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to fetch meeting";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}