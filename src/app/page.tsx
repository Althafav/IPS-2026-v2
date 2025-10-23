import ArticleCarousel from "@/components/Home/ArticleCarousel";

import FeatureSection from "@/components/Home/FeatureSection";
import GallerySection from "@/components/Home/GallerySection";
import HeroSection from "@/components/Home/HeroSection";
import PartnersCarousel from "@/components/Home/PartnersCarousel";
import PillarSection from "@/components/Home/PillarSection";
import YtVideoSection from "@/components/Home/YtVideoSection";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import Marquee from "react-fast-marquee";

export async function generateMetadata() {
  const response = await Globals.KontentClient.item("home_page_2026_demo")
    .withParameter("depth", "4")
    .toPromise();
  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: `${Globals.BASE_URL}`,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: `${Globals.BASE_URL}`,
      siteName: Globals.SITE_NAME,
      images: [
        {
          url: `${Globals.BASE_URL}assets/logos/ips-logo-thumbnail.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      images: [`${Globals.BASE_URL}assets/logos/ips-logo-thumbnail.jpg`],
    },
  };
}

export default async function Home() {
  const response = await Globals.KontentClient.item("home_page_2026_2")
    .withParameter("depth", "4")
    .toPromise();

  const pageData = JSON.parse(JSON.stringify(response.item));

  return (
    <div className="page">
      <HeroSection
        heading={pageData.bannerheading.value}
        subheading={pageData.bannersubheading.value}
        bannerimage={pageData.bannerimage.value[0]?.url}
        bannervideo={pageData.bannervideolink.value}
        statsitems={pageData.statsitems.value}
        ctabuttons={pageData.bannercta.value}
      />

      <PillarSection
        heading={pageData.pillarsheading.value}
        subheading={pageData.pillarsubheading.value}
        items={pageData.pillarsitems.value}
      />

      <Section>
        <div className="">
          <div className="">
            <Marquee className="" loop={0}>
              <div className="flex mx-3 gap-5">
                {pageData.statsitems.value.map((item: any, index: number) => {
                  return (
                    <div
                      className=" min-w-[150px] bg-primary rounded-xl p-5 flex flex-col justify-center gap-2"
                      key={index}
                    >
                      <h4 className="text-2xl sm:text-4xl font-bold  max-w-md  text-white">
                        {item.count.value}
                      </h4>
                      <p className=" text-white text-md">{item.name.value}</p>
                    </div>
                  );
                })}
              </div>
            </Marquee>
          </div>
        </div>
      </Section>

      <YtVideoSection
        heading={pageData.videoheading.value}
        description={pageData.videodescription.value}
        videolink={pageData.videolink.value}
      />

      <FeatureSection
        heading={pageData.featuresheading.value}
        subheading={pageData.featuresubheading.value}
        backgroundImage={pageData.featuresbackgroundimage.value[0]?.url}
        items={pageData.featureitems.value}
      />

      <GallerySection items={pageData.galleryitems.value} />

      <PartnersCarousel />
      <ArticleCarousel
        codename="blog_page_2026"
        colorCode="#25B3AD"
        href="/blogs"
      />
      <ArticleCarousel
        codename="news_page_2026"
        colorCode="#F68A41"
        href="/news"
      />
    </div>
  );
}

export const revalidate = 0;
