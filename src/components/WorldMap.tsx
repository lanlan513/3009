import { useState, useMemo } from "react";
import type { Continent } from "@/types";
import { continents, getButterfliesByContinent } from "@/data/butterflies";
import { cn } from "@/lib/utils";

interface Props {
  selectedContinent: Continent | null;
  onSelectContinent: (continent: Continent | null) => void;
}

interface ContinentPath {
  id: Continent;
  d: string;
  labelX: number;
  labelY: number;
}

const continentPaths: ContinentPath[] = [
  {
    id: "北美洲",
    d: "M 80 100 Q 60 80 75 60 Q 95 40 130 45 Q 170 50 185 75 Q 200 100 190 130 Q 180 160 150 170 Q 120 180 100 160 Q 85 140 80 120 Z",
    labelX: 130,
    labelY: 110,
  },
  {
    id: "南美洲",
    d: "M 155 200 Q 140 190 145 220 Q 150 260 165 290 Q 175 315 190 330 Q 200 345 210 335 Q 220 310 225 280 Q 230 250 220 220 Q 210 195 190 190 Q 170 185 155 200 Z",
    labelX: 185,
    labelY: 260,
  },
  {
    id: "欧洲",
    d: "M 280 95 Q 265 80 280 65 Q 300 55 330 60 Q 360 65 375 85 Q 385 105 370 120 Q 355 135 325 130 Q 295 125 280 110 Z",
    labelX: 325,
    labelY: 95,
  },
  {
    id: "非洲",
    d: "M 300 160 Q 280 150 285 180 Q 290 220 305 260 Q 320 300 340 320 Q 360 340 380 330 Q 400 320 405 290 Q 410 260 400 230 Q 390 200 370 180 Q 340 165 300 160 Z",
    labelX: 345,
    labelY: 240,
  },
  {
    id: "亚洲",
    d: "M 400 70 Q 370 55 400 40 Q 450 30 510 40 Q 570 50 600 80 Q 620 110 610 150 Q 600 190 570 210 Q 530 230 490 220 Q 450 210 420 180 Q 400 150 395 110 Q 395 85 400 70 Z",
    labelX: 500,
    labelY: 130,
  },
  {
    id: "大洋洲",
    d: "M 520 260 Q 500 250 510 270 Q 520 295 545 310 Q 570 325 595 315 Q 615 305 620 280 Q 625 255 610 240 Q 595 225 570 220 Q 540 215 520 260 Z",
    labelX: 565,
    labelY: 275,
  },
];

const continentColors: Record<Continent, { base: string; active: string; glow: string }> = {
  北美洲: { base: "#E8B4D4", active: "#D28FB8", glow: "rgba(232, 180, 212, 0.4)" },
  南美洲: { base: "#B7D9BC", active: "#5F9368", glow: "rgba(134, 185, 142, 0.4)" },
  欧洲: { base: "#D4A574", active: "#B8956A", glow: "rgba(212, 165, 116, 0.4)" },
  非洲: { base: "#E8C4B4", active: "#D4A594", glow: "rgba(232, 196, 180, 0.4)" },
  亚洲: { base: "#F5D9E8", active: "#E8B4D4", glow: "rgba(245, 217, 232, 0.5)" },
  大洋洲: { base: "#B4D4E8", active: "#8FB8D2", glow: "rgba(180, 212, 232, 0.4)" },
};

