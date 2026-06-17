export interface SkillScores {
  forehand: number;
  backhand: number;
  serve: number;
  footwork: number;
  fitness: number;
  mental: number;
}

export interface PerformanceTrend {
  month: string;
  rating: number;
  sessions: number;
}

export type Hand = "left" | "right";

export interface Student {
  id: string;

  name: string;

  age: number;

  level: number;

  animalId: string;

  hand: Hand;

  trainingFreq: number;

  winRate: number;

  nextMatch: string;

  nextMatchOpponent: string;

  color: string;

  joinDate: string;

  skills: SkillScores;

  performanceTrend: PerformanceTrend[];
}

export interface CreateStudentDto {
  name: string;
  age: number;
  level: number;
  animalId: string;
  hand: "left" | "right";
  trainingFreq: number;
  color: string;
}
