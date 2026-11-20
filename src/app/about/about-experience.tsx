"use client";

import Link from "next/link";
import {useRef, useState} from "react";
import type {SitePageContent} from "@/sanity/lib/pages";
import styles from "./about-page.module.css";

type AboutImage = {src: string; alt: string};
type AboutExperienceProps = {images: Record<string, AboutImage>; page: SitePageContent | null};

const imageFallbacks: Record<string, string> = {
  "about-hero": "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2023/06/about-us-banner.webp",
  "about-stats-background": "https://cdn.sanity.io/images/5vojr174/production/9641283f605af6bff488960c70026615d57b1e0f-1482x516.jpg",
  "about-partner-photo": "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2023/06/innovative-solutions.webp",
  "about-careers-photo": "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2023/07/enthusiastic.webp",
};

const features = [
  ["Established In 2006", "We are a leading software company, proudly serving our clients since our establishment in 2006.", "▦"],
  ["Location", "Headquartered in the USA with offices in the UK, Australia, UAE and India.", "⌖"],
  ["Quality Certified", "ISO-9001-2015 certified for quality and ISO/IEC-27001:2013 certified for data security.", "♙"],
  ["Successful Projects", "1500+ projects successfully delivered in 18 years.", "♧"],
  ["Our Specialism", "We provide tailored support to startups and SMEs — our specialism.", "♧"],
  ["Award-Winning Software", "We deliver robust, scalable, and award-winning software.", "✧"],
];

const values = [
  ["Excellence in Work", "We empower businesses and elevate customer experiences through our excellence in what we do."],
  ["Respect Individuality", "We value every person’s perspective and create space for people to do their best work."],
  ["Integrity", "We build lasting partnerships through transparency, accountability, and trust."],
  ["Progressive Learning", "We keep learning, adapting, and sharing knowledge as technology moves forward."],
];

const disciplines = [["10%", "Sales & Marketing", "◎"], ["10%", "Business Analytics", "⌁"], ["20%", "Design & Strategy", "◇"], ["40%", "Development", "⚙"], ["10%", "Testing", "♧"], ["10%", "Maintenance & Support", "☏"]];

const reasons = [
  ["Unmatched Customer Service", "Kodrise’s ‘Extreme Customer Service’ provides personalized attention, continuous communication, immediate action, and definitive follow-through. We listen and we deliver."],
  ["Helpful Experts", "Our experienced teams bring practical knowledge and a collaborative approach to every engagement."],
  ["Exceptional Quality", "We focus on reliable, maintainable products that meet clear quality standards."],
  ["Technology and Best Practices", "We choose proven tools and practices that fit the work and help teams scale confidently."],
  ["Independent and Objective", "We give straightforward guidance that keeps your business goals at the center."],
];

const branchTabs = ["North America", "Asia", "Australia", "European Union", "Global Operations", "Middle East & Africa"];
const branches: Record<string, {name: string; address: string; phone?: string; image: string}[]> = {
  "North America": [
    {name: "East Moline", address: "455 Avenue of the Cities, East Moline, IL - 61244", phone: "+1-309-278-0633 · +1-872-444-3361", image: "usa"},
    {name: "Canada", address: "Mississauga 350 Burnhamthorpe Rd. West, Suite #200 Office 28, Mississauga, Ontario L5B 3J1", phone: "+1-(647) 438-8265", image: "canada"},
    {name: "Peoria", address: "Suite #717, 416 Main Street, Peoria, IL - 61602", image: "peoria"},
  ],
  Asia: [
    {name: "Corporate Office", address: "101, Bansi Trade Center, 581/5 M. G. Road, Indore - MP 452001", phone: "+91-731-429-1704 · +91-731-4032-967", image: "corporate-office"},
    {name: "Indore", address: "Crystal IT PARK STP-1, Ground Floor, IT/ITES-SEZ, Near Bhawar Kuwan Square, Indore - 452001", image: "indore"},
    {name: "Hyderabad", address: "6th Floor, Tower #20, Raheja Mind Space IT Park, Madhapur, Hyderabad - 500081 (TS)", image: "hyderabad"},
    {name: "Hinjewadi MIDC, Pune", address: "Plot No. 23/1, IT & ITES MIDC, Rajiv Gandhi Infotech Park Phase-3, Hinjawadi, Pune - 411057", image: "hinjewadi"},
    {name: "Magarpatta City, Pune", address: "Wing-A Level - 7, Tower 15, Cybercity Magarpatta City, Hadapsar, Pune - 411013 (MH)", image: "magarpatta"},
    {name: "Malaysia", address: "B-10-4, Megan Avenue 1, 189 Jalan Tun Razak 50400, Kuala Lumpur, Malaysia", image: "malaysia"},
    {name: "Singapore", address: "63 Market Street #09-01, The Bank of Singapore Centre, Singapore 048942", image: "singapore"},
  ],
  Australia: [{name: "Sydney", address: "YASH Technologies Australia Pty. Ltd., C/o Crown Corporate Services, Level 35, Tower One Barangaroo, Sydney NSW 2000", phone: "+61 450 501 299", image: "sydney"}],
  "European Union": [
    {name: "West Sussex, UK", address: "The Courtyard, Shoreham Road, Upper Beeding, West Sussex, United Kingdom, BN44 3TN", phone: "+44 20 7448 7000", image: "uk"},
    {name: "Sweden", address: "AB Sveavägen 33, 3rd Floor, 111 34 Stockholm", image: "sweden"},
  ],
  "Global Operations": [{name: "East Moline IL, USA", address: "455 Avenue of the Cities, East Moline IL-61244", phone: "+1-309-278-0633 · +1-872-444-3361", image: "corporate-office-indore"}],
  "Middle East & Africa": [
    {name: "UAE", address: "Office 3602, 36th Floor, Al Shatha Towers, Dubai Internet City, P.O. Box 501714", phone: "+971-4-433-2834", image: "uae"},
    {name: "Abu Dhabi", address: "Office 848, Al Ansari Building, Khalifa Street, P.O. Box 28346", image: "abu-dhabi"},
  ],
};

