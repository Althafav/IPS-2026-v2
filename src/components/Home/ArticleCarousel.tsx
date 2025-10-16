"use client";
import Globals from "@/modules/Globals";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import Heading2 from "../UI/Heading2";

import { MoveLeft, MoveRight } from "lucide-react";

export default function ArticleCarousel({ codename, colorCode, href }: any) {
  const [pageData, setPageData] = useState<any | null>(null);
 
  useEffect(() => {
    const sub = Globals.KontentClient.item(codename)
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((res: any) => setPageData(res.item));
    return () => sub.unsubscribe?.();
  }, [codename]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [
      Autoplay({
        delay: 3000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  if (!pageData) return null;

  const blogs = pageData.blogitems.value;

  return (
    <div className="bg-black py-8 sm:py-12">
      <div className="container mx-auto">
        <Heading2 className="text-center mb-10 text-white">
         {pageData.bannerheading.value}
        </Heading2>
      </div>
      <div
        className="overflow-hidden"
        ref={emblaRef}
        aria-roledescription="carousel"
      >
        {/* Track */}
        <div className="flex touch-pan-y -mx-2">
          {blogs.map((blog: any) => (
            <Link
            href={`${href}/${blog.slug.value}`}
              key={blog.system.id}
              className="
                px-2
                shrink-0
                 flex-[0_0_calc(100%)]
         sm:flex-[0_0_calc(100%/2)]
         
               
              "
            >
              <div className="grid grid-cols-2 h-full">
                <Image
                  width={320}
                  height={180}
                  src={blog.image.value[0]?.url}
                  alt={blog.heading.value}
                  className="w-full h-full  object-cover aspect-square "
                />
                <div
                style={{backgroundColor: colorCode}}
                  className={` h-full p-10 flex flex-col justify-between`}
                >
                  <h2 className="sm:text-lg font-semibold mb-2 text-white">
                    {blog.heading.value}
                  </h2>

                  <div className="flex justify-end ">
                    <MoveRight
                      className="rounded-full bg-white p-2"
                      size={32}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="container mx-auto">
        <div className="flex justify-end">
          <div className="mt-4 flex items-center  gap-4">
            <button
              onClick={scrollPrev}
              className="pointer-events-auto bg-white hover:bg-white rounded-full p-2 transition-all"
            >
              <MoveLeft />
            </button>
            <button
              onClick={scrollNext}
              className="pointer-events-auto bg-white hover:bg-white rounded-full p-2 transition-all"
            >
              <MoveRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
