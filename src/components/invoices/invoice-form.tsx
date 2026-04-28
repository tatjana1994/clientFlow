import { createInvoice } from '@/src/app/(dashboard)/invoices/actions';

export function InvoiceForm() {
  return (
    <form
      action={createInvoice}
      className='rounded-3xl border border-border bg-card p-6 shadow-sm'
    >
      <h3 className='text-lg font-semibold text-card-foreground'>
        Add new invoice
      </h3>

      <div className='mt-5 grid gap-4 md:grid-cols-5'>
        <div>
          <label className='text-sm font-medium text-slate-700'>Client</label>
          <input
            name='clientName'
            required
            placeholder='Northstar Agency'
            className='mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-slate-950'
          />
        </div>

        <div>
          <label className='text-sm font-medium text-slate-700'>
            Invoice No.
          </label>
          <input
            name='invoiceNumber'
            required
            placeholder='INV-001'
            className='mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-slate-950'
          />
        </div>

        <div>
          <label className='text-sm font-medium text-slate-700'>Amount</label>
          <input
            name='amount'
            type='number'
            min='1'
            step='0.01'
            required
            placeholder='1200'
            className='mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-slate-950'
          />
        </div>

        <div>
          <label className='text-sm font-medium text-slate-700'>Status</label>
          <select
            name='status'
            defaultValue='pending'
            className='mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-slate-950'
          >
            <option value='pending'>Pending</option>
            <option value='paid'>Paid</option>
            <option value='overdue'>Overdue</option>
          </select>
        </div>

        <div>
          <label className='text-sm font-medium text-slate-700'>Due date</label>
          <input
            name='dueDate'
            type='date'
            className='mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-slate-950'
          />
        </div>
      </div>

      <button
        type='submit'
        className='mt-5 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
      >
        Create invoice
      </button>
    </form>
  );
}
