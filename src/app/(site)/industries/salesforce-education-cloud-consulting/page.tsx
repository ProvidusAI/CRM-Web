import {
  HeroSection,
  PartnersSection,
  ExpertiseDescriptionSection,
  ExpertiseChallengesSection,
  WhatWeDoSection,
  ExpertiseCtaSection,
  ExpertiseSalesforceSection,
  ExpertiseCertifiedSection,
  ExpertisePlatformsSection,
  OrganisationTypesSection,
  WhyChooseSection,
  CertifiedSection,
  FaqSection,
  CtaSection,
  PageBlogsSection,
} from "@/components/sections";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { GreenLineMark } from "@/components/ui/GreenLineMark";
import { getPageBlogs } from "@/lib/pageBlogs";
import { getSitePageJsonLd } from "@/lib/siteJsonLd";
import { generateStaticPageMetadata } from "@/lib/staticPageSeo";

const DESCRIPTION =
  "You deserve a single source of truth for your student data and systems that talk to each other. We unify your student data and streamline workflows across recruitment, admissions, and more with our end-to-end Salesforce Education Cloud solutions.";

export async function generateMetadata() {
  return generateStaticPageMetadata("salesforce-education-cloud-consulting", {
    title: "Salesforce Education Cloud Consulting & Implementation",
    description: DESCRIPTION,
    canonicalPath:
      "/industries/salesforce-education-cloud-consulting",
    image: "/images/industries/education-cloud/hero.webp",
  });
}

const challenges = [
  {
    title: "A prospective student waits multiple days for a reply",
    icon: "/images/industries/education-cloud/challenge-inquiry.webp",
    text: "An inquiry comes in through the website. A follow-up happens through a separate recruitment tool. By the time an admissions counsellor actually responds, a competing institution that replied the same day has already moved the prospective student along.",
  },
  {
    title: "Advisors cannot see engagement data until it's too late",
    icon: "/images/industries/education-cloud/challenge-engagement.webp",
    text: "A student's LMS engagement drops. Their grades slip. That information sits in a system advisors do not have visibility into. The intervention that could have helped happens after the student has already decided to withdraw, not before.",
  },
  {
    title: "Development officers work from partial alumni data",
    icon: "/images/industries/education-cloud/challenge-alumni.webp",
    text: "Alumni giving history, event attendance, and career milestones live in disconnected systems. A development officer reaching out to a major gift prospect works from fragments of the relationship, not the whole picture.",
  },
];

const institutions = [
  {
    title: "Universities & Colleges",
    paragraphs: [
      "Configuration centred on the complete student lifecycle, from recruitment through advising to alumni advancement, across multiple departments and schools. Our consultants coordinate admissions, registrar, academic advising, and advancement configurations so departmental teams work with shared data but keep the operational autonomy each area needs.",
    ],
  },
  {
    title: "Community & Technical Colleges",
    paragraphs: [
      "Community and technical colleges run on high-volume, rolling enrolment rather than a single annual admissions cycle. Our consultants configure Education Cloud with streamlined admissions and registration workflows built for the throughput and speed community colleges need, without adding administrative complexity that fits a different institutional model.",
    ],
  },
  {
    title: "Online, Remote & Virtual Learning Providers",
    paragraphs: [
      "Online providers deliver education to students who may never set foot on a physical campus. Our consultants configure Education Cloud around digital-first student engagement, remote support workflows, and cohort-based advising tied to LMS activity, since the digital signals are what advisors actually have to work with.",
    ],
  },
  {
    title: "Multi-Campus & National Education Networks",
    paragraphs: [
      "Multi-campus institutions and national networks need shared reporting and student services without losing local operational flexibility. Our consultants configure Education Cloud to unify student data across campuses or member institutions, so leadership sees the whole network while individual campus teams keep the autonomy they need for local operations.",
    ],
  },
];

