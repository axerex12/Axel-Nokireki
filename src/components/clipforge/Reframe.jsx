import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap.js";

// Source drawing in a 160 x 90 (16:9) space; the clip in a 90 x 160 (9:16) space.
// Every shape sits wholly inside or wholly outside each crop (game crops span
// x 37.8-122.2 in split and 54.7-105.3 in game), so no borders get sliced.
const W = 160;
const CW = 90;
const CH = 160;
const CAM = { x: 4, y: 4, w: 28, h: 21 }; // webcam rectangle
// Crops sit 1.5 units inside the webcam so its border never enters the clip.
const REGION = { cam: { x: 5.5, y: 5.5, w: 25, h: 18 }, game: { x: 0, y: 0, w: W, h: 90 } };
const SPLIT = 0.4; // webcam share of the clip height in "split"; matches top-[40%] on the divider

// Where each layer lands in the 9:16 clip, as [x, y, w, h] fractions. null = not shown.
const FULL = [0, 0, 1, 1];
const VIEWS = {
  cam: { cam: FULL, game: null },
  split: { cam: [0, 0, 1, SPLIT], game: [0, SPLIT, 1, 1 - SPLIT] },
  game: { cam: null, game: FULL },
};
// Hidden layers fold away toward the edge they sit on in "split".
const HIDDEN = { cam: "inset(0% 0% 100% 0%)", game: "inset(100% 0% 0% 0%)" };

// Largest centred crop of rect r with aspect a (width / height).
const fit = (r, a) => {
  const w = Math.min(r.w, r.h * a);
  const h = w / a;
  return { x: r.x + (r.w - w) / 2, y: r.y + (r.h - h) / 2, w, h };
};
const inset = ([x, y, w, h]) =>
  `inset(${y * 100}% ${(1 - x - w) * 100}% ${(1 - y - h) * 100}% ${x * 100}%)`;
const cap = (s) => s[0].toUpperCase() + s.slice(1);

function Art() {
  return (
    <>
      <polyline points="0,66 24,60 46,64 70,54 96,60 118,52 140,58 160,54" />
      <rect x="76" y="42" width="6" height="12" />
      <circle cx="132" cy="22" r="6" />
      <rect x="8" y="78" width="24" height="5" />
      <rect x="128" y="78" width="24" height="5" />
      <rect x={CAM.x} y={CAM.y} width={CAM.w} height={CAM.h} style={{ fill: "var(--color-paper)" }} />
      <circle cx="18" cy="12.5" r="4.5" />
      <path d="M10 25 A8 8 0 0 1 26 25" />
    </>
  );
}

export default function Reframe({ layouts }) {
  const [sel, setSel] = useState("split");
  const root = useRef(null);
  const clicked = useRef(false);
  const pose = useRef({}); // per layer: the art group's current { k, x, y }
  const current = layouts.find((l) => l.id === sel);

  // A click swaps the diagram state; first paint and reduced motion jump straight there.
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const d = clicked.current && window.matchMedia(MOTION_OK).matches ? 0.5 : 0;
      const v = { duration: d, ease: "power3.inOut", overwrite: "auto" };

      for (const layer of ["cam", "game"]) {
        const T = VIEWS[sel][layer];
        const P = T ?? FULL;
        const R = fit(REGION[layer], (P[2] * CW) / (P[3] * CH));
        const k = (CW * P[2]) / R.w;
        // Maps crop R onto target P in the clip's own SVG space. We tween plain numbers and
        // write the transform attribute ourselves: GSAP's svgOrigin smoothing shifted the
        // offsets on every tween after the first, so the art landed in the wrong place.
        const to = { k, x: CW * P[0] - R.x * k, y: CH * P[1] - R.y * k };
        const art = q(`[data-art="${layer}"]`)[0];
        const p = (pose.current[layer] ??= { ...to });
        const write = () => art.setAttribute("transform", `translate(${p.x} ${p.y}) scale(${p.k})`);
        if (d) gsap.to(p, { ...v, ...to, onUpdate: write });
        else write(Object.assign(p, to));

        gsap.to(q(`[data-pane="${layer}"]`), { ...v, clipPath: T ? inset(T) : HIDDEN[layer] });
        gsap.to(q(`[data-crop="${layer}"]`), {
          ...v,
          attr: { x: R.x, y: R.y, width: R.w, height: R.h },
          opacity: T ? 1 : 0,
        });
      }
      gsap.to(q(".cf-divider"), { ...v, opacity: sel === "split" ? 1 : 0 });
    },
    { scope: root, dependencies: [sel] }
  );

  return (
    <div ref={root} className="mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-6">
      <h3 className="text-h3 lg:col-span-4">
        Reframing. <span className="text-muted">A 16:9 stream becomes a 9:16 clip in one of three layouts.</span>
      </h3>

      <div className="mt-8 lg:col-span-8 lg:mt-0">
        <div
          aria-hidden="true"
          className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:gap-6"
        >
          <div>
            <p className="meta">source 16:9</p>
            <div className="relative mt-3 aspect-video border border-line text-muted">
              <svg viewBox={`0 0 ${W} 90`} overflow="visible" className="cf-art absolute inset-0 h-full w-full">
                <g fill="none" stroke="currentColor" strokeWidth="1">
                  <Art />
                </g>
                {["cam", "game"].map((l) => (
                  <rect key={l} data-crop={l} x="0" y="0" width="1" height="1" fill="none" stroke="var(--color-accent)" />
                ))}
              </svg>
            </div>
          </div>
          <div>
            <p className="meta">clip 9:16</p>
            <div className="relative mt-3 aspect-[9/16] overflow-hidden border border-line text-muted">
              {["cam", "game"].map((l) => (
                <div key={l} data-pane={l} className="absolute inset-0">
                  <svg viewBox={`0 0 ${CW} ${CH}`} className="cf-art absolute inset-0 h-full w-full">
                    <g data-art={l} fill="none" stroke="currentColor" strokeWidth="1">
                      <Art />
                    </g>
                  </svg>
                </div>
              ))}
              <div className="cf-divider absolute inset-x-0 top-[40%] h-px bg-line" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div role="group" aria-label="Clip layout" className="grid shrink-0 grid-cols-3 gap-2 sm:w-96">
            {layouts.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={sel === l.id}
                onClick={() => {
                  clicked.current = true;
                  setSel(l.id);
                }}
                className={`btn px-4 ${sel === l.id ? "" : "btn-ghost"}`}
              >
                {cap(l.label)}
              </button>
            ))}
          </div>
          <p aria-live="polite">{current.text}</p>
        </div>
      </div>
    </div>
  );
}
