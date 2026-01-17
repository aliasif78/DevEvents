"use server";

// Database
import connectDB from "../mongodb";
import { Event, IEvent } from "@/database";

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

export const getAllEvents = async () => {
  try {
    await connectDB();

    // 1. Get plain objects
    const events = await Event.find().lean();

    // 2. Convert ObjectId to String manually
    return events.map((event) => ({ ...event, _id: event._id.toString() }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getEventBySlug = async (slug: string): Promise<IEvent | null> => {
  try {
    await connectDB();

    // 1. Fetch with explicit generic type
    const event = await Event.findOne({ slug }).lean();

    if (!event) return null;

    // 2. Return and cast to IEvent to ensure the shape matches exactly
    return {
      ...event,
      _id: event._id.toString(),
    } as unknown as IEvent;
  } catch (error) {
    console.log(error);
    return null;
  }
};
