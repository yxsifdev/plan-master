import React from "react";

export default function AppCards() {
  return (
    <div className="flex flex-col justify-between p-4 transition-colors border-2 rounded-md cursor-pointer gap-y-2 bg-neutral-800/50 hover:bg-neutral-800/70 border-neutral-800">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-wrap items-center justify-between">
          <a href="/" target="_blank" className="font-bold hover:underline">
            Título #1
          </a>
          <p className="text-xs text-neutral-500">2024-12-08</p>
        </div>
        <p className="text-sm text-neutral-500">
          Esto es un contenido de ejemplo para probar el diseño
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        <span className="px-1.5 text-xs border rounded-full border-neutral-700 bg-neutral-800 text-neutral-500">
          Target
        </span>
      </div>
    </div>
  );
}
