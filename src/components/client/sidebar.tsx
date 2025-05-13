'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, FileText } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Students', href: '/dashboard/students', icon: Users },
  { name: 'Teachers', href: '/dashboard/teachers', icon: Users },
  { name: 'Activities', href: '/dashboard/activities', icon: Calendar },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Menu</h2>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}