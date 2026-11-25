"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import styles from "./kodrise-header.module.css";
import BrandLogo from "./brand-logo";

type MenuLink = [string, string];
type NestedMenuLink = {label: string; href: string; children: MenuLink[]};
type MenuEntry = MenuLink | NestedMenuLink;
type MenuGroup = {title: string; description: string; links: MenuEntry[]};
type NavigationItem = {title: string; href: string; heading?: string; links?: MenuLink[]; groups?: MenuGroup[]; compact?: boolean};

const navigation: NavigationItem[] = [
  {title: "Company", href: "/about", heading: "Who we are", links: [["Overview", "/overview"], ["About Us", "/about"], ["Process Methodology", "/process-methodology"]]},
  {title: "Shopify Services", href: "/shopify-services", groups: [
    {title: "Build", description: "Build the commerce foundation your business needs.", links: [["Shopify Website Design", "/shopify-services/website-design"], ["Shopify Website Development", "/shopify-services/website-development"], ["B2B Ecommerce Solutions", "/shopify-services/b2b-ecommerce-solutions"], ["Headless Commerce", "/shopify-services/headless-commerce"], ["Mobile App Development", "/shopify-services/mobile-app-development"], ["Custom Ecommerce Solutions", "/shopify-services/custom-ecommerce-solutions"]]},
    {title: "Grow", description: "Improve performance, visibility, and revenue.", links: [["Shopify Marketing", "/shopify-services/marketing"], ["SEO", "/shopify-services/seo"], ["PPC", "/shopify-services/ppc"], ["Content Marketing", "/shopify-services/content-marketing"], ["Social Media Marketing", "/shopify-services/social-media-marketing"], ["Email Marketing", "/shopify-services/email-marketing"]]},
    {title: "Evolve", description: "Modernize, optimize, and scale your commerce ecosystem.", links: [{label: "Shopify Migration", href: "/shopify-services/shopify-migration", children: [["Adobe Commerce", "/shopify-services/shopify-migration/adobe-commerce"], ["BigCommerce", "/shopify-services/shopify-migration/bigcommerce"], ["WooCommerce", "/shopify-services/shopify-migration/woocommerce"], ["Salesforce", "/shopify-services/shopify-migration/salesforce"], ["Magento", "/shopify-services/shopify-migration/magento"], ["Squarespace", "/shopify-services/shopify-migration/squarespace"], ["Wix", "/shopify-services/shopify-migration/wix"]]}, ["AI & Agentic Commerce", "/shopify-services/ai-agentic-commerce"], ["Shopify Ongoing Support", "/shopify-services/ongoing-support"], ["Dedicated Commerce Teams", "/shopify-services/dedicated-commerce-teams"]]},
  ]},
  {title: "AI Services", href: "/services", heading: "AI Services", links: [["Generative AI Development", "/services/generative-ai-development-company"], ["AI Agent Development", "/services/ai-agents-and-automation-solutions"], ["AI App Development", "/services/ai-app-development-company"], ["AI Chatbot Development", "/services/ai-chatbot-development-company"], ["Machine Learning", "/services/machine-learning"], ["NLP Development", "/services/nlp-development"], ["RAG as a Service", "/services/rag-as-a-service"], ["AI Outsourcing", "/services/outsourcing-ai-development"], ["AI Consulting", "/ai-consulting-services"]]},
  {title: "Hire Developers", href: "/hire-developers"},
  {title: "Our Work", href: "/portfolio", links: [["Portfolio", "/portfolio"], ["Case Studies", "/case-studies"]], compact: true},
  {title: "Resources", href: "/resources", links: [["Blogs", "/resources"], ["Press Releases", "/resources"], ["Whitepapers / eBooks", "/resources"]], compact: true},
  {title: "Careers", href: "/careers"},
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open && !mobileOpen && !searchOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
        setSearchOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, mobileOpen, searchOpen]);

  const brand = <BrandLogo variant="light" width={190} height={54} alt="" />;
  const renderLink = ([label, href]: MenuLink) => <Link className={styles.megaLink} key={label} href={href} onClick={() => {setOpen(null);setMobileOpen(false);}} aria-current={href === pathname ? "page" : undefined}><span className={styles.megaIcon} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg></span><span>{label}</span><b aria-hidden="true">›</b></Link>;
  const renderMegaLinks = (links: MenuEntry[]) => links.map((entry) => Array.isArray(entry) ? renderLink(entry) : <div className={styles.megaNested} key={entry.label}>{renderLink([entry.label, entry.href])}<div className={styles.megaChildren}>{entry.children.map(renderLink)}</div></div>);
  if (pathname.startsWith("/admin")) {
    return <header className={styles.admin}><Link href="/" aria-label="Kodrise home">{brand}</Link></header>;
  }

  return <>
    <a className={styles.skip} href="#main">Skip to content</a>
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Kodrise home">{brand}</Link>
        <nav className={`${styles.navigation} ${mobileOpen ? styles.navigationOpen : ""}`} aria-label="Main navigation">
          {navigation.map((item) => item.links || item.groups ? <div className={styles.navGroup} key={item.title} onMouseEnter={() => {if (window.matchMedia("(min-width: 1200px)").matches) setOpen(item.title);}} onMouseLeave={() => {if (window.matchMedia("(min-width: 1200px)").matches) setOpen(null);}} onFocus={() => setOpen(item.title)}>
            <Link className={styles.navLink} href={item.href} aria-current={item.href === pathname ? "page" : undefined} aria-haspopup="true">{item.title}<span className={styles.chevron} aria-hidden="true"/></Link>
            <button className={styles.navToggle} type="button" aria-label={`${open === item.title ? "Close" : "Open"} ${item.title} menu`} aria-expanded={open === item.title} onClick={() => setOpen(open === item.title ? null : item.title)}><span className={styles.chevron} aria-hidden="true"/></button>
            <div className={`${styles.megaPanel} ${item.compact ? styles.compactPanel : ""}`} data-open={open === item.title}>
              {item.compact ? <div className={styles.compactMenu}>{item.links?.map(([label,href])=><Link className={styles.compactLink} key={label} href={href} onClick={() => {setOpen(null);setMobileOpen(false);}} aria-current={href === pathname ? "page" : undefined}><span>{label}</span><b aria-hidden="true">›</b></Link>)}</div> : <><div className={styles.megaMain}>{item.groups ? <div className={styles.megaGroups}>{item.groups.map((group) => <section className={styles.megaGroup} key={group.title}><h2>{group.title}</h2><p>{group.description}</p><div className={styles.megaGroupLinks}>{renderMegaLinks(group.links)}</div></section>)}</div> : <><h2>{item.heading ?? item.title}</h2><div className={styles.megaGrid}>{renderMegaLinks(item.links || [])}</div></>}</div>
                <aside className={styles.megaAside}><span>GOOD IDEAS DESERVE GREAT ENGINEERING</span><h3>Let’s build what’s next.</h3><p>Talk with the Kodrise team about your next product, platform, or engineering team.</p><Link href="/contact" onClick={() => {setOpen(null);setMobileOpen(false);}}>Talk to our experts <b aria-hidden="true">→</b></Link></aside></>}
            </div>
          </div> : <Link key={item.title} className={styles.navLink} href={item.href} onClick={() => setMobileOpen(false)} aria-current={item.href === pathname ? "page" : undefined}>{item.title}</Link>)}
        </nav>
        <div className={styles.actions}>
          <button className={styles.searchButton} type="button" aria-label={searchOpen ? "Close search" : "Search"} onClick={() => {setSearchOpen(!searchOpen);setOpen(null);setMobileOpen(false);}}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.7" cy="10.7" r="6.7"/><path d="m16 16 5 5"/></svg></button>
          <Link className={styles.contact} href="/contact"><span className={styles.contactText}>CONTACT US</span><svg className={styles.contactIcon} viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="5.25" width="17.5" height="13.5" rx="1.4"/><path d="m4 7 8 6 8-6"/></svg></Link>
          <button ref={toggle} className={styles.menuButton} type="button" aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} onClick={() => {setMobileOpen(!mobileOpen);setOpen(null);}}><i/><i/><i/></button>
        </div>
      </div>
      {searchOpen && <form className={styles.searchPanel} action="/resources"><label htmlFor="site-search">Search Kodrise</label><input id="site-search" name="q" type="search" placeholder="Search services, case studies, resources…" autoFocus/><button type="submit">SEARCH <span aria-hidden="true">↗</span></button></form>}
    </header>
    <div className={styles.headerSpacer} aria-hidden="true" />
  </>;
}
