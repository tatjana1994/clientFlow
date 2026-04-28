import { TeamMemberActions } from '@/src/components/team/team-member-actions';
import { TeamMemberForm } from '@/src/components/team/team-member-form';
import { createClient } from '@/src/lib/supabase/server';
import { Mail, ShieldCheck, UserCheck, Users } from 'lucide-react';

type TeamMember = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
};

function formatRole(role: string) {
  return role.replace('_', ' ');
}

function getStatusClass(status: string) {
  if (status === 'active') {
    return 'bg-emerald-50 text-emerald-700';
  }

  if (status === 'invited') {
    return 'bg-sky-50 text-sky-700';
  }

  return 'bg-slate-100 text-slate-600';
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default async function TeamPage() {
  const supabase = await createClient();

  const { data: members } = await supabase
    .from('team_members')
    .select('id, full_name, email, role, status, created_at')
    .order('created_at', { ascending: false });

  const typedMembers = (members || []) as TeamMember[];

  const activeMembers = typedMembers.filter(
    (member) => member.status === 'active',
  ).length;

  const invitedMembers = typedMembers.filter(
    (member) => member.status === 'invited',
  ).length;

  const ownerMembers = typedMembers.filter(
    (member) => member.role === 'owner',
  ).length;

  const stats = [
    {
      label: 'Team members',
      value: typedMembers.length,
      icon: Users,
    },
    {
      label: 'Active',
      value: activeMembers,
      icon: UserCheck,
    },
    {
      label: 'Invited',
      value: invitedMembers,
      icon: Mail,
    },
    {
      label: 'Owners',
      value: ownerMembers,
      icon: ShieldCheck,
    },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-2xl font-semibold text-slate-950'>Team</h2>
        <p className='mt-1 text-sm text-slate-500'>
          Manage agency members, roles and workspace access.
        </p>
      </div>

      <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
          >
            <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700'>
              <stat.icon className='h-5 w-5' />
            </div>

            <p className='mt-5 text-3xl font-semibold text-slate-950'>
              {stat.value}
            </p>

            <p className='mt-1 text-sm text-slate-500'>{stat.label}</p>
          </div>
        ))}
      </div>

      <TeamMemberForm />

      <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'>
        <div className='border-b border-slate-200 px-6 py-4'>
          <h3 className='text-lg font-semibold text-slate-950'>
            Workspace members
          </h3>
        </div>

        {!typedMembers.length ? (
          <div className='p-10 text-center'>
            <h3 className='text-lg font-semibold text-slate-950'>
              No team members yet
            </h3>
            <p className='mt-2 text-sm text-slate-500'>
              Add your first team member using the form above.
            </p>
          </div>
        ) : (
          <div className='divide-y divide-slate-100'>
            {typedMembers.map((member) => (
              <div
                key={member.id}
                className='flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between'
              >
                <div className='flex min-w-0 items-center gap-4'>
                  <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white'>
                    {getInitials(member.full_name)}
                  </div>

                  <div className='min-w-0'>
                    <p className='font-semibold text-slate-950'>
                      {member.full_name}
                    </p>
                    <p className='mt-1 truncate text-sm text-slate-500'>
                      {member.email}
                    </p>
                  </div>
                </div>

                <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                  <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700'>
                    {formatRole(member.role)}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClass(
                      member.status,
                    )}`}
                  >
                    {member.status}
                  </span>

                  <TeamMemberActions
                    memberId={member.id}
                    status={member.status}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
