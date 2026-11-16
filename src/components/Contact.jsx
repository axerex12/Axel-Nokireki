import { profile } from "../data/content.js";

export default function Contact() {
  const { github, email, linkedin } = profile.links;
  const [host, user] = github.replace(/^https?:\/\//, "").split("/");
  const extra = [
    email && { href: `mailto:${email}`, label: email },
    linkedin && { href: linkedin, label: "LinkedIn" },
  ].filter(Boolean);

  return (
    <footer id="contact" className="wrap pt-24 lg:pt-[120px]">
      <h2 className="max-w-[24ch] text-title">
        Contact. <span className="text-muted">The fastest way to reach me is GitHub.</span>
      </h2>

      <a href={github} className="tap mt-8 text-title leading-none tracking-[-0.03em] lg:mt-12">
        <span className="link">
          {host}/<wbr />
          {user}
        </span>
      </a>

      {extra.length > 0 && (
        <ul className="mt-8 flex flex-wrap gap-x-8">
          {extra.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="tap">
                <span className="link">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="meta mt-24 flex flex-wrap items-center justify-between gap-x-8 border-t border-line py-4 lg:mt-32">
        <p>© 2026 {profile.name}</p>
        <a href={github} className="tap">
          <span className="link">GitHub</span>
        </a>
      </div>
    </footer>
  );
}
