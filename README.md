# Filekind

Minimal browser-only image tools built with Next.js, TypeScript, and Tailwind CSS.

## Public tools

- `/` is the minimal tool chooser homepage. Legacy `/?targetKB=200` links forward to `/compress-image?targetKB=200`.
- `/compress-image` compresses JPEG and PNG images to a custom maximum size.
- `/convert-image` converts JPEG, PNG, and static WebP through one shared interface. Legacy converter URLs redirect to canonical presets.
- `/images-to-pdf` arranges multiple images into a configurable PDF.
- `/pdf-to-images` renders complete PDF pages as numbered JPG or PNG files and downloads them as a ZIP.
- Image and PDF contents stay on the device. If `NEXT_PUBLIC_ANALYTICS_ENDPOINT` is configured in a production Pages build, only normalized public page paths are sent for limited aggregate usage analytics; counts are approximate page views, not unique people.
- Inputs are limited to 25 MB, 16,000 pixels per side, and 48 megapixels. The pixel ceiling keeps unusually large images bounded while supporting high-resolution photos such as 7,952 x 5,304 px.

## Run locally

Requires Node.js 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. Production checks:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Cloudflare Pages

This project uses Next.js static export (`output: "export"`). In Cloudflare Pages, use:

- Build command: `pnpm build`
- Build output directory: `out`
- Node.js version: `20` or newer

Set `NEXT_PUBLIC_SITE_URL` to the production origin before building so canonical URLs and the sitemap use the correct host. The default is `https://filekind.pages.dev`; update it when moving to a custom domain. Keep `public/_redirects` in the deployment so old converter URLs remain permanent redirects.

## Analytics and admin

The static Pages app serves `/admin` like the other pages. It uses the simple credentials `admin` and `123_AbC#`, then reads aggregate data from the Worker at `/data`. This is intentionally not secure: the credentials and dashboard are public in the browser bundle.

1. Create a D1 database and put its ID in `worker/wrangler.toml`.
2. Run `pnpm worker:db:migrate:remote` from the repository root.
3. Set the Worker `ALLOWED_ORIGINS` variable to the exact Pages origin and deploy with `pnpm worker:deploy`.
4. Set `NEXT_PUBLIC_ANALYTICS_ENDPOINT` to the Worker URL ending in `/analytics`, rebuild Pages, and deploy `out/`.

The Worker stores daily UTC page/country aggregates for 90 days. It does not store raw IP addresses, filenames, file contents, query strings, fingerprints, or persistent visitor IDs.

## Browser limitations

Very large or highly detailed images may not be able to reach an unusually small target without an impractical loss of dimensions. JPEG encoding also varies slightly by browser, so the compressor verifies the final Blob and only reports success when it is at or below the requested byte limit.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
