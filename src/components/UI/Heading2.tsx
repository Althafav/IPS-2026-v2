import React from "react";
import SplitText from "../Animated/SplitText";

export default function Heading2({ children, className }: any) {
  return (
    <SplitText
      text={children}
      as="h2"
      className={`text-3xl md:text-4xl font-semibold tracking-tight mb-3 ${className}`}
    />
  );
}
