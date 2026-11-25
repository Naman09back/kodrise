import Image from "./migration-images";
import Link from "next/link";
import styles from "./migration-page.module.css";

const asset = "/site-assets/shopify-migration/";

const benefits = [
  ["Built to Scale", "Handle growing product catalogs, traffic, transactions, markets, and operational complexity without having to rebuild your commerce foundation every time you grow."],
  ["Designed for Global Commerce", "Expand into new markets while managing international commerce from a centralized platform, with capabilities built for localization and global selling."],
  ["Flexible by Design", "Customize the storefront, connect third-party systems through APIs, extend functionality through apps, or build headless experiences when you need more control."],
  ["Built for Complex Commerce", "Support B2B, omnichannel, multiple stores, advanced workflows, and the operational requirements that come with running a larger commerce business."],
  ["Less Technology Overhead", "Shopify Plus brings more of the commerce stack together, helping businesses reduce the time and resources spent managing multiple disconnected systems."],
];

const steps = [
  ["Understand", "We map your existing commerce ecosystem including your business model, storefront, data, integrations, workflows, customer journeys, and technical dependencies.", "move-understand-a-960w.webp"],
  ["Plan", "We create the migration architecture and roadmap, identifying what moves as-is, what needs to be rebuilt, what should be improved, and what could break if it's overlooked.", "move-plan-a-960w.webp"],
  ["Build & Migrate", "We rebuild the required storefront functionality, connect your systems, migrate your data, and recreate the workflows your business depends on.", "move-build-a-960w.webp"],
  ["Test", "We test the new environment across functionality, data, integrations, customer journeys, performance, and SEO before you're anywhere near launch day.", "move-test-a-960w.webp"],
  ["Launch & Stabilize", "We coordinate the transition, monitor the new store, and address issues quickly so your business can keep operating while the new infrastructure settles in.", "move-launch-a-960w.webp"],
];

const migrationOptions = [
  {name:"Adobe Commerce",slug:"adobe-commerce",description:"Move from Adobe Commerce to a more streamlined Shopify commerce infrastructure.",image:"from-adobe-a-960w.webp"},
  {name:"Magento",slug:"magento",description:"Migrate your Magento store while protecting the data, functionality, and SEO you've built.",image:"from-magento-a-960w.webp"},
  {name:"BigCommerce",slug:"bigcommerce",description:"Move your BigCommerce operation to Shopify without disrupting the customer experience.",image:"from-bigcommerce-a-960w.webp"},
  {name:"WooCommerce",slug:"woocommerce",description:"Bring your products, customers, orders, and storefront experience into Shopify.",image:"from-woocommerce-a-960w.webp"},
  {name:"Salesforce Commerce Cloud",slug:"salesforce",description:"Move from a complex enterprise commerce environment to Shopify's commerce platform.",image:"from-salesforce-a-960w.webp"},
  {name:"Shopware",description:"Migrate your Shopware store, data, functionality, and integrations to Shopify.",image:"from-shopware-a-960w.webp"},
  {name:"PrestaShop",description:"Migrate your PrestaShop store to Shopify with a plan built around your existing business requirements.",image:"from-prestashop-a-960w.webp"},
  {name:"Wix",slug:"wix",description:"Transition from Wix to a more commerce-focused platform built around your growing ecommerce operation.",image:"from-wix-a-960w.webp"},
  {name:"Squarespace",slug:"squarespace",description:"Move your ecommerce experience from Squarespace to Shopify while preserving the elements that matter to your business.",image:"from-squarespace-a-960w.webp"},
  {name:"Shopline",description:"Migrate your Shopline store and commerce data to Shopify.",image:"from-shopline-a-960w.webp"},
  {name:"OpenCart",description:"Move from OpenCart to Shopify with your commerce data and workflows accounted for.",image:"from-opencart-a-960w.webp"},
  {name:"Custom Platform",description:"Move away from a proprietary or custom ecommerce platform without losing the functionality your business depends on.",image:"from-custom-a-960w.webp"},
  {name:"Shopify to Shopify Plus",description:"Upgrade your existing Shopify store to Shopify Plus when your business needs more advanced commerce capabilities.",image:"from-shopify-plus-a-960w.webp"},
];

const principles = [
  ["Business Before Technology", "We understand your business model and workflows before making technical decisions."],
  ["Data Without the Drama", "Products, customers, orders, content, and other critical data are planned and migrated with the new architecture in mind."],
  ["Integrations That Actually Work", "We account for the systems your business depends on, not just the storefront visitors see."],
  ["SEO Isn't an Afterthought", "Your existing search visibility and site structure are considered throughout the migration rather than addressed after launch."],
  ["Built for What's Next", "We don't just recreate your current store. We build the Shopify environment around where your commerce business is going."],
];

