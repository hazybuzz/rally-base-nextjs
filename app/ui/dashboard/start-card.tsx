'use client'
import { useLanguage } from '@/app/contexts/LanguageContext';
import { TrendingUp } from 'lucide-react'

const CARD = {
  background: '#0f2b1c',
  border: '1px solid #1c4229',
  borderRadius: '12px',
}
const ACCENT = '#c8ff00'

export default function StartCard(
  {
    icon: Icon,
    label,
    value,
    sub,
    trend,
    color = ACCENT,
  }: {
    icon: React.ElementType
    label: string
    value: string | number
    sub?: string
    trend?: number
    color?: string
  }
) {
  const { t } = useLanguage();


  return (
    <div
      className="flex flex-col gap-3 p-5"
      style={CARD}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg"
          style={{ background: `${color}22` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        {trend !== undefined && (
          <div
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
            style={{ background: trend >= 0 ? '#16421e' : '#3d1616', color: trend >= 0 ? '#4ade80' : '#f87171' }}
          >
            <TrendingUp size={11} />
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div>
        <div style={{ color: '#5a8f6d', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
        <div style={{ color: '#e0f5e8', fontSize: '28px', fontWeight: 700, lineHeight: 1.2, marginTop: '4px' }}>{value}</div>
        {sub && <div style={{ color: '#5a8f6d', fontSize: '12px', marginTop: '2px' }}>{sub}</div>}
      </div>

    </div>
  )
}
