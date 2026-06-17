'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'en' | 'zh'

export interface Translations {
  // Nav
  nav_dashboard: string
  nav_students: string
  nav_training: string
  nav_calendar: string
  // Common
  save: string
  cancel: string
  edit: string
  delete: string
  add: string
  adding: string
  close: string
  view_all: string
  back: string
  search: string
  level: string
  lv: string
  // Animals
  animal_fox: string
  animal_rabbit: string
  animal_tiger: string
  animal_owl: string
  animal_monkey: string
  animal_cat: string
  animal_bison: string
  animal_dog: string
  // Dashboard
  dash_welcome: string
  dash_subtitle: string
  dash_today_sessions: string
  dash_weekly_stats: string
  dash_student_overview: string
  dash_upcoming_matches: string
  dash_latest_news: string
  dash_recent_activity: string
  dash_total_students: string
  dash_weekly_sessions: string
  dash_win_rate: string
  dash_avg_rating: string
  dash_training_intensity: string
  dash_vs: string
  dash_news_1_title: string
  dash_news_1_desc: string
  dash_news_2_title: string
  dash_news_2_desc: string
  dash_news_3_title: string
  dash_news_3_desc: string
  // Students
  stu_title: string
  stu_add: string
  stu_search: string
  stu_age: string
  stu_hand: string
  stu_right: string
  stu_left: string
  stu_freq: string
  stu_next_match: string
  stu_sessions_week: string
  stu_win_rate: string
  stu_animal: string
  stu_select_animal: string
  stu_upgrade: string
  stu_name: string
  loading_students: string
  no_students_found: string
  // Student Detail
  sd_skills: string
  sd_forehand: string
  sd_backhand: string
  sd_serve: string
  sd_footwork: string
  sd_fitness: string
  sd_mental: string
  sd_trend: string
  sd_history: string
  sd_ai_analysis: string
  sd_ai_title: string
  sd_ai_loading: string
  sd_performance_trend: string
  sd_session_rating: string
  sd_training_freq: string
  // Training Records
  tr_title: string
  tr_new: string
  tr_search: string
  tr_focus: string
  tr_technical: string
  tr_feedback: string
  tr_homework: string
  tr_video: string
  tr_voice: string
  tr_rating: string
  tr_student: string
  tr_date: string
  tr_add_video: string
  tr_add_voice: string
  tr_no_records: string
  // Calendar
  cal_title: string
  cal_add_session: string
  cal_week: string
  cal_day: string
  cal_drag_hint: string
  cal_no_session: string
  cal_session_type: string
  cal_practice: string
  cal_match: string
  cal_group: string
  cal_duration: string
  cal_court: string
  // Months/Days
  mon: string
  tue: string
  wed: string
  thu: string
  fri: string
  sat: string
  sun: string
  // Rating labels
  excellent: string
  good: string
  average: string
  // Coach name
  coach_name: string
  coach_role: string
}

