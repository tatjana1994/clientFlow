import { DashboardHeader } from '@/src/components/layout/dashboard-header';
import { DashboardSidebar } from '@/src/components/layout/dashboard-sidebar';
import { createClient } from '@/src/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className='min-h-screen bg-slate-50'>
      <div className='flex'>
        <DashboardSidebar />

        <div className='min-h-screen flex-1'>
          <DashboardHeader email={user.email} />

          <div className='p-4 sm:p-6'>{children}</div>
        </div>
      </div>
    </main>
  );
}
