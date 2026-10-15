import type { Metadata } from "next";
import ComingSoon from "@/components/og/ComingSoon";

export const metadata: Metadata = { title: "Plan an Event" };

export default function Page() {
  return (
    <ComingSoon
      title="Tell us what you’re planning."
      sub="A company party, a fundraiser, a conference, a campaign, or something you haven’t quite figured out yet. Share what you know, and we’ll work out the next step."
    />
  );
}
