'use client';

import {
  deleteTask,
  updateTaskStatus,
} from '@/src/app/(dashboard)/projects/actions';
import { Trash2 } from 'lucide-react';

type TaskActionsProps = {
  taskId: string;
  status: string;
};

export function TaskActions({ taskId, status }: TaskActionsProps) {
  return (
    <div className='flex items-center gap-2'>
      <select
        value={status}
        onChange={(event) => updateTaskStatus(taskId, event.target.value)}
        className='rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs outline-none'
      >
        <option value='todo'>Todo</option>
        <option value='in_progress'>In progress</option>
        <option value='done'>Done</option>
      </select>

      <button
        onClick={() => deleteTask(taskId)}
        className='rounded-xl border border-slate-200 p-1.5 text-slate-500 transition hover:bg-red-50 hover:text-red-600'
      >
        <Trash2 className='h-3.5 w-3.5' />
      </button>
    </div>
  );
}
