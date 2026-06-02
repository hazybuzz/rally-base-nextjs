
'use client';
import { useLanguage } from "@/app/contexts/LanguageContext";
import StatCard from "@/app/ui/dashboard/start-card";
import { STUDENTS, WEEKLY_STATS, TRAINING_RECORDS, CALENDAR_SESSIONS, getAnimalById, getLevelColor } from "@/app/data/mock-data";
import { Users, Calendar, TrendingUp, Star, Clock, Zap, Trophy, Newspaper, Activity, ChevronRight, MapPin } from 'lucide-react'
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts'

const news = [
  { titleKey: 'dash_news_1_title', descKey: 'dash_news_1_desc', tag: 'Grand Slam', time: '2h ago' },
  { titleKey: 'dash_news_2_title', descKey: 'dash_news_2_desc', tag: 'Official', time: '5h ago' },
  { titleKey: 'dash_news_3_title', descKey: 'dash_news_3_desc', tag: 'Training', time: '1d ago' },
]

const sessionTypeColor: Record<string, string> = {
  practice: '#c8ff00',
  match: '#f87171',
  group: '#60a5fa',
}
const CARD = {
  background: '#0f2b1c',
  border: '1px solid #1c4229',
  borderRadius: '12px',
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0f2b1c', border: '1px solid #1c4229', borderRadius: '8px', padding: '10px 14px' }}>
        <p style={{ color: '#86b59a', fontSize: '12px', marginBottom: '4px' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color, fontSize: '13px', fontWeight: 600 }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Page() {
  const { t, lang, setLang } = useLanguage();

  const today = new Date()
  const todaySessions = CALENDAR_SESSIONS.filter(s => s.date === '2026-05-18')
  const upcomingMatches = STUDENTS
    .sort((a, b) => a.nextMatch.localeCompare(b.nextMatch))
    .slice(0, 4)

  const recentActivity = TRAINING_RECORDS.slice(0, 4)




  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span style={{ fontSize: '22px' }}>🎾</span>
          <h1 style={{ color: '#e0f5e8', fontSize: '22px', fontWeight: 700 }}>{t.dash_welcome}</h1>
        </div>
        <p style={{ color: '#5a8f6d', fontSize: '14px' }}>{t.dash_subtitle} — {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label={t.dash_total_students} value={STUDENTS.length} sub="+2 this month" trend={8} color="#c8ff00" />
        <StatCard icon={Calendar} label={t.dash_weekly_sessions} value={25} sub="This week" trend={12} color="#60a5fa" />
        <StatCard icon={Trophy} label={t.dash_win_rate} value="68%" sub="Avg across students" trend={5} color="#fb923c" />
        <StatCard icon={Star} label={t.dash_avg_rating} value="8.1" sub="Out of 10" trend={3} color="#a78bfa" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 p-5" style={CARD}>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ color: '#e0f5e8', fontSize: '15px', fontWeight: 600 }}>{t.dash_weekly_stats}</h3>
            <div className="flex gap-3 text-xs">
              <span style={{ color: '#c8ff00' }}>● Sessions</span>
              <span style={{ color: '#60a5fa' }}>● Intensity</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WEEKLY_STATS} barGap={4} barCategoryGap="30%">
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#1c4229" vertical={false} />
              <XAxis key="xaxis" dataKey="day" tick={{ fill: '#5a8f6d', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis key="yaxis" tick={{ fill: '#5a8f6d', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip key="tooltip" content={<CustomTooltip />} />
              <Bar key="bar-sessions" dataKey="sessions" name="Sessions" fill="#c8ff00" />
              <Bar key="bar-intensity" dataKey="intensity" name="Intensity" fill="#1a4d6e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Today's Sessions */}
        <div className="p-5" style={CARD}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ color: '#e0f5e8', fontSize: '15px', fontWeight: 600 }}>{t.dash_today_sessions}</h3>
            <button onClick={() => { }} style={{ color: '#5a8f6d', fontSize: '12px' }} className="flex items-center gap-1 hover:text-[#c8ff00] transition-colors">
              {t.view_all} <ChevronRight size={13} />
            </button>
          </div>
          {todaySessions.length === 0 ? (
            <p style={{ color: '#5a8f6d', fontSize: '13px' }}>No sessions today</p>
          ) : (
            <div className="flex flex-col gap-3">
              {todaySessions.map(s => {
                const student = STUDENTS.find(st => st.id === s.studentId)
                const animal = student ? getAnimalById(student.animalId) : null
                return (
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#071a0d' }}>
                    <div
                      className="w-2 h-full rounded-full self-stretch"
                      style={{ background: sessionTypeColor[s.type], minHeight: '36px', width: '3px' }}
                    />
                    <div className="flex-1 min-w-0">
                      <div style={{ color: '#c0dcc8', fontSize: '13px', fontWeight: 600 }} className="truncate">{s.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock size={11} style={{ color: '#5a8f6d' }} />
                        <span style={{ color: '#5a8f6d', fontSize: '11px' }}>{s.startHour}:00 · {s.duration}min</span>
                        <MapPin size={11} style={{ color: '#5a8f6d' }} />
                        <span style={{ color: '#5a8f6d', fontSize: '11px' }}>{s.court}</span>
                      </div>
                    </div>
                    {animal && <span style={{ fontSize: '20px' }}>{animal.emoji}</span>}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Student Overview */}
        <div className="lg:col-span-2 p-5" style={CARD}>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ color: '#e0f5e8', fontSize: '15px', fontWeight: 600 }}>{t.dash_student_overview}</h3>
            <button
              style={{ color: '#5a8f6d', fontSize: '12px' }} className="flex items-center gap-1 hover:text-[#c8ff00] transition-colors">
              {t.view_all} <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {STUDENTS.slice(0, 5).map(student => {
              const animal = getAnimalById(student.animalId)
              const avgSkill = Math.round(Object.values(student.skills).reduce((a, b) => a + b, 0) / 6)
              return (
                <div
                  key={student.id}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:opacity-90"
                  style={{ background: '#071a0d' }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                    style={{ background: `${student.color}22`, fontSize: '22px' }}
                  >
                    {animal.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#c0dcc8', fontSize: '13px', fontWeight: 600 }}>{student.name}</span>
                      <span
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{ background: `${getLevelColor(student.level)}22`, color: getLevelColor(student.level) }}
                      >
                        Lv.{student.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 rounded-full h-1.5" style={{ background: '#1c4229' }}>
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{ width: `${avgSkill}%`, background: student.color }}
                        />
                      </div>
                      <span style={{ color: '#5a8f6d', fontSize: '11px', minWidth: '30px' }}>{avgSkill}%</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div style={{ color: '#c8ff00', fontSize: '14px', fontWeight: 700 }}>{student.winRate}%</div>
                    <div style={{ color: '#5a8f6d', fontSize: '11px' }}>win rate</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Training Intensity Chart */}
        <div className="p-5" style={CARD}>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ color: '#e0f5e8', fontSize: '15px', fontWeight: 600 }}>{t.dash_training_intensity}</h3>
            <Zap size={16} style={{ color: '#c8ff00' }} />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={WEEKLY_STATS}>
              <defs>
                <linearGradient id="dash-intensityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop key="stop1" offset="5%" stopColor="#c8ff00" stopOpacity={0.3} />
                  <stop key="stop2" offset="95%" stopColor="#c8ff00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#1c4229" vertical={false} />
              <XAxis key="xaxis" dataKey="day" tick={{ fill: '#5a8f6d', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis key="yaxis" tick={{ fill: '#5a8f6d', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip key="tooltip" content={<CustomTooltip />} />
              <Area key="area-intensity" type="monotone" dataKey="intensity" name="Intensity" stroke="#c8ff00" strokeWidth={2} fill="url(#dash-intensityGrad)" dot={{ fill: '#c8ff00', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>

          {/* Session rating mini line */}
          <div className="mt-4 pt-4 border-t" style={{ borderColor: '#1c4229' }}>
            <div style={{ color: '#5a8f6d', fontSize: '12px', marginBottom: '8px' }}>Avg. Rating Trend</div>
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={WEEKLY_STATS}>
                <Line key="line-rating" type="monotone" dataKey="rating" name="Rating" stroke="#a78bfa" strokeWidth={2} dot={false} />
                <Tooltip key="tooltip" content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>


      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Matches */}
        <div className="p-5" style={CARD}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ color: '#e0f5e8', fontSize: '15px', fontWeight: 600 }}>{t.dash_upcoming_matches}</h3>
            <Trophy size={16} style={{ color: '#c8ff00' }} />
          </div>
          <div className="flex flex-col gap-3">
            {upcomingMatches.map(student => {
              const animal = getAnimalById(student.animalId)
              const matchDate = new Date(student.nextMatch)
              const daysUntil = Math.ceil((matchDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
              return (
                <div
                  key={student.id}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: '#071a0d' }}
                >
                  <span style={{ fontSize: '22px' }}>{animal.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div style={{ color: '#c0dcc8', fontSize: '13px', fontWeight: 600 }}>{student.name}</div>
                    <div style={{ color: '#5a8f6d', fontSize: '11px' }}>{t.dash_vs} {student.nextMatchOpponent}</div>
                  </div>
                  <div className="text-right">
                    <div style={{ color: daysUntil <= 3 ? '#f87171' : '#c8ff00', fontSize: '12px', fontWeight: 700 }}>
                      {daysUntil}d
                    </div>
                    <div style={{ color: '#5a8f6d', fontSize: '10px' }}>
                      {matchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Latest News */}
        <div className="p-5" style={CARD}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ color: '#e0f5e8', fontSize: '15px', fontWeight: 600 }}>{t.dash_latest_news}</h3>
            <Newspaper size={16} style={{ color: '#c8ff00' }} />
          </div>
          <div className="flex flex-col gap-3">
            {news.map((item, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg" style={{ background: '#071a0d' }}>
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 text-sm"
                  style={{ background: '#0f2d1a', fontSize: '18px' }}
                >
                  {i === 0 ? '🏆' : i === 1 ? '📋' : '🎯'}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ color: '#c0dcc8', fontSize: '13px', fontWeight: 600, lineHeight: 1.4 }}>
                    {(t as any)[item.titleKey]}
                  </div>
                  <div style={{ color: '#5a8f6d', fontSize: '11px', marginTop: '3px' }} className="line-clamp-2">
                    {(t as any)[item.descKey]}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: '#c8ff0022', color: '#c8ff00' }}>{item.tag}</span>
                    <span style={{ color: '#3d6e50', fontSize: '10px' }}>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-5 mt-6" style={CARD}>
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ color: '#e0f5e8', fontSize: '15px', fontWeight: 600 }}>{t.dash_recent_activity}</h3>
          <Activity size={16} style={{ color: '#c8ff00' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentActivity.map(record => {
            const student = STUDENTS.find(s => s.id === record.studentId)
            const animal = student ? getAnimalById(student.animalId) : null
            return (
              <div
                key={record.id}
                className="p-3 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                style={{ background: '#071a0d' }}
              // onClick={() => navigate('/training')}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: '18px' }}>{animal?.emoji}</span>
                  <span style={{ color: '#c0dcc8', fontSize: '12px', fontWeight: 600 }}>{student?.name}</span>
                </div>
                <div style={{ color: '#86b59a', fontSize: '12px', fontWeight: 600, lineHeight: 1.4 }} className="mb-2">{record.title}</div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#3d6e50', fontSize: '11px' }}>
                    {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} style={{ color: i < Math.round(record.rating / 2) ? '#c8ff00' : '#1c4229', fill: i < Math.round(record.rating / 2) ? '#c8ff00' : 'transparent' }} />
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>




    </div>
  );
}
