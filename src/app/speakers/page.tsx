import HeadBanner from "@/components/Blocks/HeadBanner";
import SpeakerCard from "@/components/SpeakerCard";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import Image from "next/image";

import React from "react";

export default async function page() {
  const response = await Globals.KontentClient.item("speakers_page_2025")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));

  let ApprovedSpeakers: any[] = [];

  try {
    const response = await fetch(
      `https://payment.aimcongress.com/api/SpeakersAPI/GetApprovedSpeakers?eventid=b023122a-8edf-47ba-b773-fa57e08e02d8`
    );
    if (response.ok) {
      ApprovedSpeakers = await response.json();
    } else {
      console.error("Failed to fetch speakers");
    }
  } catch (error) {
    console.error("Error fetching speakers:", error);
  }
  return (
    <div>
      <div className="relative h-[450px] flex items-center">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt={pageData.heading.value}
          className="w-full absolute inset-0 h-full object-cover object-top "
        />

        <div className="container mx-auto">
          <div className="relative z-10 pt-10">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white max-w-xl">
              {pageData.heading.value}
            </h1>
          </div>
        </div>
      </div>
      <Section>
        <div className="container mx-auto">
          <h1 className="text-2xl sm:text-4xl text-center">Coming soon</h1>
        </div>
      </Section>
      {/* <Section>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {ApprovedSpeakers.map((speaker: any, index: number) => {
              return (
                <SpeakerCard speaker={speaker} key={index}/>
              );
            })}
          </div>
        </div>
      </Section> */}
    </div>
  );
}
