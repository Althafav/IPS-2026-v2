"use client";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useMemo, JSX } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type SplitTextProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const HIGHLIGHT_WORDS = ["Presence.", "Impact."];
const HIGHLIGHT_COLOR = "#099FFC";

export default function SplitText({
  text,
  as: Tag = "h1",
  className,
}: SplitTextProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  const words = useMemo(() => text.split(/(\s+)/), [text]);

  useGSAP(
    () => {
      if (!rootRef.current) return;

      const ctx = gsap.context(() => {
        const targets = rootRef.current!.querySelectorAll(".word");

        gsap.fromTo(
          targets,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, rootRef);

      return () => ctx.revert();
    },
    { dependencies: [text] }
  );

  return (
    <div ref={rootRef as any} className={className}>
      {words.map((w, i) => {
        const trimmed = w.trim();

        const isHighlighted = HIGHLIGHT_WORDS.includes(trimmed);

        return (
          <span
            key={i}
            className="word inline-block whitespace-pre"
            style={{
              color: isHighlighted ? HIGHLIGHT_COLOR : "inherit",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
}

//  <SplitText
//             text={bannerheading}
//             as="h1"
//             className="text-white text-3xl sm:text-7xl max-w-3xl font-bold mb-4"
//           />
