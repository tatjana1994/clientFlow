'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  BarChart3,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Menu,
  MessageSquare,
  ReceiptText,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Tasks', href: '/tasks', icon: CheckSquare },
  { label: 'Invoices', href: '/invoices', icon: ReceiptText },
  { label: 'Messages', href: '/messages', icon: MessageSquare },
];

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden'
        aria-label='Open menu'
      >
        <Menu className='h-5 w-5' />
      </button>

      {isOpen && (
        <div className='fixed inset-0 z-50 lg:hidden'>
          <button
            className='absolute inset-0 bg-slate-950/40'
            onClick={() => setIsOpen(false)}
            aria-label='Close menu overlay'
          />

          <aside className='relative h-full w-[82%] max-w-xs bg-white px-5 py-6 shadow-2xl'>
            <div className='flex items-center justify-between'>
              <Link
                href='/dashboard'
                onClick={() => setIsOpen(false)}
                className='flex items-center gap-3'
              >
                <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white'>
                  <BarChart3 className='h-5 w-5' />
                </div>

                <div>
                  <p className='text-base font-semibold text-slate-950'>
                    ClientFlow
                  </p>
                  <p className='text-xs text-slate-500'>Agency Portal</p>
                </div>
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className='rounded-xl border border-slate-200 p-2 text-slate-600'
                aria-label='Close menu'
              >
                <X className='h-4 w-4' />
              </button>
            </div>

            <nav className='mt-10 space-y-1'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className='flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950'
                >
                  <item.icon className='h-4 w-4' />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
