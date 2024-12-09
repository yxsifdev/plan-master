import AppHeader from "@/components/app/Header";
import AppMainActions from "@/components/app/MainActions";
import { getServerSession } from "next-auth";

export default async function AppPage() {
  const session = await getServerSession();
  if (!session) {
    return <div>No estás autenticado</div>;
  }
  return (
    <>
      <AppHeader
        avatar={session?.user?.image as string}
        name={session?.user?.name as string}
      />

      <AppMainActions />
    </>
  );
}
