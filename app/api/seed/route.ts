import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const student = await prisma.student.create({
    data: {
      name: "Emma Chen",
      age: 16,
      level: 7,
      animalId: "tiger",
      hand: "right",
      trainingFreq: 5,
      winRate: 72,
      color: "#c8ff00",
      joinDate: new Date("2024-03-15"),

      nextMatchDate: new Date("2026-05-20"),
      nextOpponent: "City Tennis Club",

      skills: {
        create: {
          forehand: 85,
          backhand: 78,
          serve: 82,
          footwork: 88,
          fitness: 90,
          mental: 75,
        },
      },

      trends: {
        create: [
          {
            month: "Nov",
            rating: 7.2,
            sessions: 18,
          },
          {
            month: "Dec",
            rating: 7.5,
            sessions: 15,
          },
          {
            month: "Jan",
            rating: 7.8,
            sessions: 20,
          },
        ],
      },
    },
  });

  return NextResponse.json(student);
}
