import type {Metadata} from "next";
import Link from "next/link";
import styles from "./shopify-services.module.css";

export const metadata: Metadata = {
  title: "Shopify Services",
  description: "Shopify commerce services to build, grow, and evolve your online business.",
};

type ServiceLink = [string, string] | {label: string; href: string; children: [string, string][]};
type ServiceGroup = {title: string; description: string; links: ServiceLink[]};

const groups: ServiceGroup[] = [
  {
    title: "Build",
    description: "Build the commerce foundation your business needs.",
    links: [
      ["Shopify Development", "/shopify-services/shopify-development"],
      ["Shopify App Development", "/shopify-services/shopify-app-development"],
      ["Shopify Website Design", "/shopify-services/website-design"],
      ["Shopify Website Development", "/shopify-services/website-development"],
      ["B2B Ecommerce Solutions", "/shopify-services/b2b-ecommerce-solutions"],
      ["Headless Commerce", "/shopify-services/headless-commerce"],
      ["Mobile App Development", "/shopify-services/mobile-app-development"],
      ["Custom Ecommerce Solutions", "/shopify-services/custom-ecommerce-solutions"],
    ],
  },
  {
    title: "Grow",
    description: "Improve performance, visibility, and revenue.",
    links: [
      ["Shopify Marketing", "/shopify-services/marketing"],
      ["SEO", "/shopify-services/seo"],
      ["PPC", "/shopify-services/ppc"],
      ["Content Marketing", "/shopify-services/content-marketing"],
      ["Social Media Marketing", "/shopify-services/social-media-marketing"],
      ["Email Marketing", "/shopify-services/email-marketing"],
    ],
  },
  {
    title: "Evolve",
    description: "Modernize, optimize, and scale your commerce ecosystem.",
    links: [
      {label: "Shopify Migration", href: "/shopify-services/shopify-migration", children: [["Adobe Commerce", "/shopify-services/shopify-migration/adobe-commerce"], ["BigCommerce", "/shopify-services/shopify-migration/bigcommerce"], ["WooCommerce", "/shopify-services/shopify-migration/woocommerce"], ["Salesforce", "/shopify-services/shopify-migration/salesforce"], ["Magento", "/shopify-services/shopify-migration/magento"], ["Squarespace", "/shopify-services/shopify-migration/squarespace"], ["Wix", "/shopify-services/shopify-migration/wix"]]},
      ["AI & Agentic Commerce", "/shopify-services/ai-agentic-commerce"],
      ["Shopify Ongoing Support", "/shopify-services/ongoing-support"],
      ["Dedicated Commerce Teams", "/shopify-services/development-services"],
    ],
  },
] as const;

export default function ShopifyServicesPage() {
  return <main className={styles.page} id="main">
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <span className={styles.eyebrow}>SHOPIFY SERVICES</span>
        <h1>Commerce built to <em>build, grow, and evolve.</em></h1>
        <p>From your first storefront to a connected commerce ecosystem, find the Shopify support your business needs at every stage.</p>
        <Link className={styles.cta} href="/contact">Talk to our Shopify team <span aria-hidden="true">→</span></Link>
      </div>
      <div className={styles.heroArt} aria-hidden="true"><div className={styles.orbit} /><div className={styles.orbitInner} /><div className={styles.shopBag}>K</div><span className={styles.artTag}>COMMERCE<br />ENGINEERED</span></div>
    </section>

    <section className={styles.catalog} aria-label="Shopify service categories">
      <div className={styles.catalogHeading}><span className={styles.eyebrow}>OUR CAPABILITIES</span><h2>One commerce partner.<br /><em>Every stage of growth.</em></h2></div>
      <div className={styles.groups}>{groups.map((group, index) => <article className={styles.group} key={group.title}>
        <div className={styles.groupTop}><span>0{index + 1}</span><h3>{group.title}</h3></div>
        <p className={styles.description}>{group.description}</p>
        <ul>{group.links.map((entry) => Array.isArray(entry) ? <li key={entry[0]}><Link href={entry[1]}>{entry[0]}<span aria-hidden="true">↗</span></Link></li> : <li key={entry.label}><Link href={entry.href}>{entry.label}<span aria-hidden="true">↗</span></Link><ul className={styles.subLinks}>{entry.children.map(([label, href]) => <li key={label}><Link href={href}>{label}<span aria-hidden="true">↗</span></Link></li>)}</ul></li>)}</ul>
      </article>)}</div>
    </section>
  </main>;
}
