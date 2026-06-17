import { prisma } from "@/lib/prisma";
import { success, fail } from "@/lib/response";
import { NextResponse } from "next/server";
import { CreateStudentDto } from "@/lib/types/student";
import { ResponseCode } from "@/lib/constants/response-code";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        skills: true,
        trends: true,
      },
    });

    return NextResponse.json(
      success(students)
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      fail("Get students failed"),
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: CreateStudentDto =
      await request.json();

    if (!body.name?.trim()) {
      return NextResponse.json(
        fail(
          "Student name is required",
          ResponseCode.SERVER_ERROR
        ),
        {
          status: 400,
        }
      );
    }

    const student = await prisma.student.create({
      data: {
        name: body.name,
        age: body.age,
        level: body.level,
        animalId: body.animalId,
        hand: body.hand,
        trainingFreq: body.trainingFreq,
        color: body.color,

        winRate: 0,

        joinDate: new Date(),

        skills: {
          create: body.skills,
        },
      },
    });

    return NextResponse.json(
      success(
        {
          id: student.id,
        },
        "Student created successfully"
      )
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      fail(
        "Create student failed",
        ResponseCode.SERVER_ERROR
      ),
      {
        status: 500,
      }
    );
  }
}
