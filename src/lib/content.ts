/**
 * content.ts — Dicionário central de todo o conteúdo do site Energia Criativa.
 * Edite aqui para atualizar textos, imagens e dados em toda a aplicação.
 */

// ─── SITE ────────────────────────────────────────────────────────
// 💡 [TS] O uso de 'as const' (const assertion) informa ao TypeScript que este objeto é estritamente de leitura (readonly).
// Isso permite inferência estreita (narrowing), onde o tipo da string literal é exato, prevenindo mutações e melhorando o autocompletar.
const SITE = {
  name: "Energia Criativa",
  tagline: "Ateliê",
  url: "https://energiacriativa.com.br",
  phone: "5511999999999",
  instagram: "https://instagram.com/energiacriativa",
  facebook: "https://facebook.com/energiacriativa",
  whatsappBase: "https://wa.me/5511999999999",
  whatsappGeneral:
    "https://wa.me/5511999999999?text=Olá!%20Quero%20conhecer%20os%20kits%20Energia Criativa!",
} as const;

const IMAGES = {
  heroComposition: {
    src: "/hero-composition.png",
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+P/tfwAJHwPnRj4mQAAAABJRU5ErkJggg=="
  },
  kitSerenidade: {
    src: "/kit-serenidade.png",
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+P/tfwAJHwPnRj4mQAAAABJRU5ErkJggg=="
  },
  kitVitalidade: {
    src: "/kit-vitalidade.png",
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+P/tfwAJHwPnRj4mQAAAABJRU5ErkJggg=="
  },
  kitPurificacao: {
    src: "/kit-purificacao.png",
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+P/tfwAJHwPnRj4mQAAAABJRU5ErkJggg=="
  },
  benefitsSoap: {
    src: "/benefits-soap.png",
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+P/tfwAJHwPnRj4mQAAAABJRU5ErkJggg=="
  },
  galleryLavender: {
    src: "/gallery-lavender.png",
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+P/tfwAJHwPnRj4mQAAAABJRU5ErkJggg=="
  },
  galleryRosemary: {
    src: "/gallery-rosemary.png",
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+P/tfwAJHwPnRj4mQAAAABJRU5ErkJggg=="
  },
  galleryCharcoal: {
    src: "/gallery-charcoal.png",
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+P/tfwAJHwPnRj4mQAAAABJRU5ErkJggg=="
  },
  galleryRose: {
    src: "/gallery-rose.png",
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+P/tfwAJHwPnRj4mQAAAABJRU5ErkJggg=="
  },
  artisanPortrait: {
    src: "/artisan_portrait.png",
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+P/tfwAJHwPnRj4mQAAAABJRU5ErkJggg=="
  },
} as const;

// ─── NAVEGAÇÃO ────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#galeria", label: "Destaques" },
  { href: "#colecoes", label: "Coleções" },
  { href: "#faq", label: "Dúvidas" },
] as const;

// ─── HERO ─────────────────────────────────────────────────────────
const HERO = {
  eyebrow: "Cultivando o bem-estar com",
  title: "ENERGIA CRIATIVA",
  description:
    "Sabonetes artesanais com óleos essenciais puros e glicerina vegetal preservada. Transforme seu banho em um ritual de aromaterapia e cuide da sua pele do jeito que ela merece.",
  cta: "Receber Catálogo",
  ctaHelper: "Fale com a gente e receba seu kit personalizado",
  ctaHref: SITE.whatsappGeneral,
  badge: "100% Puro",
  products: [
    {
      id: 0,
      src: IMAGES.heroComposition,
      alt: "Coleção completa Energia Criativa: sabonetes empilhados, óleo facial e planta suculenta",
      label: "Coleção Completa",
      tag: "Mais Popular",
    },
    {
      id: 1,
      src: IMAGES.kitSerenidade,
      alt: "Kit Serenidade Energia Criativa — Lavanda e Sálvia",
      label: "Kit Serenidade",
      tag: "Lavanda & Sálvia",
    },
    {
      id: 2,
      src: IMAGES.kitVitalidade,
      alt: "Kit Vitalidade Energia Criativa — Alecrim e Capim Limão",
      label: "Kit Vitalidade",
      tag: "Alecrim & Capim Limão",
    },
    {
      id: 3,
      src: IMAGES.kitPurificacao,
      alt: "Kit Purificação Energia Criativa — Carvão e Melaleuca",
      label: "Kit Purificação",
      tag: "Carvão & Melaleuca",
    },
  ],
} as const;