const en: Translations = {
  nav_dashboard: 'Dashboard',
  nav_students: 'Students',
  nav_training: 'Training',
  nav_calendar: 'Calendar',
  save: 'Save',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  add: 'Add',
  adding: 'Adding...',
  close: 'Close',
  view_all: 'View All',
  back: 'Back',
  search: 'Search...',
  level: 'Level',
  lv: 'Lv.',
  animal_fox: 'Fox',
  animal_rabbit: 'Rabbit',
  animal_tiger: 'Tiger',
  animal_owl: 'Owl',
  animal_monkey: 'Monkey',
  animal_cat: 'Cat',
  animal_bison: 'Bison',
  animal_dog: 'Hound',
  dash_welcome: 'Good morning, Coach Alex',
  dash_subtitle: 'Here\'s your training overview for today',
  dash_today_sessions: 'Today\'s Sessions',
  dash_weekly_stats: 'Weekly Training Stats',
  dash_student_overview: 'Student Performance Overview',
  dash_upcoming_matches: 'Upcoming Matches',
  dash_latest_news: 'Latest Tennis News',
  dash_recent_activity: 'Recent Activity',
  dash_total_students: 'Total Students',
  dash_weekly_sessions: 'Weekly Sessions',
  dash_win_rate: 'Win Rate',
  dash_avg_rating: 'Avg. Rating',
  dash_training_intensity: 'Training Intensity',
  dash_vs: 'vs',
  dash_news_1_title: 'Djokovic Advances at Roland Garros',
  dash_news_1_desc: 'Novak Djokovic reached the quarterfinals with a dominant performance on Court Philippe Chatrier.',
  dash_news_2_title: 'New Ranking System Unveiled',
  dash_news_2_desc: 'ITF announces revamped junior ranking system to better track young players\' development.',
  dash_news_3_title: 'Summer Training Camps Open Registration',
  dash_news_3_desc: 'National Tennis Academy opens registrations for elite summer development programs.',
  stu_title: 'Student Management',
  stu_add: 'Add Student',
  stu_search: 'Search students...',
  stu_age: 'Age',
  stu_hand: 'Playing Hand',
  stu_right: 'Right',
  stu_left: 'Left',
  stu_freq: 'Training Frequency',
  stu_next_match: 'Next Match',
  stu_sessions_week: 'sessions/week',
  stu_win_rate: 'Win Rate',
  stu_animal: 'Spirit Animal',
  stu_select_animal: 'Select Animal',
  stu_upgrade: 'Level Up!',
  stu_name: 'Student Name',
  loading_students: 'Loading students...',
  no_students_found: 'No students found',
  sd_skills: 'Technical Skills',
  sd_forehand: 'Forehand',
  sd_backhand: 'Backhand',
  sd_serve: 'Serve',
  sd_footwork: 'Footwork',
  sd_fitness: 'Fitness',
  sd_mental: 'Mental',
  sd_trend: 'Performance Trend',
  sd_history: 'Training History',
  sd_ai_analysis: 'AI Analysis',
  sd_ai_title: 'AI Coach Analysis',
  sd_ai_loading: 'Analyzing player data...',
  sd_performance_trend: 'Performance Trend',
  sd_session_rating: 'Session Rating',
  sd_training_freq: 'Training Frequency',
  tr_title: 'Training Records',
  tr_new: 'New Record',
  tr_search: 'Search records...',
  tr_focus: "Today's Training Focus",
  tr_technical: 'Technical Analysis',
  tr_feedback: 'Coach Feedback',
  tr_homework: 'Home Practice Assignment',
  tr_video: 'Video Recording',
  tr_voice: 'Voice Note',
  tr_rating: 'Session Rating',
  tr_student: 'Student',
  tr_date: 'Date',
  tr_add_video: 'Add Video Clip',
  tr_add_voice: 'Record Voice Note',
  tr_no_records: 'No training records yet',
  cal_title: 'Schedule',
  cal_add_session: 'Add Session',
  cal_week: 'Week',
  cal_day: 'Day',
  cal_drag_hint: 'Drag sessions to reschedule',
  cal_no_session: 'No session',
  cal_session_type: 'Session Type',
  cal_practice: 'Practice',
  cal_match: 'Match',
  cal_group: 'Group',
  cal_duration: 'Duration',
  cal_court: 'Court',
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
  excellent: 'Excellent',
  good: 'Good',
  average: 'Average',
  coach_name: 'Coach Alex',
  coach_role: 'Head Tennis Coach',
}

