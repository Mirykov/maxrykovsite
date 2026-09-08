"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import PillButton from "./PillButton";

const links = [
  { href: "/#what-we-do", label: "What We Do" },
  { href: "/#selected-work", label: "Selected Work" },
  { href: "/#meet-max", label: "Meet Max" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
        <Link href="/" className="font-display font-bold uppercase tracking-wide text-lg text-anchor">
          Max Rykov
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm uppercase tracking-wide text-ink hover:text-anchor transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <PillButton href="/start" variant="outline-dark" className="!px-5 !py-2">
            Start a Project
          </PillButton>
        </nav>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10 px-6 py-4 flex flex-col gap-4 bg-paper">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display uppercase tracking-wide text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <PillButton href="/start" variant="outline-dark" className="self-start">
            Start a Project
          </PillButton>
        </div>
      )}
    </header>
  );
}
