import React, { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function Section({
  children,
  className = "",
  id = "",
}: SectionProps) {
  return (
    <section className={`my-8 sm:my-12 ${className}`} id={id}>
      {children}
    </section>
  );
}
