import { CheckCircle2, Clock3, FolderKanban, ReceiptText } from 'lucide-react';

const stats = [
  {
    label: 'Active projects',
    value: '12',
    icon: FolderKanban,
  },
  {
    label: 'Open tasks',
    value: '48',
    icon: CheckCircle2,
  },
  {
    label: 'Pending invoices',
    value: '$8,420',
    icon: ReceiptText,
  },
  {
    label: 'Avg. response time',
    value: '2.4h',
    icon: Clock3,
  },
];

export default function DashboardPage() {
  return (
    <div>
      <div className='mb-8'>
        <h2 className='text-2xl font-semibold text-slate-950'>Overview</h2>
        <p className='mt-1 text-sm text-slate-500'>
          Track your agency performance and client work in one place.
        </p>
      </div>

      <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
          >
            <div className='flex items-center justify-between'>
              <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700'>
                <stat.icon className='h-5 w-5' />
              </div>
            </div>

            <p className='mt-5 text-3xl font-semibold text-slate-950'>
              {stat.value}
            </p>
            <p className='mt-1 text-sm text-slate-500'>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className='mt-8 grid gap-5 xl:grid-cols-[1.4fr_0.8fr]'>
        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-950'>
            Recent projects
          </h3>

          <div className='mt-5 space-y-4'>
            {['Website redesign', 'Brand strategy', 'SEO Sprint'].map(
              (project, index) => (
                <div
                  key={project}
                  className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4'
                >
                  <div>
                    <p className='font-medium text-slate-900'>{project}</p>
                    <p className='text-sm text-slate-500'>
                      Client #{index + 1}
                    </p>
                  </div>

                  <span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>
                    Active
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-950'>
            Today&apos;s focus
          </h3>

          <div className='mt-5 space-y-3'>
            {[
              'Review client feedback',
              'Send invoice reminder',
              'Prepare weekly report',
            ].map((task) => (
              <div
                key={task}
                className='rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700'
              >
                {task}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
