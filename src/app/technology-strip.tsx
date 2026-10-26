"use client";

import { useState } from "react";
import styles from "./technology-strip.module.css";

const stack = [
  ["Shopify", "S"],
  ["Salesforce", "☁"],
  ["React", "⚛"],
  ["Python", "Py"],
  ["Oracle Cloud", "O"],
  ["Angular", "A"],
  ["Java", "J"],
  ["Agentic AI", "✧"],
  ["SQL", "▤"],
];

export default function TechnologyStrip() {
  const [paused, setPaused] = useState(false);
  return (
    <section className={styles.strip} aria-label="Technologies we work with">
      <div className={`container ${styles.inner}`}>
        <div className={styles.caption}>
          YOUR STACK.
          <br />
          <strong>OUR COMMON GROUND.</strong>
        </div>
        <div
          className={styles.viewport}
          tabIndex={0}
          role="region"
          aria-label="Technology list. Focus or hover to pause movement."
        >
          <div className={styles.track} data-paused={paused}>
            {[0, 1].map((copy) => (
              <ul
                className={styles.group}
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
              >
                {stack.map(([name, symbol]) => (
                  <li className={styles.technology} key={name}>
                    <span className={styles.symbol} aria-hidden="true">
                      {symbol}
                    </span>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <button
          type="button"
          className={styles.control}
          onClick={() => setPaused(!paused)}
          aria-label={
            paused
              ? "Resume technology animation"
              : "Pause technology animation"
          }
          aria-pressed={paused}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            {paused ? (
              <path d="m5 3 8 5-8 5z" />
            ) : (
              <path d="M4 3h3v10H4zm5 0h3v10H9z" />
            )}
          </svg>
        </button>
      </div>
    </section>
  );
}
