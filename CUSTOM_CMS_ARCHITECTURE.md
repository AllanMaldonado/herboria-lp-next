# Arquitetura para CMS Customizado (Painel Admin Próprio)

Este documento descreve a estratégia para transformar a Landing Page estática em uma aplicação dinâmica com um CMS próprio, eliminando a necessidade de ferramentas externas como WordPress.

## A Arquitetura Atual (Estática)
Atualmente, todo o conteúdo e design estão acoplados ao código:
- **`content.ts`**: Fonte de verdade (Single Source of Truth) para textos, links e dados.
- **`brand.ts` e `globals.css`**: Configurações de cores, fontes e estilo.
- **`/public`**: Imagens estáticas.

O problema dessa abordagem é que qualquer edição exige conhecimento técnico para alterar o código e realizar um novo *deploy* da aplicação.

## A Arquitetura Proposta (CMS Próprio)
Para ter um painel de controle feito por você mesmo, a arquitetura deve evoluir para o seguinte cenário:

### 1. Textos e Dados (Substituindo o `content.ts`)
*   **Banco de Dados:** Em vez de ler um arquivo estático empacotado no build, a aplicação passará a consultar um banco de dados (ex: PostgreSQL usando Prisma, MongoDB, Supabase ou Firebase).
*   **Painel Administrativo:** Você criará uma rota privada no Next.js (ex: `src/app/admin`) protegida por login. Essa rota terá formulários para editar os textos. Ao salvar, os dados são atualizados no Banco de Dados, e a Landing Page (Frontend) puxa esse dado novo automaticamente através de um `fetch`.

### 2. Imagens (Substituindo a pasta `/public`)
No momento, as imagens (como `/hero-composition.png`) estão no código fonte. Em um CMS dinâmico:
*   **Storage (Armazenamento na Nuvem):** Você precisará de um serviço de armazenamento focado em upload de arquivos, como AWS S3, Supabase Storage ou Vercel Blob.
*   **Upload e Referência:** No seu painel Admin, haverá um input de arquivo para fazer upload. O Admin envia essa imagem para o Storage, recebe uma URL pública (ex: `https://seubucket.com/hero.png`), e salva apenas essa URL como texto no seu Banco de Dados.

### 3. Cores e Estilos (Substituindo configurações visuais estáticas)
Para permitir que o CMS altere as cores e fontes de forma dinâmica (viabilizando o conceito *White Label*):
*   Você salvará os códigos Hexadecimais (ex: `#2D3B1F`) no Banco de Dados.
*   O Next.js fará a leitura dessas cores no servidor e as injetará na página principal através de variáveis CSS dinâmicas (exemplo: `<html style={{ '--primary': corDoBanco }}>`) em vez de ler as variáveis chumbadas no seu CSS padrão.

## Resumo dos Próximos Passos (O que construir)
Para tirar essa ideia do papel sem depender de serviços de terceiros, a estrutura que precisamos montar consiste em:
1.  **Backend (Infraestrutura):** Configurar um banco de dados (relacional ou NoSQL) e um serviço de *Storage*.
2.  **Frontend Dinâmico:** Refatorar a Landing Page atual para extrair os dados do banco, abandonando o `content.ts`.
3.  **Painel Admin (A Mágica):** Construir rotas protegidas por autenticação contendo uma interface rica (Dashboard, formulários de edição de texto, *color pickers* e área para *upload* de fotos). Tudo isso pode continuar morando dentro do mesmo projeto Next.js!
