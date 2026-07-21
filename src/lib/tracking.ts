/**
 * tracking.ts — Sistema centralizado de rastreamento Meta (Facebook) Pixel.
 *
 * Design:
 *  - PIXEL_EVENTS: dicionário imutável de todos os nomes de evento (evita magic strings)
 *  - fbqEvent():   wrapper de evento customizado (trackCustom)
 *  - fbqStandard(): wrapper de evento padrão Meta (track) — Purchase, Lead, etc.
 *  - Helpers semânticos: um por ponto de conversão da LP (chamada de 1 linha nos componentes)
 *
 * Reutilização em futuros projetos:
 *  1. Copie este arquivo
 *  2. Ajuste PIXEL_EVENTS com os eventos específicos da nova LP
 *  3. Implante os helpers nos componentes de CTA
 *
 * Referência de eventos padrão Meta:
 * https://developers.facebook.com/docs/meta-pixel/reference
 */

// ─── AUGMENT GLOBAL WINDOW ───────────────────────────────────────────────────
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

// ─── GUARD: só executa no browser e se o fbq estiver carregado ───────────────
const isBrowser = () => typeof window !== "undefined";
const hasPixel  = () => isBrowser() && typeof window.fbq === "function";

// ─── DICIONÁRIO DE EVENTOS CUSTOMIZADOS ──────────────────────────────────────
/**
 * PIXEL_EVENTS: Todos os nomes de evento customizados da LP em um único lugar.
 * Use sempre estas constantes nos helpers — nunca strings literais nos componentes.
 */
export const PIXEL_EVENTS = {
  // ── Engajamento / Topo do Funil ──────────────────────────────────────────
  /** Usuário clicou no CTA principal do Hero */
  HERO_CTA_CLICK:       "HeroCTAClick",
  /** Usuário clicou no CTA da seção de Benefícios */
  BENEFITS_CTA_CLICK:   "BenefitsCTAClick",
  /** Usuário clicou no CTA da seção Verde (GreenCTA) */
  GREEN_CTA_CLICK:      "GreenCTAClick",
  /** Usuário clicou no CTA do Header */
  HEADER_CTA_CLICK:     "HeaderCTAClick",
  /** Usuário clicou no botão flutuante de WhatsApp */
  FLOATING_WA_CLICK:    "FloatingWhatsAppClick",
  /** Usuário clicou no CTA do Footer */
  FOOTER_CTA_CLICK:     "FooterCTAClick",

  // ── Produtos / Meio do Funil ─────────────────────────────────────────────
  /** Usuário abriu o modal de detalhes de um kit */
  KIT_MODAL_OPEN:       "KitModalOpen",
  /** Usuário clicou em "Pedir Kit" (botão direto de compra) */
  KIT_BUY_CLICK:        "KitBuyClick",

  // ── Conteúdo / Comportamento ─────────────────────────────────────────────
  /** Usuário expandiu uma pergunta do FAQ */
  FAQ_EXPAND:           "FaqExpand",
  /** Usuário rolou até o final da LP (indicador de engajamento alto) */
  SCROLL_TO_FOOTER:     "ScrollToFooter",
} as const;

// ─── TIPO: nomes dos eventos customizados ────────────────────────────────────
type PixelEventName = typeof PIXEL_EVENTS[keyof typeof PIXEL_EVENTS];

// ─── PARÂMETROS OPCIONAIS POR EVENTO ─────────────────────────────────────────
export interface KitEventParams {
  /** Nome do kit (ex: "Kit Serenidade") */
  kitName: string;
  /** Preço do kit como string (ex: "89.90") */
  value?:  string;
  /** Moeda — padrão BRL */
  currency?: "BRL" | "USD";
}

export interface FaqEventParams {
  /** Pergunta que foi expandida */
  question: string;
}

// ─── PRIMITIVOS DE RASTREAMENTO ───────────────────────────────────────────────

/**
 * Dispara um evento CUSTOMIZADO do Meta Pixel (trackCustom).
 * Use para eventos específicos da LP que não mapeiam para eventos padrão Meta.
 *
 * @param name    - Nome do evento (use PIXEL_EVENTS)
 * @param params  - Parâmetros adicionais do evento (opcional)
 */
export function fbqEvent(name: PixelEventName, params: Record<string, unknown> = {}): void {
  if (!hasPixel()) return;
  window.fbq("trackCustom", name, params);
}

/**
 * Dispara um evento PADRÃO do Meta Pixel (track).
 * Use para eventos que o Meta reconhece nativamente: Lead, Purchase, Contact etc.
 * Esses eventos alimentam diretamente os objetivos de campanha no Gerenciador de Anúncios.
 *
 * Eventos padrão mais usados:
 *  - "Lead"            → cadastro ou interesse qualificado
 *  - "Contact"         → tentativa de contato (WhatsApp, email)
 *  - "ViewContent"     → visualização de produto/conteúdo
 *  - "InitiateCheckout"→ início de processo de compra
 *  - "Purchase"        → compra confirmada
 *  - "AddToWishlist"   → salvar produto para depois
 *
 * @param eventName - Nome do evento padrão Meta
 * @param params    - Parâmetros do evento (ex: { value, currency, content_name })
 */
