import Link from "next/link";
import { Bot, CalendarDays, Clapperboard, FileText, Plus, Video } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-6 py-8">
      <div className="noise" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Meeto</span>
        </Link>

        <Link
          href="/upload"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-950"
        >
          Upload recording
        </Link>
      </nav>

      <section className="mx-auto max-w-7xl py-12">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Meeto Dashboard
        </h1>
        <p className="mt-3 text-slate-400">
          Upload meetings, view AI summaries, open content studio, and test live assistant.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Meetings recorded", "24", Video],
            ["AI summaries", "18", FileText],
            ["Clips generated", "67", Clapperboard],
            ["Upcoming meetings", "3", CalendarDays],
          ].map(([label, value, Icon]) => (
            <div key={label as string} className="glass rounded-3xl p-6">
              <Icon className="h-6 w-6 text-violet-200" />
              <p className="mt-5 text-sm text-slate-400">{label as string}</p>
              <p className="mt-2 text-3xl font-semibold">{value as string}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Link href="/upload" className="glass rounded-3xl p-6 hover:bg-white/10">
            <Plus className="h-6 w-6 text-violet-200" />
            <h2 className="mt-4 text-2xl font-semibold">Upload meeting</h2>
            <p className="mt-2 text-slate-400">
              Upload a real recording and generate AI notes.
            </p>
          </Link>

          <Link href="/meeting/demo" className="glass rounded-3xl p-6 hover:bg-white/10">
            <FileText className="h-6 w-6 text-blue-200" />
            <h2 className="mt-4 text-2xl font-semibold">Demo meeting</h2>
            <p className="mt-2 text-slate-400">
              View summary, transcript, action items, and clip suggestions.
            </p>
          </Link>

          <Link href="/content-studio" className="glass rounded-3xl p-6 hover:bg-white/10">
            <Clapperboard className="h-6 w-6 text-violet-200" />
            <h2 className="mt-4 text-2xl font-semibold">Content Studio</h2>
            <p className="mt-2 text-slate-400">
              Turn meeting moments into social clips and captions.
            </p>
          </Link>

          <Link href="/live" className="glass rounded-3xl p-6 hover:bg-white/10">
            <Bot className="h-6 w-6 text-emerald-200" />
            <h2 className="mt-4 text-2xl font-semibold">Live Assistant</h2>
            <p className="mt-2 text-slate-400">
              Test Meeto’s live meeting assistant UI.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}