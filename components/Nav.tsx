"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import site from "@/content/site.json";
import Logo from "./og/Logo";
import Button from "./og/Button";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-og-ink/10 bg-og-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:h-20">
        <Link href="/" aria-label="OddGood Events home" className="shrink-0">
          <Logo kind="wordmark" className="h-6 w-auto min-[400px]:h-7 md:hidden" />
          <Logo className="hidden h-12 w-auto md:block" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {site.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`font-semibold transition-colors hover:text-og-red ${
                isActive(link.href) ? "text-og-red" : "text-og-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button href={site.primaryCta.href} className="whitespace-nowrap !px-5 !py-2.5 !text-sm">
            {site.primaryCta.label}
          </Button>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <Button href={site.primaryCta.href} className="whitespace-nowrap !px-3.5 !py-2 !text-[0.8rem]">
            {site.primaryCta.label}
          </Button>
          <button
            className="rounded-full p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="flex flex-col gap-1 border-t border-og-ink/10 bg-og-cream px-4 py-3 md:hidden"
        >
          {site.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="rounded-lg px-2 py-3 text-lg font-semibold"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
