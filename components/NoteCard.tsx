"use client";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteCardProps {
  note: Note;
  index: number;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({
  note,
  index,
  onEdit,
  onDelete,
}: NoteCardProps) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="animate-fade-in-up rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-all duration-300"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
        animationDelay: `${index * 60}ms`,
        opacity: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-hover)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 8px 30px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* ── Body ───────────────────────────────────── */}
      <div className="space-y-2 min-w-0">
        <h3
          className="font-semibold text-base truncate"
          style={{ color: "var(--color-text)" }}
        >
          {note.title}
        </h3>
        <p
          className="text-sm leading-relaxed line-clamp-4 whitespace-pre-wrap"
          style={{ color: "var(--color-text-muted)" }}
        >
          {note.content}
        </p>
      </div>

      {/* ── Footer ─────────────────────────────────── */}
      <div className="flex items-center justify-between pt-3 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <span
          className="text-xs"
          style={{ color: "var(--color-text-dim)" }}
        >
          {formattedDate}
        </span>

        <div className="flex gap-2">
          <button
            id={`edit-${note.id}`}
            onClick={() => onEdit(note)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: "var(--color-surface-hover)",
              color: "var(--color-primary-hover)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-surface-hover)";
              e.currentTarget.style.color = "var(--color-primary-hover)";
            }}
          >
            Edit
          </button>
          <button
            id={`delete-${note.id}`}
            onClick={() => onDelete(note.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: "var(--color-surface-hover)",
              color: "var(--color-danger)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-danger)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-surface-hover)";
              e.currentTarget.style.color = "var(--color-danger)";
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
