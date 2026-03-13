import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function generateMetadata() {
  const response = await Globals.KontentClient.item("partners_page")
    .withParameter("depth", "4")
    .toPromise();
  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: `${Globals.BASE_URL}partners`,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: `${Globals.BASE_URL}partners`,
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
  const response = await Globals.KontentClient.item("partners_page")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));

  return (
    <div className="">
      <div className="relative h-[350px] py-20 flex items-end">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt={pageData.heading.value}
          className="w-full h-full object-cover absolute inset-0 brightness-50"
        />

        <div className="container mx-auto">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4 text-white text-center">
              {pageData.heading.value}
            </h1>
          </div>
        </div>
      </div>
      <Section>
        <div className="container mx-auto">
          <div className="partner-wrapper grid grid-cols-1 gap-20">
            {pageData.items.value.map((item: any, idx: number) => {
              //category items
              return (
                <div className="" key={idx}>
                  <div className=" text-center mb-5">
                    <h1 className=" text-2xl font-bold">
                      {item.heading.value}
                    </h1>
                  </div>

                  <div className="">
                    <div className="flex flex-wrap justify-center gap-8">
                      {item.items.value.map((partner: any, iIdx: number) => {
                        const sizes = [
                          "w-[340px] h-[210px]", // 1 - Main Partner
                          "w-[310px] h-[190px]", // 2 - Strategic Partner
                          "w-[280px] h-[170px]", // 3 - Titanium Sponsor
                          "w-[250px] h-[145px]", // 4 - Diamond Sponsor
                          "w-[190px] h-[120px]", // 5 - Platinum Sponsors
                        ];

                        const sizeClass = sizes[idx] || "w-[180px] h-[110px]";

                        return (
                          <Link
                            href={partner.website.value}
                            target="_blank"
                            key={iIdx}
                            className={`flex items-center justify-center ${sizeClass}`}
                          >
                            <div className="flex items-center justify-center">
                              <Image
                                width={300}
                                height={200}
                                src={partner.logo.value[0]?.url}
                                alt={partner.name.value}
                                className="object-contain aspect-video shadow-sm p-4"
                              />
                            </div>
                          </Link>
                        );
                      })}
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
