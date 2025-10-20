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
                  className="rounded-3xl overflow-hidden bg-secondary flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      src={item.image.value[0]?.url}
                      alt={item.heading.value}
                      className="w-full h-[240px] object-cover"
                    />
                    {/* Decorative Border */}
                    <div className="absolute inset-3 border border-white/50 rounded-3xl pointer-events-none"></div>
                  </div>

                  {/* Text Section */}
                  <div className="bg-[#1DB6B1] p-6 flex flex-col justify-between flex-grow">
                    <h4 className="text-white text-base leading-snug font-medium mb-6">
                      {item.heading.value}
                    </h4>

                    <button className="self-center bg-white text-black text-sm px-6 py-2 rounded-full hover:bg-gray-100 transition-all">
                      Read More
                    </button>
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


export const revalidate = 0; 