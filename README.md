# Lumina Estates

A real estate listings site with a full admin dashboard. It's built with React 19, Tailwind CSS v4 and [Convex](https://convex.dev) as the database, file storage and auth backend. Everything runs on Convex's free tier.

> **Portfolio demo:** open `/admin` (or click **Admin demo** in the navbar) and you're signed into a sandboxed demo account automatically. You don't need to sign up. See [Demo mode](#demo-mode) for how it's kept safe.

## Features

### Public site
- Property listings that update live from Convex.
- Search, with filters for type, status (sale, rent, sold), price range, bedrooms and bathrooms. Results can be sorted. Filters live in the URL, so a filtered view can be shared.
- Listing pages with:
  - A photo gallery and a fullscreen lightbox (keyboard and swipe).
  - Status badges, price per sqft and the listing agent's details.
  - Similar properties.
- **Request a tour** and **contact agent** forms. They save to the database.
- A contact form and a newsletter sign-up, both saved to the database. They have a honeypot and a rate limit to keep out spam.
- Saved properties (favourites), stored on the device, with their own page. A share button uses the native share sheet or copies the link.
- Per-page titles and meta tags, a 404 page, accessible dialogs and support for reduced motion.

### Admin dashboard (`/admin`)
- **Listings:**
  - Create, edit and delete listings.
  - Change status inline (draft, for sale, for rent, sold).
  - Mark listings as featured on the homepage.
  - Search and filter the list.
- **Photo uploads:**
  - Drag and drop, with upload progress.
  - Images are resized to 1920px and converted to WebP *in the browser* before upload, so storage use stays low.
  - Photos can be reordered, and any photo can be set as the cover.
- **Enquiries inbox:** tour requests, agent enquiries and contact messages.
  - Unread badge, plus read, unread and archive.
  - Reply by email, with a link to the listing.
- **Subscribers:** the newsletter list, which can be copied or exported as CSV.

## Demo mode

Visitors to `/admin` are signed in through Convex Auth's **Anonymous** provider and get a `demo` role. Demo sessions are sandboxed on the server, in [convex/lib/admin.ts](convex/lib/admin.ts):

| | Site owner (`admin`) | Demo visitor (`demo`) |
|---|---|---|
| Sample listings | Full access | Read-only |
| Own listings | Full access | Create, edit and delete (max 5, 8 photos each) |
| Visibility of created listings | Public | **Only that visitor**, including on the public site |
| Enquiries and subscribers | All | Only the ones they submitted themselves |
| Image URLs | Any | Bundled `/images/...` or uploads only |

Cleanup runs on Convex cron jobs, in [convex/crons.ts](convex/crons.ts):
- Uploads that were never attached to a listing are deleted after 1 hour.
- Demo listings, enquiries and subscribers are deleted after 24 hours.
- Anonymous accounts are deleted after 7 days.

The site owner signs in at `/admin/login` with an email listed in the `ADMIN_EMAILS` environment variable. Only those emails can create a password account.

## Getting started

Prerequisites: [Bun](https://bun.sh) and a free [Convex account](https://dashboard.convex.dev).

```bash
bun install

# 1. Create or link a Convex project. This writes VITE_CONVEX_URL to .env.local.
bunx convex dev --once

# 2. Generate auth keys (JWT_PRIVATE_KEY, JWKS, SITE_URL) on the deployment.
#    Use http://localhost:3000 as the site URL when asked.
bunx @convex-dev/auth

# 3. Allow your email to use the owner account (comma-separate several).
bunx convex env set ADMIN_EMAILS you@example.com

# 4. Load the sample listings.
bun run seed

# 5. Run Convex and Vite together.
bun run dev
```

Open http://localhost:3000. To use the owner account, go to `/admin/login`, choose **Create an account** with your allowlisted email, and sign in.

## Scripts

| Script | What it does |
|---|---|
| `bun run dev` | Runs `convex dev` and Vite together |
| `bun run dev:web` | Vite only |
| `bun run build` | Typechecks, then makes a production build |
| `bun run typecheck` | `tsc` |
| `bun run lint` / `bun run format` | Biome check / Biome autofix |
| `bun run seed` | Inserts the demo listings. Does nothing if any listings already exist. |

## Deployment

1. **Link a Convex project.** Run `bunx convex login`, then `bunx convex dev` and choose "create a new project". This replaces the local deployment in `.env.local`, so re-run the auth setup (`bunx @convex-dev/auth`), `bunx convex env set ADMIN_EMAILS you@example.com` and `bun run seed` for your dev deployment.
2. **Get a production deploy key.** In the [Convex dashboard](https://dashboard.convex.dev), open the project, switch to **Production**, go to **Settings → URL & Deploy Key**, and generate a deploy key.
3. **Deploy to Vercel.** Import the GitHub repo, then set:
   - **Build command:** `bunx convex deploy --cmd 'bun run build'`
   - **Output directory:** `dist`
   - **Environment variable:** `CONVEX_DEPLOY_KEY` = the key from step 2

   The build pushes the Convex functions and schema to production and injects `VITE_CONVEX_URL` automatically.
4. **Configure production auth** (use your real site URL, with no trailing slash):
   ```bash
   bunx @convex-dev/auth --prod --web-server-url https://your-site.vercel.app
   bunx convex env set --prod ADMIN_EMAILS you@example.com
   ```
5. **Seed production once:** `bunx convex run --prod seed:run`
6. **Create your owner account:** go to `/admin/login` on the live site, choose **Create an account**, and use the email from `ADMIN_EMAILS`.

The cleanup cron jobs start automatically on production. If you later add a custom domain, re-run step 4 with the new URL.

SPA deep links work on both hosts: Vercel uses [vercel.json](vercel.json), and Netlify uses [public/_redirects](public/_redirects).

## Project structure

```
convex/                 Backend: schema, queries and mutations, auth, crons
  lib/admin.ts          Roles (admin / demo) and permission helpers
  listings.ts           Listing CRUD, public queries, uploads
  enquiries.ts          Contact, tour and agent enquiries
  subscribers.ts        Newsletter
  cleanup.ts, crons.ts  Demo and orphaned-file cleanup
  shared.ts             Constants shared with the frontend
src/
  app/                  Entry point, routes, global styles
  pages/                Route components (admin/ is lazy-loaded)
  shared/               Layout, components, hooks, utils, static data
public/images/          Sample listing photos
```
