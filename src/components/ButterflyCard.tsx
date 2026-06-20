import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import type { Butterfly } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  butterfly: Butterfly;
  size?: "sm" | "md" | "lg";
  showCategory?: boolean;
  priority?: boolean;
  index?: number;
}

export default function ButterflyCard({
  butterfly,
  size = "md",
  showCategory = true,
  priority = false,
  index = 0,
}: Props) {
  const sizeClasses = {
    sm: "h-40",
    md: "h-56",
    lg: "h-72",
  };

  return (
    <Link
      to={`/butterfly/${butterfly.id}`}
      className={cn(
        "group block rounded-3xl overflow-hidden bg-white shadow-card card-hover",
        "opacity-0 animate-fade-up"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={cn("relative overflow-hidden", sizeClasses[size])}>
        <img
          src={butterfly.image}
          alt={butterfly.name}
          loading={priority ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-80" />

        {showCategory && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur text-[11px] font-medium text-butterfly-pink-deep">
              <Sparkles className="w-3 h-3" strokeWidth={2} />
              {butterfly.category}
            </span>
          </div>
        )}

        {butterfly.popularity >= 90 && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex px-2 py-1 rounded-full bg-butterfly-gold/90 text-white text-[10px] font-semibold tracking-wider uppercase">
              HOT
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="font-display text-xl font-semibold text-butterfly-ink truncate">
            {butterfly.name}
          </h3>
        </div>
        <p className="text-xs text-butterfly-ink/50 italic font-serif mb-3 truncate">
          {butterfly.latinName}
        </p>
        <p className="text-sm text-butterfly-ink/70 line-clamp-2 leading-relaxed">
          {butterfly.description}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-butterfly-ink/50">
          <span>{butterfly.family}</span>
          <span className="text-butterfly-green-deep font-medium group-hover:text-butterfly-green-deep transition-colors inline-flex items-center gap-1">
            了解详情
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
