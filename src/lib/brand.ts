/**
 * brand.ts — Configuração visual da marca.
 *
 * ════════════════════════════════════════════════════════════════════
 *  COMO CRIAR UMA NOVA LP A PARTIR DESTE TEMPLATE
 * ════════════════════════════════════════════════════════════════════
 *
 *  1. Clone o repositório
 *  2. Edite ESTE arquivo (brand.ts) para ajustar identidade visual
 *  3. Edite src/lib/content.ts para ajustar textos, preços, imagens
 *  4. Troque os assets em public/ pelas imagens da nova marca
 *  5. Configure NEXT_PUBLIC_META_PIXEL_ID no .env.local
 *
 *  Tudo mais (animações, SEO, tracking, componentes) já funciona.
 * ════════════════════════════════════════════════════════════════════
 */

// ─── TIPOGRAFIA ───────────────────────────────────────────────────
// Troque as fontes aqui. Use nomes exatos do Google Fonts.
// Referência: https://fonts.google.com
export const BRAND_FONTS = {
  /**
   * Fonte de corpo: legibilidade para parágrafos, labels e CTAs.
   * Exemplos alternativos:
   *   - "DM Sans"        → moderno, neutro
   *   - "Plus Jakarta Sans" → premium, tech-friendly
   *   - "Nunito"         → amigável, wellness/saúde
   */
  sans: "Inter" as const,

  /**
   * Fonte de display: títulos, h1, h2, citações.
   * Exemplos alternativos:
   *   - "Space Grotesk"       → tech / SaaS
   *   - "Playfair Display"    → luxo / moda
   *   - "Syne"                → editorial / design
   *   - "Libre Baskerville"   → advogado / seriedade
   *   - null                  → usar mesma fonte do sans (sem segunda fonte)
   */
  heading: "Cormorant Garamond" as const,
} as const;

// ─── LOGOTIPO ─────────────────────────────────────────────────────
// Controla como o logo é exibido no Header e Footer.
export const BRAND_LOGO = {
  /**
   * "emblem" → usa o SVG inline atual (BotanicalEmblem)
   * "image"  → usa uma imagem de public/logo.svg ou public/logo.png
   * "text"   → exibe apenas o nome da marca em texto
   */
  type: "emblem" as "emblem" | "image" | "text",

  /**
   * Caminho do arquivo quando type = "image".
   * Coloque o arquivo em /public/ e informe o caminho aqui.
   * Ex: "/logo.svg", "/logo.png", "/brand/logo-light.svg"
   */
  imageSrc: "/logo.svg",

  /**
   * Largura e altura em pixels para o logo quando type = "image".
   */
  imageWidth: 120,
  imageHeight: 40,
} as const;

// ─── EFEITO DE FUNDO ─────────────────────────────────────────────
// Controla o efeito decorativo de fundo nas seções hero e intermediárias.
export const BRAND_BG_EFFECT = {
  /**
   * "blob"  → formas orgânicas fluidas com gradiente (atual: botânica/beleza)
   * "glow"  → borrão difuso de luz suave (wellness, premium, SaaS)
   * "grid"  → malha pontilhada ou linear estática (tech, fintech, corporativo)
   * "none"  → sem efeito de fundo (minimalista, editorial)
   */
  variant: "blob" as "blob" | "glow" | "grid" | "none",

  /**
   * Cor inicial do gradiente do blob/glow.
   * Para "grid", esta cor é usada nos pontos/linhas.
   */
  colorStart: "#F0E4C8",

  /**
   * Cor final do gradiente do blob/glow.
   */
  colorEnd: "#E8D4A8",

  /**
   * Opacidade global do efeito (0 a 1).
   */
  opacity: 0.45,
} as const;

// ─── RAIO DE BORDA ───────────────────────────────────────────────
// Controla o arredondamento de cards, botões e elementos de UI.
// Este valor é injetado como --radius no globals.css via CSS var.
export const BRAND_RADIUS = {
  /**
   * "sharp"    → bordas afiadas (0rem)     — tech, corporativo, editorial
   * "subtle"   → arredondamento sutil (0.375rem) — neutro, profissional
   * "balanced" → padrão atual (0.625rem)   — artesanal, wellness
   * "rounded"  → muito arredondado (1rem)  — amigável, lifestyle, kids
   * "pill"     → pílula (1.5rem)           → jovem, app-like, energético
   */
  preset: "balanced" as "sharp" | "subtle" | "balanced" | "rounded" | "pill",
} as const;

// ─── MAPA DE RAIOS ────────────────────────────────────────────────
export const RADIUS_MAP: Record<typeof BRAND_RADIUS.preset, string> = {
  sharp:    "0rem",
  subtle:   "0.375rem",
  balanced: "0.625rem",
  rounded:  "1rem",
  pill:     "1.5rem",
};
