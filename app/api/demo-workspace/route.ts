import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function getBearerToken(req: NextRequest) {
  const header = req.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length);
}

async function getUserId(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return null;

  return data.user.id;
}

export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("demo_workspaces")
    .select("*")
    .eq("user_id", userId)
    .eq("workspace_key", "vexa")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ workspace: data });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const workspace = body.workspace;

  if (!workspace) {
    return NextResponse.json({ error: "workspace is required" }, { status: 400 });
  }

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("demo_workspaces")
    .select("id")
    .eq("user_id", userId)
    .eq("workspace_key", workspace.key || "vexa")
    .maybeSingle();

  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 500 });
  }

  if (existing) {
    const { error: updateError } = await supabaseAdmin
      .from("demo_workspaces")
      .update({
        workspace_name: workspace.name,
        content: workspace,
      })
      .eq("id", existing.id)
      .eq("user_id", userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ alreadyLoaded: true });
  }

  const { error: insertError } = await supabaseAdmin.from("demo_workspaces").insert({
    user_id: userId,
    workspace_key: workspace.key || "vexa",
    workspace_name: workspace.name,
    content: workspace,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ created: true });
}
