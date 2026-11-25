# Website image rights audit

Updated 2026-11-24. Refresh the live Sanity inventory with `node --env-file=.env.local scripts/audit-site-assets.mjs`.

## Current inventory

- Sanity contains 323 `siteAsset` records; 262 are used by active native pages and all 262 point to distinct images.
- Every active `siteAsset` has a recorded rights basis and verification date.
- The other 27 image fields on service, resource, and `sitePage` records reuse an image from a rights-tracked `siteAsset` (6 service, 7 resource, 14 sitePage fields).
- No active or inactive `siteAsset` record has an external website URL in its legacy source path.
- Legacy AI and migration seeders now verify an existing rights-reviewed Sanity image instead of downloading the old reference-site image.

## Replacements

- Pexels photos are used for selected photographic scenes. Their source URLs, creators, license basis, and verification date are recorded in Sanity. Pexels permits website use under its license without required attribution, subject to restrictions including no implied endorsement; see the [Pexels license](https://www.pexels.com/license/).
- Other replaced visuals are original Kodrise illustrations made for these slots and stored in Sanity.
- Nine new homepage service-card images were supplied by Kodrise and generated with Google Gemini. Their creator/source fields are recorded in Sanity; Google's terms say it does not claim ownership of generated content. This source record is not a guarantee against third-party rights claims.
- Active homepage, AI services, Shopify services, and migration visuals have been replaced in Sanity. About, contact, and service pages also no longer render imported client logos, award marks, partner badges, office icons, or testimonial portraits as endorsements.
- Related service/resource/social-preview image fields have been linked to the same rights-tracked Sanity assets so the dashboard and site use consistent media.

## Rights limits and maintenance

This audit records the source and the basis for use; it is not a legal guarantee that no third party will ever make a claim. Pexels images remain copyrighted but are licensed for use. Separate rights may apply to identifiable people, trademarks, or other protected material in a photograph, and the site must not imply that a pictured person or brand endorses Kodrise. Google states it does not claim ownership over generated content in its [Terms of Service](https://policies.google.com/terms?hl=en-US), but that does not guarantee the generated images are free of third-party rights issues. The original illustrations are created for Kodrise; retain source assets and generation records as provenance evidence.

For future uploads, use media owned by Kodrise or with documented permission/license, record the source and creator where applicable, and enter the rights basis and verification date in the dashboard. Do not run historical import scripts to re-add reference-site media.
