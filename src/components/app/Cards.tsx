"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { NotesProps } from "@/types/notes";
import NoteModal from "./NoteModal";
import ArrowRightIcon from "@/icons/ArrowRight";

export default function AppCards({
  actionSelect,
  getCardsSelected,
}: {
  actionSelect: boolean;
  getCardsSelected: (cards: NotesProps[]) => void;
}) {
  const [data, setNotes] = useState<NotesProps[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<NotesProps | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<NotesProps[]>([]);

  useEffect(() => {
    axios
      .get("/api/notes")
      .then((response) => {
        setNotes(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Error al cargar las notas");
        setLoading(false);
      });
  }, []);

  const handleNoteClick = (note: NotesProps) => {
    if (actionSelect) {
      const isAlreadySelected = selectedNotes.some(
        (selectedNote) => selectedNote.id === note.id
      );

      const updatedSelectedNotes = isAlreadySelected
        ? selectedNotes.filter((selectedNote) => selectedNote.id !== note.id)
        : [...selectedNotes, note];

      setSelectedNotes(updatedSelectedNotes);
      getCardsSelected(updatedSelectedNotes);
    } else {
      setSelectedNote(note);
    }
  };

  if (isLoading) return <p className="text-neutral-500">Cargando...</p>;
  if (error) return <p className="text-neutral-500">Error: {error}</p>;
  if (data.length === 0)
    return <p className="text-neutral-500">🌚 Que vacío está aquí...</p>;
  return (
    <>
      {data.map((note) => {
        return (
          <div
            key={note.id}
            onClick={() => handleNoteClick(note)}
            className={`flex flex-col justify-between p-4 transition-all border-2 rounded-md gap-y-2 bg-neutral-800/50 cursor-pointer hover:bg-neutral-800/70 ${
              actionSelect &&
              selectedNotes.some((selectedNote) => selectedNote.id === note.id)
                ? "border-blue-500 bg-blue-500/10"
                : "border-neutral-800"
            }`}
          >
            <div className="flex flex-col gap-y-2 break-words overflow-x-hidden">
              <div className="flex flex-wrap items-center justify-between">
                {note.url ? (
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="font-bold">{note.title}</span>
                    <ArrowRightIcon className="-rotate-45 text-neutral-500" />
                  </div>
                ) : (
                  <span className="font-bold">{note.title}</span>
                )}
                <p className="text-xs text-neutral-500">
                  {new Date(note.createdAt).toLocaleDateString("es", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(note.createdAt).toLocaleTimeString("es", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              <p className="text-sm text-neutral-500">{note.content}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-auto  overflow-x-hidden">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
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
                className={`px-2 py-1 text-xs rounded-full ${
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
              <span className="px-2 py-1 text-xs rounded-full bg-neutral-500/20 text-neutral-300">
                {note.isShared ? "Público" : "Privado"}
              </span>
            </div>
          </div>
        );
      })}

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          isOpen={!!selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}

      {actionSelect && (
        <span className="absolute bottom-0 right-0 mr-[50px] mb-5 border border-neutral-700 bg-neutral-800 p-2 rounded-md text-neutral-500 font-medium">
          {selectedNotes.length} notas seleccionadas
        </span>
      )}
    </>
  );
}
