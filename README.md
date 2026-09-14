# Filekind

Minimal browser-only image tools built with Next.js, TypeScript, and Tailwind CSS.

## What works

- `/` compresses JPEG and PNG images to a custom maximum size or the 100 KB, 200 KB, and 500 KB presets.
- `/png-to-jpg` converts PNG images to JPG with transparent pixels composited onto white.
- Images are decoded, processed, previewed, and downloaded locally. No image data, filenames, or upload requests leave the browser.
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

No environment variables or server-side image service are required.

## Browser limitations

Very large or highly detailed images may not be able to reach an unusually small target without an impractical loss of dimensions. JPEG encoding also varies slightly by browser, so the compressor verifies the final Blob and only reports success when it is at or below the requested byte limit.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
