'use client';

import Link from 'next/link';
import {
  BarChart3,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  ReceiptText,
  Users,
} from 'lucide-react';

import { usePathname } from 'next/navigation';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: FolderKanban,
  },
  {
    label: 'Team',
    href: '/team',
    icon: Users,
  },
  {
    label: 'Tasks',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    label: 'Invoices',
    href: '/invoices',
    icon: ReceiptText,
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: LineChart,
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: MessageSquare,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className='hidden min-h-screen w-72 border-r border-border bg-card px-5 py-6 lg:block'>
      <Link href='/dashboard' className='flex items-center gap-3'>
        <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white'>
          <BarChart3 className='h-5 w-5' />
        </div>

        <div>
          <p className='text-lg font-semibold text-card-foreground'>
            ClientFlow
          </p>
          <p className='text-xs text-muted'>Agency Portal</p>
        </div>
      </Link>

      <nav className='mt-10 space-y-1'>
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition
                ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-muted hover:bg-card/90 hover:text-card-foreground'
                }
              `}
            >
              <item.icon className='h-4 w-4' />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className='mt-10 border-t border-border pt-5'>
        <Link
          href='/'
          className='flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-card/90 hover:text-card-foreground'
        >
          ← Back to website
        </Link>
      </div>
    </aside>
  );
}
