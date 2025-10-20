import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import React from "react";
import PhotoGallery from "./PhotoGallery";

export default async function Page() {
  const response = await Globals.KontentClient.item("photo_gallery")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));

  const years: any[] = (pageData?.items?.value ?? []).map((y: any) => ({
    id: y?.system?.id,
    label: String(y?.year?.value ?? ""),
    images: (y?.images?.value ?? []).map((img: any) => ({
      url: img?.url ?? "",
      alt: img?.name ?? "",
    })),
  }));

  // Optionally sort by year (desc). Remove if you prefer original order.
  years.sort((a, b) => Number(b.label) - Number(a.label));

  return (
    <div>
      {/* Banner */}
      <div className="relative h-[350px] flex items-end py-8 sm:py-12">
        <img
          src={pageData?.bannerimage?.value?.[0]?.url ?? ""}
          alt={pageData?.heading?.value ?? "Photo Gallery"}
          className="w-full absolute inset-0 h-full object-cover object-top brightness-25"
        />
        <div className="container mx-auto">
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center text-white">
              {pageData?.heading?.value ?? "Photo Gallery"}
            </h1>
          </div>
        </div>
      </div>

      {/* Year Pills + Images */}
      <Section>
        <div className="container mx-auto">
          <PhotoGallery years={years} />
        </div>
      </Section>
    </div>
  );
}

export const revalidate = 60; 