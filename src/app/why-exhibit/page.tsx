import CTAButton from "@/components/Blocks/CTAButton";
import TopSpacer from "@/components/Blocks/TopSpacer";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import React from "react";

export default async function page() {
  const response = await Globals.KontentClient.item("why_exhibit_page_2026")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));
  return (
    <div>
      <TopSpacer color="black" />
      <div className="py-8 sm:py-12 bg-[#F9F8F5]">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: pageData.aboutcontent.value,
                }}
              />
            </div>

            <div>
              <img src={pageData.aboutimage.value[0]?.url} alt="" />
            </div>
          </div>
        </div>

        <Section>
          <div></div>
        </Section>
      </div>
      <div className="py-8 sm:py-12 bg-dark">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            {pageData.whyexhibititems.value.map((item: any) => {
              return (
                <div
                  key={item.system.id}
                  className="bg-[#F5F5F5] p-5 rounded-2xl"
                >
                  <h4 className="text-xl text-secondary mb-4">
                    {item.heading.value}
                  </h4>
                  <div
                    className="prose prose-li:text-secondary"
                    dangerouslySetInnerHTML={{ __html: item.content.value }}
                  />
                </div>
              );
            })}
          </div>

          <div className="py-8 sm:py-12">
            <div
              className="prose-invert prose text-center max-w-none"
              dangerouslySetInnerHTML={{ __html: pageData.ctacontent.value }}
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {pageData.ctabutton.value.map((item: any) => {
              return (
                <div key={item.system.id}>
                  <CTAButton
                    buttonname={item.name.value}
                    buttonlink={item.link.value}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 0;
