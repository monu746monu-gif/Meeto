import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { openai } from "@/lib/openai";

export const runtime = "nodejs";
export const maxDuration = 300;

type MeetingAIResult = {
  summary: string[];
  action_items: {
    owner: string;
    task: string;
    deadline: string;
  }[];
  follow_up_email: string;
  content_ideas: {
    platform: string;
    title: string;
    description: string;
  }[];
  clip_suggestions: {
    title: string;
    start_time: string;
    end_time: string;
    hook: string;
    format: string;
  }[];
};

function safeJsonParse(text: string): MeetingAIResult {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("AI response was not valid JSON");
    }

    return JSON.parse(match[0]);
  }
}

export async function POST(req: NextRequest) {
  let meetingId: string | null = null;

  try {
    const body = await req.json();
    meetingId = body.meetingId;

    if (!meetingId) {
      return NextResponse.json(
        { error: "meetingId is required" },
        { status: 400 }
      );
    }

    const { data: meeting, error: fetchError } = await supabaseAdmin
      .from("meetings")
      .select("*")
      .eq("id", meetingId)
      .single();

    if (fetchError || !meeting) {
      return NextResponse.json(
        { error: fetchError?.message || "Meeting not found" },
        { status: 404 }
      );
    }

    await supabaseAdmin
      .from("meetings")
      .update({
        status: "processing",
        error_message: null,
      })
      .eq("id", meetingId);

    if (!meeting.file_url) {
      throw new Error("Meeting file_url is missing");
    }

    const fileResponse = await fetch(meeting.file_url);

    if (!fileResponse.ok) {
      throw new Error("Could not download uploaded meeting file");
    }

    const fileBlob = await fileResponse.blob();

    const fileName = meeting.file_path
      ? meeting.file_path.split("/").pop() || "meeting.mp3"
      : "meeting.mp3";

    const audioFile = new File([fileBlob], fileName, {
      type: fileBlob.type || "audio/mpeg",
    });

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    });

    const transcript = transcription.text || "";

    if (!transcript.trim()) {
      throw new Error("Transcription returned empty text");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are Meeto, an AI meeting-to-content assistant. Return only valid JSON. Do not use markdown.",
        },
        {
          role: "user",
          content: `
Analyze this meeting transcript and return only valid JSON with this exact structure:

{
  "summary": [
    "point 1",
    "point 2",
    "point 3",
    "point 4",
    "point 5",
    "point 6",
    "point 7",
    "point 8",
    "point 9",
    "point 10"
  ],
  "action_items": [
    {
      "owner": "Name or Team",
      "task": "Task",
      "deadline": "Deadline or Not mentioned"
    }
  ],
  "follow_up_email": "A clean follow-up email based on the meeting.",
  "content_ideas": [
    {
      "platform": "LinkedIn/X/Instagram/YouTube Shorts/Newsletter",
      "title": "Content title",
      "description": "What to create"
    }
  ],
  "clip_suggestions": [
    {
      "title": "Clip title",
      "start_time": "Estimated timestamp or Not available",
      "end_time": "Estimated timestamp or Not available",
      "hook": "Strong hook",
      "format": "Instagram Reel/YouTube Shorts/LinkedIn Video"
    }
  ]
}

Rules:
- Summary must have exactly 10 useful points.
- Action items should include owner, task, and deadline if available.
- Content ideas should be practical and based on the transcript.
- Clip suggestions should identify content-worthy moments.
- If timestamps are not available, use "Not available".
- Return JSON only. No markdown.

Transcript:
${transcript}
`,
        },
      ],
    });

    const rawAIResponse = completion.choices[0]?.message?.content || "{}";
    const parsed = safeJsonParse(rawAIResponse);

    const { error: updateError } = await supabaseAdmin
      .from("meetings")
      .update({
        status: "ready",
        transcript,
        summary: parsed.summary || [],
        action_items: parsed.action_items || [],
        follow_up_email: parsed.follow_up_email || "",
        content_ideas: parsed.content_ideas || [],
        clip_suggestions: parsed.clip_suggestions || [],
        error_message: null,
      })
      .eq("id", meetingId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return NextResponse.json({
      success: true,
      meetingId,
    });
  } catch (error) {
    console.error("Process meeting error:", error);

    const message =
      error instanceof Error ? error.message : "Meeting processing failed";

    if (meetingId) {
      await supabaseAdmin
        .from("meetings")
        .update({
          status: "failed",
          error_message: message,
        })
        .eq("id", meetingId);
    }

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}