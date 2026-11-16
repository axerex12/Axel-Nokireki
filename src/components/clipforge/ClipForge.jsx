import { clipforge as cf } from "../../data/content.js";
import Pipeline from "./Pipeline.jsx";
import Reframe from "./Reframe.jsx";
import { nb } from "./text.js";
import "./clipforge.css";

export default function ClipForge() {
  return (
    <section id="clipforge" className="room">
      <div className="wrap pt-24 pb-12 lg:pt-[120px] lg:pb-[72px]">
        <h2 className="text-display">{cf.name}</h2>

        <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-x-6">
          <p className="text-title leading-[1.08] font-medium tracking-[-0.03em] lg:col-span-10">{cf.tagline}</p>
        </div>

        <div className="mt-12 flex flex-col gap-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
          <p className="max-w-[62ch] leading-[1.7] lg:order-2 lg:col-span-8">{cf.summary}</p>
          <dl className="border-b border-line lg:order-1 lg:col-span-4">
            {cf.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 border-t border-line py-3">
                <dt className="meta shrink-0">{f.label}</dt>
                <dd className="text-right">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Pipeline stages={cf.stages} />
        <Reframe layouts={cf.layouts} />

        <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-6">
          <h3 className="text-h3 lg:col-span-4">
            Details. <span className="text-muted">Six decisions that make it work.</span>
          </h3>
          <ul className="mt-8 grid gap-x-6 border-b border-line md:grid-cols-2 lg:col-span-8 lg:mt-0">
            {cf.highlights.map((h) => (
              <li key={h.title} className="border-t border-line py-8">
                <p className="font-mono text-h3 leading-none whitespace-nowrap text-accent tabular-nums">{nb(h.figure)}</p>
                <h4 className="mt-6 text-h4">{h.title}</h4>
                <p className="mt-2 max-w-[62ch] leading-[1.65]">{nb(h.text)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-3 border-y border-line py-6 lg:mt-24 lg:grid-cols-12 lg:items-baseline">
          <p id="cf-stack" className="meta lg:col-span-4">
            Built with
          </p>
          <ul aria-labelledby="cf-stack" className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[14px] lg:col-span-8">
            {cf.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
