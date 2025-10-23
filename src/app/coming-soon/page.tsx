import Section from "@/components/UI/Section";
import Link from "next/link";
import React from "react";
import { Mail, ArrowLeft } from "lucide-react";
import TopSpacer from "@/components/Blocks/TopSpacer";

export default function Page() {
  return (
    <>
      <TopSpacer color="black" />
      <div className="relative  ">
        <Section>
          <div className="container mx-auto px-4">
            {/* Hero */}
            <div className="mx-auto max-w-3xl text-center py-20 flex justify-center items-center">
              <h1 className="text-3xl sm:text-5xl">Coming Soon</h1>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
