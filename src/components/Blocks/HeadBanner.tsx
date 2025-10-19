import React from "react";

export default function HeadBanner({
  bannerimage,
  bannerheading,
  bannersubheading,
}: any) {
  return (
    <div className="relative h-[350px] flex items-center">
      <img
        src={bannerimage}
        alt={bannerheading}
        className="w-full absolute inset-0 h-full object-cover object-top brightness-25"
      />

      <div className="container mx-auto">
        <div className="relative z-10 pt-10">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-secondary max-w-3xl">
            {bannerheading}
          </h1>
          <p className="text-white">{bannersubheading}</p>
        </div>
      </div>
    </div>
  );
}
