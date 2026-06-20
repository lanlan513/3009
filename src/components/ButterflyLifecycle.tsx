import { useState, useEffect, useCallback } from "react";
import { Egg, Bug, Leaf, Bird, ChevronRight, Play, Pause, RotateCcw, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import ButterflyIcon from "./ButterflyIcon";

const img = (prompt: string) =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=landscape_16_9`;

interface LifecycleStage {
  id: string;
  label: string;
  subtitle: string;
  duration: string;
  icon: React.ReactNode;
  color: string;
  colorHex: string;
  bgColor: string;
  bgGradient: string;
  borderColor: string;
  ringColor: string;
  image: string;
  description: string;
  details: string[];
  stageNum: string;
}

const stages: LifecycleStage[] = [
  {
    id: "egg",
    label: "卵",
    subtitle: "Egg",
    duration: "3 – 7 天",
    icon: <Egg className="w-5 h-5" strokeWidth={1.8} />,
    color: "text-amber-700",
    colorHex: "#B45309",
    bgColor: "bg-amber-100",
    bgGradient: "from-amber-200 via-amber-100 to-amber-50",
    borderColor: "border-amber-300",
    ringColor: "ring-amber-300",
    image: img("Close-up of tiny butterfly eggs on a green leaf, delicate pearl-like spheres, nature macro photography, soft morning light, high detail"),
    description: "蝴蝶生命的起点是一颗微小的卵。雌蝶精心挑选寄主植物，将卵产在叶片背面或嫩芽上，为即将诞生的幼虫准备食物。每一颗卵都是生命的承诺，蕴含着化蝶的全部可能。",
    details: [
      "卵呈球形或半球形，直径仅 1 – 2 毫米",
      "表面有精巧的纹理和微孔，如同珠宝般精致",
      "不同蝶种卵的颜色各异：白、黄、绿、橙皆有",
      "孵化前卵壳变透明，可见幼虫轮廓",
    ],
    stageNum: "01",
  },
  {
    id: "larva",
    label: "幼虫",
    subtitle: "Larva",
    duration: "2 – 5 周",
    icon: <Bug className="w-5 h-5" strokeWidth={1.8} />,
    color: "text-green-700",
    colorHex: "#15803D",
    bgColor: "bg-green-100",
    bgGradient: "from-green-200 via-green-100 to-green-50",
    borderColor: "border-green-300",
    ringColor: "ring-green-300",
    image: img("A colorful caterpillar on a leaf, vibrant green with patterns, feeding, nature macro photography, detailed texture, natural setting"),
    description: "幼虫（毛虫）是蝴蝶的取食和生长阶段。它们几乎不停地进食，体重可在数周内增长数千倍，经历多次蜕皮以适应不断增长的身体。这是生命中最贪婪的时光，也是积蓄力量的阶段。",
    details: [
      "幼虫需经历 4 – 6 次蜕皮，每次称为一个龄期",
      "部分幼虫具有警戒色或拟态来防御天敌",
      "凤蝶幼虫受惊时会伸出橙色的臭角释放气味",
      "有的幼虫与蚂蚁形成共生关系，获得保护",
    ],
    stageNum: "02",
  },
  {
    id: "pupa",
    label: "蛹",
    subtitle: "Pupa",
    duration: "1 – 2 周",
    icon: <Leaf className="w-5 h-5" strokeWidth={1.8} />,
    color: "text-emerald-700",
    colorHex: "#047857",
    bgColor: "bg-emerald-100",
    bgGradient: "from-emerald-200 via-emerald-100 to-emerald-50",
    borderColor: "border-emerald-300",
    ringColor: "ring-emerald-300",
    image: img("A beautiful butterfly chrysalis hanging from a branch, golden and jade green colors, metallic sheen, nature macro photography, ethereal"),
    description: "蛹是蝴蝶最神秘的阶段。在蛹壳内，幼虫的身体结构被完全分解重组，从爬行的毛虫蜕变为翩翩飞蝶，这是自然界最壮观的变态过程。在寂静中，生命悄然重塑。",
    details: [
      "凤蝶蛹常呈翠绿色或枯棕色，完美融入环境",
      "蛹壳透明处可见翅膀纹理逐渐形成",
      "蛹通过丝垫和腰带固定在枝条上",
      "部分蛹壳具有金属光泽，可反射阳光",
    ],
    stageNum: "03",
  },
  {
    id: "adult",
    label: "成蝶",
    subtitle: "Adult",
    duration: "2 – 4 周",
    icon: <Bird className="w-5 h-5" strokeWidth={1.8} />,
    color: "text-pink-700",
    colorHex: "#BE185D",
    bgColor: "bg-pink-100",
    bgGradient: "from-pink-200 via-pink-100 to-pink-50",
    borderColor: "border-pink-300",
    ringColor: "ring-pink-300",
    image: img("A magnificent butterfly freshly emerged with spread wings drying in sunlight, vibrant colors, nature photography, magical moment, high detail"),
    description: "羽化是蝴蝶生命中最壮丽的时刻。成蝶破蛹而出，展开皱缩的翅膀，等待其干燥硬化后便开始自由的飞翔生活，完成传粉、求偶和繁殖的使命。破茧成蝶的瞬间，是生命最美的绽放。",
    details: [
      "刚羽化时翅膀湿润皱缩，需 1 – 2 小时展开",
      "成蝶的主要任务是交配繁殖，延续种群",
      "帝王蝶可飞行数千公里完成壮观迁徙",
      "部分蝴蝶寿命仅数天，越冬蝶可存活数月",
    ],
    stageNum: "04",
  },
];

export default function ButterflyLifecycle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const active = stages[activeIndex];

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % stages.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, goToNext]);

  const handleStageClick = (index: number) => {
    setActiveIndex(index);
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    }
  };

  const reset = () => {
    setActiveIndex(0);
    setIsAutoPlaying(false);
  };

  const progressPercent = ((activeIndex + 1) / stages.length) * 100;

  return (
    <section className="py-24 bg-cream-100 relative overflow-hidden">
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-butterfly-green-light/30 blur-3xl animate-float"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-butterfly-pink-light/40 blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
        aria-hidden
      />
      <ButterflyIcon
        className="hidden md:block absolute top-20 left-[10%] w-5 h-5 text-butterfly-pink-deep/40 animate-flutter"
        strokeWidth={1}
        style={{ animationDelay: "0.5s" }}
        aria-hidden
      />
      <ButterflyIcon
        className="hidden md:block absolute bottom-32 right-[8%] w-7 h-7 text-butterfly-green-deep/30 animate-flutter"
        strokeWidth={1}
        style={{ animationDelay: "1.5s" }}
        aria-hidden
      />
      <ButterflyIcon
        className="hidden md:block absolute top-40 right-[25%] w-4 h-4 text-butterfly-gold/50 animate-flutter"
        strokeWidth={1}
        style={{ animationDelay: "2.5s" }}
        aria-hidden
      />

      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-white/60 backdrop-blur text-sm">
            <Sparkles className="w-4 h-4 text-butterfly-gold" strokeWidth={1.8} />
            <span className="text-butterfly-green-deep font-medium tracking-wide uppercase">
              Life Cycle
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-butterfly-ink mb-4 text-balance">
            生命周期 · <span className="italic text-butterfly-pink-deep">蝶变之旅</span>
          </h2>
          <p className="text-butterfly-ink/60 max-w-xl mx-auto leading-relaxed text-base md:text-lg">
            从一颗微小的卵到翩翩飞舞的蝴蝶，每一次蜕变都是自然最壮丽的奇迹
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative mb-16">
            <div className="absolute top-8 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-200 via-green-200 to-pink-200 rounded-full" aria-hidden />
            <div
              className="absolute top-8 left-0 h-[2px] rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${progressPercent}%`,
                background: `linear-gradient(90deg, ${stages[0].colorHex}, ${stages[activeIndex].colorHex})`,
              }}
              aria-hidden
            />

            <div className="relative flex items-start justify-between px-2">
              {stages.map((stage, i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;

                return (
                  <div key={stage.id} className="flex flex-col items-center relative">
                    <button
                      onClick={() => handleStageClick(i)}
                      className={cn(
                        "relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500",
                        "ring-4 ring-offset-4 ring-offset-cream-100 group",
                        isActive
                          ? `${stage.bgColor} ${stage.color} ${stage.ringColor} scale-110 shadow-xl`
                          : isPast
                          ? "bg-gradient-to-br from-butterfly-green-light/60 to-butterfly-green/40 text-butterfly-green-deep ring-butterfly-green-light/60"
                          : "bg-white/80 text-butterfly-ink/30 ring-cream-200 hover:ring-butterfly-pink-light hover:bg-white hover:text-butterfly-ink/50"
                      )}
                    >
                      <div
                        className={cn(
                          "transition-transform duration-300",
                          isActive && "scale-110"
                        )}
                      >
                        {stage.icon}
                      </div>
                      {isActive && (
                        <>
                          <span
                            className={cn(
                              "absolute inset-0 rounded-full animate-ping opacity-30",
                              stage.bgColor
                            )}
                          />
                          <span
                            className="absolute -inset-1 rounded-full animate-timeline-pulse"
                            style={{
                              boxShadow: `0 0 0 0 ${stage.colorHex}40`,
                            }}
                          />
                        </>
                      )}
                      {isPast && !isActive && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-butterfly-green text-white flex items-center justify-center text-xs font-bold shadow-md">
                          ✓
                        </div>
                      )}
                    </button>

                    <div className="mt-4 text-center">
                      <span
                        className={cn(
                          "font-display text-xl md:text-2xl font-semibold transition-all duration-300 block",
                          isActive ? stage.color : isPast ? "text-butterfly-green-deep" : "text-butterfly-ink/30"
                        )}
                      >
                        {stage.label}
                      </span>
                      <span
                        className={cn(
                          "text-xs italic font-serif transition-colors duration-300",
                          isActive ? "text-butterfly-ink/50" : "text-butterfly-ink/20"
                        )}
                      >
                        {stage.subtitle}
                      </span>
                      <div
                        className={cn(
                          "mt-1.5 transition-all duration-500 overflow-hidden",
                          isActive || isPast ? "max-h-8 opacity-100" : "max-h-0 opacity-0"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium",
                            isActive ? `${stage.bgColor} ${stage.color}` : "bg-butterfly-green-light/20 text-butterfly-green-deep/60"
                          )}
                        >
                          <Clock className="w-2.5 h-2.5" strokeWidth={2} />
                          {stage.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-10">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                isAutoPlaying
                  ? "bg-butterfly-pink-deep text-white shadow-soft hover:shadow-hover"
                  : "bg-white/80 text-butterfly-ink/70 hover:bg-white hover:text-butterfly-ink border border-butterfly-ink/10"
              )}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" strokeWidth={2} />
                  暂停自动播放
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" strokeWidth={2} />
                  自动播放
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-white/80 text-butterfly-ink/70 hover:bg-white hover:text-butterfly-ink border border-butterfly-ink/10 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={2} />
              重新开始
            </button>
          </div>

          <div
            key={active.id}
            className="relative rounded-[2rem] overflow-hidden opacity-0 animate-lifecycle-fade-in"
          >
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-40",
                active.bgGradient
              )}
              aria-hidden
            />
            <div className="absolute inset-0 bg-grain opacity-20" aria-hidden />

            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-0 bg-white/40 backdrop-blur-sm">
              <div className="md:col-span-3 relative">
                <div className="aspect-[16/10] md:aspect-auto md:h-full relative overflow-hidden">
                  <img
                    src={active.image}
                    alt={active.label}
                    className="w-full h-full object-cover transition-transform duration-1000 scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/60 md:to-white/80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  <div className="absolute top-5 left-5">
                    <span
                      className={cn(
                        "font-display text-7xl md:text-8xl font-bold opacity-20",
                        active.color
                      )}
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {active.stageNum}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "absolute bottom-5 left-5 inline-flex items-center gap-2.5 px-4 py-2 rounded-full",
                      "bg-white/90 backdrop-blur-md shadow-lg",
                      active.color
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center",
                        active.bgColor
                      )}
                    >
                      {active.icon}
                    </div>
                    <div>
                      <span className="font-display text-base font-semibold block leading-tight">
                        {active.label}阶段
                      </span>
                      <span className="text-[11px] opacity-60 italic font-serif">
                        {active.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 p-7 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shadow-md",
                      active.bgColor,
                      active.color
                    )}
                  >
                    {active.icon}
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "font-display text-3xl font-semibold leading-none",
                        active.color
                      )}
                    >
                      {active.label}
                    </h3>
                    <span className="text-sm italic font-serif text-butterfly-ink/40">
                      {active.subtitle}
                    </span>
                  </div>
                </div>

                <p className="text-butterfly-ink/70 leading-relaxed mb-6 text-[15px]">
                  {active.description}
                </p>

                <ul className="space-y-3 mb-7">
                  {active.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-butterfly-ink/65 animate-lifecycle-fade-in"
                      style={{ animationDelay: `${i * 0.1 + 0.3}s` }}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                          active.bgColor,
                          active.color
                        )}
                      >
                        <ChevronRight className="w-3 h-3" strokeWidth={2.5} />
                      </span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2.5">
                  {stages.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => handleStageClick(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        i === activeIndex
                          ? "w-10"
                          : "w-5 hover:w-7"
                      )}
                      style={{
                        backgroundColor:
                          i === activeIndex
                            ? s.colorHex
                            : i < activeIndex
                            ? "#86B98E"
                            : "#E5D9D0",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm">
              {stages.map((s, i) => (
                <span key={s.id} className="flex items-center">
                  <button
                    onClick={() => handleStageClick(i)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all duration-300 font-display",
                      i === activeIndex
                        ? cn(s.bgColor, s.color, "font-semibold")
                        : "text-butterfly-ink/40 hover:text-butterfly-ink/70 hover:bg-white/60"
                    )}
                  >
                    {s.label}
                  </button>
                  {i < stages.length - 1 && (
                    <ButterflyIcon
                      className={cn(
                        "w-3 h-3 mx-1 transition-colors duration-300",
                        i < activeIndex ? "text-butterfly-green" : "text-butterfly-ink/15"
                      )}
                      strokeWidth={1.5}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
