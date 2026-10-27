import { dataset, projectId } from "../env";

export interface SanityImageValue {
  _type?: "image";
  asset?: { _ref?: string; _type?: "reference" };
  alt?: string;
}

// Asset refs encode everything we need: image-<hash>-<w>x<h>-<ext>. Reading
// them avoids a GROQ `asset->` expansion for every image in every section.
const REF = /^image-([a-f0-9]+)-(\d+)x(\d+)-([a-z0-9]+)$/;

function parse(img?: SanityImageValue) {
  const match = img?.asset?._ref?.match(REF);
  if (!match) return undefined;
  const [, id, w, h, ext] = match;
  return { id, width: Number(w), height: Number(h), ext };
}

/** Plain CDN URL (no transforms) so next/image optimises it like a local file. */
export function imageSrc(img?: SanityImageValue): string | undefined {
  const p = parse(img);
  return p && `https://cdn.sanity.io/images/${projectId}/${dataset}/${p.id}-${p.width}x${p.height}.${p.ext}`;
}

/** Intrinsic size; `half` for 2x exports shown at their Figma display size. */
export function imageSize(img?: SanityImageValue, opts: { half?: boolean } = {}) {
  const p = parse(img);
  if (!p) return undefined;
  return opts.half
    ? { width: Math.round(p.width / 2), height: Math.round(p.height / 2) }
    : { width: p.width, height: p.height };
}

export function imageAlt(img?: SanityImageValue, fallback?: string): string | undefined {
  return img?.alt?.trim() || fallback;
}
