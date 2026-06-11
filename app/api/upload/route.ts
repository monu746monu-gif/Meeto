import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const file = formData.get("file") as File | null;

    if (!title || !file) {
      return NextResponse.json(
        { error: "Title and file are required" },
        { status: 400 }
      );
    }

    const fileExt = file.name.split(".").pop() || "mp3";

    const filePath = `meetings/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabaseAdmin.storage
      .from("meeting-recordings")
      .upload(filePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("meeting-recordings")
      .getPublicUrl(filePath);

    const { data: meeting, error: dbError } = await supabaseAdmin
      .from("meetings")
      .insert({
        title,
        file_url: publicUrlData.publicUrl,
        file_path: filePath,
        status: "uploaded",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase DB error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      meeting,
    });
  } catch (error) {
    console.error("Upload route error:", error);

    const message =
      error instanceof Error ? error.message : "Upload failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
