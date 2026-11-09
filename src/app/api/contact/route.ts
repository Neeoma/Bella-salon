import { NextRequest, NextResponse } from "next/server";
import { getInquiries, InquiryRecord, saveInquiries } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, inquiryType, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      inquiryType?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Please provide your name, email address, and message." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const inquiries = await getInquiries();
    const ticketCode = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const record: InquiryRecord = {
      id: `inq_${Date.now()}`,
      ticketCode,
      name: name.trim(),
      email: email.trim(),
      phone: (phone ?? "").trim(),
      inquiryType: (inquiryType ?? "General Concierge").trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    inquiries.unshift(record);
    await saveInquiries(inquiries);

    return NextResponse.json(
      {
        message: "Thank you. Our concierge team will respond within two hours.",
        inquiry: record,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json(
      { error: "Unable to deliver inquiry right now." },
      { status: 500 }
    );
  }
}
