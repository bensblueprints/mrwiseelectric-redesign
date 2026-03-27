import { NextResponse } from "next/server";

// Generate a signed URL for connecting to ElevenLabs voice agent
// This is required for the client-side widget to authenticate

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const AGENT_ID = process.env.ELEVENLABS_AGENT_ID || "agent_9601kmpmgf2keqbb917ssytxtqk3";

export async function GET() {
  try {
    if (!ELEVENLABS_API_KEY) {
      console.error("[Voice Agent] Missing ELEVENLABS_API_KEY");
      return NextResponse.json(
        { error: "Voice agent not configured" },
        { status: 500 }
      );
    }

    // Get signed URL from ElevenLabs API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${AGENT_ID}`,
      {
        method: "GET",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Voice Agent] Failed to get signed URL:", errorText);
      return NextResponse.json(
        { error: "Failed to initialize voice agent" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      signedUrl: data.signed_url,
      agentId: AGENT_ID,
    });
  } catch (error) {
    console.error("[Voice Agent] Error getting signed URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
