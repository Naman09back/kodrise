"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // The reference homepage owns a full-page iframe and already has its own
    // scroll/interaction behavior. A second Lenis loop here causes visible
    // jitter while the iframe is resizing and does not match the source site.
    if (pathname?.startsWith("/admin") || pathname === "/" || pathname === "/overview" || pathname === "/resources") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    const lenis = new Lenis({duration: 1.05, smoothWheel: true, syncTouch: false});
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"});
      window.history.replaceState(null, "", hash);
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [pathname]);
  return null;
}
