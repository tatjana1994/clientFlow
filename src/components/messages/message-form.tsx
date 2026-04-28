import { createMessage } from '@/src/app/(dashboard)/messages/actions';

type ProjectOption = {
  id: string;
  name: string;
  client_name: string;
};

type MessageFormProps = {
  projects: ProjectOption[];
};

export function MessageForm({ projects }: MessageFormProps) {
  return (
    <form
      action={createMessage}
      className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
    >
      <h3 className='text-lg font-semibold text-slate-950'>Add new message</h3>

      <div className='mt-5 grid gap-4 md:grid-cols-2'>
        <div>
          <label className='text-sm font-medium text-slate-700'>Project</label>

          <select
            name='projectId'
            required
            className='mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950'
            defaultValue=''
          >
            <option value='' disabled>
              Select project
            </option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name} — {project.client_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='text-sm font-medium text-slate-700'>
            Message type
          </label>

          <select
            name='type'
            defaultValue='client'
            className='mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950'
          >
            <option value='client'>Client note</option>
            <option value='internal'>Internal note</option>
          </select>
        </div>
      </div>

      <div className='mt-4'>
        <label className='text-sm font-medium text-slate-700'>Message</label>

        <textarea
          name='message'
          required
          rows={4}
          placeholder='Write a project update, client note or internal reminder...'
          className='mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-950'
        />
      </div>

      <button
        type='submit'
        disabled={!projects.length}
        className='mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50'
      >
        Create message
      </button>
    </form>
  );
}
