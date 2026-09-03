import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { revalidateSecret } from "@/sanity/env";

interface SanityWebhookBody {
  _type?: string;
  slug?: {
    current?: string;
  };
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!revalidateSecret || secret !== revalidateSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as SanityWebhookBody;
  const slug = body.slug?.current;

  if (body._type === "post") {
    revalidateTag("posts");
    revalidatePath("/blog");

    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }
  }

  if (body._type === "caseStudy") {
    revalidateTag("case-studies");
    revalidatePath("/case-studies");

    if (slug) {
      revalidatePath(`/case-studies/${slug}`);
    }
  }

  if (body._type === "category") {
    revalidateTag("categories");
    revalidatePath("/blog");
  }

  if (body._type === "servicePage") {
    revalidateTag("service-pages");
    revalidatePath("/services");

    if (slug) {
      revalidatePath(`/services/${slug}`);
    }
  }

  // Keyed by pageKey rather than slug, so refresh every page that renders a
  // selection. Editing a caseStudy is already covered by the "case-studies" tag.
  if (body._type === "pageCaseStudies") {
    revalidateTag("page-case-studies");
  }

  if (body._type === "pageBlogs") {
    revalidateTag("page-blogs");
  }

  // Same pageKey-keyed pattern as pageCaseStudies above. Without these, edits
  // to a page's SEO or JSON-LD only appear once the fetch's own revalidate
  // window (300s) elapses, instead of immediately on publish.
  if (body._type === "staticPageSeo") {
    revalidateTag("static-page-seo");
  }

  if (body._type === "sitePageJsonLd") {
    revalidateTag("json-ld");
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
