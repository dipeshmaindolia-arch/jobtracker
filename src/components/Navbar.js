"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: "📊" },
    { href: "/puzzles", label: "Puzzles", icon: "🧩" },
    { href: "/sql", label: "Daily SQL", icon: "🗄️" },
    { href: "/targets", label: "Targets", icon: "🎯" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          <span className="navbar-logo-icon">🚀</span>
          <span>LearnTracker</span>
        </Link>

        <div className="navbar-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-user">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: {
                  width: 36,
                  height: 36,
                },
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
}
