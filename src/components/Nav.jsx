import { profile } from "../data/content.js";

const LINKS = [
  ["#clipforge", "ClipForge"],
  ["#work", "Work"],
  ["#cv", "CV"],
  ["#contact", "Contact"],
];

export default function Nav() {
  return (
    <header className="border-b border-line bg-paper md:sticky md:top-0 md:z-30">
      <nav aria-label="Main" className="wrap flex flex-wrap items-center justify-between gap-x-6 md:h-18">
        <a href="#top" className="tap">
          <span className="link">{profile.name}</span>
        </a>
        {/* Equal padding on every link gives equal visible gaps: 16px on phones so all four fit one row, 24px from sm up. */}
        <ul className="-mx-2 flex flex-wrap sm:-mx-3">
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="tap px-2 sm:px-3">
                <span className="link">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
