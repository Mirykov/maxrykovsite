import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p>&copy; {new Date().getFullYear()} Max Rykov. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/#what-we-do" className="hover:text-accent transition-colors">
            What We Do
          </Link>
          <Link href="/work" className="hover:text-accent transition-colors">
            Selected Work
          </Link>
          <Link href="/start" className="hover:text-accent transition-colors">
            Start a Project
          </Link>
        </div>
      </div>
    </footer>
  );
}
