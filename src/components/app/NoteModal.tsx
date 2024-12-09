import ArrowRightIcon from "@/icons/ArrowRight";
import { NotesProps } from "@/types/notes";

interface NoteModalProps {
  note: NotesProps;
  isOpen: boolean;
  onClose: () => void;
}

export default function NoteModal({ note, isOpen, onClose }: NoteModalProps) {
  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl p-6 mx-4 rounded-lg bg-neutral-900">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute p-2 rounded-full top-4 right-4 hover:bg-neutral-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {note.url ? (
              <div className="flex items-center flex-wrap gap-2">
                <a
                  href={note.url}
                  target="_blank"
                  className="font-bold hover:underline"
                >
                  {note.title}
                </a>
                <ArrowRightIcon className="-rotate-45 text-neutral-500" />
              </div>
            ) : (
              <span className="font-bold">{note.title}</span>
            )}
          </div>

          <p className="text-neutral-300">{note.content}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span>Creado el: {formatDate(note.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span>Última actualización: {formatDate(note.updatedAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span>Fecha límite: {formatDate(note.deadline)}</span>
            </div>
          </div>

          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-neutral-400">Etiquetas:</span>
              {note.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 text-sm rounded-full"
                  style={{
                    backgroundColor: `${tag.color}40`,
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2 py-1 text-sm rounded-full ${
                note.status === "ACTIVE"
                  ? "bg-blue-500/20 text-blue-300"
                  : note.status === "PROGRESS"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : "bg-green-500/20 text-green-300"
              }`}
            >
              {note.status === "ACTIVE"
                ? "Activo"
                : note.status === "PROGRESS"
                ? "En Progreso"
                : "Completado"}
            </span>
            <span
              className={`px-2 py-1 text-sm rounded-full ${
                note.priority === 0
                  ? "bg-gray-500/20 text-gray-300"
                  : note.priority === 1
                  ? "bg-orange-500/20 text-orange-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {note.priority === 0
                ? "Baja"
                : note.priority === 1
                ? "Media"
                : "Alta"}
            </span>
            <span className="px-2 py-1 text-sm rounded-full bg-neutral-500/20 text-neutral-300">
              {note.isShared ? "Público" : "Privado"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
