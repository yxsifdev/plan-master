"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      onClick={async () => await signOut()}
      className="px-4 py-2 text-sm font-medium transition-colors rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
    >
      Cerrar sesión
    </button>
  );
}
