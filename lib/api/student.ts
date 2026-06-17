import { CreateStudentDto } from "@/lib/types/student";
import { Student } from "@/lib/types/student";

export async function createStudent(
  payload: CreateStudentDto
) {
  const response = await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (result.code !== 0) {
    throw new Error(result.msg);
  }

  return result.data;
}



export async function getStudents(): Promise<Student[]> {
  const response = await fetch("/api/students");

  const result = await response.json();

  if (result.code !== 0) {
    throw new Error(result.msg);
  }

  return result.data;
}
