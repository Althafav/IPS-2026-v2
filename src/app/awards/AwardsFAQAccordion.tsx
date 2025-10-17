"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";

type AccordionProps = {
  pageData: any | null;
};

export default function AwardsFAQAccordion({ pageData }: AccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const items: any[] = pageData?.faqitems?.value || [];

  if (!items.length) return null;

  return (
    <div className="awardAccordion-wrapper">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">
          {pageData?.faqheading?.value}
        </h2>

        <div className="divide-y divide-white/10 rounded-2xl border border-black bg-white/5 backdrop-blur">
          {items.map((raw: any, idx: number) => {
            const item = raw as any;
            const id = item?.system?.id ?? `faq_${idx}`;
            const open = activeId === id;

            return (
              <AccordionRow
                key={id}
                id={id}
                index={idx}
                open={open}
                title={item?.name?.value}
                html={item?.content?.value}
                onToggle={() => toggle(id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* --- Row (kept separate to keep logic tidy) --- */
function AccordionRow({
  id,
  index,
  open,
  title,
  html,
  onToggle,
}: {
  id: string;
  index: number;
  open: boolean;
  title: string;
  html: string;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // For smooth height animation without extra libs
  const maxHeight = open ? `${panelRef.current?.scrollHeight ?? 0}px` : "0px";

  return (
    <div className="group ">
      {/* Header button */}
      <button
        type="button"
        className="w-full text-left px-4 sm:px-6 py-4 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        aria-expanded={open}
        aria-controls={`panel-${id}`}
        id={`control-${id}`}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <span className="text-base sm:text-lg font-semibold leading-snug">
          {title}
        </span>

        {/* Chevron */}
        <span
          className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-secondary transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden
        >
          {/* simple chevron icon */}
          <svg
            viewBox="0 0 20 20"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 8l4 4 4-4" />
          </svg>
        </span>
      </button>

      {/* Panel */}
      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`control-${id}`}
        ref={panelRef}
        style={{ maxHeight }}
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out border-b border-black`}
      >
        <div className="px-4 sm:px-6 pb-5 pt-1">
          <div
            className="prose  max-w-none text-sm sm:text-base"
            // keep your HTML (links, lists) intact
            dangerouslySetInnerHTML={{ __html: html || "" }}
          />
        </div>
      </div>
    </div>
  );
}
