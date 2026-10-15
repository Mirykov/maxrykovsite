import type { Metadata } from "next";
import BookCall from "@/components/book/BookCall";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a 15-minute call about hosting or a 30-minute call about a custom game show or event with OddGood Events. No pitch, no pressure.",
};

export default async function BookPage({ searchParams }: PageProps<"/book">) {
  // Links like /book?type=host preselect the call type
  const { type } = await searchParams;
  const initialType = type === "host" || type === "custom" ? type : null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <h1 className="font-display mb-4 text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-6xl">
        Book a call.
      </h1>
      <p className="mb-10 max-w-2xl text-lg leading-relaxed text-og-ink/80 sm:text-xl">
        Pick a time that works. No pitch, no pressure. You&rsquo;ll leave knowing which option fits, or
        whether we&rsquo;re the right fit at all.
      </p>
      <BookCall initialType={initialType} />
    </section>
  );
}
