"use client";
import Image from "next/image";
import React, { useState } from "react";
import IPSWomenSpeakerPopupCard from "./IPSWomenSpeakerPopupCard";

export default function IPSWomenSpeakerCard({ speaker }: any) {
  const [selectedSpeaker, setSelectedSpeaker] = useState<any | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (speaker: any) => {
    setSelectedSpeaker(speaker);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedSpeaker(null);
    setIsPopupOpen(false);
  };
  return (
    <>
      <div
        className="shadow bg-white rounded-3xl overflow-hidden"
        onClick={() => openPopup(speaker)}
      >
        <div>
          <div className="speaker-item ">
            <div>
              <div>
                <div className="image-wrapper">
                  <Image
                    width={300}
                    height={350}
                    className="speaker-image aspect-square object-cover object-top"
                    src={speaker.image.value[0]?.url}
                    alt={speaker.name.value}
                  />
                </div>
                <div className="speaker-content p-4">
                  <h4 className="speaker-name text-secondary font-bold text-lg mb-2">
                    {speaker.name.value}
                  </h4>
                  <p className="font-light text-gray-600 text-sm">
                    {speaker.designation.value}
                  </p>
                  <p className="font-light text-gray-600 text-sm">
                    {speaker.organization.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <IPSWomenSpeakerPopupCard
        speaker={selectedSpeaker}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </>
  );
}
