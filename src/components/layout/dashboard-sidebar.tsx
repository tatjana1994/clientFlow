import Link from 'next/link';
import {
  BarChart3,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  ReceiptText,
} from 'lucide-react';

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
    label: 'Messages',
    href: '/messages',
    icon: MessageSquare,
  },
];

export function DashboardSidebar() {
  return (
    <aside className='hidden min-h-screen w-72 border-r border-slate-200 bg-white px-5 py-6 lg:block'>
      <Link href='/dashboard' className='flex items-center gap-3'>
        <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white'>
          <BarChart3 className='h-5 w-5' />
        </div>

        <div>
          <p className='text-lg font-semibold text-slate-950'>ClientFlow</p>
          <p className='text-xs text-slate-500'>Agency Portal</p>
        </div>
      </Link>

      <nav className='mt-10 space-y-1'>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className='flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950'
          >
            <item.icon className='h-4 w-4' />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
