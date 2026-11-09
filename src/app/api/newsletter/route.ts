import { NextRequest, NextResponse } from "next/server";
import {
  getNewsletterSubscribers,
  saveNewsletterSubscribers,
} from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body?.email as string | undefined)?.trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const subscribers = await getNewsletterSubscribers();
    const alreadyExists = subscribers.some((s) => s.email === email);

    if (!alreadyExists) {
      subscribers.unshift({
        email,
        subscribedAt: new Date().toISOString(),
      });
      await saveNewsletterSubscribers(subscribers);
    }

    return NextResponse.json(
      {
        message: alreadyExists
          ? "You are already on our private Atelier invitation list."
          : "Welcome to the Bella Salon Atelier List.",
      },
      { status: alreadyExists ? 200 : 201 }
    );
  } catch (err) {
    console.error("POST /api/newsletter error:", err);
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }
}