// ─── TRUST BAR ────────────────────────────────────────────────────
const TRUST = {
  clients: {
    highlight: "45 Dias",
    text: "De maturação artesanal para garantir uma espuma ultracremosa e duradoura.",
  },
  sales: {
    value: "3x Mais",
    label: "Durabilidade e hidratação se comparado aos sabonetes de mercado",
  },
  rating: {
    value: "100%",
    label:
      "Puro e seguro. Zero parabenos, toxinas ou fragrâncias sintéticas na sua pele.",
  },
} as const;

// ─── BENEFITS ─────────────────────────────────────────────────────
const BENEFITS = {
  tag: "Por que Energia Criativa?",
  title: "Seu banho transformado em ",
  titleAccent: "Aromaterapia",
  paragraphs: [
    "Chega de pele ressecada após o banho. Nossos sabonetes artesanais preservam 100% da glicerina vegetal natural — a mesma que indústrias removem para vender separado. O resultado: hidratação profunda que dura horas.",
    "Cada barra funciona como um difusor no seu chuveiro. O vapor libera óleos essenciais terapêuticos puros que agem diretamente no sistema límbico: Lavanda para relaxar, Alecrim para energizar, Capim Limão para clareza mental.",
  ],
  cta: "Receber Catálogo",
  ctaHref: SITE.whatsappGeneral,
  image: {
    ...IMAGES.benefitsSoap,
    alt: "Sabonete artesanal Energia Criativa com espuma densa e ervas frescas",
  },
  badge: { label: "Glicerina preservada", value: "100% Natural" },
} as const;

// ─── GALLERY ──────────────────────────────────────────────────────
const GALLERY = {
  tag: "Nossa Linha",
  title: "Em Foco",
  subtitle:
    "Explore as texturas e blends exclusivos criados para cada momento do seu dia.",
  items: [
    {
      id: 1,
      title: "Serenidade",
      subtitle: "Lavanda & Sálvia",
      img: IMAGES.galleryLavender,
      desc: "Acalma a mente e nutre a pele sensível com a pureza .",
    },
    {
      id: 2,
      title: "Vitalidade",
      subtitle: "Alecrim & Capim Limão",
      img: IMAGES.galleryRosemary,
      desc: "Banho energizante que desperta o corpo e aguça a mente.",
    },
    {
      id: 3,
      title: "Purificação",
      subtitle: "Carvão & Melaleuca",
      img: IMAGES.galleryCharcoal,
      desc: "Detox profundo dos poros sem repuxar a barreira da pele.",
    },
    {
      id: 4,
      title: "Rosa Silvestre",
      subtitle: "Rosa & Manteiga de Karité",
      img: IMAGES.galleryRose,
      desc: "Conforto e maciez absolutos para peles ressecadas.",
    },
    {
      id: 5,
      title: "Botânico Verde",
      subtitle: "Aloe Vera & Ervas Finas",
      img: IMAGES.galleryLavender,
      desc: "Equilíbrio e enraizamento com a força das ervas da terra.",
    },
  ],
} as const;

// ─── KITS / COLLECTIONS ───────────────────────────────────────────
const KITS = {
  tag: "Coleção Assinatura",
  title: "Kits Presentes",
  subtitle:
    "Sinergias perfeitas de óleos essenciais projetadas para transformar estados de humor. Presenteie com o que há de mais puro da natureza.",
  labels: {
    primaryCta: "Pedir Kit",
    secondaryCta: "Ver Detalhes",
    benefits: "Benefícios",
    price: "Valor",
  },
  items: [
    {
      id: 1,
      name: "Kit Serenidade",
      desc: "Lavanda Francesa & Argila Roxa. Para rituais noturnos de relaxamento profundo — desacelera a mente, alivia a ansiedade e entrega uma pele aveludada de manhã cedo.",
      tag: "Mais Vendido",
      price: "R$ 89,90",
      img: IMAGES.kitSerenidade,
      benefits: [
        "Alivia ansiedade e tensão",
        "Induz sono reparador",
        "Pele aveludada pela manhã",
      ],
      whatsapp: `${SITE.whatsappBase}?text=Olá!%20Quero%20o%20Kit%20Serenidade%20da%20Energia Criativa!`,
    },
    {
      id: 2,
      name: "Kit Vitalidade",
      desc: "Capim Limão, Alecrim & Argila Verde. O banho da manhã que você esperava: energiza, elimina a oleosidade e acorda o corpo para o dia com frescor real.",
      price: "R$ 89,90",
      img: IMAGES.kitVitalidade,
      benefits: [
        "Energiza corpo e mente",
        "Controle de oleosidade",
        "Ação antisséptica suave",
      ],
      whatsapp: `${SITE.whatsappBase}?text=Olá!%20Quero%20o%20Kit%20Vitalidade%20da%20Energia Criativa!`,
    },
    {
      id: 3,
      name: "Kit Purificação",
      desc: "Carvão Ativado, Melaleuca & Hortelã. Limpeza detox profunda com frescor duradouro. Para quem quer pele limpa de verdade — sem resíduos.",
      price: "R$ 95,90",
      img: IMAGES.kitPurificacao,
      benefits: [
        "Detox profundo dos poros",
        "Ação secativa sem ressecar",
        "Frescor revigorante",
      ],
      whatsapp: `${SITE.whatsappBase}?text=Olá!%20Quero%20o%20Kit%20Purificação%20da%20Energia Criativa!`,
    },
  ],
} as const;

