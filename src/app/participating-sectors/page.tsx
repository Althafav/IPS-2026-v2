
import Globals from "@/modules/Globals";
import React from "react";

export async function generateMetadata() {
  const response = await Globals.KontentClient.item(
    "participating_sector_page"
  )
    .withParameter("depth", "4")
    .toPromise();
  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: `${Globals.BASE_URL}participating-sectors`,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: `${Globals.BASE_URL}participating-sectors`,
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
  const response = await Globals.KontentClient.item("participating_sector_page")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));
  return (
    <div>
      <div className="relative h-[350px] flex items-end py-8 sm:py-12">
        <img
          src={pageData?.bannerimage?.value?.[0]?.url ?? ""}
          alt={pageData?.bannerheading?.value ?? "Photo Gallery"}
          className="w-full absolute inset-0 h-full object-cover object-top brightness-25"
        />
        <div className="container mx-auto">
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center text-white">
              {pageData?.bannerheading?.value ?? "Photo Gallery"}
            </h1>
          </div>
        </div>
      </div>

      <div className="py-8 sm:py-12 bg-dark">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 justify-center items-center">
            {pageData.items.value.map((item: any) => {
              return (
                <div
                  key={item.system.id}
                  className="flex justify-center items-center flex-col"
                >
                  <div className="w-[130px] h-[130px] bg-white rounded-full flex justify-center items-center">
                    <img
                      src={item.icon.value[0]?.url}
                      alt={item.name.value}
                      className="w-[60px]"
                    />
                  </div>
                  <p className="text-white mt-4 text-center">
                    {item.name.value}{" "}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 60;