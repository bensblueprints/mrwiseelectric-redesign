import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

// ElevenLabs Call Initiated Webhook
// Receives notification when a call starts

interface CallInitiatedPayload {
  type: "call_initiated";
  event_timestamp: number;
  conversation_id: string;
  agent_id: string;
}

export async function POST(request: NextRequest) {
  try {
    const payload: CallInitiatedPayload = await request.json();

    console.log("[ElevenLabs Webhook] Call initiated:", {
      conversationId: payload.conversation_id,
      agentId: payload.agent_id,
    });

    // Create initial voice call record
    const voiceCall = await prisma.voiceAgentCall.create({
      data: {
        conversationId: payload.conversation_id,
        agentId: payload.agent_id,
        callStatus: "IN_PROGRESS",
        startedAt: new Date(payload.event_timestamp),
        customerType: "UNKNOWN",
        followUpStatus: "PENDING",
        rawWebhookData: payload as unknown as Prisma.InputJsonValue,
      },
    });

    console.log("[ElevenLabs Webhook] Voice call record created:", voiceCall.id);

    return NextResponse.json({
      success: true,
      voiceCallId: voiceCall.id,
    });
  } catch (error) {
    console.error("[ElevenLabs Webhook] Error processing call-initiated:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
