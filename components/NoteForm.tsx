"use client";

import { useState, useEffect } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteFormProps {
  editingNote: Note | null;
  onSubmit: (title: string, content: string) => void;
  onCancelEdit: () => void;
}

export default function NoteForm({
  editingNote,
  onSubmit,
  onCancelEdit,
}: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit(title.trim(), content.trim());
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border p-6 space-y-4 transition-all duration-300"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: editingNote
          ? "var(--color-primary)"
          : "var(--color-border)",
        boxShadow: editingNote
          ? "0 0 24px var(--color-primary-glow)"
          : "none",
      }}
    >
      {/* ── Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">
          {editingNote ? "✏️ Edit Note" : "📝 New Note"}
        </h2>
        {editingNote && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm px-3 py-1 rounded-lg transition-colors cursor-pointer"
            style={{
              color: "var(--color-text-muted)",
              backgroundColor: "var(--color-surface-hover)",
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* ── Title ──────────────────────────────────── */}
      <input
        id="note-title"
        type="text"
        placeholder="Note title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:ring-2"
        style={{
          backgroundColor: "var(--color-background)",
          borderColor: "var(--color-border)",
          color: "var(--color-text)",
          // @ts-expect-error -- CSS custom property for focus ring
          "--tw-ring-color": "var(--color-primary)",
        }}
      />

      {/* ── Content ────────────────────────────────── */}
      <textarea
        id="note-content"
        placeholder="Write your note…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-all duration-200 focus:ring-2"
        style={{
          backgroundColor: "var(--color-background)",
          borderColor: "var(--color-border)",
          color: "var(--color-text)",
          // @ts-expect-error -- CSS custom property for focus ring
          "--tw-ring-color": "var(--color-primary)",
        }}
      />

      {/* ── Submit ─────────────────────────────────── */}
      <button
        id="note-submit"
        type="submit"
        disabled={!title.trim() || !content.trim()}
        className="w-full py-3 rounded-xl font-medium text-sm text-white transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, var(--color-primary), #8b5cf6)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.opacity = "0.9")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.opacity = "1")
        }
      >
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
