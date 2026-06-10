import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Clapperboard,
  FileText,
  Mic2,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Video,
} from "lucide-react";

const stats = [
  {
    label: "Meetings recorded",
    value: "24",
    change: "+8 this week",
    icon: Video,
  },
  {
    label: "Hours saved",
    value: "18.5",
    change: "From summaries",
    icon: Clock3,
  },
  {
    label: "Clips generated",
    value: "67",
    change: "+21 this week",
    icon: Clapperboard,
  },
  {
    label: "Pending actions",
    value: "12",
    change: "Need review",
    icon: CheckCircle2,
  },
];

const upcomingMeetings = [
  {
    title: "Client Product Strategy Call",
    time: "Today, 3:00 PM",
    platform: "Google Meet",
    people: "Monu, Rahul, Aman",
    status: "Meeto will join",
  },
  {
    title: "Content Planning Session",
    time: "Tomorrow, 11:30 AM",
    platform: "Zoom",
    people: "Marketing team",
    status: "Ask before joining",
  },
  {
    title: "Founder Weekly Review",
    time: "Friday, 5:00 PM",
    platform: "Teams",
    people: "Core team",
    status: "Selected meeting",
  },
];

const recentMeetings = [
  {
    title: "Client Product Strategy Call",
    date: "Today",
    duration: "42 min",
    summary:
      "Discussed positioning, pricing objections, launch content, and next steps for the campaign.",
    clips: 7,
    status: "Ready",
  },
  {
    title: "Meeto Feature Planning",
    date: "Yesterday",
    duration: "58 min",
    summary:
      "Finalized auto-join flow, live AI help, recording consent, and content studio direction.",
    clips: 11,
    status: "Ready",
  },
  {
    title: "Landing Page Review",
    date: "2 days ago",
    duration: "31 min",
    summary:
      "Reviewed hero copy, CTA placement, dashboard preview, and Product Hunt launch messaging.",
    clips: 4,
    status: "Ready",
  },
];

const actions = [
  "Monu: Prepare landing page copy by Friday",
  "Rahul: Share product demo video by Wednesday",
  "Team: Review launch plan next Monday",
  "Meeto: Generate 3 clips from pricing discussion",
];

const navItems = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Meetings", href: "/meeting/demo", active: false },
  { label: "Content Studio", href: "/content-studio", active: false },
  { label: "Live Assistant", href: "/live", active: false },
  { label: "Settings", href: "/settings", active: false },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <div className="noise" />

      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-white/10 bg-slate-950/40 p-5 backdrop-blur-xl lg:block">
          <Link href="/" className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-violet-500/20">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Meeto</span>
          </Link>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                  item.active
                    ? "bg-white text-slate-950"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
                {item.active && <ArrowRight className="h-4 w-4" />}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl border border-violet-400/20 bg-violet-500/10 p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/20">
              <Sparkles className="h-5 w-5 text-violet-200" />
            </div>
            <h3 className="font-semibold">AI content studio</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Turn recordings into clips, captions, posts, and follow-ups.
            </p>
            <Link
              href="/content-studio"
              className="mt-4 inline-flex text-sm font-medium text-violet-200"
            >
              Open studio →
            </Link>
          </div>
        </aside>

        <section className="px-5 py-6 md:px-8 lg:px-10">
          <header className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-400">Welcome back, Monu</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
                Your meeting intelligence hub
              </h1>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                <Search className="h-4 w-4 text-slate-500" />
                <span>Search meetings...</span>
              </div>

              <Link
                href="/upload"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                <Plus className="h-4 w-4" />
                Upload recording
              </Link>
            </div>
          </header>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-3xl p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <stat.icon className="h-5 w-5 text-violet-200" />
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-slate-500" />
                </div>

                <p className="text-sm text-slate-400">{stat.label}</p>
                <h2 className="mt-2 text-3xl font-semibold">{stat.value}</h2>
                <p className="mt-2 text-xs text-emerald-300">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-7 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="space-y-7">
              <section className="glass rounded-[2rem] p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Calendar</p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      Upcoming meetings
                    </h2>
                  </div>

                  <Link
                    href="/upcoming"
                    className="text-sm font-medium text-violet-200 hover:text-violet-100"
                  >
                    View all
                  </Link>
                </div>

                <div className="grid gap-3">
                  {upcomingMeetings.map((meeting) => (
                    <div
                      key={meeting.title}
                      className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 transition hover:bg-white/[0.06]"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10">
                            <CalendarDays className="h-6 w-6 text-blue-200" />
                          </div>

                          <div>
                            <h3 className="font-semibold">{meeting.title}</h3>
                            <p className="mt-1 text-sm text-slate-400">
                              {meeting.time} · {meeting.platform}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {meeting.people}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                            {meeting.status}
                          </span>
                          <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10">
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="glass rounded-[2rem] p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Recordings</p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      Recent meetings
                    </h2>
                  </div>

                  <Link
                    href="/meeting/demo"
                    className="text-sm font-medium text-violet-200 hover:text-violet-100"
                  >
                    Open demo
                  </Link>
                </div>

                <div className="grid gap-4">
                  {recentMeetings.map((meeting) => (
                    <Link
                      href="/meeting/demo"
                      key={meeting.title}
                      className="group rounded-3xl border border-white/10 bg-white/[0.035] p-4 transition hover:bg-white/[0.06]"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex gap-4">
                          <div className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/30 to-violet-600/30">
                            <Play className="h-6 w-6 text-white" />
                            <div className="absolute inset-x-3 bottom-2 h-1 rounded-full bg-white/20">
                              <div className="h-full w-2/3 rounded-full bg-white" />
                            </div>
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold group-hover:text-violet-100">
                                {meeting.title}
                              </h3>
                              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-300">
                                {meeting.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-slate-400">
                              {meeting.date} · {meeting.duration} ·{" "}
                              {meeting.clips} clips
                            </p>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                              {meeting.summary}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-7">
              <section className="glass rounded-[2rem] p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Assistant</p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      Live help
                    </h2>
                  </div>
                  <Mic2 className="h-6 w-6 text-violet-200" />
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">Try asking Meeto</p>
                  <div className="mt-4 space-y-3">
                    {[
                      "Summarize the meeting so far",
                      "What should I ask next?",
                      "Research this competitor",
                    ].map((prompt) => (
                      <button
                        key={prompt}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/[0.07]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  <Link
                    href="/live"
                    className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                  >
                    Open live assistant
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>

              <section className="glass rounded-[2rem] p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Tasks</p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      Action items
                    </h2>
                  </div>
                  <FileText className="h-6 w-6 text-blue-200" />
                </div>

                <div className="space-y-3">
                  {actions.map((action) => (
                    <div
                      key={action}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <div className="mt-0.5 h-5 w-5 rounded-full border border-white/20" />
                      <p className="text-sm leading-6 text-slate-300">
                        {action}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="glass rounded-[2rem] p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Integrations</p>
                    <h2 className="mt-1 text-2xl font-semibold">Connected</h2>
                  </div>
                  <Settings className="h-6 w-6 text-slate-400" />
                </div>

                <div className="mt-5 grid gap-3">
                  {["Google Calendar", "Google Meet", "Notion"].map((tool) => (
                    <div
                      key={tool}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <span className="text-sm text-slate-300">{tool}</span>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}