import { NextRequest, NextResponse } from "next/server";
import { SERVICES, TEAM_MEMBERS } from "@/data/salon";
import { BookingRecord, getBookings, saveBookings } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const stylistId = searchParams.get("stylistId");
    const reference = searchParams.get("reference");
    const email = searchParams.get("email");

    const bookings = await getBookings();

    if (reference || email) {
      const refClean = reference?.trim().toUpperCase();
      const emailClean = email?.trim().toLowerCase();
      const matches = bookings.filter((b) => {
        const refOk = refClean ? b.reference.toUpperCase() === refClean : true;
        const emailOk = emailClean
          ? b.customerEmail.toLowerCase() === emailClean
          : true;
        return refOk && emailOk;
      });
      return NextResponse.json({ bookings: matches });
    }

    if (date) {
      const confirmedOnDate = bookings.filter(
        (b) => b.date === date && b.status === "confirmed"
      );
      const bookedSlots = confirmedOnDate
        .filter((b) =>
          stylistId && stylistId !== "any" ? b.stylistId === stylistId : false
        )
        .map((b) => b.time);

      // For "any" stylist, check if all stylists capable of the category are booked at a given slot
      return NextResponse.json({
        date,
        stylistId: stylistId ?? "any",
        bookedSlots,
        totalConfirmedOnDate: confirmedOnDate.length,
        bookingsBySlot: confirmedOnDate.map((b) => ({
          time: b.time,
          stylistId: b.stylistId,
        })),
      });
    }

    return NextResponse.json({
      count: bookings.filter((b) => b.status === "confirmed").length,
    });
  } catch (err) {
    console.error("GET /api/bookings error:", err);
    return NextResponse.json(
      { error: "Unable to retrieve reservation availability." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      serviceId,
      stylistId,
      date,
      time,
      customerName,
      customerEmail,
      customerPhone,
      notes,
      acceptedPolicy,
    } = body as {
      serviceId?: string;
      stylistId?: string;
      date?: string;
      time?: string;
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
      notes?: string;
      acceptedPolicy?: boolean;
    };

    if (!serviceId || !date || !time || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: "Please complete all required booking and guest contact fields." },
        { status: 400 }
      );
    }

    if (!acceptedPolicy) {
      return NextResponse.json(
        { error: "Please acknowledge our 24-hour reservation policy to confirm." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const service = SERVICES.find((s) => s.id === serviceId || s.slug === serviceId);
    if (!service) {
      return NextResponse.json(
        { error: "Selected service could not be found." },
        { status: 404 }
      );
    }

    // Validate selected date is not in the past and not Monday (salon closed Mondays)
    const parsedDate = new Date(`${date}T12:00:00`);
    if (Number.isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid appointment date." },
        { status: 400 }
      );
    }
    if (parsedDate.getDay() === 1) {
      return NextResponse.json(
        {
          error:
            "Bella Salon is reserved for private editorial shoots on Mondays. Please choose Tuesday through Sunday.",
        },
        { status: 400 }
      );
    }

    const bookings = await getBookings();

    // Resolve stylist (either chosen or first available matching discipline)
    let resolvedStylist =
      stylistId && stylistId !== "any"
        ? TEAM_MEMBERS.find((t) => t.id === stylistId)
        : undefined;

    if (stylistId && stylistId !== "any" && !resolvedStylist) {
      return NextResponse.json(
        { error: "Selected artisan could not be found." },
        { status: 404 }
      );
    }

    if (!resolvedStylist) {
      const eligible = TEAM_MEMBERS.filter((t) =>
        t.categories.includes(service.category)
      );
      const freeStylist = eligible.find(
        (cand) =>
          !bookings.some(
            (b) =>
              b.status === "confirmed" &&
              b.date === date &&
              b.time === time &&
              b.stylistId === cand.id
          )
      );
      resolvedStylist = freeStylist ?? eligible[0];
    }

    if (!resolvedStylist) {
      return NextResponse.json(
        { error: "No artisan available for this discipline." },
        { status: 400 }
      );
    }

    // Check double-booking for this stylist + date + time
    const conflict = bookings.some(
      (b) =>
        b.status === "confirmed" &&
        b.date === date &&
        b.time === time &&
        b.stylistId === resolvedStylist.id
    );

    if (conflict) {
      return NextResponse.json(
        {
          error: `${resolvedStylist.name} is already reserved at ${time} on ${date}. Please choose another time slot or artisan.`,
        },
        { status: 409 }
      );
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const reference = `BL-${randomDigits}`;

    const newBooking: BookingRecord = {
      id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      reference,
      serviceId: service.id,
      serviceName: service.name,
      category: service.category,
      price: service.price,
      durationMinutes: service.durationMinutes,
      stylistId: resolvedStylist.id,
      stylistName: resolvedStylist.name,
      date,
      time,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      notes: (notes ?? "").trim(),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    bookings.unshift(newBooking);
    await saveBookings(bookings);

    return NextResponse.json(
      {
        message: "Your Bella Salon experience is confirmed.",
        booking: newBooking,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/bookings error:", err);
    return NextResponse.json(
      { error: "We could not process your reservation right now." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, action } = body as {
      reference?: string;
      action?: "cancel";
    };

    if (!reference || action !== "cancel") {
      return NextResponse.json(
        { error: "Invalid reservation update request." },
        { status: 400 }
      );
    }

    const bookings = await getBookings();
    const idx = bookings.findIndex(
      (b) => b.reference.toUpperCase() === reference.trim().toUpperCase()
    );

    if (idx === -1) {
      return NextResponse.json(
        { error: "No booking found with that reference code." },
        { status: 404 }
      );
    }

    bookings[idx] = { ...bookings[idx], status: "cancelled" };
    await saveBookings(bookings);

    return NextResponse.json({
      message: "Your reservation has been cancelled.",
      booking: bookings[idx],
    });
  } catch (err) {
    console.error("PATCH /api/bookings error:", err);
    return NextResponse.json(
      { error: "Unable to update reservation." },
      { status: 500 }
    );
  }
}
