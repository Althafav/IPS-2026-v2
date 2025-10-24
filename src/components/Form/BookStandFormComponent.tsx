"use client";
import { NatureOfBusiness } from "@/constants/NatureOfBusiness";
import JsLoader from "@/modules/JsLoader";
import { ChevronDown } from "lucide-react";
import React, { useEffect } from "react";

export default function BookStandFormComponent({
  mainsource,
  subsource,
  countries,
  countryCodes,
  attendAs,
}: any) {
  const options = [
    "Exhibitor",
    "Speaker",
    "Sponsor",
    "Media Partner",
    "Attend Workshop",
    "Attend Conference",
    "Visitor",
    "Event Partner",
  ];

  useEffect(() => {
    JsLoader.loadFile(`/assets/js/registerInterest.js`);
  }, []);
  return (
    <form
      className="md:w-3/4 bg-white _form _form_400 _inline-form "
      method="POST"
      action="//ac.strategic.ae/proc.php"
      id="_form_400_"
      noValidate
    >
      <input type="hidden" name="u" value="400" />
      <input type="hidden" name="f" value="400" />
      <input type="hidden" name="s" />
      <input type="hidden" name="c" value="0" />
      <input type="hidden" name="m" value="0" />
      <input type="hidden" name="act" value="sub" />
      <input type="hidden" name="v" value="2" />
      <input type="hidden" name="or" value="afa0e90b181b5113564543437bf2465a" />
      <input type="hidden" name="field[328]" value={mainsource} />
      <input type="hidden" name="field[329]" value={subsource} />
      <input
        type="hidden"
        name="field[38]"
        value={`IPS 2026 - Book Your Stand`}
      />

      <input
        type="hidden"
        name="leadType"
        value={`${attendAs === "speaker" ? "IPS Conference Lead" : "IPS Lead"}`}
      />

      <div className="_form-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
          {/* First Name */}
          <fieldset className="rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
            <legend className="px-2 text-teal-600 text-sm">First Name</legend>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="w-full rounded-full px-5 py-2 outline-none"
              placeholder=""
              required
            />
          </fieldset>

          {/* Last Name */}
          <fieldset className="rounded-full flex flex-col border-2 border-teal-500 focus-within:border-teal-600 transition">
            <legend className="px-2 text-teal-600 text-sm">Last Name</legend>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="w-full rounded-full px-5 py-2 outline-none"
              placeholder=""
            />
          </fieldset>

          {/* Email */}
          <fieldset className="lg:col-span-2 rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
            <legend className="px-2 text-teal-600 text-sm">Email</legend>
            <input
              type="text"
              itemID="email"
              name="email"
              className="w-full rounded-full px-5 py-2 outline-none"
              placeholder=""
            />
          </fieldset>

          {/* Mobile Phone */}
          <fieldset className="lg:col-span-2 rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
            <legend className="px-2 text-teal-600 text-sm">Mobile Phone</legend>

            <div className="flex items-center w-full">
              {/* Country Code */}
              <select
                name="phoneCode"
                className="rounded-l-full max-w-[200px] px-5 py-2 outline-none  border-r-2 border-teal-200 text-gray-800 appearance-none cursor-pointer"
              >
                {countryCodes.map((item: any, index: number) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              {/* Phone Input */}
              <input
                type="number"
                name="field[12]"
                className="flex-1 rounded-r-full px-5 py-2 outline-none "
                placeholder="Enter your number"
              />
            </div>
          </fieldset>

          {/* Company Name */}
          <fieldset className="rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
            <legend className="px-2 text-teal-600 text-sm">Company Name</legend>
            <input
              type="text"
              id="customer_account"
              name="customer_account"
              className="w-full rounded-full px-5 py-2 outline-none"
              placeholder=""
            />
          </fieldset>

          {/* Designation */}
          <fieldset className="rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
            <legend className="px-2 text-teal-600 text-sm">Designation</legend>
            <input
              type="text"
              id="field[23]"
              name="field[23]"
              className="w-full rounded-full px-5 py-2 outline-none"
              placeholder=""
            />
          </fieldset>

          <fieldset className="relative rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
            <legend className="px-2 text-teal-600 text-sm">Nationality</legend>
            <input
              type="text"
              id="field[99]"
              className="nationality"
              name="field[99]"
              hidden
            />
            {/* Wrapper for select */}
            <div className="relative flex items-center">
              <select
                className="w-full text-sm rounded-full px-5 py-3 pr-10 outline-none  text-gray-800 appearance-none cursor-pointer"
                defaultValue=""
                onChange={(e) => {
                  $(".nationality").val(e.target.value);
                }}
              >
                <option value="">Select Nationality</option>
                {countries.map((country: any, index: number) => (
                  <option key={index} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>

              {/* Dropdown icon - doesn't block clicks */}
              <ChevronDown className="absolute right-5 text-teal-600 pointer-events-none" />
            </div>
          </fieldset>

          <fieldset className="relative rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
            <legend className="px-2 text-teal-600 text-sm">
              Select your country of work or residence.
            </legend>

            {/* Wrapper for select */}
            <div className="relative flex items-center">
              <select
                name="field[3]"
                id="field[3]"
                className="w-full text-sm rounded-full px-5 py-3 pr-10 outline-none  text-gray-800 appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="">Select a country</option>
                {countries.map((country: any, index: number) => (
                  <option key={index} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>

              {/* Dropdown icon - doesn't block clicks */}
              <ChevronDown className="absolute right-5 text-teal-600 pointer-events-none" />
            </div>
          </fieldset>

          <fieldset className="relative lg:col-span-2 rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
            <legend className="px-2 text-teal-600 text-sm">
              Nature of Business
            </legend>

            {/* Wrapper for select */}
            <div className="relative flex items-center">
              <select
                name="field[4]"
                id="field[4]"
                className="w-full text-sm rounded-full px-5 py-3 pr-10 outline-none  text-gray-800 appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="">Select Nature of your Business</option>
                {NatureOfBusiness.map((item: any, index: number) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              {/* Dropdown icon - doesn't block clicks */}
              <ChevronDown className="absolute right-5 text-teal-600 pointer-events-none" />
            </div>
          </fieldset>

          <fieldset className={`lg:col-span-2 px-2 ${attendAs && "hidden"}`}>
            <legend className=" text-teal-600 text-sm font-medium mb-4">
              Interested In
            </legend>

            <div className="flex flex-wrap gap-3 text-gray-800">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    id="field[235][]"
                    name="field[235][]"
                    value={option}
                    defaultChecked={attendAs === option.toLocaleLowerCase()}
                    className="w-4 h-4 accent-teal-600 border-2 border-teal-500 rounded-md focus:ring-0"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="lg:col-span-2 rounded-full border-2 border-teal-500 focus-within:border-teal-600 transition">
            <legend className="px-2 text-teal-600 text-sm">Message</legend>
            <textarea
              id="field[6]"
              name="field[6]"
              className="w-full rounded-full px-5 py-2 outline-none"
              placeholder=""
            />
          </fieldset>

          <div className="_form-thank-you" style={{ display: "none" }}></div>
        </div>
        <div className="mt-6">
          <div
            className="g-recaptcha"
            data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
          ></div>
        </div>
        {/* Submit Button */}
        <div className="mt-6">
          <button
            id="_form_400_submit"
            type="submit"
            className="_submit rounded-full bg-secondary hover:bg-teal-700 text-white px-6 py-3 transition flex items-center justify-center gap-2"
          >
            <span className="btn-text">Submit</span>
            <span className="spinner hidden border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></span>
          </button>
        </div>
      </div>
    </form>
  );
}
