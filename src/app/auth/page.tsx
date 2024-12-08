"use client";

import { signIn } from "next-auth/react";

function AuthPage() {
  return (
    <div>
      <h1>Iniciar sesión con GitHub</h1>
      <button
        onClick={() =>
          signIn("github", { callbackUrl: "/app", redirect: false })
        }
        className="font-medium text-red-500 underline"
      >
        Iniciar sesión
      </button>
    </div>
  );
}

export default AuthPage;
