import { projects } from "../data/content.js";
import restaurant from "../assets/restaurant.webp";
import eva from "../assets/eva.webp";

const IMAGES = {
  restaurant: { src: restaurant, width: 1280, height: 816, alt: "Screenshot of the Restaurant App" },
  eva: { src: eva, width: 1270, height: 961, alt: "Screenshot of the Evangelion Title Card Generator" },
};

export default function Work() {
  return (
    <section id="work" className="wrap pt-24 pb-12 lg:pt-[120px] lg:pb-[72px]">
      <h2 className="max-w-[24ch] text-title">
        Selected work. <span className="text-muted">Projects from coursework, team work and my own time.</span>
      </h2>

      <ul className="mt-8 border-b border-line lg:mt-12">
        {projects.map((p) => {
          const image = p.image && IMAGES[p.image];
          return (
            <li
              key={p.title}
              className="group grid gap-y-4 border-t border-line py-8 lg:grid-cols-12 lg:gap-x-6 lg:py-12"
            >
              <div className="meta lg:col-span-4">
                <p>{p.year}</p>
                <p className="mt-1">{p.kind}</p>
                <p className="mt-1">{p.detail}</p>
              </div>

              <div className="lg:col-span-8 lg:col-start-5">
                <h3 className="text-h3 transition-colors duration-200 group-hover:text-accent group-focus-within:text-accent">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-[62ch]">{p.text}</p>
                <ul className="meta mt-4 flex flex-wrap gap-x-3 gap-y-1" aria-label="Tech">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {image && (
                  <div className="mt-6 aspect-[16/10] max-w-[560px] overflow-hidden border border-line">
                    <img
                      className="h-full w-full object-cover object-top motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02]"
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="tap mt-4 gap-2">
                    <span className="link">{p.linkLabel}</span>
                    <span
                      aria-hidden="true"
                      className="inline-block motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-[3px]"
                    >
                      ↗
                    </span>
                    <span className="sr-only">: {p.title} (opens in a new tab)</span>
                  </a>
                ) : (
                  <p className="meta mt-4">{p.linkLabel}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
