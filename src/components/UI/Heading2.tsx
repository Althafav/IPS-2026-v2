import React from "react";

export default function Heading2({ children, className }: any) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-semibold tracking-tight mb-3 ${className}`}
    >
      {children}
    </h2>
  );
}
