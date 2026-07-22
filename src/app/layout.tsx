import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { TEXTS } from "@/lib/content";

// ─── FONTES — display:swap elimina FOIT, subset otimiza payload ──
// 💡 [Next.js] next/font elimina o CLS (Cumulative Layout Shift) carregando fontes de forma otimizada.
const inter = Inter({
  variable: "--font-inter",
  subsets:  ["latin"],
  display:  "swap",
  preload:  true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets:  ["latin"],
  weight:   ["400", "500", "600"],
  style:    ["normal", "italic"],
  display:  "swap",
  preload:  true,
});

// ─── SEO METADATA ────────────────────────────────────────────────
// 💡 [Next.js] A Metadata API substitui o uso do antigo <Head> ou react-helmet.
// Isso é processado no servidor e melhora o SEO de forma declarativa.
export const metadata: Metadata = {
  metadataBase: new URL(TEXTS.SITE.url),
  title: {
    default:  TEXTS.SITE_META.titleDefault,
    template: TEXTS.SITE_META.titleTemplate,
  },
  description:  TEXTS.SITE_META.description,
  keywords:     [...TEXTS.SITE_META.keywords],
  authors:      [{ name: TEXTS.SITE_META.fullName }],
  creator:      TEXTS.SITE_META.shortName,
  publisher:    TEXTS.SITE_META.shortName,
  robots: {
    index:      true,
    follow:     true,
    googleBot:  { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type:        "website",
    locale:      "pt_BR",
    url:         TEXTS.SITE.url,
    siteName:    TEXTS.SITE_META.fullName,
    title:       TEXTS.SITE_META.titleOg,
    description: TEXTS.SITE_META.description,
    images: [
      {
        url:    TEXTS.SITE_META.ogImage,
        width:  1200,
        height: 630,
        alt:    `${TEXTS.SITE_META.shortName} — Sabonetes Artesanais`,
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       TEXTS.SITE_META.titleTwitter,
    description: TEXTS.SITE_META.descriptionShort,
    images:      [TEXTS.SITE_META.ogImage],
  },
  alternates: {
    canonical: TEXTS.SITE.url,
  },
  category: "health & beauty",
  verification: {
    google: "SEU_CODIGO_DE_VERIFICACAO_GSC",
  },
};

// ─── JSON-LD STRUCTURED DATA ─────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type":       "LocalBusiness",
      "@id":         `${TEXTS.SITE.url}/#business`,
      name:          TEXTS.SITE_META.fullName,
      description:   TEXTS.SITE_META.descriptionBusiness,
      url:           TEXTS.SITE.url,
      telephone:     `+${TEXTS.SITE.phone}`,
      priceRange:    "$$",
      image:         `${TEXTS.SITE.url}${TEXTS.SITE_META.ogImage}`,
      sameAs:        [TEXTS.SITE.instagram],
      address: {
        "@type":        "PostalAddress",
        addressCountry: "BR",
      },
      aggregateRating: {
        "@type":       "AggregateRating",
        ratingValue:   "4.8",
        reviewCount:   "3350",
        bestRating:    "5",
      },
    },
    {
      "@type":      "WebSite",
      "@id":        `${TEXTS.SITE.url}/#website`,
      url:          TEXTS.SITE.url,
      name:         TEXTS.SITE_META.shortName,
      description:  TEXTS.SITE_META.category,
      inLanguage:   "pt-BR",
    },
  ],
};

// 💡 [Next.js] RootLayout é um Server Component por padrão. 
// Ele não precisa de 'use client' e nunca envia seu JS para o navegador.
// 💡 [TS] Uso do Utility Type `Readonly` garantindo imutabilidade nas props.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="snap-y snap-proximity">
      <head>
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        <AnalyticsProvider />
        <Providers>{children}</Providers>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
