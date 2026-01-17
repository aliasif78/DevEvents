"use server";

// Database
import connectDB from "../mongodb";
import { Booking } from "@/database";

export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string }) => {
  try {
    // Connect to the database
    await connectDB();

    // Create the booking
    await Booking.create({ eventId, slug, email });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
