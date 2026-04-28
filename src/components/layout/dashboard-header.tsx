import { LogoutButton } from './logout-button';

type DashboardHeaderProps = {
  email?: string | null;
};

export function DashboardHeader({ email }: DashboardHeaderProps) {
  return (
    <header className='sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur'>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <p className='text-sm text-slate-500'>Welcome back</p>
          <h1 className='text-xl font-semibold text-slate-950'>
            Agency Dashboard
          </h1>
        </div>

        <div className='flex items-center gap-4'>
          {email && (
            <div className='hidden text-right sm:block'>
              <p className='text-sm font-medium text-slate-900'>{email}</p>
              <p className='text-xs text-slate-500'>Owner account</p>
            </div>
          )}

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
