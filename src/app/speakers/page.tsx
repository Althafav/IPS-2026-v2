import SpeakerCard from "@/components/SpeakerCard";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";

import React from "react";

export async function generateMetadata() {
  const response = await Globals.KontentClient.item("speakers_page_2025")
    .withParameter("depth", "2")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: `${Globals.BASE_URL}speakers`,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: `${Globals.BASE_URL}speakers`,
      siteName: Globals.SITE_NAME,
      images: [
        {
          url: `${Globals.BASE_URL}assets/logos/ips-logo-thumbnail.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      images: [`${Globals.BASE_URL}assets/logos/ips-logo-thumbnail.jpg`],
    },
  };
}

export default async function Page() {
  const response = await Globals.KontentClient.item("speakers_page_2025")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));

  let ApprovedSpeakers: any[] = [];

  try {
    const response = await fetch(
      `https://speakers.aimcongress.com/api/Website/GetApprovedSpeakers?eventid=6fb9b8ce-22cf-48ea-95c4-4d776e0e11f4`,
      { cache: "no-store" },
    );

    if (response.ok) {
      ApprovedSpeakers = await response.json();

      ApprovedSpeakers.sort((a: any, b: any) => {
        const getPriority = (speaker: any) => {
          if (speaker.HighLevelDignitary) return 1;
          if (speaker.HighLevel) return 2;
          return 3;
        };

        return getPriority(a) - getPriority(b);
      });
    } else {
      console.error("Failed to fetch speakers");
    }
  } catch (error) {
    console.error("Error fetching speakers:", error);
  }

  return (
    <div>
      {/* Banner */}
      <div className="relative h-[450px] flex items-center">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt={pageData.heading.value}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        <div className="container mx-auto">
          <div className="relative z-10 pt-10">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white max-w-xl">
              {pageData.heading.value}
            </h1>
          </div>
        </div>
      </div>

      {/* Speakers Grid */}
      {ApprovedSpeakers.length > 0 ? (
        <Section>
          <div className="container mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {ApprovedSpeakers.map((speaker: any, index: number) => (
                <SpeakerCard speaker={speaker} key={index} />
              ))}
            </div>
          </div>
        </Section>
      ) : (
        <Section>
          <div className="container mx-auto">
            <h1 className="text-2xl sm:text-4xl text-center">Coming soon</h1>
          </div>
        </Section>
      )}
    </div>
  );
}

export const revalidate = 0;
