"use client";

import Script from "next/script";
import React from "react";

const Formester: any = "formester-standard-form"; // ✅ no type errors

export default function FormesterWidget() {
  return (
    <>
      <div id="RegisterInterest" className="w-full">
        <Formester
          set-auto-height="true"
          data-height="900"
          id="c43a5a1d-1da7-410b-9a8c-56f54c528e7a"
          url="https://sorkmrlf.formester.com/f/c43a5a1d-1da7-410b-9a8c-56f54c528e7a"
          style={{ width: "100%" }}
        />
      </div>

      <Script src="https://sorkmrlf.formester.com/widget/standard.js" strategy="afterInteractive" />
    </>
  );
}
