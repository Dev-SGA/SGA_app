# SGA App — Tactical Tests

**Next.js** app ready for **Vercel**: landing and test flow inspired by [GST Tactical Test](https://gst-tactical-test.vercel.app/), with **SGA colors, fonts, and logos** (2023 brand manual).

Free tactical micro-tests for athlete acquisition: briefing, questionnaire, result (score + profile), and SGA Performance product CTAs.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

| Path | Description |
|------|-------------|
| `app/page.tsx` | Landing page |
| `app/tests/[slug]/` | Briefing + questionnaire |
| `app/result/` | Score, tactical profile, recommended products |
| `lib/tests.ts` | Scenarios and answer options |
| `lib/products.ts` | Catalog and CTAs (update `href` for live URLs) |
| `lib/scoring.ts` | Score and profile calculation |

Legacy URLs `/resultado` and old Portuguese test slugs redirect via `next.config.ts`.

## Deploy on Vercel

1. Import the `Dev-SGA/SGA_app` repository on Vercel.
2. Framework: **Next.js** (`vercel.json`).
3. Default build: `next build`.

## Media (videos / thumbnails)

- Hero: set `videoSrc` in `components/HeroVideo.tsx` or files under `public/media/`.
- Questions: optional `media` on each question in `lib/tests.ts` (`videoSrc`, `poster`).
- Concepts: `lib/concepts.ts` — replace placeholders when assets are ready.

## Suggested next steps

- Replace links in `lib/products.ts` with live landing pages.
- Add a lead form (email / WhatsApp) on the result page.
- Persist results via API or CRM.
