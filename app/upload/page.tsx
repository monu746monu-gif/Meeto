"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  FileAudio,
  FileVideo,
  Loader2,
  Mic2,
  Sparkles,
  UploadCloud,
  Wand2,
} from "lucide-react";

const processingSteps = [
  "Uploading meeting recording",
  "Transcribing conversation",
  "Detecting speakers and topics",
  "Creating 10-point summary",
  "Finding action items",
  "Finding content-worthy moments",
  "Preparing Content Studio",
];

export default function UploadPage() {
  const [title, setTitle] = useState("Client Product Strategy Call");
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  function handleFakeUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);
    setCompletedSteps([]);

    processingSteps.forEach((_, index) => {
      setTimeout(() => {
        setCompletedSteps((current) => [...current, index]);

        if (index === processingSteps.length - 1) {
          setTimeout(() => {
            window.location.href = "/meeting/demo";
          }, 900);
        }
      }, 800 * (index + 1));
    });
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="noise" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between">
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
          Back to dashboard
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 text-violet-300" />
            Upload meeting recording
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Turn one recording into{" "}
            <span className="gradient-text">notes, tasks, and clips.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Upload a Zoom, Google Meet, Teams, or offline meeting recording.
            Meeto will create a transcript, 10-point summary, action items,
            follow-up email, content ideas, and clip suggestions.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["10-point", "Summary"],
              ["AI", "Clip finder"],
              ["Voice", "Content editing"],
            ].map(([value, label]) => (
              <div key={label} className="glass rounded-3xl p-5">
                <p className="text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-blue-400/20 bg-blue-500/10 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-blue-200" />
              <h3 className="font-semibold text-blue-100">
                Voice editing preview
              </h3>
            </div>
            <p className="text-sm leading-6 text-slate-300">
              After processing, you can say commands like “cut the clip where I
              discussed pricing”, “add captions”, or “make it 9:16”.
            </p>
          </div>
        </div>

        <div className="glass rounded-[2rem] p-5 md:p-7">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 md:p-6">
            <div>
              <p className="text-sm text-slate-400">New recording</p>
              <h2 className="mt-1 text-2xl font-semibold">
                Upload meeting file
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                For now this is a demo upload flow. Later we will connect
                Supabase storage and AI processing.
              </p>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-slate-300">
                Meeting title
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter meeting title"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/50"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="meeting-file"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.035] px-6 py-12 text-center transition hover:border-violet-300/40 hover:bg-violet-500/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-violet-500/20">
                  <UploadCloud className="h-8 w-8 text-white" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  Drop your meeting recording here
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  Upload your Zoom, Google Meet, Teams, podcast, interview, or
                  client call recording.
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["MP4", "MP3", "WAV", "M4A", "WEBM"].map((format) => (
                    <span
                      key={format}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
                    >
                      {format}
                    </span>
                  ))}
                </div>

                <input
                  id="meeting-file"
                  type="file"
                  accept=".mp4,.mp3,.wav,.m4a,.webm"
                  className="hidden"
                  onChange={handleFakeUpload}
                />
              </label>
            </div>

            {fileName && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    {fileName.toLowerCase().includes("mp4") ||
                    fileName.toLowerCase().includes("webm") ? (
                      <FileVideo className="h-5 w-5 text-violet-200" />
                    ) : (
                      <FileAudio className="h-5 w-5 text-violet-200" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{fileName}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {isProcessing ? "Processing with Meeto AI..." : "Ready"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="mt-6 rounded-[1.5rem] border border-violet-400/20 bg-violet-500/10 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-violet-100">
                      Preparing your meeting workspace
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Meeto is turning your recording into notes and content.
                    </p>
                  </div>

                  <Loader2 className="h-5 w-5 animate-spin text-violet-200" />
                </div>

                <div className="space-y-3">
                  {processingSteps.map((step, index) => {
                    const done = completedSteps.includes(index);

                    return (
                      <div
                        key={step}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3"
                      >
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full ${
                            done
                              ? "bg-emerald-500 text-white"
                              : "bg-white/10 text-slate-500"
                          }`}
                        >
                          {done ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Mic2 className="h-4 w-4" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            done ? "text-slate-100" : "text-slate-400"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {!isProcessing && (
              <Link
                href="/meeting/demo"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Open demo meeting
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}