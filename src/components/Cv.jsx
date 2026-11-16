import { education, skills } from "../data/content.js";

export default function Cv() {
  return (
    <section id="cv" className="wrap pt-24 pb-12 lg:pt-[120px] lg:pb-[72px]">
      <h2 className="max-w-[24ch] text-title">
        CV. <span className="text-muted">Education first, then each tool with the project it was used in.</span>
      </h2>

      <div className="mt-8 grid gap-y-4 border-t border-line pt-6 lg:mt-12 lg:grid-cols-12 lg:gap-x-6">
        <p className="meta lg:col-span-4">Education</p>
        <ul className="grid gap-y-8 lg:col-span-8 lg:col-start-5">
          {education.map((e) => (
            <li key={e.title}>
              <h3 className="text-h3">{e.title}</h3>
              <p className="meta mt-2">
                {e.place} · {e.period}
              </p>
              <p className="mt-4 max-w-[62ch]">{e.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 grid gap-y-4 border-t border-line pt-6 lg:grid-cols-12 lg:gap-x-6">
        <p className="meta lg:col-span-4">Skills</p>
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:col-span-8 lg:col-start-5">
          {skills.map((g) => (
            <div key={g.group}>
              <h4 className="text-h4">{g.group}</h4>
              <ul className="mt-3 border-b border-line">
                {g.items.map((s) => (
                  <li
                    key={s.name}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line py-3"
                  >
                    <span>{s.name}</span>
                    <span className="meta">{s.evidence}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
