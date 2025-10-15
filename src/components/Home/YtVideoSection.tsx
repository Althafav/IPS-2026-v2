import React from "react";
import Section from "../UI/Section";
import Heading2 from "../UI/Heading2";

export default function YtVideoSection({
  heading,
  description,
  videolink,
}: any) {
  return (
    <Section>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-10 items-center">
          <div className="sm:col-span-2">
            <Heading2>{heading}</Heading2>
            <p>{description}</p>
          </div>

          <div className="sm:col-span-3">
            <iframe
              src={videolink}
              title={heading || "Video"}
              className="w-full h-64 sm:h-96"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
