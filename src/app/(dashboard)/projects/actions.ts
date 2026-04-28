'use server';

import { createClient } from '@/src/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createDemoProject() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase.from('projects').insert({
    owner_id: user.id,
    name: 'Website redesign',
    client_name: 'Northstar Agency',
    status: 'active',
    progress: 68,
    due_date: '2026-05-20',
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/projects');
  revalidatePath('/dashboard');
}
