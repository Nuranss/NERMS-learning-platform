import { Metadata } from "next";
import { IntroClient } from "@/app/rooms/intro-to-ics/IntroClient";

export const metadata: Metadata = {
  title: "NERMS — Learn Industrial Control Systems & OT Security",
  description: "A clean, modern platform to learn and master ICS, SCADA, and Operational Technology cybersecurity.",
};

export default function HomePage() {
  return <IntroClient />;
}