// ─── CTA SECTION ──────────────────────────────────────────────────
const CTA_SECTION = {
  tag: "Produção Artesanal Limitada",
  title: "Seu banho merece",
  titleItalic: "ser um ritual",
  description:
    "Cada barra Energia Criativa é curada por mais de 5 semanas em temperatura controlada. O estoque é limitado — produzido em pequenos lotes para garantir qualidade máxima. Garanta o seu kit agora pelo WhatsApp.",
  cta: "Receber Catálogo",
  ctaHref: SITE.whatsappGeneral,
  stats: [
    {
      value: "Lotes Limitados",
      label: "Produção artesanal restrita. Nossos kits esgotam rápido.",
    },
    {
      value: "Pele Renovada",
      label: "Glicerina natural preservada para combater o ressecamento.",
    },
    {
      value: "Aromaterapia",
      label: "Óleos essenciais puros que mudam seu humor no banho.",
    },
  ],
} as const;

// ─── ABOUT ARTISAN ────────────────────────────────────────────────
const ARTISAN = {
  tag: "Por Trás da Marca",
  title: "Prazer, sou a",
  titleAccent: "Kelly",
  subtitle: "Fundadora e Artesã da Energia Criativa.",
  paragraphs: [
    "Minha jornada com a saboaria começou há 5 anos, quando busquei alternativas naturais para a pele extremamente sensível da minha filha. O que começou como uma necessidade na cozinha de casa, rapidamente se transformou em uma paixão profunda pelos óleos essenciais e pela botânica.",
    "Acredito que o banho não deve ser apenas uma etapa de limpeza mecânica no nosso dia, mas sim um momento sagrado de reconexão consigo mesma. Cada barra que crio passa por um processo lento e respeitoso de cura, garantindo que a natureza entregue o seu melhor para a sua pele.",
  ],
  image: {
    ...IMAGES.artisanPortrait,
    alt: "Helena, fundadora da Energia Criativa, sorrindo em seu ateliê botânico",
  },
} as const;

// ─── TESTIMONIALS ─────────────────────────────────────────────────
const TESTIMONIALS = {
  tag: "Depoimentos Reais",
  title: "A experiência",
  titleAccent: "Energia Criativa",
  subtitle:
    "Centenas de mulheres já transformaram o banho em ritual de autocuidado. Veja o que dizem.",
  items: [
    {
      id: 1,
      quote:
        "Foi como abrir um presente para mim mesma. O cheiro invade o banheiro antes de abrir a embalagem. Minha pele ficou macia logo na primeira semana. Nunca mais volto ao supermercado.",
      name: "Camila Dantas",
      tag: "Cliente verificada — Kit Serenidade",
      avatar: "/images/avatar1.jpg",
    },
    {
      id: 2,
      quote:
        "Sempre sofri com pele ressecada e sensível. O Kit Vitalidade mudou minha rotina em 7 dias. Nada mais de pele repuxando depois do banho. É uma experiência completamente diferente.",
      name: "Juliana Mendes",
      tag: "Cliente verificada — Kit Vitalidade",
      avatar: "/images/avatar2.jpg",
    },
    {
      id: 3,
      quote:
        "A aromaterapia do Capim Limão no banho muda completamente minha energia para trabalhar. Comprei 3 kits para presentear minhas amigas — a embalagem é linda. Todas amaram.",
      name: "Sofia Albuquerque",
      tag: "Cliente verificada — Coleção Completa",
      avatar: "/images/avatar3.jpg",
    },
  ],
} as const;

