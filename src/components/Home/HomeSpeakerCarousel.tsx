"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import SpeakerCard from "@/components/SpeakerCard";
import Section from "../UI/Section";
import AutoScroll from "embla-carousel-auto-scroll";
import Heading2 from "../UI/Heading2";
import SpeakerCardLoader from "../UI/SpeakerCardLoader";

interface Speaker {
  HighLevel?: boolean;
  HighLevelDignitary?: boolean;
  [key: string]: any;
}

export default function HomeSpeakersCarousel() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  // 👉 Simple Embla config
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch(
          "https://speakers.aimcongress.com/api/Website/GetApprovedSpeakers?eventid=6fb9b8ce-22cf-48ea-95c4-4d776e0e11f4",
          { cache: "no-store" },
        );

        const data: Speaker[] = await res.json();

        // Priority sort
        data.sort((a, b) => {
          const p = (s: Speaker) =>
            s.HighLevelDignitary ? 1 : s.HighLevel ? 2 : 3;

          return p(a) - p(b);
        });

        setSpeakers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  /* ---------------- STATES ---------------- */
  if (loading) {
    return (
      <div className="overflow-hidden py-5">
        <div className="flex gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="
              flex-[0_0_80%]
              sm:flex-[0_0_45%]
              lg:flex-[0_0_22%]
            "
            >
              <SpeakerCardLoader />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!speakers.length) {
    return <div className="py-20 text-center">Speakers coming soon</div>;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="overflow-hidden py-5" ref={emblaRef}>
      <div className="flex gap-5">
        {speakers.map((speaker, index) => (
          <div
            key={index}
            className="
              flex-[0_0_80%]
              sm:flex-[0_0_45%]
              lg:flex-[0_0_22%]
            "
          >
            <SpeakerCard speaker={speaker} />
          </div>
        ))}
      </div>
    </div>
  );
}
