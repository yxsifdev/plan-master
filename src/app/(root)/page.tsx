import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Página de inicio</h1>
      <Link href="/app">Ir a la app</Link>
    </main>
  );
}
