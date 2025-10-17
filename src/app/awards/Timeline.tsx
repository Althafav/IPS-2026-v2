import Heading2 from "@/components/UI/Heading2";
import React from "react";

type TimelineProps = {
  heading?: string;
  items: any[];
  /** Desktop line Y offset in px (for horizontal mode) */
  y?: number;
};

export default function Timeline({ heading, items, y = 28 }: TimelineProps) {
  if (!items?.length) return null;

  return (
    <div>
      {heading && (
        <Heading2 className="text-white text-center mb-8">{heading}</Heading2>
      )}

      {/* DESKTOP: horizontal timeline */}
      <div
        className="relative hidden md:block"
        style={{ ["--y" as any]: `${y}px` }}
      >
        {/* horizontal line */}
        <div className="absolute left-5 right-5 top-[var(--y)] h-px bg-primary" />

        {/* columns */}
        <div className="flex">
          {items.map((item: any) => (
            <div key={item.system?.id ?? item.id ?? item.heading?.value} className="relative flex-1 px-2 text-center">
              {/* dot */}
              <span
                className="absolute top-[var(--y)] left-1/2 -translate-x-1/2 -translate-y-1/2 block w-3 h-3 rounded-full bg-primary"
                aria-hidden
              />
              {/* labels */}
              <div className="pt-10">
                <p className="text-sm lg:text-base font-semibold text-white leading-tight">
                  {item?.heading?.value}
                </p>
                <p className="text-xs lg:text-sm mt-1 text-primary">
                  {item?.content?.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE: vertical timeline (one item per row) */}
      <div className="relative md:hidden">
        {/* vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-primary" aria-hidden />

        <div className="space-y-6">
          {items.map((item: any, idx: number) => (
            <div key={item.system?.id ?? idx} className="relative pl-12">
              {/* dot on the line */}
              <span
                className="absolute left-[1.25rem] top-3 -translate-x-1/2 block w-3 h-3 rounded-full bg-primary"
                aria-hidden
              />

              {/* content */}
              <p className="text-sm font-semibold text-white leading-tight">
                {item?.heading?.value}
              </p>
              <p className="text-xs mt-1 text-primary">{item?.content?.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
