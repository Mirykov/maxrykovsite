import type { Metadata } from "next";
import ComingSoon from "@/components/og/ComingSoon";

export const metadata: Metadata = { title: "Experiences" };

export default function Page() {
  return (
    <ComingSoon
      title="Your event. Less predictable."
      sub="From ready-to-go game shows to fully original experiences, we make it easier for people to participate, and harder for them to forget the event."
    />
  );
}
