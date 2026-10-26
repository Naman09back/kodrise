# Kodrise

A responsive Next.js / React / TypeScript concept for a technology staff augmentation firm. Working brand: **Kodrise**. The user-confirmed visual direction is dome-inspired, with a light theme: an architectural dome connects the technology skills in the interactive team explorer.

The current iteration takes inspiration from Attio’s centred typography, restrained interface details, and interactive demonstrations. Kodrise uses white and soft lavender surfaces, fine grid borders, and a custom dome-based team explorer. Three illustrative team blueprints can populate the enquiry’s technology field; these are examples, not live candidate inventory.

The AP Consultancy content pass adds `/services/ecommerce`, `/services/devops-cloud-security`, `/services/agentic-ai-software`, `/services/qa-testing`, `/services/mobile-app-web`, `/services/ai-ml-automation`, `/devresources`, and `/portfolio`. Service descriptions, developer profiles, case-study summaries, and public contact details were checked against [apconsultancy.in](https://www.apconsultancy.in/). The audit snapshot is in `reference/ap-consultancy.json`.

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000.

```sh
npm run build
npm run typecheck
npm run test:e2e
```

The browser checks use an installed Google Chrome and cover technology filtering, enquiry downloads, disclosures, mobile navigation, and overflow at six viewport widths. Playwright starts the development server automatically if needed.

## Included

- Shared translucent header with Home, Services, About Us, Careers, and Contact Us; active-route styling and keyboard-accessible mobile navigation.
- Dedicated `/services`, `/about`, `/careers`, and `/contact` pages. Careers intentionally has no invented vacancies; add approved openings and application instructions when ready.

- Responsive navigation, accessible mobile menu, and skip link.
- Pointer-reactive SVG talent network, subtle floating labels, and scroll reveals with reduced-motion support.
- Technology category filters and technology selection carried into the enquiry form.
- Expandable engagement models and native FAQ disclosure controls.
- Validated enquiry form that prepares a downloadable/copyable brief and can open a prefilled email to `apconsultancy36@gmail.com`.
- Self-hosted Manrope font, metadata, and a custom favicon.

## Customize

Page content and technology/service data: `src/app/page.tsx`.
Theme tokens, layout, responsive styling, and motion: `src/app/globals.css`.
Current editorial design and interactive explorer styles: `src/app/experience.css`.
Title/description: `src/app/layout.tsx`.
Shared navigation: `src/app/site-header.tsx` and `src/app/site-header.module.css`.
Dedicated-page layouts: `src/app/interior.css`. The contact form is shared through `src/app/contact-section.tsx`.

Before launching publicly, confirm the brand relationship and service copy, and replace the mailto fallback with your approved email or CRM backend if needed. The AP Consultancy public contact details are reproduced because they were supplied through the referenced site.

## Design references

The clear hiring paths of [Toptal](https://www.toptal.com/) and the matching/onboarding progression of [Andela](https://enterprise.andela.com/adaptive-hiring/how-andela-works) informed the information architecture. The visual design and copy are original.

[Attio](https://attio.com/) inspired the latest visual refinement and interactive presentation, adapted to technology staffing with original content and components.
