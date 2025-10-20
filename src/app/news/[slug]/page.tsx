// src/app/article/[slug]/page.tsx

import Globals from "@/modules/Globals";

import Section from "@/components/UI/Section";

import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blogsRes = await Globals.KontentClient.item("news_page_2026")
    .withParameter("depth", "2")
    .toPromise();
  const blogsData = JSON.parse(JSON.stringify(blogsRes.item));
  const pageData = blogsData.blogitems.value.find(
    (i: any) => i.slug.value === slug
  );

  if (!pageData) {
    return { title: "Blog not found", robots: { index: false, follow: false } };
  }

  const title = pageData.metadata__metatitle?.value || pageData.heading.value;
  const description =
    pageData.metadata__metadescription?.value || pageData.content?.value || "";
  const ogImage = pageData.image?.value?.[0]?.url;
  const url = `${Globals.SITE_URL}news/${slug}`;

  return {
    metadataBase: new URL(Globals.SITE_URL),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blogsRes = await Globals.KontentClient.item("news_page_2026")
    .withParameter("depth", "2")
    .toPromise();
  const blogsData = JSON.parse(JSON.stringify(blogsRes.item));
  const pageData = blogsData.blogitems.value.find(
    (item: any) => item.slug.value === slug
  );

  if (!pageData) return notFound();

  return (
    <div className="blog-detail-page bg-white">
      <div className="">
        {/* <HeadBanner heading={pageData.heading.value}>
          <p className="text-sm text-gray-500">
            {pageData.system.lastModified
              ? new Date(pageData.system.lastModified).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )
              : ""}
          </p>
        </HeadBanner> */}

        <div className="py-30 bg-[#1E1E1E]">
          <div className="container mx-auto">
            <div className="grid sm:grid-cols-2 gap-5 items-center">
              <div>
                <h1 className="text-secondary text-3xl md:text-4xl">
                  {pageData.heading.value}
                </h1>
              </div>
              <div>
                <img
                  src={pageData.image.value[0]?.url}
                  alt={pageData.heading.value}
                  className="rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>

        <Section>
          <div className="container mx-auto">
            <article className="">
              <div
                className="prose prose-gray max-w-none leading-relaxed prose-headings:scroll-mt-24 prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3 prose-img:rounded-xl prose-img:border prose-img:border-gray-200"
                dangerouslySetInnerHTML={{ __html: pageData.content.value }}
              />
            </article>
          </div>
        </Section>
      </div>
    </div>
  );
}




export async function generateStaticParams() {
  const blogsRes = await Globals.KontentClient.item("news_page_2026")
    .withParameter("depth", "1")
    .toPromise();
  const blogsData = JSON.parse(JSON.stringify(blogsRes.item));
  return blogsData.blogitems.value.map((i: any) => ({ slug: i.slug.value }));
}

export const revalidate = 60;
