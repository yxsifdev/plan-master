import Link from "next/link";

const links = [
  {
    label: "Incio",
    href: "/",
  },
  {
    label: "Archivados",
    href: "/app/archived",
  },
  {
    label: "Configuración",
    href: "/app/settings",
  },
] as const;

export default function AppNavigation() {
  return (
    <nav className="flex flex-col gap-y-1">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="px-3 py-1.5 text-sm font-medium transition-colors rounded-md hover:bg-neutral-700 text-neutral-500 hover:text-neutral-100"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