export default function ShopifyMigrationClient() {
  return <main id="main" className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroImage}><Image src={`${asset}migrate-move-a.webp`} alt="Two people carrying a moving box together" fill preload sizes="(max-width: 700px) 100vw, 48vw" /></div>
      <div className={styles.heroShade} />
      <div className={styles.heroContent}><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/shopify-services">Shopify Services</Link><span>/</span><span aria-current="page">Shopify Migration</span></nav><span className={styles.eyebrow}>SHOPIFY SERVICES · EVOLVE</span><h1>Shopify Migration Services</h1><p>Move your business to Shopify with a plan that protects what you've built and prepares your commerce operation for what's next.</p><Link className={styles.primaryCta} href="/contact?service=Shopify%20Migration">Talk to Our Migration Experts <span aria-hidden="true">↗</span></Link></div>
      <div className={styles.heroLabel}>A CLEAR PATH<br/>TO WHAT'S NEXT</div>
    </section>



    <section className={styles.benefitSection} aria-labelledby="benefits-title"><div className={styles.sectionIntro}><span className={styles.eyebrow}>WHY SHOPIFY PLUS?</span><h2 id="benefits-title">Why Are Fast-Growing and Global Brands Moving to Shopify Plus?</h2><p>Shopify Plus gives brands a commerce platform built around scale, flexibility, and faster execution with the ability to connect the systems they already use, support multiple markets and channels, and extend the platform as their requirements become more sophisticated.</p></div><div className={styles.benefitGrid}>{benefits.map(([title,copy],index)=><article className={styles.benefitCard} key={title}><span className={styles.index}>0{index+1}</span><span className={styles.spark} aria-hidden="true">✳</span><h3>{title}</h3><p>{copy}</p></article>)}</div><a className={styles.inlineLink} href="https://www.shopify.com/plus" target="_blank" rel="noreferrer">Explore Shopify Plus <span aria-hidden="true">↗</span></a></section>

    <section className={styles.process} aria-labelledby="process-title"><header className={styles.sectionIntro}><span className={styles.eyebrow}>OUR MIGRATION PROCESS</span><h2 id="process-title">How We Migrate You to Shopify</h2><p>We first understand how your business actually works — your customers, products, workflows, integrations, data, SEO, and operational dependencies — and then build the migration around that reality.</p></header><div className={styles.steps}>{steps.map(([title,copy,image],index)=><article className={styles.step} key={title}><div className={styles.stepImage}><Image src={`${asset}${image}`} alt={`${title} stage of a Shopify migration`} fill sizes="(max-width: 700px) 90vw, 34vw" loading="lazy"/><span>0{index+1}</span></div><div className={styles.stepCopy}><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className={styles.migrationPaths} aria-labelledby="paths-title"><header className={styles.sectionIntro}><span className={styles.eyebrow}>PLATFORM MIGRATION</span><h2 id="paths-title">Whatever You're Migrating From, We've Got a Path Forward</h2><p>Every platform has its own architecture, data structures, workflows, integrations, and limitations. That's why we don't use a one-size-fits-all migration process.</p></header><div className={styles.pathGrid}>{migrationOptions.map((option,index)=>{const href=option.slug?`/shopify-services/shopify-migration/${option.slug}`:`/contact?service=${encodeURIComponent(`${option.name} to Shopify Migration`)}`;return <Link href={href} className={styles.pathCard} key={option.name}><div className={styles.pathImage}><Image src={`${asset}${option.image}`} alt={`${option.name} ecommerce platform migration`} fill sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 30vw" loading="lazy"/><span className={styles.pathNumber}>0{index+1}</span></div><div className={styles.pathBody}><div className={styles.platformMarks}><span>{option.name}</span><span className={styles.migrationArrow} aria-hidden="true">→</span><span>Shopify</span></div><h3>{option.name} <span>→ Shopify/Shopify Plus</span></h3><p>{option.description}</p><b className={styles.cardLink}>Explore migration <span aria-hidden="true">↗</span></b></div></Link>})}</div></section>

    <section className={styles.principles} aria-labelledby="principles-title"><header className={styles.sectionIntro}><span className={styles.eyebrow}>MIGRATE WITH THE FUTURE IN MIND</span><h2 id="principles-title">We Don't Just Migrate Your Store. We Keep Your Future in Mind.</h2><p>We look beyond what's currently on your store to understand why it works the way it does, what your business actually needs, and where you're headed next.</p></header><div className={styles.principleGrid}>{principles.map(([title,copy],index)=><article className={styles.principle} key={title}><span>0{index+1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className={styles.finalCta}><div className={styles.ctaImage}><Image src={`${asset}migrate-move-a.webp`} alt="A team moving forward together" fill sizes="(max-width: 700px) 100vw, 45vw" loading="lazy"/></div><div className={styles.ctaOverlay}/><div className={styles.ctaContent}><span className={styles.eyebrow}>YOUR NEXT CHAPTER STARTS HERE</span><h2>The Migration Is Only the Beginning</h2><p>Whether you're moving from Magento, Adobe Commerce, BigCommerce, WooCommerce, Salesforce, a custom platform, or upgrading from Shopify to Shopify Plus, we'll help you make the transition without compromising what you've already built or what you're planning to build next.</p><Link className={styles.primaryCta} href="/contact?service=Shopify%20Migration">Talk to Our Migration Experts <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
