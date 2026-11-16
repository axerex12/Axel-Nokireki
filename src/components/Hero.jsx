import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap.js";
import { profile } from "../data/content.js";
import SplitText from "./bits/SplitText.jsx";

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Starts at 0.3s, overlapping the headline; done by about 1s.
        gsap.from(".hero-rest", {
          y: 12,
          autoAlpha: 0,
          duration: 0.5,
          delay: 0.3,
          stagger: 0.08,
          ease: "power3.out",
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      className="wrap flex min-h-[calc(100svh-88px)] flex-col pt-8 pb-6 md:min-h-[calc(100svh-72px)] md:pt-12"
    >
      <SplitText tag="h1" className="text-hero leading-[0.9] tracking-[-0.04em]">
        Axel
        <br />
        Nokireki
      </SplitText>

      <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-8 lg:col-start-5">
          <p className="hero-rest max-w-[62ch] text-lead">{profile.statement}</p>
          <div className="hero-rest mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#clipforge" className="btn">
              Read the ClipForge case study
            </a>
            <a href={profile.links.github} className="tap">
              <span className="link">View GitHub profile</span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-rest mt-auto pt-12">
      <dl className="grid border-t border-line md:grid-cols-3 lg:grid-cols-12 lg:gap-x-6">
        {profile.now.map(({ label, value }) => (
          <div
            key={label}
            className="border-t border-line py-4 first:border-t-0 md:border-t-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 lg:col-span-4 lg:border-l-0 lg:px-0"
          >
            <dt className="meta">{label}</dt>
            <dd className="mt-1">{value}</dd>
          </div>
        ))}
      </dl>
      </div>
    </section>
  );
}
