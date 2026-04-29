import { GenerateDemoButton } from '@/src/components/demo/generate-demo-button';
import { createClient } from '@/src/lib/supabase/server';
import { CheckCircle2, Clock3, FolderKanban, ReceiptText } from 'lucide-react';

type Project = {
  id: string;
  name: string;
  client_name: string;
  status: string;
  due_date: string | null;
  created_at: string;
};

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  created_at: string;
};

type Invoice = {
  id: string;
  amount: number;
  status: string;
};

type Message = {
  id: string;
  message: string;
  type: string;
  created_at: string;
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('projects')
    .select('id, name, client_name, status, due_date, created_at')
    .order('created_at', { ascending: false });

  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, title, status, priority, created_at')
    .order('created_at', { ascending: false });

  const { data: invoices } = await supabase
    .from('invoices')
    .select('id, amount, status');

  const { data: messages } = await supabase
    .from('messages')
    .select('id, message, type, created_at')
    .order('created_at', { ascending: false })
    .limit(3);

  const typedInvoices = (invoices || []) as Invoice[];
  const typedMessages = (messages || []) as Message[];

  const pendingAmount = typedInvoices
    .filter((invoice) => invoice.status !== 'paid')
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  const typedProjects = (projects || []) as Project[];
  const typedTasks = (tasks || []) as Task[];

  const activeProjects = typedProjects.filter(
    (project) => project.status === 'active',
  ).length;

  const openTasks = typedTasks.filter((task) => task.status !== 'done').length;

  const completedTasks = typedTasks.filter(
    (task) => task.status === 'done',
  ).length;

  const completionRate =
    typedTasks.length > 0
      ? Math.round((completedTasks / typedTasks.length) * 100)
      : 0;

  const highPriorityTasks = typedTasks.filter(
    (task) => task.priority === 'high' && task.status !== 'done',
  ).length;

  const stats = [
    {
      label: 'Active projects',
      value: String(activeProjects),
      icon: FolderKanban,
    },
    {
      label: 'Open tasks',
      value: String(openTasks),
      icon: CheckCircle2,
    },
    {
      label: 'Completion rate',
      value: `${completionRate}%`,
      icon: ReceiptText,
    },
    {
      label: 'Pending invoices',
      value: `$${pendingAmount.toLocaleString()}`,
      icon: ReceiptText,
    },
    {
      label: 'High priority',
      value: String(highPriorityTasks),
      icon: Clock3,
    },
  ];

  const recentProjects = typedProjects.slice(0, 3);
  const todayFocus = typedTasks
    .filter((task) => task.status !== 'done')
    .slice(0, 4);

  return (
    <div>
      <div className='mb-8'>
        <h2 className='text-2xl font-semibold text-card-foreground'>
          Overview
        </h2>
        <p className='mt-1 text-sm text-muted'>
          Live project and task metrics from Supabase.
        </p>
      </div>

      <GenerateDemoButton />

      <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='rounded-3xl border border-border bg-card p-6 shadow-sm'
          >
            <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700'>
              <stat.icon className='h-5 w-5' />
            </div>

            <p className='mt-5 text-3xl font-semibold text-card-foreground'>
              {stat.value}
            </p>

            <p className='mt-1 text-sm text-muted'>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className='mt-8 grid gap-5 xl:grid-cols-3'>
        <div className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
          <h3 className='text-lg font-semibold text-card-foreground'>
            Recent projects
          </h3>

          <div className='mt-5 space-y-4'>
            {!recentProjects.length ? (
              <p className='rounded-2xl bg-background px-4 py-4 text-sm text-muted'>
                No projects yet. Create your first project from the Projects
                page.
              </p>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className='flex items-center justify-between rounded-2xl bg-background px-4 py-4'
                >
                  <div>
                    <p className='font-medium text-card-foreground'>
                      {project.name}
                    </p>
                    <p className='text-sm text-muted'>{project.client_name}</p>
                  </div>

                  <span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium capitalize text-emerald-700'>
                    {project.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
          <h3 className='text-lg font-semibold text-card-foreground'>
            Today&apos;s focus
          </h3>

          <div className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
            <h3 className='text-lg font-semibold text-card-foreground'>
              Recent messages
            </h3>

            <div className='mt-5 space-y-3'>
              {!typedMessages.length ? (
                <p className='rounded-2xl bg-background px-4 py-4 text-sm text-muted'>
                  No recent messages yet.
                </p>
              ) : (
                typedMessages.map((message) => (
                  <div
                    key={message.id}
                    className='rounded-2xl border border-border px-4 py-3'
                  >
                    <div className='mb-2 flex items-center justify-between gap-3'>
                      <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700'>
                        {message.type}
                      </span>

                      <span className='text-xs text-slate-400'>
                        {new Date(message.created_at).toLocaleDateString(
                          'en-US',
                        )}
                      </span>
                    </div>

                    <p className='line-clamp-2 text-sm text-slate-700'>
                      {message.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className='mt-5 space-y-3'>
            {!todayFocus.length ? (
              <p className='rounded-2xl bg-background px-4 py-4 text-sm text-muted'>
                No open tasks. Everything is completed.
              </p>
            ) : (
              todayFocus.map((task) => (
                <div
                  key={task.id}
                  className='rounded-2xl border border-border px-4 py-3'
                >
                  <p className='text-sm font-medium text-card-foreground'>
                    {task.title}
                  </p>

                  <p className='mt-1 text-xs capitalize text-muted'>
                    {task.priority} priority · {task.status.replace('_', ' ')}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
