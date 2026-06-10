"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  FileText,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";
import { useState } from "react";

const integrations = [
  {
    name: "Google Calendar",
    desc: "Find upcoming meetings and meeting links.",
    icon: CalendarDays,
  },
  {
    name: "Google Meet",
    desc: "Let Meeto join and record Meet calls.",
    icon: Video,
  },
  {
    name: "Zoom",
    desc: "Connect Zoom meetings and recordings.",
    icon: Video,
  },
  {
    name: "Microsoft Teams",
    desc: "Support team meetings and transcripts.",
    icon: MessageSquare,
  },
  {
    name: "Notion",
    desc: "Send meeting notes and summaries to Notion.",
    icon: FileText,
  },
];

const joinOptions = [
  {
    title: "Auto-join all meetings",
    desc: "Meeto joins every calendar meeting automatically.",
  },
  {
    title: "Ask before joining",
    desc: "Meeto asks for permission before every meeting.",
  },
  {
    title: "Only selected meetings",
    desc: "You choose which meetings Meeto should join.",
  },
  {
    title: "Manual invite only",
    desc: "Meeto joins only when you manually invite it.",
  },
];

export default function OnboardingPage() {
  const [connected, setConnected] = useState<string[]>(["Google Calendar"]);
  const [selectedOption, setSelectedOption] = useState("Only selected meetings");

  function toggleIntegration(name: string) {
    setConnected((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="noise" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-violet-500/20">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Meeto</span>
        </Link>

        <Link
          href="/dashboard"
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          Skip to demo
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 text-violet-300" />
            Setup your AI meeting agent
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Tell Meeto how to{" "}
            <span className="gradient-text">join your meetings.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Connect your calendar and meeting apps, then decide if Meeto should
            auto-join all meetings or only selected ones.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              "Connect tools used for meetings",
              "Choose auto-join preference",
              "Let Meeto record, summarize, and create content",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-slate-300">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15">
                  <Check className="h-4 w-4 text-emerald-300" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-violet-400/20 bg-violet-500/10 p-5">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-violet-200" />
              <h3 className="font-semibold text-violet-100">
                Privacy-first joining
              </h3>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              Meeto should always announce when it joins and records a meeting.
              This keeps the product professional and trustworthy.
            </p>
          </div>
        </div>

        <div className="glass rounded-[2rem] p-5 md:p-7">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 md:p-6">
            <div>
              <p className="text-sm text-slate-400">Step 1</p>
              <h2 className="mt-1 text-2xl font-semibold">
                Connect your tools
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Choose the apps Meeto can use to detect, join, record, and save
                meeting output.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {integrations.map((integration) => {
                const isConnected = connected.includes(integration.name);
                return (
                  <button
                    key={integration.name}
                    onClick={() => toggleIntegration(integration.name)}
                    className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                      isConnected
                        ? "border-violet-400/40 bg-violet-500/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                      <integration.icon className="h-6 w-6 text-violet-200" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium">{integration.name}</h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {integration.desc}
                      </p>
                    </div>

                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        isConnected
                          ? "border-violet-300 bg-violet-500"
                          : "border-white/20"
                      }`}
                    >
                      {isConnected && <Check className="h-4 w-4 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="my-8 h-px bg-white/10" />

            <div>
              <p className="text-sm text-slate-400">Step 2</p>
              <h2 className="mt-1 text-2xl font-semibold">
                How should Meeto join?
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                You can change this later from settings.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {joinOptions.map((option) => {
                const active = selectedOption === option.title;
                return (
                  <button
                    key={option.title}
                    onClick={() => setSelectedOption(option.title)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-blue-400/40 bg-blue-500/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{option.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {option.desc}
                        </p>
                      </div>

                      <div
                        className={`mt-1 h-5 w-5 rounded-full border ${
                          active
                            ? "border-blue-300 bg-blue-500"
                            : "border-white/20"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <Link
              href="/dashboard"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Finish setup
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}