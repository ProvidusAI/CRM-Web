# Sanity CMS Setup

This project uses Sanity for blog posts and case studies.

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
- Any page's case-study selection for `pageCaseStudies`
- Any page's title/description/OG tags for `staticPageSeo`
- Any page's JSON-LD structured data for `sitePageJsonLd`

The last three are keyed by `pageKey`, not `slug`, so a publish revalidates
every page that reads that document — the webhook doesn't need per-page
routing. If your webhook has a document-type filter configured in Sanity
(rather than sending every mutation), make sure `staticPageSeo` and
`sitePageJsonLd` are included in it, or their edits will only appear once
each fetch's own 300s revalidate window elapses instead of immediately.

## Notes

The site builds even when Sanity environment variables are missing. In that state, blog and case-study listings show empty states and `/studio` uses placeholder config until real env values are provided.
