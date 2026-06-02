
'use client';
import Link from 'next/link';
import { useState } from 'react';
import NavLinks from './nav-links';
import { useLanguage, Lang } from '@/app/contexts/LanguageContext';
import { LayoutDashboard, Users, BookOpen, Calendar, ChevronLeft, ChevronRight, Globe } from 'lucide-react'

export default function SideNav() {
  const [collapsed, setCollapsed] = useState(false)
  const { t, lang, setLang } = useLanguage()

  return (
    <>

      <aside
        className="hidden md:flex flex-col transition-all duration-300 shrink-0 border-r"
        style={{
          width: collapsed ? '72px' : '220px',
          background: '#071a0d',
          borderColor: '#1a3d27',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: '#1a3d27', minHeight: '64px' }}>
          <div
            className="shrink-0 flex items-center justify-center rounded-lg w-9 h-9"
            style={{ background: '#c8ff00' }}
          >
            <span style={{ fontSize: '18px', lineHeight: 1 }}>🎾</span>
          </div>
          {!collapsed && (
            <div>
              <div style={{ color: '#c8ff00', fontWeight: 700, fontSize: '16px', letterSpacing: '0.05em' }}>
                RallyBase
              </div>
              <div style={{ color: '#5a8f6d', fontSize: '11px' }}>{t.coach_role}</div>
            </div>
          )}
        </div>

        <div className='flex-1 overflow-y-auto'>
          <NavLinks />
        </div>


        {/* Bottom: Language + Coach + Collapse */}
        <div className="p-3 border-t flex flex-col gap-2" style={{ borderColor: '#1a3d27' }}>
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en' as Lang)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
            style={{ background: '#0f2d1a', color: '#86b59a' }}
            title="Switch Language"
          >
            <Globe size={15} />
            {!collapsed && (
              <span style={{ fontSize: '13px' }}>{lang === 'en' ? '中文' : 'English'}</span>
            )}
          </button>

          {/* Coach Info */}
          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                style={{ background: '#c8ff00', color: '#0a1f10' }}
              >
                A
              </div>
              <div>
                <div style={{ color: '#c0dcc8', fontSize: '13px', fontWeight: 600 }}>{t.coach_name}</div>
                <div style={{ color: '#5a8f6d', fontSize: '11px' }}>{t.coach_role}</div>
              </div>
            </div>
          )}

          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center py-2 rounded-lg transition-all"
            style={{ background: '#0f2d1a', color: '#5a8f6d' }}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>
    </>
  )
}