const whyChoose = [
  {
    title: "A single point of contact",
    color: "var(--color-salesforce-blue)",
    icon: "/images/different.webp",
    text: "One senior consultant leads your account, coordinating across admissions, IT, registrar, and advancement leads. That person understands what each team cares about and stays involved long enough to see how the launch actually landed, not just what was delivered before it.",
  },
  {
    title: "Weekly updates",
    color: "var(--color-soft-indigo)",
    icon: "/images/better.webp",
    text: "During active build phases, weekly updates spell out any change touching student data privacy or SIS/LMS integration. Those areas carry disproportionate risk, so they get explained specifically.",
  },
  {
    title: "Data privacy and access rules",
    color: "#C08A2E",
    icon: "/images/salesforce-partner.webp",
    text: "Before go-live, data governance and privacy controls get reviewed and approved in writing by your institutional data governance or compliance stakeholder. Sharing rules and access permissions do not get assumed. Approval sits in writing, so the audit trail exists from day one.",
  },
  {
    title: "Direct access to certified Salesforce consultants",
    color: "var(--color-soft-purple)",
    icon: "/images/different.webp",
    text: "When your technical team has a complex question about the SIS or LMS connection, the answer comes from the person who made the integration decision.",
  },
];

export default async function SalesforceEducationCloudConsultingPage() {
  const blogs = await getPageBlogs("salesforce-education-cloud-consulting");
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Salesforce Education Cloud Consulting & Implementation",
    description: DESCRIPTION,
    url: "https://providuscrm.co.uk/industries/salesforce-education-cloud-consulting",
    serviceType: "Salesforce Education Cloud Consulting",
    areaServed: "GB",
    provider: {
      "@type": "Organization",
      name: "ProvidusCRM",
      url: "https://providuscrm.co.uk",
      logo: "https://providuscrm.co.uk/images/salesforce-partner.webp",
    },
  };
  const jsonLd = await getSitePageJsonLd(
    "salesforce-education-cloud-consulting",
    schema
  );

  return (
    <>
      <JsonLdScript data={jsonLd} />

      {/* 1. Hero */}
      <HeroSection
        subtitle="Salesforce Education Cloud Consulting & Implementation"
        subtitleAsH1
        title={
          <>
            One Student
            <br />
            Record, Not Multiple
            <br />
            Disconnected Systems{" "}
            <GreenLineMark className="inline-block h-10 w-auto align-baseline ml-1" />
          </>
        }
        description={DESCRIPTION}
        bullets={[
          "Certified Salesforce Education Cloud consultants",
          "Student Information System (SIS) and Learning Management System (LMS) integration",
          "Advising and admissions workflows built around live student data",
          "Ongoing support as your institution's systems and processes evolve",
        ]}
        image="/images/industries/education-cloud/hero.webp"
      />

      {/* 2. Trusted by */}
      <PartnersSection />

      {/* 3. The problem */}
      <ExpertiseDescriptionSection
        hideCta
        heading={
          <>
            Is Your Student Data Spread Across Disparate Systems &amp; Sheets?{" "}
            <GreenLineMark className="inline-block h-8 w-auto align-baseline ml-1" />
          </>
        }
        paragraphs={[
          "Every institution runs on data spread across systems that were never designed to talk to each other. The Student Information System holds academic records. The Learning Management System holds engagement data. Recruitment tools, financial aid platforms, and departmental spreadsheets each hold pieces of the picture.",
        ]}
      />

      {/* 4. What that costs */}
      <ExpertiseChallengesSection items={challenges} />

      {/* 5. Services */}
      <WhatWeDoSection
        title="Our Salesforce Education Cloud Services"
        tabs={[
          {
            id: "recruitment",
            label: "Recruitment & Admissions",
            content: {
              heading: "Recruitment & Admissions",
              text: "Prospective students don't like waiting too long for responses to their applications. When such delays happen, they often move to institutions that answered first. At ProvidusCRM, we help you respond to prospective students faster, with full visibility into where each applicant stands.\n\nOur consultants configure Education Cloud to route inquiries automatically, track applications from every recruitment source in one console, and give admissions counsellors visibility into where each applicant stands at every stage of the funnel.",
              bullets: [
                "Inquiry and lead management from every recruitment channel",
                "Application tracking with a single console across all sources",
                "Automated, personalised outreach through the admissions funnel",
                "Yield and enrolment reporting tied to actual recruitment activity",
              ],
            },
          },
          {
            id: "academic-operations",
            label: "Academic Operations & Course Management",
            content: {
              heading: "Academic Operations & Course Management",
              text: "Course catalogues, prerequisites, and registration workflows often sit across the Student Information System (SIS), department websites, and shared spreadsheets.\n\nOur consultants configure programme and course structures in Education Cloud so students and advisors work from one consistent view, with prerequisites and pathways visible at the point of decision.",
              bullets: [
                "Programme and course catalogue configuration, including degrees and micro-credentials",
                "Prerequisite tracking and recommended course pathways",
                "Registration workflows connected to eligibility and availability",
                "Degree planning and progress tracking for students and advisors",
              ],
            },
          },
          {
            id: "student-success",
            label: "Student Success & Advising",
            content: {
              heading: "Student Success & Advising",
              text: "It's important to identify at-risk students early, not after they have already disengaged. Early intervention depends on advisors seeing the combined picture: academic performance, LMS engagement, financial aid status, and previous advising history.\n\nOur consultants surface these signals together in one advisor view, with risk indicators based on combined data rather than a single metric that misses context.",
              bullets: [
                "Academic performance and LMS engagement data surfaced to advisors in one place",
                "Risk indicators and alerts based on combined data, not a single metric",
                "Action plans and structured advising workflows",
                "Career and skills guidance tied to academic progress",
              ],
            },
          },
          {
            id: "alumni-advancement",
            label: "Alumni & Advancement",
            content: {
              heading: "Alumni & Advancement",
              text: "A development officer approaching a major gift prospect should see the whole relationship, not fragments of it. Giving history, event attendance, volunteering, and career milestones usually live in different places.\n\nOur consultants connect those records into one alumni view, then configure the moves management, segmentation, and reporting your advancement team needs to work from it.",
              bullets: [
                "A single alumni record spanning giving, events, and engagement",
                "Moves management and portfolio tracking for development officers",
                "Segmentation for appeals, campaigns, and stewardship",
                "Advancement reporting on pipeline, and on gifts actually received",
              ],
            },
          },
          {
            id: "integration",
            label: "SIS, LMS & Financial Aid Integration",
            content: {
              heading: "SIS, LMS & Financial Aid Integration",
              text: "Most institutions run on a Student Information System (SIS) as the system record for academic data, a Learning Management System (LMS) for engagement, and separate platforms for financial aid.\n\nWe connect Education Cloud to the systems your institution already runs on. Our consultants build the integration layer that keeps these systems connected without asking staff to re-enter data. Continuous sync means advisors and admissions teams see current information.",
              bullets: [
                "Integration with Student Information Systems (SIS) including Banner, PeopleSoft, and Workday Student",
                "Learning Management System (LMS) integration with Canvas, Blackboard, Moodle, and D2L",
                "Financial aid platform connections and data synchronisation",
                "Legacy database migration with validation and testing",
              ],
            },
          },
          {
            id: "data-foundation",
            label: "Data Foundation & Ongoing Optimisation",
            content: {
              heading: "Data Foundation & Ongoing Optimisation",
              text: "A configuration that fits at launch drifts as programmes, teams, and reporting needs change. Without maintenance, duplicate records and unused fields accumulate until staff stop trusting the data.\n\nOur consultants set the data standards, duplicate rules, and permission structures your institution runs on, then keep reviewing them across releases as your processes evolve.",
              bullets: [
                "Data standards, duplicate rules, and record ownership",
                "Permission and sharing models reviewed against your access policy",
                "Release management as Salesforce and your processes change",
                "Ongoing optimisation based on how teams actually use the system",
              ],
            },
          },
          {
            id: "paas",
            label: "Salesforce PaaS",
            content: {
              heading: "Salesforce PaaS",
              text: "Some institutional processes have no standard product to sit in. Placements, research administration, and bespoke approval flows often end up in spreadsheets because nothing else fits.\n\nWe build those on the Salesforce platform itself, so they use the same student records, permissions, and reporting as everything else rather than becoming another disconnected system.",
              bullets: [
                "Custom applications built on the Salesforce platform",
                "Institution-specific processes that no standard product covers",
                "Shared student data, permissions, and reporting across every build",
                "Maintainable configuration your team can keep running",
              ],
            },
          },
        ]}
      />

      {/* 6. Mid-page CTA */}
      <ExpertiseCtaSection
        title="Not Sure How Much Of Your Student Data Is Actually Connected?"
        buttonText="Book A Free Consultation"
        buttonHref="/contact"
        image1="/images/platform-expertise/expertise-cta-1.webp"
        image2="/images/platform-expertise/expertise-cta-2.webp"
      />

      {/* 7. Certified partner */}
      <ExpertiseSalesforceSection
        heading="Salesforce Consulting Services That Secure Your CRM Investments"
        text="ProvidusCRM is a certified Salesforce consulting partner, helping organizations in the UK drive operational efficiency, reduce costs, and integrate their CRM systems securely and reliably with other tools and platforms. Every project we work on involves our experienced, certified teams and their relentless efforts towards meeting your specific needs and goals, enabling you to derive maximum value from your Salesforce investments."
        image="/images/platform-expertise/salesforce-partner.webp"
      />

      {/* 8. Certification marquee */}
      <ExpertiseCertifiedSection
        images={[
          "/images/certified-badges/1.webp",
          "/images/certified-badges/2.webp",
          "/images/certified-badges/3.webp",
          "/images/certified-badges/4.webp",
          "/images/certified-badges/5.webp",
          "/images/certified-badges/6.webp",
          "/images/certified-badges/7.webp",
          "/images/certified-badges/8.webp",
          "/images/certified-badges/9.webp",
          "/images/certified-badges/10.webp",
        ]}
      />

      {/* 9. Platform expertise carousel */}
      <ExpertisePlatformsSection
        title="Our Platform Expertise Beyond Salesforce Education Cloud"
        items={[
          {
            title: "Service Cloud",
            text: "Resolve cases faster with structured queues, automated escalations, and full customer history on every ticket. We build Service Cloud orgs around actual support processes, reducing response times and giving agents the context they need before picking up the phone.",
            icon: "/images/service-cloud.webp",
            bgGradient:
              "linear-gradient(59.61deg, #F4F4F4 45%, #FFDBED 119.24%)",
          },
          {
            title: "Experience Cloud",
            text: "Build branded portals, partner communities, and self-service hubs directly connected to Salesforce data. Our Experience Cloud configurations include proper access controls, record visibility, and CRM integration, so external users see exactly what they should and nothing more.",
            icon: "/images/experience-cloud.webp",
            bgGradient:
              "linear-gradient(59.61deg, #F4F4F4 45%, #CAEFFF 119.24%)",
          },
          {
            title: "Data Cloud",
            text: "Bring customer data from every source into one unified profile inside Salesforce. At ProvidusCRM, we implement Data Cloud to connect website activity, transaction records, and third-party data into a single view that powers smarter segmentation, personalisation, and reporting across every cloud.",
            icon: "/images/data-cloud.webp",
            bgGradient:
              "linear-gradient(59.61deg, #F4F4F4 45%, #E8EAFF 119.24%)",
          },
          {
            title: "Agentforce",
            text: "Deploy autonomous AI agents that handle routine customer queries, qualify leads, and trigger follow-ups without human input. At ProvidusCRM, we configure Agentforce to work within existing Salesforce workflows so automation runs on real business rules.",
            icon: "/images/agent-force.webp",
            bgGradient:
              "linear-gradient(59.61deg, #F4F4F4 45%, #D8E9FF 119.24%)",
          },
          {
            title: "Sales Cloud",
            text: "Give sales teams full visibility into every deal, from first touch to closed-won. Our team configures Sales Cloud around actual pipeline stages, forecast categories, and reporting needs so reps spend less time on admin and more time selling.",
            icon: "/images/sales-cloud.webp",
            bgGradient:
              "linear-gradient(59.61deg, #F4F4F4 45%, #D8FFE0 119.24%)",
          },
          {
            title: "Marketing Cloud",
            text: "Run email campaigns, build automated journeys, and segment audiences based on real CRM data. We implement Marketing Cloud with proper data extensions, journey logic, and attribution tracking so every campaign connects back to a measurable pipeline.",
            icon: "/images/marketing-cloud.webp",
            bgGradient:
              "linear-gradient(59.61deg, #F4F4F4 45%, #FFF3D8 119.24%)",
          },
        ]}
      />

      {/* 10. Institutions */}
      <OrganisationTypesSection
        title="Institutions We Work With"
        subtitle="Every institution has different CRM needs. A large research university, a community college, and an online provider share very little of the same operational shape. Configuration reflects where your institution actually sits and how your teams work together across the student lifecycle."
        items={institutions}
        images={[
          "/images/industries/education-cloud/institutions-1.webp",
          "/images/industries/education-cloud/institutions-2.webp",
        ]}
      />

      {/* 11. Why ProvidusCRM */}
      <WhyChooseSection
        title="Why Choose ProvidusCRM As Your Education Cloud Consulting & Implementation Partner"
        customReasons={whyChoose}
        image="/images/industries/education-cloud/why-choose.webp"
        imageAlt="Student working on a laptop outdoors"
      />

      {/* 12. Certified expertise */}
      <CertifiedSection
        title="Certified Expertise and Experience Across Industries"
        description="Our team holds Salesforce certifications across administration, development, and architecture, with production experience across the industries we serve. What matters more than our certifications is where the experience shows up: in the drift patterns and issues we catch early, in release management, and building the right foundation for more accurate, optimised workflow automation."
      />

      {/* 13. FAQs */}
      <FaqSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question:
              "Is Salesforce Education Cloud the same as Agentforce Education?",
            answer:
              "Salesforce is repositioning Education Cloud as Agentforce Education, similar to how Nonprofit Cloud became Agentforce Nonprofit and Commerce Cloud became Agentforce Commerce. The underlying product is the same, with deeper Agentforce agent integration. Our consultants work with it under either name, depending on which term matches your Salesforce contact.",
          },
          {
            question:
              "What Salesforce Education Cloud solutions does ProvidusCRM offer in the UK?",
            answer:
              "Our Salesforce Education Cloud consultants in the UK offer consulting, implementation, customisation, data migration, SIS and LMS integration, and analytics setup. We configure every solution around your student lifecycle and the way your admissions, advising, and advancement teams actually work.",
          },
          {
            question:
              "What Salesforce Education Cloud services do you provide in the UK?",
            answer:
              "The Education Cloud services we provide in the UK cover advisory, implementation, optimisation of existing orgs, integrations with your student information and learning platforms, ongoing managed services, user training, and post-go-live support across releases. We work with you across every stage of your Education Cloud implementation lifecycle.",
          },
          {
            question:
              "What does a Salesforce Education Cloud Implementation Partner do?",
            answer:
              "A Salesforce Education Cloud implementation partner takes you from licensing to deployment to user adoption. They configure objects, automation, reports, and integrations to fit your institution, then train your teams properly so adoption holds up well after go-live and beyond the first term.",
          },
          {
            question:
              "What is the difference between a Salesforce Education Cloud consultant and an implementation partner?",
            answer:
              "A consultant advises on what Education Cloud should do for your institution and how to design it properly. An implementation partner actually builds the configured system you need. ProvidusCRM does both, so your strategy and the build never drift apart across the course of the project.",
          },
        ]}
      />

      {blogs.posts.length > 0 && (
        <PageBlogsSection title={blogs.title} posts={blogs.posts} />
      )}

      {/* 14. CTA */}
      <CtaSection
        title="Connect With Our Salesforce Consultants Today!"
        backgroundImage="/images/cta-bg.webp"
      />
    </>
  );
}
