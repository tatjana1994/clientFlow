'use client';

import { useTransition } from 'react';
import { Plus } from 'lucide-react';
import { createDemoProject } from '@/src/app/(dashboard)/projects/actions';

export function CreateDemoProjectButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => createDemoProject())}
      disabled={isPending}
      className='inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60'
    >
      <Plus className='h-4 w-4' />
      {isPending ? 'Creating...' : 'Add demo project'}
    </button>
  );
}
