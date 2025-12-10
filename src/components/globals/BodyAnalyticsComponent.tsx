import Script from "next/script";
import React from "react";

export default function BodyAnalyticsComponent() {
  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WQ2RHVTH"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <Script
       defer
       async
        src="https://www.googletagmanager.com/gtag/js?id=G-75WGY4P47M"
      ></Script>
      <Script
        defer
        async
        type="text/javascript"
        src={`/assets/js/gtag.js`}
      ></Script>
    </>
  );
}
