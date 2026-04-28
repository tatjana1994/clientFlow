'use client';

import {
  deleteTeamMember,
  updateTeamMemberStatus,
} from '@/src/app/(dashboard)/team/actions';
import { Trash2 } from 'lucide-react';

type TeamMemberActionsProps = {
  memberId: string;
  status: string;
};

export function TeamMemberActions({
  memberId,
  status,
}: TeamMemberActionsProps) {
  return (
    <div className='flex items-center gap-2'>
      <select
        value={status}
        onChange={(event) =>
          updateTeamMemberStatus(memberId, event.target.value)
        }
        className='rounded-xl border border-border bg-card px-3 py-2 text-xs outline-none'
      >
        <option value='active'>Active</option>
        <option value='invited'>Invited</option>
        <option value='inactive'>Inactive</option>
      </select>

      <button
        onClick={() => deleteTeamMember(memberId)}
        className='rounded-xl border border-border p-2 text-muted transition hover:bg-red-50 hover:text-red-600'
        aria-label='Delete team member'
      >
        <Trash2 className='h-4 w-4' />
      </button>
    </div>
  );
}
