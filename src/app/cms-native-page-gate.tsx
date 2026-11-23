import type {ReactNode} from "react";
import Link from "next/link";
import type {SitePageContent} from "@/sanity/lib/pages";
import CmsPageSections from "./cms-page-sections";
import styles from "./cms-native-page-gate.module.css";

export default function CmsNativePageGate({page, label, children}: {page: SitePageContent | null; label: string; children: ReactNode}) {
  if (page?.useSanitySections && page.sections?.length) {
    const title = page.heroTitle || page.title || label;
    const image = page.heroImage?.asset?.url;
    return <main id="main" className={styles.page}>
      <section className={styles.hero} style={image ? {backgroundImage: `linear-gradient(90deg,#14141cf0 0%,#14141ca8 58%,#14141c66 100%),url("${image}")`} : undefined}>
        <div><span>{page.announcement || `KODRISE / ${label.toUpperCase()}`}</span><h1>{title}{page.heroAccent && <em>{page.heroAccent}</em>}</h1>{page.heroDescription && <p>{page.heroDescription}</p>}<div className={styles.actions}>{page.primaryCta && page.primaryCtaUrl && <Link href={page.primaryCtaUrl}>{page.primaryCta}<b aria-hidden="true">↗</b></Link>}{page.secondaryCta && page.secondaryCtaUrl && <Link href={page.secondaryCtaUrl}>{page.secondaryCta}<b aria-hidden="true">↗</b></Link>}</div></div>
      </section>
      <CmsPageSections sections={page.sections} />
    </main>;
  }
  return <>{children}<CmsPageSections sections={page?.sections} /></>;
}
