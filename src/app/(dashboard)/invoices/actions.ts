'use server';

import { createClient } from '@/src/lib/supabase/server';
import { revalidatePath } from 'next/cache';

async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return { supabase, userId: user.id };
}

export async function createInvoice(formData: FormData) {
  const { supabase, userId } = await getUser();

  const clientName = String(formData.get('clientName') || '');
  const invoiceNumber = String(formData.get('invoiceNumber') || '');
  const amount = Number(formData.get('amount') || 0);
  const status = String(formData.get('status') || 'pending');
  const dueDate = String(formData.get('dueDate') || '');

  if (!clientName || !invoiceNumber || !amount) {
    throw new Error('Missing required fields');
  }

  const { error } = await supabase.from('invoices').insert({
    owner_id: userId,
    client_name: clientName,
    invoice_number: invoiceNumber,
    amount,
    status,
    due_date: dueDate || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/invoices');
  revalidatePath('/dashboard');
}

export async function updateInvoiceStatus(invoiceId: string, status: string) {
  const { supabase } = await getUser();

  const { error } = await supabase
    .from('invoices')
    .update({ status })
    .eq('id', invoiceId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/invoices');
  revalidatePath('/dashboard');
}

export async function deleteInvoice(invoiceId: string) {
  const { supabase } = await getUser();

  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', invoiceId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/invoices');
  revalidatePath('/dashboard');
}
