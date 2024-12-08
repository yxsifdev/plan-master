import React from "react";

export default function AppSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`${className} px-4 py-2`}>{children}</section>;
}
