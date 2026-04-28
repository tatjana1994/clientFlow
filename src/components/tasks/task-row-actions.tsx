'use client';

import {
  deleteTask,
  updateTaskStatus,
} from '@/src/app/(dashboard)/projects/actions';
import { Trash2 } from 'lucide-react';

type TaskRowActionsProps = {
  taskId: string;
  status: string;
};

export function TaskRowActions({ taskId, status }: TaskRowActionsProps) {
  return (
    <div className='flex items-center gap-2'>
      <select
        value={status}
        onChange={(event) => updateTaskStatus(taskId, event.target.value)}
        className='rounded-xl border border-border bg-card px-3 py-2 text-xs outline-none transition focus:border-slate-950'
      >
        <option value='todo'>Todo</option>
        <option value='in_progress'>In progress</option>
        <option value='done'>Done</option>
      </select>

      <button
        onClick={() => deleteTask(taskId)}
        className='rounded-xl border border-border p-2 text-muted transition hover:bg-red-50 hover:text-red-600'
        aria-label='Delete task'
      >
        <Trash2 className='h-4 w-4' />
      </button>
    </div>
  );
}
