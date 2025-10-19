import Link from "next/link";
import React from "react";

export default function CTAButton({ buttonname, buttonlink }: any) {
  return (
    <Link
      href={buttonlink || "#"}
      className="px-6 py-3 bg-primary hover:bg-primaryDark text-white font-semibold rounded-full transition"
    >
      {buttonname}
    </Link>
  );
}
