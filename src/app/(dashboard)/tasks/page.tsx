import { TaskRowActions } from '@/src/components/tasks/task-row-actions';
import { createClient } from '@/src/lib/supabase/server';
import { CheckCircle2, Clock3, Flame, ListTodo } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  created_at: string;
  projects:
    | {
        name: string;
        client_name: string;
      }[]
    | null;
};

function getStatusClass(status: string) {
  if (status === 'done') {
    return 'bg-emerald-50 text-emerald-700';
  }

  if (status === 'in_progress') {
    return 'bg-sky-50 text-sky-700';
  }

  return 'bg-slate-100 text-slate-700';
}

function getPriorityClass(priority: string) {
  if (priority === 'high') {
    return 'bg-red-50 text-red-700';
  }

  if (priority === 'medium') {
    return 'bg-amber-50 text-amber-700';
  }

  return 'bg-slate-100 text-slate-600';
}

export default async function TasksPage({
  searchParams,
}: {
  searchParams?: Promise<{
    status?: string;
    priority?: string;
  }>;
}) {
  const params = (await searchParams) || {};
  const statusFilter = params.status || 'all';
  const priorityFilter = params.priority || 'all';

  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from('tasks')
    .select(
      `
      id,
      title,
      status,
      priority,
      created_at,
      projects (
        name,
        client_name
      )
    `,
    )
    .order('created_at', { ascending: false });

  let typedTasks = (tasks || []) as Task[];

  if (statusFilter !== 'all') {
    typedTasks = typedTasks.filter((task) => task.status === statusFilter);
  }

  if (priorityFilter !== 'all') {
    typedTasks = typedTasks.filter((task) => task.priority === priorityFilter);
  }

  const allTasks = (tasks || []) as Task[];

  const openTasks = allTasks.filter((task) => task.status !== 'done').length;
  const completedTasks = allTasks.filter(
    (task) => task.status === 'done',
  ).length;
  const highPriorityTasks = allTasks.filter(
    (task) => task.priority === 'high' && task.status !== 'done',
  ).length;

  const stats = [
    {
      label: 'All tasks',
      value: allTasks.length,
      icon: ListTodo,
    },
    {
      label: 'Open tasks',
      value: openTasks,
      icon: Clock3,
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
    },
    {
      label: 'High priority',
      value: highPriorityTasks,
      icon: Flame,
    },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-2xl font-semibold text-slate-950'>Tasks</h2>
        <p className='mt-1 text-sm text-slate-500'>
          Manage all project tasks across your client workspace.
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

      <div className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-slate-950'>
              Task filters
            </h3>
            <p className='mt-1 text-sm text-slate-500'>
              Filter tasks by delivery status and priority.
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row'>
            <a
              href='/tasks'
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === 'all' && priorityFilter === 'all'
                  ? 'bg-slate-950 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </a>

            <a
              href='/tasks?status=todo'
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === 'todo'
                  ? 'bg-slate-950 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todo
            </a>

            <a
              href='/tasks?status=in_progress'
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === 'in_progress'
                  ? 'bg-slate-950 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              In progress
            </a>

            <a
              href='/tasks?status=done'
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === 'done'
                  ? 'bg-slate-950 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Done
            </a>

            <a
              href='/tasks?priority=high'
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                priorityFilter === 'high'
                  ? 'bg-slate-950 text-white'
                  : 'bg-red-50 text-red-700 hover:bg-red-100'
              }`}
            >
              High priority
            </a>
          </div>
        </div>
      </div>

      <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'>
        <div className='border-b border-slate-200 px-6 py-4'>
          <h3 className='text-lg font-semibold text-slate-950'>Task list</h3>
        </div>

        {!typedTasks.length ? (
          <div className='p-10 text-center'>
            <h3 className='text-lg font-semibold text-slate-950'>
              No tasks found
            </h3>
            <p className='mt-2 text-sm text-slate-500'>
              Add tasks inside a project or adjust your filters.
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[860px] text-left'>
              <thead className='bg-slate-50 text-sm text-slate-500'>
                <tr>
                  <th className='px-6 py-4 font-medium'>Task</th>
                  <th className='px-6 py-4 font-medium'>Project</th>
                  <th className='px-6 py-4 font-medium'>Client</th>
                  <th className='px-6 py-4 font-medium'>Priority</th>
                  <th className='px-6 py-4 font-medium'>Status</th>
                  <th className='px-6 py-4 font-medium text-right'>Actions</th>
                </tr>
              </thead>

              <tbody className='divide-y divide-slate-100'>
                {typedTasks.map((task) => {
                  const project = task.projects?.[0];

                  return (
                    <tr key={task.id}>
                      <td className='px-6 py-4'>
                        <p className='text-sm font-medium text-slate-950'>
                          {task.title}
                        </p>
                        <p className='mt-1 text-xs text-slate-400'>
                          Created{' '}
                          {new Date(task.created_at).toLocaleDateString(
                            'en-US',
                          )}
                        </p>
                      </td>

                      <td className='px-6 py-4 text-sm text-slate-600'>
                        {project?.name || 'Unknown project'}
                      </td>

                      <td className='px-6 py-4 text-sm text-slate-600'>
                        {project?.client_name || 'No client'}
                      </td>

                      <td className='px-6 py-4'>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getPriorityClass(
                            task.priority,
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </td>

                      <td className='px-6 py-4'>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClass(
                            task.status,
                          )}`}
                        >
                          {task.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className='px-6 py-4'>
                        <div className='flex justify-end'>
                          <TaskRowActions
                            taskId={task.id}
                            status={task.status}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
