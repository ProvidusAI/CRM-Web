import type { Metadata } from "next";
import { Afacad, Roboto } from "next/font/google";
import {
  GoogleTagManagerNoScript,
  GoogleTagManagerScript,
} from "@/components/analytics/GoogleTagManager";
import "@/styles/globals.css";

const afacad = Afacad({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ProvidusCRM | Certified Salesforce Partner UK",
    template: "%s | ProvidusCRM",
  },
  description:
    "ProvidusCRM provides certified Salesforce consulting, implementation, development, integration, migration, and managed services in the UK.",
  keywords: ["Salesforce consulting", "CRM consulting", "ProvidusCRM"],
  openGraph: {
    type: "website",
    title: "ProvidusCRM | Certified Salesforce Partner UK",
    description:
      "Certified Salesforce consulting, implementation, development, integration, migration, and managed services in the UK.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${afacad.variable} ${roboto.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <GoogleTagManagerScript />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        {children}
      </body>
    </html>
  );
}
