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

export async function DELETE(request: Request) {
  const session = await getServerSession();

  // Verificar autenticación
  if (!session) {
    return NextResponse.json(
      { message: "No estás autenticado" },
      { status: 401 }
    );
  }

  try {
    // Obtener los IDs de las notas a eliminar del cuerpo de la solicitud
    const { ids } = await request.json();

    // Verificar que se proporcionaron IDs
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "Se requiere un array de IDs de notas" },
        { status: 400 }
      );
    }

    // Obtener el usuario actual
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

    // Eliminar las notas que pertenezcan al usuario
    const deletedNotes = await db.notes.deleteMany({
      where: {
        AND: [
          { id: { in: ids } },
          { userId: user.id }, // Asegura que solo se eliminen las notas del usuario actual
        ],
      },
    });

    return NextResponse.json(
      {
        message: "Notas eliminadas correctamente",
        eliminadas: deletedNotes.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar las notas:", error);
    return NextResponse.json(
      { message: "Error al eliminar las notas" },
      { status: 500 }
    );
  }
}
