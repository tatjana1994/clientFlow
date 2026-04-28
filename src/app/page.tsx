import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  FolderKanban,
  Lock,
  MessageSquare,
  ReceiptText,
  Sparkles,
  UploadCloud,
  Users,
} from 'lucide-react';

const features = [
  {
    title: 'Projects',
    description:
      'Manage client projects, deadlines, progress and status in one place.',
    icon: FolderKanban,
  },
  {
    title: 'Tasks',
    description:
      'Track tasks across projects with priorities and live status updates.',
    icon: CheckCircle2,
  },
  {
    title: 'Invoices',
    description:
      'Create and monitor invoices with paid, pending and overdue states.',
    icon: ReceiptText,
  },
  {
    title: 'Messages',
    description:
      'Keep client notes and internal updates connected to each project.',
    icon: MessageSquare,
  },
  {
    title: 'File uploads',
    description:
      'Upload and manage project documents securely with Supabase Storage.',
    icon: UploadCloud,
  },
  {
    title: 'Analytics',
    description:
      'Visualize project health, task progress and billing performance.',
    icon: BarChart3,
  },
];

const stats = [
  { label: 'Projects tracked', value: '120+' },
  { label: 'Tasks organized', value: '2.4k' },
  { label: 'Invoices managed', value: '$84k' },
];

