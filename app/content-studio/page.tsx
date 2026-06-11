"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Bot,
  Captions,
  Check,
  Clapperboard,
  Download,
  Mic2,
  Play,
  Scissors,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";

const clips = [
  {
    title: "Best product insight",
    time: "04:20 - 05:10",
    hook: "Most meetings hide your best content.",
    status: "Ready",
  },
  {
    title: "Client pain point",
    time: "12:30 - 13:15",
    hook: "This is why teams forget what matters.",
    status: "Draft",
  },
  {
    title: "Voice editing moment",
    time: "18:30 - 19:20",
    hook: "Edit meeting clips just by speaking.",
    status: "Ready",
  },
];

const captionStyles = [
  "Clean",
  "Bold creator",
  "Podcast",
  "Corporate",
  "Minimal",
];

const commands = [
  "Cut the clip where I discussed pricing",
  "Add captions and highlight important words",
  "Make it 9:16 for Instagram Reel",
  "Remove silence from the beginning",
  "Add a strong hook at the top",
];

export default function ContentStudioPage() {
  const [selectedStyle, setSelectedStyle] = useState("Bold creator");
  const [voiceCommand, setVoiceCommand] = useState(
    "Cut the part where I explained the product and add captions"
  );

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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
              <Sparkles className="h-3.5 w-3.5" />
              AI Content Studio
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Turn meetings into editable clips.
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Find the best moments, cut clips, add captions, resize for social,
              and edit everything with voice commands.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
            <Download className="h-4 w-4" />
            Export clip
          </button>
        </header>

        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <section className="space-y-6">
            <div className="glass rounded-[2rem] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10">
                  <Search className="h-5 w-5 text-violet-200" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">AI Clip Finder</h2>
                  <p className="text-sm text-slate-400">
                    Search the meeting by topic and create clips.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  placeholder="Find the part where pricing was discussed..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div className="mt-5 space-y-3">
                {clips.map((clip) => (
                  <div
                    key={clip.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.035] p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
                        {clip.time}
                      </span>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                        {clip.status}
                      </span>
                    </div>
                    <h3 className="font-semibold">{clip.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Hook: “{clip.hook}”
                    </p>
                    <button className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
                      <Scissors className="h-4 w-4" />
                      Create clip
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-[2rem] p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10">
                  <Mic2 className="h-5 w-5 text-blue-200" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Voice editor</h2>
                  <p className="text-sm text-slate-400">
                    Tell Meeto what to edit.
                  </p>
                </div>
              </div>

              <textarea
                value={voiceCommand}
                onChange={(event) => setVoiceCommand(event.target.value)}
                className="min-h-28 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-500 focus:border-violet-400/50"
              />

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                <Wand2 className="h-4 w-4" />
                Apply voice command
              </button>

              <div className="mt-5 space-y-2">
                {commands.map((command) => (
                  <button
                    key={command}
                    onClick={() => setVoiceCommand(command)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.07]"
                  >
                    “{command}”
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="glass rounded-[2rem] p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Preview</p>
                  <h2 className="text-2xl font-semibold">Instagram Reel</h2>
                </div>
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
                  9:16
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr]">
                <div className="mx-auto w-full max-w-[260px]">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/20 via-slate-950 to-violet-600/30 shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-950">
                        <Play className="ml-1 h-7 w-7" />
                      </div>
                    </div>

                    <div className="absolute left-4 right-4 top-6 rounded-2xl bg-black/40 p-3 text-center backdrop-blur">
                      <p className="text-lg font-bold leading-tight">
                        Most meetings hide your best content
                      </p>
                    </div>

                    <div className="absolute bottom-24 left-4 right-4 rounded-2xl bg-white px-3 py-2 text-center text-sm font-bold text-slate-950">
                      Meeto turns calls into clips automatically
                    </div>

                    <div className="absolute bottom-6 left-4 right-4">
                      <div className="h-1.5 rounded-full bg-white/20">
                        <div className="h-full w-2/3 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <Captions className="h-5 w-5 text-violet-200" />
                      <h3 className="font-semibold">Caption style</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {captionStyles.map((style) => (
                        <button
                          key={style}
                          onClick={() => setSelectedStyle(style)}
                          className={`rounded-full px-4 py-2 text-sm transition ${
                            selectedStyle === style
                              ? "bg-white text-slate-950"
                              : "border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.07]"
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <Clapperboard className="h-5 w-5 text-blue-200" />
                      <h3 className="font-semibold">Timeline</h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        ["Hook", "0:00 - 0:04"],
                        ["Main insight", "0:04 - 0:38"],
                        ["CTA", "0:38 - 0:45"],
                      ].map(([label, time]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                        >
                          <div className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-emerald-300" />
                            <span className="text-sm text-slate-300">
                              {label}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-5">
                    <p className="text-sm font-medium text-violet-100">
                      Current edit command
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      “{voiceCommand}”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-[2rem] p-5">
              <h2 className="text-xl font-semibold">Export formats</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["Instagram Reel", "YouTube Short", "LinkedIn", "X Post"].map(
                  (item) => (
                    <button
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-sm text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}