'use server';

import { createClient } from '@/src/lib/supabase/server';
import { revalidatePath } from 'next/cache';

async function getUserId() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return { supabase, userId: user.id };
}

export async function createProject(formData: FormData) {
  const { supabase, userId } = await getUserId();

  const name = String(formData.get('name') || '');
  const clientName = String(formData.get('clientName') || '');
  const dueDate = String(formData.get('dueDate') || '');

  if (!name || !clientName) {
    throw new Error('Project name and client name are required');
  }

  const { error } = await supabase.from('projects').insert({
    owner_id: userId,
    name,
    client_name: clientName,
    status: 'active',
    progress: 0,
    due_date: dueDate || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/projects');
  revalidatePath('/dashboard');
}

export async function deleteProject(projectId: string) {
  const { supabase } = await getUserId();

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/projects');
  revalidatePath('/dashboard');
}

export async function createTask(formData: FormData) {
  const { supabase, userId } = await getUserId();

  const projectId = String(formData.get('projectId') || '');
  const title = String(formData.get('title') || '');
  const priority = String(formData.get('priority') || 'medium');

  if (!projectId || !title) {
    throw new Error('Task title is required');
  }

  const { error } = await supabase.from('tasks').insert({
    project_id: projectId,
    owner_id: userId,
    title,
    status: 'todo',
    priority,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/projects');
  revalidatePath('/dashboard');
}

export async function updateTaskStatus(taskId: string, status: string) {
  const { supabase } = await getUserId();

  const { error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', taskId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/projects');
  revalidatePath('/dashboard');
}

export async function deleteTask(taskId: string) {
  const { supabase } = await getUserId();

  const { error } = await supabase.from('tasks').delete().eq('id', taskId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/projects');
  revalidatePath('/dashboard');
}
