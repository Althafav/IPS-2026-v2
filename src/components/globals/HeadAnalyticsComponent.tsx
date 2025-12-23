import Script from "next/script";
import React from "react";

export default function HeadAnalyticsComponent() {
  return (
    <>
      <Script
        id="google-tag-manager"
        type="text/javascript"
        src={`/assets/js/gtm.js`}
      ></Script>

      <Script
        id="tiktok-analytics"
        type="text/javaScript"
        src={`/assets/js/tiktok.js`}
      ></Script>

      <Script
        id="facebook-analytics"
        type="text/javascript"
        src={`/assets/js/facebook.js`}
      ></Script>
      <Script
        id="snap-pixel-script"
        type="text/javascript"
        src={`/assets/js/snap-pixel.js`}
      ></Script>

      {/* <Script
        id="snap-pixel-init"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              snaptr('track', 'PAGE_VIEW', {'item_ids': ['INSERT_ITEM_ID_1', 'INSERT_ITEM_ID_2'], 'item_category': 'INSERT_ITEM_CATEGORY', 'uuid_c1': 'INSERT_UUID_C1', 'user_email': 'INSERT_USER_EMAIL', 'user_phone_number': 'INSERT_USER_PHONE_NUMBER', 'user_hashed_email': 'INSERT_USER_HASHED_EMAIL', 'user_hashed_phone_number': 'INSERT_USER_HASHED_PHONE_NUMBER', 'firstname': 'INSERT_FIRST_NAME', 'lastname': 'INSERT_LAST_NAME', 'age': 'INSERT_AGE', 'geo_country': 'INSERT_GEO_COUNTRY'})
            `,
        }}
      /> */}

      <noscript>
        <img
          alt="facebook script"
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=954519451963375&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  );
}