const awards = [
  ["Kodrise on Expertise", "expertise"], ["Kodrise on The Manifest", "manifest"], ["Quality Management System", "iso-9001"], ["Information Security System", "iso-27001"], ["Kodrise on Appfutura", "appfutura"], ["Kodrise on GoodFirms", "goodfirms"], ["Kodrise at Right Firms", "rightfirms"], ["Kodrise on Clutch.co", "clutch"], ["Kodrise at Selected Firms.co", "selected-firms"], ["Kodrise on IT Firms.co", "it-firms"], ["Kodrise on develop4u.co", "develop4u"], ["Kodrise on Top Developers", "top-developers"], ["Kodrise on Top Firms", "topfirms"], ["AppFirms Review For Kodrise", "appfirms"], ["Kodrise on Top App Creators", "top-app-creators"], ["Kodrise on TopAppFirms", "topappfirms"], ["Kodrise on DesignRush", "designrush"], ["Kodrise on Software Suggest", "software-suggest"],
];

const testimonials = [
  {quote: "Kodrise delivered precisely what we needed, a top-notch website, with seamless film recollection. Their expertise exceeded our expectations, and we couldn't be more satisfied with the final result. Thank you, Kodrise, for an outstanding collaboration!", name: "Gezabel Perroti", role: "Co-Founder, DISTRI7", logo: "distri-logo", person: "gezabel-perroti"},
  {quote: "Kodrise has been our go-to partner for a while now. They've successfully handled several major projects. Among them, Autism Connect stands out as their greatest achievement. Their dedication and expertise are phenomenal. Highly recommended!", name: "Catherine Kleins", role: "Co-Founder, AUTISM WEST MIDLANDS", logo: "autism-logo", person: "catherine-kleins"},
  {quote: "Kodrise successfully delivered my complex software project (web, iOS, Android) despite language barriers and a wide scope. Exceeding expectations, they proved to be a top offshore tech company—I’ll continue working with them. Highly recommended!", name: "Basim Albeladi", role: "CEO, Labayh", logo: "labayh-logo", person: "basim-albeladi"},
  {quote: "The client's site visitors increased and the bounce rate improved by 6.5%, with a higher conversion rate of 15%. Kodrise was proactive and communicative during the collaboration. Overall, the client was happy with the results, which met their expectations.", name: "Dr. Mathew Jafarzadeh", role: "Founder, Cosmetic Choice", logo: "cosmetic-choice-logo", person: "mathew-jafarzadeh"},
  {quote: "Kodrise was a great partner in developing our Clinical Trial Guide website. Their expertise in the healthcare industry, structured project management, and proactive communication made the process smooth. They delivered high-quality work and valuable insights throughout.", name: "David Polinsky", role: "CEO, Clinical Trial Company", logo: "clinical-trial-logo", person: "david-polinsky"},
  {quote: "Kodrise streamlined our courier operations with a custom web system that improved efficiency and conversions. Their project management, attention to detail, and commitment to quality truly exceeded expectations.", name: "Martin Young", role: "Director, Same Day Dispatch Services Ltd", logo: "same-day-dispatch-logo", person: "martin-young"},
];

