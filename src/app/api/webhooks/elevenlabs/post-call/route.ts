import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

// ElevenLabs Post-Call Webhook
// Receives conversation data after call ends

interface ElevenLabsPostCallPayload {
  type: "post_call";
  event_timestamp: number;
  conversation_id: string;
  transcript: string;
  transcript_with_tool_calls: string;
  recording_url?: string;
  call_duration_secs: number;
  cost: number;
  agent_id: string;
  call_successful: boolean;
  analysis?: {
    transcript_summary?: string;
    data_collection_results?: Record<string, { value: string; rationale: string }>;
    call_successful?: boolean;
    evaluation_criteria_results?: Record<string, { result: string; rationale: string }>;
  };
}

export async function POST(request: NextRequest) {
  try {
    const payload: ElevenLabsPostCallPayload = await request.json();

    console.log("[ElevenLabs Webhook] Post-call received:", {
      conversationId: payload.conversation_id,
      agentId: payload.agent_id,
      duration: payload.call_duration_secs,
      successful: payload.call_successful,
    });

    // Extract collected data from analysis
    const collectedData = payload.analysis?.data_collection_results || {};

    // Parse the collected fields
    const customerName = collectedData.customer_name?.value || null;
    const customerPhone = collectedData.customer_phone?.value || null;
    const customerEmail = collectedData.customer_email?.value || null;
    const serviceStreet = collectedData.service_street?.value || null;
    const serviceCity = collectedData.service_city?.value || null;
    const serviceZip = collectedData.service_zip?.value || null;
    const serviceType = collectedData.service_type?.value || null;
    const issueDescription = collectedData.issue_description?.value || null;
    const isEmergency = collectedData.is_emergency?.value?.toLowerCase() === "yes";
    const preferredDate = collectedData.preferred_date?.value || null;
    const preferredTime = collectedData.preferred_time?.value || null;
    const referralSource = collectedData.referral_source?.value || null;
    const customerType = collectedData.customer_type?.value?.toUpperCase() || "UNKNOWN";

    // Determine call status
    const callStatus = payload.call_successful ? "COMPLETED" : "FAILED";

    // Analyze sentiment from transcript (simple heuristic)
    let sentiment = "neutral";
    const transcript = payload.transcript?.toLowerCase() || "";
    if (
      transcript.includes("thank you") ||
      transcript.includes("great") ||
      transcript.includes("excellent")
    ) {
      sentiment = "positive";
    } else if (
      transcript.includes("frustrated") ||
      transcript.includes("angry") ||
      transcript.includes("terrible")
    ) {
      sentiment = "negative";
    }

    // Upsert the voice agent call record
    const voiceCall = await prisma.voiceAgentCall.upsert({
      where: { conversationId: payload.conversation_id },
      create: {
        conversationId: payload.conversation_id,
        agentId: payload.agent_id,
        callStatus: callStatus as "COMPLETED" | "FAILED" | "IN_PROGRESS" | "ABANDONED",
        callDurationSeconds: Math.round(payload.call_duration_secs),
        endedAt: new Date(),
        customerType: customerType as "NEW" | "EXISTING" | "UNKNOWN",
        customerName,
        customerPhone,
        customerEmail,
        serviceStreet,
        serviceCity,
        serviceZip,
        serviceType,
        issueDescription,
        isEmergency,
        preferredDate,
        preferredTime,
        referralSource,
        transcript: payload.transcript,
        summary: payload.analysis?.transcript_summary || null,
        sentiment,
        audioUrl: payload.recording_url || null,
        rawWebhookData: payload as unknown as Prisma.InputJsonValue,
        followUpStatus: "PENDING",
      },
      update: {
        callStatus: callStatus as "COMPLETED" | "FAILED" | "IN_PROGRESS" | "ABANDONED",
        callDurationSeconds: Math.round(payload.call_duration_secs),
        endedAt: new Date(),
        customerType: customerType as "NEW" | "EXISTING" | "UNKNOWN",
        customerName,
        customerPhone,
        customerEmail,
        serviceStreet,
        serviceCity,
        serviceZip,
        serviceType,
        issueDescription,
        isEmergency,
        preferredDate,
        preferredTime,
        referralSource,
        transcript: payload.transcript,
        summary: payload.analysis?.transcript_summary || null,
        sentiment,
        audioUrl: payload.recording_url || null,
        rawWebhookData: payload as unknown as Prisma.InputJsonValue,
      },
    });

    // If we have customer info, also create a contact inquiry
    if (customerName || customerPhone || customerEmail) {
      const inquiry = await prisma.contactInquiry.create({
        data: {
          name: customerName || "Voice Call Customer",
          email: customerEmail || "",
          phone: customerPhone,
          service: serviceType,
          message: issueDescription || `Voice call inquiry - ${serviceType || "General"}`,
          source: "VOICE_AGENT",
          status: isEmergency ? "NEW" : "NEW",
          voiceAgentCalls: {
            connect: { id: voiceCall.id },
          },
        },
      });

      console.log("[ElevenLabs Webhook] Created contact inquiry:", inquiry.id);
    }

    console.log("[ElevenLabs Webhook] Voice call saved:", voiceCall.id);

    return NextResponse.json({
      success: true,
      voiceCallId: voiceCall.id,
    });
  } catch (error) {
    console.error("[ElevenLabs Webhook] Error processing post-call:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
