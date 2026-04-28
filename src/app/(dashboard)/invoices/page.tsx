import { InvoiceActions } from '@/src/components/invoices/invoice-actions';
import { InvoiceForm } from '@/src/components/invoices/invoice-form';
import { createClient } from '@/src/lib/supabase/server';

type Invoice = {
  id: string;
  client_name: string;
  invoice_number: string;
  amount: number;
  status: string;
  due_date: string | null;
};

function getStatusClass(status: string) {
  if (status === 'paid') {
    return 'bg-emerald-50 text-emerald-700';
  }

  if (status === 'overdue') {
    return 'bg-red-50 text-red-700';
  }

  return 'bg-amber-50 text-amber-700';
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export default async function InvoicesPage() {
  const supabase = await createClient();

  const { data: invoices } = await supabase
    .from('invoices')
    .select('id, client_name, invoice_number, amount, status, due_date')
    .order('due_date', { ascending: true });

  const typedInvoices = (invoices || []) as Invoice[];

  const totalPending = typedInvoices
    .filter((invoice) => invoice.status !== 'paid')
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  const totalPaid = typedInvoices
    .filter((invoice) => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-2xl font-semibold text-card-foreground'>
          Invoices
        </h2>
        <p className='mt-1 text-sm text-muted'>
          Create invoices, track payments and monitor client billing.
        </p>
      </div>

      <div className='grid gap-5 md:grid-cols-3'>
        <div className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
          <p className='text-sm text-muted'>Total invoices</p>
          <p className='mt-3 text-3xl font-semibold text-card-foreground'>
            {typedInvoices.length}
          </p>
        </div>

        <div className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
          <p className='text-sm text-muted'>Pending amount</p>
          <p className='mt-3 text-3xl font-semibold text-card-foreground'>
            {formatCurrency(totalPending)}
          </p>
        </div>

        <div className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
          <p className='text-sm text-muted'>Paid amount</p>
          <p className='mt-3 text-3xl font-semibold text-card-foreground'>
            {formatCurrency(totalPaid)}
          </p>
        </div>
      </div>

      <InvoiceForm />

      <div className='overflow-hidden rounded-3xl border border-border bg-card shadow-sm'>
        <div className='border-b border-border px-6 py-4'>
          <h3 className='text-lg font-semibold text-card-foreground'>
            Invoice list
          </h3>
        </div>

        {!typedInvoices.length ? (
          <div className='p-10 text-center'>
            <h3 className='text-lg font-semibold text-card-foreground'>
              No invoices yet
            </h3>
            <p className='mt-2 text-sm text-muted'>
              Create your first invoice using the form above.
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[760px] text-left'>
              <thead className='bg-background text-sm text-muted'>
                <tr>
                  <th className='px-6 py-4 font-medium'>Invoice</th>
                  <th className='px-6 py-4 font-medium'>Client</th>
                  <th className='px-6 py-4 font-medium'>Amount</th>
                  <th className='px-6 py-4 font-medium'>Due date</th>
                  <th className='px-6 py-4 font-medium'>Status</th>
                  <th className='px-6 py-4 font-medium text-right'>Actions</th>
                </tr>
              </thead>

              <tbody className='divide-y divide-slate-100'>
                {typedInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className='px-6 py-4 text-sm font-medium text-card-foreground'>
                      {invoice.invoice_number}
                    </td>

                    <td className='px-6 py-4 text-sm text-slate-600'>
                      {invoice.client_name}
                    </td>

                    <td className='px-6 py-4 text-sm font-medium text-card-foreground'>
                      {formatCurrency(Number(invoice.amount))}
                    </td>

                    <td className='px-6 py-4 text-sm text-slate-600'>
                      {invoice.due_date || 'No due date'}
                    </td>

                    <td className='px-6 py-4'>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClass(
                          invoice.status,
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>

                    <td className='px-6 py-4'>
                      <div className='flex justify-end'>
                        <InvoiceActions
                          invoiceId={invoice.id}
                          status={invoice.status}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
