"use client";

import AppActions from "@/components/app/Actions";
import AppCards from "@/components/app/Cards";
import AppNavigation from "@/components/app/Navigation";
import AppSection from "@/components/app/Section";

import CalendarIcon from "@/icons/Calendar";
import { NotesProps } from "@/types/notes";
import { useState } from "react";

export default function AppMainActions() {
  const [selectStatus, setSelectStatus] = useState<boolean>(false);
  const [cardsSelected, setCardsSelected] = useState<NotesProps[]>([]);

  const handleSelectStatus = () => {
    setSelectStatus(!selectStatus);
  };

  const handleCardsSelected = (cards: NotesProps[]) => {
    setCardsSelected(cards);
    console.log(cardsSelected);
  };

  return (
    <>
      <AppActions
        actionSelect={handleSelectStatus}
        selectedCards={cardsSelected}
      />
      <main className="flex h-[calc(100vh-60px)] md:h-[calc(100vh-108px)]">
        <AppSection className="hidden md:block border-r border-neutral-800 min-w-[200px] sticky top-0">
          <AppNavigation />
        </AppSection>
        <AppSection className="flex flex-col flex-1">
          <h2 className="inline-flex items-center mb-4 font-medium gap-x-2 text-neutral-300">
            <CalendarIcon className="size-5 text-neutral-500" /> Agenda 2024
          </h2>
          <div className="grid grid-cols-1 gap-4 pr-4 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4">
            <AppCards
              actionSelect={selectStatus}
              getCardsSelected={handleCardsSelected}
            />
          </div>
        </AppSection>
      </main>
    </>
  );
}
