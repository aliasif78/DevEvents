// Next Js
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";

// Database
import { IEvent } from "@/database";
import Image from "next/image";

// Components
import EventCard from "./EventCard";
import BookEvent from "./BookEvent";

// Server Actions
import { getEventBySlug, getSimilarEventsBySlug } from "@/lib/actions/event.actions";

// Custom Components
const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => {
  return (
    <div className="flex-row-gap-2 items-center">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>

      <ul>
        {agendaItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex-row-gap-2 flex-wrap">
      {tags.map((tag, index) => (
        <div className="pill" key={index}>
          {tag}
        </div>
      ))}
    </div>
  );
};

// Constants
const BOOKINGS = 10;

const EventDetails = async ({ params }: { params: Promise<string> }) => {
  // Caching
  "use cache";
  cacheLife("hours");

  // 1. Correctly destructure slug from the resolved params object
  const slug = await params;

  // 2. Fetch data
  const event = await getEventBySlug(slug);

  // 3. 🛑 SECURITY CHECK: Handle 404s before destructuring
  if (!event) return notFound(); // Or redirect('/404')

  // 4. Now safe to destructure (TypeScript knows 'event' is not null here)
  const { description, location, date, time, mode, agenda, audience, tags, image, overview, organizer } = event;

  // Server Actions
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        {/* Left Side - Event Content */}
        <div className="content">
          <Image src={image} alt="Event Banner" width={800} height={800} className="banner" />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col gap-2">
            <h2>Event Details</h2>

            <EventDetailItem icon="/icons/calendar.svg" alt="date" label={date} />
            <EventDetailItem icon="/icons/clock.svg" alt="time" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="location" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        {/* Right Side - Event Image */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {BOOKINGS > 0 ? <p className="text-sm">Join {BOOKINGS} people who have already booked their spot</p> : <p className="text-sm">Be the first to book your spot!</p>}

            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>

        <div className="flex w-full flex-wrap gap-4">
          {similarEvents.map((event, index) => (
            <EventCard key={index} title={event.title} image={event.image} location={event.location} date={event.date} time={event.time} slug={event.slug} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
