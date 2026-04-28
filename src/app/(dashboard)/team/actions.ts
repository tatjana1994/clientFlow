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

export async function createTeamMember(formData: FormData) {
  const { supabase, userId } = await getUser();

  const fullName = String(formData.get('fullName') || '');
  const email = String(formData.get('email') || '');
  const role = String(formData.get('role') || 'designer');
  const status = String(formData.get('status') || 'active');

  if (!fullName || !email) {
    throw new Error('Name and email are required');
  }

  const { error } = await supabase.from('team_members').insert({
    owner_id: userId,
    full_name: fullName,
    email,
    role,
    status,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/team');
  revalidatePath('/dashboard');
}

export async function updateTeamMemberStatus(memberId: string, status: string) {
  const { supabase } = await getUser();

  const { error } = await supabase
    .from('team_members')
    .update({ status })
    .eq('id', memberId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/team');
  revalidatePath('/dashboard');
}

export async function deleteTeamMember(memberId: string) {
  const { supabase } = await getUser();

  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', memberId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/team');
  revalidatePath('/dashboard');
}
