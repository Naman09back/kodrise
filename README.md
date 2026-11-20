# Kodrise

Kodrise is a Next.js website with a standalone Sanity Studio and a protected content dashboard.

## Run locally

Install the root and Studio dependencies once:

```sh
npm install
npm install --prefix studio
```

Run the website and Studio in separate terminals:

```sh
npm run dev
```

```sh
npm run dev --prefix studio
```

The website runs at [http://127.0.0.1:3000](http://127.0.0.1:3000); the Studio runs at [http://localhost:3333](http://localhost:3333). The deployed Studio is [kodrise.sanity.studio](https://kodrise.sanity.studio/).

Copy `.env.example` to `.env.local` and set the Sanity write token and admin secrets locally. Never put real credentials in `.env.example` or source control.

## Content management

The standalone Sanity Studio contains the content schemas. The protected `/admin` dashboard provides day-to-day editing, application and enquiry review, SEO settings, and the Sanity-backed media library. Website image records have stable keys and can optionally replace an exact image URL or path on mirrored routes.

Schema and migration status are tracked in [the Sanity CMS plan](docs/sanity-cms-plan.md). The legacy page archive is still used for many routes; it will be retired only after those routes and their media have been migrated and checked in Sanity.

## Build and deploy

```sh
npm run typecheck
npm run build -- --webpack
npm run deploy --prefix studio -- --yes
```
