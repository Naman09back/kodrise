import Link from "next/link";
import {sanityClient} from "../sanity/lib/client";

function FooterIcon({ type }: { type: "mail" | "phone" }) {
  return (
    <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      {type === "mail" ? <path d="M3 5.5h18v13H3zM3.5 6l8.5 7 8.5-7" /> : <path d="M7.2 3.5 4.8 5.9c-.8.8-.9 2-.4 3 2.8 5.7 5 7.9 10.7 10.7 1 .5 2.2.4 3-.4l2.4-2.4-3.6-3.6-2.1 1.4c-1.7-.8-3.2-2.3-4-4l1.4-2.1-3.6-3.6Z" />}
    </svg>
  );
}

export default async function SiteFooter() {
  const settings = await sanityClient.fetch<{contactEmail?: string; phone?: string; address?: string} | null>(`*[_type == "siteSettings"][0]{contactEmail, phone, address}`).catch(() => null);
  const email = settings?.contactEmail || "apconsultancy36@gmail.com";
  const phone = settings?.phone || "+91 63510 58011";
  const address = settings?.address || "Ahmedabad, Gujarat, India";
  return (
    <footer className="footer">
      <div className="container footer-shell">
        <div className="footer-top">
          <div className="footer-brand-block">
            <Link href="/" className="brand" aria-label="Kodrise home">
              <span className="footer-mark" aria-hidden="true">k↗</span>
              kodrise<span className="brand-period">.</span>
            </Link>
            <p>People power possibilities.</p>
          </div>
          <div className="footer-cta">
            <span>Have a team in mind?</span>
            <Link href="/contact" className="button primary">Start a conversation <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="footer-grid">
          <address className="footer-contact">
            <span className="footer-label">GET IN TOUCH</span>
            <a href={`mailto:${email}`}><FooterIcon type="mail" />{email}</a>
            <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}><FooterIcon type="phone" />{phone}</a>
            <span>{address}</span>
          </address>
          <nav className="footer-nav" aria-label="Explore">
            <span className="footer-label">EXPLORE</span>
            <Link href="/services">Services</Link>
            <Link href="/case-studies">Case studies</Link>
            <Link href="/about">About Us</Link>
          </nav>
          <nav className="footer-nav" aria-label="For talent">
            <span className="footer-label">FOR TALENT</span>
            <Link href="/devresources">Developer bench</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kodrise. Built around people.</span>
          <a href="#main" className="back-top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
