# Sanity CMS Setup

This project uses Sanity for blog posts, case studies and the site's pages.

## Local Setup

1. Create or open a Sanity project at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy `.env.example` to `.env.local`.
3. Fill in:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-01
NEXT_PUBLIC_SITE_URL=http://localhost:3002
SANITY_REVALIDATE_SECRET=use-a-long-random-string
```

`SANITY_REVALIDATE_SECRET` is created by you. Generate any long random value,
put it in your app environment variables, and use the same value in the Sanity
webhook URL. Sanity does not generate this secret automatically.

4. Start the app:

```bash
pnpm dev
```

5. Open the embedded Studio:

```text
http://localhost:3002/studio
```

## Content Models

The Studio includes:

- Pages (the page builder, see below)
- Blog posts
- Case studies
- Authors
- Categories
- Shared rich text blocks
- Shared SEO fields

Blog routes:

- `/blog`
- `/blog/[slug]`

Case study routes:

- `/case-studies`
- `/case-studies/[slug]`

## Editorial Images

Sanity stores the original uploaded asset without applying a minimum-size
restriction. Smaller images remain valid when they are the best available
source.

The public site preserves each editorial image's original aspect ratio and
serves editorial images directly from the original Sanity CDN asset URL. This
keeps the original dimensions and file format when a visitor saves an editorial
image from a blog post or case study.

Smaller thumbnails and author images can still use Next.js responsive image
optimization for page performance.

## Production Setup

Add the same environment variables to your hosting provider.

In Sanity, add CORS origins for:

```text
http://localhost:3002
https://your-production-domain.com
```

## Revalidation Webhook

Create a Sanity webhook that sends document events to:

```text
https://your-production-domain.com/api/revalidate?secret=YOUR_SANITY_REVALIDATE_SECRET
```

Recommended webhook payload projection:

```json
{
  "_type": "_type",
  "slug": "slug"
}
```

The endpoint revalidates:

- Blog index and detail pages for `post`
- Case study index and detail pages for `caseStudy`
- Blog categories for `category`
- A page for `page` (the `pages` tag, the `page:<slug>` tag and the page's path; `home` revalidates `/`)
- Any page's case-study selection for `pageCaseStudies`
- Any page's blog-post selection for `pageBlogs`
- Any page's title/description/OG tags for `staticPageSeo`
- Any page's JSON-LD structured data for `sitePageJsonLd`

The last four are keyed by `pageKey`, not `slug`, so a publish revalidates
every page that reads that document — the webhook doesn't need per-page
routing. If your webhook has a document-type filter configured in Sanity
(rather than sending every mutation), make sure `page`, `servicePage`, `pageCaseStudies`,
`pageBlogs`, `staticPageSeo`, and `sitePageJsonLd` are included in it, or their edits will
only appear once each fetch's own 300s revalidate window elapses instead of
immediately.

## Pages (page builder)

Every public page except the ones listed under "Still in code" is a `page`
document, served by `src/app/(site)/[[...slug]]/page.tsx`. A page is an ordered
list of sections; each section type has a Sanity schema
(`src/sanity/schemaTypes/sections/`), an adapter
(`src/components/sanity/page-builder/adapters/`) and a registry entry
(`src/components/sanity/page-builder/registry.tsx`). Page title, SEO and JSON-LD
live on the document.

Studio lists (Pages in the sidebar):

- **Parent pages**: slug has one level (`home`, `about`, `industries`, ...).
- **Dynamic pages**: slug has two or more levels (`industries/salesforce-health-cloud-consulting`).

Slug rules (validated in Studio, source in `src/lib/pagePaths.ts`):

- Lower-case words joined by hyphens, with `/` between levels.
- `home` is the homepage and is served at `/`. `/home` returns 404, and `home` cannot have children.
- Reserved first segments belong to code and cannot be pages: `blog`, `case-studies`,
  `salesforce`, `studio`, `api`, `section-thumbs-preview`, `staff-augmentation`.
  `services` is reserved for child paths only (`/services/<slug>` is a service page
  document); the `/services` index itself is a page.
- Top-level slugs starting `salesforce-` are redirected by `next.config.ts` (except
  `salesforce-recruitment-agency`), and the two education/commerce platform-expertise
  paths are redirected too, so they cannot be used.
- Pages whose slug starts with `preview/` are not indexed and not in the sitemap.

Every section has a **Layout** tab. **Spacing override** (top/bottom px) adds padding
around the section on top of its built-in spacing; leave it empty to keep the default. **Anchor id** lets links
jump to the section.

Publishing a page is live within seconds through the revalidation webhook (the
filter must include `page`); without it, within the fetch's 300s window. Sitemap entries
are derived from the published `page` documents.

### Still in code

`/blog`, `/blog/[slug]`, `/case-studies`, `/case-studies/[slug]`, `/services/[slug]`,
`/salesforce/[slug]` and `/section-thumbs-preview`. Their SEO and JSON-LD still come
from `staticPageSeo` / `sitePageJsonLd` (keys `blog` and `case-studies`).

### Restoring an earlier version

Open the page in Studio, choose **Review changes** / the history clock in the document
menu, pick an earlier revision and restore it. Studio keeps document history, so a bad
edit is recoverable.

### The initial migration

The 23 original static pages were moved into `page` documents with a one-shot seed
script. That script has been removed. To see exactly how a page was built (or re-run it),
check out the commit before "serve static pages from Sanity page documents"
(`git log --oneline --grep "serve static pages from Sanity"`, then its parent) and look at
`scripts/seed-pages.ts` and `scripts/seed-pages/`. For the content of any page at any
time, use Sanity document history.

## Page case studies

Legacy: no coded page reads this any more; pages choose case studies on the section
itself. Selects case studies for a single page, keyed by `pageKey`. Rendered as the
main content block. Editing a `pageCaseStudies` document revalidates the
`page-case-studies` tag; publishing a referenced case study revalidates
`case-studies`, which these pages also subscribe to.

## Page blogs

Legacy: no coded page reads this any more; pages choose posts on the section itself.
Selects blog posts for a single page, keyed by `pageKey`. Rendered above the
closing CTA. One to four posts. A page with no document hides the section.
Editing a `pageBlogs` document revalidates the `page-blogs` tag; publishing a
referenced post revalidates `posts`, which these pages also subscribe to.

## Notes

The site builds even when Sanity environment variables are missing. In that state, blog and case-study listings show empty states and `/studio` uses placeholder config until real env values are provided.
