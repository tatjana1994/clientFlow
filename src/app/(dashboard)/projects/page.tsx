import { DeleteProjectButton } from '@/src/components/projects/delete-project-button';
import { ProjectForm } from '@/src/components/projects/project-form';
import { TaskActions } from '@/src/components/projects/task-actions';
import { TaskForm } from '@/src/components/projects/task-form';
import { createClient } from '@/src/lib/supabase/server';

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
};

type Project = {
  id: string;
  name: string;
  client_name: string;
  status: string;
  progress: number;
  due_date: string | null;
  tasks: Task[];
};

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('projects')
    .select(
      `
      id,
      name,
      client_name,
      status,
      progress,
      due_date,
      tasks (
        id,
        title,
        status,
        priority
      )
    `,
    )
    .order('created_at', { ascending: false });

  const typedProjects = (projects || []) as Project[];

  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-2xl font-semibold text-slate-950'>Projects</h2>
        <p className='mt-1 text-sm text-slate-500'>
          Create projects, manage client work and track related tasks.
        </p>
      </div>

      <ProjectForm />

      {!typedProjects.length ? (
        <div className='rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center'>
          <h3 className='text-lg font-semibold text-slate-950'>
            No projects yet
          </h3>
          <p className='mt-2 text-sm text-slate-500'>
            Create your first project using the form above.
          </p>
        </div>
      ) : (
        <div className='grid gap-5 xl:grid-cols-2'>
          {typedProjects.map((project) => {
            const doneTasks = project.tasks.filter(
              (task) => task.status === 'done',
            ).length;

            const totalTasks = project.tasks.length;

            const progress =
              totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

            return (
              <div
                key={project.id}
                className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
              >
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <h3 className='text-lg font-semibold text-slate-950'>
                      {project.name}
                    </h3>
                    <p className='mt-1 text-sm text-slate-500'>
                      {project.client_name}
                    </p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium capitalize text-emerald-700'>
                      {project.status}
                    </span>

                    <DeleteProjectButton projectId={project.id} />
                  </div>
                </div>

                <div className='mt-6'>
                  <div className='mb-2 flex justify-between text-sm'>
                    <span className='text-slate-500'>Progress</span>
                    <span className='font-medium text-slate-900'>
                      {progress}%
                    </span>
                  </div>

                  <div className='h-2 rounded-full bg-slate-100'>
                    <div
                      className='h-2 rounded-full bg-slate-950'
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {project.due_date && (
                  <p className='mt-5 text-sm text-slate-500'>
                    Due date:{' '}
                    <span className='font-medium text-slate-900'>
                      {project.due_date}
                    </span>
                  </p>
                )}

                <div className='mt-6 border-t border-slate-100 pt-5'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-sm font-semibold text-slate-950'>
                      Tasks
                    </h4>

                    <span className='text-xs text-slate-500'>
                      {doneTasks}/{totalTasks} completed
                    </span>
                  </div>

                  <TaskForm projectId={project.id} />

                  <div className='mt-4 space-y-3'>
                    {!project.tasks.length ? (
                      <p className='rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500'>
                        No tasks yet.
                      </p>
                    ) : (
                      project.tasks.map((task) => (
                        <div
                          key={task.id}
                          className='flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3'
                        >
                          <div>
                            <p className='text-sm font-medium text-slate-900'>
                              {task.title}
                            </p>

                            <p className='mt-1 text-xs capitalize text-slate-500'>
                              Priority: {task.priority.replace('_', ' ')}
                            </p>
                          </div>

                          <TaskActions taskId={task.id} status={task.status} />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
