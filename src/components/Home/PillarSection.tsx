"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Section from "../UI/Section";
import Heading2 from "../UI/Heading2";

/**
 * Minimal looping slider (Embla)
 * - Autoplay ON
 * - Pause on hover
 * - Looping
 * - No controls, no dots, no extra props
 *
 * Install once:
 *   npm i embla-carousel-react embla-carousel-autoplay
 */

export default function PillarSection({
  heading,
  subheading,
  items,
}: {
  heading?: string;
  subheading?: string;
  items: any[]; // expects Kontent items with image.value[0].url
}) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({
      delay: 3000, // change this number if you want a different speed
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ]);

  return (
    <Section>
      {(heading || subheading) && (
        <div className="container mx-auto mb-6 px-4">
          {heading && <Heading2>{heading}</Heading2>}
          {subheading && (
            <p className="text-gray-600 mt-2 max-w-3xl">{subheading}</p>
          )}
        </div>
      )}

      <div className="">
        {/* Viewport */}
        <div
          className="overflow-hidden "
          ref={emblaRef}
          aria-roledescription="carousel"
        >
          {/* Track */}
          <div className="flex touch-pan-y">
            {items.map((item: any) => (
              <div
                key={item?.system?.id ?? Math.random().toString(36)}
                className="min-w-0 shrink-0 grow-0 basis-[80%] sm:basis-1/2 lg:basis-1/3 xl:basis-[417px] p-2"
              >
                <div className="group relative aspect-square overflow-hidden ">
                  <img
                    src={item?.image?.value?.[0]?.url ?? ""}
                    alt={item?.name?.value ?? ""}
                    className="h-full w-full object-cover brightness-50 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-center transition-all duration-500">
                    <h3 className="text-3xl text-white font-semibold">
                      {item.name.value}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