export function fbqStandard(eventName: string, params: Record<string, unknown> = {}): void {
  if (!hasPixel()) return;
  window.fbq("track", eventName, params);
}

// ─── HELPERS SEMÂNTICOS ────────────────────────────────────────────────────────
// Um helper por ponto de conversão da LP.
// Disparam SEMPRE dois eventos: o customizado (para análise granular) + o padrão Meta (para otimização de campanha).

/**
 * Rastreia clique no CTA do Hero.
 * Evento padrão: Contact (intenção de contato direto).
 */
export function trackHeroCTA(): void {
  fbqEvent(PIXEL_EVENTS.HERO_CTA_CLICK);
  fbqStandard("Contact", { content_name: "Hero CTA — Receber Catálogo" });
}

/**
 * Rastreia clique no CTA da seção de Benefícios.
 * Evento padrão: Lead (engajamento qualificado após leitura de benefícios).
 */
export function trackBenefitsCTA(): void {
  fbqEvent(PIXEL_EVENTS.BENEFITS_CTA_CLICK);
  fbqStandard("Lead", { content_name: "Benefits CTA — Receber Catálogo" });
}

/**
 * Rastreia clique no CTA da seção verde.
 * Evento padrão: Lead (intenção de compra após seção de urgência).
 */
export function trackGreenCTA(): void {
  fbqEvent(PIXEL_EVENTS.GREEN_CTA_CLICK);
  fbqStandard("Lead", { content_name: "Green CTA — Receber Catálogo" });
}

/**
 * Rastreia clique no CTA do Header.
 * Evento padrão: Contact.
 */
export function trackHeaderCTA(): void {
  fbqEvent(PIXEL_EVENTS.HEADER_CTA_CLICK);
  fbqStandard("Contact", { content_name: "Header CTA" });
}

/**
 * Rastreia clique no botão flutuante de WhatsApp.
 * Evento padrão: Contact.
 */
export function trackFloatingWhatsApp(): void {
  fbqEvent(PIXEL_EVENTS.FLOATING_WA_CLICK);
  fbqStandard("Contact", { content_name: "Floating WhatsApp Button" });
}

/**
 * Rastreia clique no CTA do Footer.
 * Evento padrão: Lead.
 */
export function trackFooterCTA(): void {
  fbqEvent(PIXEL_EVENTS.FOOTER_CTA_CLICK);
  fbqStandard("Lead", { content_name: "Footer CTA" });
}

/**
 * Rastreia abertura do modal de detalhes de um kit.
 * Evento padrão: ViewContent (visualização de produto).
 *
 * @param kit - Dados do kit que foi aberto
 */
export function trackKitModalOpen(kit: KitEventParams): void {
  fbqEvent(PIXEL_EVENTS.KIT_MODAL_OPEN, { kit_name: kit.kitName });
  fbqStandard("ViewContent", {
    content_type:  "product",
    content_name:  kit.kitName,
    value:         kit.value ? parseFloat(kit.value) : undefined,
    currency:      kit.currency ?? "BRL",
  });
}

/**
 * Rastreia clique em "Pedir Kit" (botão de compra direta).
 * Evento padrão: InitiateCheckout (intenção de compra confirmada).
 *
 * @param kit - Dados do kit que foi clicado
 */
export function trackKitBuy(kit: KitEventParams): void {
  fbqEvent(PIXEL_EVENTS.KIT_BUY_CLICK, { kit_name: kit.kitName });
  fbqStandard("InitiateCheckout", {
    content_type:  "product",
    content_name:  kit.kitName,
    num_items:     1,
    value:         kit.value ? parseFloat(kit.value) : undefined,
    currency:      kit.currency ?? "BRL",
  });
}

/**
 * Rastreia expansão de uma pergunta no FAQ.
 * Customizado apenas (sem equivalente padrão Meta relevante).
 *
 * @param faq - Dados do FAQ expandido
 */
export function trackFaqExpand(faq: FaqEventParams): void {
  fbqEvent(PIXEL_EVENTS.FAQ_EXPAND, { question: faq.question });
}

/**
 * Rastreia quando o usuário atinge o footer (alto engajamento).
 * Evento padrão: Lead (usuário leu toda a LP — lead quente).
 */
export function trackScrollToFooter(): void {
  fbqEvent(PIXEL_EVENTS.SCROLL_TO_FOOTER);
  fbqStandard("Lead", { content_name: "Scroll — Leu toda a LP" });
}
