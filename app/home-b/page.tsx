import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

// Alternate Home direction ("Stage Lights") for Max's review. Delete after a direction is chosen.
export const metadata: Metadata = {
  title: "Home (Direction B)",
  robots: { index: false, follow: false },
};

export default function HomeB() {
  return <HomePage variant="b" />;
}
