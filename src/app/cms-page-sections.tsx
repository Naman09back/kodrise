import Image from "next/image";
import Link from "next/link";
import type {SitePageContent} from "@/sanity/lib/pages";
import styles from "./cms-page-sections.module.css";

export default function CmsPageSections({sections}: {sections: SitePageContent["sections"]}) {
  if (!sections?.length) return null;
  return <div className={styles.sections}>{sections.map((section, index) => <section className={`${styles.section} ${section.layout === "cta" ? styles.cta : ""}`} key={`${section.heading || section.layout}-${index}`}>
    <div className={styles.inner}>
      {section.image?.asset?.url && <div className={styles.image}><Image src={section.image.asset.url} alt={section.image.alt || section.heading || ""} fill unoptimized sizes="(max-width: 760px) 100vw, 50vw" /></div>}
      <div className={styles.copy}>
        {section.eyebrow && <span>{section.eyebrow}</span>}
        {section.heading && <h2>{section.heading}</h2>}
        {section.body && <p>{section.body}</p>}
        {section.items?.length ? section.layout === "faq" ? <div className={styles.faq}>{section.items.map((item, itemIndex) => <details key={`${item.title}-${itemIndex}`}><summary>{item.title}</summary><p>{item.description}</p></details>)}</div> : section.layout === "list" ? <ul>{section.items.map((item, itemIndex) => <li key={`${item.title}-${itemIndex}`}><strong>{item.title}</strong>{item.description && <p>{item.description}</p>}</li>)}</ul> : <div className={styles.cards}>{section.items.map((item, itemIndex) => {
          const card = <><strong>{item.title}</strong>{item.description && <p>{item.description}</p>}</>;
          return item.href ? <Link href={item.href} key={`${item.title}-${itemIndex}`}>{card}</Link> : <article key={`${item.title}-${itemIndex}`}>{card}</article>;
        })}</div> : null}
        {section.buttonLabel && section.buttonUrl && <Link className={styles.button} href={section.buttonUrl}>{section.buttonLabel}<b aria-hidden="true">↗</b></Link>}
      </div>
    </div>
  </section>)}</div>;
}
