import { slugify } from "@/modules/lib";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ExhibitorCard({
  exhibitor,
  companyName,
  companyLogo,
  standNo,
  country,
  viewLink,
}: any) {
  return (
    <div className="rounded-2xl p-2 shadow-md exhibitor-card hover:shadow-lg transition relative min-h-[400px] sm:min-h-[480px]">
      <div>
        <div className="bg-white p-5 rounded-2xl flex justify-center items-center  sm:h-[250px]">
          <Image
            width={160}
            height={160}
            src={companyLogo}
            alt={companyName}
            className="h-24 mx-auto object-contain mb-4 aspect-square"
          />
        </div>

        <div className="p-5">
          <h4 className="text-white text-md font-bold uppercase leading-tight max-w-[200px] mb-3">
            {companyName}
          </h4>
          {standNo && (
            <p className="text-md text-white mb-1">
              Stand No: {standNo}
            </p>
          )}
          {country && (
            <p className="text-md text-white line-clamp-3">
              {country}
            </p>
          )}
        </div>

        <div className="p-5 absolute bottom-2 right-2">
          <Link
            href={viewLink}
            className="flex items-center gap-3 text-white"
          >
            VIEW DETAILS{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
            >
              <circle cx="14.5" cy="14.5" r="14.5" fill="white" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3016 7.07324L21.2198 15.2074L13.3016 23.3415L11.3174 21.308L17.2607 15.2074L11.3174 9.10678L13.3016 7.07324Z"
                fill="#E37C39"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
