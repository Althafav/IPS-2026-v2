import CTAButton from "@/components/Blocks/CTAButton";
import TopSpacer from "@/components/Blocks/TopSpacer";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import React from "react";

export async function generateMetadata() {
  const response = await Globals.KontentClient.item("travel_agent_page")
    .withParameter("depth", "4")
    .toPromise();
  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: `${Globals.BASE_URL}exclusive-travel-agent`,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: `${Globals.BASE_URL}exclusive-travel-agent`,
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
  const response = await Globals.KontentClient.item("travel_agent_page")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));
  return (
    <div>
      <TopSpacer color="black" />
      <div className="bg-[#F5F5F5] py-8 sm:py-12">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <h1 className="text-3xl sm:text-5xl mb-8">
                {pageData.bannerheading.value}
              </h1>
              <h3 className="text-2xl sm:text-3xl mb-3 text-gray-800">
                {pageData.companyname.value}
              </h3>
              <img
                src={pageData.companylogo.value[0]?.url}
                alt={pageData.bannerheading.value.value}
                className="mb-4 w-[200px]"
              />
            </div>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
                {pageData.featureitems.value.map((item: any) => {
                  return (
                    <div
                      key={item.system.id}
                      className="flex flex-col items-center justify-center"
                    >
                      <div className="w-[120px] h-[120px] p-5 rounded-full bg-white flex justify-center items-center">
                        <img
                          src={item.image.value[0]?.url}
                          alt={item.name.value}
                          className="w-[60px]"
                        />
                      </div>
                      <p className="mt-3">{item.name.value}</p>
                    </div>
                  );
                })}
              </div>
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
          </div>
        </div>
      </Section>
    </div>
  );
}

export const revalidate = 0; 
