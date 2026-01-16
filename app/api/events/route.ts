// Next Js
import { NextResponse } from "next/server";

// Database
import connectDB from "@/lib/mongodb";
import { Event } from "@/database";

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectDB();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json({ message: "Invalid JSON data format", error }, { status: 400 });
    }

    const createdEvent = await Event.create(event);

    return NextResponse.json({ message: "Event created successfully", event: createdEvent }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ message: "Event creation failed", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
