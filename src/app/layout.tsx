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

export const metadata: Metadata = {
  title: "WEBMUSE | Where Ideas Become Digital Reality.",
  description: "An elite innovation studio that transforms ideas into world-class, premium digital products. Software Engineering, AI Solutions, Web3, and UI/UX Design.",
  keywords: ["WEBMUSE", "Innovation Studio", "Software Engineering", "AI Solutions", "Web3 Development", "Product Design", "MVP Development"],
  authors: [{ name: "WEBMUSE Team" }],
  openGraph: {
    title: "WEBMUSE | Where Ideas Become Digital Reality.",
    description: "An elite innovation studio that transforms ideas into world-class, premium digital products.",
    url: "https://webmuse.tech",
    type: "website",
    locale: "en_US",
  },
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
        <CursorProvider>
          <CustomCursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
