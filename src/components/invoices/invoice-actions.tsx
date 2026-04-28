'use client';

import {
  deleteInvoice,
  updateInvoiceStatus,
} from '@/src/app/(dashboard)/invoices/actions';
import { Trash2 } from 'lucide-react';

type InvoiceActionsProps = {
  invoiceId: string;
  status: string;
};

export function InvoiceActions({ invoiceId, status }: InvoiceActionsProps) {
  return (
    <div className='flex items-center gap-2'>
      <select
        value={status}
        onChange={(event) => updateInvoiceStatus(invoiceId, event.target.value)}
        className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none'
      >
        <option value='pending'>Pending</option>
        <option value='paid'>Paid</option>
        <option value='overdue'>Overdue</option>
      </select>

      <button
        onClick={() => deleteInvoice(invoiceId)}
        className='rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600'
        aria-label='Delete invoice'
      >
        <Trash2 className='h-4 w-4' />
      </button>
    </div>
  );
}
