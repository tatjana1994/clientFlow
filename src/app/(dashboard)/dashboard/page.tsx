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
        <h2 className='text-2xl font-semibold text-slate-950'>Overview</h2>
        <p className='mt-1 text-sm text-slate-500'>
          Live project and task metrics from Supabase.
        </p>
      </div>

      <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
          >
            <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700'>
              <stat.icon className='h-5 w-5' />
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
            {!recentProjects.length ? (
              <p className='rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-500'>
                No projects yet. Create your first project from the Projects
                page.
              </p>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4'
                >
                  <div>
                    <p className='font-medium text-slate-900'>{project.name}</p>
                    <p className='text-sm text-slate-500'>
                      {project.client_name}
                    </p>
                  </div>

                  <span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium capitalize text-emerald-700'>
                    {project.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-950'>
            Today&apos;s focus
          </h3>

          <div className='mt-5 space-y-3'>
            {!todayFocus.length ? (
              <p className='rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-500'>
                No open tasks. Everything is completed.
              </p>
            ) : (
              todayFocus.map((task) => (
                <div
                  key={task.id}
                  className='rounded-2xl border border-slate-200 px-4 py-3'
                >
                  <p className='text-sm font-medium text-slate-900'>
                    {task.title}
                  </p>

                  <p className='mt-1 text-xs capitalize text-slate-500'>
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
