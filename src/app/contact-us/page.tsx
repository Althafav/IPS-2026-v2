import HeadBanner from "@/components/Blocks/HeadBanner";
import FormComponent from "@/components/Form/InterestFormComponent";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import React from "react";


export async function generateMetadata() {
  const response = await Globals.KontentClient.item("contact_us_form___2026")
    .withParameter("depth", "4")
    .toPromise();
  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: `${Globals.BASE_URL}contact-us`,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: `${Globals.BASE_URL}contact-us`,
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

async function getCountries() {
  const res = await fetch("https://api.strategic.ae/api/generic/countries", {
    // fresh each request; or use { next: { revalidate: 3600 } } to cache for 1h
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load countries");
  return res.json() as Promise<Array<{ code: string; name: string }>>;
}

async function getCountryCodes() {
  const res = await fetch("https://api.strategic.ae/api/generic/countrycodes", {
    // fresh each request; or use { next: { revalidate: 3600 } } to cache for 1h
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load countries");
  return res.json() as Promise<Array<{ code: string; name: string }>>;
}

export default async function page(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  const mainsource = searchParams?.mainsource ?? "";
  const subsource = searchParams?.subsource ?? "";

  const [response, countries, countryCodes] = await Promise.all([
    Globals.KontentClient.item("contact_us_form___2026")
      .withParameter("depth", "4")
      .toPromise(),
    getCountries(),
    getCountryCodes(),
  ]);

  const pageData = JSON.parse(JSON.stringify(response.item));

  return (
    <div className="page">
      <HeadBanner
        bannerimage={pageData.bannerimage.value[0]?.url}
        bannerheading={pageData.bannerheading.value}
        bannersubheading={pageData.bannersubheading.value}
      />

      <Section className="form-content relative">
        <div className="container mx-auto">
          <div className="flex gap-10 md:flex-row flex-col">
            <FormComponent
              formsubmit={pageData.formsubmit.value}
              countries={countries}
              countryCodes={countryCodes}
              mainsource={mainsource}
              subsource={subsource}
            />

            <div>
              <img src={pageData.formimage.value[0]?.url} alt="" className="" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
export const revalidate = 0; 