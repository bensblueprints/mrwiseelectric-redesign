import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const voiceCalls = await prisma.voiceAgentCall.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        inquiry: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json(voiceCalls);
  } catch (error) {
    console.error("Failed to fetch voice calls:", error);
    return NextResponse.json(
      { error: "Failed to fetch voice calls" },
      { status: 500 }
    );
  }
}
