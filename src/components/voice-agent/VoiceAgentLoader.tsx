"use client";

import dynamic from "next/dynamic";

const VoiceAgentWidget = dynamic(
  () => import("./VoiceAgentWidget").then((mod) => mod.VoiceAgentWidget),
  { ssr: false }
);

export function VoiceAgentLoader() {
  return <VoiceAgentWidget />;
}
