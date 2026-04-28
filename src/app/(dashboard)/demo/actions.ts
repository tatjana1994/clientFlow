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

export async function generateDemoWorkspace() {
  const { supabase, userId } = await getUser();

  const { data: existingProjects } = await supabase
    .from('projects')
    .select('id')
    .eq('owner_id', userId)
    .limit(1);

  if (existingProjects?.length) {
    throw new Error('Demo workspace already has data.');
  }

  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .insert([
      {
        owner_id: userId,
        name: 'Website Redesign',
        client_name: 'Northstar Agency',
        status: 'active',
        progress: 45,
        due_date: '2026-05-20',
      },
      {
        owner_id: userId,
        name: 'Brand Strategy Sprint',
        client_name: 'Luma Studio',
        status: 'active',
        progress: 70,
        due_date: '2026-05-10',
      },
      {
        owner_id: userId,
        name: 'SEO Growth Plan',
        client_name: 'Evergreen Co.',
        status: 'paused',
        progress: 30,
        due_date: '2026-06-01',
      },
      {
        owner_id: userId,
        name: 'Client Portal Build',
        client_name: 'BrightOps',
        status: 'completed',
        progress: 100,
        due_date: '2026-04-15',
      },
    ])
    .select('id, name, client_name');

  if (projectsError) {
    throw new Error(projectsError.message);
  }

  if (!projects?.length) {
    throw new Error('Could not create demo projects.');
  }

  const [website, brand, seo, portal] = projects;

  const tasks = [
    {
      project_id: website.id,
      owner_id: userId,
      title: 'Review homepage wireframe',
      status: 'done',
      priority: 'high',
    },
    {
      project_id: website.id,
      owner_id: userId,
      title: 'Prepare design system tokens',
      status: 'in_progress',
      priority: 'medium',
    },
    {
      project_id: website.id,
      owner_id: userId,
      title: 'Send mobile layout preview',
      status: 'todo',
      priority: 'high',
    },
    {
      project_id: brand.id,
      owner_id: userId,
      title: 'Finalize moodboard direction',
      status: 'done',
      priority: 'medium',
    },
    {
      project_id: brand.id,
      owner_id: userId,
      title: 'Create logo variation set',
      status: 'in_progress',
      priority: 'high',
    },
    {
      project_id: seo.id,
      owner_id: userId,
      title: 'Audit top landing pages',
      status: 'todo',
      priority: 'medium',
    },
    {
      project_id: seo.id,
      owner_id: userId,
      title: 'Prepare keyword opportunities',
      status: 'todo',
      priority: 'low',
    },
    {
      project_id: portal.id,
      owner_id: userId,
      title: 'Deploy final portal build',
      status: 'done',
      priority: 'high',
    },
  ];

  const { error: tasksError } = await supabase.from('tasks').insert(tasks);

  if (tasksError) {
    throw new Error(tasksError.message);
  }

  const invoices = [
    {
      owner_id: userId,
      client_name: 'Northstar Agency',
      invoice_number: 'INV-1001',
      amount: 2400,
      status: 'pending',
      due_date: '2026-05-05',
    },
    {
      owner_id: userId,
      client_name: 'Luma Studio',
      invoice_number: 'INV-1002',
      amount: 1800,
      status: 'paid',
      due_date: '2026-04-18',
    },
    {
      owner_id: userId,
      client_name: 'Evergreen Co.',
      invoice_number: 'INV-1003',
      amount: 950,
      status: 'overdue',
      due_date: '2026-04-10',
    },
    {
      owner_id: userId,
      client_name: 'BrightOps',
      invoice_number: 'INV-1004',
      amount: 3200,
      status: 'paid',
      due_date: '2026-04-12',
    },
  ];

  const { error: invoicesError } = await supabase
    .from('invoices')
    .insert(invoices);

  if (invoicesError) {
    throw new Error(invoicesError.message);
  }

  const messages = [
    {
      owner_id: userId,
      project_id: website.id,
      author_name: 'Agency Owner',
      type: 'client',
      message:
        'Client approved the homepage direction. Next step is mobile polish.',
    },
    {
      owner_id: userId,
      project_id: website.id,
      author_name: 'Agency Owner',
      type: 'internal',
      message: 'Need to prepare two CTA variations before the next review.',
    },
    {
      owner_id: userId,
      project_id: brand.id,
      author_name: 'Agency Owner',
      type: 'client',
      message:
        'Client prefers the warmer brand direction with softer gradients.',
    },
    {
      owner_id: userId,
      project_id: seo.id,
      author_name: 'Agency Owner',
      type: 'internal',
      message: 'SEO project is paused until content assets are ready.',
    },
    {
      owner_id: userId,
      project_id: portal.id,
      author_name: 'Agency Owner',
      type: 'client',
      message: 'Final delivery completed and handed over to the client.',
    },
  ];

  const { error: messagesError } = await supabase
    .from('messages')
    .insert(messages);

  if (messagesError) {
    throw new Error(messagesError.message);
  }

  const teamMembers = [
    {
      owner_id: userId,
      full_name: 'Sarah Johnson',
      email: 'sarah@northstar.demo',
      role: 'project_manager',
      status: 'active',
    },
    {
      owner_id: userId,
      full_name: 'Mia Carter',
      email: 'mia@northstar.demo',
      role: 'designer',
      status: 'active',
    },
    {
      owner_id: userId,
      full_name: 'Leo Martin',
      email: 'leo@northstar.demo',
      role: 'developer',
      status: 'invited',
    },
  ];

  const { error: teamError } = await supabase
    .from('team_members')
    .insert(teamMembers);

  if (teamError) {
    throw new Error(teamError.message);
  }

  revalidatePath('/dashboard');
  revalidatePath('/projects');
  revalidatePath('/tasks');
  revalidatePath('/invoices');
  revalidatePath('/messages');
  revalidatePath('/analytics');
  revalidatePath('/team');
}
