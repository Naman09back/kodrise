import type {Metadata} from "next";
import Link from "next/link";
import styles from "./shopify-services.module.css";

export const metadata: Metadata = {
  title: "Shopify Services",
  description: "Shopify commerce services to build, grow, and evolve your online business.",
};

const groups = [
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
      ["SEO", "/shopify-services/marketing#search-visibility"],
      ["PPC", "/shopify-services/marketing#ppc"],
      ["Content Marketing", "/shopify-services/marketing#content-marketing"],
      ["Social Media Marketing", "/shopify-services/marketing#social-media-marketing"],
      ["Email Marketing", "/shopify-services/marketing#email-marketing"],
      ["Abandoned Checkout Recovery", "/shopify-services/abandoned-checkout-recovery"],
    ],
  },
  {
    title: "Evolve",
    description: "Modernize, optimize, and scale your commerce ecosystem.",
    links: [
      ["Shopify Migration", "/shopify-services/migration"],
      ["Adobe Commerce", "/shopify-services/adobe-commerce"],
      ["BigCommerce", "/shopify-services/bigcommerce"],
      ["WooCommerce", "/shopify-services/woocommerce"],
      ["Salesforce", "/shopify-services/salesforce"],
      ["Magento", "/shopify-services/magento"],
      ["Squarespace", "/shopify-services/squarespace"],
      ["Wix", "/shopify-services/wix"],
      ["AI & Agentic Commerce", "/shopify-services/ai-agentic-commerce"],
      ["Shopify Ongoing Support", "/shopify-services/ongoing-support"],
      ["Shopify Development Services", "/shopify-services/development-services"],
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
        <ul>{group.links.map(([label, href]) => <li key={label}><Link href={href}>{label}<span aria-hidden="true">↗</span></Link></li>)}</ul>
      </article>)}</div>
    </section>
  </main>;
}
