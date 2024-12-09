"use client";

import React from "react";
import AppSection from "./Section";
import PlusIcon from "@/icons/Plus";
import SearchIcon from "@/icons/Search";
import AppNewNote from "./forms/NewNote";
import { useState } from "react";
import { NotesProps } from "@/types/notes";
import axios from "axios";

export default function AppActions({
  actionSelect,
  selectedCards,
}: {
  actionSelect: (status: boolean) => void;
  selectedCards: NotesProps[];
}) {
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [selectStatus, setSelectStatus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(
    "🤖 Es un gusto tenerte por aquí."
  );

  const handleCreateNote = (note: { title: string; content: string }) => {
    console.log("Nueva nota:", note);
  };

  const handleSelectStatus = () => {
    actionSelect(!selectStatus);
    setSelectStatus(!selectStatus);
  };

  const deleteCards = async () => {
    if (selectedCards.length === 0) return;

    try {
      const response = await axios.delete("/api/notes", {
        data: {
          ids: selectedCards.map((card) => card.id),
        },
      });
      console.log(response);

      setSelectStatus(false);
      actionSelect(false);
      setMessage("🔔 Notas eliminadas correctamente");
      setTimeout(() => {
        setMessage("🤖 Es un gusto tenerte por aquí.");
      }, 3000);
    } catch (error) {
      console.error("Error al eliminar las notas:", error);
      setMessage("🔔 Hubo un error al eliminar las notas");
      setTimeout(() => {
        setMessage("🤖 Es un gusto tenerte por aquí.");
      }, 3000);
    }
  };

  return (
    <>
      <AppSection className="hidden border-b md:flex justify-between items-center border-neutral-800">
        {message && <p className="text-sm text-neutral-500">{message}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowNewNoteForm(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md gap-x-1 bg-neutral-800 hover:bg-emerald-500/50 text-neutral-500 hover:text-emerald-100 group"
          >
            <PlusIcon className="transition-transform duration-300 group-hover:rotate-180" />
            Nuevo
          </button>
          <button
            onClick={handleSelectStatus}
            className={`${
              selectStatus
                ? "bg-blue-500/50 text-blue-100"
                : "hover:text-blue-100 hover:bg-blue-500/50"
            } px-4 py-2 text-sm font-medium transition-colors rounded-md bg-neutral-800 text-neutral-500`}
          >
            {selectStatus ? "Cancelar selección" : "Seleccionar"}
          </button>
          <button className="px-4 py-2 text-sm font-medium transition-colors rounded-md bg-neutral-800 hover:bg-indigo-500/50 text-neutral-500 hover:text-indigo-100">
            Editar
          </button>
          <button
            onClick={() => deleteCards()}
            className="px-4 py-2 text-sm font-medium transition-colors rounded-md bg-neutral-800 hover:bg-red-500/50 text-neutral-500 hover:text-red-100"
          >
            Eliminar
          </button>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md gap-x-1 bg-neutral-800 hover:bg-yellow-500/50 text-neutral-500 hover:text-yellow-100">
            <SearchIcon /> Buscar
          </button>
        </div>
      </AppSection>

      {showNewNoteForm && (
        <AppNewNote
          onClose={() => setShowNewNoteForm(false)}
          onSubmit={handleCreateNote}
        />
      )}
    </>
  );
}
