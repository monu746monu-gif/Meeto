import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";

export default function Home() {
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
          href="/dashboard"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-950"
        >
          Dashboard
        </Link>
      </nav>

      <section className="mx-auto flex max-w-5xl flex-col items-center justify-center py-28 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          AI meeting agent + content studio
        </div>

        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Turn every meeting into{" "}
          <span className="gradient-text">notes, clips, and content.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Meeto records meetings, creates AI summaries, action items, follow-up
          emails, and turns the best moments into content.
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
          >
            Start with Meeto
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/meeting/demo"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
          >
            View demo
          </Link>
        </div>
      </section>
    </main>
  );
}