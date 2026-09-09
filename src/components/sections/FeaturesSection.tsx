import { Heading, Text } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

// ─── Types ────────────────────────────────────────────────────
interface Feature {
  icon: string;
  title: string;
  description: string;
  badge?: string;
  cardVariant: "blue-light" | "green-light" | "pink-light" | "yellow-light" | "white";
}

// ─── Data ─────────────────────────────────────────────────────
const features: Feature[] = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Built on Next.js 15 with App Router and React Server Components for optimal performance.",
    badge: "Performance",
    cardVariant: "blue-light",
  },
  {
    icon: "🎨",
    title: "Design System",
    description:
      "A complete token-based design system with typography, colors, and components ready to use.",
    badge: "Design",
    cardVariant: "green-light",
  },
  {
    icon: "🔒",
    title: "Type Safe",
    description:
      "Full TypeScript support in strict mode. Catch bugs at compile time, not in production.",
    badge: "Developer XP",
    cardVariant: "pink-light",
  },
  {
    icon: "📦",
    title: "Reusable Components",
    description:
      "Every component is reusable, composable, and follows single-responsibility principles.",
    badge: "Components",
    cardVariant: "yellow-light",
  },
  {
    icon: "♿",
    title: "Accessible",
    description:
      "All components meet WCAG 2.1 AA standards with proper ARIA labels and keyboard navigation.",
    badge: "A11y",
    cardVariant: "blue-light",
  },
  {
    icon: "🚀",
    title: "Deploy Ready",
    description:
      "Configured for Vercel, Netlify, or any hosting platform. CI/CD friendly out of the box.",
    badge: "DevOps",
    cardVariant: "green-light",
  },
];

// ─── Feature Card ─────────────────────────────────────────────
function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Card variant={feature.cardVariant} className="flex flex-col gap-4">
      <span className="text-4xl">{feature.icon}</span>
      <div className="flex flex-col gap-2">
        <Heading as="h3" level="h4">{feature.title}</Heading>
        <Text variant="p3" className="text-gray-700">
          {feature.description}
        </Text>
      </div>
      {feature.badge && (
        <Badge variant="blue" className="self-start">
          {feature.badge}
        </Badge>
      )}
    </Card>
  );
}

// ─── Section ──────────────────────────────────────────────────
export function FeaturesSection() {
  return (
    <Section background="white" id="features">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <Badge variant="green">Features</Badge>
          <Heading as="h2" className="max-w-xl">
            Everything you need to ship
          </Heading>
          <Text variant="p2" className="max-w-lg text-gray-600">
            A carefully chosen set of features that give your project a solid
            foundation from day one.
          </Text>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
