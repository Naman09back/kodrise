"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./site-header.module.css";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Case Studies", "/case-studies"],
  ["Testimonials", "/#testimonials"],
  ["About Us", "/about"],
  ["Careers", "/careers"],
  ["Contact Us", "/contact"],
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    window.addEventListener("keydown", keydown);
    window.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  if (pathname.startsWith("/admin")) {
    return (
      <header className={`${styles.header} ${styles.adminHeader}`}>
        <div className={`container ${styles.inner} ${styles.adminInner}`}>
          <Link href="/" className={styles.brand} aria-label="Kodrise home">
            <svg width="29" height="31" viewBox="0 0 32 34" fill="none" aria-hidden="true">
              <path d="M3 30V17a13 13 0 0 1 26 0v13H3Z" stroke="currentColor" strokeWidth="1.4" />
              <path d="M11 13v12m0-6 10-7m-10 7 10 6" stroke="currentColor" strokeWidth="2.2" />
            </svg>
            kodrise<span>.</span>
          </Link>
        </div>
      </header>
    );
  }
  function handleNavigation(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setOpen(false);
    if (pathname === href) {
      event.preventDefault();
      window.scrollTo({top: 0, behavior: "smooth"});
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={styles.header} data-scrolled={scrolled} ref={header}>
        <div className={`container ${styles.inner}`}>
          <Link
            href="/"
            className={styles.brand}
            aria-label="Kodrise home"
            onClick={(event) => handleNavigation(event, "/")}
          >
            <svg
              width="29"
              height="31"
              viewBox="0 0 32 34"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 30V17a13 13 0 0 1 26 0v13H3Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M11 13v12m0-6 10-7m-10 7 10 6"
                stroke="currentColor"
                strokeWidth="2.2"
              />
            </svg>
            kodrise<span>.</span>
          </Link>
          <button
            ref={toggle}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span
              className={styles.menuIcon}
              data-open={open}
              aria-hidden="true"
            >
              <i />
              <i />
            </span>
          </button>
          <nav
            id="main-navigation"
            className={styles.navigation}
            data-open={open}
            aria-label="Main navigation"
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(event.relatedTarget as Node) &&
                event.relatedTarget !== toggle.current
              )
                setOpen(false);
            }}
          >
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={href === "/contact" ? styles.contact : styles.link}
                onClick={(event) => handleNavigation(event, href)}
              >
                {label}
                {href === "/contact" && (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 16 16 4M4 4h12v12"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                )}
              </Link>
            ))}
            <span className={styles.mobileNote}>
              Good people. Shared possibilities.
            </span>
          </nav>
        </div>
      </header>
    </>
  );
}
