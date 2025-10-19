import CTAButton from "@/components/Blocks/CTAButton";
import IframeEmbed from "@/components/Blocks/IframeEmbed";
import Heading2 from "@/components/UI/Heading2";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import React from "react";
import FormesterWidget from "./FormesterWidget";

export default async function page() {
  const response = await Globals.KontentClient.item("prop_tech_page")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));
  return (
    <div>
      <div className="relative h-[430px] flex items-center">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={pageData.bannerimage.value[0]?.url}
          alt={pageData.bannerheading.value}
        />
        <div className="container mx-auto">
          <div className="relative z-10">
            <div className="mb-8">
              {pageData.presentbylogo.value.map((img: any, index: number) => {
                return (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.name}
                    className="mb-3 w-36 object-contain"
                  />
                );
              })}
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 max-w-2xl">
              {pageData.bannerheading.value}
            </h1>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 max-w-2xl">
              {pageData.bannersubheading.value}
            </h3>
          </div>
        </div>
      </div>

      <Section>
        <div className="container mx-auto">
          <div className="bg-[#F9F9F9] rounded-2xl shadow-sm py-6 sm:py-8 px-4 sm:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200 text-center gap-5">
              <div>
                <h4 className="text-3xl sm:text-4xl font-bold text-gray-700">
                  {pageData.attendeecount.value}
                </h4>
                <p className="text-[#F27024] mt-1 text-sm sm:text-base">
                  {pageData.attendeetext.value}
                </p>
              </div>

              <div>
                <h4 className="text-3xl sm:text-4xl font-bold text-gray-700">
                  {pageData.countrycount.value}
                </h4>
                <p className="text-[#F27024] mt-1 text-sm sm:text-base">
                  {pageData.countrytext.value}
                </p>
              </div>

              <div>
                <h4 className="text-3xl sm:text-4xl font-bold text-gray-700">
                  {pageData.moucount.value}
                </h4>
                <p className="text-[#F27024] mt-1 text-sm sm:text-base">
                  {pageData.moutext.value}
                </p>
              </div>

              <div>
                <h4 className="text-3xl sm:text-4xl font-bold text-gray-700">
                  {pageData.speakerscount.value}
                </h4>
                <p className="text-[#F27024] mt-1 text-sm sm:text-base">
                  {pageData.speakerstext.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-3 gap-5 items-center">
            <div>
              <Heading2 className="text-secondary">
                {pageData.aboutheading.value}
              </Heading2>
              <div
                className="prose font-light"
                dangerouslySetInnerHTML={{
                  __html: pageData.aboutcontent.value,
                }}
              />
              <div className="flex flex-wrap gap-3">
                {pageData.ctabutton1.value.map((item: any) => {
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

            <div className="sm:col-span-2">
              <IframeEmbed src={pageData.videolink.value} />
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-dark">
        <div className="container mx-auto py-8 sm:py-12">
          <Heading2 className="text-secondary">
            {pageData.featureheading.value}
          </Heading2>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: pageData.featurecontent.value }}
          />
          <div className="grid sm:grid-cols-3 gap-5 mt-8">
            {pageData.featureitem.value.map((item: any) => {
              return (
                <div key={item.system.id}>
                  <img
                    src={item.image.value[0]?.url}
                    alt={item.image.value[0]?.name}
                    className="w-full h-[200px] aspect-video object-cover rounded-3xl overflow-hidden"
                  />
                  <div className="p-2">
                    <h4 className=" text-2xl text-secondary font-bold">
                      {item.name.value}
                    </h4>
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.content.value }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <Heading2 className="text-center mb-8">
            {pageData.participatingsectorsheading.value}
          </Heading2>
          <div className="flex flex-wrap gap-5 justify-center">
            {pageData.participatingsectorsitems.value.map((item: any) => {
              return (
                <div
                  key={item.system.id}
                  className="p-5 bg-[#F5F5F5] shadow rounded-3xl max-w-[400px]"
                >
                  <h4 className=" text-2xl text-secondary font-bold">
                    {item.name.value}
                  </h4>
                  <div
                    className="prose "
                    dangerouslySetInnerHTML={{ __html: item.content.value }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 items-center">
            <div>
              <Heading2 className="text-secondary">
                {pageData.testimonialsheading.value}
              </Heading2>

              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: pageData.testimonialscontent.value,
                }}
              />
            </div>

            <div>
              <div className="grid grid-cols-1 gap-5">
                {pageData.testimonialsitems.value.map((item: any) => {
                  return (
                    <div
                      key={item.system.id}
                      className="grid sm:grid-cols-4 gap-2 items-center bg-[#8BD1D5] rounded-2xl shadow-md p-6 sm:p-8 text-white"
                    >
                      {/* Left Column - Image and Info */}
                      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <img
                          src={item.image.value[0]?.url}
                          alt={item.name.value}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-3"
                        />
                        <h5 className="font-semibold">{item.name.value}</h5>
                        <p className="text-sm opacity-90">
                          {item.designation.value}
                        </p>
                      </div>

                      {/* Divider Line */}

                      {/* Right Column - Testimonial Text */}
                      <div className="hidden sm:block h-24 border-l border-white/50 mx-auto"></div>
                      <div className="sm:col-span-2 ">
                        <div
                          className="prose prose-p:text-white"
                          dangerouslySetInnerHTML={{
                            __html: item.content.value,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <FormesterWidget />
        </div>
      </Section>
    </div>
  );
}
