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

## Athlete accounts & admin

Athletes register at `/register` with **name, club, year of birth, position (CB, FB, MF, AMF, WG, ST), contact**, optional message, and a password. Each position maps to a dedicated tactical test. Sign in at `/login`; profile at `/account`.

On registration, if contact is an email and `RESEND_API_KEY` + `EMAIL_FROM` are set, the athlete receives SGA product links by email.

**Admin:** open `/admin/login` (credentials hint on page). Default dev login: `admin` / `sga-admin-dev` unless `ADMIN_USERNAME` / `ADMIN_PASSWORD` are set on Vercel. In `/admin`, use **View**, **Edit**, or **Delete** on each athlete row.

### Environment variables (production)

Copy `.env.example` into Vercel project settings:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon/Postgres connection (recommended on Vercel) |
| `SESSION_SECRET` | Cookie signing secret (16+ characters) |
| `ADMIN_USERNAME` | Admin login username (default `admin`) |
| `ADMIN_PASSWORD` | Admin login password (**change in production**) |

Without `DATABASE_URL`, registrations are stored in `data/athletes.json` (local dev only).

**Default dev admin:** username `admin`, password `sga-admin-dev`.

## Suggested next steps

- Replace links in `lib/products.ts` with live landing pages.
- Email notifications when a new athlete registers.
- Persist test results linked to athlete accounts.
