/**
 * SectionHeader — cabeçalho padronizado para todas as seções.
 * Garante consistência visual em toda a landing page.
 */
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  tag?: string;
  title: string;
  titleAccent?: string;      // Texto em itálico com cor primary
  subtitle?: string;
  center?: boolean;          // Centralizado (padrão) ou alinhado à esquerda
  light?: boolean;           // Versão clara para fundos escuros
  className?: string;
}

export function SectionHeader({
  tag,
  title,
  titleAccent,
  subtitle,
  center = true,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(center ? "text-center mx-auto" : "", className)}>
      {tag && (
        <span
          className={cn(
            "font-sans text-[11px] font-semibold tracking-[0.2em] uppercase block mb-4",
            light ? "text-white/50" : "text-primary"
          )}
        >
          {tag}
        </span>
      )}
      <h2
        className={cn(
          "font-heading text-4xl sm:text-5xl font-medium tracking-tight leading-tight mb-4",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}{" "}
        {titleAccent && (
          <em
            className={cn(
              "not-italic",
              light ? "text-white/65" : "text-primary"
            )}
          >
            {titleAccent}
          </em>
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "font-sans text-sm leading-relaxed",
            light ? "text-white/60" : "text-muted-foreground",
            center ? "max-w-xl mx-auto" : "max-w-sm"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
