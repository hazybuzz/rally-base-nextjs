
'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Plus, Search, ChevronRight, Zap, Users } from 'lucide-react'
import { useLanguage } from '@/app/contexts/LanguageContext';
import {
  getAnimalById, getAnimalSizeByLevel, getLevelColor,
} from '@/app/data/mock-data'
import { Student } from "@/lib/types/student";
import { createStudent, getStudents } from "@/lib/api/student";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import AddStudentModal from './create';

interface AddStudentForm {
  name: string
  age: string
  hand: 'right' | 'left'
  animalId: string
  trainingFreq: string
  skills: {
    forehand: number
    backhand: number
    serve: number
    footwork: number
    fitness: number
    mental: number
  }
}

const CARD = {
  background: '#0f2b1c',
  border: '1px solid #1c4229',
  borderRadius: '12px',
}

export default function StudentsPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const [students, setStudents] = useState<Student[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setSearchLoading(true);
        const data = await getStudents();

        setStudents(data);

      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Load students failed"
        );
      } finally {
        setSearchLoading(false);
      }
    };

    fetchStudents();
  }, []);


  const [levelUpId, setLevelUpId] = useState<string | null>(null)
  const [form, setForm] = useState<AddStudentForm>({
    name: '',
    age: '',
    hand: 'right',
    animalId: 'fox',
    trainingFreq: '3',
    skills: {
      forehand: 50,
      backhand: 50,
      serve: 50,
      footwork: 50,
      fitness: 50,
      mental: 50,
    }
  })

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )





  function handleLevelUp(e: React.MouseEvent, studentId: string) {
    e.stopPropagation()
    setLevelUpId(studentId)
    setStudents(prev => prev.map(s =>
      s.id === studentId && s.level < 10 ? { ...s, level: s.level + 1 } : s
    ))
    setTimeout(() => setLevelUpId(null), 1200)
  }

  const handleSubmit = async () => {
    if (!form.name || !form.age) return

    setLoading(true)

    try {
      await createStudent({
        name: form.name,
        age: parseInt(form.age),
        level: 1,
        animalId: form.animalId,
        hand: form.hand,
        trainingFreq: parseInt(form.trainingFreq),
        color: '#c8ff00',
        skills: form.skills
      });

    } catch (error) {
      console.error("Failed to create student:", error);
    } finally {
      setLoading(false)
      setShowAddModal(false)
      setForm({ name: '', age: '', hand: 'right', animalId: 'fox', trainingFreq: '3', skills: { forehand: 50, backhand: 50, serve: 50, footwork: 50, fitness: 50, mental: 50 } })
    }
  }




  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ color: '#e0f5e8', fontSize: '22px', fontWeight: 700 }}>{t.stu_title}</h1>
          <p style={{ color: '#5a8f6d', fontSize: '14px' }}>
            <Users size={13} className="inline mr-1" />{students.length} students
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all hover:opacity-90"
          style={{ background: '#c8ff00', color: '#0a1f10', fontWeight: 600, fontSize: '14px' }}
        >
          <Plus size={16} />
          {t.stu_add}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#5a8f6d' }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.stu_search}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg outline-none transition-all"
          style={{
            background: '#0f2b1c',
            border: '1px solid #1c4229',
            color: '#e0f5e8',
            fontSize: '14px',
          }}
        />
      </div>

      {/* Students Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {
          searchLoading ? (
            <div className="col-span-full flex h-[60vh] items-center justify-center py-10">
              <LoadingOverlay message={t.loading_students} />
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-10" style={{ color: '#ff4d4f' }}>
              {error}
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-full text-center py-10" style={{ color: '#5a8f6d' }}>
              {t.no_students_found}
            </div>
          ) : null
        }


        {filtered.map(student => {
          const animal = getAnimalById(student.animalId)
          const animalSize = getAnimalSizeByLevel(student.level)
          const levelColor = getLevelColor(student.level)
          const isLevelingUp = levelUpId === student.id
          const skillValues = [
            student.skills.forehand,
            student.skills.backhand,
            student.skills.serve,
            student.skills.footwork,
            student.skills.fitness,
            student.skills.mental,
          ];

          const avgSkill = Math.round(skillValues.reduce((a, b) => a + b, 0) / skillValues.length)

          return (
            <div
              key={student.id}
              onClick={() => router.push(`/dashboard/students/${student.id}`)}
              className="cursor-pointer group transition-all duration-200 hover:scale-[1.02]"
              style={{ ...CARD, position: 'relative', overflow: 'hidden' }}
            >
              {/* Level Up Burst */}
              {isLevelingUp && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                  style={{ background: '#c8ff0022' }}
                >
                  <div style={{ fontSize: '32px', animation: 'ping 0.6s cubic-bezier(0, 0, 0.2, 1)' }}>⬆️</div>
                </div>
              )}

              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: student.color }} />

              <div className="p-4">
                {/* Animal + Level */}
                <div className="flex flex-col items-center py-4">
                  <div
                    className="flex items-center justify-center transition-all duration-500"
                    style={{
                      fontSize: animalSize,
                      lineHeight: 1,
                      height: '90px',
                      filter: isLevelingUp ? 'drop-shadow(0 0 12px #c8ff00)' : undefined,
                    }}
                  >
                    {animal.emoji}
                  </div>
                  <div
                    className="mt-3 px-3 py-1 rounded-full flex items-center gap-1.5"
                    style={{ background: `${levelColor}22`, border: `1px solid ${levelColor}44` }}
                  >
                    <Zap size={11} style={{ color: levelColor }} />
                    <span style={{ color: levelColor, fontSize: '12px', fontWeight: 700 }}>
                      {t.lv}{student.level}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <div style={{ color: '#e0f5e8', fontSize: '16px', fontWeight: 700 }}>{student.name}</div>
                  <div style={{ color: '#5a8f6d', fontSize: '12px', marginTop: '2px' }}>
                    {t.stu_age}: {student.age} · {student.hand === 'right' ? t.stu_right : t.stu_left}
                  </div>
                </div>

                {/* Skill Bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span style={{ color: '#5a8f6d', fontSize: '11px' }}>Overall</span>
                    <span style={{ color: '#c8ff00', fontSize: '11px', fontWeight: 700 }}>{avgSkill}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: '#1c4229' }}>
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${avgSkill}%`, background: student.color }}
                    />
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="p-2 rounded-lg text-center" style={{ background: '#071a0d' }}>
                    <div style={{ color: '#c8ff00', fontSize: '15px', fontWeight: 700 }}>{student.winRate}%</div>
                    <div style={{ color: '#5a8f6d', fontSize: '10px' }}>{t.stu_win_rate}</div>
                  </div>
                  <div className="p-2 rounded-lg text-center" style={{ background: '#071a0d' }}>
                    <div style={{ color: '#c8ff00', fontSize: '15px', fontWeight: 700 }}>{student.trainingFreq}x</div>
                    <div style={{ color: '#5a8f6d', fontSize: '10px' }}>{t.stu_sessions_week}</div>
                  </div>
                </div>

                {/* Next Match */}
                <div className="p-2 rounded-lg mb-4" style={{ background: '#071a0d' }}>
                  <div style={{ color: '#5a8f6d', fontSize: '10px', marginBottom: '2px' }}>{t.stu_next_match}</div>
                  <div style={{ color: '#c0dcc8', fontSize: '12px', fontWeight: 500 }}>{student.nextMatchOpponent}</div>
                  <div style={{ color: '#5a8f6d', fontSize: '10px' }}>
                    {new Date(student.nextMatch).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleLevelUp(e, student.id)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80 flex items-center justify-center gap-1"
                    style={{ background: '#c8ff0022', color: '#c8ff00', border: '1px solid #c8ff0044' }}
                  >
                    <Zap size={12} />
                    {t.stu_upgrade}
                  </button>
                  <button
                    className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80 flex items-center justify-center gap-1"
                    style={{ background: '#0f2d1a', color: '#86b59a', border: '1px solid #1c4229' }}
                    onClick={() => { router.push(`/dashboard/students/${student.id}`) }}
                  >
                    Details <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <AddStudentModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        form={form}
        setForm={setForm}
        loading={loading}
        onSubmit={handleSubmit}
        t={t}
      />
    </div>
  )
}
