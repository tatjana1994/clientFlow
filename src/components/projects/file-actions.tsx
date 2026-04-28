'use client';

import { deleteProjectFile } from '@/src/app/(dashboard)/projects/actions';
import { Trash2 } from 'lucide-react';

type FileActionsProps = {
  fileId: string;
  filePath: string;
};

export function FileActions({ fileId, filePath }: FileActionsProps) {
  return (
    <button
      onClick={() => deleteProjectFile(fileId, filePath)}
      className='rounded-xl border border-border p-1.5 text-muted transition hover:bg-red-50 hover:text-red-600'
      aria-label='Delete file'
    >
      <Trash2 className='h-3.5 w-3.5' />
    </button>
  );
}
