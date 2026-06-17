export type AnimalId = 'fox' | 'rabbit' | 'tiger' | 'owl' | 'monkey' | 'cat' | 'bison' | 'dog'

export interface Animal {
  id: AnimalId
  emoji: string
  nameKey: string
}

export const ANIMALS: Animal[] = [
  { id: 'fox', emoji: '🦊', nameKey: 'animal_fox' },
  { id: 'rabbit', emoji: '🐰', nameKey: 'animal_rabbit' },
  { id: 'tiger', emoji: '🐯', nameKey: 'animal_tiger' },
  { id: 'owl', emoji: '🦉', nameKey: 'animal_owl' },
  { id: 'monkey', emoji: '🐒', nameKey: 'animal_monkey' },
  { id: 'cat', emoji: '🐱', nameKey: 'animal_cat' },
  { id: 'bison', emoji: '🦬', nameKey: 'animal_bison' },
  { id: 'dog', emoji: '🐕', nameKey: 'animal_dog' },
]

export function getAnimalById(id: string): Animal {
  return ANIMALS.find(a => a.id === id) || ANIMALS[0]
}

export function getAnimalSizeByLevel(level: number): string {
  const sizes = [28, 32, 38, 44, 52, 60, 70, 82, 96, 112]
  const idx = Math.min(Math.max(level - 1, 0), sizes.length - 1)
  return `${sizes[idx]}px`
}

export function getLevelColor(level: number): string {
  if (level <= 2) return '#6aaa80'
  if (level <= 4) return '#4ade80'
  if (level <= 6) return '#c8ff00'
  if (level <= 8) return '#fbbf24'
  return '#f87171'
}

export interface SkillScores {
  forehand: number
  backhand: number
  serve: number
  footwork: number
  fitness: number
  mental: number
}

export interface TrainingSession {
  id: string
  date: string
  title: string
  focus: string
  technical: string
  feedback: string
  homework: string
  rating: number
  studentId: string
}

export interface Student {
  id: string
  name: string
  age: number
  level: number
  animalId: AnimalId
  hand: 'right' | 'left'
  trainingFreq: number
  winRate: number
  nextMatch: string
  nextMatchOpponent: string
  skills: SkillScores
  color: string
  joinDate: string
  performanceTrend: { month: string; rating: number; sessions: number }[]
}

export interface CalendarSession {
  id: string
  studentId: string
  title: string
  type: 'practice' | 'match' | 'group'
  date: string
  startHour: number
  duration: number
  court: string
}

