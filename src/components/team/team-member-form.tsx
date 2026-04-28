import { createTeamMember } from '@/src/app/(dashboard)/team/actions';

export function TeamMemberForm() {
  return (
    <form
      action={createTeamMember}
      className='rounded-3xl border border-border bg-card p-6 shadow-sm'
    >
      <h3 className='text-lg font-semibold text-card-foreground'>
        Add team member
      </h3>

      <div className='mt-5 grid gap-4 md:grid-cols-4'>
        <div>
          <label className='text-sm font-medium text-slate-700'>
            Full name
          </label>
          <input
            name='fullName'
            required
            placeholder='Sarah Johnson'
            className='mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-slate-950'
          />
        </div>

        <div>
          <label className='text-sm font-medium text-slate-700'>Email</label>
          <input
            name='email'
            type='email'
            required
            placeholder='sarah@agency.com'
            className='mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-slate-950'
          />
        </div>

        <div>
          <label className='text-sm font-medium text-slate-700'>Role</label>
          <select
            name='role'
            defaultValue='designer'
            className='mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-slate-950'
          >
            <option value='owner'>Owner</option>
            <option value='project_manager'>Project Manager</option>
            <option value='designer'>Designer</option>
            <option value='developer'>Developer</option>
            <option value='marketing'>Marketing</option>
          </select>
        </div>

        <div>
          <label className='text-sm font-medium text-slate-700'>Status</label>
          <select
            name='status'
            defaultValue='active'
            className='mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-slate-950'
          >
            <option value='active'>Active</option>
            <option value='invited'>Invited</option>
            <option value='inactive'>Inactive</option>
          </select>
        </div>
      </div>

      <button
        type='submit'
        className='mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
      >
        Add member
      </button>
    </form>
  );
}
