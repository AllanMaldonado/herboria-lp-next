# Guia do Template LP (White-Label)

Este repositório foi refatorado para funcionar como um **Framework de Landing Pages**. A estrutura base suporta virtualmente qualquer nicho (beleza, saúde, tecnologia, finanças, serviços) através de um processo simples de configuração visual.

## Como lançar uma nova LP em 5 passos

### 1. Configure a Identidade Visual (`src/lib/brand.ts`)
Acesse o arquivo `brand.ts`. É nele que você controla a estética global sem precisar tocar no CSS ou nos componentes estruturais.

* **Tipografia:** Escolha as fontes do Google Fonts (`BRAND_FONTS`). Se a sua marca for moderna/tech, tente `Inter` e `Space Grotesk`.
* **Logotipo:** Defina `BRAND_LOGO.type`. 
  * Se usar `"text"`, a LP usará apenas fontes estilizadas.
  * Se usar `"image"`, coloque seu logo em `public/logo.svg` e defina `imageSrc: "/logo.svg"`.
* **Arredondamento:** Ajuste o `BRAND_RADIUS.preset`. 
  * Para um visual amigável: `"rounded"` ou `"balanced"`.
  * Para um visual agressivo/corporativo: `"sharp"`.
* **Efeito de Fundo:** A propriedade `BRAND_BG_EFFECT.variant` muda toda a atmosfera. 
  * `"blob"`: Formas botânicas e orgânicas.
  * `"glow"`: Borrão de luz (premium, misterioso, tech).
  * `"grid"`: Malha de pontos geométrica (startup, financeiro).
  * `"none"`: Minimalista e limpo.

### 2. Configure a Paleta de Cores (`src/app/globals.css`)
No início do arquivo `globals.css` (linha 52+), você encontra a paleta unificada. Troque apenas as cores hexadecimais:
* `--primary`: A cor principal de botões e destaques (Ex: Azul `#0F62FE`).
* `--background` / `--foreground`: Fundo e texto base (Ex: Fundo preto `#000000`, Texto branco `#FFFFFF`).
* `--accent`: Detalhes secundários.

### 3. Escreva o Copy e Produtos (`src/lib/content.ts`)
Abra o `content.ts`. O projeto segue uma arquitetura **Single Source of Truth (SSoT)**. 
* Todo o copy (textos) vive neste arquivo. NADA está hardcoded nos componentes.
* Preencha os CTAs, descrições, depoimentos, preços e FAQ. O layout se adapta aos dados.

### 4. Substitua as Imagens (`public/`)
* Faça o upload das suas imagens para a pasta `/public`.
* No `content.ts`, atualize os caminhos (`IMAGES.heroComposition.src`).
* **Dica de Performance:** Utilize o formato `webp` ou `avif` e adicione o `blurDataURL` (Base64 pequeno de 10x10px) no `content.ts` para que o *placeholder* (esqueleto) carregue instantaneamente.

### 5. Configure o Analytics (`.env.local`)
* Crie o arquivo `.env.local` na raiz.
* Insira seu Pixel do Meta: `NEXT_PUBLIC_META_PIXEL_ID="SEU_ID"`.
* Todos os eventos de conversão (InitiateCheckout, Lead, ViewContent) já estão devidamente amarrados a todos os botões de CTA da LP através do script unificado em `src/lib/tracking.ts`.

---

## Estrutura Opcional

### Desativando / Removendo Seções
Se a sua LP não precisar da `TestimonialSection` (Depoimentos) ou do `InfiniteSlider` (Letreiro Infinito), basta abrir o `src/app/page.tsx` e comentar as linhas correspondentes. Tudo continuará funcionando perfeitamente sem erros de layout.
