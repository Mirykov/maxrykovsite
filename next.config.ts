import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old maxrykov.com addresses (and the earlier redesign's case-study URLs)
  // point to their OddGood equivalents so existing links keep working.
  async redirects() {
    const moved: [string, string][] = [
      ["/fountys", "/work/the-fountys"],
      ["/runway", "/work/recycled-runway"],
      ["/otherawards", "/work/the-other-awards"],
      ["/history", "/work/can-you-repeat-that"],
      ["/water", "/work"],
      ["/otherfoundation", "/work"],
      ["/nice", "/work"],
      ["/contact", "/book"],
      // Plan an Event and the old /start form were folded into Book a Call
      ["/plan", "/book"],
      ["/start", "/book"],
      ["/work/birmingham-history-center", "/work/can-you-repeat-that"],
      ["/work/nice", "/work"],
      ["/work/clean-water", "/work"],
      ["/work/the-other-foundation", "/work"],
    ];
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
