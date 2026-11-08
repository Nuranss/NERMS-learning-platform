import { Metadata } from "next";
import { IntroClient } from "./IntroClient";

export const metadata: Metadata = {
  title: "Introduction to ICS & OT Cybersecurity — nerms",
  description: "Learn the fundamentals of Industrial Control Systems, SCADA architecture, the Purdue Model, and industrial protocols.",
};

export default function IntroPage() {
  return <IntroClient />;
}
