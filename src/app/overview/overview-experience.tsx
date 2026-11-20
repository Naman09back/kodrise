import Link from "next/link";
import type { SitePageContent } from "@/sanity/lib/pages";
import styles from "./overview-page.module.css";

type OverviewImage = { src: string; alt: string };
type Props = { page: SitePageContent | null; images: Record<string, OverviewImage> };

const milestones = [
  {
    marker: "2006", kicker: "OUR BEGINNING", title: "A foundation in thoughtful software",
    copy: "Kodrise began with a simple idea: technology should solve real business problems. That focus on useful, well-built software continues to guide our work.",
    image: "portfolio-ucpa", imageAlt: "UCPA digital product project",
  },
  {
    marker: "19+", kicker: "YEARS OF EXPERIENCE", title: "Experience shaped by real challenges",
    copy: "Across nearly two decades, we have worked through the changing needs of businesses, from early digital platforms to connected, data-informed products.",
    image: "portfolio-calcounts", imageAlt: "Calcounts product platform project",
  },
  {
    marker: "1,500+", kicker: "PROJECTS DELIVERED", title: "Building with teams around the world",
    copy: "Every engagement brings a different goal and context. We partner with teams to turn ideas into digital products that are useful, maintainable, and ready to grow.",
    image: "portfolio-scribeflo", imageAlt: "ScribeFlo workflow platform project",
  },
  {
    marker: "NOW", kicker: "WHAT COMES NEXT", title: "Engineering for an AI-first world",
    copy: "We bring AI into product development where it creates real value, while continuing to build the software, commerce experiences, and engineering teams businesses rely on.",
    image: "portfolio-hiregroww", imageAlt: "HireGroww digital product project",
  },
];

export default function OverviewExperience({ page, images }: Props) {
  const banner = images["overview-banner"];
  const title = page?.heroTitle || "A journey powered by people and technology";
  const description = page?.heroDescription || "From our beginnings in software development to the products and AI-enabled solutions we build today, Kodrise keeps moving forward with the teams we serve.";

  return <main className={styles.page}>
    <section className={styles.heroIntro}>
      <span className={styles.eyebrow}>{page?.announcement || "OUR JOURNEY"}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>We combine engineering experience with curiosity and care, helping businesses make progress through technology that fits their goals.</p>
    </section>

    <section className={styles.banner} aria-label="Kodrise engineering and product development">
      {banner ? <img src={banner.src} alt={banner.alt || "Kodrise technology team and digital product work"} fetchPriority="high" /> : <div className={styles.bannerFallback}><span>KODRISE</span><strong>Building what comes next.</strong></div>}
    </section>

    <section className={styles.journey} aria-label="Kodrise journey">
      <div className={styles.journeyHeading}><span className={styles.eyebrow}>THE KODRISE STORY</span><h2>Progress, built one partnership at a time</h2><p>Our story is a continuing commitment to people, practical ideas, and dependable engineering.</p></div>
      <div className={styles.milestoneGrid}>
        {milestones.map((item, index) => {
          const image = images[item.image];
          return <article className={`${styles.milestone} ${index % 2 ? styles.reverse : ""}`} key={item.marker}>
            <div className={styles.milestoneCopy}>
              <span className={styles.milestoneKicker}>{item.kicker}</span>
              <strong className={styles.marker}>{item.marker}</strong>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              {index === 3 && <Link href="/services">Explore our services <span aria-hidden="true">↗</span></Link>}
            </div>
            <div className={styles.milestoneImage}>
              {image ? <img src={image.src} alt={image.alt || item.imageAlt} loading="lazy" /> : <div className={styles.imageFallback}><span>0{index + 1}</span></div>}
            </div>
          </article>;
        })}
      </div>
    </section>

    <section className={styles.principles}>
      <div className={styles.principlesInner}>
        <div><span className={styles.eyebrow}>HOW WE MOVE FORWARD</span><h2>Good technology starts with understanding.</h2></div>
        <div className={styles.principleGrid}>
          <article><span>01</span><h3>Listen first</h3><p>We learn about the people, priorities, and constraints behind every project.</p></article>
          <article><span>02</span><h3>Build with purpose</h3><p>We choose the right approach for the problem, then focus on quality and usability.</p></article>
          <article><span>03</span><h3>Keep improving</h3><p>We work alongside our clients as products evolve and new opportunities emerge.</p></article>
        </div>
      </div>
    </section>

    <section className={styles.closing}>
      <span className={styles.eyebrow}>LET’S BUILD WHAT’S NEXT</span>
      <h2>Have a challenge in mind?</h2>
      <p>Tell us where you want to go. We’ll help you find a practical way to get there.</p>
      <Link href={page?.primaryCtaUrl || "/contact"}>{page?.primaryCta || "Talk to our team"}<span aria-hidden="true">↗</span></Link>
    </section>
  </main>;
}
