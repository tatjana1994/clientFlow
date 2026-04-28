import { CreateDemoProjectButton } from '@/src/components/projects/create-demo-project-button';
import { createClient } from '@/src/lib/supabase/server';

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <h2 className='text-2xl font-semibold text-slate-950'>Projects</h2>
          <p className='mt-1 text-sm text-slate-500'>
            Manage real client projects from Supabase.
          </p>
        </div>

        <CreateDemoProjectButton />
      </div>

      {!projects?.length ? (
        <div className='rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center'>
          <h3 className='text-lg font-semibold text-slate-950'>
            No projects yet
          </h3>
          <p className='mt-2 text-sm text-slate-500'>
            Add your first demo project to populate the dashboard.
          </p>
        </div>
      ) : (
        <div className='grid gap-5 lg:grid-cols-2'>
          {projects.map((project) => (
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

                <span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium capitalize text-emerald-700'>
                  {project.status}
                </span>
              </div>

              <div className='mt-6'>
                <div className='mb-2 flex justify-between text-sm'>
                  <span className='text-slate-500'>Progress</span>
                  <span className='font-medium text-slate-900'>
                    {project.progress}%
                  </span>
                </div>

                <div className='h-2 rounded-full bg-slate-100'>
                  <div
                    className='h-2 rounded-full bg-slate-950'
                    style={{ width: `${project.progress}%` }}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
