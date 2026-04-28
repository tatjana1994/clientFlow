import { createTask } from '@/src/app/(dashboard)/projects/actions';

type TaskFormProps = {
  projectId: string;
};

export function TaskForm({ projectId }: TaskFormProps) {
  return (
    <form
      action={createTask}
      className='mt-5 grid gap-2 sm:grid-cols-[1fr_auto_auto]'
    >
      <input type='hidden' name='projectId' value={projectId} />

      <input
        name='title'
        required
        placeholder='Add task...'
        className='min-w-0 rounded-2xl border border-border px-4 py-2.5 text-sm outline-none transition focus:border-slate-950'
      />

      <select
        name='priority'
        defaultValue='medium'
        className='rounded-2xl border border-border px-3 py-2.5 text-sm outline-none'
      >
        <option value='low'>Low</option>
        <option value='medium'>Medium</option>
        <option value='high'>High</option>
      </select>

      <button
        type='submit'
        className='rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800'
      >
        Add
      </button>
    </form>
  );
}
