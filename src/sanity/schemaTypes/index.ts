import { author } from "./author";
import { blockContent } from "./blockContent";
import { caseStudy } from "./caseStudy";
import { category } from "./category";
import { jsonLd } from "./jsonLd";
import { pageCaseStudies } from "./pageCaseStudies";
import { post } from "./post";
import { seo } from "./seo";
import { servicePage } from "./servicePage";
import { sitePageJsonLd } from "./sitePageJsonLd";
import { staticPageSeo } from "./staticPageSeo";

export const schemaTypes = [
  post,
  caseStudy,
  servicePage,
  staticPageSeo,
  sitePageJsonLd,
  pageCaseStudies,
  author,
  category,
  blockContent,
  seo,
  jsonLd,
];
