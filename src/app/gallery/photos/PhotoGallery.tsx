"use client";

import Image from "next/image";
import React, { useState } from "react";

type YearGroup = {
  id: string;
  label: string; // year text
  images: { url: string; alt: string }[];
};

export default function PhotoGallery({ years }: { years: YearGroup[] }) {
  // Show first item initially (or nothing if empty)
  const [activeIndex, setActiveIndex] = useState(0);

  const active = years?.[activeIndex];

  // Build a compact pill UI
  return (
    <div className="w-full">
      {/* Pills */}
      <div
        role="tablist"
        aria-label="Filter by year"
        className="flex flex-wrap gap-2 sm:gap-3 mb-6 justify-center"
      >
        {years?.map((y, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={y.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              className={[
                "px-4 py-2 rounded-full text-sm sm:text-base border transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                isActive
                  ? "bg-secondary text-white border-secondary"
                  : "bg-white/90 text-gray-800 border-gray-300 hover:bg-gray-100",
              ].join(" ")}
            >
              {y.label}
            </button>
          );
        })}
      </div>

      {/* Label row (optional) */}
      {active?.label ? (
        <div className="mb-4">
          <p className="text-lg font-semibold">
            {active.label}
            <span className="ml-2 text-sm text-gray-500">
              ({active?.images?.length ?? 0} photos)
            </span>
          </p>
        </div>
      ) : null}

      {/* Images Grid */}
      {active?.images?.length ? (
        <div
          role="tabpanel"
          aria-label={`Images from ${active.label}`}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {active.images.map((img, i) => (
            <div key={`${img.url}-${i}`} className="relative">
              <Image
                width={1920}
                height={720}
                src={img.url}
                alt={img.alt || `Image ${i + 1} - ${active.label}`}
                loading="lazy"
                className="w-full h-[150px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          role="tabpanel"
          className="rounded-xl border border-dashed p-6 text-center text-gray-500"
        >
          No images available for {active?.label ?? "this year"}.
        </div>
      )}
    </div>
  );
}