export default function WorldMap({ selectedContinent, onSelectContinent }: Props) {
  const [hoveredContinent, setHoveredContinent] = useState<Continent | null>(null);

  const continentCounts = useMemo(() => {
    const counts: Record<Continent, number> = {
      "北美洲": 0,
      "南美洲": 0,
      "欧洲": 0,
      "非洲": 0,
      "亚洲": 0,
      "大洋洲": 0,
    };
    continents.forEach((c) => {
      counts[c] = getButterfliesByContinent(c).length;
    });
    return counts;
  }, []);

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 700 380"
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 8px 32px rgba(134, 185, 142, 0.1))" }}
      >
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBF7" />
            <stop offset="50%" stopColor="#FDF1E8" />
            <stop offset="100%" stopColor="#F5D9E8" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(210, 143, 184, 0.08)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="700" height="380" rx="24" fill="url(#bgGrad)" />
        <rect width="700" height="380" rx="24" fill="url(#grid)" />

        {continentPaths.map((continent) => {
          const isSelected = selectedContinent === continent.id;
          const isHovered = hoveredContinent === continent.id;
          const colors = continentColors[continent.id];
          const count = continentCounts[continent.id];

          return (
            <g key={continent.id}>
              {(isSelected || isHovered) && (
                <path
                  d={continent.d}
                  fill={colors.glow}
                  transform="translate(0, 4)"
                  style={{ filter: "blur(8px)" }}
                  className="animate-pulse"
                />
              )}

              <path
                d={continent.d}
                fill={isSelected ? colors.active : isHovered ? colors.base : `${colors.base}60`}
                stroke={isSelected ? colors.active : isHovered ? colors.base : "transparent"}
                strokeWidth={isSelected ? 2.5 : isHovered ? 1.5 : 0}
                className="cursor-pointer transition-all duration-500 ease-out"
                style={{
                  transitionProperty: "fill, stroke, stroke-width",
                }}
                onClick={() =>
                  onSelectContinent(isSelected ? null : continent.id)
                }
                onMouseEnter={() => setHoveredContinent(continent.id)}
                onMouseLeave={() => setHoveredContinent(null)}
              />

              <g
                className="pointer-events-none select-none"
                style={{
                  transform: isSelected ? "scale(1.05)" : isHovered ? "scale(1.03)" : "scale(1)",
                  transformOrigin: `${continent.labelX}px ${continent.labelY}px`,
                  transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <text
                  x={continent.labelX}
                  y={continent.labelY - 8}
                  textAnchor="middle"
                  fill={isSelected ? "#fff" : "#3A3A3A"}
                  style={{
                    fontSize: 14,
                    fontWeight: isSelected ? 700 : 600,
                    fontFamily: '"Noto Sans SC", sans-serif',
                    transition: "all 0.3s ease",
                  }}
                >
                  {continent.id}
                </text>
                <text
                  x={continent.labelX}
                  y={continent.labelY + 12}
                  textAnchor="middle"
                  fill={isSelected ? "rgba(255,255,255,0.85)" : "rgba(58, 58, 58, 0.6)"}
                  style={{
                    fontSize: 11,
                    fontFamily: '"Noto Sans SC", sans-serif',
                  }}
                >
                  {count} 种蝴蝶
                </text>
              </g>
            </g>
          );
        })}

        {selectedContinent && (
          <g>
            {Array.from({ length: 8 }).map((_, i) => {
              const continent = continentPaths.find((c) => c.id === selectedContinent)!;
              const angle = (i / 8) * Math.PI * 2;
              const radius = 35 + (i % 3) * 8;
              const x = continent.labelX + Math.cos(angle) * radius;
              const y = continent.labelY + Math.sin(angle) * radius * 0.7;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={3}
                  fill={continentColors[selectedContinent].active}
                  style={{
                    animation: `map-pulse 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.25}s`,
                    opacity: 0.8,
                  }}
                />
              );
            })}
          </g>
        )}
      </svg>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => onSelectContinent(selectedContinent === c ? null : c)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
              "transition-all duration-300 ease-out",
              selectedContinent === c
                ? "bg-butterfly-pink-deep text-white shadow-soft scale-105"
                : "bg-white/70 text-butterfly-ink/70 hover:bg-white hover:text-butterfly-ink border border-butterfly-pink/20"
            )}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: continentColors[c].active }}
            />
            {c}
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full",
              selectedContinent === c
                ? "bg-white/20 text-white"
                : "bg-butterfly-pink-light/60 text-butterfly-pink-deep"
            )}>
              {continentCounts[c]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
