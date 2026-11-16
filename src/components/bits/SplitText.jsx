// Adapted from react-bits SplitText by DavidHDev (MIT + Commons Clause): https://github.com/DavidHDev/react-bits
import { useRef } from "react";
import { gsap, useGSAP, SplitText as GSAPSplitText, MOTION_OK } from "../../lib/gsap.js";

// Reveals the text line by line from behind a mask, once, on load. No wait for
// fonts: autoSplit re-splits when they land and the new tween resumes progress.
export default function SplitText({ tag: Tag = "p", className = "", children }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        GSAPSplitText.create(ref.current, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 130,
              duration: 0.7,
              stagger: 0.1,
              ease: "expo.out",
            }),
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
