import React, { useState } from "react";
import axios from "axios";

// Definimos la interfaz para las props
interface AppNewNoteProps {
  onClose: () => void; // Función para cerrar el formulario
  onSubmit: (note: {
    title: string;
    content: string;
    url?: string;
    status: "ACTIVE" | "PROGRESS" | "COMPLETED";
    isShared: boolean;
    priority: number;
    deadline?: Date;
    tags: { name: string; color: string }[];
  }) => void; // Función para manejar la creación
}

interface Tag {
  id?: number;
  name: string;
  color: string;
}

export default function AppNewNote({ onClose, onSubmit }: AppNewNoteProps) {
  // Estado local para los campos del formulario
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "PROGRESS" | "COMPLETED">(
    "ACTIVE"
  );
  const [priority, setPriority] = useState(0);
  const [deadline, setDeadline] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#000000");

  // Manejador del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/notes", {
        title,
        content,
        url: url || undefined,
        status,
        isShared: false,
        priority,
        deadline: deadline ? new Date(deadline) : undefined,
        tags,
      });

      onSubmit(response.data);
      onClose();
    } catch (error) {
      console.error("Error al crear la nota:", error);
      alert("Hubo un error al crear la nota");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTagName.trim()) {
      setTags([...tags, { name: newTagName, color: newTagColor }]);
      setNewTagName("");
      setNewTagColor("#000000");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-6 rounded-lg bg-neutral-900">
        <h2 className="mb-4 text-xl font-bold text-neutral-100">Nueva Nota</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-1 text-sm text-neutral-300"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-neutral-800 text-neutral-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block mb-1 text-sm text-neutral-300"
            >
              Contenido
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 px-3 py-2 rounded-md bg-neutral-800 text-neutral-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="url"
              className="block mb-1 text-sm text-neutral-300"
            >
              URL (opcional)
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-neutral-800 text-neutral-100"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block mb-1 text-sm text-neutral-300"
            >
              Estado
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "ACTIVE" | "PROGRESS" | "COMPLETED")
              }
              className="w-full px-3 py-2 rounded-md bg-neutral-800 text-neutral-100"
            >
              <option value="ACTIVE">Activo</option>
              <option value="PROGRESS">En Progreso</option>
              <option value="COMPLETED">Completado</option>
            </select>
          </div>

          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="isShared"
              checked={false}
              disabled={true}
              className="mr-2 opacity-50 cursor-not-allowed"
            />
            <label
              htmlFor="isShared"
              className="text-sm opacity-50 text-neutral-300"
            >
              Compartir nota
            </label>
            <span className="absolute right-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              No disponible
            </span>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block mb-1 text-sm text-neutral-300"
            >
              Prioridad
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-md bg-neutral-800 text-neutral-100"
            >
              <option value="0">Baja</option>
              <option value="1">Media</option>
              <option value="2">Alta</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="deadline"
              className="block mb-1 text-sm text-neutral-300"
            >
              Fecha límite (opcional)
            </label>
            <input
              type="datetime-local"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-neutral-800 text-neutral-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block mb-1 text-sm text-neutral-300">
              Etiquetas
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 text-sm rounded-full"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                  }}
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="text-xs hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Nombre de la etiqueta"
                className="flex-1 px-3 py-2 rounded-md bg-neutral-800 text-neutral-100"
              />
              <input
                type="color"
                value={newTagColor}
                onChange={(e) => setNewTagColor(e.target.value)}
                className="w-10 h-10 p-1 rounded-md bg-neutral-800"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-500"
              >
                Agregar
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-md bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed"
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
