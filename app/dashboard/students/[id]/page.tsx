'use client'
import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line
} from 'recharts'
import { ArrowLeft, Zap, Brain, Star, Calendar, Hand, TrendingUp, Clock, Activity, X, Sparkles } from 'lucide-react'
import { useLanguage } from '@/app/contexts/LanguageContext';
import {
  STUDENTS, TRAINING_RECORDS,
  getAnimalById, getAnimalSizeByLevel, getLevelColor
} from '@/app/data/mock-data'
import { useParams } from 'next/dist/client/components/navigation';
import { useRouter } from 'next/navigation';

const CARD = {
  background: '#0f2b1c',
  border: '1px solid #1c4229',
  borderRadius: '12px',
}

const AI_ANALYSIS: Record<string, string[]> = {
  s1: [
    "Emma's forehand is her strongest weapon, showing elite-level topspin generation for her age group. Recommended focus: transition her dominant forehand into a pattern-based offensive strategy.",
    "Backhand consistency has improved 18% over the last 3 months. The technical correction on shoulder drop is taking effect. Continue reinforcing kinetic chain fundamentals.",
    "Mental resilience score of 75 is the key development area. Recommend introducing match simulation drills under pressure (tiebreak scenarios) to build clutch performance confidence.",
    "Physical fitness is exceptional. At Lv.7, she is on track for top-10 regional ranking within 18 months with current training velocity.",
  ],
  s4: [
    "Marcus is performing at a near-professional junior level. His serve consistency (95%+ in session) is among the top 5% nationally for his age group.",
    "Net approach timing is the final piece to complete his serve-and-volley game. A 0.3s improvement in split step timing would unlock an elite tactial dimension.",
    "Mental score of 89 reflects championship-caliber composure. He processes match situations with strategic clarity well beyond his years.",
    "Recommendation: Begin exposure to advanced opponent analysis and match-pattern preparation to prepare for national-level competition.",
  ],
  default: [
    "This student shows consistent progress across all fundamental metrics. The trajectory of improvement indicates strong coachability and dedication to training.",
    "Focus areas identified by AI analysis: technical consistency under fatigue and point construction from the baseline.",
    "Physical development is on track for the age group. Recommend maintaining current training frequency while introducing periodization cycles.",
    "Mental game development recommended as next growth focus. Mindfulness routines and pressure training drills will accelerate improvement.",
  ],
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0f2b1c', border: '1px solid #1c4229', borderRadius: '8px', padding: '10px 14px' }}>
        <p style={{ color: '#86b59a', fontSize: '12px', marginBottom: '4px' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || '#c8ff00', fontSize: '13px', fontWeight: 600 }}>
            {p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter();
  const { t } = useLanguage()
  const [showAI, setShowAI] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiDone, setAiDone] = useState(false)
  const [localLevel, setLocalLevel] = useState<number | null>(null)

  const student = STUDENTS.find(s => s.id === id)
  if (!student) {
    return (
      <div className="p-8 text-center" style={{ color: '#5a8f6d' }}>
        Student not found.
        <button className="ml-2" style={{ color: '#c8ff00' }}>
          {t.back}
        </button>
      </div>
    )
  }

  const level = localLevel !== null ? localLevel : student.level
  const animal = getAnimalById(student.animalId)
  const animalSize = getAnimalSizeByLevel(level)
  const levelColor = getLevelColor(level)
  const studentRecords = TRAINING_RECORDS.filter(r => r.studentId === student.id)

  const radarData = [
    { skill: t.sd_forehand, value: student.skills.forehand, fullMark: 100 },
    { skill: t.sd_backhand, value: student.skills.backhand, fullMark: 100 },
    { skill: t.sd_serve, value: student.skills.serve, fullMark: 100 },
    { skill: t.sd_footwork, value: student.skills.footwork, fullMark: 100 },
    { skill: t.sd_fitness, value: student.skills.fitness, fullMark: 100 },
    { skill: t.sd_mental, value: student.skills.mental, fullMark: 100 },
  ]

  const skillList = [
    { key: 'forehand', label: t.sd_forehand, value: student.skills.forehand },
    { key: 'backhand', label: t.sd_backhand, value: student.skills.backhand },
    { key: 'serve', label: t.sd_serve, value: student.skills.serve },
    { key: 'footwork', label: t.sd_footwork, value: student.skills.footwork },
    { key: 'fitness', label: t.sd_fitness, value: student.skills.fitness },
    { key: 'mental', label: t.sd_mental, value: student.skills.mental },
  ]

  function handleOpenAI() {
    setShowAI(true)
    setAiDone(false)
    setAiLoading(true)
    setTimeout(() => {
      setAiLoading(false)
      setAiDone(true)
    }, 2000)
  }

  function handleLevelUp() {
    if (level < 10) setLocalLevel(level + 1)
  }

  const aiInsights = AI_ANALYSIS[student.id] || AI_ANALYSIS.default

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Back */}
      <button
        className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
        style={{ color: '#5a8f6d', fontSize: '14px' }}
        onClick={() => { router.back() }}
      >
        <ArrowLeft size={16} />
        {t.back}
      </button>

      {/* Profile Header */}
      <div className="p-6 mb-6 relative overflow-hidden" style={{ ...CARD }}>
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${student.color}15 0%, transparent 70%)`,
            transform: 'translate(20%, -20%)',
          }}
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
          {/* Animal Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex items-center justify-center rounded-2xl transition-all duration-500"
              style={{
                fontSize: animalSize,
                lineHeight: 1,
                width: '120px',
                height: '120px',
                background: `${student.color}18`,
                border: `2px solid ${student.color}44`,
              }}
            >
              {animal.emoji}
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{ background: `${levelColor}22`, border: `1px solid ${levelColor}55` }}
            >
              <Zap size={12} style={{ color: levelColor }} />
              <span style={{ color: levelColor, fontSize: '13px', fontWeight: 700 }}>
                {t.lv}{level} · {(t as any)[animal.nameKey]}
              </span>
            </div>

            {/* Level progress bar */}
            <div className="w-28">
              <div className="flex justify-between text-xs mb-1" style={{ color: '#5a8f6d' }}>
                <span>Lv.{level}</span>
                <span>{level < 10 ? `Lv.${level + 1}` : 'MAX'}</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: '#1c4229' }}>
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{ width: `${(level % 1 === 0 ? 60 : 0) + (level * 7) % 100}%`, background: levelColor }}
                />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 style={{ color: '#e0f5e8', fontSize: '26px', fontWeight: 700 }}>{student.name}</h1>

            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: '#071a0d' }}>
                <Calendar size={13} style={{ color: '#5a8f6d' }} />
                <span style={{ color: '#86b59a', fontSize: '13px' }}>{t.stu_age}: {student.age}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: '#071a0d' }}>
                <Hand size={13} style={{ color: '#5a8f6d' }} />
                <span style={{ color: '#86b59a', fontSize: '13px' }}>{student.hand === 'right' ? t.stu_right : t.stu_left}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: '#071a0d' }}>
                <Activity size={13} style={{ color: '#5a8f6d' }} />
                <span style={{ color: '#86b59a', fontSize: '13px' }}>{student.trainingFreq}x/week</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: '#071a0d' }}>
                <TrendingUp size={13} style={{ color: '#5a8f6d' }} />
                <span style={{ color: '#86b59a', fontSize: '13px' }}>{student.winRate}% win rate</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg" style={{ background: '#071a0d' }}>
              <div style={{ color: '#5a8f6d', fontSize: '11px', marginBottom: '4px' }}>
                {t.stu_next_match}
              </div>
              <div style={{ color: '#c8ff00', fontSize: '14px', fontWeight: 600 }}>
                🏆 {student.nextMatchOpponent}
              </div>
              <div style={{ color: '#5a8f6d', fontSize: '12px' }}>
                {new Date(student.nextMatch).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleLevelUp}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all hover:opacity-80"
                style={{ background: '#c8ff00', color: '#0a1f10', fontWeight: 600, fontSize: '14px' }}
              >
                <Zap size={15} />
                {t.stu_upgrade}
              </button>
              <button
                onClick={handleOpenAI}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all hover:opacity-80"
                style={{ background: '#1a3d6e', color: '#60a5fa', border: '1px solid #1e4a8a', fontWeight: 600, fontSize: '14px' }}
              >
                <Brain size={15} />
                {t.sd_ai_analysis}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills + Radar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Radar Chart */}
        <div className="p-5" style={CARD}>
          <h3 style={{ color: '#e0f5e8', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
            {t.sd_skills}
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid key="polar-grid" stroke="#1c4229" />
              <PolarAngleAxis
                key="polar-angle"
                dataKey="skill"
                tick={{ fill: '#86b59a', fontSize: 12 }}
              />
              <Radar
                key="radar-skills"
                name={student.name}
                dataKey="value"
                stroke={student.color}
                fill={student.color}
                fillOpacity={0.25}
                strokeWidth={2}
                dot={{ fill: student.color, r: 3 }}
              />
              <Tooltip key="radar-tooltip" content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Progress Bars */}
        <div className="p-5" style={CARD}>
          <h3 style={{ color: '#e0f5e8', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
            {t.sd_skills}
          </h3>
          <div className="flex flex-col gap-4">
            {skillList.map(({ key, label, value }) => {
              const barColor = value >= 80 ? '#c8ff00' : value >= 60 ? '#60a5fa' : '#86b59a'
              return (
                <div key={key}>
                  <div className="flex justify-between mb-1.5">
                    <span style={{ color: '#c0dcc8', fontSize: '13px', fontWeight: 500 }}>{label}</span>
                    <span style={{ color: barColor, fontSize: '13px', fontWeight: 700 }}>{value}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: '#1c4229' }}>
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${value}%`, background: barColor }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Performance Trend */}
      {student.performanceTrend.length > 0 && (
        <div className="p-5 mb-6" style={CARD}>
          <h3 style={{ color: '#e0f5e8', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
            {t.sd_performance_trend}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div style={{ color: '#5a8f6d', fontSize: '12px', marginBottom: '8px' }}>{t.sd_session_rating}</div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={student.performanceTrend}>
                  <defs>
                    <linearGradient id={`sd-grad-${student.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop key="s1" offset="5%" stopColor={student.color} stopOpacity={0.3} />
                      <stop key="s2" offset="95%" stopColor={student.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#1c4229" vertical={false} />
                  <XAxis key="xaxis" dataKey="month" tick={{ fill: '#5a8f6d', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis key="yaxis" domain={[0, 10]} tick={{ fill: '#5a8f6d', fontSize: 11 }} axisLine={false} tickLine={false} width={25} />
                  <Tooltip key="tooltip" content={<CustomTooltip />} />
                  <Area key="area-rating" type="monotone" dataKey="rating" name="Rating" stroke={student.color} fill={`url(#sd-grad-${student.id})`} strokeWidth={2} dot={{ fill: student.color, r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div style={{ color: '#5a8f6d', fontSize: '12px', marginBottom: '8px' }}>{t.sd_training_freq} (sessions/month)</div>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={student.performanceTrend}>
                  <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#1c4229" vertical={false} />
                  <XAxis key="xaxis" dataKey="month" tick={{ fill: '#5a8f6d', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis key="yaxis" tick={{ fill: '#5a8f6d', fontSize: 11 }} axisLine={false} tickLine={false} width={25} />
                  <Tooltip key="tooltip" content={<CustomTooltip />} />
                  <Line key="line-sessions" type="monotone" dataKey="sessions" name="Sessions" stroke="#60a5fa" strokeWidth={2} dot={{ fill: '#60a5fa', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Training History Timeline */}
      <div className="p-5" style={CARD}>
        <h3 style={{ color: '#e0f5e8', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
          {t.sd_history}
        </h3>
        {studentRecords.length === 0 ? (
          <p style={{ color: '#5a8f6d', fontSize: '13px' }}>No training records yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {studentRecords.map((record, idx) => (
              <div key={record.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: '#c8ff0022', border: '2px solid #c8ff0055' }}
                  >
                    <Star size={14} style={{ color: '#c8ff00' }} />
                  </div>
                  {idx < studentRecords.length - 1 && (
                    <div className="w-0.5 flex-1 mt-2" style={{ background: '#1c4229' }} />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ color: '#c0dcc8', fontSize: '14px', fontWeight: 600 }}>{record.title}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: i < record.rating ? '#c8ff00' : '#1c4229' }}
                        />
                      ))}
                    </div>
                  </div>
                  <div style={{ color: '#5a8f6d', fontSize: '11px', marginBottom: '6px' }}>
                    <Clock size={10} className="inline mr-1" />
                    {new Date(record.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: '#071a0d' }}>
                    <div style={{ color: '#86b59a', fontSize: '12px', lineHeight: 1.6 }}>
                      {record.focus}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Analysis Modal */}
      {showAI && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={() => setShowAI(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl p-6"
            style={{ background: '#0f2b1c', border: '1px solid #1c4229' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: '#1a3d6e' }}>
                  <Brain size={16} style={{ color: '#60a5fa' }} />
                </div>
                <h2 style={{ color: '#e0f5e8', fontSize: '16px', fontWeight: 700 }}>{t.sd_ai_title}</h2>
              </div>
              <button onClick={() => setShowAI(false)} style={{ color: '#5a8f6d' }}>
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4 p-3 rounded-lg" style={{ background: '#071a0d' }}>
              <span style={{ fontSize: '24px' }}>{animal.emoji}</span>
              <div>
                <div style={{ color: '#c0dcc8', fontSize: '13px', fontWeight: 600 }}>{student.name}</div>
                <div style={{ color: '#5a8f6d', fontSize: '12px' }}>Level {level} · {t.sd_ai_analysis}</div>
              </div>
            </div>

            {aiLoading ? (
              <div className="flex flex-col items-center py-8 gap-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: '#c8ff00',
                        animation: `bounce 0.9s ease-in-out ${i * 0.15}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
                <p style={{ color: '#5a8f6d', fontSize: '13px' }}>{t.sd_ai_loading}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {aiInsights.map((insight, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg" style={{ background: '#071a0d' }}>
                    <Sparkles size={14} style={{ color: '#c8ff00', marginTop: '2px' }} className="shrink-0" />
                    <p style={{ color: '#c0dcc8', fontSize: '13px', lineHeight: 1.6 }}>{insight}</p>
                  </div>
                ))}
              </div>
            )}

            {aiDone && (
              <button
                onClick={() => setShowAI(false)}
                className="w-full mt-4 py-2.5 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{ background: '#c8ff00', color: '#0a1f10', fontSize: '14px' }}
              >
                {t.close}
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
