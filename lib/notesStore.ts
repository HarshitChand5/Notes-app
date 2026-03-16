export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// ── In-memory store ──────────────────────────────────────────────────
const notes: Note[] = [];

export function getAllNotes(): Note[] {
  return [...notes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addNote(title: string, content: string): Note {
  const note: Note = {
    id: crypto.randomUUID(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  notes.push(note);
  return note;
}

export function updateNote(
  id: string,
  title: string,
  content: string
): Note | null {
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) return null;
  notes[index] = { ...notes[index], title, content };
  return notes[index];
}

export function deleteNote(id: string): boolean {
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) return false;
  notes.splice(index, 1);
  return true;
}
