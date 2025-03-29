import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

// GET: Fetch tasks
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const tasks = await prisma.todo.findMany({
      where: { userId: session.user.id },
    });

    return Response.json(tasks);
  } catch (error) {
    console.error("GET /api/todo Error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// POST: Add a new task
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("Session User:", session.user); // 🔹 Check session data again

    if (!session || !session.user || !session.user.id) {
      return Response.json({ error: "Unauthorized or Invalid Session" }, { status: 401 });
    }

    const { title } = await req.json();
    if (!title.trim()) {
      return Response.json({ error: "Task title is required" }, { status: 400 });
    }

    const newTask = await prisma.todo.create({
      data: { title, userId: session.user.id },
    });

    return Response.json(newTask);
  } catch (error) {
    console.error("POST /api/todo Error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
