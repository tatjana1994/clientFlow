'use client';

import { useState, useTransition } from 'react';
import { Sparkles } from 'lucide-react';
import { generateDemoWorkspace } from '@/src/app/(dashboard)/demo/actions';

export function GenerateDemoButton() {
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    setMessage('');

    startTransition(async () => {
      try {
        await generateDemoWorkspace();
        setMessage('Demo workspace created successfully.');
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : 'Something went wrong.',
        );
      }
    });
  }

  return (
    <div className='rounded-3xl border mb-4 border-border bg-card p-6 shadow-sm'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-card-foreground'>
            Need demo data?
          </h3>
          <p className='mt-1 text-sm text-muted'>
            Generate a realistic agency workspace with projects, tasks, invoices
            and messages.
          </p>
        </div>

        <button
          type='button'
          onClick={handleClick}
          disabled={isPending}
          className='inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60'
        >
          <Sparkles className='h-4 w-4' />
          {isPending ? 'Generating...' : 'Generate demo'}
        </button>
      </div>

      {message && (
        <p className='mt-4 rounded-2xl bg-background px-4 py-3 text-sm text-slate-600'>
          {message}
        </p>
      )}
    </div>
  );
}
