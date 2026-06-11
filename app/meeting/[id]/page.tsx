"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clipboard,
  Clapperboard,
  Download,
  FileText,
  Mail,
  MessageSquareText,
  Mic2,
  Play,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";

const tabs = [
  "Summary",
  "Transcript",
  "Action Items",
  "Follow-up Email",
  "Content Ideas",
  "Clips",
];

type ActionItem = {
  owner?: string;
  task?: string;
  deadline?: string;
};

type ContentIdea = {
  platform?: string;
  title?: string;
  description?: string;
  desc?: string;
};

type ClipSuggestion = {
  title?: string;
  start_time?: string;
  end_time?: string;
  time?: string;
  hook?: string;
  format?: string;
};

type Meeting = {
  id: string;
  title: string;
  file_url?: string;
  status?: string;
  transcript?: string;
  summary?: string[];
  action_items?: ActionItem[];
  follow_up_email?: string;
  content_ideas?: ContentIdea[];
  clip_suggestions?: ClipSuggestion[];
  created_at?: string;
};

const mockMeeting: Meeting = {
  id: "demo",
  title: "Client Product Strategy Call",
  status: "ready",
  transcript:
    "Monu: I want Meeto to join meetings automatically from my calendar and record everything.\nRahul: Can it also help during the meeting if someone asks it a question?\nMeeto AI: Yes. Meeto can answer in public mode for everyone or privately help the main user with suggestions.",
  summary: [
    "The team discussed Meeto as an AI meeting-to-content copilot.",
    "The main product flow includes login, calendar access, and meeting app integrations.",
    "Users can choose auto-join all meetings, ask before joining, selected meetings, or manual invite.",
    "Meeto should greet participants when it joins the meeting.",
    "The bot records the full meeting with audio, video, speaker context, and timestamps.",
    "During meetings, users can ask Meeto to summarize, research, or suggest replies.",
    "After the meeting, Meeto creates a 10-point summary, action items, and follow-up email.",
    "The second side of the app is Content Studio for turning meetings into short-form content.",
    "Users can edit clips using voice commands like add captions, cut this topic, and make it 9:16.",
    "The product should feel premium, agentic, and ready for a Product Hunt launch.",
  ],
  action_items: [
    {
      owner: "Monu",
      task: "Create premium Meeto landing page and dashboard UI.",
      deadline: "Today",
    },
    {
      owner: "Rahul",
      task: "Prepare sample product demo video for Content Studio.",
      deadline: "Wednesday",
    },
    {
      owner: "Team",
      task: "Review auto-join meeting privacy and consent flow.",
      deadline: "Friday",
    },
  ],
  follow_up_email:
    "Hi team,\n\nGreat discussion today. Here’s a quick recap of what we covered in the Client Product Strategy Call.\n\nWe discussed Meeto’s calendar connection, auto-join preferences, meeting recording, live AI help, and the Content Studio where users can convert recordings into clips and posts.\n\nNext steps: Monu will finish the premium UI, Rahul will prepare a demo video, and the team will review privacy and consent flow before moving into real integrations.\n\nThanks,\nMeeto AI",
  content_ideas: [
    {
      platform: "LinkedIn",
      title: "Why meetings are hidden content goldmines",
      description: "Turn a product strategy call into a thought-leadership post.",
    },
    {
      platform: "X",
      title: "Building an AI meeting agent",
      description: "A thread explaining Meeto’s auto-join, recording, and content workflow.",
    },
  ],
  clip_suggestions: [
    {
      title: "Best product insight",
      start_time: "04:20",
      end_time: "05:10",
      hook: "Most meetings hide your best content.",
      format: "Instagram Reel",
    },
    {
      title: "Voice editing moment",
      start_time: "18:30",
      end_time: "19:20",
      hook: "Edit meeting clips just by speaking.",
      format: "LinkedIn Video",
    },
  ],
};

