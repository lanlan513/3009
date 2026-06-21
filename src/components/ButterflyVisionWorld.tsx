import { useEffect, useRef, useState, useCallback } from "react";
import { Eye, Sparkles, Sun, Info, Play, Pause, RotateCcw, ZoomIn, ZoomOut, Move } from "lucide-react";
import { cn } from "@/lib/utils";

export type VisionMode = "human" | "butterfly";

interface Flower {
  x: number;
  y: number;
  radius: number;
  petalCount: number;
  petalColor: string;
  centerColor: string;
  uvPatternType: "ring" | "star" | "stripes" | "dots" | "concentric";
  uvIntensity: number;
  nectarGuide: boolean;
  hasNectar: boolean;
  nectarLevel: number;
  swayOffset: number;
  swaySpeed: number;
}

interface Butterfly {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  wingPhase: number;
  wingSpeed: number;
  size: number;
  wingColor: string;
  wingUVPattern: boolean;
  bodyColor: string;
  state: "flying" | "feeding" | "resting";
  stateTimer: number;
  targetFlower: number | null;
}

interface UVLightBeam {
  x: number;
  y: number;
  angle: number;
  length: number;
  opacity: number;
  speed: number;
}

interface ButterflyVisionWorldProps {
  visionMode: VisionMode;
  onToggleVision: () => void;
}

