import Link from "next/link";
import site from "@/content/site.json";
import Logo from "./og/Logo";

export default function Footer() {
  return (
    <footer className="on-dark bg-og-ink text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo kind="wordmark" white className="mb-4 h-10 w-auto" />
          <p className="font-display text-xl text-og-yellow">{site.tagline}</p>
          <p className="mt-4 text-sm">{site.location}</p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4 text-white/60">Explore</p>
          <ul className="space-y-2">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-og-yellow">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4 text-white/60">Get in touch</p>
          <ul className="space-y-2">
            <li>
              <Link href="/book" className="font-semibold text-og-yellow hover:underline">
                Book a call
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-og-yellow">
                {site.email}
              </a>
            </li>
            {/* Social links stay hidden until Max confirms the real handles in content/site.json */}
            {site.social.filter((s) => s.confirmed).map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-og-yellow" rel="noopener" target="_blank">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-white/50 sm:px-6">
          &copy; {new Date().getFullYear()} OddGood Events
        </p>
      </div>
    </footer>
  );
}
