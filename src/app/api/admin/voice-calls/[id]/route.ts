import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const voiceCall = await prisma.voiceAgentCall.findUnique({
      where: { id },
      include: {
        inquiry: true,
      },
    });

    if (!voiceCall) {
      return NextResponse.json(
        { error: "Voice call not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(voiceCall);
  } catch (error) {
    console.error("Failed to fetch voice call:", error);
    return NextResponse.json(
      { error: "Failed to fetch voice call" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { followUpStatus, notes } = body;

    const voiceCall = await prisma.voiceAgentCall.update({
      where: { id },
      data: {
        ...(followUpStatus && { followUpStatus }),
        ...(notes !== undefined && { notes }),
      },
    });

    return NextResponse.json(voiceCall);
  } catch (error) {
    console.error("Failed to update voice call:", error);
    return NextResponse.json(
      { error: "Failed to update voice call" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.voiceAgentCall.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete voice call:", error);
    return NextResponse.json(
      { error: "Failed to delete voice call" },
      { status: 500 }
    );
  }
}
