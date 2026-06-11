"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Bot,
  Brain,
  CalendarDays,
  CheckCircle2,
  Mic2,
  Radio,
  Search,
  Send,
  Sparkles,
  Users,
} from "lucide-react";

const transcript = [
  {
    speaker: "Monu",
    time: "03:12",
    text: "I want Meeto to help live during the meeting, not only after the call.",
  },
  {
    speaker: "Rahul",
    time: "03:28",
    text: "Can it summarize what we discussed so far?",
  },
  {
    speaker: "Meeto AI",
    time: "03:35",
    text: "So far, the team discussed auto-join settings, recording consent, and the content studio workflow.",
  },
  {
    speaker: "Aman",
    time: "04:02",
    text: "Can Meeto also research something during the call?",
  },
];

const prompts = [
  "Summarize the meeting so far",
  "What should I ask next?",
  "Research this competitor",
  "What are the action items?",
  "Give me a smart reply",
];

const participants = ["Monu", "Rahul", "Aman", "Meeto AI"];

export default function LiveAssistantPage() {
  const [mode, setMode] = useState<"private" | "public">("private");
  const [message, setMessage] = useState("What should I ask next?");

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
              <Radio className="h-3.5 w-3.5" />
              Live meeting active
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Live AI meeting assistant
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Ask Meeto to summarize, research, suggest replies, and track action
              items while the meeting is happening.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-1">
            <button
              onClick={() => setMode("private")}
              className={`rounded-xl px-4 py-2 text-sm transition ${
                mode === "private"
                  ? "bg-white text-slate-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Private help
            </button>
            <button
              onClick={() => setMode("public")}
              className={`rounded-xl px-4 py-2 text-sm transition ${
                mode === "public"
                  ? "bg-white text-slate-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Public answer
            </button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr_0.75fr]">
          <section className="space-y-6">
            <div className="glass rounded-[2rem] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10">
                  <CalendarDays className="h-5 w-5 text-blue-200" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    Client Product Strategy Call
                  </h2>
                  <p className="text-sm text-slate-400">
                    Google Meet · 42 min scheduled
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-slate-400">Recording status</p>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                    Recording
                  </span>
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full w-[48%] rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Meeto has announced recording consent.
                </p>
              </div>
            </div>

            <div className="glass rounded-[2rem] p-5">
              <div className="mb-5 flex items-center gap-3">
                <Users className="h-5 w-5 text-violet-200" />
                <h2 className="text-xl font-semibold">Participants</h2>
              </div>

              <div className="space-y-3">
                {participants.map((person) => (
                  <div
                    key={person}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-violet-600/30 text-sm font-semibold">
                        {person.charAt(0)}
                      </div>
                      <span className="text-sm text-slate-300">{person}</span>
                    </div>

                    {person === "Meeto AI" ? (
                      <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs text-violet-200">
                        Bot
                      </span>
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="glass rounded-[2rem] p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Real-time transcript</p>
                <h2 className="text-2xl font-semibold">Live conversation</h2>
              </div>
              <Mic2 className="h-6 w-6 text-violet-200" />
            </div>

            <div className="max-h-[620px] space-y-4 overflow-y-auto pr-2">
              {transcript.map((line) => (
                <div
                  key={`${line.speaker}-${line.time}`}
                  className="rounded-3xl border border-white/10 bg-white/[0.035] p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p
                      className={`text-sm font-medium ${
                        line.speaker === "Meeto AI"
                          ? "text-violet-200"
                          : "text-slate-200"
                      }`}
                    >
                      {line.speaker}
                    </p>
                    <span className="text-xs text-slate-500">{line.time}</span>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{line.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="glass rounded-[2rem] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10">
                  <Brain className="h-5 w-5 text-violet-200" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Ask Meeto</h2>
                  <p className="text-sm text-slate-400">
                    Mode: {mode === "private" ? "Private" : "Public"}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-200" />
                  <p className="text-sm font-medium text-violet-100">
                    Suggested answer
                  </p>
                </div>
                <p className="text-sm leading-6 text-slate-300">
                  You can ask: “What is the biggest risk in our launch plan?”
                  This will help clarify priorities before the meeting ends.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setMessage(prompt)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.07]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button className="rounded-xl bg-white p-2 text-slate-950">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="glass rounded-[2rem] p-5">
              <h2 className="text-xl font-semibold">Live capabilities</h2>
              <div className="mt-5 space-y-3">
                {[
                  "Summarize so far",
                  "Track action items",
                  "Research live",
                  "Suggest next question",
                  "Create smart replies",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}