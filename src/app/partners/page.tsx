import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
                        return (
                          <Link
                            href={partner.website.value}
                            target="_blank"
                            key={iIdx}
                            className="flex items-center justify-center w-[220px] h-[120px] "
                          >
                            <div className="flex items-center justify-center">
                              <Image
                                width={300}
                                height={200}
                                src={partner.logo.value[0]?.url}
                                alt={partner.name.value}
                                className=" object-contain aspect-video shadow-sm p-4"
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

export const revalidate = 60;
