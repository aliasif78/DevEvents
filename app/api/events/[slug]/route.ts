// Next Js
import { NextRequest, NextResponse } from "next/server";

// Database
import connectDB from "@/lib/mongodb";
import { Event } from "@/database";

/**
 * GET API route to fetch event details by slug
 * Path: /api/events/[slug]
 *
 * @param req - The incoming request object
 * @param context - The context containing route parameters
 * @returns Response with event data or error message
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    // 1. Await params to get the slug (Next.js 15+ pattern)
    const { slug } = await params;

    // 2. Validate slug presence
    if (!slug) return NextResponse.json({ message: "Slug parameter is required" }, { status: 400 });

    // 3. Connect to the database
    await connectDB();

    // 4. Query the Event model by slug
    // We use findOne to find a single document matching the slug
    // .lean() is used for performance as we only need the plain JS object
    const event = await Event.findOne({ slug }).lean();

    // 5. Handle event not found
    if (!event) return NextResponse.json({ message: `Event with slug '${slug}' not found` }, { status: 404 });

    // 6. Return the event data
    return NextResponse.json({ message: "Event fetched successfully", event }, { status: 200 });
  } catch (error) {
    // 7. Handle unexpected errors
    console.error(`Error fetching event by slug:`, error);
    return NextResponse.json({ message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
