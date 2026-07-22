# Energia Criativa — PRD Arquitetural da Landing Page

> **Product Requirements Document (PRD) · System Design · UI/UX · Marketing & Persuasão**  
> Análise técnica completa e imparcial da Landing Page da Energia Criativa Saboaria Botânica.  
> Versão do documento: 2.0 · Julho 2026 — atualizado após refatoração White-Label (second version)

---

## Índice

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Arquitetura de Diretórios — Mapa Completo](#3-arquitetura-de-diretórios--mapa-completo)
4. [Camada de Configuração](#4-camada-de-configuração)
5. [Camada de Design System (`globals.css`)](#5-camada-de-design-system-globalscss)
6. [Camada de Dados — `lib/`](#6-camada-de-dados--lib)
7. [Camada de Hooks — `hooks/`](#7-camada-de-hooks--hooks)
8. [Camada de Roteamento — `app/`](#8-camada-de-roteamento--app)
9. [Camada de Componentes — `components/`](#9-camada-de-componentes--components)
10. [Funil de Conversão — Análise da Jornada do Usuário](#10-funil-de-conversão--análise-da-jornada-do-usuário)
11. [Análise de UI/UX](#11-análise-de-uiux)
12. [Análise de Marketing e Persuasão](#12-análise-de-marketing-e-persuasão)
13. [Análise de Performance e SEO](#13-análise-de-performance-e-seo)
14. [Análise de Tracking e Analytics](#14-análise-de-tracking-e-analytics)
15. [Arquitetura White-Label — Como Reutilizar](#15-arquitetura-white-label--como-reutilizar)
16. [Pontos Fortes — O que está bem](#16-pontos-fortes--o-que-está-bem)
17. [Oportunidades de Melhoria — O que pode evoluir](#17-oportunidades-de-melhoria--o-que-pode-evoluir)
18. [Roadmap de Melhorias Priorizadas](#18-roadmap-de-melhorias-priorizadas)
19. [Changelog de Implementações](#19-changelog-de-implementações)
20. [Conclusão Geral](#20-conclusão-geral)

---

## 1. Visão Geral do Produto

**Energia Criativa Saboaria Botânica** é uma marca de sabonetes artesanais premium produzidos pelo método *Cold Process*. A landing page serve como **único canal digital de aquisição**, com foco em:

- Apresentar o produto com posicionamento de luxo acessível
- Educar o visitante sobre diferenciação (glicerina natural, óleos essenciais, cura artesanal)
- Converter o tráfego diretamente para o **WhatsApp** (canal de venda)
- Construir confiança via prova social e storytelling da artesã Kelly

A LP não possui e-commerce interno — o CTA primário é sempre um link `wa.me` que abre uma conversa pré-formatada no WhatsApp, onde a venda é finalizada de forma assistida.

> **Nota sobre a marca:** O repositório foi originalmente criado como "Herboria Saboaria Botânica" e evoluiu para "Energia Criativa Saboaria Botânica". O código foi completamente atualizado para refletir a nova identidade (`content.ts`, `layout.tsx`, JSON-LD), mas o nome do repositório (`herboria-lp-next`) permanece por histórico de versionamento. O `package.json` registra `"name": "herboria-web"`.

---

## 2. Stack Tecnológico

| Categoria | Tecnologia | Versão | Função |
|---|---|---|---|
| Framework | **Next.js** | 16.2.10 | SSR/SSG, App Router, otimização de imagens |
| UI | **React** | 19.2.4 | Renderização de componentes |
| Linguagem | **TypeScript** | ^5 | Tipagem estática, `as const`, `Readonly` |
| Estilização | **Tailwind CSS** | ^4 | Utilitários CSS, design tokens via CSS vars |
| Animação | **Framer Motion** | ^12 | Micro-animações, `useInView`, `useScroll`, `AnimatePresence` |
| Carousel | **Embla Carousel** (via shadcn) | ^8 | Carrosséis nativos — `TestimonialSection` |
| Ícones | SVG inline customizado | — | `BotanicalEmblem`, `WhatsAppIcon`, `StarIcon` |
| Fontes | **Google Fonts via next/font** | — | Inter (body), Cormorant Garamond (headings) |
| UI Primitivos | **shadcn** + **@base-ui/react** | — | `carousel.tsx`, `button.tsx`, primitivos de UI |
| Analytics (Meta) | **Meta Pixel (Facebook)** | — | PageView + 10 eventos de conversão (customizados + padrão) |
| Analytics (Google) | **@next/third-parties/google** | ^16.2.10 | GA4 assíncrono, sem impacto nos Core Web Vitals |
| Analytics (Vercel) | **@vercel/analytics** | ^2.0.1 | Análise comportamental nativa da Vercel |
| Performance | **@vercel/speed-insights** | ^2.0.0 | Monitoramento de Core Web Vitals em produção |
| Analytics (Sessão) | **Microsoft Clarity** | — | Heatmaps e gravação de sessão (via Script inline) |
| Deploy | Vercel (inferido) | — | Edge Network, Brotli, AVIF |

> **Nota Swiper removido**: Swiper.js foi totalmente removido do projeto e substituído pelo shadcn Carousel (Embla). O `ProductGallerySlider.tsx` ainda usa Embla diretamente mas não está incluso no `page.tsx`.

### Decisões Arquiteturais Relevantes

- **App Router do Next.js 16** com divisão clara entre Server Components (layout, metadata) e Client Components (`"use client"` onde há hooks/animações).
- **Importações estáticas** para todas as seções — não há mais `dynamic()` imports. Essa mudança simplifica o bundle e elimina o overhead de resolução lazy sem prejudicar o LCP, pois o layout base é CSS-driven.
- **`next/font`** elimina CLS (Cumulative Layout Shift) ao pré-carregar fontes com `display: swap`.
- **Metadata API nativa** do Next.js para SEO declarativo (sem `react-helmet`).
- **CSS Custom Properties** como fonte única de verdade para o Design System, consumidas pelo Tailwind 4 via `@theme inline`.
- **Arquitetura White-Label**: `brand.ts` + `BackgroundEffect` + `BrandLogo` permitem trocar toda a identidade visual de uma LP sem alterar nenhum componente estrutural.

---

## 3. Arquitetura de Diretórios — Mapa Completo

```
herboria-lp-next/
│
├── public/                          # Assets estáticos servidos na raiz "/"
│   ├── hero-composition.png         # Imagem principal do Hero (coleção completa)
│   ├── kit-serenidade.png           # Produto: Kit Serenidade
│   ├── kit-vitalidade.png           # Produto: Kit Vitalidade
│   ├── kit-purificacao.png          # Produto: Kit Purificação
│   ├── benefits-soap.png            # Imagem da seção Benefits
│   ├── artisan_portrait.png         # Foto da artesã Kelly (seção About)
│   ├── gallery-lavender.png         # Galeria: sabonete lavanda
│   ├── gallery-rosemary.png         # Galeria: sabonete alecrim
│   ├── gallery-charcoal.png         # Galeria: sabonete carvão
│   ├── gallery-rose.png             # Galeria: sabonete rosa
│   └── images/                      # Avatares locais dos depoimentos
│       ├── avatar1.jpg
│       ├── avatar2.jpg
│       └── avatar3.jpg
│
├── src/
│   ├── app/                         # ── CAMADA DE ROTEAMENTO (Next.js App Router) ──
│   │   ├── layout.tsx               # RootLayout: fontes, metadata, JSON-LD, providers, analytics
│   │   ├── page.tsx                 # Home page: orquestra a ordem das seções da LP
│   │   ├── globals.css              # Design System: tokens de cor, tipografia, keyframes
│   │   ├── icon.svg                 # Favicon da aba do browser
│   │   ├── robots.ts                # Configuração de robots.txt para crawlers
│   │   └── sitemap.ts               # Sitemap XML gerado dinamicamente
│   │
│   ├── components/                  # ── CAMADA DE APRESENTAÇÃO (UI) ──
│   │   │
│   │   ├── ui/                      # Sub-camada: Componentes atômicos reutilizáveis
│   │   │   ├── Icons.tsx            # SVG inline: BotanicalEmblem, WhatsApp, Star, Instagram, Facebook
│   │   │   ├── BrandLogo.tsx        # ★ NOVO: Logo genérico controlado por brand.ts (emblem/image/text)
│   │   │   ├── SectionHeader.tsx    # Cabeçalho padronizado de seção (tag + h2 + subtitle)
│   │   │   ├── button.tsx           # Variantes de botão via class-variance-authority
│   │   │   └── carousel.tsx         # Primitivos Embla (CarouselContent, CarouselItem, etc.)
│   │   │
│   │   ├── Header.tsx               # Navbar com hide-on-scroll, glassmorphism ao rolar, CTA WhatsApp
│   │   ├── AnimatedHeroContent.tsx  # Lado esquerdo do Hero: eyebrow, h1, descrição, CTA primário
│   │   ├── HeroImages.tsx           # Lado direito do Hero: imagem do produto, badges flutuantes
│   │   ├── BackgroundEffect.tsx     # ★ NOVO: Efeito decorativo genérico (blob/glow/grid/none)
│   │   ├── FluidBlob.tsx            # Blob legado (ainda usado internamente) — não exposto na API pública
│   │   ├── BenefitsSection.tsx      # Seção "Por que Energia Criativa?": imagem + parágrafos com parallax
│   │   ├── CollectionsSection.tsx   # Grid de kits com modal de detalhes (drag-to-close no mobile)
│   │   ├── ProductGallerySlider.tsx # Carrossel Embla da linha de produtos (não incluso no page.tsx)
│   │   ├── InfiniteSlider.tsx       # Ticker infinito de atributos da marca (não incluso no page.tsx)
│   │   ├── AboutSection.tsx         # Storytelling da artesã Kelly com reveal de imagem e parallax
│   │   ├── GreenCtaSection.tsx      # Seção verde de urgência: copy + bento grid de imagens + CTA
│   │   ├── TestimonialSection.tsx   # Carrossel shadcn/Embla de depoimentos com navegação manual
│   │   ├── FaqSection.tsx           # Accordion de perguntas frequentes com AnimatePresence
│   │   ├── Footer.tsx               # Rodapé: branding, redes sociais, CTA final, copyright
│   │   ├── FacebookPixel.tsx        # Injeção do Meta Pixel via next/script (afterInteractive)
│   │   ├── FloatingWhatsApp.tsx     # Botão flutuante fixo de WhatsApp (bottom-right)
│   │   └── Providers.tsx            # Wrapper de contextos React (extensível futuramente)
│   │
│   ├── hooks/                       # ── CAMADA DE HOOKS CUSTOMIZADOS ── ★ NOVA PASTA
│   │   └── useCountdown.ts          # Hook de contador regressivo com persistência via localStorage
│   │
│   └── lib/                         # ── CAMADA DE LÓGICA E DADOS ──
│       ├── content.ts               # Dicionário central de todo o conteúdo (Single Source of Truth)
│       ├── brand.ts                 # ★ NOVO: Configuração visual da marca (White-Label)
│       ├── animations.ts            # Variantes Framer Motion reutilizáveis (fadeUp, stagger, etc.)
│       ├── utils.ts                 # Função `cn()`: composição segura de classes Tailwind
│       └── tracking.ts              # Sistema completo Meta Pixel (PIXEL_EVENTS + helpers semânticos)
│
├── AGENTS.md                        # Regras para agentes de IA (aviso sobre Next.js 16)
├── CLAUDE.md                        # Instrução mínima para Claude
├── CUSTOM_CMS_ARCHITECTURE.md       # Roadmap técnico: como evoluir para CMS próprio
├── LP_TEMPLATE_GUIDE.md             # Guia rápido: como criar uma nova LP a partir deste template
├── next.config.ts                   # Config Next.js: imagens AVIF/WebP, headers de segurança, compressão
├── tsconfig.json                    # Configuração TypeScript com path alias "@/"
├── components.json                  # Configuração do shadcn/ui
├── eslint.config.mjs                # Regras ESLint
├── postcss.config.mjs               # PostCSS para Tailwind 4
└── package.json                     # Dependências e scripts npm
```

---

## 4. Camada de Configuração

### `next.config.ts`
Gerencia três pilares de performance:

1. **Imagens**: `formats: ['image/avif', 'image/webp']` — Next.js serve automaticamente o formato mais eficiente suportado pelo browser. `deviceSizes` e `imageSizes` configurados explicitamente para gerar srcsets otimizados.
2. **Headers HTTP de segurança**: `X-Content-Type-Options`, `X-Frame-Options` (SAMEORIGIN), `Referrer-Policy` aplicados a todas as rotas.
3. **Cache de assets estáticos**: `Cache-Control: public, max-age=31536000, immutable` para `.png`, `.jpg`, `.webp`, `.avif`, `.svg`, `.woff2`.

> **Mudança v2**: A whitelist de domínio `images.unsplash.com` foi removida — os avatares dos depoimentos agora são servidos localmente de `/public/images/`.

### `tsconfig.json`
Define o alias `@/` apontando para `./src/`, permitindo imports absolutos e eliminando caminhos relativos frágeis.

### `components.json`
Integração com o shadcn/ui, definindo diretório de destino dos componentes UI gerados pelo CLI.

---

## 5. Camada de Design System (`globals.css`)

O sistema de design é inteiramente construído via **CSS Custom Properties** (variáveis CSS nativas), consumidas pelo Tailwind 4 através da diretiva `@theme inline`.

### Paleta de Cores

| Token | Valor | Função Semântica |
|---|---|---|
| `--primary` | `#6B7C3F` | Verde oliva/musgo — cor da marca, CTAs, destaques |
| `--primary-dark` | `#2D3B1F` | Footer, fundos escuros |
| `--primary-light` | `#8A9A5B` | Highlights sutis |
| `--background` | `#F7F2E8` | Creme quente — fundo geral da LP |
| `--foreground` | `#1C2011` | Quase preto esverdeado — texto principal |
| `--accent` | `#C8A97A` | Dourado terroso — detalhes de luxo |
| `--muted-foreground` | `#706852` | Texto secundário, legendas |
| `--border` | `#DDD6C5` | Bordas sutis |
| `--secondary` | `#EDE7D8` | Superfícies secundárias, cards, seções alternadas |
| `--radius` | `0.625rem` | Border radius base — escalonado por `--radius-sm` a `--radius-4xl` |

> **Decisão de design**: A paleta é exclusivamente analógica (verde + creme + dourado), evitando tons genéricos. Isso posiciona a marca no espectro "orgânico, premium, natural" sem clichês.

### Tipografia

| Variável | Fonte | Aplicação |
|---|---|---|
| `--font-sans` (`font-sans`) | **Inter** | Corpo de texto, labels, CTAs, navegação |
| `--font-heading` (`font-heading`) | **Cormorant Garamond** | H1, H2, títulos de seção, citações |

As fontes são configuradas em `brand.ts` (`BRAND_FONTS`) e carregadas em `layout.tsx` via `next/font`. Para trocar a tipografia da LP, edita-se apenas `brand.ts`.

### Importações CSS

```css
@import "tailwindcss";
@import "tw-animate-css";   /* animações utilitárias extras */
@import "shadcn/tailwind.css"; /* tokens base do shadcn */
```

### Animações Globais (`@keyframes`)
- `morph-right` / `morph-left`: animam os `border-radius` dos blobs fluidos via CSS puro, sem overhead de JavaScript.

### Dark Mode
Token set completo para `.dark` definido via `@custom-variant dark (&:is(.dark *))`. O toggle de tema não está exposto na UI — modo escuro passivo. O sistema está preparado (via `next-themes`), mas inativo.

---

## 6. Camada de Dados — `lib/`

### `content.ts` — Single Source of Truth

Este é o pilar arquitetural central. Todo o conteúdo textual, imagens, URLs e dados estruturais vivem em um único objeto `TEXTS` exportado com `as const`.

**Por que isso importa:**
- Permite atualizar qualquer copy, preço ou URL em **um único lugar** sem caçar strings pela codebase
- TypeScript com `as const` infere tipos literais estreitos, prevenindo erros em tempo de compilação
- Facilita A/B tests futuros (basta trocar a string no `content.ts`)
- Isola lógica de dados da lógica de apresentação (separação de responsabilidades)

> **Mudança v2**: O conteúdo foi completamente reescrito para a marca **Energia Criativa**. Todos os textos, o nome da marca, URLs, redes sociais e WhatsApp foram atualizados. As imagens agora possuem `blurDataURL` embutido para placeholder de carregamento.

**Estrutura dos namespaces:**

```
TEXTS.SITE         → name, tagline, url, phone, instagram, facebook, whatsappBase/General
TEXTS.IMAGES       → Paths + blurDataURL de todas as imagens (evita magic strings)
TEXTS.NAV_LINKS    → Links de navegação (href + label)
TEXTS.HERO         → Copy do Hero: eyebrow, title, description, CTA, produtos (array[4])
TEXTS.TRUST        → Trust bar: 3 indicadores de credibilidade
TEXTS.BENEFITS     → Seção de benefícios: textos, imagem, badge, CTA
TEXTS.GALLERY      → 5 itens da galeria de produtos (id, título, subtítulo, img, desc)
TEXTS.KITS         → 3 produtos/kits: nome, preço, descrição, benefícios, link WhatsApp
TEXTS.CTA_SECTION  → Seção de urgência verde: copy + 3 stats
TEXTS.ARTISAN      → Storytelling da artesã Kelly: 2 parágrafos + imagem
TEXTS.TESTIMONIALS → 3 depoimentos: quote, nome, tag, avatar (local)
TEXTS.FAQ          → 5 perguntas frequentes: question + answer
TEXTS.FOOTER       → CTA final, links (Produtos/Empresa/Contato), copyright, tagline
```

### `brand.ts` — Configuração White-Label ★ NOVO

Arquivo central de identidade visual. Permite trocar toda a aparência da LP sem tocar em componentes estruturais. É a única interface pública do sistema White-Label.

```typescript
BRAND_FONTS     → { sans: "Inter", heading: "Cormorant Garamond" }
BRAND_LOGO      → { type: "emblem" | "image" | "text", imageSrc, imageWidth, imageHeight }
BRAND_BG_EFFECT → { variant: "blob" | "glow" | "grid" | "none", colorStart, colorEnd, opacity }
BRAND_RADIUS    → { preset: "sharp" | "subtle" | "balanced" | "rounded" | "pill" }
RADIUS_MAP      → Mapa preset → valor rem ("balanced" → "0.625rem")
```

**Como trocar uma LP:**
1. Clone o repositório
2. Edite `brand.ts` para ajustar identidade visual
3. Edite `content.ts` para ajustar textos, preços, imagens
4. Troque os assets em `public/` pelas imagens da nova marca
5. Configure `NEXT_PUBLIC_META_PIXEL_ID` no `.env.local`

### `animations.ts` — Biblioteca de Variantes

Centraliza todas as variantes do Framer Motion, garantindo consistência de movimento em toda a LP.

**Dois princípios:**
1. **GPU composited only**: todas as animações usam exclusivamente `opacity`, `transform` (x, y, scale) — nunca `width`, `height`, `top`, `left`.
2. **Durações curtas** (≤ 0.45s): mantém percepção de rapidez.

| Variante | Uso |
|---|---|
| `staggerContainer(n)` | Container que aplica delay em cascata nos filhos |
| `fadeUp` | Entrada padrão de seções (spring: stiffness 360, damping 30) |
| `fadeUpDelayed(n)` | Entrada com delay customizável |
| `fadeLeft` | Entrada vindo da direita (spring: stiffness 320, damping 28) |
| `fadeRight` | Entrada vindo da esquerda |
| `scaleIn` | Para cards e badges |
| `productSwap` | Transição de produto no Hero |
| `accordionContent` | Expansão do FAQ (height: 0 → auto, 0.28s) |
| `cardFlip` | Animação de troca nos testimonials |
| `IN_VIEW_OPTIONS` | `{ once: true, amount: 0.25 }` — config padrão do `useInView` |

### `utils.ts` — `cn()` helper

Implementação padrão do ecosistema Tailwind + shadcn: `clsx` + `tailwind-merge` para composição de classes sem conflitos de especificidade.

### `tracking.ts` — Sistema Completo Meta Pixel

Sistema de rastreamento totalmente refatorado em v2. Arquitetura em três camadas:

| Camada | Descrição |
|---|---|
| `PIXEL_EVENTS` | Dicionário imutável (`as const`) com 10 nomes de evento. Zero magic strings nos componentes |
| `fbqEvent()` | Dispara evento customizado (`trackCustom`) — análise granular no painel Meta |
| `fbqStandard()` | Dispara evento padrão Meta (`track`) — alimenta otimização de campanhas diretamente |
| Helpers semânticos | Um por ponto de conversão. Cada helper faz **dual-firing**: customizado + padrão simultaneamente |

Eventos disponíveis em `PIXEL_EVENTS`:
- `HERO_CTA_CLICK`, `BENEFITS_CTA_CLICK`, `GREEN_CTA_CLICK`, `HEADER_CTA_CLICK`
- `FLOATING_WA_CLICK`, `FOOTER_CTA_CLICK`
- `KIT_MODAL_OPEN`, `KIT_BUY_CLICK`
- `FAQ_EXPAND`, `SCROLL_TO_FOOTER` ← **novo** (detecta usuários que leram a LP inteira)

---

## 7. Camada de Hooks — `hooks/`

### `useCountdown.ts` — Hook de Urgência

Hook customizado para gerar escassez temporal baseada em `localStorage`. Persiste o prazo entre recarregamentos (não reseta ao atualizar a página).

```typescript
export function useCountdown(hoursToAdd: number = 24)
// Retorna: { hours, minutes, seconds } | null (null durante SSR)
```

**Comportamento:**
1. Na primeira visita: cria um deadline `N horas` à frente e salva no `localStorage`
2. Em visitas subsequentes: lê o deadline existente (não reseta)
3. Ao expirar: cria um novo deadline automaticamente
4. Durante SSR: retorna `null` (guard seguro para Next.js)

> **Nota**: O hook está implementado e disponível, mas atualmente não está sendo consumido por nenhuma seção no `page.tsx`. Estava previsto para uso na `GreenCtaSection` como flip-clock visual de urgência.

---

## 8. Camada de Roteamento — `app/`

### `layout.tsx` — RootLayout (Server Component)

Wrapper universal da aplicação. Por ser Server Component, não gera JavaScript no cliente. Responsabilidades em v2:

1. **Fontes**: `next/font` pré-carrega Inter e Cormorant Garamond com `display: swap`, eliminando FOIT/FOUT e CLS.
2. **SEO Metadata API**: title template, description, keywords, OpenGraph (og:image, og:title), Twitter Card, canonical URL, robots, authors, category, Google Search Console verification.
3. **JSON-LD Structured Data**: schema `LocalBusiness` (com aggregateRating de 4.8/3350 reviews) + `WebSite` — ambos com `@id` para conexão semântica entre grafos.
4. **`<link rel="preconnect">`**: para `connect.facebook.net` (carregamento antecipado do Pixel).
5. **Analytics**: 4 plataformas configuradas simultaneamente:
   - `<FacebookPixel />` — Meta Pixel
   - `<GoogleAnalytics gaId="G-ABC123XYZ" />` — GA4 via `@next/third-parties`
   - `<Analytics />` — Vercel Analytics
   - `<SpeedInsights />` — Vercel Speed Insights
   - `<Script>` Microsoft Clarity — heatmaps e gravação de sessão

> **Mudança v2**: Os metadados foram completamente atualizados para a marca **Energia Criativa**. Vercel Analytics, Speed Insights e Microsoft Clarity são novidades desta versão.

### `page.tsx` — Home Page (Client Component)

Orquestrador da LP. Contém dois componentes locais inline:

- **`Stars()`**: 5 estrelas SVG via `Array.from({ length: 5 })`.
- **`TrustBar()`**: barra de 3 indicadores de credibilidade com spring animation ao entrar na viewport.

**Mudança v2 — Sem dynamic imports:**
```
Todas as seções são importadas estaticamente:
  → Header, AnimatedHeroContent, HeroImages, BenefitsSection, FluidBlob,
    CollectionsSection, AboutSection, TestimonialSection, GreenCtaSection,
    FaqSection, Footer
```

> A remoção dos `dynamic()` imports simplifica o bundle e garante que nenhuma seção cria um "salto" de layout ao ser carregada. O overhead de JS extra é compensado pelo melhor LCP percebido.

**Ordem das seções na LP (funil de conversão):**

```
1. Skip link acessibilidade  → "#main-content"
2. Header                    → Navegação + CTA de saída rápida
3. Noise overlay             → Textura fractalNoise (opacity 0.022, z-50 fixed)
4. Hero                      → Hook emocional + CTA primário
5. TrustBar                  → Credibilidade imediata (45 dias / 3x mais / 100%)
6. Benefits                  → Educação + diferenciação
7. Collections               → Produtos + oferta
8. About                     → Humanização + storytelling
9. GreenCtaSection           → Urgência + reforço de conversão
10. Testimonials             → Prova social
11. FAQ                      → Eliminação de objeções
12. Footer                   → CTA final + encerramento
```

**Hero e TrustBar agrupados em `lg:min-h-[100dvh]`**: no desktop, o Hero + Trust Bar ocupam 100% da viewport com `snap-start`, garantindo que o primeiro "full screen" seja o mais impactante visualmente.

### Rotas auxiliares
- `robots.ts` → gera `robots.txt` dinamicamente (Next.js Metadata API)
- `sitemap.ts` → gera `sitemap.xml` dinamicamente (melhora indexação no Google)
- `icon.svg` → favicon SVG vetorial

---

## 9. Camada de Componentes — `components/`

### Componentes Atômicos — `ui/`

#### `BrandLogo.tsx` ★ NOVO

Componente genérico de logo controlado por `brand.ts`. Desacopla completamente o logo do `Header` e `Footer`, permitindo troca de identidade visual sem alterar esses componentes.

**Modos:**
- `"emblem"`: Exibe o `BotanicalEmblem` SVG (inline, sem dependência externa)
- `"image"`: Exibe `next/image` com `src` de `BRAND_LOGO.imageSrc`
- `"text"`: Exibe apenas `TEXTS.SITE.name` em fonte heading

Props: `className`, `iconClassName`, `hideText`, `light` (inversão de cor para fundos escuros).

#### `carousel.tsx` ★ NOVO (via shadcn)

Primitivos Embla Carousel para o shadcn: `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`, `CarouselApi`. Base para o `TestimonialSection`.

#### `Icons.tsx`

SVGs inline customizados: `BotanicalEmblem`, `WhatsAppIcon`, `StarIcon`, `InstagramIcon`, `FacebookIcon`.

#### `SectionHeader.tsx`

Cabeçalho padronizado de seção. Recebe: `tag`, `title`, `titleAccent` (em verde), `subtitle`, `center`, `light`. Garante consistência visual entre todas as seções.

#### `button.tsx`

Variantes de botão via `class-variance-authority` (disponível para uso em iterações futuras).

---

### Componentes de Seção

#### `Header.tsx`
**Tipo**: Client Component  
**Comportamento**:
- Inicia **transparente** (posição `absolute` para sobrepor o hero)
- Ao rolar > 50px: aplica `glassmorphism` (`bg-background/90 backdrop-blur-md shadow-sm`)
- **Hide on scroll down / show on scroll up**: libera espaço vertical durante a leitura
- CTA WhatsApp sempre visível no desktop
- Usa `BrandLogo` para renderizar o logo (genérico, controlado por `brand.ts`)
- Smooth scroll via `element.scrollIntoView({ behavior: 'smooth', block: 'center' })`

**Decisão de design**: No mobile, não há menu hambúrguer — links de navegação ficam ocultos (`hidden lg:flex`). Decisão de CRO intencional: tunneling para CTA único.

---

#### `AnimatedHeroContent.tsx`
**Tipo**: Client Component  
**Função**: Parte esquerda do grid do Hero — copy principal.

Copy estruturado em camadas persuasivas:
1. **Eyebrow**: "Cultivando o bem-estar com"
2. **H1**: "ENERGIA CRIATIVA" em Cormorant Garamond com `clamp(2.5rem, 8vw, 6.5rem)`
3. **Descrição**: proposta de valor + diferenciação
4. **CTA**: "Receber Catálogo" com ícone WhatsApp animado no hover

---

#### `HeroImages.tsx`
**Tipo**: Client Component  
**Função**: Parte direita do grid do Hero — visual do produto.

Exibe `TEXTS.HERO.products[2]` (Kit Vitalidade) com `placeholder="blur"` e `blurDataURL` do `content.ts`. **Mudança v2**: a imagem agora tem blur placeholder, eliminando o salto visual em conexões lentas.

**Micro-conversão (badges flutuantes):**
- Badge inferior: "Alecrim & Capim Limão" com glassmorphism
- Badge superior: 5 estrelas + mini-depoimento de "Camila D."

---

#### `BackgroundEffect.tsx` ★ NOVO
**Tipo**: Client Component (decorativo)  
**Função**: Substitui o `FluidBlob` hardcoded como efeito de fundo genérico e configurável.

O variant é controlado por `BRAND_BG_EFFECT.variant` em `brand.ts`:

| Variant | Descrição | Melhor para |
|---|---|---|
| `"blob"` | Forma orgânica SVG com gradiente + parallax scroll | Botânica, beleza, wellness |
| `"glow"` | Borrão difuso de luz (radial-gradient + blur 48px) + parallax | SaaS premium, tech |
| `"grid"` | Malha de pontos circulares estática (SVG pattern) | Fintech, corporativo |
| `"none"` | Sem efeito | Minimalista, editorial |

Props com override por instância: `variant`, `colorStart`, `colorEnd`, `opacity`, `side`, `id`, `className`.

Usado em:
- **Hero** (`side="hero"`): blob creme à direita
- **GreenCtaSection** (`side="right"`): blob branco transparente sobre fundo verde

---

#### `BenefitsSection.tsx`
**Tipo**: Client Component  
**Função**: Educação sobre diferenciação. Imagem (esquerda) + texto (direita) com parallax scroll.

**Técnicas de persuasão:**
- Agitação do problema: "Chega de pele ressecada após o banho"
- Antagonista (indústria): "a mesma que indústrias removem para vender separado"
- Autoridade técnica: "sistema límbico", "óleos terapêuticos certificados"
- Parallax na imagem via `useScroll/useTransform`

---

#### `CollectionsSection.tsx`
**Tipo**: Client Component  
**Função**: Apresentação e venda dos 3 kits. Componente mais complexo da LP.

**Modal de detalhes (implementação nativa, sem lib):**
- Entrada com spring animation `{ y: "100%" → 0 }`
- `drag="y"` com `dragElastic={0.2}` → gesto de arrastar para fechar (padrão iOS)
- `onDragEnd` com threshold de 100px
- Overlay `onClick` para fechar
- `document.body.style.overflow = "hidden"` durante modal aberto

**Dois CTAs por card:**
1. **"Pedir Kit"** → `<a>` direto para WhatsApp com mensagem pré-formatada
2. **"Ver Detalhes"** → abre modal com descrição completa, benefícios e preço

---

#### `GreenCtaSection.tsx`
**Tipo**: Client Component  
**Função**: Seção de urgência — única com fundo `var(--primary)`.

**Mudança v2**: Usa `BackgroundEffect` (genérico) em vez do `FluidBlob` hardcoded.

**Técnicas de urgência:**
- Escassez real: "produção limitada a pequenos lotes artesanais"
- Prova de processo: "curada por mais de 5 semanas em temperatura controlada"
- Bento grid: 3 fotos de produto (`TEXTS.GALLERY.items[0..2]`) com blur placeholder
- Shimmer no botão CTA: gradiente animado `x: "-100%" → "200%"` em loop (repeatDelay: 3.5s)

---

#### `TestimonialSection.tsx`
**Tipo**: Client Component  
**Função**: Prova social.

**Mudança v2**: Usa shadcn `Carousel` (Embla) em vez de Swiper. Itens duplicados para loop (`[...items, ...items]`). Controles de navegação no mobile (setas circulares) + setas externas no desktop + dots de paginação interativos com `api.scrollTo(i)`.

Avatares agora servidos localmente (`/images/avatar1.jpg`, etc.) — sem dependência de CDN externo.

---

#### `AboutSection.tsx`
**Tipo**: Client Component  
**Função**: Storytelling da fundadora Kelly.

**Técnica de storytelling (Jornada do Herói):**
1. Origem relatable: "pele extremamente sensível da minha filha"
2. Transformação: "necessidade na cozinha → paixão profunda"
3. Filosofia: "o banho não deve ser apenas uma etapa mecânica"

Efeito reveal de imagem: cortina branca animada (`x: "0%" → "100%"`) revela a foto suavemente.

---

#### `FaqSection.tsx`
**Tipo**: Client Component  
**Função**: Eliminação de objeções finais. Accordion com `AnimatePresence` + variante `accordionContent`.

**Mapeamento de objeções por pergunta:**

| Pergunta | Objeção eliminada |
|---|---|
| "O que é Cold Process?" | "Não sei se é realmente especial" |
| "Tem perfume/corante artificial?" | "Tenho medo de reação" |
| "Como comprar pelo WhatsApp?" | "O processo parece complicado" |
| "Kits para eventos?" | "Preciso de quantidade, não atenderão" |
| "Quanto tempo dura?" | "É caro demais pelo tamanho" |

---

#### `Footer.tsx`
**Tipo**: Client Component  
**Função**: Encerramento e CTA final. Fundo `var(--primary)` — "bookend" verde com a GreenCtaSection.

Links do rodapé apontam para âncoras internas (`#colecoes`, `#beneficios`, `#faq`, etc.) — todos funcionais.

Rastreia `ScrollToFooter` + evento padrão `Lead` no Meta Pixel para detectar usuários de alto engajamento.

---

#### `FacebookPixel.tsx`
Carrega o script do Meta Pixel com `strategy="afterInteractive"`. Usa `process.env.NEXT_PUBLIC_META_PIXEL_ID` (não exposto no código-fonte). Fallback `<noscript>` incluído.

#### `FloatingWhatsApp.tsx`
Botão fixo `position: fixed, bottom: 6, right: 6`. Spring de entrada após 1s. Verde oficial WhatsApp `#25D366`. Rastreia `FloatingWhatsAppClick` + `Contact` no Meta Pixel.

#### `InfiniteSlider.tsx`
Ticker infinito de atributos da marca. **Não incluso no `page.tsx`** — disponível para ativação.

#### `ProductGallerySlider.tsx`
Carrossel Embla da linha de produtos. **Não incluso no `page.tsx`** — disponível para iterações futuras.

---

## 10. Funil de Conversão — Análise da Jornada do Usuário

```
TOPO DO FUNIL — Atenção
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  HERO (snap-start, 100dvh com TrustBar)
  ├── Hook visual: produto premium em evidência (blur placeholder)
  ├── Proposta de valor clara: "ritual de aromaterapia"
  ├── CTA primário imediato: "Receber Catálogo" (WhatsApp)
  └── Social proof flutuante: mini-depoimento + 5 estrelas

  TRUST BAR
  ├── "45 Dias" de maturação artesanal (processo único)
  ├── "3x Mais" duradouro (ROI vs concorrente)
  └── "100%" puro (segurança/saúde)

MEIO DO FUNIL — Interesse e Consideração
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BENEFITS
  ├── Educação: glicerina natural preservada
  ├── Experiência sensorial: aromaterapia no chuveiro
  └── CTA secundário: "Receber Catálogo"

  COLLECTIONS
  ├── 3 kits com foto (blur placeholder), descrição e preço
  ├── Modal de detalhes com benefícios específicos + drag-to-close
  ├── CTA duplo por kit: compra direta + ver detalhes
  └── Tag "Mais Vendido" no Kit Serenidade

  ABOUT (Humanização)
  ├── Origem da marca (história real da Kelly)
  ├── Filosofia da fundadora (conexão emocional)
  └── Efeito reveal de imagem

FUNDO DO FUNIL — Decisão
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  GREEN CTA SECTION
  ├── Contraste visual radical (fundo verde, "ruptura de scroll")
  ├── BackgroundEffect genérico (branco transparente)
  ├── Urgência por escassez real (produção artesanal limitada)
  ├── Bento grid de 3 fotos com blur placeholder
  └── CTA com shimmer animation (atenção visual não-agressiva)

  TESTIMONIALS (Carrossel shadcn/Embla)
  ├── 6 cards visíveis (3 depoimentos × 2 — loop)
  ├── Avatares locais (sem CDN externo)
  ├── Navegação: setas externas + dots interativos + setas mobile
  └── Validação por pares (clientes "como eu")

  FAQ (Accordion AnimatePresence)
  └── 5 objeções eliminadas estrategicamente

  FOOTER
  └── CTA final + link WhatsApp + rastreamento ScrollToFooter
```

**Pontos de saída com CTA WhatsApp mapeados:**
1. Header CTA → sempre visível (desktop)
2. Hero CTA (principal)
3. Benefits CTA
4. Kit cards — "Pedir Kit" (3 botões individuais)
5. Modal dos kits
6. GreenCtaSection CTA
7. Footer CTA
8. FloatingWhatsApp (fixo, sempre visível)

**Total: 9+ pontos de contato com o CTA** ao longo da jornada.

---

## 11. Análise de UI/UX

### ✅ Acertos

| Aspecto | Avaliação |
|---|---|
| Hierarquia visual | Clara. H1 massivo, H2 de seção, corpo pequeno |
| Contraste de cores | `#6B7C3F` sobre branco: ratio ~4.5:1 (WCAG AA) |
| Espaçamento de seções | Generoso (`py-20 lg:py-32`). Respira, não sufoca |
| Feedback de hover | Consistente: `hover:-translate-y-0.5`, `hover:shadow-xl`, `active:scale-[0.98]` |
| Microanimações | Spring physics calibradas (stiffness/damping reais) |
| Responsive | 1 col mobile → 2 cols tablet → grid específico desktop |
| Acessibilidade básica | `aria-label`, `aria-hidden`, `role="banner"`, `role="dialog"`, `aria-expanded`, skip link |
| Glassmorphism | Bem aplicado: badges flutuantes do Hero + Header ao rolar |
| Noise texture | SVG fractalNoise `opacity: 0.022` — profundidade analógica premium |
| Snap scroll | `snap-y snap-proximity` no `<html>`, `snap-start` por seção — experiência fluida |
| Blur placeholders | `blurDataURL` em todas as imagens — sem salto visual em conexões lentas |
| Funil de conversão | Ordem lógica e ortodoxa: Atenção → Interesse → Desejo → Ação |

### ⚠️ Problemas Identificados

#### P1 — Mobile sem navegação — Decisão de CRO consciente
Em LPs com foco em único CTA, a ausência de menu mobile é um feature intencional de *tunneling*. A literatura de CRO confirma: navegação extra cria desvio de atenção. O FloatingWhatsApp fixo (`#25D366`) cobre toda a necessidade de ação mobile.

#### P2 — `useCountdown` implementado mas não utilizado
O hook está pronto em `hooks/useCountdown.ts` mas não está conectado a nenhuma seção. O flip-clock de urgência que estava planejado para a `GreenCtaSection` foi suprimido, deixando a urgência da seção dependente apenas de copy.

---

## 12. Análise de Marketing e Persuasão

### Framework AIDA — Mapeamento

| Fase | Seções | Score |
|---|---|---|
| **A**tenção | Hero, Noise Texture, BackgroundEffect, Badge de review | ★★★★☆ |
| **I**nteresse | TrustBar, Benefits, InfiniteSlider (ausente) | ★★★☆☆ |
| **D**esejo | Collections, About, GreenCTA, Testimonials | ★★★★★ |
| **A**ção | CTAs múltiplos, FloatingWhatsApp, Modal | ★★★★☆ |

### Gatilhos Mentais Identificados

| Gatilho | Onde aparece | Efetividade |
|---|---|---|
| **Escassez** | "Produção limitada", "lotes esgotam rápido" (GreenCTA) | Alta — escassez real (produção artesanal) |
| **Autoridade** | "Cold Process", "5 semanas de cura", "óleos essenciais terapêuticos" | Alta — linguagem técnica acessível |
| **Prova social** | 3 depoimentos, avatares locais, tags "Cliente verificada" | Média-Alta — avatares locais são mais críveis |
| **Reciprocidade** | "Receber Catálogo" (grátis) como primeiro passo | Alta — baixa barreira, alto valor percebido |
| **Pertencimento** | "Centenas de mulheres", "ritual de autocuidado" | Alta — criação de identidade de grupo |
| **Storytelling** | Seção About com jornada da Kelly | Muito alta — humaniza e cria conexão emocional |
| **Especificidade** | Preços exatos (R$89,90), "45 dias", "3x mais" | Alta — números específicos criam credibilidade |
| **Ancoragem** | Comparação implícita com "sabonetes de mercado" | Alta — reposiciona concorrência como inferior |

### Análise de Copy

**Hero:** "Transforme seu banho em um ritual de aromaterapia" → verbo ativo. CTA "Receber Catálogo" → micro-compromisso (não "Comprar").

**Benefits:** Antagonista (indústria remove a glicerina) cria narrativa hero vs. vilão.

**GreenCTA:** "Pelo WhatsApp você recebe... ajuda personalizada" → remove a responsabilidade da decisão do comprador.

---

## 13. Análise de Performance e SEO

### Performance

| Técnica | Status | Impacto |
|---|---|---|
| `next/image` com AVIF/WebP | ✅ | Alto — compressão automática |
| `priority` nas imagens above fold | ✅ | Alto — elimina LCP penalty |
| `loading="lazy"` nas imagens below fold | ✅ | Médio — reduz data inicial |
| `next/font` com `display: swap` | ✅ | Alto — elimina CLS de fontes |
| `placeholder="blur"` + `blurDataURL` | ✅ **NOVO** | Médio — LCP percebido em conexões lentas |
| `willChange: "transform"` nos animados | ✅ | Médio — GPU compositing hint |
| Compressão gzip/brotli (`compress: true`) | ✅ | Alto — redução de payload |
| Cache assets `max-age=31536000` | ✅ | Alto — zero latência em revisitas |
| `scroll-padding-top: 100px` | ✅ | Médio — evita header sobrepor âncoras |
| `<link rel="preconnect">` Meta/Facebook | ✅ **NOVO** | Baixo-Médio — reduz TTFB do Pixel |
| `snap-y snap-proximity` no `<html>` | ✅ **NOVO** | UX — scroll fluido entre seções |
| Imagens nativas em `.avif` no `public/` | ❌ | Médio — assets ainda em `.png` |
| `useCountdown` integrado no UI | ❌ | UX — hook implementado mas sem uso |

**Estimativa de Core Web Vitals (Vercel):**
- **LCP**: ≤ 2.5s — `priority` no hero + blur placeholder + compressão
- **CLS**: ≈ 0 — `next/font`, imagens com dimensões definidas, blur placeholder
- **INP**: ≤ 200ms — sem processamento pesado no main thread

### SEO

| Item | Status |
|---|---|
| `<title>` único e descritivo (template) | ✅ |
| Meta description < 160 chars | ✅ |
| Keywords relevantes | ✅ |
| Open Graph completo (og:image 1200×630) | ✅ |
| Twitter Card | ✅ |
| Canonical URL | ✅ |
| JSON-LD (LocalBusiness + WebSite) com `@graph` | ✅ |
| `robots.ts` + `sitemap.ts` | ✅ |
| Um único `<h1>` por página | ✅ |
| Hierarquia de headings (h1 → h2 → h3) | ✅ |
| `alt` text em todas as imagens | ✅ |
| `lang="pt-BR"` no `<html>` | ✅ |
| Skip link para acessibilidade | ✅ |
| Google Search Console verification (placeholder) | ⚠️ Requer código real |
| Links internos (âncoras) | ✅ (só desktop no nav) |
| `preload` das fontes críticas | ✅ (via next/font) |

---

## 14. Análise de Tracking e Analytics

### Stack de Analytics Completo (v2)

A v2 implementa **4 plataformas de analytics** simultaneamente, todas carregadas de forma assíncrona:

| Plataforma | Implementação | Dados coletados |
|---|---|---|
| **Meta Pixel** | `<FacebookPixel>` + `strategy="afterInteractive"` | Eventos de conversão, retargeting |
| **Google Analytics 4** | `<GoogleAnalytics>` via `@next/third-parties` | Sessions, comportamento, funil |
| **Vercel Analytics** | `<Analytics>` via `@vercel/analytics/react` | Web vitals, visitantes únicos |
| **Vercel Speed Insights** | `<SpeedInsights>` via `@vercel/speed-insights/next` | Core Web Vitals em produção real |
| **Microsoft Clarity** | `<Script>` inline `strategy="afterInteractive"` | Heatmaps, gravação de sessão |

### Meta Pixel — Eventos Completos

| Componente | Evento Customizado | Evento Padrão Meta | Objetivo |
|---|---|---|---|
| `AnimatedHeroContent` | `HeroCTAClick` | `Contact` | Contato |
| `Header` | `HeaderCTAClick` | `Contact` | Contato |
| `FloatingWhatsApp` | `FloatingWhatsAppClick` | `Contact` | Contato |
| `BenefitsSection` | `BenefitsCTAClick` | `Lead` | Lead |
| `GreenCtaSection` | `GreenCTAClick` | `Lead` | Lead |
| `Footer` | `FooterCTAClick` | `Lead` | Lead |
| `CollectionsSection` (modal) | `KitModalOpen` | `ViewContent` | Visualização |
| `CollectionsSection` (comprar) | `KitBuyClick` | `InitiateCheckout` | Checkout |
| `FaqSection` | `FaqExpand` | — | Engajamento |
| `Footer` (scroll) | `ScrollToFooter` | `Lead` | Lead quente |

**Para ativar o Meta Pixel:** apenas configurar `NEXT_PUBLIC_META_PIXEL_ID` no `.env.local`.

### Configurações Pendentes

```env
# .env.local — configurar antes do deploy
NEXT_PUBLIC_META_PIXEL_ID="SEU_ID_DO_PIXEL"
```

Em `layout.tsx`, substituir os placeholders:
- `gaId="G-ABC123XYZ"` → ID real do GA4
- `"CLARITY_ID_AQUI"` → Project ID do Microsoft Clarity
- `google: "SEU_CODIGO_DE_VERIFICACAO_GSC"` → Código do Search Console

---

## 15. Arquitetura White-Label — Como Reutilizar

Este repositório foi projetado como um **Framework de Landing Pages**. Para criar uma nova LP em qualquer nicho:

### Passo a Passo (5 etapas)

**1. Configure a Identidade Visual** — `src/lib/brand.ts`
```typescript
BRAND_FONTS.sans    = "DM Sans"         // ou qualquer Google Font
BRAND_FONTS.heading = "Space Grotesk"   // ex: para nicho tech/SaaS

BRAND_LOGO.type     = "image"           // ou "emblem" / "text"
BRAND_LOGO.imageSrc = "/logo.svg"       // arquivo em public/

BRAND_BG_EFFECT.variant = "glow"        // blob | glow | grid | none
BRAND_RADIUS.preset     = "rounded"     // sharp | subtle | balanced | rounded | pill
```

**2. Configure a Paleta** — `src/app/globals.css`
```css
--primary:    #0F62FE;   /* Azul corporativo */
--background: #FFFFFF;
--foreground: #161616;
```

**3. Escreva o conteúdo** — `src/lib/content.ts`
- Todo o copy, preços, imagens e CTAs vivem neste arquivo
- Nenhuma string hardcoded nos componentes

**4. Substitua as imagens** — `public/`
- Upload das imagens da nova marca
- Atualize os caminhos em `TEXTS.IMAGES`
- Adicione `blurDataURL` em Base64 para placeholders

**5. Configure o Analytics** — `.env.local`
```env
NEXT_PUBLIC_META_PIXEL_ID="SEU_ID"
```

### Desativando Seções

Abra `src/app/page.tsx` e comente as linhas das seções não necessárias. Nada quebra — os componentes são independentes.

### Para CMS Dinâmico

Consulte `CUSTOM_CMS_ARCHITECTURE.md` para o roadmap técnico completo de evolução para painel admin próprio com banco de dados, storage de imagens e editor de cores dinâmico.

---

## 16. Pontos Fortes — O que está bem

1. **Arquitetura White-Label completa**: `brand.ts` + `BackgroundEffect` + `BrandLogo` permitem reutilização imediata para qualquer nicho.
2. **Arquitetura de dados centralizada**: `content.ts` como Single Source of Truth — decisão madura e escalável.
3. **Design System coerente**: paleta, tipografia e espaçamentos consistentes do header ao footer.
4. **Performance por padrão**: `next/image`, `next/font`, `blurDataURL` em todos os assets.
5. **Animações com física real**: spring dynamics com `stiffness`/`damping` calibrados.
6. **SEO técnico completo**: JSON-LD com `@graph`, metadata API, sitemap, robots, skip link.
7. **Stack de analytics robusto**: 4 plataformas simultâneas (Meta + GA4 + Vercel + Clarity).
8. **Sistema de tracking Meta Pixel**: dual-firing em todos os 10 pontos de CTA.
9. **Modal nativo com drag-to-close**: implementação própria elegante sem dependência de modal lib.
10. **Carousel nativo shadcn/Embla**: sem Swiper, sem dependência externa desnecessária.
11. **Snap scroll por seção**: experiência de navegação fluida e intencional.
12. **Headers HTTP de segurança**: `X-Frame-Options`, `X-Content-Type-Options` em produção.
13. **Componentes reutilizáveis**: `SectionHeader`, `BackgroundEffect`, `BrandLogo`, `Icons`.
14. **`useCountdown` implementado e disponível**: hook pronto para urgência temporal real.

---

## 17. Oportunidades de Melhoria — O que pode evoluir

**M1 — Conectar `useCountdown` na UI**
```
Impacto: Médio (Conversão) | Esforço: Muito Baixo
```
O hook já está implementado em `hooks/useCountdown.ts`. Falta apenas consumi-lo na `GreenCtaSection` com um flip-clock visual. Uma linha de import + JSX do contador.

**M2 — Imagens nativas em formato `.avif`**
```
Impacto: Médio (LCP) | Esforço: Baixo
```
Apesar do `next/image` converter dinamicamente para AVIF/WebP na Vercel, os arquivos-fonte em `public/` ainda são `.png` (~1MB cada). Converter localmente com `squoosh-cli` ou ImageMagick reduz o payload em disco e o tempo de build.

**M3 — Depoimentos em Vídeo ou Áudio**
```
Impacto: Alto (Confiança) | Esforço: Alto (requer conteúdo do cliente)
```
Solução técnica simples: `<video preload="none" poster={...}>` ou embed de Reels via API leve. Faltam apenas as mídias reais da cliente.

**M4 — InfiniteSlider no `page.tsx`**
```
Impacto: Médio (Credibilidade) | Esforço: Muito Baixo
```
O componente `InfiniteSlider.tsx` está pronto. Basta uma linha de import + `<InfiniteSlider />` após o TrustBar. Reforça credenciais (Cold Process, Vegano, Cruelty-Free) de forma não-intrusiva.

**M5 — Google Search Console e Clarity configurados**
```
Impacto: Médio (SEO + Dados) | Esforço: Muito Baixo
```
Substituir os placeholders em `layout.tsx` pelos IDs reais. Habilita monitoramento de indexação e heatmaps imediatamente.

**M6 — A/B Tests de Copy**
```
Impacto: Alto (Conversão) | Esforço: Médio
```
- "Receber Catálogo" vs "Ver os Kits" (CTA)
- "ENERGIA CRIATIVA" vs "Transforme seu Banho" (H1)
- Base arquitetural pronta — `content.ts` permite troca instantânea.

---

## 18. Roadmap de Melhorias Priorizadas

```
Sprint Imediata — Zero Código Novo
────────────────────────────────────────────────
[x] blurDataURL em todas as imagens            ← FEITO em v2
[x] Avatares locais (sem CDN externo)          ← FEITO em v2
[x] BackgroundEffect genérico                  ← FEITO em v2
[x] BrandLogo genérico                         ← FEITO em v2
[x] Analytics completo (GA4 + Clarity)         ← FEITO em v2
[x] snap-scroll por seção                      ← FEITO em v2
[ ] Conectar useCountdown na GreenCtaSection   ← fácil
[ ] Configurar IDs reais (GA4, Clarity, GSC)   ← fácil

Sprint Futura — Conteúdo e Performance
────────────────────────────────────────────────
[ ] Ativar InfiniteSlider no page.tsx
[ ] Converter imagens base (.png → .avif)
[ ] Captar e inserir Depoimentos em Vídeo
[ ] Testes A/B de copy no Hero
[ ] CMS próprio (ver CUSTOM_CMS_ARCHITECTURE.md)
```

---

## 19. Changelog de Implementações

| Versão | Data | Mudanças |
|---|---|---|
| **v3.0** | Jul 2026 | **Versão 3 (Final)**: Fix definitivo de renderização da imagem em `BenefitsSection` (`priority`), Modal responsivo sem scroll, Trackpad Swipe habilitado nativamente (`embla-carousel-wheel-gestures`), Footer ancorado em tela cheia (`100svh`), WhatsApp flutuante na paleta, arquitetura de Analytics refatorada para Provider centralizado, e limpeza completa de legados da auditoria. |
| **v2.0** | Jul 2026 | **Refatoração White-Label**: `brand.ts`, `BackgroundEffect`, `BrandLogo`. Rebranding completo para Energia Criativa. `useCountdown` hook. Analytics expandido (GA4, Vercel Analytics, Speed Insights, Clarity). `blurDataURL` em todas as imagens. Avatares locais. `snap-scroll` por seção. `preconnect` para Meta. Remoção de `dynamic()` imports. |
| **v1.4** | Jul 2026 | Tracking dual-firing completo (customizado + padrão Meta) em todos os CTAs. Google Analytics 4 via `@next/third-parties`. Otimizações de UI no Hero. |
| **v1.3** | Jul 2026 | Desacoplamento inicial de nicho: `brand.ts` (rascunho), `BackgroundEffect` (rascunho). |
| **v1.2** | Jul 2026 | UX otimizada, blur placeholders, remoção de Dark Mode ativo, Footer refatorado, avatares migrados do Unsplash. |
| **v1.1** | Jul 2026 | Migração Swiper → Embla (shadcn Carousel). Meta Pixel tracking. HeroImages cleanup. |
| **v1.0** | Jul 2026 | Versão inicial. Stack completo Next.js 16 + React 19 + Tailwind 4. Todas as seções da LP. |

---

## 20. Conclusão Geral

A LP da Energia Criativa é uma **entrega técnica madura para o segmento de produtos artesanais D2C no Brasil**. A arquitetura evoluiu de uma LP customizada de nicho para um **Framework de Landing Pages White-Label** reutilizável.

**O que a diferencia de uma LP típica de artesanato:**
- **Framework White-Label completo**: `brand.ts` + `BackgroundEffect` + `BrandLogo` + `content.ts` = nova LP em qualquer nicho em 1 hora
- Código limpo com separação clara de responsabilidades (dados, apresentação, animação, tracking)
- SEO técnico completo (JSON-LD `@graph`, metadata API, sitemap, robots)
- Sistema de animações coerente com física real (spring dynamics)
- Design System com tokens tipados, paleta exclusiva e `--radius` escalável
- Stack de analytics 4-em-1 (Meta Pixel + GA4 + Vercel + Clarity) sem impacto nos Core Web Vitals
- Tracking dual-firing em 10 pontos de conversão — pronto para campanhas Meta imediatamente

**Estado atual:**
- ✅ Base arquitetural concluída e White-Label
- ✅ Analytics completo configurado (requer IDs reais nos placeholders)
- ⚠️ `useCountdown` implementado mas aguardando integração na UI
- ⚠️ Imagens ainda em `.png` (conversão para `.avif` pendente)
- ⚠️ `InfiniteSlider` e `ProductGallerySlider` prontos mas fora do `page.tsx`

As melhorias imediatas são de baixíssimo esforço. A base arquitetural está concluída e pronta para produção.

---

> **Documento gerado por análise estática completa de todos os arquivos do projeto.**  
> Versão do projeto: `package.json v0.1.0` · Next.js 16.2.10 · React 19.2.4  
> v1.0 — Análise inicial: Julho 2026  
> v1.1 — Atualizado após Sprint 1 (Swiper → Embla, Pixel tracking, HeroImages cleanup): Julho 2026  
> v1.2 — Atualizado após Sprint 2 (UX Otimizada, blur placeholders, Footer, Avatares reais): Julho 2026  
> v1.3 — Atualizado após Sprint 3 (brand.ts, BackgroundEffect, BrandLogo — rascunho): Julho 2026  
> v1.4 — Atualizado após implementação completa de Tracking e GA4: Julho 2026  
> **v3.0 — Versão 3. Refatoração White-Label concluída. UX polida. Analytics Centralizado. Trackpad Swipe nativo. Imagens lazy-load fixadas. Julho 2026**