// ─── FAQ ──────────────────────────────────────────────────────────
const FAQ = {
  tag: "Transparência Total",
  title: "Perguntas Frequentes",
  subtitle:
    "A transparência é o nosso principal ingrediente. Entenda tudo sobre nosso processo artesanal.",
  items: [
    {
      question: "O que é o método Cold Process e por que é superior?",
      answer:
        "Cold Process é a saboaria artesanal feita a frio — sem aquecimento industrial. Misturamos óleos botânicos e lixívia em baixa temperatura e deixamos curar por 5 a 6 semanas. Esse processo preserva 100% das propriedades terapêuticas dos óleos essenciais e gera glicerina natural que hidrata profundamente — a mesma que fábricas removem para vender separado.",
    },
    {
      question: "Os sabonetes têm perfume, corante ou ingrediente artificial?",
      answer:
        "Nunca. A Energia Criativa usa apenas óleos essenciais terapêuticos certificados para aroma e ingredientes naturais para cor: argila roxa, carvão ativado, cacau, cúrcuma. Nenhum parabeno, nenhuma fragrância sintética, nenhum corante FD&C. O que você vê é exatamente o que entra na fórmula.",
    },
    {
      question: "Como comprar? Funciona pelo WhatsApp?",
      answer:
        "Sim! Nossa produção é limitada a pequenos lotes artesanais, então o estoque muda rapidamente. Pelo WhatsApp você recebe o catálogo atualizado do que está curado agora, ajuda personalizada para escolher o kit ideal e finaliza o pagamento com segurança (Pix ou Cartão). É rápido, fácil e com atendimento de verdade.",
    },
    {
      question:
        "Fazem kits personalizados para casamentos e eventos corporativos?",
      answer:
        "Sim! Podemos personalizar rótulos, sinergias de aromas e embalagens exclusivamente para o seu evento. Recebemos encomendas com no mínimo 6 semanas de antecedência — o tempo de cura do sabonete é inegociável porque é o que garante a qualidade. Entre em contato pelo WhatsApp para orçamento.",
    },
    {
      question: "Quanto tempo um sabonete Energia Criativa dura?",
      answer:
        "Uma barra dura entre 4 a 6 semanas no chuveiro com uso diário — 2 a 3x mais do que sabonetes industriais. Isso acontece porque nossa cura longa cria uma barra muito mais densa e compacta. Com um saboneteiro de madeira que drene bem, a durabilidade é ainda maior.",
    },
  ],
} as const;

// ─── FOOTER ───────────────────────────────────────────────────────
const FOOTER = {
  cta: {
    title: "Pronta para o seu",
    titleAccent: "ritual?",
    subtitle:
      "Fale com a gente pelo WhatsApp. Montamos kits personalizados para presente e ajudamos a escolher os blends ideais para você ou para quem você ama.",
    cta: "Receber Catálogo",
    ctaHref: SITE.whatsappGeneral,
  },
  links: {
    Produtos: [
      { label: "Kit Serenidade", href: "#colecoes" },
      { label: "Kit Vitalidade", href: "#colecoes" },
      { label: "Kit Purificação", href: "#colecoes" },
      { label: "Galeria de Texturas", href: "#galeria" },
    ],
    Empresa: [
      { label: "Sobre a Energia Criativa", href: "#sobre" },
      { label: "Benefícios do Cold Process", href: "#beneficios" },
      { label: "Dúvidas Frequentes", href: "#faq" },
    ],
    Contato: [
      { label: "Falar no WhatsApp", href: SITE.whatsappGeneral },
      { label: "Instagram", href: SITE.instagram },
      { label: "Facebook", href: SITE.facebook },
    ],
  },
  copyright: "© 2026 Energia Criativa Saboaria ✦ Todos os direitos reservados.",
  madeIn: "Feito com cuidado no Brasil",
  socialLabel: "Redes Sociais",
  tagline: "O luxo puro da natureza em cada banho.",
} as const;

export const TEXTS = {
  SITE,
  IMAGES,
  NAV_LINKS,
  HERO,
  TRUST,
  BENEFITS,
  GALLERY,
  KITS,
  CTA_SECTION,
  ARTISAN,
  TESTIMONIALS,
  FAQ,
  FOOTER,
} as const;