export const STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Emma Chen',
    age: 16,
    level: 7,
    animalId: 'tiger',
    hand: 'right',
    trainingFreq: 5,
    winRate: 72,
    nextMatch: '2026-05-20',
    nextMatchOpponent: 'City Tennis Club',
    color: '#c8ff00',
    joinDate: '2024-03-15',
    skills: { forehand: 85, backhand: 78, serve: 82, footwork: 88, fitness: 90, mental: 75 },
    performanceTrend: [
      { month: 'Nov', rating: 7.2, sessions: 18 },
      { month: 'Dec', rating: 7.5, sessions: 15 },
      { month: 'Jan', rating: 7.8, sessions: 20 },
      { month: 'Feb', rating: 8.0, sessions: 22 },
      { month: 'Mar', rating: 8.3, sessions: 21 },
      { month: 'Apr', rating: 8.6, sessions: 23 },
    ],
  },
  {
    id: 's2',
    name: 'James Park',
    age: 14,
    level: 4,
    animalId: 'fox',
    hand: 'right',
    trainingFreq: 3,
    winRate: 58,
    nextMatch: '2026-05-23',
    nextMatchOpponent: 'Riverside Academy',
    color: '#60a5fa',
    joinDate: '2025-01-10',
    skills: { forehand: 68, backhand: 62, serve: 70, footwork: 74, fitness: 72, mental: 65 },
    performanceTrend: [
      { month: 'Nov', rating: 6.0, sessions: 12 },
      { month: 'Dec', rating: 6.2, sessions: 10 },
      { month: 'Jan', rating: 6.5, sessions: 13 },
      { month: 'Feb', rating: 6.8, sessions: 14 },
      { month: 'Mar', rating: 7.0, sessions: 13 },
      { month: 'Apr', rating: 7.2, sessions: 15 },
    ],
  },
  {
    id: 's3',
    name: 'Sophie Liu',
    age: 12,
    level: 2,
    animalId: 'rabbit',
    hand: 'left',
    trainingFreq: 2,
    winRate: 42,
    nextMatch: '2026-05-28',
    nextMatchOpponent: 'Eastside Youth Club',
    color: '#f472b6',
    joinDate: '2025-09-05',
    skills: { forehand: 52, backhand: 48, serve: 55, footwork: 60, fitness: 58, mental: 50 },
    performanceTrend: [
      { month: 'Nov', rating: 4.5, sessions: 8 },
      { month: 'Dec', rating: 4.8, sessions: 7 },
      { month: 'Jan', rating: 5.2, sessions: 9 },
      { month: 'Feb', rating: 5.5, sessions: 10 },
      { month: 'Mar', rating: 5.8, sessions: 9 },
      { month: 'Apr', rating: 6.0, sessions: 10 },
    ],
  },
  {
    id: 's4',
    name: 'Marcus Webb',
    age: 18,
    level: 9,
    animalId: 'owl',
    hand: 'right',
    trainingFreq: 6,
    winRate: 81,
    nextMatch: '2026-05-18',
    nextMatchOpponent: 'National Junior Open',
    color: '#fb923c',
    joinDate: '2022-06-01',
    skills: { forehand: 92, backhand: 88, serve: 95, footwork: 91, fitness: 94, mental: 89 },
    performanceTrend: [
      { month: 'Nov', rating: 8.8, sessions: 24 },
      { month: 'Dec', rating: 8.9, sessions: 20 },
      { month: 'Jan', rating: 9.0, sessions: 25 },
      { month: 'Feb', rating: 9.1, sessions: 26 },
      { month: 'Mar', rating: 9.2, sessions: 25 },
      { month: 'Apr', rating: 9.3, sessions: 27 },
    ],
  },
  {
    id: 's5',
    name: 'Lily Zhang',
    age: 15,
    level: 6,
    animalId: 'monkey',
    hand: 'right',
    trainingFreq: 4,
    winRate: 65,
    nextMatch: '2026-05-25',
    nextMatchOpponent: 'West County Open',
    color: '#a78bfa',
    joinDate: '2024-08-20',
    skills: { forehand: 78, backhand: 75, serve: 72, footwork: 85, fitness: 80, mental: 73 },
    performanceTrend: [
      { month: 'Nov', rating: 6.8, sessions: 16 },
      { month: 'Dec', rating: 7.0, sessions: 14 },
      { month: 'Jan', rating: 7.2, sessions: 17 },
      { month: 'Feb', rating: 7.4, sessions: 18 },
      { month: 'Mar', rating: 7.6, sessions: 17 },
      { month: 'Apr', rating: 7.8, sessions: 19 },
    ],
  },
  {
    id: 's6',
    name: 'Kai Tanaka',
    age: 13,
    level: 3,
    animalId: 'cat',
    hand: 'left',
    trainingFreq: 3,
    winRate: 50,
    nextMatch: '2026-06-02',
    nextMatchOpponent: 'Spring Junior Cup',
    color: '#34d399',
    joinDate: '2025-04-12',
    skills: { forehand: 60, backhand: 58, serve: 62, footwork: 68, fitness: 65, mental: 58 },
    performanceTrend: [
      { month: 'Nov', rating: 5.2, sessions: 11 },
      { month: 'Dec', rating: 5.5, sessions: 9 },
      { month: 'Jan', rating: 5.8, sessions: 12 },
      { month: 'Feb', rating: 6.0, sessions: 13 },
      { month: 'Mar', rating: 6.2, sessions: 12 },
      { month: 'Apr', rating: 6.5, sessions: 13 },
    ],
  },
  {
    id: 's7',
    name: 'Alex Rivera',
    age: 17,
    level: 8,
    animalId: 'bison',
    hand: 'right',
    trainingFreq: 5,
    winRate: 76,
    nextMatch: '2026-05-22',
    nextMatchOpponent: 'Regional Championships',
    color: '#fbbf24',
    joinDate: '2023-02-08',
    skills: { forehand: 88, backhand: 84, serve: 86, footwork: 82, fitness: 88, mental: 85 },
    performanceTrend: [
      { month: 'Nov', rating: 8.0, sessions: 21 },
      { month: 'Dec', rating: 8.1, sessions: 18 },
      { month: 'Jan', rating: 8.3, sessions: 22 },
      { month: 'Feb', rating: 8.4, sessions: 23 },
      { month: 'Mar', rating: 8.5, sessions: 22 },
      { month: 'Apr', rating: 8.7, sessions: 24 },
    ],
  },
  {
    id: 's8',
    name: 'Nina Okafor',
    age: 11,
    level: 1,
    animalId: 'dog',
    hand: 'right',
    trainingFreq: 2,
    winRate: 35,
    nextMatch: '2026-06-10',
    nextMatchOpponent: 'Beginners Open',
    color: '#f87171',
    joinDate: '2026-01-15',
    skills: { forehand: 40, backhand: 35, serve: 42, footwork: 48, fitness: 50, mental: 42 },
    performanceTrend: [
      { month: 'Jan', rating: 3.5, sessions: 6 },
      { month: 'Feb', rating: 3.8, sessions: 7 },
      { month: 'Mar', rating: 4.2, sessions: 8 },
      { month: 'Apr', rating: 4.5, sessions: 8 },
    ],
  },
]

