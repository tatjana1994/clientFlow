import { AnalyticsCharts } from '@/src/components/analytics/analytics-charts';
import { createClient } from '@/src/lib/supabase/server';
import {
  CheckCircle2,
  FolderKanban,
  ReceiptText,
  TrendingUp,
} from 'lucide-react';

type Project = {
  id: string;
  status: string;
  created_at: string;
};

type Task = {
  id: string;
  status: string;
  priority: string;
  created_at: string;
};

type Invoice = {
  id: string;
  amount: number;
  status: string;
  created_at: string;
};

type Message = {
  id: string;
  type: string;
  created_at: string;
};

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('projects')
    .select('id, status, created_at');

  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, status, priority, created_at');

  const { data: invoices } = await supabase
    .from('invoices')
    .select('id, amount, status, created_at');

  const { data: messages } = await supabase
    .from('messages')
    .select('id, type, created_at');

  const typedProjects = (projects || []) as Project[];
  const typedTasks = (tasks || []) as Task[];
  const typedInvoices = (invoices || []) as Invoice[];
  const typedMessages = (messages || []) as Message[];

  const completedTasks = typedTasks.filter(
    (task) => task.status === 'done',
  ).length;

  const completionRate =
    typedTasks.length > 0
      ? Math.round((completedTasks / typedTasks.length) * 100)
      : 0;

  const totalRevenue = typedInvoices
    .filter((invoice) => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  const pendingRevenue = typedInvoices
    .filter((invoice) => invoice.status !== 'paid')
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  const overviewCards = [
    {
      label: 'Total projects',
      value: typedProjects.length,
      icon: FolderKanban,
    },
    {
      label: 'Total tasks',
      value: typedTasks.length,
      icon: CheckCircle2,
    },
    {
      label: 'Task completion',
      value: `${completionRate}%`,
      icon: TrendingUp,
    },
    {
      label: 'Paid revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: ReceiptText,
    },
  ];

  const projectStatusData = [
    {
      name: 'Active',
      value: typedProjects.filter((project) => project.status === 'active')
        .length,
    },
    {
      name: 'Completed',
      value: typedProjects.filter((project) => project.status === 'completed')
        .length,
    },
    {
      name: 'Paused',
      value: typedProjects.filter((project) => project.status === 'paused')
        .length,
    },
  ];

  const invoiceStatusData = [
    {
      name: 'Paid',
      value: typedInvoices.filter((invoice) => invoice.status === 'paid')
        .length,
    },
    {
      name: 'Pending',
      value: typedInvoices.filter((invoice) => invoice.status === 'pending')
        .length,
    },
    {
      name: 'Overdue',
      value: typedInvoices.filter((invoice) => invoice.status === 'overdue')
        .length,
    },
  ];

  const taskCompletionData = [
    {
      name: 'Done',
      value: typedTasks.filter((task) => task.status === 'done').length,
    },
    {
      name: 'In progress',
      value: typedTasks.filter((task) => task.status === 'in_progress').length,
    },
    {
      name: 'Todo',
      value: typedTasks.filter((task) => task.status === 'todo').length,
    },
  ];

  const recentActivity = [
    ...typedProjects.map((item) => ({
      type: 'Project',
      label: `Project marked as ${item.status}`,
      date: item.created_at,
    })),
    ...typedTasks.map((item) => ({
      type: 'Task',
      label: `Task marked as ${item.status.replace('_', ' ')}`,
      date: item.created_at,
    })),
    ...typedInvoices.map((item) => ({
      type: 'Invoice',
      label: `Invoice marked as ${item.status}`,
      date: item.created_at,
    })),
    ...typedMessages.map((item) => ({
      type: 'Message',
      label: `${item.type === 'internal' ? 'Internal note' : 'Client note'} added`,
      date: item.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-2xl font-semibold text-slate-950'>Analytics</h2>
        <p className='mt-1 text-sm text-slate-500'>
          Track project health, billing performance and task progress.
        </p>
      </div>

      <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
          >
            <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700'>
              <card.icon className='h-5 w-5' />
            </div>

            <p className='mt-5 text-3xl font-semibold text-slate-950'>
              {card.value}
            </p>

            <p className='mt-1 text-sm text-slate-500'>{card.label}</p>
          </div>
        ))}
      </div>

      <AnalyticsCharts
        projectStatusData={projectStatusData}
        invoiceStatusData={invoiceStatusData}
        taskCompletionData={taskCompletionData}
        pendingRevenue={pendingRevenue}
        recentActivity={recentActivity}
      />
    </div>
  );
}
