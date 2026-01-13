"use client";

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const Navbar = () => {
  const handleLogoClick = () => {
    posthog.capture("logo_clicked", {
      destination: "/",
    });
  };

  const handleNavClick = (linkName: string, destination: string) => {
    posthog.capture(`nav_${linkName}_clicked`, {
      destination: destination,
    });
  };

  return (
    <header>
      <nav>
        <Link href="/" className="logo" onClick={handleLogoClick}>
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>Dev Event</p>
        </Link>

        <ul>
          <Link href="/" onClick={() => handleNavClick("home", "/")}>
            Home
          </Link>
          <Link
            href="/events"
            onClick={() => handleNavClick("events", "/events")}
          >
            Events
          </Link>
          <Link
            href="/create"
            onClick={() => handleNavClick("create_event", "/create")}
          >
            Create Event
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
