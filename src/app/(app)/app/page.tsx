import { getServerSession } from "next-auth";

export default async function AppPage() {
  const session = await getServerSession();
  if (!session) {
    return <div>No estás autenticado</div>;
  }
  return (
    <div>
      <h1>Bienvenido {session?.user?.name}</h1>
      <img
        src={session?.user?.image as string}
        alt="img"
        className="size-16 rounded-lg"
      />
    </div>
  );
}
