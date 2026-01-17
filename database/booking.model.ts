import mongoose, { Schema, Document, Model } from "mongoose";
import Event from "./event.model";

/**
 * TypeScript interface for Booking document
 * Extends Document to include Mongoose methods and properties
 */
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Schema Definition
 * Defines the structure and validation rules for Booking documents
 */
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true, // Add index for faster queries
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string): boolean {
          // RFC 5322 compliant email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please provide a valid email address",
      },
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

/**
 * Pre-save hook to verify referenced Event exists
 * Ensures referential integrity before creating a booking
 */
BookingSchema.pre("save", async function () {
  // Only verify eventId if it's new or modified
  if (this.isNew || this.isModified("eventId")) {
    const eventExists = await Event.findById(this.eventId);

    if (!eventExists) {
      throw new Error(`Event with ID ${this.eventId} does not exist`);
    }
  }
});

/**
 * Create index on eventId for faster lookup queries
 * Useful for retrieving all bookings for a specific event
 */
BookingSchema.index({ eventId: 1 });

/**
 * Compound index for event-email uniqueness (prevents duplicate bookings)
 * Ensures a user can only book the same event once
 */
BookingSchema.index({ eventId: 1, email: 1, slug: 1 }, { unique: true });

/**
 * Booking Model
 * Prevents model recompilation during development hot reloads
 */
const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
