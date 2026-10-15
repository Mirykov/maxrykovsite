import type { Metadata } from "next";
import ComingSoon from "@/components/og/ComingSoon";

export const metadata: Metadata = { title: "Book a Call" };

export default function Page() {
  return (
    <ComingSoon
      title="Book a call."
      sub="Pick a time that works. No pitch, no pressure. You’ll leave knowing which option fits, or whether we’re the right fit at all."
    />
  );
}
