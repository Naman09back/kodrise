import Link from "next/link";
import styles from "./related-platforms.module.css";
import {migrationPlatformList} from "./migration-platform-data";

export default function RelatedPlatforms({current}: {current?: string}) {
  const platforms = migrationPlatformList.filter((platform) => platform.slug !== current);
  return <section className={styles.related} aria-label="Other Shopify migration services">
    <div><span>SHOPIFY MIGRATION</span><h2>Move from another platform</h2></div>
    <nav aria-label="Other platform migrations">{platforms.map((platform) => <Link href={`/shopify-services/shopify-migration/${platform.slug}`} key={platform.slug}>{platform.name}<span aria-hidden="true">{"\u2197"}</span></Link>)}</nav>
  </section>;
}
