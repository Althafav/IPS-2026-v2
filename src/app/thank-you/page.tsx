import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import React from "react";

export default async function page() {
  const response = await Globals.KontentClient.item("thank_you_page")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));

  return <div className="">
    <div className="h-[76px] bg-black"/>
    <Section className="max-w-4xl mx-auto">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: pageData.content.value}}/>
    </Section>
  </div>;
}
