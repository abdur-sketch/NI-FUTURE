import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const protocol = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: { default: "NI FUTURE — SPMB SMK Nurul Iman", template: "%s · NI FUTURE" },
    description: "Kenali potensi anak, temukan programnya, dan siapkan masa depannya bersama SMK Nurul Iman.",
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: { title: "NI FUTURE — SMK Nurul Iman", description: "Melanjutkan Perjalanan. Siapkan Masa Depan.", images: [{ url: `${origin}/og.png`, width: 1680, height: 945, alt: "NI FUTURE — SMK Nurul Iman" }] },
    twitter: { card: "summary_large_image", title: "NI FUTURE — SMK Nurul Iman", description: "Melanjutkan Perjalanan. Siapkan Masa Depan.", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
