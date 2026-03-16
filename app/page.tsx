"use client";

import { useState, useEffect, useCallback } from "react";
import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // ── Fetch all notes ──────────────────────────────────────────────
  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ── Create or update ────────────────────────────────────────────
  const handleSubmit = async (title: string, content: string) => {
    if (editingNote) {
      // Update
      await fetch("/api/notes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingNote.id, title, content }),
      });
      setEditingNote(null);
    } else {
      // Create
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    }
    fetchNotes();
  };

  // ── Delete ──────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    await fetch("/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchNotes();
  };

  // ── Edit ────────────────────────────────────────────────────────
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Skeleton loader ─────────────────────────────────────────────
  const Skeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="animate-shimmer rounded-2xl h-48"
          style={{ border: "1px solid var(--color-border)" }}
        />
      ))}
    </div>
  );

  // ── Empty state ─────────────────────────────────────────────────
  const EmptyState = () => (
    <div
      className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="text-5xl mb-4">📋</div>
      <h3
        className="text-lg font-semibold mb-1"
        style={{ color: "var(--color-text)" }}
      >
        No notes yet
      </h3>
      <p
        className="text-sm"
        style={{ color: "var(--color-text-muted)" }}
      >
        Create your first note using the form above.
      </p>
    </div>
  );

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ── Header ─────────────────────────────── */}
        <header className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center text-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), #8b5cf6)",
              }}
            >
              📝
            </div>
            <h1
              className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ color: "var(--color-text)" }}
            >
              Notes Dashboard
            </h1>
          </div>
          <p
            className="text-sm ml-[52px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            Capture ideas, tasks, and reminders — all in one place.
          </p>
        </header>

        {/* ── Form ───────────────────────────────── */}
        <NoteForm
          editingNote={editingNote}
          onSubmit={handleSubmit}
          onCancelEdit={() => setEditingNote(null)}
        />

        {/* ── Notes count badge ──────────────────── */}
        {!loading && notes.length > 0 && (
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "var(--color-primary-glow)",
                color: "var(--color-primary-hover)",
              }}
            >
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </span>
          </div>
        )}

        {/* ── Content area ───────────────────────── */}
        {loading ? (
          <Skeleton />
        ) : notes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ───────────────────────────────── */}
      <footer
        className="mt-16 text-center text-xs pb-6"
        style={{ color: "var(--color-text-dim)" }}
      >
        Built with Next.js &amp; Bun &nbsp;·&nbsp; Notes Dashboard
      </footer>
    </main>
  );
}
