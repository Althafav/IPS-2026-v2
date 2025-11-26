import Image from "next/image";
import React from "react";
import Section from "../UI/Section";

export default function GallerySection({ items }: any) {
  return (
    <Section>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {items.map((item: any, index: number) => {
          return (
            <div key={index} className="">
              <Image width={1080} height={600} src={item?.url} alt="" />
            </div>
          );
        })}
      </div>
    </Section>
  );
}
