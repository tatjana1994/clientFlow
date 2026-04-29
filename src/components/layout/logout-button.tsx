'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className='inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-muted transition hover:bg-card/90 hover:text-card-foreground'
    >
      <LogOut className='h-4 w-4' />
      <span className='hidden sm:inline'>Logout</span>
    </button>
  );
}
