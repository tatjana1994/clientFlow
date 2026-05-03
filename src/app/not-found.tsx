import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white'>
      <div className='relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center shadow-2xl backdrop-blur'>
        <div className='pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]' />

        <div className='relative'>
          <h1 className='text-7xl font-bold tracking-tight text-white/90'>
            404
          </h1>

          <h2 className='mt-4 text-2xl font-semibold'>Page not found</h2>

          <p className='mt-3 text-sm text-white/60'>
            The page you’re looking for doesn’t exist or has been moved.
          </p>

          <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center'>
            <Link
              href='/dashboard'
              className='inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F19] transition hover:bg-white/90'
            >
              <Home className='h-4 w-4' />
              Go to dashboard
            </Link>

            <Link
              href='/'
              className='inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10'
            >
              <ArrowLeft className='h-4 w-4' />
              Back to home
            </Link>
          </div>

          <div className='mt-10 flex items-center justify-center gap-2 text-xs text-white/40'>
            <Search className='h-3 w-3' />
            Try navigating from the sidebar or homepage
          </div>
        </div>
      </div>
    </main>
  );
}
