import AgendaComponent from "@/components/AgendaComponent";
import HeadBanner from "@/components/Blocks/HeadBanner";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import React from "react";

export async function generateMetadata() {
  const response = await Globals.KontentClient.item("agenda_page_2026")
    .withParameter("depth", "4")
    .toPromise();
  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: `${Globals.BASE_URL}/agenda`,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: `${Globals.BASE_URL}/agenda`,
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
