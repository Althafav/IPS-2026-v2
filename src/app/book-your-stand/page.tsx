import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import React from "react";

export default async function page() {
  const response = await Globals.KontentClient.item(
    "book_your_stand_form___demo"
  )
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));
  return (
    <div className="page">
      <div className="relative h-[300px] flex items-center">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt={pageData.bannerimage.value[0].name}
          className="w-full absolute inset-0 h-full object-cover brightness-25"
        />

        <div className="container mx-auto">
          <div className="relative z-10 ">
            <h1 className="text-5xl font-bold mb-4 text-secondary">
              {pageData.bannerheading.value}
            </h1>
            <p className="text-white">{pageData.bannersubheading.value}</p>
          </div>
        </div>
      </div>

      <Section className="form-content relative">
        <div className="container mx-auto">
          <div className="flex gap-10 sm:flex-row flex-col">
            <form className="sm:w-3/4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* First Name */}
                <fieldset className="rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
                  <legend className="px-2 text-teal-600 text-sm">
                    First Name
                  </legend>
                  <input
                    type="text"
                    className="w-full rounded-full px-5 py-2 outline-none"
                    placeholder=""
                  />
                </fieldset>

                {/* Last Name */}
                <fieldset className="rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
                  <legend className="px-2 text-teal-600 text-sm">
                    Last Name
                  </legend>
                  <input
                    type="text"
                    className="w-full rounded-full px-5 py-2 outline-none"
                    placeholder=""
                  />
                </fieldset>

                {/* Email */}
                <fieldset className="md:col-span-2 rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
                  <legend className="px-2 text-teal-600 text-sm">Email</legend>
                  <input
                    type="email"
                    className="w-full rounded-full px-5 py-2 outline-none"
                    placeholder=""
                  />
                </fieldset>

                {/* Mobile Phone */}
                <fieldset className="md:col-span-2 rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
                  <legend className="px-2 text-teal-600 text-sm">
                    Mobile Phone
                  </legend>
                  <input
                    type="tel"
                    className="w-full rounded-full px-5 py-2 outline-none"
                    placeholder=""
                  />
                </fieldset>

                {/* Company Name */}
                <fieldset className="rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
                  <legend className="px-2 text-teal-600 text-sm">
                    Company Name
                  </legend>
                  <input
                    type="text"
                    className="w-full rounded-full px-5 py-2 outline-none"
                    placeholder=""
                  />
                </fieldset>

                {/* Designation */}
                <fieldset className="rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
                  <legend className="px-2 text-teal-600 text-sm">
                    Designation
                  </legend>
                  <input
                    type="text"
                    className="w-full rounded-full px-5 py-2 outline-none"
                    placeholder=""
                  />
                </fieldset>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="rounded-full bg-secondary hover:bg-teal-700 text-white px-6 py-3 transition"
                >
                  Submit
                </button>
              </div>
            </form>

            <div>
              <img src={pageData.formimage.value[0]?.url} alt="" className="" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
