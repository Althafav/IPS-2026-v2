import CTAButton from "@/components/Blocks/CTAButton";
import TopSpacer from "@/components/Blocks/TopSpacer";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import React from "react";

export default async function page() {
  const response = await Globals.KontentClient.item("stand_builder_page_2026")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));
  return (
    <div>
      <TopSpacer color="black" />
      <div className="bg-[#F5F5F5] py-8 sm:py-12">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2">
            <div>
              <h1 className="text-3xl sm:text-5xl mb-8">
                {pageData.metadata__pagetitle.value}
              </h1>
              <h3 className="text-2xl sm:text-3xl mb-3 text-gray-800">
                {pageData.aboutheading.value}
              </h3>
              <img
                src={pageData.companylogo.value[0]?.url}
                alt={pageData.aboutheading.value}
                className="mb-4 w-[200px]"
              />
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: pageData.aboutcontent.value,
                }}
              />
            </div>

            <div>
              <img
                className="w-full h-full object-contain"
                src={pageData.aboutimage.value[0]?.url}
                alt={pageData.aboutimage.value[0]?.name}
              />
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="container mx-auto">
          <div>
            <div
              className="prose "
              dangerouslySetInnerHTML={{
                __html: pageData.contactinfo.value,
              }}
            />

            <div className="mt-8">
              <CTAButton
                buttonname={pageData.ctaname.value}
                buttonlink={pageData.ctalink.value}
                target="_blank"
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
