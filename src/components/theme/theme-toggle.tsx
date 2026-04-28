'use client';

import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = localStorage.getItem('clientflow-theme');

  if (savedTheme === 'dark' || savedTheme === 'light') {
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    return savedTheme;
  }

  return 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(nextTheme);
    localStorage.setItem('clientflow-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  }

  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-card-foreground transition hover:opacity-80'
      aria-label='Toggle theme'
    >
      {isDark ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
    </button>
  );
}
