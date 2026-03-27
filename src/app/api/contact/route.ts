import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message } = result.data;

    // Save to database
    await prisma.contactInquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        service: service || null,
        message,
        status: "NEW",
      },
    });

    // TODO: Send email notification (implement with Resend or Nodemailer)

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll be in touch soon!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}
