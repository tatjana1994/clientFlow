import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FolderKanban,
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className='min-h-screen bg-[#0B0F19] text-white'>
      <section className='relative overflow-hidden px-6 py-24'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_35%),radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_30%)]' />

        <div className='relative mx-auto max-w-6xl'>
          <div className='max-w-3xl'>
            <span className='rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70'>
              Client portal for modern agencies
            </span>

            <h1 className='mt-8 text-5xl font-semibold tracking-tight md:text-7xl'>
              Manage clients, projects and tasks in one clean dashboard.
            </h1>

            <p className='mt-6 max-w-2xl text-lg leading-8 text-white/65'>
              ClientFlow helps agencies organize client communication, track
              projects, manage invoices and keep everything transparent.
            </p>

            <div className='mt-10 flex flex-wrap gap-4'>
              <Link
                href='/login'
                className='inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B0F19] transition hover:bg-white/90'
              >
                View demo dashboard
                <ArrowRight className='h-4 w-4' />
              </Link>

              <Link
                href='#features'
                className='inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10'
              >
                Explore features
              </Link>
            </div>
          </div>

          <div id='features' className='mt-20 grid gap-5 md:grid-cols-3'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className='rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur'
              >
                <feature.icon className='h-7 w-7 text-sky-300' />
                <h3 className='mt-5 text-lg font-semibold'>{feature.title}</h3>
                <p className='mt-3 text-sm leading-6 text-white/60'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    title: 'Projects',
    description:
      'Track active client projects, deadlines, progress and ownership.',
    icon: FolderKanban,
  },
  {
    title: 'Tasks',
    description: 'Create, assign and update tasks with clear statuses.',
    icon: CheckCircle2,
  },
  {
    title: 'Analytics',
    description: 'Show project health, invoice totals and client activity.',
    icon: BarChart3,
  },
];
