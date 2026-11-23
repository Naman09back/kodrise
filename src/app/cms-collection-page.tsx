import Image from "next/image";
import Link from "next/link";
import InteriorHero from "./interior-hero";
import styles from "./cms-collection-page.module.css";
import CmsNativePageGate from "./cms-native-page-gate";
import type {SitePageContent} from "@/sanity/lib/pages";

export type CmsCard = {
  title: string;
  eyebrow?: string;
  description?: string;
  href?: string;
  image?: {asset?: {url?: string}; alt?: string};
  meta?: string;
};

export default function CmsCollectionPage({
  page,
  label,
  fallbackTitle,
  fallbackAccent,
  fallbackDescription,
  cards,
  sectionTitle,
  sectionDescription,
}: {
  page: SitePageContent | null;
  label: string;
  fallbackTitle: string;
  fallbackAccent: string;
  fallbackDescription: string;
  cards: CmsCard[];
  sectionTitle: string;
  sectionDescription: string;
}) {
  const title = page?.heroTitle || page?.title || fallbackTitle;
  const description = page?.heroDescription || fallbackDescription;
  return <CmsNativePageGate page={page} label={label}><main id="main">
    <InteriorHero label={label} title={title} accent={page?.heroAccent || fallbackAccent} description={description} />
    <section className={styles.section}>
      <header className={styles.heading}><span>{label}</span><h2>{sectionTitle}</h2><p>{sectionDescription}</p></header>
      {cards.length ? <div className={styles.grid}>{cards.map((card) => {
        const content = <>
          {card.image?.asset?.url && <div className={styles.image}><Image src={card.image.asset.url} alt={card.image.alt || card.title} fill unoptimized sizes="(max-width: 560px) 100vw, (max-width: 850px) 50vw, 33vw" /></div>}
          <div className={styles.body}>{card.eyebrow && <small>{card.eyebrow}</small>}<h3>{card.title}</h3>{card.description && <p>{card.description}</p>}{card.meta && <div className={styles.meta}>{card.meta}</div>}</div>
        </>;
        return card.href ? <Link className={styles.card} href={card.href} key={`${card.title}-${card.href}`}>{content}</Link> : <article className={styles.card} key={card.title}>{content}</article>;
      })}</div> : <p className={styles.empty}>New Kodrise content is being prepared. Please check back soon.</p>}
    </section>
  </main></CmsNativePageGate>;
}