export const TRAINING_RECORDS: TrainingSession[] = [
  {
    id: 'tr1',
    studentId: 's1',
    date: '2026-05-14',
    title: 'Backhand Cross-Court Precision',
    focus: 'Improving consistency on backhand cross-court shots under pressure. Focus on follow-through and shoulder rotation.',
    technical: 'Emma tends to cut her swing short when fatigued. Left shoulder drops 15° too early, causing loss of depth and spin. Need to reinforce the kinetic chain from hip rotation through contact point.',
    feedback: 'Great improvement in the second half of the session. When she commits fully to the shot, her backhand is lethal. Mental focus needs work — distracted by unforced errors in early drills.',
    homework: '1. Shadow swings x 100 focusing on full follow-through\n2. Wall backhand drills 20 min daily\n3. Video review: watch Halep backhand slow-motion',
    rating: 8,
  },
  {
    id: 'tr2',
    studentId: 's4',
    date: '2026-05-13',
    title: 'Serve & Volley Combination',
    focus: 'First serve + approach to net. Marcus needs to be more aggressive at the net following a strong first serve.',
    technical: 'Serve mechanics are excellent (95%+ first serve speed consistency). The split step timing after serving needs improvement — arriving at net 0.3-0.5s late on average.',
    feedback: 'Marcus is ready for tournament-level serve-and-volley tactics. His net game has improved dramatically. Only weakness is the backhand volley when stretched wide.',
    homework: '1. Serve + sprint to net drill x 50\n2. Backhand volley from wide position drill\n3. Watch Sampras serve-volley highlights for positioning inspiration',
    rating: 9,
  },
  {
    id: 'tr3',
    studentId: 's2',
    date: '2026-05-12',
    title: 'Groundstroke Rally Consistency',
    focus: 'James needs to improve rally length and reduce unforced errors. Target: keep 80% of baseline rallies in play.',
    technical: 'Forehand loop timing is off when the ball bounces high. James is hitting too early on the rise instead of letting the ball drop to his strike zone. This creates short, pushable balls.',
    feedback: 'Progress is solid this week. James is starting to understand court geometry better. His court movement has improved significantly.',
    homework: '1. High-ball forehand drill 15 min\n2. Rally count challenge: beat your record of 22 consecutive shots\n3. Agility ladder footwork 10 min',
    rating: 7,
  },
  {
    id: 'tr4',
    studentId: 's5',
    date: '2026-05-11',
    title: 'Drop Shot & Lob Tactics',
    focus: 'Lily has natural instincts at the net. Today focused on using the drop shot to pull opponents forward, followed by a lob.',
    technical: 'Drop shot slice technique is clean and effective. Lob depth needs improvement — current lobs are landing short of the baseline by ~1m, making them attackable.',
    feedback: 'Lily is a chess player on the court. Her tactical awareness is her biggest strength. The combination of drop shot + lob is becoming a signature weapon.',
    homework: '1. Lob depth target drill (land in 1m strip at baseline)\n2. Drop shot from both wings x 30 each\n3. Tactical match video analysis',
    rating: 8,
  },
  {
    id: 'tr5',
    studentId: 's3',
    date: '2026-05-10',
    title: 'Forehand Foundation Building',
    focus: 'Sophie is in early development stage. Focus on establishing correct grip, stance, and basic forehand mechanics.',
    technical: 'Eastern forehand grip is solid. Needs to work on unit turn (shoulder rotation) before the swing. Contact point too close to body — resulting in arm-only shots with no power.',
    feedback: 'Sophie has fantastic athletic instincts for her age. She listens well and implements corrections quickly. Energy and enthusiasm are infectious!',
    homework: '1. Grip and unit turn at home mirror drill x 20 min\n2. Easy wall rallies focusing on contact point\n3. Watch Serena Williams forehand breakdown video',
    rating: 6,
  },
]

