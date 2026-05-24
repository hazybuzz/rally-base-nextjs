
'use client';
import Link from 'next/link';
import { useState } from 'react';
import NavLinks from './nav-links';

export default function SideNav() {
  const [collapsed, setCollapsed] = useState(false)


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
        <NavLinks />
      </aside>
    </>
  )
}
