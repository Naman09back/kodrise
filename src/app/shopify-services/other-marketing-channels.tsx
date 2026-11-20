import Link from "next/link";
import styles from "./other-marketing-channels.module.css";

const routes: Record<string, string> = {
  "Shopify Marketing": "/shopify-services/marketing",
  SEO: "/shopify-services/seo",
  PPC: "/shopify-services/ppc",
  "Content Marketing": "/shopify-services/content-marketing",
  "Social Media Marketing": "/shopify-services/marketing#social-media-marketing",
  "Email Marketing": "/shopify-services/marketing#email-marketing",
};

const defaultChannels = ["Shopify Marketing", "SEO", "PPC", "Content Marketing", "Social Media Marketing", "Email Marketing"];

export default function OtherMarketingChannels({
  current,
  items = defaultChannels,
  heading = "The other channels we run.",
}: {
  current?: string;
  items?: string[];
  heading?: string;
}) {
  const channels = items.filter((item) => item !== current);

  return <section className={styles.related} aria-label="Other Shopify marketing channels">
    <div><span>SHOPIFY MARKETING</span><h2>{heading}</h2></div>
    <nav aria-label="Other marketing services">{channels.map((item) => <Link key={item} href={routes[item] || "/shopify-services/marketing"}>{item}<span aria-hidden="true">{"\u2197"}</span></Link>)}</nav>
  </section>;
}
