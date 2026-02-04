"use client";
import SpeakerPopupBanner from "@/components/Popups/SpeakerPopupBanner";
import Image from "next/image";
import React, { useState } from "react";

export default function SpeakerCard({ speaker }: any) {
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
        className="shadow bg-white rounded-3xl overflow-hidden h-full"
      
      >
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
                  <p className="font-light text-gray-600 text-sm uppercase mb-2">
                    {speaker.Designation}
                  </p>
                  <p className="font-bold text-gray-600 text-sm uppercase">
                    {speaker.Company}
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SpeakerPopupBanner
        speaker={selectedSpeaker}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </>
  );
}
