"use client";
import Globals from "@/modules/Globals";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import Heading2 from "../UI/Heading2";
import Section from "../UI/Section";

export default function PartnersCarousel() {
  const [pageData, setPageData] = useState<any | null>(null);

  useEffect(() => {
    const sub = Globals.KontentClient.item("partners_page")
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((res: any) => setPageData(res.item));
    return () => sub.unsubscribe?.();
  }, []);

  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({
      delay: 3000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ]);

  if (!pageData) return null;

  const partners = pageData.items.value.flatMap((g: any) => g.items.value);

  return (
    <Section>
      <div className="container mx-auto">
        <Heading2 className="text-center mb-5">Our Partners</Heading2>
      </div>
      <div
        className="overflow-hidden"
        ref={emblaRef}
        aria-roledescription="carousel"
      >
        {/* Track */}
        <div className="flex touch-pan-y -mx-2">
          {partners.map((partner: any) => (
            <div
              key={partner.system.id}
              className="
                px-2
                shrink-0
                flex-[0_0_calc(100%/2)]
                sm:flex-[0_0_calc(100%/3)]
                md:flex-[0_0_calc(100%/4)]
                lg:flex-[0_0_calc(100%/5)]
                xl:flex-[0_0_calc(100%/6)]
                2xl:flex-[0_0_calc(100%/7)]
              "
            >
              <div className="h-full bg-white rounded-2xl p-6 flex items-center justify-center relative">
                {partner.category.value[0] && (
                  <span className="absolute left-0 top-0 px-2 py-1 bg-primary-orange text-white rounded-tr-md rounded-bl-md text-xs">
                    {partner.category.value[0]?.name}
                  </span>
                )}
                <Link
                  href={partner.website.value || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Image
                    width={320}
                    height={180}
                    src={partner.logo.value[0]?.url}
                    alt={partner.name.value}
                    className="w-full h-20 md:h-24 object-contain"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
