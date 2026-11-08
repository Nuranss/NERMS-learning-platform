import { notFound } from "next/navigation";
import { MOCK_ROOMS } from "@/mock/roomsData";
import { RoomClient } from "./RoomClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return MOCK_ROOMS.map((room) => ({
    id: room.id,
  }));
}

export default async function RoomPage({ params }: PageProps) {
  const resolvedParams = await params;
  const room = MOCK_ROOMS.find((r) => r.id === resolvedParams.id);

  if (!room) {
    notFound();
  }

  return <RoomClient room={room} />;
}
