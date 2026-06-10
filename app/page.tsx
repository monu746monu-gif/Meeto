import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Clapperboard,
  FileText,
  Mic2,
  Sparkles,
  Video,
  Wand2,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Auto-join meetings",
    desc: "Connect your calendar and let Meeto join selected calls automatically.",
  },
  {
    icon: Video,
    title: "Record everything",
    desc: "Capture meetings, speaker context, key moments, and decisions.",
  },
  {
    icon: FileText,
    title: "10-point summaries",
    desc: "Get clean notes, action items, follow-ups, and meeting memory.",
  },
  {
    icon: Bot,
    title: "Live AI help",
    desc: "Ask Meeto during calls for summaries, replies, research, or next questions.",
  },
  {
    icon: Clapperboard,
    title: "Meeting to content",
    desc: "Turn discussions into reels, clips, posts, newsletters, and threads.",
  },
  {
    icon: Wand2,
    title: "Voice editing",
    desc: "Say: cut this topic, add captions, make it 9:16, and export.",
  },
];

const steps = [
  "Connect calendar and meeting apps",
  "Choose auto-join or selected meetings",
  "Meeto joins, greets, records, and helps live",
  "Get summary, notes, clips, and content after the call",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="noise" />
      <div className="hero-grid absolute inset-0 -z-10" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-violet-500/20">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Meeto</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#workflow" className="hover:text-white">
            Workflow
          </a>
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
        </div>

        <Link
          href="/onboarding"
          className="rounded-full border border-white/10 bg-white px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
        >
          Start building
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 text-violet-300" />
            AI meeting agent + content studio
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Turn every meeting into{" "}
            <span className="gradient-text">notes, clips, and content.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Meeto joins your meetings, records everything, helps you live, creates
            10-point summaries, and turns the best moments into editable
            short-form content using voice commands.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/onboarding"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Start with Meeto
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/meeting/demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View demo workspace
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {[
              ["42 min", "Meeting recorded"],
              ["10 pts", "Smart summary"],
              ["7 clips", "Content found"],
            ].map(([value, label]) => (
              <div key={label} className="glass rounded-2xl p-4">
                <p className="text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-blue-500/20 to-violet-600/20 blur-3xl" />

          <div className="glass relative rounded-[2rem] p-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Live meeting</p>
                  <h3 className="mt-1 text-xl font-semibold">
                    Client Product Strategy Call
                  </h3>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                  Recording
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  ["Monu", "Meeto, summarize what we discussed till now."],
                  [
                    "Meeto AI",
                    "Main topics: launch positioning, pricing objections, and content plan.",
                  ],
                  ["Rahul", "Can we cut the part where pricing was discussed?"],
                ].map(([name, text]) => (
                  <div
                    key={text}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-xs text-slate-400">{name}</p>
                    <p className="mt-2 text-sm text-slate-200">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Mic2 className="h-4 w-4 text-violet-300" />
                  <p className="text-sm font-medium text-violet-100">
                    Voice command
                  </p>
                </div>
                <p className="text-sm text-slate-300">
                  “Cut the clip where I discussed pricing and add captions.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-violet-300">Features</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            More than a meeting recorder.
          </h2>
          <p className="mt-4 text-slate-300">
            Meeto is a meeting agent, live assistant, and content studio in one
            product.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="glass rounded-3xl p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <feature.icon className="h-6 w-6 text-violet-200" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 py-20">
        <div className="glass rounded-[2rem] p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium text-blue-300">Workflow</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                From calendar to content.
              </h2>
              <p className="mt-4 text-slate-300">
                Meeto handles the whole meeting lifecycle, from joining the call
                to creating post-ready content.
              </p>
            </div>

            <div className="grid gap-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-slate-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Build your AI meeting teammate.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-slate-300">
          Start with the demo UI, then connect real calendar, recording,
          transcription, and content editing features.
        </p>
        <Link
          href="/onboarding"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          Start setup
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}