export const CALENDAR_SESSIONS: CalendarSession[] = [
  { id: 'c1', studentId: 's1', title: 'Emma - Backhand Focus', type: 'practice', date: '2026-05-18', startHour: 9, duration: 90, court: 'Court 1' },
  { id: 'c2', studentId: 's4', title: 'Marcus - Serve Day', type: 'practice', date: '2026-05-18', startHour: 11, duration: 60, court: 'Court 2' },
  { id: 'c3', studentId: 's7', title: 'Alex - Match Practice', type: 'match', date: '2026-05-19', startHour: 14, duration: 120, court: 'Court 1' },
  { id: 'c4', studentId: 's2', title: 'James - Rally Drills', type: 'practice', date: '2026-05-20', startHour: 10, duration: 90, court: 'Court 3' },
  { id: 'c5', studentId: 's5', title: 'Lily - Tactics Session', type: 'practice', date: '2026-05-20', startHour: 15, duration: 60, court: 'Court 2' },
  { id: 'c6', studentId: 's1', title: 'Group Junior Class', type: 'group', date: '2026-05-21', startHour: 16, duration: 90, court: 'Court 1' },
  { id: 'c7', studentId: 's6', title: 'Kai - Foundation Drills', type: 'practice', date: '2026-05-21', startHour: 9, duration: 60, court: 'Court 3' },
  { id: 'c8', studentId: 's4', title: 'Marcus - Tournament Prep', type: 'match', date: '2026-05-22', startHour: 13, duration: 120, court: 'Court 1' },
  { id: 'c9', studentId: 's3', title: 'Sophie - Basics', type: 'practice', date: '2026-05-22', startHour: 9, duration: 60, court: 'Court 4' },
  { id: 'c10', studentId: 's8', title: 'Nina - First Steps', type: 'practice', date: '2026-05-23', startHour: 10, duration: 60, court: 'Court 4' },
  { id: 'c11', studentId: 's7', title: 'Alex - Fitness', type: 'practice', date: '2026-05-23', startHour: 8, duration: 90, court: 'Court 2' },
  { id: 'c12', studentId: 's2', title: 'James - Match Simulation', type: 'match', date: '2026-05-24', startHour: 15, duration: 90, court: 'Court 1' },
]

export const WEEKLY_STATS = [
  { day: 'Mon', sessions: 3, intensity: 75, rating: 8.1 },
  { day: 'Tue', sessions: 4, intensity: 82, rating: 7.9 },
  { day: 'Wed', sessions: 2, intensity: 60, rating: 8.4 },
  { day: 'Thu', sessions: 5, intensity: 90, rating: 8.2 },
  { day: 'Fri', sessions: 4, intensity: 85, rating: 7.8 },
  { day: 'Sat', sessions: 6, intensity: 95, rating: 8.5 },
  { day: 'Sun', sessions: 1, intensity: 40, rating: 7.5 },
]
