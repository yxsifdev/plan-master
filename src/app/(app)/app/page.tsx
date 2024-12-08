import AppActions from "@/components/app/Actions";
import AppCards from "@/components/app/Cards";
import AppHeader from "@/components/app/Header";
import AppNavigation from "@/components/app/Navigation";
import AppSection from "@/components/app/Section";
import CalendarIcon from "@/icons/Calendar";
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
      <AppActions />
      <main className="flex h-[calc(100vh-120px)]">
        <AppSection className="hidden md:block border-r border-neutral-800 min-w-[200px] sticky top-0">
          <AppNavigation />
        </AppSection>
        <AppSection className="flex flex-col flex-1">
          <h2 className="inline-flex items-center mb-4 font-medium gap-x-2 text-neutral-300">
            <CalendarIcon className="size-5 text-neutral-500" /> Agenda 2024
          </h2>
          <div className="grid grid-cols-1 gap-4 pr-4 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <AppCards />
          </div>
        </AppSection>
      </main>
    </>
  );
}
