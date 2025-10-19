import TopSpacer from "@/components/Blocks/TopSpacer";
import Section from "@/components/UI/Section";
import { slugify } from "@/modules/lib";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { FaLinkedin } from "react-icons/fa";

const EXHIBITORS_URL =
  "https://api.aimcongress.com/api/website/getexhibitors?eventid=cfc66726-6b7d-467f-8453-f0ee21b035f2";
export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(EXHIBITORS_URL, { next: { revalidate: 3600 } });
  if (!res.ok) notFound();

  const exhibitors: any = await res.json();
  const exhibitor =
    exhibitors.find((e: any) => slugify(e.company_name) === slug) || null;
  if (!exhibitor) notFound();
  return (
    <div>
      <TopSpacer color="black" />
      <Section className="container mx-auto">
        <div className="bg-gray-100 rounded-2xl p-6 md:p-10 flex sm:flex-col flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
          {/* LEFT CONTENT */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
              {exhibitor.company_name}
            </h1>

            <div className="text-gray-700 mb-4 leading-relaxed">
              {exhibitor.stand_no && (
                <p>
                  <strong>Stand No:</strong> {exhibitor.stand_no}
                </p>
              )}
              {exhibitor.country && (
                <p>
                  <strong>Country:</strong> {exhibitor.country}
                </p>
              )}
              {exhibitor.company_address && (
                <p className="whitespace-pre-line">
                  {exhibitor.company_address}
                </p>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {exhibitor.company_website && (
                <div>
                  <Link
                    href={exhibitor.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary hover:bg-primaryDark text-white font-medium px-4 py-2  rounded-full transition"
                  >
                    Visit Website
                  </Link>
                </div>
              )}

              {exhibitor.linkedin && (
                <div>
                  {" "}
                  <Link
                    href={exhibitor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-secondary hover:bg-secondaryDark text-secondary hover:text-white font-medium px-4 py-2 rounded-full transition"
                  >
                    <FaLinkedin />
                    Follow on LinkedIn
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT LOGO */}
          <div className="w-full md:w-auto md:flex-shrink-0">
            <div className="bg-white rounded-full p-4 flex items-center justify-center shadow-sm">
              <Image
                src={exhibitor.company_logo}
                alt={exhibitor.company_name}
                width={160}
                height={160}
                className="object-contain h-34 w-34"
              />
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-8 text-gray-800 text-base leading-7">
          <p className="whitespace-pre-line">{exhibitor.company_brief}</p>
        </div>

        {/* PRODUCTS */}
        {exhibitor.products?.length > 0 && (
          <div className="py-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {exhibitor.products.map((product: any) => (
                <div
                  key={product.id}
                  className="border rounded-xl p-4 bg-white shadow-sm"
                >
                  <Image
                    src={product.image.trim()}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-contain mb-3"
                  />
                  <p className="text-gray-700 font-medium text-center">
                    {product.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {exhibitor.brochures?.length > 0 && (
          <div className="py-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Brochures
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
              {exhibitor.brochures.map((brochure: any) => (
                <li key={brochure.id}>
                  <a
                    href={brochure.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {brochure.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* PRESS RELEASES */}
        {exhibitor.press_releases?.length > 0 && (
          <div className="py-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Press Releases
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
              {exhibitor.press_releases.map((release: any) => (
                <li key={release.id}>
                  <a
                    href={release.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {release.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </div>
  );
}

export async function generateStaticParams() {
  const res = await fetch(EXHIBITORS_URL, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const exhibitors: any = await res.json();

  return exhibitors
    .filter((e: any) => e?.company_name)
    .map((e: any) => ({ slug: slugify(e.company_name) }));
}