export default function MeetingWorkspacePage() {
    const params = useParams<{ id: string }>();
    const meetingId = params.id;
  
    const [activeTab, setActiveTab] = useState("Summary");
    const [meeting, setMeeting] = useState<Meeting | null>(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeeting() {
      try {
        if (meetingId === "demo") {
            setMeeting(mockMeeting);
            return;
          }
          
          const res = await fetch(`/api/meeting/${meetingId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Meeting not found");
        }

        setMeeting(data.meeting);
      } catch (error) {
        console.error(error);
        setMeeting(mockMeeting);
      } finally {
        setLoading(false);
      }
    }

    fetchMeeting();
}, [meetingId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="glass rounded-3xl p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600">
            <Bot className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-semibold">Loading meeting...</h1>
          <p className="mt-2 text-sm text-slate-400">
            Meeto is preparing your workspace.
          </p>
        </div>
      </main>
    );
  }

  const data = meeting || mockMeeting;

  const summary = Array.isArray(data.summary) ? data.summary : mockMeeting.summary || [];
  const actionItems = Array.isArray(data.action_items)
    ? data.action_items
    : mockMeeting.action_items || [];
  const contentIdeas = Array.isArray(data.content_ideas)
    ? data.content_ideas
    : mockMeeting.content_ideas || [];
  const clips = Array.isArray(data.clip_suggestions)
    ? data.clip_suggestions
    : mockMeeting.clip_suggestions || [];

  const transcriptLines = data.transcript
    ? data.transcript
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  return (
    <main className="min-h-screen px-5 py-6 md:px-8">
      <div className="noise" />

      <nav className="mx-auto mb-6 flex max-w-7xl items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-violet-500/20">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Meeto</span>
        </Link>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>
      </nav>

      <section className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {data.status || "ready"}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              {data.title}
            </h1>
            <p className="mt-3 text-slate-400">
              Meeting workspace · AI summary · Content suggestions
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/content-studio"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              <Clapperboard className="h-4 w-4" />
              Open Content Studio
            </Link>

            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              <Download className="h-4 w-4" />
              Export notes
            </button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="space-y-6">
            <div className="glass rounded-[2rem] p-5">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950">
                {data.file_url ? (
                  <video
                    src={data.file_url}
                    controls
                    className="aspect-video w-full bg-black object-contain"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-blue-500/20 via-slate-950 to-violet-600/20">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-slate-950 shadow-2xl">
                      <Play className="ml-1 h-8 w-8" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  [summary.length || 10, "Summary points"],
                  [actionItems.length || 0, "Action items"],
                  [clips.length || 0, "Clips found"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-2xl font-semibold">{value}</p>
                    <p className="mt-1 text-xs text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-[2rem] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10">
                  <Mic2 className="h-5 w-5 text-violet-200" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Ask this meeting</h2>
                  <p className="text-sm text-slate-400">
                    Chat with the transcript and decisions.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "What are the main decisions?",
                  "Who has pending action items?",
                  "Find the best content moment.",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.07]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  placeholder="Ask Meeto about this meeting..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
          </section>

          <section className="glass rounded-[2rem] p-5 md:p-6">
            <div className="mb-5 flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    activeTab === tab
                      ? "bg-white text-slate-950"
                      : "border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.07]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Summary" && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-violet-200" />
                  <h2 className="text-2xl font-semibold">10-point summary</h2>
                </div>

                <div className="space-y-3">
                  {summary.map((point, index) => (
                    <div
                      key={`${point}-${index}`}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-violet-100">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-6 text-slate-300">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Transcript" && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <MessageSquareText className="h-6 w-6 text-blue-200" />
                  <h2 className="text-2xl font-semibold">Transcript</h2>
                </div>

                <div className="space-y-3">
                  {transcriptLines.length > 0 ? (
                    transcriptLines.map((line, index) => (
                      <div
                        key={`${line}-${index}`}
                        className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                      >
                        <p className="text-sm leading-6 text-slate-300">{line}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">
                      No transcript found yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "Action Items" && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-200" />
                  <h2 className="text-2xl font-semibold">Action items</h2>
                </div>

                <div className="space-y-4">
                  {actionItems.map((item, index) => (
                    <div
                      key={`${item.task}-${index}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
                          {item.owner || "Owner not found"}
                        </span>
                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
                          {item.deadline || "No deadline"}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-slate-300">
                        {item.task || "No task"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Follow-up Email" && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <Mail className="h-6 w-6 text-violet-200" />
                  <h2 className="text-2xl font-semibold">Follow-up email</h2>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-slate-400">
                      Generated from meeting
                    </p>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(data.follow_up_email || "")
                      }
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"
                    >
                      <Clipboard className="h-3.5 w-3.5" />
                      Copy
                    </button>
                  </div>

                  <div className="whitespace-pre-line text-sm leading-7 text-slate-300">
                    {data.follow_up_email || "No follow-up email generated."}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Content Ideas" && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-violet-200" />
                  <h2 className="text-2xl font-semibold">Content ideas</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {contentIdeas.map((idea, index) => (
                    <div
                      key={`${idea.title}-${index}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
                        {idea.platform || "Content"}
                      </span>
                      <h3 className="mt-4 font-semibold">{idea.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {idea.description || idea.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Clips" && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <Clapperboard className="h-6 w-6 text-violet-200" />
                  <h2 className="text-2xl font-semibold">Clip suggestions</h2>
                </div>

                <div className="grid gap-4">
                  {clips.map((clip, index) => {
                    const time =
                      clip.time ||
                      `${clip.start_time || "Not available"} - ${
                        clip.end_time || "Not available"
                      }`;

                    return (
                      <div
                        key={`${clip.title}-${index}`}
                        className="rounded-3xl border border-white/10 bg-white/[0.035] p-4"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="mb-3 flex flex-wrap gap-2">
                              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
                                {time}
                              </span>
                              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
                                {clip.format || "Short-form"}
                              </span>
                            </div>
                            <h3 className="font-semibold">{clip.title}</h3>
                            <p className="mt-2 text-sm text-slate-400">
                              Hook: “{clip.hook}”
                            </p>
                          </div>

                          <Link
                            href="/content-studio"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                          >
                            <Wand2 className="h-4 w-4" />
                            Create clip
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-violet-400/20 bg-violet-500/10 p-5">
                  <p className="text-sm font-medium text-violet-100">
                    Voice edit example
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    “Meeto, cut the clip where I discussed pricing, add captions,
                    make it 9:16, and export it for Instagram.”
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}