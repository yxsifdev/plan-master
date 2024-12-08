import ArrowRightIcon from "@/icons/ArrowRight";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function HeaderComponent() {
  const session = await getServerSession();
  return (
    <header className="flex items-center justify-between px-2 py-4 mx-auto my-0 2xl:px-0 max-w-9xl">
      <div className="flex items-center gap-x-5">
        <div>
          <h1 className="text-3xl font-bold">LOGO</h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-4">
            <li>
              <Link
                href="/"
                className="text-lg transition-colors border-b border-transparent hover:border-neutral-100 text-neutral-500 hover:text-neutral-100"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-lg transition-colors border-b border-transparent hover:border-neutral-100 text-neutral-500 hover:text-neutral-100"
              >
                Comunidad
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-lg transition-colors border-b border-transparent hover:border-neutral-100 text-neutral-500 hover:text-neutral-100"
              >
                GitHub
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-x-4">
        {session ? (
          <>
            <Link
              href="/app"
              className="inline-flex items-center px-4 py-2 font-medium transition-colors duration-300 border rounded-md gap-x-2 hover:bg-neutral-100 hover:text-neutral-900 group"
            >
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
              Comenzar
            </Link>
            <Image
              src={session?.user?.image as string}
              alt="userAvatar"
              width={40}
              height={40}
              className="min-w-[40px] rounded-md min-h-[40px]"
            />
          </>
        ) : (
          <>
            <Link
              href="/auth"
              className="px-4 py-2 font-medium transition-colors duration-300 border rounded-md hover:bg-neutral-100 hover:text-neutral-900"
            >
              Iniciar sesión
            </Link>
            <Link
              href="https://discord.com"
              target="_blank"
              className="px-4 py-2 font-medium transition-colors duration-300 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
            >
              Discord
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
