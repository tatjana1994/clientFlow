'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  BarChart3,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  LineChart,
  Menu,
  MessageSquare,
  ReceiptText,
  Users,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Team', href: '/team', icon: Users },
  { label: 'Tasks', href: '/tasks', icon: CheckSquare },
  { label: 'Invoices', href: '/invoices', icon: ReceiptText },
  { label: 'Analytics', href: '/analytics', icon: LineChart },
  { label: 'Messages', href: '/messages', icon: MessageSquare },
];

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden'
      >
        <Menu className='h-5 w-5' />
      </button>

      {isOpen && (
        <div className='fixed inset-0 z-[9999] lg:hidden'>
          <button
            className='absolute inset-0 bg-slate-950/50 backdrop-blur-sm'
            onClick={() => setIsOpen(false)}
          />

          <aside className='fixed left-0 top-0 z-[10000] h-dvh w-[82%] max-w-[320px] overflow-y-auto border-r border-slate-200 bg-white px-5 py-6 shadow-2xl'>
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
                className='rounded-xl border border-slate-200 p-2 text-slate-500'
              >
                <X className='h-4 w-4' />
              </button>
            </div>

            <nav className='mt-10 space-y-1'>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/');

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-slate-950 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className='h-4 w-4' />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className='mt-10 border-t border-slate-200 pt-5'>
              <Link
                href='/'
                onClick={() => setIsOpen(false)}
                className='flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100'
              >
                ← Back to website
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
