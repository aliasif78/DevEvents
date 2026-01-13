"use client";

import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
  const handleClick = () => {
    console.log("Explore");
    posthog.capture("explore_events_clicked", {
      location: "hero_section",
    });
  };

  return (
    <button
      type="button"
      id="explore-btn"
      onClick={handleClick}
      className="mt-7 mx-auto"
    >
      <a href="#events">
        Explore Events
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
};

export default ExploreBtn;
