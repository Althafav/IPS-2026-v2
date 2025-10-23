import HeadBanner from "@/components/Blocks/HeadBanner";
import FormComponent from "@/components/Form/FormComponent";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";

import React from "react";

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
  const attend = searchParams?.attend ?? "";

  const [response, countries, countryCodes] = await Promise.all([
    Globals.KontentClient.item("register_interest_form___2026")
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
              attendAs={attend}
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

export const revalidate = 60;