export default function ButterflyVisionWorld({ visionMode, onToggleVision }: ButterflyVisionWorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
  const [selectedButterfly, setSelectedButterfly] = useState<Butterfly | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);
  
  const flowersRef = useRef<Flower[]>([]);
  const butterfliesRef = useRef<Butterfly[]>([]);
  const uvBeamsRef = useRef<UVLightBeam[]>([]);
  const grassRef = useRef<{ x: number; height: number; swayOffset: number }[]>([]);

  const generateFlowers = useCallback((width: number, height: number) => {
    const flowerTypes = [
      { petalColor: "#FFD700", centerColor: "#8B4513", uvPattern: "ring" as const },
      { petalColor: "#9370DB", centerColor: "#FFD700", uvPattern: "star" as const },
      { petalColor: "#FF69B4", centerColor: "#FFD700", uvPattern: "stripes" as const },
      { petalColor: "#FF6347", centerColor: "#FFFF00", uvPattern: "concentric" as const },
      { petalColor: "#E6E6FA", centerColor: "#FFD700", uvPattern: "dots" as const },
      { petalColor: "#FF4500", centerColor: "#000000", uvPattern: "ring" as const },
      { petalColor: "#87CEEB", centerColor: "#FFD700", uvPattern: "star" as const },
    ];

    const flowers: Flower[] = [];
    const gridCols = 5;
    const gridRows = 4;
    const cellWidth = width / (gridCols + 1);
    const cellHeight = height / (gridRows + 1);

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const type = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        flowers.push({
          x: cellWidth * (col + 1) + (Math.random() - 0.5) * cellWidth * 0.5,
          y: cellHeight * (row + 1) + (Math.random() - 0.5) * cellHeight * 0.5,
          radius: 25 + Math.random() * 20,
          petalCount: 5 + Math.floor(Math.random() * 8),
          petalColor: type.petalColor,
          centerColor: type.centerColor,
          uvPatternType: type.uvPattern,
          uvIntensity: 0.6 + Math.random() * 0.4,
          nectarGuide: Math.random() > 0.2,
          hasNectar: Math.random() > 0.1,
          nectarLevel: 0.3 + Math.random() * 0.7,
          swayOffset: Math.random() * Math.PI * 2,
          swaySpeed: 0.8 + Math.random() * 0.5,
        });
      }
    }
    return flowers;
  }, []);

  const generateButterflies = useCallback((width: number, height: number) => {
    const butterflyTypes = [
      { wingColor: "#FF6B9D", wingUV: true, bodyColor: "#2D2D2D" },
      { wingColor: "#4ECDC4", wingUV: true, bodyColor: "#1A1A2E" },
      { wingColor: "#FFE66D", wingUV: true, bodyColor: "#2D2D2D" },
      { wingColor: "#95E1D3", wingUV: false, bodyColor: "#1A1A2E" },
      { wingColor: "#F38181", wingUV: true, bodyColor: "#2D2D2D" },
      { wingColor: "#AA96DA", wingUV: true, bodyColor: "#1A1A2E" },
      { wingColor: "#FCBAD3", wingUV: false, bodyColor: "#2D2D2D" },
    ];

    const butterflies: Butterfly[] = [];
    for (let i = 0; i < 8; i++) {
      const type = butterflyTypes[i % butterflyTypes.length];
      butterflies.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height * 0.6 + 50,
        targetX: Math.random() * width,
        targetY: Math.random() * height * 0.6 + 50,
        speed: 0.5 + Math.random() * 1,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: 0.15 + Math.random() * 0.1,
        size: 15 + Math.random() * 10,
        wingColor: type.wingColor,
        wingUVPattern: type.wingUV,
        bodyColor: type.bodyColor,
        state: "flying",
        stateTimer: 60 + Math.random() * 120,
        targetFlower: null,
      });
    }
    return butterflies;
  }, []);

  const generateGrass = useCallback((width: number, height: number) => {
    const grass: { x: number; height: number; swayOffset: number }[] = [];
    for (let i = 0; i < width; i += 8) {
      grass.push({
        x: i,
        height: 30 + Math.random() * 40,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }
    return grass;
  }, []);

  const generateUVBeams = useCallback((width: number, height: number) => {
    const beams: UVLightBeam[] = [];
    for (let i = 0; i < 15; i++) {
      beams.push({
        x: Math.random() * width,
        y: -20,
        angle: -Math.PI / 2 + (Math.random() - 0.5) * 0.3,
        length: height * 0.8 + Math.random() * height * 0.2,
        opacity: 0.1 + Math.random() * 0.2,
        speed: 0.3 + Math.random() * 0.5,
      });
    }
    return beams;
  }, []);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const applyButterflyVision = (r: number, g: number, b: number) => {
    const uvShift = 0.3;
    const newR = r * 0.7 + g * 0.2 + b * 0.1;
    const newG = r * 0.1 + g * 0.6 + b * 0.3;
    const newB = r * 0.2 + g * 0.3 + b * 0.5 + 255 * uvShift;
    return {
      r: Math.min(255, newR),
      g: Math.min(255, newG),
      b: Math.min(255, newB * 1.2),
    };
  };

  const drawFlower = (
    ctx: CanvasRenderingContext2D,
    flower: Flower,
    time: number,
    mode: VisionMode
  ) => {
    const swayX = Math.sin(time * flower.swaySpeed + flower.swayOffset) * 3;
    const swayY = Math.cos(time * flower.swaySpeed * 0.7 + flower.swayOffset) * 2;
    const x = flower.x + swayX;
    const y = flower.y + swayY;

    ctx.save();
    ctx.translate(x, y);

    for (let i = 0; i < flower.petalCount; i++) {
      const angle = (i / flower.petalCount) * Math.PI * 2;
      ctx.save();
      ctx.rotate(angle);

      let petalColor = flower.petalColor;
      if (mode === "butterfly") {
        const rgb = hexToRgb(petalColor);
        const butterflyRgb = applyButterflyVision(rgb.r, rgb.g, rgb.b);
        petalColor = `rgb(${butterflyRgb.r}, ${butterflyRgb.g}, ${butterflyRgb.b})`;
      }

      const petalGradient = ctx.createRadialGradient(
        0,
        -flower.radius * 0.5,
        0,
        0,
        -flower.radius * 0.5,
        flower.radius * 0.6
      );
      petalGradient.addColorStop(0, petalColor);
      petalGradient.addColorStop(1, shadeColor(petalColor, -20));

      ctx.fillStyle = petalGradient;
      ctx.beginPath();
      ctx.ellipse(
        0,
        -flower.radius * 0.5,
        flower.radius * 0.35,
        flower.radius * 0.6,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();
    }

    if (mode === "butterfly" && flower.nectarGuide && flower.hasNectar) {
      drawUVPattern(ctx, flower);
    }

    let centerColor = flower.centerColor;
    if (mode === "butterfly") {
      const rgb = hexToRgb(centerColor);
      const butterflyRgb = applyButterflyVision(rgb.r, rgb.g, rgb.b);
      centerColor = `rgb(${butterflyRgb.r}, ${butterflyRgb.g}, ${butterflyRgb.b})`;
    }

    const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, flower.radius * 0.4);
    centerGradient.addColorStop(0, shadeColor(centerColor, 20));
    centerGradient.addColorStop(1, centerColor);
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(0, 0, flower.radius * 0.35, 0, Math.PI * 2);
    ctx.fill();

    if (mode === "butterfly" && flower.hasNectar) {
      const nectarGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, flower.radius * 0.6);
      nectarGlow.addColorStop(0, `rgba(138, 43, 226, ${flower.nectarLevel * 0.6})`);
      nectarGlow.addColorStop(0.5, `rgba(75, 0, 130, ${flower.nectarLevel * 0.3})`);
      nectarGlow.addColorStop(1, "rgba(138, 43, 226, 0)");
      ctx.fillStyle = nectarGlow;
      ctx.beginPath();
      ctx.arc(0, 0, flower.radius * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const drawUVPattern = (ctx: CanvasRenderingContext2D, flower: Flower) => {
    ctx.save();
    const intensity = flower.uvIntensity;

    switch (flower.uvPatternType) {
      case "ring":
        ctx.strokeStyle = `rgba(138, 43, 226, ${intensity})`;
        ctx.lineWidth = 3;
        for (let r = flower.radius * 0.4; r < flower.radius * 0.9; r += 8) {
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;

      case "star":
        ctx.fillStyle = `rgba(138, 43, 226, ${intensity * 0.7})`;
        for (let i = 0; i < flower.petalCount; i++) {
          const angle = (i / flower.petalCount) * Math.PI * 2;
          ctx.save();
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, -flower.radius * 0.3);
          ctx.lineTo(flower.radius * 0.1, -flower.radius * 0.6);
          ctx.lineTo(-flower.radius * 0.1, -flower.radius * 0.6);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
        break;

      case "stripes":
        ctx.strokeStyle = `rgba(138, 43, 226, ${intensity})`;
        ctx.lineWidth = 2;
        for (let i = 0; i < flower.petalCount; i++) {
          const angle = (i / flower.petalCount) * Math.PI * 2;
          ctx.save();
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, -flower.radius * 0.2);
          ctx.lineTo(0, -flower.radius * 0.7);
          ctx.stroke();
          ctx.restore();
        }
        break;

      case "dots":
        ctx.fillStyle = `rgba(138, 43, 226, ${intensity})`;
        for (let i = 0; i < flower.petalCount; i++) {
          const angle = (i / flower.petalCount) * Math.PI * 2;
          const dotX = Math.cos(angle) * flower.radius * 0.5;
          const dotY = Math.sin(angle) * flower.radius * 0.5;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case "concentric":
        for (let i = 0; i < 3; i++) {
          const r = flower.radius * (0.3 + i * 0.2);
          const alpha = intensity * (1 - i * 0.25);
          ctx.fillStyle = `rgba(138, 43, 226, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
    }
    ctx.restore();
  };

  const drawButterfly = (
    ctx: CanvasRenderingContext2D,
    butterfly: Butterfly,
    time: number,
    mode: VisionMode
  ) => {
    const wingFlap = Math.sin(time * butterfly.wingSpeed * 10 + butterfly.wingPhase);
    const wingAngle = wingFlap * 0.6;

    ctx.save();
    ctx.translate(butterfly.x, butterfly.y);

    const dx = butterfly.targetX - butterfly.x;
    const dy = butterfly.targetY - butterfly.y;
    if (butterfly.state === "flying") {
      ctx.rotate(Math.atan2(dy, dx) + Math.PI / 2);
    }

    const size = butterfly.size;

    for (let side = -1; side <= 1; side += 2) {
      ctx.save();
      ctx.rotate(side * wingAngle);

      let wingColor = butterfly.wingColor;
      if (mode === "butterfly" && butterfly.wingUVPattern) {
        const rgb = hexToRgb(wingColor);
        const butterflyRgb = applyButterflyVision(rgb.r, rgb.g, rgb.b);
        wingColor = `rgb(${butterflyRgb.r}, ${butterflyRgb.g}, ${butterflyRgb.b})`;
      }

      const wingGradient = ctx.createRadialGradient(
        0,
        -size * 0.3,
        0,
        side * size * 0.3,
        -size * 0.5,
        size
      );
      wingGradient.addColorStop(0, wingColor);
      wingGradient.addColorStop(1, shadeColor(wingColor, -30));

      ctx.fillStyle = wingGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(side * size * 1.2, -size * 0.8, side * size * 0.8, -size * 1.5);
      ctx.quadraticCurveTo(side * size * 0.3, -size * 1.8, 0, -size * 1.2);
      ctx.quadraticCurveTo(-side * size * 0.3, -size * 1.8, -side * size * 0.8, -size * 1.5);
      ctx.quadraticCurveTo(-side * size * 1.2, -size * 0.8, 0, 0);
      ctx.fill();

      if (mode === "butterfly" && butterfly.wingUVPattern) {
        ctx.strokeStyle = "rgba(138, 43, 226, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(side * size * 0.4, -size * 0.8, size * 0.2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(side * size * 0.4, -size * 0.8, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = shadeColor(wingColor, -20);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(side * size * 0.6, size * 0.2, side * size * 0.4, size * 0.6);
      ctx.quadraticCurveTo(side * size * 0.2, size * 0.8, 0, size * 0.3);
      ctx.quadraticCurveTo(-side * size * 0.2, size * 0.8, -side * size * 0.4, size * 0.6);
      ctx.quadraticCurveTo(-side * size * 0.6, size * 0.2, 0, 0);
      ctx.fill();

      ctx.restore();
    }

    ctx.fillStyle = butterfly.bodyColor;
    ctx.beginPath();
    ctx.ellipse(0, -size * 0.3, size * 0.12, size * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = butterfly.bodyColor;
    ctx.lineWidth = 1.5;
    for (let i = -1; i <= 1; i += 2) {
      ctx.beginPath();
      ctx.moveTo(i * size * 0.08, -size * 0.9);
      ctx.quadraticCurveTo(i * size * 0.25, -size * 1.2, i * size * 0.2, -size * 1.4);
      ctx.stroke();

      ctx.fillStyle = butterfly.bodyColor;
      ctx.beginPath();
      ctx.arc(i * size * 0.2, -size * 1.4, size * 0.06, 0, Math.PI * 2);
      ctx.fill();
    }

    if (mode === "butterfly" && butterfly.wingUVPattern) {
      const glow = ctx.createRadialGradient(0, -size * 0.3, 0, 0, -size * 0.3, size * 1.5);
      glow.addColorStop(0, "rgba(138, 43, 226, 0.2)");
      glow.addColorStop(1, "rgba(138, 43, 226, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, -size * 0.3, size * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const drawBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    mode: VisionMode
  ) => {
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    if (mode === "butterfly") {
      skyGradient.addColorStop(0, "#E6D5FA");
      skyGradient.addColorStop(0.5, "#D4C5F0");
      skyGradient.addColorStop(1, "#C9B8E8");
    } else {
      skyGradient.addColorStop(0, "#87CEEB");
      skyGradient.addColorStop(0.5, "#B0E0E6");
      skyGradient.addColorStop(1, "#E0F7FA");
    }
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);

    const cloudPositions = [
      { x: 100, y: 80, scale: 1 },
      { x: 300, y: 50, scale: 0.8 },
      { x: 500, y: 100, scale: 1.2 },
      { x: 700, y: 60, scale: 0.9 },
    ];

    cloudPositions.forEach((cloud) => {
      const cloudX = (cloud.x + time * 5) % (width + 200) - 100;
      drawCloud(ctx, cloudX, cloud.y, cloud.scale, mode);
    });

    if (mode === "butterfly") {
      uvBeamsRef.current.forEach((beam) => {
        const beamX = (beam.x + time * beam.speed * 30) % (width + 100) - 50;
        const beamGradient = ctx.createLinearGradient(
          beamX,
          beam.y,
          beamX + Math.cos(beam.angle) * beam.length,
          beam.y + Math.sin(beam.angle) * beam.length
        );
        beamGradient.addColorStop(0, `rgba(138, 43, 226, ${beam.opacity * 0.5})`);
        beamGradient.addColorStop(0.5, `rgba(75, 0, 130, ${beam.opacity * 0.3})`);
        beamGradient.addColorStop(1, "rgba(138, 43, 226, 0)");

        ctx.fillStyle = beamGradient;
        ctx.beginPath();
        ctx.moveTo(beamX - 10, beam.y);
        ctx.lineTo(beamX + 10, beam.y);
        ctx.lineTo(
          beamX + Math.cos(beam.angle) * beam.length + 30,
          beam.y + Math.sin(beam.angle) * beam.length
        );
        ctx.lineTo(
          beamX + Math.cos(beam.angle) * beam.length - 30,
          beam.y + Math.sin(beam.angle) * beam.length
        );
        ctx.closePath();
        ctx.fill();
      });
    }

    const groundY = height * 0.7;
    const groundGradient = ctx.createLinearGradient(0, groundY, 0, height);
    if (mode === "butterfly") {
      groundGradient.addColorStop(0, "#90EE90");
      groundGradient.addColorStop(0.3, "#7CCD7C");
      groundGradient.addColorStop(1, "#6B8E6B");
    } else {
      groundGradient.addColorStop(0, "#98FB98");
      groundGradient.addColorStop(0.3, "#90EE90");
      groundGradient.addColorStop(1, "#228B22");
    }
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, groundY, width, height - groundY);

    grassRef.current.forEach((grass) => {
      const sway = Math.sin(time * 1.5 + grass.swayOffset) * 3;
      ctx.strokeStyle = mode === "butterfly" ? "#6B8E23" : "#228B22";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(grass.x, groundY);
      ctx.quadraticCurveTo(
        grass.x + sway,
        groundY - grass.height * 0.5,
        grass.x + sway * 1.5,
        groundY - grass.height
      );
      ctx.stroke();
    });
  };

  const drawCloud = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number,
    mode: VisionMode
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const cloudColor = mode === "butterfly" ? "rgba(230, 210, 250, 0.8)" : "rgba(255, 255, 255, 0.9)";
    ctx.fillStyle = cloudColor;

    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.arc(35, 0, 40, 0, Math.PI * 2);
    ctx.arc(70, 0, 30, 0, Math.PI * 2);
    ctx.arc(20, -20, 25, 0, Math.PI * 2);
    ctx.arc(50, -20, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const shadeColor = (color: string, percent: number) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255))
        .toString(16)
        .slice(1)
    );
  };

  const updateButterflies = useCallback(() => {
    const flowers = flowersRef.current;
    butterfliesRef.current.forEach((butterfly) => {
      butterfly.stateTimer--;

      if (butterfly.stateTimer <= 0) {
        if (butterfly.state === "flying") {
          const nearbyFlowers = flowers.filter(
            (f) =>
              Math.hypot(f.x - butterfly.x, f.y - butterfly.y) < 150 &&
              f.hasNectar &&
              f.nectarLevel > 0.2
          );
          if (nearbyFlowers.length > 0 && Math.random() > 0.3) {
            const targetFlower = nearbyFlowers[Math.floor(Math.random() * nearbyFlowers.length)];
            butterfly.targetX = targetFlower.x;
            butterfly.targetY = targetFlower.y - 10;
            butterfly.targetFlower = flowers.indexOf(targetFlower);
            butterfly.state = "feeding";
            butterfly.stateTimer = 120 + Math.random() * 180;
          } else {
            butterfly.targetX = 100 + Math.random() * (containerRef.current?.clientWidth || 800) - 200;
            butterfly.targetY = 50 + Math.random() * 300;
            butterfly.stateTimer = 180 + Math.random() * 240;
          }
        } else if (butterfly.state === "feeding") {
          if (butterfly.targetFlower !== null) {
            const flower = flowers[butterfly.targetFlower];
            if (flower) {
              flower.nectarLevel = Math.max(0, flower.nectarLevel - 0.1);
              if (flower.nectarLevel < 0.1) {
                flower.hasNectar = false;
                setTimeout(() => {
                  flower.hasNectar = true;
                  flower.nectarLevel = 0.5 + Math.random() * 0.5;
                }, 10000 + Math.random() * 20000);
              }
            }
          }
          butterfly.state = "flying";
          butterfly.targetFlower = null;
          butterfly.targetX = 100 + Math.random() * (containerRef.current?.clientWidth || 800) - 200;
          butterfly.targetY = 50 + Math.random() * 300;
          butterfly.stateTimer = 180 + Math.random() * 240;
        }
      }

      if (butterfly.state === "flying") {
        const dx = butterfly.targetX - butterfly.x;
        const dy = butterfly.targetY - butterfly.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 5) {
          butterfly.x += (dx / dist) * butterfly.speed;
          butterfly.y += (dy / dist) * butterfly.speed;
          butterfly.y += Math.sin(timeRef.current * 3 + butterfly.id) * 0.5;
        }
      }
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      flowersRef.current = generateFlowers(width, height);
      butterfliesRef.current = generateButterflies(width, height);
      grassRef.current = generateGrass(width, height);
      uvBeamsRef.current = generateUVBeams(width, height);
    }

    if (isPlaying) {
      timeRef.current += 0.016;
      updateButterflies();
    }

    ctx.clearRect(0, 0, width, height);

    drawBackground(ctx, width, height, timeRef.current, visionMode);

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    flowersRef.current.forEach((flower) => {
      drawFlower(ctx, flower, timeRef.current, visionMode);
    });

    butterfliesRef.current.forEach((butterfly) => {
      drawButterfly(ctx, butterfly, timeRef.current, visionMode);
    });

    ctx.restore();

    animationRef.current = requestAnimationFrame(animate);
  }, [visionMode, isPlaying, zoom, pan, generateFlowers, generateButterflies, generateGrass, generateUVBeams, updateButterflies]);

  useEffect(() => {
    animate();
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    let clickedFlower: Flower | null = null;
    flowersRef.current.forEach((flower) => {
      if (Math.hypot(flower.x - x, flower.y - y) < flower.radius * 1.2) {
        clickedFlower = flower;
      }
    });

    let clickedButterfly: Butterfly | null = null;
    butterfliesRef.current.forEach((butterfly) => {
      if (Math.hypot(butterfly.x - x, butterfly.y - y) < butterfly.size * 1.5) {
        clickedButterfly = butterfly;
      }
    });

    setSelectedFlower(clickedFlower);
    setSelectedButterfly(clickedButterfly);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(0.5, Math.min(2, prev * delta)));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedFlower(null);
    setSelectedButterfly(null);
  };

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
      >
        <canvas
          ref={canvasRef}
          className={cn(
            "w-full h-full cursor-crosshair",
            isDragging && "cursor-grabbing"
          )}
          onClick={handleCanvasClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        />

        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur text-xs font-medium",
              visionMode === "butterfly"
                ? "bg-violet-600/80 text-white"
                : "bg-white/80 text-amber-700"
            )}
          >
            {visionMode === "butterfly" ? "🦋 蝴蝶视角" : "👁️ 人类视角"}
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors text-butterfly-ink"
            title={isPlaying ? "暂停" : "播放"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setZoom((prev) => Math.min(2, prev * 1.2))}
            className="p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors text-butterfly-ink"
            title="放大"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={() => setZoom((prev) => Math.max(0.5, prev * 0.8))}
            className="p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors text-butterfly-ink"
            title="缩小"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={resetView}
            className="p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors text-butterfly-ink"
            title="重置视图"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-xs text-butterfly-ink/60">
          <Move className="w-3.5 h-3.5" />
          拖拽移动 · 滚轮缩放 · 点击物体查看详情
        </div>

        {showTutorial && (
          <div className="absolute bottom-4 right-4 max-w-sm p-4 rounded-2xl bg-white/95 backdrop-blur shadow-lg border border-violet-200 animate-fade-up">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-violet-100 text-violet-600 flex-shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-butterfly-ink mb-1">蝴蝶视觉世界</h4>
                <p className="text-sm text-butterfly-ink/70 leading-relaxed mb-2">
                  使用页面顶部的「人类视角/蝴蝶视角」切换按钮，观察花瓣上隐藏的紫外线蜜源标记。点击花朵或蝴蝶了解更多信息！
                </p>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="text-xs text-violet-600 font-medium hover:underline"
                >
                  知道了
                </button>
              </div>
              <button
                onClick={() => setShowTutorial(false)}
                className="text-butterfly-ink/40 hover:text-butterfly-ink"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {(selectedFlower || selectedButterfly) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 animate-fade-up">
            <div className="p-4 rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-butterfly-pink/20">
              {selectedFlower && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-5 h-5 text-amber-500" />
                    <h4 className="font-semibold text-butterfly-ink">花朵信息</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 rounded-xl bg-amber-50">
                      <p className="text-xs text-amber-600 mb-0.5">蜜源状态</p>
                      <p className="font-medium text-butterfly-ink">
                        {selectedFlower.hasNectar && selectedFlower.nectarLevel > 0.1
                          ? `有花蜜 (${Math.round(selectedFlower.nectarLevel * 100)}%)`
                          : "花蜜已耗尽"}
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-violet-50">
                      <p className="text-xs text-violet-600 mb-0.5">UV图案</p>
                      <p className="font-medium text-butterfly-ink">
                        {selectedFlower.nectarGuide ? "可见蜜源标记" : "无特殊标记"}
                      </p>
                    </div>
                  </div>
                  {visionMode === "human" && (
                    <p className="mt-3 text-xs text-butterfly-ink/60">
                      💡 切换到蝴蝶视角查看这朵花的紫外线蜜源标记图案
                    </p>
                  )}
                </div>
              )}
              {selectedButterfly && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-violet-500" />
                    <h4 className="font-semibold text-butterfly-ink">蝴蝶信息</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 rounded-xl bg-pink-50">
                      <p className="text-xs text-pink-600 mb-0.5">当前状态</p>
                      <p className="font-medium text-butterfly-ink">
                        {selectedButterfly.state === "flying"
                          ? "飞行中"
                          : selectedButterfly.state === "feeding"
                          ? "采蜜中"
                          : "休息中"}
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-violet-50">
                      <p className="text-xs text-violet-600 mb-0.5">翅膀UV信号</p>
                      <p className="font-medium text-butterfly-ink">
                        {selectedButterfly.wingUVPattern ? "有紫外线图案" : "无紫外线图案"}
                      </p>
                    </div>
                  </div>
                  {visionMode === "human" && selectedButterfly.wingUVPattern && (
                    <p className="mt-3 text-xs text-butterfly-ink/60">
                      💡 切换到蝴蝶视角查看这只蝴蝶翅膀上的紫外线信号
                    </p>
                  )}
                </div>
              )}
              <button
                onClick={() => {
                  setSelectedFlower(null);
                  setSelectedButterfly(null);
                }}
                className="mt-3 w-full py-1.5 rounded-xl bg-butterfly-pink-light/50 text-butterfly-pink-deep text-sm font-medium hover:bg-butterfly-pink-light/70 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-amber-600" />
            <h4 className="font-semibold text-butterfly-ink">人类视觉</h4>
          </div>
          <p className="text-sm text-butterfly-ink/70 leading-relaxed">
            三色视觉（红、绿、蓝），约100万种色彩。无法感知紫外线波段，花瓣颜色均匀一致。
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <h4 className="font-semibold text-butterfly-ink">蝴蝶视觉</h4>
          </div>
          <p className="text-sm text-butterfly-ink/70 leading-relaxed">
            四色视觉（紫外线、蓝、绿、红），可感知300-700nm波长，能看见花瓣上隐藏的蜜源标记。
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-emerald-600" />
            <h4 className="font-semibold text-butterfly-ink">蜜源标记</h4>
          </div>
          <p className="text-sm text-butterfly-ink/70 leading-relaxed">
            花朵进化出仅在紫外线下可见的图案，引导蝴蝶精准降落在花蜜入口，是花蝶协同进化的杰作。
          </p>
        </div>
      </div>
    </div>
  );
}
