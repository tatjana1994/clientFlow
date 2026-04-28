import { DeleteProjectButton } from '@/src/components/projects/delete-project-button';
import { FileActions } from '@/src/components/projects/file-actions';
import { FileUploadForm } from '@/src/components/projects/file-upload-form';
import { ProjectForm } from '@/src/components/projects/project-form';
import { TaskActions } from '@/src/components/projects/task-actions';
import { TaskForm } from '@/src/components/projects/task-form';
import { createClient } from '@/src/lib/supabase/server';
import { FileText } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
};

type ProjectFile = {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
};

type Project = {
  id: string;
  name: string;
  client_name: string;
  status: string;
  progress: number;
  due_date: string | null;
  tasks: Task[];
  project_files: ProjectFile[];
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
    ),
    project_files (
      id,
      file_name,
      file_path,
      file_type,
      file_size
    )
  `,
    )
    .order('created_at', { ascending: false });

  const typedProjects = (projects || []) as Project[];

  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-2xl font-semibold text-card-foreground'>
          Projects
        </h2>
        <p className='mt-1 text-sm text-muted'>
          Create projects, manage client work and track related tasks.
        </p>
      </div>

      <ProjectForm />

      {!typedProjects.length ? (
        <div className='rounded-3xl border border-dashed border-slate-300 bg-card p-10 text-center'>
          <h3 className='text-lg font-semibold text-card-foreground'>
            No projects yet
          </h3>
          <p className='mt-2 text-sm text-muted'>
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
                className='rounded-3xl border border-border bg-card p-6 shadow-sm'
              >
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <h3 className='text-lg font-semibold text-card-foreground'>
                      {project.name}
                    </h3>
                    <p className='mt-1 text-sm text-muted'>
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
                    <span className='text-muted'>Progress</span>
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
                  <p className='mt-5 text-sm text-muted'>
                    Due date:{' '}
                    <span className='font-medium text-slate-900'>
                      {project.due_date}
                    </span>
                  </p>
                )}

                <div className='mt-6 border-t border-slate-100 pt-5'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-sm font-semibold text-card-foreground'>
                      Tasks
                    </h4>

                    <span className='text-xs text-muted'>
                      {doneTasks}/{totalTasks} completed
                    </span>
                  </div>

                  <TaskForm projectId={project.id} />

                  <div className='mt-4 space-y-3'>
                    {!project.tasks.length ? (
                      <p className='rounded-2xl bg-background px-4 py-3 text-sm text-muted'>
                        No tasks yet.
                      </p>
                    ) : (
                      project.tasks.map((task) => (
                        <div
                          key={task.id}
                          className='flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-background px-4 py-3'
                        >
                          <div>
                            <p className='text-sm font-medium text-slate-900'>
                              {task.title}
                            </p>

                            <p className='mt-1 text-xs capitalize text-muted'>
                              Priority: {task.priority.replace('_', ' ')}
                            </p>
                          </div>

                          <TaskActions taskId={task.id} status={task.status} />
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className='mt-6 border-t border-slate-100 pt-5'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-sm font-semibold text-card-foreground'>
                      Documents
                    </h4>

                    <span className='text-xs text-muted'>
                      {project.project_files.length} files
                    </span>
                  </div>

                  <FileUploadForm projectId={project.id} />

                  <div className='mt-4 space-y-3'>
                    {!project.project_files.length ? (
                      <p className='rounded-2xl bg-background px-4 py-3 text-sm text-muted'>
                        No documents uploaded yet.
                      </p>
                    ) : (
                      project.project_files.map((file) => (
                        <div
                          key={file.id}
                          className='flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-background px-4 py-3'
                        >
                          <div className='flex min-w-0 items-center gap-3'>
                            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-card text-slate-600'>
                              <FileText className='h-4 w-4' />
                            </div>

                            <div className='min-w-0'>
                              <p className='truncate text-sm font-medium text-slate-900'>
                                {file.file_name}
                              </p>

                              <p className='text-xs text-muted'>
                                {file.file_size
                                  ? `${Math.round(file.file_size / 1024)} KB`
                                  : 'Unknown size'}
                              </p>
                            </div>
                          </div>

                          <FileActions
                            fileId={file.id}
                            filePath={file.file_path}
                          />
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
