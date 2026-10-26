"use client";

import { usePathname } from "next/navigation";

const whatsappHref =
  "https://wa.me/916351058011?text=Hi%20Kodrise%2C%20I%27d%20like%20to%20discuss%20my%20team%20requirements.";
const teamsHref = "https://teams.microsoft.com/";

export default function WhatsAppFloat() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="contact-floats">
      <a className="teams-float" href={teamsHref} target="_blank" rel="noreferrer" aria-label="Open Microsoft Teams">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.7 7.2h3.1v9.1h-3.1v2.2h-5.2v-2.2H7.3V7.2h3.1V5.7h7.3v1.5Zm-5.1 2.2v5.4h2.1V9.4h-2.1Zm-5.6-3.1a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8Zm9.8-1.5a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z" />
          <path d="M3.8 8.3h5.8v8.4H3.8A1.8 1.8 0 0 1 2 14.9v-4.8a1.8 1.8 0 0 1 1.8-1.8Z" opacity=".9" />
        </svg>
        <span>Teams</span>
      </a>
      <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with Kodrise on WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.55 0 .24 5.3.24 11.83c0 2.08.54 4.1 1.57 5.89L.16 23.9l6.33-1.66a11.83 11.83 0 0 0 5.58 1.42h.01c6.52 0 11.83-5.31 11.83-11.83 0-3.16-1.23-6.13-3.41-8.33Zm-8.42 18.1h-.01a9.81 9.81 0 0 1-5-1.37l-.36-.21-3.76.99 1-3.67-.23-.38a9.82 9.82 0 1 1 8.36 4.64Zm5.39-7.36c-.3-.15-1.78-.88-2.05-.98-.28-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.12-.27-.2-.57-.35Z" />
        </svg>
        <span>Chat with us</span>
      </a>
    </div>
  );
}
