import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT: Update a task
export async function PUT(req, context) {
  try {
    const { params } = context;
    const { id } = await params; // ✅ Await params before using
    const { title } = await req.json();

    if (!title.trim()) {
      return Response.json({ error: "Task title is required" }, { status: 400 });
    }

    const updatedTask = await prisma.todo.update({
      where: { id },
      data: { title },
    });

    return Response.json(updatedTask);
  } catch (error) {
    console.error("PUT /api/todo/[id] Error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// DELETE: Remove a task
export async function DELETE(req, context) {
  try {
    const { params } = context;
    const { id } = await params; // ✅ Await params before using

    await prisma.todo.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/todo/[id] Error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
