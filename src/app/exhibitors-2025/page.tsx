import TopSpacer from "@/components/Blocks/TopSpacer";

import Section from "@/components/UI/Section";
import { SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import React from "react";
import Exhibitors2025Client from "./Exhibitors2025Client";

export async function generateMetadata() {
  return buildMetadata({
    title: "Exhibitors 2025 | IPS Congress",
    description: "",
    canonical: `${SITE_URL}exhibitors-2025`,
  });
}

export default function ExhibitorsPage() {
  return (
    <>
      <TopSpacer color="black" />
      <Section className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Exhibitors 2025</h1>
        <Exhibitors2025Client />
      </Section>
    </>
  );
}
