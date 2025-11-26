"use client";
import React, { useCallback, useEffect, useState } from "react";
import Heading2 from "../UI/Heading2";
import { ArrowUpRight, X } from "lucide-react";

export default function FeatureSection({
  heading,
  subheading,
  items,
  backgroundImage,
}: any) {
  const [openItem, setOpenItem] = useState<any | null>(null);
  useEffect(() => {
    const original = document.body.style.overflow;
    if (openItem) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [openItem]);
  return (
    <div className="relative w-full">
      {/* Background image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center brightness-50"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="container relative z-10 py-8 sm:py-12">
        <Heading2 className="text-secondary">{heading}</Heading2>
        <p className=" mb-20 text-white">{subheading}</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 ">
          {items.map((item: any) => (
            <FeatureCard title={item.name.value} key={item.system.id}  onClick={() => setOpenItem(item)}/>
          ))}
        </div>

        <Modal
          open={!!openItem}
          title={openItem?.name.value ?? ""}
          html={openItem?.content?.value ?? ""}
          onClose={() => setOpenItem(null)}
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, onClick }: { title: string, onClick: () => void; }) {
  const CARD_PATH =
    "M1 98.5001V18.5001V10.0001C1 5.02953 5.02944 1.00009 10 1.00009L243.16 1C248.131 1 251.971 5.023 251.856 9.99223C251.548 23.2995 253.529 40.4663 280.619 37.3272C286.452 36.6512 292 40.8598 292 46.7317V98.5001C292 103.471 287.971 107.5 283 107.5H10C5.02944 107.5 1 103.471 1 98.5001Z";

  return (
    <div
      onClick={onClick}  aria-label={`${title} – open details`} className="relative hover-lift group w-full aspect-[293/108] max-w-[360px] mx-auto cursor-pointer">
      {/* SVG fills the box */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 293 108"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <g filter="url(#filter0_i_626_97)">
          <path d={CARD_PATH} fill="black" fillOpacity="0.6" />
        </g>
        <path d={CARD_PATH} stroke="#25B3AD" strokeWidth="0.2" />
        <defs>
          <filter
            id="filter0_i_626_97"
            x="0.9"
            y="0.9"
            width="291.2"
            height="106.7"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="3.4" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.145098 0 0 0 0 0.701961 0 0 0 0 0.678431 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_626_97"
            />
          </filter>
        </defs>
      </svg>

      {/* Overlay uses the SAME box */}
      <div className="absolute inset-0 px-5 sm:px-6 py-4 sm:py-5 text-white ">
        <h4 className="text-sm sm:text-base font-semibold leading-tight">
          {title}
        </h4>
      </div>

      {/* Arrow badge anchors to the SAME box */}
      <div className="absolute -top-3 -right-3 bg-[#25B3AD] group-hover:bg-primary rounded-full p-2 shadow-xl transition-transform duration-300 group-hover:scale-110">
        <ArrowUpRight size={18} className="text-white" />
      </div>
    </div>
  );
}

function Modal({
  open,
  title,
  html,
  onClose,
}: {
  open: boolean;
  title: string;
  html: string; // HTML string
  onClose: () => void;
}) {
  const stop = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Details"}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Card */}
      <div
        className="relative z-10 w-[92%] max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl bg-secondary p-5 text-white shadow-2xl"
        onClick={stop}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Title (optional) */}
        {title ? (
          <h3 className="text-lg font-semibold pr-10 mb-3">{title}</h3>
        ) : null}

        {/* Rich text content */}
        <div
          className="prose text-white max-w-none [&>*:first-child]:mt-0"
          dangerouslySetInnerHTML={{ __html: html || "<p>No content.</p>" }}
        />
      </div>
    </div>
  );
}
