import Link from "next/link";
import React from "react";

export default function HeroSection({
  heading,
  subheading,
  bannerimage,
  bannervideo,
  ctabuttons,
}: any) {
  return (
    <div className="relative w-full h-[90vh] flex flex-col justify-center items-start text-start text-white overflow-hidden">
      {/* Background Video */}
      {bannervideo ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={bannervideo}
          poster={bannerimage}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerimage})` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="container relative z-10 px-6 pt-20">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          {heading}
        </h1>
        <p className="text-lg mb-6">{subheading}</p>

        <div className="flex flex-wrap gap-4">
          {ctabuttons?.map((item: any, index: number) => (
            <Link
              key={index}
              href={item.link?.value || "#"}
              className="px-6 py-3 bg-primary hover:bg-primaryDark text-white font-semibold rounded-full transition"
            >
              {item.name?.value}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
