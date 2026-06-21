import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import ButterflyIcon from "@/components/ButterflyIcon";
import type { Butterfly, FlightTrackPoint } from "@/types";

interface ButterflyFlight {
  butterfly: Butterfly;
  color: string;
  currentPoint: FlightTrackPoint | null;
  progress: number;
}

interface ButterflyFlightAnimationProps {
  butterflies: Butterfly[];
  height?: number;
  showControls?: boolean;
  autoPlay?: boolean;
  showTrail?: boolean;
  className?: string;
}

const butterflyColors = [
  "#D28FB8",
  "#86B98E",
  "#D4A574",
  "#B4D4E8",
  "#E8B4B4",
  "#B895D4",
  "#F5D9E8",
  "#B7D9BC",
];

export default function ButterflyFlightAnimation({
  butterflies,
  height = 400,
  showControls = true,
  autoPlay = true,
  showTrail = true,
  className,
}: ButterflyFlightAnimationProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [flights, setFlights] = useState<ButterflyFlight[]>([]);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
  const lastTimestampRef = useRef<number | null>(null);

  useEffect(() => {
    setFlights(
      butterflies.map((b, i) => ({
        butterfly: b,
        color: butterflyColors[i % butterflyColors.length],
        currentPoint: b.flight.trajectory.points[0],
        progress: 0,
      }))
    );
    startTimeRef.current = null;
    pausedAtRef.current = 0;
    lastTimestampRef.current = null;
  }, [butterflies]);

  const getPositionAtTime = useCallback(
    (trajectory: Butterfly["flight"]["trajectory"], elapsed: number) => {
      const points = trajectory.points;
      const duration = trajectory.duration * 1000;
      const progress = (elapsed % duration) / duration;
      const index = Math.floor(progress * points.length);
      const nextIndex = (index + 1) % points.length;
      const fraction = (progress * points.length) % 1;

      const current = points[index];
      const next = points[nextIndex];

      return {
        x: current.x + (next.x - current.x) * fraction,
        y: current.y + (next.y - current.y) * fraction,
        progress,
      };
    },
    []
  );

  const animate = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current - pausedAtRef.current;

      setFlights((prev) =>
        prev.map((flight) => {
          const pos = getPositionAtTime(flight.butterfly.flight.trajectory, elapsed);
          return {
            ...flight,
            currentPoint: { x: pos.x, y: pos.y, t: pos.progress },
            progress: pos.progress,
          };
        })
      );

      lastTimestampRef.current = timestamp;
      animationRef.current = requestAnimationFrame(animate);
    },
    [getPositionAtTime]
  );

  useEffect(() => {
    if (isPlaying) {
      if (lastTimestampRef.current !== null && startTimeRef.current !== null) {
        pausedAtRef.current += performance.now() - lastTimestampRef.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isPlaying, animate]);

  const handleReset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    startTimeRef.current = null;
    pausedAtRef.current = 0;
    lastTimestampRef.current = null;
    setFlights((prev) =>
      prev.map((flight) => ({
        ...flight,
        currentPoint: flight.butterfly.flight.trajectory.points[0],
        progress: 0,
      }))
    );
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const getPathD = (trajectory: Butterfly["flight"]["trajectory"]) => {
    return trajectory.points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
  };

  const getTrailD = (trajectory: Butterfly["flight"]["trajectory"], progress: number) => {
    const points = trajectory.points;
    const currentIndex = Math.floor(progress * points.length);
    return points
      .slice(0, currentIndex + 1)
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative w-full bg-gradient-to-br from-cream-50 via-white to-butterfly-green-light/20 rounded-3xl overflow-hidden border border-butterfly-pink/20 shadow-soft">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(210, 143, 184, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(134, 185, 142, 0.3) 0%, transparent 50%)
            `,
          }}
        />
        <svg
          viewBox="0 0 100 100"
          className="w-full relative z-10"
          style={{ height: `${height}px` }}
          preserveAspectRatio="none"
        >
          <defs>
            {flights.map((flight, i) => (
              <linearGradient
                key={`gradient-${i}`}
                id={`trail-gradient-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={flight.color} stopOpacity="0" />
                <stop offset="100%" stopColor={flight.color} stopOpacity="0.8" />
              </linearGradient>
            ))}
          </defs>

          {flights.map((flight, i) => (
            <g key={`trajectory-${i}`}>
              <path
                d={getPathD(flight.butterfly.flight.trajectory)}
                fill="none"
                stroke={flight.color}
                strokeWidth="0.3"
                strokeDasharray="1,2"
                opacity="0.3"
              />
              {showTrail && flight.currentPoint && (
                <path
                  d={getTrailD(flight.butterfly.flight.trajectory, flight.progress)}
                  fill="none"
                  stroke={`url(#trail-gradient-${i})`}
                  strokeWidth="0.6"
                  strokeLinecap="round"
                />
              )}
            </g>
          ))}

          {flights.map((flight, i) => (
            <g
              key={`butterfly-${i}`}
              style={{
                transform: flight.currentPoint
                  ? `translate(${flight.currentPoint.x - 2.5}%, ${flight.currentPoint.y - 2.5}%)`
                  : "translate(0, 0)",
                transition: isPlaying ? "none" : "transform 0.3s ease",
              }}
            >
              <foreignObject x="0" y="0" width="5" height="5">
                <div
                  className={cn(
                    "w-full h-full flex items-center justify-center",
                    isPlaying && "animate-flutter"
                  )}
                  style={{
                    filter: `drop-shadow(0 0 4px ${flight.color})`,
                    animationDuration: `${0.3 + (100 - flight.butterfly.flight.pattern.speed) * 0.01}s`,
                  }}
                >
                  <ButterflyIcon
                    className="w-4 h-4"
                    style={{ color: flight.color }}
                    strokeWidth={1.5}
                  />
                </div>
              </foreignObject>
              {flight.currentPoint && (
                <circle
                  cx="2.5"
                  cy="2.5"
                  r="2"
                  fill={flight.color}
                  opacity="0.3"
                  className="animate-ping"
                  style={{ transformOrigin: "center" }}
                />
              )}
            </g>
          ))}
        </svg>

        {showControls && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft border border-butterfly-pink/20">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-butterfly-pink-deep text-white hover:bg-butterfly-pink-deep/80 transition-colors"
              aria-label={isPlaying ? "暂停" : "播放"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" strokeWidth={2} />
              ) : (
                <Play className="w-4 h-4" strokeWidth={2} />
              )}
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-full bg-butterfly-green-deep text-white hover:bg-butterfly-green-deep/80 transition-colors"
              aria-label="重置"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      {butterflies.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {flights.map((flight, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-butterfly-pink/20"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: flight.color }}
              />
              <span className="text-xs font-medium text-butterfly-ink">
                {flight.butterfly.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
