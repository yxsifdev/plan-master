"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

import GitHubIcon from "@/icons/GitHub";
import Preloader from "@/icons/Preloader";
import Link from "next/link";
import ArrowRightIcon from "@/icons/ArrowRight";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  if (session) {
    return (
      <Link
        href="/app"
        className="bg-black text-white inline-flex items-center justify-center py-2.5 px-4 rounded-md font-medium text-sm hover:bg-black/80"
      >
        <div className="flex items-center">
          <ArrowRightIcon className="w-4 h-4 mr-4" />
          Dashboard
        </div>
      </Link>
    );
  }

  if (isLoading) {
    return (
      <button
        disabled
        className="bg-black text-white inline-flex items-center justify-center py-2.5 px-4 rounded-md font-medium text-sm"
      >
        <div className="flex items-center">
          <Preloader className="w-4 h-4 mr-4" />
          Comprobando sesión...
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        setIsLoading(true);
        signIn("github", { callbackUrl: "/app", redirect: false });
      }}
      className="bg-black text-white inline-flex items-center justify-center py-2.5 px-4 rounded-md font-medium text-sm hover:bg-black/80"
    >
      <div className="flex items-center">
        <GitHubIcon className="w-4 h-4 mr-4" />
        Iniciar sesión con GitHub
      </div>
    </button>
  );
}
