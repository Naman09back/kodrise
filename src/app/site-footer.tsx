import Link from "next/link";
import styles from "./kodrise-footer.module.css";
import BrandLogo from "./brand-logo";

const services=[["Generative AI Development","/services/generative-ai-development-company"],["AI Agent Development","/services/ai-agents-and-automation-solutions"],["AI App Development","/services/ai-app-development-company"],["AI Chatbot Development","/services/ai-chatbot-development-company"],["Machine Learning Development","/services/machine-learning"],["NLP Development","/services/nlp-development"],["RAG as a Service","/services/rag-as-a-service"],["AI Outsourcing","/services/outsourcing-ai-development"]];

export default function SiteFooter() {
  return <footer className={styles.footer}>
      <div className={styles.contactBand}>
        <div className={styles.contactPrompt}><div className={styles.contactHeading}><span>Do you have a project in mind?</span><h2>Talk to the experts.</h2></div><Link className={styles.contactCta} href="/contact">Tell us about your project <span aria-hidden="true">↗</span></Link></div>
        <div className={styles.contactInfo}><h2>Get in Touch</h2><p>We’d love to resolve your queries with personalized assistance.</p><a href="mailto:hr@kodrise.com"><span>Chat with us</span><strong>hr@kodrise.com</strong></a><a href="tel:+919302752700"><span>Let’s discuss via call</span><strong>+91 9302752700</strong></a><a href="https://wa.me/919302752700"><span>Reach us on WhatsApp</span><strong>Chat with us ↗</strong></a></div>
      </div>
      <div className={styles.grid}>
        <div className={styles.brandColumn}><Link href="/" aria-label="Kodrise home"><BrandLogo width={208} height={64} /></Link><p>Building digital products and engineering teams for what comes next.</p><a href="mailto:hr@kodrise.com">hr@kodrise.com</a><a href="tel:+919302752700">+91 9302752700</a></div>
        <nav aria-label="AI services"><h3>AI Services</h3>{services.map(([label,href])=><Link key={label} href={href}>{label}</Link>)}</nav>
        <nav aria-label="Quick links"><h3>Quick Links</h3><Link href="/portfolio">Portfolio</Link><Link href="/careers">Career / Current Openings</Link><Link href="/about">About Us</Link><Link href="/case-studies">Clientele</Link><Link href="/contact">Become a Partner</Link><Link href="/contact">Location</Link><Link href="/contact">Contact Us</Link></nav>
        <div className={styles.newsletter}><h3>Kodrise Newsletter</h3><p>Get the latest insights and updates straight to your inbox.</p><form action="/contact"><label htmlFor="footer-email">Your email address</label><div><input id="footer-email" type="email" name="email" placeholder="name@company.com" required/><button type="submit" aria-label="Subscribe">↗</button></div></form><div className={styles.socials}><a href="https://www.linkedin.com/" aria-label="LinkedIn">in</a><a href="https://www.facebook.com/" aria-label="Facebook">f</a><a href="https://www.instagram.com/" aria-label="Instagram">◎</a></div></div>
      </div>
      <div className={styles.locations}><span>USA</span><span>Canada</span><span>UK</span><span>Australia</span><span>Saudi Arabia</span><span>UAE</span><span>India</span><span>Netherlands</span></div>
      <div className={styles.bottom}><span>© {new Date().getFullYear()} Kodrise Pvt. Ltd. All Rights Reserved.</span><div><Link href="/contact">Terms of Use</Link><Link href="/contact">Privacy</Link><Link href="/sitemap.xml">Sitemap</Link><Link href="/contact">Beware of Scams</Link></div></div>
  </footer>;
}
