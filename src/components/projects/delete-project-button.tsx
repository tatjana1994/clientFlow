'use client';

import { deleteProject } from '@/src/app/(dashboard)/projects/actions';
import { Trash2 } from 'lucide-react';

type DeleteProjectButtonProps = {
  projectId: string;
};

export function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  return (
    <button
      onClick={() => deleteProject(projectId)}
      className='rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600'
      aria-label='Delete project'
    >
      <Trash2 className='h-4 w-4' />
    </button>
  );
}
