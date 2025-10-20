import CTAButton from "@/components/Blocks/CTAButton";
import IframeEmbed from "@/components/Blocks/IframeEmbed";
import SpeakerCard from "@/components/SpeakerCard";
import Heading2 from "@/components/UI/Heading2";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import Image from "next/image";
import React from "react";

export default async function page() {
  const response = await Globals.KontentClient.item("ips_women_2026")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));
  return (
    <div className="page">
      <div className="relative h-[530px] flex items-center">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt={pageData.bannerheading.value}
          className="w-full object-cover absolute inset-0 h-full"
        />
        <div className="container mx-auto">
          <div className="relative z-10">
            <img
              className="w-[147px] h-[51px] object-contain mb-8"
              src={pageData.sponsorlogo.value[0]?.url}
              alt=""
            />
            <h1 className="text-white text-3xl sm:text-5xl font-bold">
              {pageData.bannerheading.value}
            </h1>
            <h3 className="text-white text-xl font-light mb-12">
              {pageData.bannersubheading.value}
            </h3>
            <div className="flex flex-wrap gap-3">
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

      <Section>
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-3 gap-5 items-center">
            <div>
              <div
                className="prose font-light"
                dangerouslySetInnerHTML={{
                  __html: pageData.aboutipswomencontent.value,
                }}
              />
            </div>

            <div className="sm:col-span-2">
              <IframeEmbed src={pageData.aboutvideolink.value} />
            </div>
          </div>
        </div>
      </Section>

      <Section className="relative py-8 sm:py-12">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={pageData.whyattendbackground.value[0]?.url}
          alt={pageData.whyattendheading.value}
        />
        <div className="container mx-auto">
          <div className="relative z-10">
            <div className="grid sm:grid-cols-3 gap-5">
              {pageData.whyattenditems.value.map((item: any) => {
                return (
                  <div className="" key={item.system.id}>
                    <div>
                      <img
                        className="w-full object-cover aspect-video"
                        src={item.image.value[0]?.url}
                        alt={item.name.value}
                      />
                    </div>
                    <div className="p-2 text-center">
                      <h4 className="text-2xl text-secondary font-bold">
                        {item.name.value}
                      </h4>
                      <div
                        className="text-white prose font-light"
                        dangerouslySetInnerHTML={{ __html: item.content.value }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <Heading2 className="text-center text-secondary mb-8">
            {pageData.speakersheading.value}
          </Heading2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {pageData.speakers.value.map((speaker: any, index: number) => {
              return (
                <div
                  className="shadow bg-white rounded-3xl overflow-hidden"
                  key={index}
                >
                  <div>
                    <div className="speaker-item ">
                      <div>
                        <div>
                          <div className="image-wrapper">
                            <Image
                              width={300}
                              height={350}
                              className="speaker-image aspect-square object-cover object-top"
                              src={speaker.image.value[0]?.url}
                              alt={speaker.name.value}
                            />
                          </div>
                          <div className="speaker-content p-4">
                            <h4 className="speaker-name text-secondary font-bold text-lg mb-2">
                              {speaker.name.value}
                            </h4>
                            <p className="font-light text-gray-600 text-sm">
                              {speaker.designation.value}
                            </p>
                            <p className="font-light text-gray-600 text-sm">
                              {speaker.organization.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2">
            <div>
              <Heading2 className="text-secondary">
                {pageData.programheading.value}
              </Heading2>
            </div>

            <div>
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: pageData.programcontent.value,
                }}
              />
            </div>
          </div>

          <div>
            {pageData.sessionitem.value.map((item: any) => {
              return (
                <div key={item.system.id}>
                  <h4>{item.heading.value}</h4>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: item.summarycontent.value,
                    }}
                  />
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