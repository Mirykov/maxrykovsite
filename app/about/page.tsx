import type { Metadata } from "next";
import ComingSoon from "@/components/og/ComingSoon";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return (
    <ComingSoon
      title="Good ideas. Odd approaches. Meaningful results."
      sub="OddGood Events is led by Max Rykov, a creative thinker, event host, and community engagement professional."
    />
  );
}
