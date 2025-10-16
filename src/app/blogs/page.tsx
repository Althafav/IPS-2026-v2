import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React from "react";

export default async function page() {
  const response = await Globals.KontentClient.item("blog_page_2026")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));
  return (
    <div className="page">
      <div className="relative h-[450px] py-20 flex items-end">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt={pageData.bannerheading.value}
          className="w-full h-full object-cover absolute inset-0"
        />

        <div className="container mx-auto">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4 text-white">
              {pageData.bannerheading.value}
            </h1>
          </div>
        </div>
      </div>

      <Section>
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-5">
            {pageData.blogitems.value.map((item: any) => {
              return (
                <Link
                  href={`/blogs/${item.slug.value}`}
                  key={item.system.id}
                  className="rounded-3xl bg-secondary"
                >
                  <div>
                    <img
                      src={item.image.value[0]?.url}
                      alt={item.heading.value}
                      className="w-full h-[240px] object-cover rounded-t-3xl"
                    />
                  </div>

                  <div className="">
                    <div className="p-5">
                      <h4 className="text-white">{item.heading.value}</h4>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
