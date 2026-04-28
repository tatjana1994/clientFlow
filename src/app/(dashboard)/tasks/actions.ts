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

  return { supabase };
}

export async function updateTaskStatus(taskId: string, status: string) {
  const { supabase } = await getUser();

  const { error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', taskId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tasks');
  revalidatePath('/projects');
  revalidatePath('/dashboard');
  revalidatePath('/analytics');
}

export async function deleteTask(taskId: string) {
  const { supabase } = await getUser();

  const { error } = await supabase.from('tasks').delete().eq('id', taskId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tasks');
  revalidatePath('/projects');
  revalidatePath('/dashboard');
  revalidatePath('/analytics');
}
