"use client";

import {useCallback, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";

type MirroredPageProps = {pathname: string; title?: string};
type SiteMedia = {slot?: string; sourcePath?: string; alt?: string; image?: {asset?: {url?: string}}};
type PageContent = {heroTitle?: string; heroAccent?: string; heroDescription?: string; primaryCta?: string; primaryCtaUrl?: string; secondaryCta?: string; secondaryCtaUrl?: string; heroImage?: {asset?: {url?: string}; alt?: string}};

function normalizedPath(value: string) {
  const path = value.toLowerCase().replace(/\/+$/, "");
  return path || "/";
}

function pageKeyFor(pathname: string) {
  const known: Record<string, string> = {"/": "home", "/about": "about", "/careers": "careers", "/contact": "contact"};
  return known[normalizedPath(pathname)];
}

function fallbackLocalPath(pathname: string) {
  const path = normalizedPath(pathname);
  if (path === "/about-us") return "/about";
  if (path === "/contact-us") return "/contact";
  if (path.startsWith("/life-at-codiant")) return path.replace("/life-at-codiant", "/life-at-kodrise");
  if (path.startsWith("/blog")) return path.replace("/blog", "/resources/blogs");
  if (path.startsWith("/press-release")) return path.replace("/press-release", "/resources/press-releases");
  if (path.startsWith("/whitepaper")) return path.replace("/whitepaper", "/resources/ebooks");
  if (path === "/current-opening") return "/careers";
  if (path.startsWith("/current-opening/")) return path.replace("/current-opening", "/careers");
  if (path === "/technologies") return "/devresources";
  if (path.startsWith("/technologies/hire-")) return path.replace("/technologies/hire-", "/devresources/");
  return path;
}

function removeMirroredFooter(documentInsideFrame: Document | null | undefined) {
  if (!documentInsideFrame) return;
  documentInsideFrame.querySelectorAll("#footer, #footerContactForm, footer.footer, .footer_contact").forEach((element) => element.remove());
}

export default function MirroredPage({pathname, title}: MirroredPageProps) {
  const router = useRouter();
  const frame = useRef<HTMLIFrameElement>(null);
  const cleanupFrameSizing = useRef<(() => void) | null>(null);
  const customizing = useRef(false);
  const pageBackground = normalizedPath(pathname) === "/" ? "#14141c" : "#faf9f6";
  const revealFrame = useCallback(() => {
    const documentInsideFrame = frame.current?.contentDocument;
    if (!documentInsideFrame) return;
    documentInsideFrame.getElementById("kodrise-mirror-boot")?.remove();
    documentInsideFrame.querySelectorAll("header.mainHeader, #ct-ultimate-gdpr-cookie-bottomPanel, #ct-ultimate-gdpr-cookie-open, [id^='ct-ultimate-gdpr-cookie-']").forEach((element) => element.remove());
    removeMirroredFooter(documentInsideFrame);
    documentInsideFrame.documentElement.style.setProperty("visibility", "visible", "important");
    documentInsideFrame.documentElement.style.backgroundColor = pageBackground;
    if (frame.current) frame.current.style.visibility = "visible";
  }, [pageBackground]);
  const recoverFrame = useCallback((error: unknown) => {
    console.error("Could not prepare archived page", error);
    customizing.current = false;
    revealFrame();
  }, [revealFrame]);

  const customize = useCallback(async () => {
    if (customizing.current) return;
    const documentInsideFrame = frame.current?.contentDocument;
    if (!documentInsideFrame?.body) return;
    customizing.current = true;
    const frameWindow = frame.current?.contentWindow;
    const siteOrigin = window.location.origin;
    revealFrame();
    documentInsideFrame.querySelectorAll("header.mainHeader, #ct-ultimate-gdpr-cookie-bottomPanel, #ct-ultimate-gdpr-cookie-open, [id^='ct-ultimate-gdpr-cookie-']").forEach((element) => element.remove());
    removeMirroredFooter(documentInsideFrame);
    if (normalizedPath(pathname) === "/") documentInsideFrame.querySelector(".industreisWeServe")?.remove();
    Array.from(documentInsideFrame.querySelectorAll<HTMLElement>(".footer_top_heading"))
      .find((heading) => heading.textContent?.trim() === "AI for Industries")
      ?.closest<HTMLElement>(".col-sm-4")?.remove();
    documentInsideFrame.getElementById("kodrise-mirror-boot")?.remove();
    documentInsideFrame.documentElement.style.visibility = "visible";
    if (frame.current) frame.current.style.visibility = "visible";
    const pageKey = pageKeyFor(pathname);
    const [homeContent, pageContent] = await Promise.all([
      fetch("/api/content/home", {cache: "no-store"})
        .then((response) => response.ok ? response.json() as Promise<{assets?: SiteMedia[]}> : {} as {assets?: SiteMedia[]})
        .catch((): {assets?: SiteMedia[]} => ({})),
      pageKey
        ? fetch(`/api/content/page?key=${pageKey}`, {cache: "no-store"})
            .then((response) => response.ok ? response.json() as Promise<{page?: PageContent | null}> : {} as {page?: PageContent | null})
            .catch((): {page?: PageContent | null} => ({}))
        : Promise.resolve({page: null}),
    ]);

    if (!frame.current || frame.current.contentDocument !== documentInsideFrame || !documentInsideFrame.body) {
      customizing.current = false;
      return;
    }

    const portfolioAjax = (frameWindow as (Window & {case_ajax?: {ajaxurl?: string}}) | null)?.case_ajax;
    if (portfolioAjax) portfolioAjax.ajaxurl = `${siteOrigin}/api/codiant-ajax`;

    documentInsideFrame.querySelectorAll("header.mainHeader, #ct-ultimate-gdpr-cookie-bottomPanel, #ct-ultimate-gdpr-cookie-open, [id^='ct-ultimate-gdpr-cookie-']").forEach((element) => element.remove());
    removeMirroredFooter(documentInsideFrame);
    documentInsideFrame.querySelectorAll<HTMLScriptElement>('script[src*="tawk.to"],script[src*="embed.tawk"],script[src*="chat-widget"],script[src*="chatbot-widget"],script[src*="ct-ultimate-gdpr"],script[src*="cookie-consent"]').forEach((script) => script.remove());
    documentInsideFrame.querySelectorAll<HTMLLinkElement>('link[href*="ct-ultimate-gdpr"]').forEach((stylesheet) => stylesheet.remove());
    documentInsideFrame.querySelectorAll<HTMLElement>('[id*="tawk" i],[class*="tawk" i],[id*="amy" i],[class*="amy" i],iframe[src*="tawk.to"],iframe[src*="chat" i],iframe[title*="chat" i],[id^="ct-ultimate-gdpr-cookie-"]').forEach((element) => element.remove());

    const hideInjectedWidgets = documentInsideFrame.createElement("style");
    hideInjectedWidgets.textContent = `#tawkchat-container,[id*="tawk" i],[class*="tawk" i],[id*="amy" i],[class*="amy" i],iframe[src*="chat" i],iframe[title*="chat" i],#hiringModal,.modal-backdrop{display:none!important;visibility:hidden!important;pointer-events:none!important}`;
    documentInsideFrame.head.appendChild(hideInjectedWidgets);
    const removeHiringOverlay = () => {
      documentInsideFrame.querySelectorAll<HTMLElement>("#hiringModal,.modal-backdrop").forEach((element) => element.remove());
      const body = documentInsideFrame.body;
      if (!body) return;
      if (body.classList.contains("modal-open")) body.classList.remove("modal-open");
      if (body.style.overflow === "hidden") body.style.removeProperty("overflow");
      if (body.style.paddingRight) body.style.removeProperty("padding-right");
    };
    removeHiringOverlay();
    if (documentInsideFrame.documentElement && !documentInsideFrame.documentElement.dataset.kodriseOverlayObserver) {
      documentInsideFrame.documentElement.dataset.kodriseOverlayObserver = "true";
      new MutationObserver(removeHiringOverlay).observe(documentInsideFrame.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }

    const textWalker = documentInsideFrame.createTreeWalker(documentInsideFrame.body, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    while (textWalker.nextNode()) {
      const node = textWalker.currentNode as Text;
      if (node.parentElement?.closest("script,style,noscript,svg")) continue;
      textNodes.push(node);
    }
    textNodes.forEach((node) => {
      if (node.nodeValue) node.nodeValue = node.nodeValue.replace(/(?:info|hr)@kodrise\.com/gi, "hr@kodrise.com");
    });
    documentInsideFrame.querySelectorAll<HTMLElement>("[alt],[title],[aria-label],[placeholder]").forEach((element) => {
      ["alt", "title", "aria-label", "placeholder"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (value) element.setAttribute(attribute, value.replace(/(?:info|hr)@kodrise\.com/gi, "hr@kodrise.com"));
      });
    });
    documentInsideFrame.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]').forEach((anchor) => {
      anchor.href = anchor.href.replace(/(?:info|hr)@kodrise\.com/gi, "hr@kodrise.com");
    });

    const mediaBySource = new Map<string, SiteMedia>();
    for (const media of homeContent.assets || []) {
      if (media.sourcePath) {
        try {
          const source = new URL(media.sourcePath, siteOrigin);
          mediaBySource.set(`${source.origin}${source.pathname}${source.search}`, media);
          mediaBySource.set(`${source.origin}${source.pathname}`, media);
        } catch {}
      }
    }
    const replaceMediaUrl = (value: string) => {
      try {
        const source = new URL(value, siteOrigin);
        const media = mediaBySource.get(`${source.origin}${source.pathname}${source.search}`)
          || mediaBySource.get(`${source.origin}${source.pathname}`);
        return media?.image?.asset?.url || value;
      } catch {
        return value;
      }
    };

    documentInsideFrame.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
      const removeUnavailableImage = () => {
        const awardSlide = image.closest<HTMLElement>(".awardsSlider .swiper-slide");
        if (awardSlide) {
          const slider = awardSlide.closest<HTMLElement>(".swiper") as (HTMLElement & {swiper?: {update: () => void}}) | null;
          awardSlide.remove();
          slider?.swiper?.update();
          return;
        }
        image.remove();
      };
      image.addEventListener("error", removeUnavailableImage, {once: true});
      const brandText = `${image.alt} ${image.src}`;
      if (/logo/i.test(brandText) && /codiant|kodrise/i.test(brandText)) {
        let ancestor = image.parentElement;
        let backgroundIsDark = false;
        while (ancestor) {
          const background = frameWindow?.getComputedStyle(ancestor).backgroundColor || "transparent";
          const channels = background.match(/rgba?\(([^)]+)\)/i)?.[1].split(/[,/ ]+/).filter(Boolean).map(Number);
          if (channels && channels.length >= 3 && (channels.length < 4 || channels[3] > 0.05)) {
            const [red, green, blue] = channels;
            backgroundIsDark = (0.2126 * red + 0.7152 * green + 0.0722 * blue) < 145;
            break;
          }
          ancestor = ancestor.parentElement;
        }
        const logoVariant = backgroundIsDark ? "light" : "dark";
        image.src = `${siteOrigin}/site-assets/kodrise-logo-${logoVariant}.jpeg`;
        image.alt = "KodRise Tech";
        image.style.setProperty("width", "195px", "important");
        image.style.setProperty("height", "30px", "important");
        image.style.setProperty("max-width", "none", "important");
        image.style.setProperty("object-fit", "cover", "important");
        image.style.setProperty("object-position", "center", "important");
        image.style.setProperty("mix-blend-mode", backgroundIsDark ? "screen" : "multiply", "important");
        return;
      }
      for (const attribute of ["src", "data-src", "data-lazy-src", "data-original", "data-progressive"]) {
        const value = image.getAttribute(attribute);
        if (value) image.setAttribute(attribute, replaceMediaUrl(value));
      }
      if (!image.getAttribute("src") || image.getAttribute("src") === "data:,") {
        const deferredSource = ["data-src", "data-lazy-src", "data-original", "data-progressive"]
          .map((attribute) => image.getAttribute(attribute))
          .find((value): value is string => Boolean(value && value !== "data:,"));
        if (deferredSource) image.src = replaceMediaUrl(deferredSource);
      }
      const srcset = image.getAttribute("srcset");
      if (srcset) image.setAttribute("srcset", srcset.split(",").map((entry) => {
        const [url, ...descriptor] = entry.trim().split(/\s+/);
        return [replaceMediaUrl(url), ...descriptor].join(" ");
      }).join(", "));
      // Some retired source CDN image paths now return 403. Remove their
      // broken-image glyph (and empty badge frame) instead of leaving a
      // mismatched or stretched placeholder in the page.
      if (image.complete && image.naturalWidth === 0) removeUnavailableImage();
    });
    documentInsideFrame.querySelectorAll<HTMLElement>("[style]").forEach((element) => {
      const style = element.getAttribute("style");
      if (style) element.setAttribute("style", style.replace(/url\((['"]?)(.*?)\1\)/gi, (_match, quote: string, url: string) => `url(${quote}${replaceMediaUrl(url)}${quote})`));
    });

    const page = pageContent.page;
    if (page) {
      if (page.heroTitle || page.heroAccent) {
        const heading = documentInsideFrame.querySelector<HTMLElement>("main h1, h1");
        if (heading) heading.textContent = [page.heroTitle, page.heroAccent].filter(Boolean).join(" ");
      }
      if (page.heroDescription) {
        const heading = documentInsideFrame.querySelector<HTMLElement>("main h1, h1");
        const hero = heading?.closest("section") || heading?.parentElement;
        const description = hero?.querySelector<HTMLElement>("p") || heading?.nextElementSibling;
        if (description instanceof HTMLElement) description.textContent = page.heroDescription;
      }
      if (page.heroImage?.asset?.url) {
        const heading = documentInsideFrame.querySelector<HTMLElement>("main h1, h1");
        const hero = heading?.closest("section") || heading?.parentElement;
        const image = hero?.querySelector<HTMLImageElement>("img");
        if (image) {
          image.src = page.heroImage.asset.url;
          image.alt = page.heroImage.alt || "";
        } else if (hero instanceof HTMLElement) {
          hero.style.backgroundImage = `url("${page.heroImage.asset.url}")`;
        }
      }
      const hero = documentInsideFrame.querySelector<HTMLElement>("main h1, h1")?.closest("section");
      if (hero) {
        const links = Array.from(hero.querySelectorAll<HTMLAnchorElement>("a"));
        if (page.primaryCta && links[0]) links[0].textContent = page.primaryCta;
        if (page.primaryCtaUrl && links[0]) links[0].href = page.primaryCtaUrl;
        if (page.secondaryCta && links[1]) links[1].textContent = page.secondaryCta;
        if (page.secondaryCtaUrl && links[1]) links[1].href = page.secondaryCtaUrl;
      }
    }

    documentInsideFrame.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;
      if (rawHref.trim().startsWith("#")) {
        const hash = rawHref.trim();
        anchor.dataset.kodriseHashLink = hash;
        anchor.href = `${siteOrigin}${window.location.pathname}${hash}`;
        anchor.target = "_top";
        return;
      }
      if (/^(?:javascript:|mailto:|tel:)/i.test(rawHref.trim())) return;
      let sourceUrl: URL;
      try { sourceUrl = new URL(rawHref, siteOrigin); } catch { return; }
      if (sourceUrl.origin !== siteOrigin) return;
      const sourcePath = sourceUrl.pathname;
      const localPath = fallbackLocalPath(sourcePath);
      anchor.href = `${siteOrigin}${localPath}${sourceUrl.search}${sourceUrl.hash}`;
      anchor.target = "_top";
    });

    documentInsideFrame.addEventListener("click", (event) => {
      const clicked = event.target as Element | null;
      const hashAnchor = clicked?.closest<HTMLAnchorElement>("a[data-kodrise-hash-link]");
      const hash = hashAnchor?.dataset.kodriseHashLink;
      if (hashAnchor && hash) {
        event.preventDefault();
        if (hash === "#") return;
        let id = hash.slice(1);
        try { id = decodeURIComponent(id); } catch {}
        const target = documentInsideFrame.getElementById(id);
        if (!target || !frame.current) return;
        const fixedHeaderHeight = document.querySelector("body > header")?.getBoundingClientRect().height || 0;
        const pageTop = frame.current.getBoundingClientRect().top + window.scrollY + target.getBoundingClientRect().top;
        window.scrollTo({top: Math.max(0, pageTop - fixedHeaderHeight), behavior: "smooth"});
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${encodeURIComponent(id)}`);
        return;
      }

      const anchor = clicked?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      let destination: URL;
      try { destination = new URL(anchor.href); } catch { return; }
      if (destination.origin !== siteOrigin) return;
      event.preventDefault();
      const localPath = fallbackLocalPath(destination.pathname);
      router.push(`${localPath}${destination.search}${destination.hash}`);
    }, true);

    documentInsideFrame.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach((anchor) => {
      anchor.href = "tel:+919302752700";
      if (anchor.textContent?.trim()) anchor.textContent = "+91 93027 52700";
    });

    documentInsideFrame.querySelectorAll<HTMLFormElement>('form[method="post"],form[method="POST"],form[action*="contact-form-7"]').forEach((form) => {
      if (form.dataset.kodriseHandled === "true") return;
      form.dataset.kodriseHandled = "true";
      const isNewsletter = /noptin|newsletter|subscribe/i.test(`${form.id} ${form.className}`);
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const values = Array.from(new FormData(form).entries()).filter(([, value]) => typeof value === "string") as Array<[string, string]>;
        const pick = (pattern: RegExp) => values.find(([key, value]) => pattern.test(key) && value.trim())?.[1]?.trim() || "";
        if (isNewsletter) {
          const result = await fetch(`${siteOrigin}/api/newsletter`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({email: pick(/email/i)})}).catch(() => null);
          const response = form.querySelector<HTMLElement>("[role='status'],.noptin-message,.noptin-form-notice") || form.parentElement?.querySelector<HTMLElement>("[role='status']");
          if (response) response.textContent = result?.ok ? "Thanks for subscribing." : "Enter a valid email address and try again.";
          return;
        }
        const message = pick(/message|brief|project|details|requirement/i) || values.map(([key, value]) => `${key}: ${value}`).filter((line) => !/email|phone|mobile|name/i.test(line)).join("\n");
        const result = await fetch(`${siteOrigin}/api/contact`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({name: pick(/full.?name|your.?name|^name$/i), email: pick(/email/i), phone: pick(/phone|mobile|tel/i), company: pick(/company|organization/i) || "Not specified", engagement: "Website enquiry", message})}).catch(() => null);
        const response = form.querySelector<HTMLElement>(".wpcf7-response-output") || form.querySelector<HTMLElement>("[role='status']");
        if (response) response.textContent = result?.ok ? "Thanks. Your enquiry has been received." : "Please try again or contact us directly at hr@kodrise.com.";
      });
    });

    documentInsideFrame.getElementById("kodrise-mirror-boot")?.remove();
    if (frame.current) frame.current.style.visibility = "visible";

    if (!documentInsideFrame.body || !frame.current) return;
    const resize = () => {
      const body = documentInsideFrame.body;
      const footer = documentInsideFrame.querySelector<HTMLElement>("footer");
      const footerBottom = footer?.getBoundingClientRect().bottom;
      // The iframe's viewport contributes to documentElement.scrollHeight on
      // some mirrored pages. Measuring it feeds the previous iframe height
      // back into the next resize and makes the frame grow forever.
      const measured = Math.max(
        body.scrollHeight,
        body.getBoundingClientRect().height,
        footerBottom ? footerBottom + (frameWindow?.scrollY || 0) : 0,
      );
      if (measured > 0 && frame.current) frame.current.style.height = `${Math.ceil(measured + 2)}px`;
    };
    cleanupFrameSizing.current?.();
    let resizeTimer = 0;
    const scheduleResize = () => {
      if (resizeTimer) return;
      resizeTimer = window.setTimeout(() => {
        resizeTimer = 0;
        resize();
      }, 80);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(documentInsideFrame.body);
    observer.observe(documentInsideFrame.documentElement);
    const mutationObserver = new MutationObserver(scheduleResize);
    mutationObserver.observe(documentInsideFrame.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style", "src", "srcset"],
    });
    const images = Array.from(documentInsideFrame.images);
    void Promise.all(images.map((image) => image.decode?.().catch(() => undefined))).then(resize);
    frameWindow?.addEventListener("load", resize);
    resize();
    const delayedResizeTimers = [250, 750, 1500, 3000, 6000, 10000].map((delay) => window.setTimeout(resize, delay));
    const resizeInterval = window.setInterval(resize, 500);
    const stopResizeInterval = window.setTimeout(() => window.clearInterval(resizeInterval), 30000);
    cleanupFrameSizing.current = () => {
      observer.disconnect();
      mutationObserver.disconnect();
      frameWindow?.removeEventListener("load", resize);
      delayedResizeTimers.forEach(window.clearTimeout);
      window.clearInterval(resizeInterval);
      window.clearTimeout(stopResizeInterval);
      if (resizeTimer) window.clearTimeout(resizeTimer);
    };
  }, [pathname, revealFrame, router]);

  useEffect(() => {
    customizing.current = false;
    const poll = window.setInterval(() => {
      const documentInsideFrame = frame.current?.contentDocument;
      if (documentInsideFrame?.body && documentInsideFrame.readyState !== "loading") {
        revealFrame();
        void customize().catch(recoverFrame);
        if (frame.current?.style.visibility === "visible") window.clearInterval(poll);
      }
    }, 150);
    const fallback = window.setTimeout(() => {
      void customize().catch(recoverFrame);
    }, 1800);
    return () => {
      window.clearInterval(poll);
      window.clearTimeout(fallback);
      cleanupFrameSizing.current?.();
      cleanupFrameSizing.current = null;
    };
  }, [pathname, customize, recoverFrame, revealFrame]);

  useEffect(() => {
    let observedDocument: Document | null = null;
    let observer: MutationObserver | null = null;
    let scheduled = 0;
    const syncHeight = () => {
      const iframe = frame.current;
      const documentInsideFrame = iframe?.contentDocument;
      if (!iframe || !documentInsideFrame?.body) return;
      if (documentInsideFrame !== observedDocument) {
        observer?.disconnect();
        observedDocument = documentInsideFrame;
        observer = new MutationObserver(() => {
          if (scheduled) return;
          scheduled = window.setTimeout(() => {
            scheduled = 0;
            syncHeight();
          }, 80);
        });
        observer.observe(documentInsideFrame.documentElement, {childList: true, subtree: true, characterData: true});
      }
      // Use the document body content bounds here too; html.scrollHeight can
      // equal the current iframe viewport and cause an unbounded resize loop.
      const height = Math.max(documentInsideFrame.body.scrollHeight, documentInsideFrame.body.getBoundingClientRect().height);
      if (height > 0 && Math.abs(iframe.getBoundingClientRect().height - height) > 2) iframe.style.height = `${Math.ceil(height + 2)}px`;
    };
    const interval = window.setInterval(syncHeight, 350);
    const onResize = () => syncHeight();
    window.addEventListener("resize", onResize);
    syncHeight();
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
      if (scheduled) window.clearTimeout(scheduled);
    };
  }, [pathname]);

  const isHome = normalizedPath(pathname) === "/";
  return <main className="mirrored-page" id="main" data-home={isHome ? "true" : "false"}>
    <iframe ref={frame} title={title || `Kodrise ${pathname}`} src={`/api/codiant-mirror?path=${encodeURIComponent(pathname)}&v=8`} onLoad={() => {revealFrame(); void customize().catch(recoverFrame);}} scrolling="no" />
  </main>;
}
