import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "../../lib/gsap.js";
import { nb, pad } from "./text.js";

// The one scroll-linked moment: a playhead scrubbed down the stage rail.
// Native scroll only; the left column sticks with CSS, nothing is pinned.
// Without motion (or JS) the list is static: no playhead, no counter, indices in ink.
export default function Pipeline({ stages }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current;
        const q = gsap.utils.selector(el);
        const [rail] = q(".cf-rail");
        const [num] = q(".cf-live-num");
        const [label] = q(".cf-live-label");
        const items = q(".cf-stage");

        // cur = index of the stage the playhead last passed; -1 before the first.
        const show = (cur) => {
          items.forEach((li, j) => (li.dataset.state = j < cur ? "passed" : j === cur ? "current" : "ahead"));
          const i = Math.max(cur, 0);
          num.textContent = pad(i + 1);
          label.textContent = stages[i].label;
        };

        el.classList.add("cf-on");
        show(-1);

        items.forEach((li, i) => {
          ScrollTrigger.create({
            trigger: li,
            start: "top center",
            onEnter: () => show(i),
            onLeaveBack: () => show(i - 1),
          });
        });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: rail,
              start: "top center",
              end: "bottom center",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(q(".cf-fill"), { scaleY: 0 }, { scaleY: 1 }, 0)
          .fromTo(q(".cf-tick"), { y: 0 }, { y: () => rail.offsetHeight }, 0);

        return () => {
          el.classList.remove("cf-on");
          items.forEach((li) => delete li.dataset.state);
        };
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-6">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-24">
          <h3 className="text-h3">
            Pipeline. <span className="text-muted">Twelve stages, from a raw VOD to a published clip.</span>
          </h3>
          <div aria-hidden="true" className="mt-12 hidden lg:block">
            <div className="cf-live">
              <p className="font-mono text-h3 leading-none tabular-nums">
                <span className="cf-live-num">01</span> / {pad(stages.length)}
              </p>
              <p className="cf-live-label meta mt-3">{stages[0].label}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cf-rail relative mt-8 lg:col-span-8 lg:mt-0">
        <span aria-hidden="true" className="absolute top-0 left-0 h-full w-px bg-line" />
        <span aria-hidden="true" className="cf-head cf-fill absolute top-0 left-0 h-full w-px origin-top bg-accent" />
        {/* 24 x 2 playhead, centred on the 1px rail */}
        <span aria-hidden="true" className="cf-head cf-tick absolute -top-px left-[-11.5px] h-0.5 w-6 bg-accent" />
        <ol className="pl-8 lg:pl-12">
          {stages.map((s, i) => (
            <li key={s.id} className="cf-stage pb-12 last:pb-0">
              <span className="cf-idx font-mono text-meta tabular-nums">{pad(i + 1)}</span>
              <h4 className="mt-2 text-h4">{s.label}</h4>
              <p className="mt-2 max-w-[62ch] leading-[1.65]">{nb(s.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
