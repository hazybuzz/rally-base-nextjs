
'use client'

import { ANIMALS } from '@/app/data/mock-data'
import LoadingOverlay from "@/app/components/LoadingOverlay";
import SkillRadarEditor from "@/app/components/skills/SkillRadarEditor";
import { useEffect, useState } from "react";

interface AddStudentForm {
  name: string
  age: string
  hand: 'right' | 'left'
  animalId: string
  trainingFreq: string,
  skills: {
    forehand: number
    backhand: number
    serve: number
    footwork: number
    fitness: number
    mental: number
  }
}

interface AddStudentModalProps {
  showAddModal: boolean
  setShowAddModal: (show: boolean) => void
  form: AddStudentForm
  setForm: (form: AddStudentForm) => void
  loading: boolean
  onSubmit: () => Promise<void>
  t: any
}

export default function AddStudentModal({
  showAddModal,
  setShowAddModal,
  form,
  setForm,
  loading,
  onSubmit,
  t,
}: AddStudentModalProps) {
  if (!showAddModal) return null

  const [skills, setSkills] = useState(form.skills)

  const keys = [
    "forehand",
    "backhand",
    "serve",
    "footwork",
    "fitness",
    "mental",
  ] as const;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={() => setShowAddModal(false)}
    >
      <div
        className="w-full max-w-xl rounded-xl  relative "
        style={{ background: '#0f2b1c', border: '1px solid #1c4229' }}
        onClick={e => e.stopPropagation()}
      >
        {loading && (
          <LoadingOverlay message={t.adding} />
        )}
        <div className="overflow-y-auto h-[80vh] p-6">
          <h2 style={{ color: '#e0f5e8', fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>{t.stu_add}</h2>

          <div className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label style={{ color: '#86b59a', fontSize: '12px', fontWeight: 500 }}>{t.stu_name}</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 px-3 py-2.5 rounded-lg outline-none"
                style={{ background: '#071a0d', border: '1px solid #1c4229', color: '#e0f5e8', fontSize: '14px' }}
              />
            </div>

            {/* Age */}
            <div>
              <label style={{ color: '#86b59a', fontSize: '12px', fontWeight: 500 }}>{t.stu_age}</label>
              <input
                type="number"
                value={form.age}
                onChange={e => setForm({ ...form, age: e.target.value })}
                className="w-full mt-1 px-3 py-2.5 rounded-lg outline-none"
                style={{ background: '#071a0d', border: '1px solid #1c4229', color: '#e0f5e8', fontSize: '14px' }}
              />
            </div>

            {/* Hand */}
            <div>
              <label style={{ color: '#86b59a', fontSize: '12px', fontWeight: 500 }}>{t.stu_hand}</label>
              <div className="flex gap-2 mt-1">
                {(['right', 'left'] as const).map(h => (
                  <button
                    key={h}
                    onClick={() => setForm({ ...form, hand: h })}
                    className="flex-1 py-2 rounded-lg text-sm transition-all"
                    style={{
                      background: form.hand === h ? '#c8ff00' : '#071a0d',
                      color: form.hand === h ? '#0a1f10' : '#86b59a',
                      border: '1px solid #1c4229',
                      fontWeight: form.hand === h ? 600 : 400,
                    }}
                  >
                    {h === 'right' ? t.stu_right : t.stu_left}
                  </button>
                ))}
              </div>
            </div>

            {/* Animal Selection */}
            <div>
              <label style={{ color: '#86b59a', fontSize: '12px', fontWeight: 500 }}>{t.stu_select_animal}</label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {ANIMALS.map(animal => (
                  <button
                    key={animal.id}
                    onClick={() => setForm({ ...form, animalId: animal.id })}
                    className="flex flex-col items-center p-2 rounded-lg transition-all"
                    style={{
                      background: form.animalId === animal.id ? '#c8ff0022' : '#071a0d',
                      border: form.animalId === animal.id ? '1px solid #c8ff00' : '1px solid #1c4229',
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{animal.emoji}</span>
                    <span style={{ color: form.animalId === animal.id ? '#c8ff00' : '#5a8f6d', fontSize: '10px', marginTop: '2px' }}>
                      {(t as any)[animal.nameKey]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Training Frequency */}
            <div>
              <label style={{ color: '#86b59a', fontSize: '12px', fontWeight: 500 }}>{t.stu_sessions_week}</label>
              <input
                type="number"
                value={form.trainingFreq}
                onChange={e => setForm({ ...form, trainingFreq: e.target.value })}
                className="w-full mt-1 px-3 py-2.5 rounded-lg outline-none"
                style={{ background: '#071a0d', border: '1px solid #1c4229', color: '#e0f5e8', fontSize: '14px' }}
                min="1"
                max="7"
              />
            </div>


            <div className="grid grid-cols-2 gap-4">
              <SkillRadarEditor value={skills} onChange={setSkills} />

              <div className="space-y-3">
                {keys.map((k) => (
                  <div key={k}>
                    <div className="flex justify-between text-sm">
                      <span>{k}</span>
                      <span>{skills[k]}</span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={skills[k]}
                      onChange={(e) =>
                        setSkills({
                          ...skills,
                          [k]: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className="flex gap-3 p-6">
          <button
            onClick={() => setShowAddModal(false)}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium"
            style={{ background: '#071a0d', color: '#86b59a', border: '1px solid #1c4229' }}
          >
            {t.cancel}
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className="flex justify-center flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 align-center"
            style={{ background: '#c8ff00', color: '#0a1f10' }}
          >
            {loading ? t.adding : t.add}
          </button>
        </div>

      </div>

    </div>
  )
}
