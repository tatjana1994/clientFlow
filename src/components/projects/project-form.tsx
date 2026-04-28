import { createProject } from '@/src/app/(dashboard)/projects/actions';

export function ProjectForm() {
  return (
    <form
      action={createProject}
      className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
    >
      <h3 className='text-lg font-semibold text-slate-950'>Add new project</h3>

      <div className='mt-5 grid gap-4 md:grid-cols-3'>
        <div>
          <label className='text-sm font-medium text-slate-700'>
            Project name
          </label>
          <input
            name='name'
            required
            placeholder='Website redesign'
            className='mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-950'
          />
        </div>

        <div>
          <label className='text-sm font-medium text-slate-700'>
            Client name
          </label>
          <input
            name='clientName'
            required
            placeholder='Northstar Agency'
            className='mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-950'
          />
        </div>

        <div>
          <label className='text-sm font-medium text-slate-700'>Due date</label>
          <input
            name='dueDate'
            type='date'
            className='mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-950'
          />
        </div>
      </div>

      <button
        type='submit'
        className='mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
      >
        Create project
      </button>
    </form>
  );
}
