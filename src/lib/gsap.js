// Register GSAP plugins once. Every component imports from here, never from "gsap" directly.
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Use with gsap.matchMedia(): animations only exist while this matches,
// so reduced-motion visitors get the static page with nothing hidden.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_POINTER = "(hover: hover) and (pointer: fine)";

export { gsap, useGSAP, ScrollTrigger, SplitText };
