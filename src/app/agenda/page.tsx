import AgendaComponent from "@/components/AgendaComponent";
import HeadBanner from "@/components/Blocks/HeadBanner";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import React from "react";

export default async function page() {
  const response = await Globals.KontentClient.item("agenda_page_2026")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));
  return (
    <div>
      <HeadBanner
        bannerimage={pageData.bannerimage.value[0]?.url}
        bannerheading={pageData.heading.value}
        bannersubheading={pageData.bannersubheading.value}
      />

      <Section>
        <div className="container mx-auto">
          <AgendaComponent eventId="6fb9b8ce-22cf-48ea-95c4-4d776e0e11f4" />
        </div>
      </Section>
    </div>
  );
}
