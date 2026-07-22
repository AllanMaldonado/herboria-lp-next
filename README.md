# Ateliê Energia Criativa — PRD Arquitetural da Landing Page

> **Product Requirements Document (PRD) · System Design · UI/UX · Marketing & Persuasão**
> Análise técnica completa da Landing Page do Ateliê Energia Criativa.
> Versão do documento: 4.0 · Julho 2026

---

## Índice

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Arquitetura de Diretórios](#3-arquitetura-de-diretórios)
4. [Camada de Configuração](#4-camada-de-configuração)
5. [Camada de Design System](#5-camada-de-design-system-globalscss)
6. [Camada de Dados — lib/](#6-camada-de-dados--lib)
7. [Camada de Hooks](#7-camada-de-hooks--hooks)
8. [Camada de Roteamento — app/](#8-camada-de-roteamento--app)
9. [Camada de Componentes](#9-camada-de-componentes--components)
10. [Funil de Conversão](#10-funil-de-conversão--jornada-do-usuário)
11. [Análise de UI/UX](#11-análise-de-uiux)
12. [Análise de Marketing e Persuasão](#12-análise-de-marketing-e-persuasão)
13. [Análise de Performance e SEO](#13-análise-de-performance-e-seo)
14. [Análise de Tracking e Analytics](#14-análise-de-tracking-e-analytics)
15. [Arquitetura White-Label — Como Reutilizar](#15-arquitetura-white-label--como-reutilizar)
16. [Roadmap de CMS — Do Estático ao Dinâmico](#16-roadmap-de-cms--do-estático-ao-dinâmico)
17. [Ferramentas para Construir e Manter a LP](#17-ferramentas-para-construir-e-manter-a-lp)
18. [Pontos Fortes](#18-pontos-fortes)
19. [Oportunidades de Melhoria](#19-oportunidades-de-melhoria)
20. [Roadmap de Melhorias Priorizadas](#20-roadmap-de-melhorias-priorizadas)
21. [Changelog](#21-changelog)
22. [Conclusão Geral](#22-conclusão-geral)

---

## 1. Visão Geral do Produto

**Ateliê Energia Criativa** é um ateliê de saboaria artesanal que produz sabonetes premium pelo método *Cold Process*. A landing page serve como **único canal digital de aquisição**, com foco em:

- Apresentar os produtos com posicionamento de luxo acessível
- Educar o visitante sobre diferenciação (glicerina natural, óleos essenciais, cura artesanal)
- Converter o tráfego diretamente para o **WhatsApp** (canal de venda assistida)
- Construir confiança via prova social e storytelling da fundadora Kelly

A LP não possui e-commerce interno — o CTA primário é sempre um link `wa.me` que abre uma conversa pré-formatada no WhatsApp, onde a venda é finalizada de forma personalizada.

> **Nota histórica:** O repositório foi originalmente criado como "Herboria Saboaria Botânica" e evoluiu para "Ateliê Energia Criativa". O nome do repositório (`herboria-lp-next`) preserva o histórico de versionamento. O `package.json` registra `"name": "energia-criativa-web"`.

---

## 2. Stack Tecnológico

| Categoria | Tecnologia | Versão | Função |
|---|---|---|---|
| Framework | **Next.js** | 16.2.10 | SSR/SSG, App Router, otimização de imagens |
| UI | **React** | 19.2.4 | Renderização de componentes |
| Linguagem | **TypeScript** | ^5 | Tipagem estática, `as const`, `Readonly` |
| Estilização | **Tailwind CSS** | ^4 | Utilitários CSS, design tokens via CSS vars |
| Animação | **Framer Motion** | ^12 | Micro-animações, `useInView`, `AnimatePresence` |
| Carousel | **Embla Carousel** (via shadcn) | ^8 | Carrosséis nativos — `TestimonialSection` |
| Ícones | SVG inline customizado | — | Emblema, WhatsAppIcon, StarIcon |
| Fontes | **Google Fonts via next/font** | — | Inter (body), Cormorant Garamond (headings) |
| UI Primitivos | **shadcn** + **@base-ui/react** | — | `carousel.tsx`, `button.tsx` |
| Analytics (Meta) | **Meta Pixel** | — | PageView + 10 eventos de conversão |
| Analytics (Google) | **@next/third-parties/google** | ^16 | GA4 assíncrono |
| Analytics (Vercel) | **@vercel/analytics** | ^2 | Análise comportamental nativa da Vercel |
| Performance | **@vercel/speed-insights** | ^2 | Core Web Vitals em produção |
| Analytics (Sessão) | **Microsoft Clarity** | — | Heatmaps e gravação de sessão |
| Deploy | **Vercel** | — | Edge Network, Brotli, AVIF |

### Decisões Arquiteturais Relevantes

- **App Router do Next.js 16** com divisão clara entre Server Components (`layout.tsx`) e Client Components.
- **Importações estáticas** para todas as seções — sem `dynamic()` imports.
- **`next/font`** elimina CLS ao pré-carregar fontes com `display: swap`.
- **Metadata API nativa** do Next.js para SEO declarativo.
- **CSS Custom Properties** como fonte única de verdade para o Design System.
- **Arquitetura White-Label**: `brand.ts` + `BackgroundEffect` + `BrandLogo` permitem trocar toda a identidade visual sem alterar componentes estruturais.

---

## 3. Arquitetura de Diretórios

```
herboria-lp-next/
│
├── public/
│   ├── hero-composition.png
│   ├── kit-serenidade.png
│   ├── kit-vitalidade.png
│   ├── kit-purificacao.png
│   ├── benefits-soap.png
│   ├── artisan_portrait.png
│   ├── gallery-lavender.png
│   ├── gallery-rosemary.png
│   ├── gallery-charcoal.png
│   ├── gallery-rose.png
│   ├── llms.txt                     # Contexto da marca para LLMs
│   └── images/
│       ├── avatar1.jpg
│       ├── avatar2.jpg
│       └── avatar3.jpg
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               # RootLayout: fontes, metadata, JSON-LD, providers
│   │   ├── page.tsx                 # Home page: orquestra as seções da LP
│   │   ├── globals.css              # Design System: tokens de cor, tipografia, keyframes
│   │   ├── icon.svg
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Icons.tsx            # SVG inline: emblema, WhatsApp, Star, Instagram, Facebook
│   │   │   ├── BrandLogo.tsx        # Logo genérico controlado por brand.ts
│   │   │   ├── SectionHeader.tsx    # Cabeçalho padronizado de seção
│   │   │   ├── button.tsx
│   │   │   └── carousel.tsx
│   │   │
│   │   ├── Header.tsx
│   │   ├── AnimatedHeroContent.tsx
│   │   ├── HeroImages.tsx
│   │   ├── BackgroundEffect.tsx     # Efeito decorativo genérico (blob/glow/grid/none)
│   │   ├── BenefitsSection.tsx
│   │   ├── CollectionsSection.tsx
│   │   ├── ProductGallerySlider.tsx # Disponível, fora do page.tsx
│   │   ├── InfiniteSlider.tsx       # Disponível, fora do page.tsx
│   │   ├── AboutSection.tsx
│   │   ├── GreenCtaSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   ├── FaqSection.tsx
│   │   ├── Footer.tsx
│   │   ├── FacebookPixel.tsx
│   │   ├── FloatingWhatsApp.tsx
│   │   └── Providers.tsx
│   │
│   ├── hooks/
│   │   └── useCountdown.ts          # Contador regressivo com localStorage
│   │
│   └── lib/
│       ├── content.ts               # Single Source of Truth — todo o conteúdo do site
│       ├── brand.ts                 # Configuração visual White-Label
│       ├── animations.ts            # Variantes Framer Motion
│       ├── utils.ts                 # cn() para composição segura de classes
│       └── tracking.ts              # Sistema Meta Pixel com dual-firing
│
├── AGENTS.md
├── CUSTOM_CMS_ARCHITECTURE.md       # Roadmap técnico: CMS próprio
├── LP_TEMPLATE_GUIDE.md             # Guia: nova LP a partir deste template
├── next.config.ts
├── tsconfig.json
├── components.json
└── package.json
```

---

## 4. Camada de Configuração

### `next.config.ts`
1. **Imagens**: `formats: ['image/avif', 'image/webp']` — serve automaticamente o formato mais eficiente.
2. **Headers HTTP de segurança**: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.
3. **Cache**: `max-age=31536000, immutable` para assets estáticos.

### `tsconfig.json`
Alias `@/` apontando para `./src/` — imports absolutos sem caminhos relativos frágeis.

---

## 5. Camada de Design System (`globals.css`)

Sistema de design via **CSS Custom Properties**, consumidas pelo Tailwind 4 via `@theme inline`.

### Paleta de Cores

| Token | Valor | Função |
|---|---|---|
| `--primary` | `#6B7C3F` | Verde oliva — cor da marca, CTAs |
| `--primary-dark` | `#2D3B1F` | Footer, fundos escuros |
| `--background` | `#F7F2E8` | Creme quente — fundo geral |
| `--foreground` | `#1C2011` | Texto principal |
| `--accent` | `#C8A97A` | Dourado terroso — detalhes de luxo |
| `--muted-foreground` | `#706852` | Texto secundário |
| `--border` | `#DDD6C5` | Bordas sutis |
| `--secondary` | `#EDE7D8` | Cards, seções alternadas |
| `--radius` | `0.625rem` | Border radius base |

### Tipografia

| Variável | Fonte | Aplicação |
|---|---|---|
| `--font-sans` | **Inter** | Corpo, labels, CTAs |
| `--font-heading` | **Cormorant Garamond** | H1, H2, citações |

---

## 6. Camada de Dados — `lib/`

### `content.ts` — Single Source of Truth

Todo conteúdo textual, imagens, URLs e dados vivem no objeto `TEXTS` com `as const`.

```
TEXTS.SITE         → name ("Energia Criativa"), tagline ("Ateliê"), url, phone, social
TEXTS.SITE_META    → fullName, category, titleDefault, titleOg, description, keywords, ariaHero
TEXTS.IMAGES       → Paths + blurDataURL de todas as imagens
TEXTS.NAV_LINKS    → Links de navegação
TEXTS.HERO         → eyebrow, title, description, CTA, produtos
TEXTS.TRUST        → 3 indicadores de credibilidade
TEXTS.BENEFITS     → textos, imagem, badge, CTA
TEXTS.GALLERY      → 5 itens da galeria
TEXTS.KITS         → 3 produtos: nome, preço, descrição, benefícios, WhatsApp
TEXTS.CTA_SECTION  → Seção de urgência: copy + 3 stats
TEXTS.ARTISAN      → Storytelling da Kelly: parágrafos + imagem
TEXTS.TESTIMONIALS → 3 depoimentos: quote, nome, tag, avatar
TEXTS.FAQ          → 5 perguntas frequentes
TEXTS.FOOTER       → CTA final, links, copyright
```

> **`TEXTS.SITE_META`** centraliza todas as strings de marca usadas em metadata Next.js, JSON-LD e `aria-labels`. Altere aqui e toda a aplicação reflete automaticamente — sem magic strings espalhadas.

### `brand.ts` — Configuração White-Label

```typescript
BRAND_FONTS     → { sans: "Inter", heading: "Cormorant Garamond" }
BRAND_LOGO      → { type: "emblem" | "image" | "text", imageSrc, imageWidth, imageHeight }
BRAND_BG_EFFECT → { variant: "blob" | "glow" | "grid" | "none", colorStart, colorEnd, opacity }
BRAND_RADIUS    → { preset: "sharp" | "subtle" | "balanced" | "rounded" | "pill" }
```

### `animations.ts`

| Variante | Uso |
|---|---|
| `staggerContainer(n)` | Container com delay em cascata nos filhos |
| `fadeUp` | Entrada padrão de seções |
| `fadeLeft` / `fadeRight` | Entradas laterais |
| `scaleIn` | Cards e badges |
| `accordionContent` | Expansão do FAQ |
| `IN_VIEW_OPTIONS` | `{ once: true, amount: 0.25 }` |

### `tracking.ts` — Dual-firing Meta Pixel

- `PIXEL_EVENTS` — dicionário imutável com 10 nomes de evento
- `fbqEvent()` — dispara evento customizado
- `fbqStandard()` — dispara evento padrão Meta

---

## 7. Camada de Hooks — `hooks/`

### `useCountdown.ts`

Hook de urgência temporal com `localStorage`. Persiste o prazo entre recarregamentos.

```typescript
export function useCountdown(hoursToAdd: number = 24)
// Retorna: { hours, minutes, seconds } | null
```

> ⚠️ Implementado, mas **não conectado** à `GreenCtaSection` ainda.

---

## 8. Camada de Roteamento — `app/`

### `layout.tsx` — Server Component

1. Fontes pré-carregadas com `next/font`
2. SEO Metadata API: title, description, OG, Twitter Card, canonical, JSON-LD
3. JSON-LD: `LocalBusiness` + `WebSite` com `@graph`
4. Analytics: Meta Pixel, GA4, Vercel Analytics, Speed Insights, Clarity

### Ordem das seções no `page.tsx`

```
1.  Skip link acessibilidade
2.  Header
3.  Noise overlay (textura premium)
4.  Hero + TrustBar (100dvh desktop)
5.  BenefitsSection
6.  CollectionsSection
7.  AboutSection
8.  GreenCtaSection
9.  TestimonialSection
10. FaqSection
11. Footer
```

---

## 9. Camada de Componentes — `components/`

| Componente | Função |
|---|---|
| `BrandLogo` | Logo genérico controlado por `brand.ts` |
| `BackgroundEffect` | Efeito decorativo: blob / glow / grid / none |
| `SectionHeader` | Cabeçalho padronizado: tag + h2 + subtitle |
| `Header` | Navbar com hide-on-scroll, glassmorphism |
| `AnimatedHeroContent` | Copy do Hero com Framer Motion |
| `HeroImages` | Imagem do produto + badges flutuantes |
| `BenefitsSection` | Educação + parallax |
| `CollectionsSection` | 3 kits + modal nativo drag-to-close |
| `GreenCtaSection` | Seção de urgência verde + bento grid |
| `TestimonialSection` | Carrossel Embla de depoimentos |
| `FaqSection` | Accordion com AnimatePresence |
| `Footer` | Rodapé + CTA final |
| `FloatingWhatsApp` | Botão fixo bottom-right |
| `InfiniteSlider` | Ticker de atributos *(disponível, desativado)* |
| `ProductGallerySlider` | Carrossel de produtos *(disponível, desativado)* |

---

## 10. Funil de Conversão — Jornada do Usuário

```
TOPO — Atenção
  Hero        → Hook visual + CTA primário + badge de review
  TrustBar    → "45 Dias" / "3x Mais" / "100%" puro

MEIO — Interesse e Consideração
  Benefits    → Glicerina preservada, aromaterapia, diferenciação
  Collections → 3 kits + modal + CTA duplo por card
  About       → Humanização: história real da Kelly

FUNDO — Decisão
  GreenCTA    → Urgência: lotes limitados + shimmer CTA
  Testimonials→ 6 cards em loop, avatares locais
  FAQ         → 5 objeções eliminadas
  Footer      → CTA final + rastreamento ScrollToFooter
```

**9+ pontos de contato com CTA WhatsApp** ao longo da jornada.

---

## 11. Análise de UI/UX

### Acertos

| Aspecto | Avaliação |
|---|---|
| Hierarquia visual | Clara — H1 massivo, H2 de seção, corpo pequeno |
| Contraste | `#6B7C3F` sobre branco: ratio ~4.5:1 (WCAG AA) |
| Espaçamento | Generoso (`py-20 lg:py-32`) |
| Hover feedback | `hover:-translate-y-0.5`, `hover:shadow-xl`, `active:scale-[0.98]` |
| Micro-animações | Spring physics calibradas |
| Acessibilidade | `aria-label`, `aria-hidden`, `role`, skip link |
| Snap scroll | `snap-y snap-proximity` — experiência fluida |
| Blur placeholders | `blurDataURL` em todas as imagens |

### Pontos de Atenção

- **`useCountdown` não integrado** — hook pronto, aguardando uso
- **Mobile sem menu** — decisão intencional de CRO (tunneling para CTA único)

---

## 12. Análise de Marketing e Persuasão

| Gatilho | Onde | Efetividade |
|---|---|---|
| Escassez | "Produção limitada", "lotes esgotam rápido" | Alta — escassez real |
| Autoridade | "Cold Process", "5 semanas de cura" | Alta |
| Prova social | 3 depoimentos, avatares locais | Média-Alta |
| Reciprocidade | "Receber Catálogo" grátis | Alta — baixa barreira |
| Storytelling | Seção About — jornada da Kelly | Muito alta |
| Especificidade | "45 dias", "3x mais", preços exatos | Alta |

---

## 13. Análise de Performance e SEO

### Performance

| Técnica | Status |
|---|---|
| `next/image` com AVIF/WebP | ✅ |
| `priority` nas imagens above fold | ✅ |
| `next/font` com `display: swap` | ✅ |
| `blurDataURL` em todas as imagens | ✅ |
| Cache assets `max-age=31536000` | ✅ |
| Imagens em `.avif` nativamente | ❌ ainda em `.png` |

### SEO

| Item | Status |
|---|---|
| Title único + template | ✅ |
| Meta description < 160 chars | ✅ |
| Open Graph completo | ✅ |
| JSON-LD `LocalBusiness` + `WebSite` | ✅ |
| `robots.ts` + `sitemap.ts` | ✅ |
| Um único `<h1>` por página | ✅ |
| `alt` em todas as imagens | ✅ |
| Google Search Console | ⚠️ Placeholder — requer código real |

---

## 14. Análise de Tracking e Analytics

| Plataforma | Dados coletados |
|---|---|
| **Meta Pixel** | Eventos de conversão, retargeting |
| **Google Analytics 4** | Sessions, funil, comportamento |
| **Vercel Analytics** | Visitantes únicos, Web Vitals |
| **Microsoft Clarity** | Heatmaps, gravação de sessão |

### Eventos Meta Pixel

| Componente | Evento Customizado | Padrão Meta |
|---|---|---|
| Hero | `HeroCTAClick` | `Contact` |
| Header | `HeaderCTAClick` | `Contact` |
| FloatingWhatsApp | `FloatingWhatsAppClick` | `Contact` |
| Benefits | `BenefitsCTAClick` | `Lead` |
| GreenCTA | `GreenCTAClick` | `Lead` |
| Footer | `FooterCTAClick` | `Lead` |
| Collections (modal) | `KitModalOpen` | `ViewContent` |
| Collections (comprar) | `KitBuyClick` | `InitiateCheckout` |
| FAQ | `FaqExpand` | — |
| Footer scroll | `ScrollToFooter` | `Lead` |

### Configurações Pendentes

```env
# .env.local
NEXT_PUBLIC_META_PIXEL_ID="SEU_ID_DO_PIXEL"
```

Em `layout.tsx`:
- `gaId="G-ABC123XYZ"` → ID real do GA4
- `"CLARITY_ID_AQUI"` → Project ID do Clarity
- `google: "SEU_CODIGO_DE_VERIFICACAO_GSC"` → Search Console

---

## 15. Arquitetura White-Label — Como Reutilizar

> Guia completo em `LP_TEMPLATE_GUIDE.md`

Este repositório funciona como um **Framework de Landing Pages**. Nova LP em qualquer nicho em ~1 hora:

### Passo 1 — Identidade Visual (`src/lib/brand.ts`)

```typescript
BRAND_FONTS.sans        = "DM Sans"      // qualquer Google Font
BRAND_FONTS.heading     = "Space Grotesk"
BRAND_LOGO.type         = "image"        // emblem | image | text
BRAND_LOGO.imageSrc     = "/logo.svg"
BRAND_BG_EFFECT.variant = "glow"         // blob | glow | grid | none
BRAND_RADIUS.preset     = "rounded"      // sharp | subtle | balanced | rounded | pill
```

**Variantes de fundo:**
- `blob` — formas orgânicas fluidas (saboaria, beleza, wellness)
- `glow` — borrão de luz difuso (premium, SaaS, tech)
- `grid` — malha geométrica (fintech, startup)
- `none` — minimalista

### Passo 2 — Paleta (`src/app/globals.css`)

```css
--primary:    #0F62FE;
--background: #FFFFFF;
--foreground: #161616;
```

### Passo 3 — Conteúdo (`src/lib/content.ts`)

Todo o copy, preços, imagens e CTAs vivem aqui. `TEXTS.SITE_META` centraliza todas as strings de marca (SEO, JSON-LD, `aria-labels`).

### Passo 4 — Imagens (`public/`)

- Upload das imagens da nova marca
- Atualize `TEXTS.IMAGES` em `content.ts`
- Adicione `blurDataURL` em Base64 (10×10px) para placeholders instantâneos

### Passo 5 — Analytics (`.env.local`)

```env
NEXT_PUBLIC_META_PIXEL_ID="SEU_ID"
```

### Desativando Seções

Abra `src/app/page.tsx` e comente as linhas das seções não necessárias. Nada quebra.

---

## 16. Roadmap de CMS — Do Estático ao Dinâmico

> Detalhamento completo em `CUSTOM_CMS_ARCHITECTURE.md`

### Situação Atual (Estático)

- `content.ts` — conteúdo em código
- `brand.ts` + `globals.css` — estilo em código
- `/public` — imagens em código

**Limitação:** qualquer edição exige deploy.

---

### Evolução 1 — CMS Headless de Mercado (recomendado)

Conectar um CMS headless ao `content.ts`. Os componentes fazem `fetch` ao CMS via API. O código permanece; o conteúdo vem de um painel visual.

#### Comparativo de CMSs

| CMS | Tipo | Destaque | Quando usar |
|---|---|---|---|
| **Strapi** | Self-hosted / Cloud | Open source, REST + GraphQL, painel customizável | Quer controle total, sem lock-in |
| **Payload CMS** | Self-hosted (Next.js) | Integração nativa com App Router | Projeto full-stack, time técnico |
| **Sanity** | Cloud | Editor visual rico, GROQ, real-time | Conteúdo rico, múltiplos editores |
| **Contentful** | Cloud | Maduro, multi-ambiente, SDK robusto | Enterprise, multilingue |
| **Notion + API** | Cloud | Zero setup, familiar para não-técnicos | Conteúdo simples, equipe pequena |

#### Strapi — Integração com este projeto

```
1. Deploy Strapi em Railway, Render ou VPS
2. Criar Content Types: Kit, Testimonial, FAQ, HeroContent
3. Substituir strings do content.ts por:
   const kits = await fetch(`${process.env.STRAPI_URL}/api/kits`).then(r => r.json())
4. Usar ISR do Next.js: revalidate a cada X minutos
```

---

### Evolução 2 — CMS Próprio (painel admin interno)

#### 1. Textos e Dados (substitui `content.ts`)
- Banco de dados: PostgreSQL via Prisma, Supabase ou Firebase
- Painel admin: rota `src/app/admin` protegida por autenticação
- Formulários → BD → LP busca via `fetch`

#### 2. Imagens (substitui `/public`)
- Storage: AWS S3, Supabase Storage ou Vercel Blob
- Admin faz upload → URL pública → salva URL no BD

#### 3. Cores e Estilos (substitui variáveis CSS estáticas)
```tsx
// Next.js injeta cores do BD via CSS variables dinâmicas
<html style={{ '--primary': corDoBanco } as React.CSSProperties}>
```

#### O que construir
```
1. Backend       → banco de dados + storage
2. Frontend LP   → extrair dados do banco
3. Painel Admin  → formulários, color pickers, upload de imagens
                   (tudo dentro do mesmo projeto Next.js)
```

---

## 17. Ferramentas para Construir e Manter a LP

### Deploy e Infraestrutura

| Ferramenta | Função |
|---|---|
| **Vercel** | Deploy, CDN, Edge Functions — integração nativa Next.js |
| **Railway** | Banco de dados + backend (ideal para Strapi) |
| **Supabase** | DB + Storage + Auth — open source, substitui Firebase |
| **Cloudflare** | CDN + DNS + proteção + cache global |

### Performance e Imagens

| Ferramenta | Função |
|---|---|
| **Squoosh CLI** | Converter `.png → .avif/.webp` + gerar `blurDataURL` |
| **Sharp** | Processamento de imagem em Node.js |
| **Lighthouse** | Auditoria de performance no browser |
| **WebPageTest** | Teste real de LCP/CLS/INP |

### Analytics e Dados

| Ferramenta | Função |
|---|---|
| **Meta Business Suite** | Pixel, audiências, campanhas |
| **Google Analytics 4** | Comportamento, funil, engajamento |
| **Microsoft Clarity** | Heatmaps, sessões gravadas |
| **Vercel Analytics** | Core Web Vitals reais |
| **Google Search Console** | Indexação, palavras-chave, erros de crawl |

### Desenvolvimento

| Ferramenta | Função |
|---|---|
| **GitHub** | Versionamento, histórico, CI/CD |
| **GitHub Actions** | Lint, typecheck e build automáticos antes do merge |
| **ESLint + TypeScript** | Qualidade de código — já configurados |
| **Prettier** | Formatação consistente — recomendado adicionar |

### CMS (opções)

| CMS | Destaque |
|---|---|
| **Strapi** | Open source, melhor custo-benefício, auto-hospedável |
| **Payload CMS** | Construído com Next.js, integração perfeita |
| **Sanity** | Editor visual com preview em tempo real |
| **Notion API** | Ultra-simples para times não-técnicos |

### Manutenção Contínua

```bash
# Atualizar dependências
npx npm-check-updates -u

# Checar vulnerabilidades
npm audit

# Build antes de qualquer deploy
npm run build

# Checar TypeScript sem build
npx tsc --noEmit
```

---

## 18. Pontos Fortes

1. **White-Label completo** — `brand.ts` + `content.ts` + `SITE_META` = nova LP em 1h
2. **Single Source of Truth** — `content.ts` centraliza 100% do conteúdo e strings de marca
3. **Design System coerente** — paleta, tipografia e espaçamentos consistentes
4. **Performance por padrão** — `next/image`, `next/font`, `blurDataURL`
5. **Animações com física real** — spring dynamics calibrados
6. **SEO técnico completo** — JSON-LD `@graph`, Metadata API, sitemap, robots
7. **Analytics 4-em-1** — Meta + GA4 + Vercel + Clarity
8. **Dual-firing** — 10 pontos de CTA com evento customizado + padrão Meta
9. **Modal nativo drag-to-close** — sem dependência de lib
10. **Componentes reutilizáveis** — `SectionHeader`, `BackgroundEffect`, `BrandLogo`

---

## 19. Oportunidades de Melhoria

**M1 — Conectar `useCountdown` na `GreenCtaSection`**
`Impacto: Médio | Esforço: Muito Baixo` — hook pronto, falta consumi-lo.

**M2 — Imagens em `.avif`**
`Impacto: Médio (LCP) | Esforço: Baixo` — ainda em `.png`. Converter com `squoosh-cli`.

**M3 — Depoimentos em Vídeo**
`Impacto: Alto (Confiança) | Esforço: Alto` — requer conteúdo da cliente.

**M4 — Ativar `InfiniteSlider`**
`Impacto: Médio | Esforço: Muito Baixo` — componente pronto, uma linha de import.

**M5 — Configurar IDs reais de Analytics**
`Impacto: Alto | Esforço: Muito Baixo` — GA4, Clarity, GSC com placeholders.

**M6 — Integrar CMS headless (Strapi)**
`Impacto: Alto (Autonomia) | Esforço: Médio` — permitir edição sem deploy.

**M7 — A/B Tests de Copy**
`Impacto: Alto (Conversão) | Esforço: Médio` — base pronta via `content.ts`.

---

## 20. Roadmap de Melhorias Priorizadas

```
Concluído
────────────────────────────────────────────────
[x] blurDataURL em todas as imagens
[x] Avatares locais (sem CDN externo)
[x] BackgroundEffect genérico
[x] BrandLogo genérico
[x] Analytics completo (GA4 + Clarity)
[x] snap-scroll por seção
[x] SITE_META centralizado em content.ts
[x] Remoção de "botânica" do codebase
[x] Rebranding para Ateliê Energia Criativa
[x] Hierarquia do logo corrigida
[x] Footer com altura padrão

Sprint Imediata — Baixo Esforço
────────────────────────────────────────────────
[ ] Configurar IDs reais (GA4, Clarity, GSC)
[ ] Conectar useCountdown na GreenCtaSection
[ ] Ativar InfiniteSlider no page.tsx

Sprint Futura — Conteúdo e Evolução
────────────────────────────────────────────────
[ ] Converter imagens .png → .avif
[ ] Captar Depoimentos em Vídeo
[ ] Testes A/B de copy no Hero
[ ] Integrar Strapi como CMS headless
[ ] Painel Admin próprio (Evolução 2)
```

---

## 21. Changelog

| Versão | Data | Mudanças |
|---|---|---|
| **v4.0** | Jul 2026 | **Rebranding Ateliê Energia Criativa.** Remoção completa de "botânica". `SITE_META` centralizado. `aria-labels` e metadata via `TEXTS.SITE_META`. Hierarquia da logo corrigida. Footer com altura padrão. Shadow dos cards de depoimento corrigida. Animações do Hero e CollectionsSection restauradas. README v4 reescrito. |
| **v3.0** | Jul 2026 | Fix `BenefitsSection`, Modal responsivo, Trackpad Swipe, Analytics centralizado via Provider. |
| **v2.0** | Jul 2026 | Refatoração White-Label: `brand.ts`, `BackgroundEffect`, `BrandLogo`. Rebranding Herboria → Energia Criativa. `useCountdown`. Analytics expandido. `blurDataURL`. Avatares locais. `snap-scroll`. |
| **v1.4** | Jul 2026 | Tracking dual-firing completo. GA4. |
| **v1.3** | Jul 2026 | `brand.ts` e `BackgroundEffect` rascunho. |
| **v1.2** | Jul 2026 | UX otimizada, blur placeholders, Footer, avatares reais. |
| **v1.1** | Jul 2026 | Migração Swiper → Embla. Meta Pixel. |
| **v1.0** | Jul 2026 | Versão inicial. Next.js 16 + React 19 + Tailwind 4. |

---

## 22. Conclusão Geral

A LP do **Ateliê Energia Criativa** é uma entrega técnica madura para o segmento de produtos artesanais D2C no Brasil. A arquitetura evoluiu de uma LP de nicho para um **Framework de Landing Pages White-Label** reutilizável.

**O que diferencia de uma LP típica:**
- White-Label: `brand.ts` + `content.ts` + `SITE_META` = nova LP em qualquer nicho em 1h
- Código limpo com separação clara de responsabilidades
- SEO técnico completo (JSON-LD `@graph`, Metadata API, sitemap, robots)
- Animações com física real (spring dynamics)
- Analytics 4-em-1 sem impacto nos Core Web Vitals
- Tracking dual-firing em 10 pontos de conversão

**Estado atual:**
- ✅ Base arquitetural concluída e White-Label
- ✅ Branding atualizado e consistente em todo o repositório
- ✅ Analytics completo (requer IDs reais nos placeholders)
- ⚠️ `useCountdown` aguardando integração na UI
- ⚠️ Imagens ainda em `.png`
- ⚠️ `InfiniteSlider` e `ProductGallerySlider` prontos mas desativados

As melhorias imediatas são de baixíssimo esforço. A base está pronta para produção e para evoluir em direção a um CMS dinâmico.

---

> Documento v4.0 · Julho 2026
> Projeto: `energia-criativa-web` · Next.js 16.2.10 · React 19.2.4
