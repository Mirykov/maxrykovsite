import type { Metadata } from "next";
import ComingSoon from "@/components/og/ComingSoon";

export const metadata: Metadata = { title: "Emcee & Event Hosting" };

export default function Page() {
  return (
    <ComingSoon
      title="A good event needs a good host."
      sub="Max brings humor, energy, and professionalism to the stage, keeping the program moving and the audience engaged."
    />
  );
}
