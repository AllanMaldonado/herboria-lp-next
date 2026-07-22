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
    default:  "Energia Criativa | Saboaria Botânica Artesanal — Sabonetes Naturais Premium",
    template: "%s | Energia Criativa Saboaria Botânica",
  },
  description:
    "Sabonetes artesanais Energia Criativa: 100% naturais, com óleos essenciais puros e glicerina vegetal preservada. Transforme seu banho em aromaterapia. Kits de presente únicos. Produção limitada.",
  keywords: [
    "sabonetes artesanais",
    "sabonete natural",
    "saboaria botânica",
    "óleos essenciais",
    "aromaterapia",
    "sabonete cold process",
    "kit presente sabonete",
    "sabonete orgânico",
    "Energia Criativa",
    "sabonete glicerina",
  ],
  authors:  [{ name: "Energia Criativa Saboaria Botânica" }],
  creator:  "Energia Criativa",
  publisher:"Energia Criativa",
  robots: {
    index:             true,
    follow:            true,
    googleBot:         { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type:        "website",
    locale:      "pt_BR",
    url:         TEXTS.SITE.url,
    siteName:    "Energia Criativa Saboaria Botânica",
    title:       "Energia Criativa | Sabonetes Botânicos Artesanais — 100% Naturais",
    description: "Transforme seu banho em aromaterapia com sabonetes artesanais Energia Criativa. Óleos essenciais puros, glicerina vegetal preservada. Produção limitada.",
    images: [
      {
        url:    "/hero-composition.png",
        width:  1200,
        height: 630,
        alt:    "Energia Criativa — Sabonetes Botânicos Artesanais",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Energia Criativa | Sabonetes Botânicos Artesanais",
    description: "Transforme seu banho em aromaterapia. 100% naturais, produção artesanal limitada.",
    images:      ["/hero-composition.png"],
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
      name:          "Energia Criativa Saboaria Botânica",
      description:   "Saboaria artesanal especializada em sabonetes botânicos com óleos essenciais puros e ingredientes 100% naturais.",
      url:           TEXTS.SITE.url,
      telephone:     `+${TEXTS.SITE.phone}`,
      priceRange:    "$$",
      image:         `${TEXTS.SITE.url}/hero-composition.png`,
      sameAs:        [TEXTS.SITE.instagram],
      address: {
        "@type":   "PostalAddress",
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
      name:         "Energia Criativa",
      description:  "Saboaria Botânica Artesanal",
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
