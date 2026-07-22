/**
 * AnalyticsProvider — Centraliza todos os provedores de analytics da aplicação.
 *
 * Padrão consistente com FacebookPixel.tsx:
 *  - Lê IDs de variáveis de ambiente (NEXT_PUBLIC_*)
 *  - Graceful degradation: não renderiza provedores sem ID configurado
 *  - Um único componente para importar no layout.tsx
 *
 * Provedores incluídos:
 *  - Google Analytics 4 (requer NEXT_PUBLIC_GA_ID)
 *  - Vercel Analytics (automático, sem ID)
 *  - Vercel Speed Insights (automático, sem ID)
 *  - Microsoft Clarity (requer NEXT_PUBLIC_CLARITY_ID)
 *  - Meta Pixel (via componente interno FacebookPixel)
 *
 * .env.local:
 *   NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
 *   NEXT_PUBLIC_CLARITY_ID="SEU_CLARITY_PROJECT_ID"
 */
"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { FacebookPixel } from "./FacebookPixel";

export function AnalyticsProvider() {
  const gaId      = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {/* Google Analytics 4 — só monta se o ID estiver configurado */}
      {gaId && <GoogleAnalytics gaId={gaId} />}

      {/* Meta Pixel — encapsulado em seu próprio componente com tratativas de Server/Client e Suspense */}
      <FacebookPixel />

      {/* Vercel Analytics — automático, sem ID necessário */}
      <Analytics />

      {/* Vercel Speed Insights — automático, sem ID necessário */}
      <SpeedInsights />

      {/* Microsoft Clarity — só monta se o ID estiver configurado */}
      {clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  );
}
