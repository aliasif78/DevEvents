// Components
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";

// Types
import { IEvent } from "@/database";

// Env
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  const res = await fetch(`${BASE_URL}/api/events`);
  const { events } = await res.json();

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev
        <br />
        Event You Musn&apos;t Miss.
      </h1>
      <p className="text-center mt-5">Hackathons, Workshops, and Conferences, all in one place.</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events?.length &&
            events.map((event: IEvent) => (
              <li key={event.title} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
