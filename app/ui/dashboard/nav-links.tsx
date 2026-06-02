'use client';

import { useState } from 'react'
import { useLanguage } from '@/app/contexts/LanguageContext';
import type { Lang } from '@/app/contexts/LanguageContext';
import { LayoutDashboard, Users, BookOpen, Calendar, ChevronLeft, ChevronRight, Globe } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function NavLinks() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { to: '/dashboard', label: t.nav_dashboard, icon: LayoutDashboard },
    { to: '/students', label: t.nav_students, icon: Users },
    { to: '/training', label: t.nav_training, icon: BookOpen },
    { to: '/calendar', label: t.nav_calendar, icon: Calendar },
  ];

  return (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.to;

        return (
          <Link
            key={item.to}
            href={item.to}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group',
              isActive ? 'text-[#0a1f10]' : 'hover:bg-[#0f2d1a]'
            )}
            style={{
              background: isActive ? '#c8ff00' : undefined,
              color: isActive ? '#0a1f10' : '#86b59a',
            }}
            title={collapsed ? item.label : undefined}

          >
            <>
              <Icon
                size={18}
                className="shrink-0"
                style={{ color: isActive ? '#0a1f10' : '#86b59a' }}
              />
              <span style={{ fontSize: '14px', fontWeight: 500, color: isActive ? '#0a1f10' : '#c0dcc8' }}>
                {item.label}
              </span>
            </>
          </Link>
        );
      })}
    </>
  );
}
