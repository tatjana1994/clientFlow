import { LogoutButton } from './logout-button';
import { MobileSidebar } from './mobile-sidebar';

type DashboardHeaderProps = {
  email?: string | null;
};

export function DashboardHeader({ email }: DashboardHeaderProps) {
  return (
    <header className='sticky top-0 z-20 border-b border-slate-200 bg-white/85 px-4 py-4 backdrop-blur sm:px-6'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex min-w-0 items-center gap-3'>
          <MobileSidebar />

          <div className='min-w-0'>
            <p className='text-xs text-slate-500 sm:text-sm'>Welcome back</p>
            <h1 className='truncate text-lg font-semibold text-slate-950 sm:text-xl'>
              Agency Dashboard
            </h1>
          </div>
        </div>

        <div className='flex shrink-0 items-center gap-3'>
          {email && (
            <div className='hidden text-right md:block'>
              <p className='max-w-[220px] truncate text-sm font-medium text-slate-900'>
                {email}
              </p>
              <p className='text-xs text-slate-500'>Owner account</p>
            </div>
          )}

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