export default function HomePage() {
  return (
    <main className='min-h-screen bg-[#070A12] text-white'>
      <header className='sticky top-0 z-50 border-b border-white/10 bg-[#070A12]/80 backdrop-blur-xl'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5'>
          <Link href='/' className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-card text-[#070A12]'>
              <Sparkles className='h-5 w-5' />
            </div>

            <div>
              <p className='font-semibold leading-none'>ClientFlow</p>
              <p className='mt-1 text-xs text-white/45'>Agency Portal</p>
            </div>
          </Link>

          <nav className='hidden items-center gap-8 text-sm text-white/60 md:flex'>
            <a href='#features' className='transition hover:text-white'>
              Features
            </a>
            <a href='#dashboard' className='transition hover:text-white'>
              Dashboard
            </a>
            <a href='#tech' className='transition hover:text-white'>
              Tech stack
            </a>
          </nav>

          <div className='flex items-center gap-3'>
            <Link
              href='/login'
              className='hidden rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white sm:inline-flex'
            >
              Login
            </Link>

            <Link
              href='/register'
              className='inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-[#070A12] transition hover:bg-card/90'
            >
              Open demo
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </div>
      </header>

      <section className='relative overflow-hidden px-6 py-24 sm:py-32'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.22),transparent_35%),radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_32%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_40%)]' />
        <div className='absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl' />

        <div className='relative mx-auto max-w-7xl'>
          <div className='mx-auto max-w-4xl text-center'>
            <div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/5 px-4 py-2 text-sm text-white/70 shadow-2xl backdrop-blur'>
              <Lock className='h-4 w-4' />
              Modern client portal built with Next.js and Supabase
            </div>

            <h1 className='mt-8 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl'>
              A premium dashboard for managing agency client work.
            </h1>

            <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60'>
              ClientFlow helps agencies organize projects, tasks, invoices,
              documents, client messages and analytics in one polished portal.
            </p>

            <div className='mt-10 flex flex-col justify-center gap-4 sm:flex-row'>
              <Link
                href='/register'
                className='inline-flex items-center justify-center gap-2 rounded-full bg-card px-7 py-4 text-sm font-semibold text-[#070A12] transition hover:bg-card/90'
              >
                Try live demo
                <ArrowRight className='h-4 w-4' />
              </Link>

              <a
                href='#dashboard'
                className='inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition hover:bg-card/10'
              >
                View dashboard preview
              </a>
            </div>
          </div>

          <div id='dashboard' className='mx-auto mt-20 max-w-6xl'>
            <div className='rounded-[2rem] border border-white/10 bg-card/[0.04] p-3 shadow-2xl backdrop-blur'>
              <div className='rounded-[1.5rem] border border-white/10 bg-[#0D1220] p-5'>
                <div className='flex items-center justify-between border-b border-white/10 pb-5'>
                  <div>
                    <p className='text-sm text-white/45'>Overview</p>
                    <h2 className='mt-1 text-xl font-semibold'>
                      Agency Dashboard
                    </h2>
                  </div>

                  <div className='hidden rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 sm:block'>
                    Live workspace
                  </div>
                </div>

                <div className='mt-5 grid gap-4 md:grid-cols-3'>
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className='rounded-3xl border border-white/10 bg-card/[0.04] p-5'
                    >
                      <p className='text-sm text-white/45'>{stat.label}</p>
                      <p className='mt-3 text-3xl font-semibold'>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className='mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]'>
                  <div className='rounded-3xl border border-white/10 bg-card/[0.04] p-5'>
                    <div className='flex items-center justify-between'>
                      <h3 className='font-semibold'>Recent projects</h3>
                      <span className='text-xs text-white/40'>4 active</span>
                    </div>

                    <div className='mt-5 space-y-3'>
                      {[
                        ['Website Redesign', 'Northstar Agency', '68%'],
                        ['Brand Strategy', 'Luma Studio', '82%'],
                        ['SEO Growth Plan', 'Evergreen Co.', '34%'],
                      ].map(([project, client, progress]) => (
                        <div
                          key={project}
                          className='rounded-2xl bg-card/[0.04] p-4'
                        >
                          <div className='flex items-center justify-between'>
                            <div>
                              <p className='font-medium'>{project}</p>
                              <p className='mt-1 text-sm text-white/45'>
                                {client}
                              </p>
                            </div>

                            <span className='rounded-full bg-card/10 px-3 py-1 text-xs'>
                              {progress}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='rounded-3xl border border-white/10 bg-card/[0.04] p-5'>
                    <h3 className='font-semibold'>Today&apos;s focus</h3>

                    <div className='mt-5 space-y-3'>
                      {[
                        'Review homepage wireframe',
                        'Send invoice reminder',
                        'Prepare weekly client report',
                      ].map((task) => (
                        <div
                          key={task}
                          className='flex items-center gap-3 rounded-2xl bg-card/[0.04] p-4'
                        >
                          <div className='h-2.5 w-2.5 rounded-full bg-sky-300' />
                          <p className='text-sm text-white/75'>{task}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='features' className='px-6 py-24'>
        <div className='mx-auto max-w-7xl'>
          <div className='max-w-2xl'>
            <p className='text-sm font-semibold uppercase tracking-[0.25em] text-sky-300'>
              Features
            </p>
            <h2 className='mt-4 text-4xl font-semibold tracking-tight'>
              Everything an agency needs to manage client work.
            </h2>
            <p className='mt-4 text-white/55'>
              Built as a realistic SaaS dashboard with real authentication,
              protected routes, Supabase data and modern UI patterns.
            </p>
          </div>

          <div className='mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className='rounded-3xl border border-white/10 bg-card/[0.04] p-6 transition hover:bg-card/[0.07]'
              >
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-card text-[#070A12]'>
                  <feature.icon className='h-5 w-5' />
                </div>

                <h3 className='mt-6 text-lg font-semibold'>{feature.title}</h3>
                <p className='mt-3 text-sm leading-6 text-white/55'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id='tech' className='px-6 pb-24'>
        <div className='mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]'>
          <div className='rounded-3xl border border-white/10 bg-card/[0.04] p-8'>
            <Users className='h-8 w-8 text-sky-300' />
            <h2 className='mt-6 text-3xl font-semibold'>
              Built for portfolio impact.
            </h2>
            <p className='mt-4 leading-7 text-white/55'>
              This project demonstrates real frontend product thinking:
              authenticated workflows, CRUD operations, dashboard UX, responsive
              design, analytics and storage.
            </p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            {[
              [
                'Next.js App Router',
                'Protected routes, server components and modern routing.',
              ],
              [
                'Supabase Auth',
                'Email/password authentication and secure user sessions.',
              ],
              [
                'Supabase Database',
                'Projects, tasks, invoices, messages and team data.',
              ],
              [
                'Supabase Storage',
                'Private project file uploads and document management.',
              ],
              [
                'Tailwind CSS',
                'Responsive SaaS UI with polished layout and spacing.',
              ],
              ['Recharts', 'Analytics charts for dashboard insights.'],
            ].map(([title, description]) => (
              <div
                key={title}
                className='rounded-3xl border border-white/10 bg-card/[0.04] p-6'
              >
                <FileText className='h-5 w-5 text-white/70' />
                <h3 className='mt-4 font-semibold'>{title}</h3>
                <p className='mt-2 text-sm leading-6 text-white/50'>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='px-6 pb-16'>
        <div className='mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-card p-8 text-[#070A12] sm:p-10'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
            <div>
              <h2 className='text-3xl font-semibold'>
                Explore the live ClientFlow dashboard.
              </h2>
              <p className='mt-3 max-w-2xl text-slate-600'>
                Create an account, generate demo workspace data and test the
                full agency portal flow.
              </p>
            </div>

            <Link
              href='/register'
              className='inline-flex items-center justify-center gap-2 rounded-full bg-[#070A12] px-7 py-4 text-sm font-semibold text-white transition hover:bg-slate-800'
            >
              Launch demo
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
