import styles from "./brand-logo.module.css";
import type {CSSProperties} from "react";

type BrandLogoProps = {
  variant?: "light" | "dark";
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
};

export default function BrandLogo({variant = "light", width = 163, height = 50, alt = "KodRise Tech", className = ""}: BrandLogoProps) {
  const file = variant === "light" ? "kodrise-logo-light.jpeg" : "kodrise-logo-dark.jpeg";
  return <span className={`${styles.frame} ${className}`} style={{"--brand-logo-width": `${width}px`, "--brand-logo-height": `${height}px`} as CSSProperties}>
    <img className={`${styles.image} ${variant === "light" ? styles.light : styles.dark}`} src={`/site-assets/${file}`} alt={alt} />
  </span>;
}
