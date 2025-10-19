import Image from "next/image";
import React from "react";

export default function SpeakerCard({ speaker }: any) {
  return (
    <div className="shadow bg-white rounded-3xl overflow-hidden">
      <div>
        <div className="speaker-item ">
          <div>
            <div>
              <div className="image-wrapper">
                {speaker.Image &&
                typeof speaker.Image === "string" &&
                !speaker.Image.endsWith(".pdf") ? (
                  <Image
                    width={300}
                    height={350}
                    className="speaker-image aspect-square object-cover object-top"
                    src={speaker.Image}
                    alt={speaker.FirstName}
                  />
                ) : (
                  <img src="/assets/imgs/placeholder-person.png" alt="" />
                )}
              </div>
              <div className="speaker-content p-4">
                <h4 className="speaker-name text-secondary font-bold text-lg mb-2">
                  {speaker.FirstName} {speaker.LastName}
                </h4>
                <p className="font-light text-gray-600 text-sm">
                  {speaker.Designation}
                </p>
                <p className="font-light text-gray-600 text-sm">
                  {speaker.Company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
