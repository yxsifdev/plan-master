"use client";

import React from "react";
import AppSection from "./Section";
import PlusIcon from "@/icons/Plus";
import SearchIcon from "@/icons/Search";
import AppNewNote from "./forms/NewNote";
import { useState } from "react";

export default function AppActions() {
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);

  const handleCreateNote = (note: { title: string; content: string }) => {
    console.log("Nueva nota:", note);
  };

  return (
    <>
      <AppSection className="hidden border-b md:block border-neutral-800">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowNewNoteForm(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md gap-x-1 bg-neutral-800 hover:bg-emerald-500/50 text-neutral-500 hover:text-emerald-100 group"
          >
            <PlusIcon className="transition-transform duration-300 group-hover:rotate-180" />
            Nuevo
          </button>
          <button className="px-4 py-2 text-sm font-medium transition-colors rounded-md bg-neutral-800 hover:bg-blue-500/50 text-neutral-500 hover:text-blue-100">
            Seleccionar
          </button>
          <button className="px-4 py-2 text-sm font-medium transition-colors rounded-md bg-neutral-800 hover:bg-indigo-500/50 text-neutral-500 hover:text-indigo-100">
            Editar
          </button>
          <button className="px-4 py-2 text-sm font-medium transition-colors rounded-md bg-neutral-800 hover:bg-red-500/50 text-neutral-500 hover:text-red-100">
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
