"use server";

// Database
import connectDB from "../mongodb";
import { Event } from "@/database";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    // Connect to the database
    await connectDB();

    // Get the event
    const event = await Event.findOne({ slug });

    if (!event) {
      console.log("Event not found");
      return [];
    }

    // Get similar events
    return await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
  } catch (error) {
    console.log(error);
    return [];
  }
};
