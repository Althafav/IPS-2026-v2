import ArticleCarousel from "@/components/Home/ArticleCarousel";

import FeatureSection from "@/components/Home/FeatureSection";
import GallerySection from "@/components/Home/GallerySection";
import HeroSection from "@/components/Home/HeroSection";
import PartnersCarousel from "@/components/Home/PartnersCarousel";
import PillarSection from "@/components/Home/PillarSection";
import YtVideoSection from "@/components/Home/YtVideoSection";
import Globals from "@/modules/Globals";


export default async function Home() {
  const response = await Globals.KontentClient.item("home_page_2026_demo")
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
        ctabuttons={pageData.bannercta.value}
      />

      <PillarSection
        heading={pageData.pillarsheading.value}
        subheading={pageData.pillarsubheading.value}
        items={pageData.pillarsitems.value}
      />

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
      <ArticleCarousel codename="blog_page_2026" colorCode="#25B3AD" href="/blogs" />
      <ArticleCarousel codename="news_page_2026" colorCode="#F68A41" href="/news"/>
    </div>
  );
}
