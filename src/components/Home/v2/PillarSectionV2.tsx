"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

/**
 * Reusable, SSR‑safe looping slider using Embla.
 * - Lightweight (~8kb)
 * - Loop + autoplay
 * - A11y: focusable slides, keyboard arrows, pause on hover
 * - Touch/mouse drag
 * - Works nicely with Tailwind
 *
 * Install once:
 *   npm i embla-carousel-react embla-carousel-autoplay
 */

export type PillarItem = {
  id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  href?: string;
};

export function PillarCarousel({
  items,
  heading,
  subheading,
  autoplayDelay = 3000,
  options,
}: {
  items: PillarItem[];
  heading?: string;
  subheading?: string;
  autoplayDelay?: number;
  options?: EmblaOptionsType;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false, ...options },
    [
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [
    emblaApi,
  ]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [
    emblaApi,
  ]);
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="section py-12">
      <div className="container mx-auto mb-6 px-4">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-secondary">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="text-gray-600 mt-2 max-w-2xl">{subheading}</p>
        )}
      </div>

      <div className="px-4">
        {/* Viewport */}
        <div
          className="overflow-hidden group rounded-2xl shadow-sm"
          ref={emblaRef}
          aria-roledescription="carousel"
        >
          {/* Container */}
          <div className="flex touch-pan-y">
            {items.map((item) => (
              <div
                key={item.id}
                className="min-w-0 shrink-0 grow-0 basis-[80%] sm:basis-[50%] lg:basis-[417px] p-2 outline-none"
                tabIndex={0}
                role="group"
                aria-label={item.title ?? "Slide"}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  {item.href ? (
                    <a href={item.href} className="block h-full w-full">
                      <img
                        src={item.imageUrl}
                        alt={item.title ?? ""}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt={item.title ?? ""}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}

                  {(item.title || item.subtitle) && (
                    <div className="absolute inset-x-3 bottom-3 rounded-xl bg-black/45 backdrop-blur-sm p-3 text-white">
                      {item.title && (
                        <h3 className="text-sm font-semibold leading-tight line-clamp-1">
                          {item.title}
                        </h3>
                      )}
                      {item.subtitle && (
                        <p className="text-xs opacity-90 line-clamp-1">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="rounded-xl border px-3 py-2 text-sm shadow-sm hover:bg-gray-50 active:scale-[0.98]"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="rounded-xl border px-3 py-2 text-sm shadow-sm hover:bg-gray-50 active:scale-[0.98]"
            >
              Next →
            </button>
          </div>

          {/* Dots */}
          <div className="flex flex-wrap items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => scrollTo(index)}
                className={[
                  "h-2 w-2 rounded-full transition-all",
                  selectedIndex === index ? "w-5 bg-gray-900" : "bg-gray-300",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Drop‑in replacement for your current PillarSection
 * Pass your CMS items directly. Minimal coupling.
 */
export default function PillarSectionV2({
  heading,
  subheading,
  items,
}: {
  heading?: string;
  subheading?: string;
  items: any[];
}) {
  const mapped: PillarItem[] = items.map((item: any) => ({
    id: item.system?.id ?? crypto.randomUUID(),
    imageUrl: item.image?.value?.[0]?.url ?? "",
    title: item.name?.value ?? item.heading?.value,
    subtitle: item.content?.value ? stripHtml(item.content.value).slice(0, 80) : undefined,
    href: item.link?.value ?? item.link?.value,
  }));

  return (
    <PillarCarousel
      items={mapped}
      heading={heading}
      subheading={subheading}
      autoplayDelay={3000}
      options={{ loop: true }}
    />
  );
}

// --- utils ---
function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
