// Next Js
import { NextResponse } from "next/server";

// Database
import connectDB from "@/lib/mongodb";
import { Event } from "@/database";

// Dependencies
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Get the form data
    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json({ message: "Invalid JSON data format", error }, { status: 400 });
    }

    // Get the image from the form data
    const image = formData.get("image") as File;
    if (!image) return NextResponse.json({ message: "No image uploaded" }, { status: 400 });

    // Get the tags
    const tags = JSON.parse(formData.get("tags") as string);
    const agenda = JSON.parse(formData.get("agenda") as string);

    // Convert image to buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ format: "webp", resource_type: "image", folder: "events" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;
    event.tags = tags;
    event.agenda = agenda;

    // Finally, create the event
    const createdEvent = await Event.create(event);

    return NextResponse.json({ message: "Event created successfully", event: createdEvent }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ message: "Event creation failed", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Get all events
    const events = await Event.find().sort({ createdAt: -1 });

    // Return the events
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ message: "Failed to fetch events", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
