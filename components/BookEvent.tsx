"use client";

// React
import { useState } from "react";

// Server Actions
import { createBooking } from "@/lib/actions/booking.actions";

// Dependencies
import posthog from "posthog-js";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  // States
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call the server action
    const { success } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
      posthog.capture("event_booked", { eventId, slug, email });
    }

    // Error handling
    else {
      console.log("Booking failed");
      posthog.captureException("Booking failed");
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <button type="submit" className="button-submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