const zh: Translations = {
  nav_dashboard: '仪表盘',
  nav_students: '学员管理',
  nav_training: '训练记录',
  nav_calendar: '课程安排',
  save: '保存',
  cancel: '取消',
  edit: '编辑',
  delete: '删除',
  add: '添加',
  adding: '添加中...',
  close: '关闭',
  view_all: '查看全部',
  back: '返回',
  search: '搜索...',
  level: '等级',
  lv: '等级',
  animal_fox: '狐狸',
  animal_rabbit: '兔子',
  animal_tiger: '老虎',
  animal_owl: '猫头鹰',
  animal_monkey: '猴子',
  animal_cat: '猫',
  animal_bison: '野牛',
  animal_dog: '猎狗',
  dash_welcome: '早上好，Alex教练',
  dash_subtitle: '今日训练概览',
  dash_today_sessions: '今日课程',
  dash_weekly_stats: '本周训练统计',
  dash_student_overview: '学员表现概览',
  dash_upcoming_matches: '即将到来的比赛',
  dash_latest_news: '最新网球资讯',
  dash_recent_activity: '最近训练动态',
  dash_total_students: '学员总数',
  dash_weekly_sessions: '本周课程数',
  dash_win_rate: '胜率统计',
  dash_avg_rating: '平均训练评分',
  dash_training_intensity: '训练强度',
  dash_vs: '对战',
  dash_news_1_title: '德约科维奇晋级罗兰加洛斯',
  dash_news_1_desc: '诺瓦克·德约科维奇在菲利普·夏蒂埃球场以出色表现晋级四分之一决赛。',
  dash_news_2_title: '全新排名系统发布',
  dash_news_2_desc: '国际网球联合会宣布改革青少年排名系统，更好地追踪年轻球员的发展。',
  dash_news_3_title: '夏季训练营开放报名',
  dash_news_3_desc: '国家网球学院开放精英夏季发展项目报名。',
  stu_title: '学员管理',
  stu_add: '添加学员',
  stu_search: '搜索学员...',
  stu_age: '年龄',
  stu_hand: '惯用手',
  stu_right: '右手',
  stu_left: '左手',
  stu_freq: '训练频率',
  stu_next_match: '下场比赛',
  stu_sessions_week: '次/周',
  stu_win_rate: '胜率',
  stu_animal: '精灵动物',
  stu_select_animal: '选择动物',
  stu_upgrade: '升级！',
  stu_name: '学员姓名',
  loading_students: '加载学员中...',
  no_students_found: '未找到学员',
  sd_skills: '技术能力分析',
  sd_forehand: '正手',
  sd_backhand: '反手',
  sd_serve: '发球',
  sd_footwork: '步伐',
  sd_fitness: '体能',
  sd_mental: '心理稳定性',
  sd_trend: '表现趋势',
  sd_history: '历史训练',
  sd_ai_analysis: 'AI分析',
  sd_ai_title: 'AI教练分析',
  sd_ai_loading: '正在分析球员数据...',
  sd_performance_trend: '表现趋势',
  sd_session_rating: '课程评分',
  sd_training_freq: '训练频率',
  tr_title: '训练记录',
  tr_new: '新建记录',
  tr_search: '搜索记录...',
  tr_focus: '今日训练重点',
  tr_technical: '技术问题分析',
  tr_feedback: '教练反馈',
  tr_homework: '家庭训练作业',
  tr_video: '视频记录',
  tr_voice: '语音记录',
  tr_rating: '课程评分',
  tr_student: '学员',
  tr_date: '日期',
  tr_add_video: '添加视频片段',
  tr_add_voice: '录制语音笔记',
  tr_no_records: '暂无训练记录',
  cal_title: '课程安排',
  cal_add_session: '添加课程',
  cal_week: '周',
  cal_day: '日',
  cal_drag_hint: '拖拽卡片可重新安排时间',
  cal_no_session: '无课程',
  cal_session_type: '课程类型',
  cal_practice: '训练',
  cal_match: '比赛',
  cal_group: '团体课',
  cal_duration: '时长',
  cal_court: '球场',
  mon: '周一',
  tue: '周二',
  wed: '周三',
  thu: '周四',
  fri: '周五',
  sat: '周六',
  sun: '周日',
  excellent: '优秀',
  good: '良好',
  average: '一般',
  coach_name: 'Alex教练',
  coach_role: '首席网球教练',
}

const translations = { en, zh }

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
