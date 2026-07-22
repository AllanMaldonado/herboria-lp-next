/**
 * utils.ts
 * 
 * Este arquivo concentra funções utilitárias globais (helpers) que podem ser reaproveitadas 
 * por toda a aplicação. No ecossistema moderno (Tailwind + Shadcn), a ferramenta central é o utilitário `cn`.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Função `cn` (Class Names)
 * 
 * O QUE ELA FAZ:
 * Resolve o maior problema histórico do CSS em componentes React: composição condicional 
 * de classes e resolução de conflitos gerados pelo Tailwind CSS.
 * 
 * POR QUE É NECESSÁRIA?
 * Imagine que o componente base <Button> tenha a classe `bg-primary`. E você chama o 
 * botão passando uma prop className externa: `<Button className="bg-red-500" />`.
 * Pela lógica nativa, o botão ficaria com as classes `bg-primary bg-red-500`, gerando 
 * uma colisão na cascata CSS. O Tailwind pode não saber qual aplicar.
 * 
 * COMO FUNCIONA A MÁGICA:
 * 1. O `clsx` atua agrupando arrays, objetos ou strings condicionais 
 *    (ex: cn('base', isActive && 'bg-blue')).
 * 2. O `twMerge` analisa as classes de utilitários resultantes e *anula* classes do 
 *    mesmo grupo (ex: margem, padding, cor) deixando apenas a que veio por último.
 * 
 *
 * @param inputs - Array de argumentos de classe (strings, objetos, lógicos) do tipo ClassValue.
 * @returns String final imaculada e purgada de conflitos para injetar no `className` do JSX.
 * 
 * 💡 [Tailwind CSS / Ecossistema] Este utilitário (cn) é o padrão oficial no ecossistema moderno
 * (como no shadcn/ui) para unir condicionalmente classes Tailwind usando 'clsx' e 'tailwind-merge'.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * scrollToSection(id)
 *
 * Realiza scroll suave até um elemento pelo seu `id`.
 * Centraliza a lógica que estava duplicada em Header.tsx e BenefitsSection.tsx.
 *
 * @param id - O valor do atributo `id` do elemento alvo (sem o '#')
 */
export function scrollToSection(id: string): void {
  if (typeof window === "undefined") return;
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
