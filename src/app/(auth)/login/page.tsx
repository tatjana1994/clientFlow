'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/src/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white'>
      <div className='w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur'>
        <Link href='/' className='text-sm text-white/60 hover:text-white'>
          ← Back to home
        </Link>

        <div className='mt-8'>
          <h1 className='text-3xl font-semibold'>Welcome back</h1>
          <p className='mt-2 text-sm text-white/60'>
            Log in to access your ClientFlow dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className='mt-8 space-y-5'>
          <div>
            <label className='text-sm font-medium text-white/80'>Email</label>
            <input
              type='email'
              required
              placeholder='you@example.com'
              className='mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-sky-400'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className='text-sm font-medium text-white/80'>
              Password
            </label>
            <input
              type='password'
              required
              placeholder='••••••••'
              className='mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-sky-400'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className='rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
              {error}
            </p>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className='w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F19] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-white/50'>
          Don&apos;t have an account?{' '}
          <Link href='/register' className='font-medium text-white'>
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
