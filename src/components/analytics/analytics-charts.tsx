'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ChartItem = {
  name: string;
  value: number;
};

type RecentActivityItem = {
  type: string;
  label: string;
  date: string;
};

type AnalyticsChartsProps = {
  projectStatusData: ChartItem[];
  invoiceStatusData: ChartItem[];
  taskCompletionData: ChartItem[];
  pendingRevenue: number;
  recentActivity: RecentActivityItem[];
};

const chartColors = ['#020617', '#64748b', '#cbd5e1'];

export function AnalyticsCharts({
  projectStatusData,
  invoiceStatusData,
  taskCompletionData,
  pendingRevenue,
  recentActivity,
}: AnalyticsChartsProps) {
  return (
    <div className='grid gap-5 xl:grid-cols-2'>
      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <div>
          <h3 className='text-lg font-semibold text-slate-950'>
            Project status
          </h3>
          <p className='mt-1 text-sm text-slate-500'>
            Distribution of projects by current status.
          </p>
        </div>

        <div className='mt-6 h-72'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={projectStatusData}
                dataKey='value'
                nameKey='name'
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
              >
                {projectStatusData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <div>
          <h3 className='text-lg font-semibold text-slate-950'>
            Invoice status
          </h3>
          <p className='mt-1 text-sm text-slate-500'>
            Paid, pending and overdue invoice count.
          </p>
        </div>

        <div className='mt-6 h-72'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={invoiceStatusData}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis dataKey='name' />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey='value' radius={[12, 12, 0, 0]}>
                {invoiceStatusData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <div>
          <h3 className='text-lg font-semibold text-slate-950'>
            Task completion
          </h3>
          <p className='mt-1 text-sm text-slate-500'>
            Breakdown of tasks by delivery status.
          </p>
        </div>

        <div className='mt-6 h-72'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis dataKey='name' />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey='value' radius={[12, 12, 0, 0]}>
                {taskCompletionData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h3 className='text-lg font-semibold text-slate-950'>
          Recent activity
        </h3>

        <div className='mt-5 rounded-2xl bg-slate-50 p-4'>
          <p className='text-sm text-slate-500'>Pending revenue</p>
          <p className='mt-2 text-3xl font-semibold text-slate-950'>
            ${pendingRevenue.toLocaleString()}
          </p>
        </div>

        <div className='mt-5 space-y-3'>
          {!recentActivity.length ? (
            <p className='rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500'>
              No recent activity yet.
            </p>
          ) : (
            recentActivity.map((activity, index) => (
              <div
                key={`${activity.type}-${activity.date}-${index}`}
                className='rounded-2xl border border-slate-100 px-4 py-3'
              >
                <div className='flex items-center justify-between gap-3'>
                  <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700'>
                    {activity.type}
                  </span>

                  <span className='text-xs text-slate-400'>
                    {new Date(activity.date).toLocaleDateString('en-US')}
                  </span>
                </div>

                <p className='mt-2 text-sm text-slate-700'>{activity.label}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
