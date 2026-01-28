import HeadBanner from "@/components/Blocks/HeadBanner";
import IframeEmbed from "@/components/Blocks/IframeEmbed";
import Heading2 from "@/components/UI/Heading2";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React from "react";

export async function generateMetadata() {
  const response = await Globals.KontentClient.item("flights_page_2026")
    .withParameter("depth", "4")
    .toPromise();
  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: `${Globals.BASE_URL}hotels`,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: `${Globals.BASE_URL}hotels`,
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
  const response = await Globals.KontentClient.item("flights_page_2026")
    .withParameter("depth", "4")
    .toPromise();
  const pageData = JSON.parse(JSON.stringify(response.item));

  return (
    <div>
      <HeadBanner
        bannerimage={pageData.bannerimage.value[0]?.url}
        bannerheading={pageData.bannerheading.value}
        bannersubheading={pageData.bannersubheading.value}
      />

       <Section className="bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-20">
            {pageData.flightitems.value.map((item: any) => {
              return (
                <div key={item.system.id}>
                  <div className="grid sm:grid-cols-12 gap-10">
                    <div className="col-span-6 sm:col-span-2">
                      <img
                        src={item.logo.value[0]?.url}
                        alt={item.name.value}
                        className=""
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-10">
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: item.content.value,
                        }}
                      />

                      <div className="bg-[#F8F4F4] p-5 inline-block mt-4">
                        <p className="text-primary text-xl">
                          <span className="font-light">Promo Code: </span>
                          <strong className="">
                            {item.promocode.value}
                          </strong>
                        </p>
                        <p className="text-sm">
                          {item.promocodedescription.value}
                        </p>
                      </div>

                      {item.ctabuttonlink.value && (
                        <div className="mt-8">
                          <a
                            className="bg-primary text-white px-8 py-2 rounded-full"
                            href={item.ctabuttonlink.value}
                          >
                            {item.ctabuttonname.value}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}

export const revalidate = 0;
