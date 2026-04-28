'use client';

import { deleteMessage } from '@/src/app/(dashboard)/messages/actions';
import { Trash2 } from 'lucide-react';

type MessageActionsProps = {
  messageId: string;
};

export function MessageActions({ messageId }: MessageActionsProps) {
  return (
    <button
      onClick={() => deleteMessage(messageId)}
      className='rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600'
      aria-label='Delete message'
    >
      <Trash2 className='h-4 w-4' />
    </button>
  );
}
