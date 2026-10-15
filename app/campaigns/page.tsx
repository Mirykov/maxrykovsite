import type { Metadata } from "next";
import ComingSoon from "@/components/og/ComingSoon";

export const metadata: Metadata = { title: "Creative Campaigns" };

export default function Page() {
  return (
    <ComingSoon
      title="Good causes deserve more interesting campaigns."
      sub="We develop creative marketing and engagement campaigns that help nonprofits earn attention, invite participation, and give people a memorable way to support the mission."
    />
  );
}
