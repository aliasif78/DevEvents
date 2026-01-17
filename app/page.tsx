// Next Js
import { cacheLife } from "next/cache";

// Components
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";

// Actions
import { getAllEvents } from "@/lib/actions/event.actions";

// Types
import { IEvent } from "@/database";

const Page = async () => {
  // Caching
  "use cache";
  cacheLife("hours");

  // Fetch Requests
  const events = await getAllEvents();

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