function getAboutImage(images: Record<string, AboutImage>, slot: string, fallback?: string): AboutImage | undefined {
  return images[slot] || (fallback ? {src: fallback, alt: slot.replaceAll("-", " ")} : undefined);
}

export default function AboutExperience({images, page}: AboutExperienceProps) {
  const [activeValue, setActiveValue] = useState(0);
  const [activeReason, setActiveReason] = useState(0);
  const [activeBranch, setActiveBranch] = useState("Asia");
  const [testimonialStart, setTestimonialStart] = useState(0);
  const awardTrack = useRef<HTMLDivElement>(null);
  const heroImage = getAboutImage(images, "about-hero", imageFallbacks["about-hero"]);
  const statsBackground = getAboutImage(images, "about-stats-background", imageFallbacks["about-stats-background"]);
  const partnerImage = getAboutImage(images, "about-partner-photo", imageFallbacks["about-partner-photo"]);
  const careersImage = getAboutImage(images, "about-careers-photo", imageFallbacks["about-careers-photo"]);
  const visibleTestimonials = Array.from({length: 3}, (_, index) => testimonials[(testimonialStart + index) % testimonials.length]);

  return <main id="main" className={styles.page}>
    <section className={styles.hero} style={{backgroundImage: heroImage ? `linear-gradient(90deg,rgba(7,10,20,.85),rgba(7,10,20,.14)),url("${heroImage.src}")` : undefined}}>
      <div className={styles.heroCopy}><span className={styles.kicker}>IT ALL STARTS WITH “WE”</span><h1><span>{page?.heroTitle || "Enriching lives"}</span><span>{page?.heroAccent || "Through our tech-innovations"}</span></h1><p>{page?.heroDescription || "We are delivering exceptional digital experiences with our boldest ideas that make the world better for everyone."}</p><Link className={styles.primaryButton} href={page?.primaryCtaUrl || "/contact"}>{page?.primaryCta || "Know More"}</Link></div>
    </section>

    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">About Us</span></nav>

    <section className={styles.introSection}>
      <div className={styles.introHeading} id="about-content"><h2>Your End-To-End AI-Driven Software Development and Digital Transformation Partner</h2><p>Embrace our partnership to experience the power of collective knowledge and a tech-driven skillset that promises the best work infused with advanced technologies.</p></div>
      <div className={styles.featureGrid}>{features.map(([title, description, icon]) => <article className={styles.featureCard} key={title}><span className={styles.featureIcon} aria-hidden="true">{icon}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      <div className={styles.videoFrame} aria-label="Company introduction video"><span className={styles.videoPlay} aria-hidden="true">▶</span></div>
    </section>

    <section className={styles.statsSection} style={{backgroundImage: statsBackground ? `url("${statsBackground.src}")` : undefined}}>
      <h2>About Kodrise</h2><p>Together with our partnership and industry experience, we are creating a robust ecosystem to bring huge business transformations.</p>
      <div className={styles.statGrid}>{[["19+", "Years on the Market"], ["550+", "In-house Engineers"], ["100+", "Senior-level Developers"], ["1500+", "Successful Projects"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    </section>

    <section className={styles.valuesSection}>
      <div className={styles.sectionTitle}><h2>Our Values</h2><p>Our core values are defined by our individual characters through their work patterns and business decisions.</p></div>
      <div className={styles.accordion}>{values.map(([title, description], index) => <article className={`${styles.accordionItem} ${activeValue === index ? styles.active : ""}`} key={title}><button type="button" aria-expanded={activeValue === index} onClick={() => setActiveValue(index)}><span>{title}</span><b aria-hidden="true">{activeValue === index ? "⌃" : "⌄"}</b></button>{activeValue === index && <p>{description}</p>}</article>)}</div>
    </section>

    <section className={styles.visionSection}>
      <div className={styles.splitHeading}><h2>Our Visionaries Help in Accelerating the Process</h2><p>With our enthusiast workforce and seasoned engineers, we create excellent solutions at a rushed pace to serve businesses across the world.</p></div>
      <div className={styles.disciplineGrid}>{disciplines.map(([percentage, name, icon]) => <div className={styles.discipline} key={name}><span aria-hidden="true">{icon}</span><p><strong>{percentage}</strong><small>{name}</small></p></div>)}</div>
    </section>

    <section className={styles.reasonsSection}>
      <div className={styles.reasonsIntro}><h2>Compelling Reasons To Partner with Us</h2><p>We achieve the highest level of market attention with our excellent work commitment in an ever-changing world.</p>{partnerImage && <img src={partnerImage.src} alt={partnerImage.alt} loading="lazy" />}</div>
      <div className={styles.accordion}>{reasons.map(([title, description], index) => <article className={`${styles.accordionItem} ${activeReason === index ? styles.active : ""}`} key={title}><button type="button" aria-expanded={activeReason === index} onClick={() => setActiveReason(index)}><span>{title}</span><b aria-hidden="true">{activeReason === index ? "⌃" : "⌄"}</b></button>{activeReason === index && <p>{description}</p>}</article>)}</div>
    </section>

    <section className={styles.branchesSection}>
      <h2>Other World wide Branches</h2>
      <div className={styles.branchTabs} role="tablist" aria-label="Office regions">{branchTabs.map((tab) => <button key={tab} role="tab" aria-selected={activeBranch === tab} onClick={() => setActiveBranch(tab)}>{tab}</button>)}</div>
      <div className={styles.branchGrid}>{branches[activeBranch].map((branch) => {const icon = getAboutImage(images, `about-branch-${branch.image}`);return <article className={styles.branchCard} key={branch.name}>{icon && <img src={icon.src} alt="" loading="lazy" />}<h3>{branch.name}</h3><p>{branch.address}</p>{branch.phone && <a href={`tel:${branch.phone.replaceAll(/[^+\d]/g, "")}`}>{branch.phone}</a>}</article>;})}</div>
    </section>

    <section className={styles.awardsSection}>
      <div className={styles.sectionTitle}><h2>Industry Recognized</h2><p>For 10+ years on the market, we’ve been awarded by industry-leading rankings and associations.</p></div>
      <div className={styles.awardFrame}><button type="button" aria-label="Previous awards" onClick={() => awardTrack.current?.scrollBy({left: -260, behavior: "smooth"})}>←</button><div className={styles.awardTrack} ref={awardTrack}>{awards.map(([label, slug]) => {const awardImage = getAboutImage(images, `about-award-${slug}`);return <article className={styles.awardCard} key={slug}>{awardImage ? <img src={awardImage.src} alt={awardImage.alt} loading="lazy" /> : <span className={styles.awardPlaceholder} aria-hidden="true">★</span>}<h3>{label}</h3></article>;})}</div><button type="button" aria-label="Next awards" onClick={() => awardTrack.current?.scrollBy({left: 260, behavior: "smooth"})}>→</button></div>
    </section>

    <section className={styles.testimonialsSection}>
      <div className={styles.testimonialsHeading}><div><h2>What Our Clients Say</h2><p>Read the voices of trust, satisfaction, and motivation helping us to navigate our next innovation.</p></div><Link href="/portfolio">Explore More</Link></div>
      <div className={styles.testimonialGrid}>{visibleTestimonials.map((item) => {const logo = getAboutImage(images, `about-testimonial-${item.logo}`);const person = getAboutImage(images, `about-testimonial-${item.person}`);return <article className={styles.testimonialCard} key={item.name}>{logo && <img className={styles.clientLogo} src={logo.src} alt={logo.alt} loading="lazy" />}<p>{item.quote}</p><div className={styles.testimonialPerson}>{person && <img src={person.src} alt="" loading="lazy" />}<span><strong>{item.name}</strong><small>{item.role}</small></span></div></article>;})}</div>
      <div className={styles.sliderControls}><button type="button" aria-label="Previous client reviews" onClick={() => setTestimonialStart((testimonialStart + testimonials.length - 1) % testimonials.length)}>←</button><span>{[0, 1, 2, 3].map((point) => <i key={point} className={Math.floor(testimonialStart / 1.5) % 4 === point ? styles.currentDot : ""} />)}</span><button type="button" aria-label="Next client reviews" onClick={() => setTestimonialStart((testimonialStart + 1) % testimonials.length)}>→</button></div>
    </section>

    <section className={styles.careersSection}>
      <div><h2>We are always in search of enthusiastic people to join us.</h2><p>At Kodrise, we thrive on the energy of driven individuals. If you’re eager to make a meaningful impact and grow alongside a vibrant community, we’d love to have you on board.</p><Link className={styles.primaryButton} href="/careers">Apply Now</Link></div>
      {careersImage && <img src={careersImage.src} alt={careersImage.alt} loading="lazy" />}
    </section>
  </main>;
}
