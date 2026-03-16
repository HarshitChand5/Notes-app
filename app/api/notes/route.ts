import { NextRequest, NextResponse } from "next/server";
import { getAllNotes, addNote, updateNote, deleteNote } from "@/lib/notesStore";

// GET /api/notes — fetch all notes
export async function GET() {
  const notes = getAllNotes();
  return NextResponse.json(notes);
}

// POST /api/notes — create a new note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    const note = addNote(title.trim(), content.trim());
    return NextResponse.json(note, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}

// PUT /api/notes — update an existing note
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, content } = body;

    if (!id || !title || !content) {
      return NextResponse.json(
        { error: "Id, title, and content are required." },
        { status: 400 }
      );
    }

    const updated = updateNote(id, title.trim(), content.trim());
    if (!updated) {
      return NextResponse.json({ error: "Note not found." }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}

// DELETE /api/notes — delete a note
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Id is required." },
        { status: 400 }
      );
    }

    const deleted = deleteNote(id);
    if (!deleted) {
      return NextResponse.json({ error: "Note not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
