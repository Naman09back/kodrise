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

The standalone Sanity Studio contains the content schemas. The protected `/admin` dashboard provides day-to-day editing, application and enquiry review, SEO settings, and the Sanity-backed media library. Stable asset paths resolve through Sanity first and fall back to `public/site-assets/` when needed.

The old HTML mirror renderer is no longer in the route path. The site-wide content migration is still in progress; see [the native page and CMS status](docs/native-pages-and-cms-status.md) for the page inventory and remaining work.

## Build and deploy

```sh
npm run typecheck
npm run build -- --webpack
npm run deploy --prefix studio -- --yes
```
