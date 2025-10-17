import Heading2 from "@/components/UI/Heading2";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React from "react";
import AwardAccordionComponent from "./AwardAccordionComponent";
import Section from "@/components/UI/Section";
import Timeline from "./Timeline";
import AwardsFAQAccordion from "./AwardsFAQAccordion";

export default async function page() {
  const response = await Globals.KontentClient.item("ips_awards_2026")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));
  return (
    <div className="pt-20">
      <div className="">
        <div className="grid sm:grid-cols-2 gap-10 items-center">
          <div className="sm:pl-40 px-5">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3">
              {pageData.bannerheading.value}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-secondary">
              {pageData.bannersubheading.value}
            </h2>
            <div
              className="mb-5"
              dangerouslySetInnerHTML={{ __html: pageData.aboutcontent.value }}
            />
            <div className="flex flex-wrap gap-4 ">
              {pageData.ctabutton.value?.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={item.link?.value || "#"}
                  className="px-6 py-3 bg-primary hover:bg-primaryDark text-white font-semibold rounded-full transition"
                >
                  {item.name?.value}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <img src={pageData.bannerimage.value[0]?.url} alt="" />
          </div>
        </div>
      </div>

      <div className="bg-dark py-8 sm:py-12" id="AwardCategories">
        <div className="container mx-auto">
          <Heading2 className="text-white text-center">
            {pageData.categoryheading.value}
          </Heading2>

          <AwardAccordionComponent pageData={pageData} />

          <div className="py-8 sm-py-12">
            <Timeline
              heading={pageData.timelineheading.value}
              items={pageData.timelineitem.value}
            />
          </div>
        </div>
      </div>

      <Section>
        <div className="max-w-5xl mx-auto ">
          <Heading2 className="text-center mb-12">
            {pageData.whyheading.value}
          </Heading2>

          <div className="flex gap-5 flex-wrap items-center justify-center text-center">
            {pageData.whyitems.value.map((item: any) => {
              return (
                <div
                  key={item.system.id}
                  className="flex flex-col gap-2 items-center justify-center max-w-[160px]"
                >
                  <img src={item.image.value[0]?.url} alt="" />
                  <h4 className="text-xl">{item.name.value}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <Heading2 className="text-center mb-8">
            {pageData.howheading.value}
          </Heading2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {pageData.howitems.value.map((item: any, index: number) => {
              return (
                <div key={item.system.id} className="p-2 bg-dark rounded-3xl">
                  <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center text-white font-medium">
                    0{index + 1}
                  </div>
                  <p className="text-white p-4">{item.name.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <AwardsFAQAccordion pageData={pageData} />
        </div>
      </Section>

      <div className="bg-dark py-8 sm:py-12">
        <div className="container mx-auto">
          <Heading2 className="text-white text-center mb-8">
            {pageData.packagesheading.value}
          </Heading2>

          <div className="grid grid-cols-2 gap-5">
            {pageData.packageitems.value.map((item: any) => {
              return (
                <div
                  key={item.system.id}
                  className="bg-white rounded-3xl overflow-hidden"
                >
                  <div className="bg-primary py-5">
                    <h4 className="text-white text-center text-xl font-medium">
                      {item.name.value}
                    </h4>
                  </div>

                  <div className="p-5">
                    <div
                    className="prose"
                      dangerouslySetInnerHTML={{ __html: item.content.value }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
