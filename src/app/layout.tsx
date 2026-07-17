import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { CursorProvider } from "@/components/ui/CustomCursor";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.webmuse.tech";
const SITE_TITLE = "WEBMUSE | Software & Web Development Studio in Lagos, Nigeria & UK";
const SITE_DESCRIPTION = "WEBMUSE is a software engineering and product design studio serving clients across Lagos, Nigeria and the United Kingdom. We build websites, applications, and software that turn ideas into products — Software Engineering, AI Solutions, Web3, and UI/UX Design.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | WEBMUSE",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "WEBMUSE",
    "software development Nigeria",
    "web development Lagos",
    "software company Lagos",
    "web development company UK",
    "software development agency UK",
    "app development Nigeria",
    "Innovation Studio",
    "Software Engineering",
    "AI Solutions",
    "Web3 Development",
    "Product Design",
    "MVP Development",
  ],
  authors: [{ name: "WEBMUSE Team" }],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_TITLE,
    description: "Software engineering and product design studio serving clients across Lagos, Nigeria and the United Kingdom.",
    url: SITE_URL,
    siteName: "WEBMUSE",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: "Software engineering and product design studio serving clients across Lagos, Nigeria and the United Kingdom.",
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "WEBMUSE",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: "hello@webmuse.tech",
  areaServed: [
    {
      "@type": "Country",
      name: "Nigeria",
    },
    {
      "@type": "Country",
      name: "United Kingdom",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-background focus:outline focus:outline-2 focus:outline-electric-blue focus:outline-offset-2"
        >
          Skip to main content
        </a>
        <CursorProvider>
          <CustomCursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
