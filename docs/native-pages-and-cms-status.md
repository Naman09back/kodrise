# Native page inventory and Sanity status

All 42 routes below use native Next.js page layouts. The Codiant HTML iframe renderer is no longer part of route handling. Sanity now contains one editable `sitePage` record per route, with a shared section model and an option to render a page from Sanity sections.

## Home and company

- `/`
- `/about`
- `/overview`
- `/process-methodology`
- `/contact`

## AI services

- `/services`
- `/ai-consulting-services`
- `/services/generative-ai-development-company`
- `/services/ai-agents-and-automation-solutions`
- `/services/ai-app-development-company`
- `/services/ai-chatbot-development-company`
- `/services/machine-learning`
- `/services/nlp-development`
- `/services/rag-as-a-service`
- `/services/outsourcing-ai-development`

## Shopify services

- `/shopify-services`
- `/shopify-services/website-design`
- `/shopify-services/website-development`
- `/shopify-services/b2b-ecommerce-solutions`
- `/shopify-services/headless-commerce`
- `/shopify-services/mobile-app-development`
- `/shopify-services/custom-ecommerce-solutions`
- `/shopify-services/marketing`
- `/shopify-services/seo`
- `/shopify-services/ppc`
- `/shopify-services/content-marketing`
- `/shopify-services/social-media-marketing`
- `/shopify-services/email-marketing`
- `/shopify-services/ai-agentic-commerce`
- `/shopify-services/ongoing-support`
- `/shopify-services/shopify-migration`
- `/shopify-services/shopify-migration/adobe-commerce`
- `/shopify-services/shopify-migration/bigcommerce`
- `/shopify-services/shopify-migration/woocommerce`
- `/shopify-services/shopify-migration/salesforce`
- `/shopify-services/shopify-migration/magento`
- `/shopify-services/shopify-migration/squarespace`
- `/shopify-services/shopify-migration/wix`

## Other requested page families

- `/portfolio` and `/case-studies` use Sanity case study records.
- `/resources` and `/resources/[slug]` use Sanity resource and insight records.
- `/careers` uses Sanity job records.
- `/hire-developers` uses Sanity developer records.

## What is editable now

- The Sanity page record includes page title, hero text and image, calls to action, SEO data, and reusable content sections.
- Each native page route can render the sections as its page content when `Render this page from Sanity sections` is enabled and sections have been entered. Until that is enabled, the existing native layout and its content remain visible.
- The custom dashboard can edit the page sections as JSON. The hosted Sanity Studio has structured section fields.
- Website image URLs under `/site-assets/...` resolve to the matching Sanity `siteAsset` image where one exists, and fall back to the local file when there is no Sanity record. This makes the media library the source for mapped images without breaking pages that still need local fallbacks.
- The homepage, About page, AI service pages, Shopify SEO page, migration images, and the new Work, Resources, Careers, and Developer listings already read some page data or records from Sanity.

## Content moved into Sanity

The authored JSON copy for the eight AI service detail pages, AI Consulting, and Shopify SEO has been migrated into their existing `sitePage` records. Hero copy, section headings and introductions, service/capability/industry/reason/application cards, technology groups, FAQs, and SEO-specific intro/CTA/related links now come from Sanity fields. Their existing page components still control the visual layout. The original JSON files remain as fallback copy while the rest of the site is migrated.

## Remaining content migration

This is a phased migration, not yet a site-wide content cutover. Shopify pages other than SEO, Overview, Process Methodology, and parts of Home/About/Contact still have copy in their Next.js components or local content files. Their content must be moved into fields the corresponding page components read before the site is fully dashboard-editable. Enabling the generic section renderer by itself is not the migration path for those pages because it would replace their carefully built page layouts.
