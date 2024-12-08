import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import db from "@/lib/db";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { message: "No estás autenticado" },
      { status: 401 }
    );
  }

  const findUser = await db.user.findFirst({
    where: {
      AND: [{ name: session.user?.name }, { email: session.user?.email || "" }],
    },
    include: {
      Notes: true,
    },
  });

  const notes = findUser?.Notes;

  try {
    return NextResponse.json(
      {
        data: notes,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener las notas", error: error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { message: "No estás autenticado" },
      { status: 401 }
    );
  }

  try {
    const { title, content, url, status, isShared, priority, deadline, tags } =
      await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Título y contenido son requeridos" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({
      where: {
        AND: [
          { name: session.user?.name },
          { email: session.user?.email || "" },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const newNote = await db.notes.create({
      data: {
        title,
        content,
        url: url || null,
        status: status || "ACTIVE",
        isShared: isShared || false,
        priority: priority || 0,
        deadline: deadline ? new Date(deadline) : null,
        userId: user.id,
        Tags: {
          create: tags.map((tag: { name: string; color: string }) => ({
            name: tag.name,
            color: tag.color,
          })),
        },
      },
      include: {
        Tags: true,
      },
    });

    return NextResponse.json(
      { message: "Nota creada exitosamente", data: newNote },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear la nota:", error);
    return NextResponse.json(
      { message: "Error al crear la nota" },
      { status: 500 }
    );
  }
}
