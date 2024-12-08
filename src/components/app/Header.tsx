import { UserProps } from "@/consts/consts";
import SignOut from "../auth/SignOut";

export default function AppHeader({ avatar, name }: UserProps) {
  return (
    <header className="flex items-center justify-end px-4 py-2 border-b md:justify-between border-neutral-800">
      <div className="items-center hidden md:flex gap-x-4">
        <h1 className="text-2xl font-bold">LOGO</h1>
        <span className="px-2 text-xs font-medium border rounded-full cursor-pointer border-neutral-700 bg-neutral-800 text-neutral-500">
          v0.1.0
        </span>
      </div>
      <div className="flex items-center gap-x-4">
        <p className="pr-4 text-sm font-medium border-r-2 text-neutral-500 border-neutral-700">
          {`${"@" + name}` || "@unknown"}
        </p>
        <SignOut />
        <img
          src={avatar || ""}
          alt="imgAvatar"
          width={35}
          height={35}
          className="rounded min-w-[35px] min-h-[35px]"
        />
      </div>
    </header>
  );
}
