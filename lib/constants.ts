// Type definition
export type Event = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string; // ISO format
  time: string; // human-readable
};

// Example data (upcoming events in Germany)
export const events: Event[] = [
  {
    title: "Berlin International Film Festival",
    image: "/images/event1.png",
    slug: "berlin-film-festival",
    location: "Berlin, Germany",
    date: "2026-02-05",
    time: "09:00 AM",
  },
  {
    title: "Hamburg Music Week",
    image: "/images/event2.png",
    slug: "hamburg-music-week",
    location: "Hamburg, Germany",
    date: "2026-03-12",
    time: "11:00 AM",
  },
  {
    title: "Munich Tech Conference",
    image: "/images/event3.png",
    slug: "munich-tech-conference",
    location: "Munich, Germany",
    date: "2026-04-20",
    time: "10:00 AM",
  },
  {
    title: "Frankfurt Book Fair",
    image: "/images/event4.png",
    slug: "frankfurt-book-fair",
    location: "Frankfurt, Germany",
    date: "2026-10-14",
    time: "09:30 AM",
  },
  {
    title: "Cologne Carnival",
    image: "/images/event5.png",
    slug: "cologne-carnival",
    location: "Cologne, Germany",
    date: "2026-02-15",
    time: "12:00 PM",
  },
];
