import { ReactNode } from "react";

/**
 * Providers — wrapper global de contextos React.
 * Adicionar providers futuros aqui (ex: tema, autenticação, analytics).
 */
export function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
