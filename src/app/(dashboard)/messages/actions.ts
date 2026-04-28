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

  return { supabase, user };
}

export async function createMessage(formData: FormData) {
  const { supabase, user } = await getUser();

  const projectId = String(formData.get('projectId') || '');
  const type = String(formData.get('type') || 'client');
  const message = String(formData.get('message') || '');

  if (!projectId || !message) {
    throw new Error('Project and message are required');
  }

  const authorName =
    user.user_metadata?.full_name || user.email || 'Agency owner';

  const { error } = await supabase.from('messages').insert({
    owner_id: user.id,
    project_id: projectId,
    author_name: authorName,
    type,
    message,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/messages');
  revalidatePath('/dashboard');
}

export async function deleteMessage(messageId: string) {
  const { supabase } = await getUser();

  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', messageId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/messages');
  revalidatePath('/dashboard');
}
