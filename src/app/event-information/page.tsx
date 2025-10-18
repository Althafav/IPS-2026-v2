import HeadBanner from "@/components/Blocks/HeadBanner";
import IframeEmbed from "@/components/Blocks/IframeEmbed";
import Heading2 from "@/components/UI/Heading2";
import Section from "@/components/UI/Section";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React from "react";


export async function generateMetadata() {
  const response = await Globals.KontentClient.item("event_information_page_2026")
    .withParameter("depth", "4")
    .toPromise();
  const pageData = JSON.parse(JSON.stringify(response.item));

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: Globals.BASE_URL,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: Globals.BASE_URL,
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

export default async function page() {
  const response = await Globals.KontentClient.item(
    "event_information_page_2026"
  )
    .withParameter("depth", "4")
    .toPromise();
  const pageData = JSON.parse(JSON.stringify(response.item));

  return (
    <div className="page">
      <HeadBanner
        bannerimage={pageData.bannerimage.value[0]?.url}
        bannerheading={pageData.bannerheading.value}
        bannersubheading={pageData.bannersubheading.value}
      />

      <Section>
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-5 items-center justify-end">
            <div>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: pageData.aboutcontent.value,
                }}
              />
            </div>

            <div className="flex sm:justify-center">
              <div className="inline-block rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {/* Row 1 */}
                    <tr className="border-b border-gray-200">
                      <td className="flex items-center gap-3 px-6 py-4 text-gray-700 font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="41"
                          height="41"
                          viewBox="0 0 41 41"
                          fill="none"
                        >
                          <path
                            d="M10.25 6.40625V4.2337C10.25 3.30811 10.9645 2.5625 11.8516 2.5625C12.7386 2.5625 13.4531 3.30811 13.4531 4.2337V6.40625H10.25ZM26.2656 24.6C26.2656 24.1047 26.6672 23.7031 27.1625 23.7031H30.4937C30.9891 23.7031 31.3906 24.1047 31.3906 24.6V27.9312C31.3906 28.4266 30.9891 28.8281 30.4937 28.8281H27.1625C26.6672 28.8281 26.2656 28.4266 26.2656 27.9312V24.6ZM9.60938 18.1937C9.60938 17.6984 10.0109 17.2969 10.5062 17.2969H13.8375C14.3328 17.2969 14.7344 17.6984 14.7344 18.1937V21.525C14.7344 22.0203 14.3328 22.4219 13.8375 22.4219H10.5062C10.0109 22.4219 9.60938 22.0203 9.60938 21.525V18.1937ZM10.8906 18.5781V21.1406H13.4531V18.5781H10.8906ZM17.9375 18.1937C17.9375 17.6984 18.339 17.2969 18.8344 17.2969H22.1656C22.661 17.2969 23.0625 17.6984 23.0625 18.1937V21.525C23.0625 22.0203 22.661 22.4219 22.1656 22.4219H18.8344C18.339 22.4219 17.9375 22.0203 17.9375 21.525V18.1937ZM19.2188 18.5781V21.1406H21.7812V18.5781H19.2188ZM26.2656 18.1937C26.2656 17.6984 26.6672 17.2969 27.1625 17.2969H30.4937C30.9891 17.2969 31.3906 17.6984 31.3906 18.1937V21.525C31.3906 22.0203 30.9891 22.4219 30.4937 22.4219H27.1625C26.6672 22.4219 26.2656 22.0203 26.2656 21.525V18.1937ZM27.5469 18.5781V21.1406H30.1094V18.5781H27.5469ZM9.60938 24.6C9.60938 24.1047 10.0109 23.7031 10.5062 23.7031H13.8375C14.3328 23.7031 14.7344 24.1047 14.7344 24.6V27.9312C14.7344 28.4266 14.3328 28.8281 13.8375 28.8281H10.5062C10.0109 28.8281 9.60938 28.4266 9.60938 27.9312V24.6ZM10.8906 24.9844V27.5469H13.4531V24.9844H10.8906ZM17.9375 24.6C17.9375 24.1047 18.339 23.7031 18.8344 23.7031H22.1656C22.661 23.7031 23.0625 24.1047 23.0625 24.6V27.9312C23.0625 28.4266 22.661 28.8281 22.1656 28.8281H18.8344C18.339 28.8281 17.9375 28.4266 17.9375 27.9312V24.6ZM19.2188 24.9844V27.5469H21.7812V24.9844H19.2188ZM9.60938 31.0063C9.60938 30.5109 10.0109 30.1094 10.5062 30.1094H13.8375C14.3328 30.1094 14.7344 30.5109 14.7344 31.0063V34.3375C14.7344 34.8328 14.3328 35.2344 13.8375 35.2344H10.5062C10.0109 35.2344 9.60938 34.8328 9.60938 34.3375V31.0063ZM10.8906 31.3906V33.9531H13.4531V31.3906H10.8906ZM17.9375 31.0063C17.9375 30.5109 18.339 30.1094 18.8344 30.1094H22.1656C22.661 30.1094 23.0625 30.5109 23.0625 31.0063V34.3375C23.0625 34.8328 22.661 35.2344 22.1656 35.2344H18.8344C18.339 35.2344 17.9375 34.8328 17.9375 34.3375V31.0063ZM19.2188 31.3906V33.9531H21.7812V31.3906H19.2188Z"
                            fill="#7E7E7E"
                          />
                          <path
                            d="M10.25 8.57881C10.25 9.5044 10.9645 10.25 11.8516 10.25C12.7386 10.25 13.4531 9.5044 13.4531 8.57881V6.40626L27.5469 6.40631V8.57881C27.5469 9.5044 28.2614 10.25 29.1484 10.25C30.0354 10.25 30.75 9.5044 30.75 8.57881V6.40631H34.9029C37.5542 6.40631 39.7188 8.57325 39.7188 11.2561V33.62C39.7188 36.9771 36.9961 39.7188 33.6217 39.7188H7.37828C4.019 39.7188 1.28125 36.9793 1.28125 33.62V11.2561C1.28125 8.57325 3.44579 6.39342 6.09703 6.40631L10.25 6.40626V8.57881ZM3.84375 14.0938V33.62C3.84375 35.5651 5.43509 37.1563 7.37828 37.1563H28.8409V35.2344H27.1625C26.6672 35.2344 26.2656 34.8328 26.2656 34.3375V31.0063C26.2656 30.5109 26.6672 30.1094 27.1625 30.1094H30.4937C30.5824 30.1094 30.668 30.1222 30.7488 30.1462C31.7044 29.3253 32.9457 28.8281 34.2991 28.8281H37.1562V14.0938H3.84375ZM28.8557 33.8847C28.9224 32.974 29.2144 32.124 29.6759 31.3906H27.5469V33.9531H28.8511C28.8525 33.9303 28.854 33.9075 28.8557 33.8847ZM30.1222 36.8909L36.9037 30.1094H34.2991C32.0725 30.1094 30.2401 31.8723 30.1277 34.072C30.124 34.143 30.1222 34.2144 30.1222 34.2863V36.8909Z"
                            fill="#7E7E7E"
                          />
                          <path
                            d="M27.5469 4.2337V6.4063H30.75V4.2337C30.75 3.30811 30.0354 2.5625 29.1484 2.5625C28.2614 2.5625 27.5469 3.30811 27.5469 4.2337Z"
                            fill="#7E7E7E"
                          />
                        </svg>
                        Show Dates
                      </td>
                      <td className="px-6 py-4 text-teal-600 font-semibold">
                        {pageData.showdate.value}
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr>
                      <td className="flex items-center gap-3 px-6 py-4 text-gray-700 font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="41"
                          height="41"
                          viewBox="0 0 41 41"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_674_127)">
                            <path
                              d="M34.9957 6.00426C31.1237 2.1324 25.9757 0 20.5 0C15.0243 0 9.87628 2.1324 6.00426 6.00426C2.1324 9.87628 0 15.0243 0 20.5C0 25.9757 2.1324 31.1237 6.00426 34.9957C9.87628 38.8676 15.0243 41 20.5 41C25.9757 41 31.1237 38.8676 34.9957 34.9957C38.8676 31.1237 41 25.9757 41 20.5C41 15.0243 38.8676 9.87628 34.9957 6.00426ZM33.297 33.297C29.8787 36.7152 25.3341 38.5977 20.5 38.5977C15.6659 38.5977 11.1213 36.7152 7.70304 33.297C4.28482 29.8787 2.40234 25.3341 2.40234 20.5C2.40234 15.6659 4.28482 11.1213 7.70304 7.70304C11.1213 4.28482 15.6659 2.40234 20.5 2.40234C25.3341 2.40234 29.8787 4.28482 33.297 7.70304C36.7152 11.1213 38.5977 15.6659 38.5977 20.5C38.5977 25.3341 36.7152 29.8787 33.297 33.297Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M21.7012 4.80757H19.2988V9.6161H21.7012V4.80757Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M14.8965 8.39115L13.6943 6.30899L11.6138 7.51016L12.816 9.59232L14.8965 8.39115Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M9.59192 12.8153L7.50977 11.6132L6.30859 13.6937L8.39075 14.8958L9.59192 12.8153Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M9.61615 19.2988H4.80762V21.7012H9.61615V19.2988Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M6.30859 27.3062L7.50977 29.3867L9.59192 28.1846L8.39075 26.1041L6.30859 27.3062Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M11.6138 33.4903L13.6943 34.6915L14.8965 32.6093L12.816 31.4081L11.6138 33.4903Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M21.7012 31.3839H19.2988V36.1924H21.7012V31.3839Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M26.1026 32.6091L27.3047 34.6912L29.3852 33.4901L28.183 31.4079L26.1026 32.6091Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M31.4081 28.185L33.4902 29.3871L34.6914 27.3066L32.6092 26.1045L31.4081 28.185Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M36.1923 19.2988H31.3838V21.7012H36.1923V19.2988Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M34.6904 13.6931L33.4893 11.6126L31.4071 12.8147L32.6083 14.8952L34.6904 13.6931Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M26.1041 8.39183L28.1846 9.593L29.3867 7.51085L27.3062 6.30968L26.1041 8.39183Z"
                              fill="#7E7E7E"
                            />
                            <path
                              d="M28.4438 17.3004L27.2426 15.22L22.8407 17.7614C22.2103 17.2217 21.3927 16.8946 20.4997 16.8946C20.2745 16.8946 20.0543 16.9164 19.8405 16.9561L16.098 10.4738L14.0176 11.675L17.7612 18.1591C17.2214 18.7895 16.8943 19.6071 16.8943 20.5002C16.8943 22.4882 18.5117 24.1056 20.4997 24.1056C22.4878 24.1056 24.1052 22.4882 24.1052 20.5002C24.1052 20.275 24.0834 20.0548 24.0437 19.841L28.4438 17.3004ZM20.4997 21.7031C19.8363 21.7031 19.2966 21.1634 19.2966 20.5C19.2966 19.8366 19.8363 19.2969 20.4997 19.2969C21.163 19.2969 21.7028 19.8366 21.7028 20.5C21.7028 21.1634 21.163 21.7031 20.4997 21.7031Z"
                              fill="#7E7E7E"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_674_127">
                              <rect width="41" height="41" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Timings
                      </td>
                      <td className="px-6 py-4 text-teal-600 font-semibold">
                        {pageData.showtiming.value}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <IframeEmbed src={pageData.maplink.value} />
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <Heading2 className="text-secondary mb-8">
            {pageData.directionheading.value}
          </Heading2>
          <div className="grid grid-cols-3 gap-5">
            {pageData.directionitems.value.map((item: any) => {
              return (
                <div className="" key={item.system.id}>
                  <div>
                    <img
                      src={item.image.value[0]?.url}
                      alt={item.name.value}
                      className="w-full aspect-video object-cover rounded-3xl"
                    />

                    <div className="p-2">
                      <h4 className="text-xl font-bold">{item.name.value}</h4>
                      <div
                        className="prose"
                        dangerouslySetInnerHTML={{ __html: item.content.value }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-5 items-center">
            <div>
              <Heading2 className="text-secondary">
                {pageData.parkingheading.value}
              </Heading2>
            </div>

            <div className="col-span-2">
              <img
                className="w-full h-full object-cover"
                src={pageData.parkingimage.value[0]?.url}
                alt={pageData.parkingheading.value}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-[#F5F5F5] p-5 rounded-3xl shadow">
              <h4 className="text-xl sm:text-3xl text-secondary mb-4">
                {pageData.admissionpolicyheading.value}
              </h4>
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: pageData.admissionpolicycontent.value,
                }}
              />
            </div>

            <div className="bg-[#F5F5F5] p-5 rounded-3xl shadow">
              <h4 className="text-xl sm:text-3xl text-secondary mb-4">
                {pageData.badgepolicyheading.value}
              </h4>
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: pageData.badgepolicycontent.value,
                }}
              />
            </div>
          </div>
          <div className="mt-10">
            <p className="text-primary">{pageData.importantnote.value}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-dark py-8 sm:py-12">
        <div className="container mx-auto">
          <Heading2 className="text-white text-center mb-8">
            {pageData.downloadappheading.value}
          </Heading2>
          <div className="flex justify-center gap-5">
            <Link href={pageData.iosapplink.value} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="89"
                height="89"
                viewBox="0 0 89 89"
                fill="none"
              >
                <g clipPath="url(#clip0_674_173)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M89 19.2834V69.7167C89.0051 72.2505 88.5098 74.7603 87.5425 77.1021C86.5752 79.444 85.155 81.5717 83.3634 83.3634C81.5717 85.155 79.444 86.5752 77.1021 87.5425C74.7603 88.5098 72.2505 89.0051 69.7167 89H19.2834C16.7496 89.0051 14.2398 88.5098 11.898 87.5425C9.55613 86.5752 7.42834 85.155 5.63671 83.3634C3.84508 81.5717 2.42487 79.444 1.45758 77.1021C0.490299 74.7603 -0.00502375 72.2505 3.84124e-05 69.7167V19.2834C-0.00502375 16.7496 0.490299 14.2398 1.45758 11.898C2.42487 9.55613 3.84508 7.42834 5.63671 5.63671C7.42834 3.84508 9.55613 2.42487 11.898 1.45758C14.2398 0.490299 16.7496 -0.00502375 19.2834 3.84124e-05H69.7167C72.2505 -0.00502375 74.7603 0.490299 77.1021 1.45758C79.444 2.42487 81.5717 3.84508 83.3634 5.63671C85.155 7.42834 86.5752 9.55613 87.5425 11.898C88.5098 14.2398 89.0051 16.7496 89 19.2834Z"
                    fill="url(#paint0_linear_674_173)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M61.2617 51.175H72.3126C73.3944 51.175 74.432 51.6048 75.197 52.3698C75.9619 53.1348 76.3917 54.1724 76.3917 55.2542C76.3917 56.3361 75.9619 57.3736 75.197 58.1386C74.432 58.9036 73.3944 59.3334 72.3126 59.3334H61.2617V51.175Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M47.6892 51.1751C48.46 51.1704 49.2239 51.3188 49.9369 51.6117C50.6498 51.9045 51.2976 52.3359 51.8426 52.8809C52.3876 53.4259 52.819 54.0736 53.1118 54.7866C53.4046 55.4995 53.553 56.2635 53.5484 57.0342C53.5514 57.8223 53.4002 58.6033 53.1034 59.3334H16.6876C15.6057 59.3334 14.5682 58.9036 13.8032 58.1386C13.0382 57.3736 12.6084 56.3361 12.6084 55.2542C12.6084 54.1724 13.0382 53.1348 13.8032 52.3698C14.5682 51.6048 15.6057 51.1751 16.6876 51.1751H47.6892ZM46.6509 24.3267V31.4467H41.9042L36.1192 21.5084C35.8651 21.0701 35.6999 20.5859 35.6331 20.0837C35.5663 19.5815 35.5991 19.071 35.7297 18.5815C35.8603 18.092 36.0862 17.633 36.3943 17.2308C36.7025 16.8287 37.0869 16.4912 37.5256 16.2377C37.9643 15.9843 38.4487 15.8198 38.951 15.7537C39.4533 15.6875 39.9637 15.7211 40.4531 15.8524C40.9424 15.9838 41.401 16.2103 41.8028 16.519C42.2045 16.8278 42.5414 17.2127 42.7942 17.6517L46.6509 24.3267ZM50.7301 31.2242L70.9776 66.3051C71.5185 67.2394 71.6661 68.3503 71.3879 69.3935C71.1098 70.4367 70.4286 71.3266 69.4942 71.8676C68.5599 72.4085 67.4489 72.5561 66.4058 72.2779C65.3626 71.9997 64.4727 71.3186 63.9317 70.3842L51.6942 49.0984C50.5817 47.0217 49.7659 45.3901 49.2467 44.5001C48.0279 42.4236 47.5138 40.0084 47.7811 37.6155C48.0485 35.2226 49.083 32.9805 50.7301 31.2242Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M34.1167 54.8834H24.6975L45.9834 18.0226C46.5243 17.0883 47.4142 16.4071 48.4574 16.1289C49.5006 15.8507 50.6115 15.9983 51.5459 16.5393C52.4802 17.0802 53.1614 17.9701 53.4396 19.0133C53.7177 20.0565 53.5701 21.1674 53.0292 22.1018L34.1167 54.8834ZM29.1475 63.4126L25.2167 70.3101C24.9489 70.7727 24.5925 71.1781 24.168 71.503C23.7435 71.8279 23.2592 72.0661 22.7427 72.2038C22.2261 72.3415 21.6875 72.3762 21.1576 72.3058C20.6277 72.2354 20.1168 72.0613 19.6542 71.7934C19.1916 71.5256 18.7862 71.1693 18.4613 70.7448C18.1364 70.3203 17.8982 69.8359 17.7605 69.3194C17.6228 68.8029 17.5881 68.2643 17.6585 67.7344C17.7289 67.2044 17.903 66.6936 18.1709 66.2309L21.0634 61.1876C21.9616 60.7407 22.9526 60.512 23.9559 60.5201C25.0022 60.4858 26.0383 60.7368 26.9528 61.2464C27.8674 61.7559 28.6261 62.5048 29.1475 63.4126Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_674_173"
                    x1="44.4993"
                    y1="89"
                    x2="44.4993"
                    y2="4.24385e-05"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#1D6FF2" />
                    <stop offset="1" stop-color="#1AC8FC" />
                  </linearGradient>
                  <clipPath id="clip0_674_173">
                    <rect width="89" height="89" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <Link href={pageData.androidapplink.value} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="89"
                height="89"
                viewBox="0 0 89 89"
                fill="none"
              >
                <rect width="89" height="89" rx="26" fill="white" />
                <path d="M29 18L73 45L29 72V18Z" fill="#518FF5" />
                <path
                  d="M29.0023 18L58.6623 54L73 45.1523L29.0023 18Z"
                  fill="#34A853"
                />
                <path
                  d="M58.6305 36L29 71.9481V72L73 44.8631L58.6305 36Z"
                  fill="#DD5044"
                />
                <path
                  d="M58.3953 36L51 44.9784L58.433 54L73 45.012L58.3953 36Z"
                  fill="#F5BA15"
                />
              </svg>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
