import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Home,
  ChevronRight,
  Search,
  Wind,
  Clock,
  Mountain,
  Zap,
  BarChart3,
  Check,
  X,
  Sparkles,
  Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyFlightAnimation from "@/components/ButterflyFlightAnimation";
import { butterflies } from "@/data/butterflies";
import type { Butterfly, ActivityTimeType, FlightPatternType, FlightHabitatType } from "@/types";
import { cn } from "@/lib/utils";

const activityTimeConfig: Record<ActivityTimeType, { icon: string; color: string }> = {
  清晨活跃: { icon: "🌅", color: "bg-orange-100 text-orange-700" },
  上午活跃: { icon: "☀️", color: "bg-yellow-100 text-yellow-700" },
  中午活跃: { icon: "🌞", color: "bg-amber-100 text-amber-700" },
  下午活跃: { icon: "🌤️", color: "bg-blue-100 text-blue-700" },
  黄昏活跃: { icon: "🌇", color: "bg-purple-100 text-purple-700" },
  全天活跃: { icon: "🌟", color: "bg-indigo-100 text-indigo-700" },
  傍晚活跃: { icon: "🌆", color: "bg-pink-100 text-pink-700" },
};

const patternConfig: Record<FlightPatternType, { icon: string; color: string }> = {
  直线滑翔: { icon: "➡️", color: "bg-blue-100 text-blue-700" },
  波浪起伏: { icon: "〰️", color: "bg-cyan-100 text-cyan-700" },
  快速穿梭: { icon: "⚡", color: "bg-amber-100 text-amber-700" },
  优雅盘旋: { icon: "🌀", color: "bg-purple-100 text-purple-700" },
  飘忽不定: { icon: "🎭", color: "bg-pink-100 text-pink-700" },
  缓慢漂浮: { icon: "☁️", color: "bg-gray-100 text-gray-700" },
  敏捷跳跃: { icon: "🦘", color: "bg-green-100 text-green-700" },
};

const habitatConfig: Record<FlightHabitatType, { icon: string; color: string }> = {
  林冠层: { icon: "🌳", color: "bg-green-100 text-green-700" },
  林缘地带: { icon: "🌲", color: "bg-emerald-100 text-emerald-700" },
  开阔草地: { icon: "🌿", color: "bg-lime-100 text-lime-700" },
  花丛低空: { icon: "🌸", color: "bg-pink-100 text-pink-700" },
  溪流沿岸: { icon: "💧", color: "bg-blue-100 text-blue-700" },
  山顶高空: { icon: "⛰️", color: "bg-gray-100 text-gray-700" },
  竹林木中: { icon: "🎋", color: "bg-teal-100 text-teal-700" },
};

export default function FlightObservation() {
  const [searchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    const idsParam = searchParams.get("ids");
    if (idsParam) {
      const ids = idsParam.split(",").filter(Boolean);
      if (ids.length > 0) {
        return ids.slice(0, 5);
      }
    }
    return ["1", "2"];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"animation" | "compare">("animation");

  useEffect(() => {
    const idsParam = searchParams.get("ids");
    if (idsParam) {
      const ids = idsParam.split(",").filter(Boolean);
      if (ids.length > 0) {
        setSelectedIds(ids.slice(0, 5));
      }
    }
  }, [searchParams]);

  const filteredButterflies = useMemo(() => {
    if (!searchQuery.trim()) return butterflies;
    const lower = searchQuery.trim().toLowerCase();
    return butterflies.filter(
      (b) =>
        b.name.toLowerCase().includes(lower) ||
        b.family.toLowerCase().includes(lower) ||
        b.flight.pattern.patternType.toLowerCase().includes(lower)
    );
  }, [searchQuery]);

  const selectedButterflies = useMemo(() => {
    return butterflies.filter((b) => selectedIds.includes(b.id));
  }, [selectedIds]);

  const toggleButterfly = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        if (prev.length >= 5) {
          return [...prev.slice(1), id];
        }
        return [...prev, id];
      }
    });
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-8">
        <nav className="flex items-center gap-2 text-xs text-butterfly-ink/50 flex-wrap mb-8">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-butterfly-pink-deep transition-colors">
            <Home className="w-3.5 h-3.5" strokeWidth={2} />
            首页
          </Link>
          <ChevronRight className="w-3 h-3" strokeWidth={2} />
          <span className="text-butterfly-ink/80">飞行观察</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-40" />
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-butterfly-pink/30 blur-3xl animate-float"
          aria-hidden
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-butterfly-green/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />

        <div className="container relative mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-sm text-butterfly-pink-deep opacity-0 animate-fade-up">
              <Wind className="w-4 h-4" strokeWidth={1.8} />
              <span>探索蝴蝶飞行的奥秘</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-semibold text-butterfly-ink mb-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              蝴蝶飞行观察
            </h1>
            <p className="text-butterfly-ink/60 leading-relaxed mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              通过动画观察不同蝴蝶的飞行轨迹特征，了解它们的飞行习性、活动时间和飞行高度，
              并可以比较多个物种的飞行习惯差异。
            </p>

            <div className="flex justify-center gap-2 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <button
                onClick={() => setActiveTab("animation")}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                  activeTab === "animation"
                    ? "bg-butterfly-pink-deep text-white shadow-soft"
                    : "bg-white/70 text-butterfly-ink/70 hover:bg-white"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4" strokeWidth={1.8} />
                  飞行动画
                </span>
              </button>
              <button
                onClick={() => setActiveTab("compare")}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                  activeTab === "compare"
                    ? "bg-butterfly-pink-deep text-white shadow-soft"
                    : "bg-white/70 text-butterfly-ink/70 hover:bg-white"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" strokeWidth={1.8} />
                  习性对比
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Butterfly Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-butterfly-pink/20 shadow-soft sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-semibold text-butterfly-ink">
                    选择蝴蝶
                  </h3>
                  {selectedIds.length > 0 && (
                    <button
                      onClick={clearSelection}
                      className="text-xs text-butterfly-ink/50 hover:text-butterfly-pink-deep transition-colors"
                    >
                      清空
                    </button>
                  )}
                </div>

                <div className="relative mb-4">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-butterfly-ink/40"
                    strokeWidth={2}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索蝴蝶..."
                    className={cn(
                      "w-full pl-10 pr-4 py-2.5 rounded-2xl",
                      "bg-white border border-butterfly-pink/30",
                      "text-sm text-butterfly-ink placeholder:text-butterfly-ink/40",
                      "focus:outline-none focus:ring-2 focus:ring-butterfly-pink/50"
                    )}
                  />
                </div>

                <p className="text-xs text-butterfly-ink/50 mb-3">
                  已选择 {selectedIds.length}/5 只
                </p>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {filteredButterflies.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => toggleButterfly(b.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left",
                        selectedIds.includes(b.id)
                          ? "bg-butterfly-pink-light/40 border border-butterfly-pink/40"
                          : "bg-white/50 border border-transparent hover:bg-white"
                      )}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={b.image}
                          alt={b.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        {selectedIds.includes(b.id) && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-butterfly-pink-deep flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-butterfly-ink truncate">
                          {b.name}
                        </p>
                        <p className="text-xs text-butterfly-ink/50 truncate">
                          {b.flight.pattern.patternType}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {activeTab === "animation" ? (
                <>
                  {selectedButterflies.length > 0 ? (
                    <div className="opacity-0 animate-fade-up">
                      <ButterflyFlightAnimation
                        butterflies={selectedButterflies}
                        height={450}
                        showControls={true}
                        autoPlay={true}
                        showTrail={true}
                      />

                      {/* Flight Info Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {selectedButterflies.map((b, i) => (
                          <FlightInfoCard key={b.id} butterfly={b} index={i} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-butterfly-pink/20 shadow-soft text-center">
                      <div className="inline-flex w-20 h-20 items-center justify-center rounded-full bg-butterfly-pink-light/40 mb-6">
                        <Info className="w-10 h-10 text-butterfly-pink-deep/60" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-butterfly-ink mb-3">
                        请选择蝴蝶
                      </h3>
                      <p className="text-butterfly-ink/60">
                        从左侧列表中选择1-5只蝴蝶，即可查看它们的飞行动画
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {selectedButterflies.length >= 2 ? (
                    <FlightComparison butterflies={selectedButterflies} />
                  ) : (
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-butterfly-pink/20 shadow-soft text-center">
                      <div className="inline-flex w-20 h-20 items-center justify-center rounded-full bg-butterfly-green-light/40 mb-6">
                        <BarChart3 className="w-10 h-10 text-butterfly-green-deep/60" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-butterfly-ink mb-3">
                        请选择至少2只蝴蝶
                      </h3>
                      <p className="text-butterfly-ink/60">
                        从左侧列表中选择2-5只蝴蝶，即可对比它们的飞行习性差异
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-butterfly-ink text-cream-100/80 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-cream-100/40">
            © 2026 蝶语 Butterfly Whispers · Made with 🦋
          </p>
        </div>
      </footer>
    </div>
  );
}

function FlightInfoCard({ butterfly, index }: { butterfly: Butterfly; index: number }) {
  const pattern = patternConfig[butterfly.flight.pattern.patternType];
  const habitat = habitatConfig[butterfly.flight.altitude.habitat];

  return (
    <div
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-5 border border-butterfly-pink/20 shadow-soft opacity-0 animate-fade-up"
      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
    >
      <div className="flex items-start gap-4 mb-4">
        <img
          src={butterfly.image}
          alt={butterfly.name}
          className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
        />
        <div>
          <h4 className="font-display text-lg font-semibold text-butterfly-ink">
            {butterfly.name}
          </h4>
          <p className="text-xs text-butterfly-ink/50 font-serif italic">
            {butterfly.latinName}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-butterfly-pink-light/50 flex items-center justify-center">
            <Wind className="w-4 h-4 text-butterfly-pink-deep" strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-butterfly-ink/50">飞行模式</p>
            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", pattern.color)}>
              {pattern.icon} {butterfly.flight.pattern.patternType}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-butterfly-green-light/50 flex items-center justify-center">
            <Mountain className="w-4 h-4 text-butterfly-green-deep" strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-butterfly-ink/50">飞行高度</p>
            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", habitat.color)}>
              {habitat.icon} {butterfly.flight.altitude.preferredAltitude}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-butterfly-gold/20 flex items-center justify-center">
            <Clock className="w-4 h-4 text-butterfly-gold" strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-butterfly-ink/50">活动时间</p>
            <div className="flex flex-wrap gap-1">
              {butterfly.flight.activity.activeTime.map((t) => {
                const config = activityTimeConfig[t];
                return (
                  <span
                    key={t}
                    className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", config.color)}
                  >
                    {config.icon} {t}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
            <Zap className="w-4 h-4 text-orange-600" strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-butterfly-ink/50">速度 / 敏捷度</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-butterfly-pink to-butterfly-pink-deep rounded-full"
                  style={{ width: `${butterfly.flight.pattern.speed}%` }}
                />
              </div>
              <span className="text-xs font-medium text-butterfly-ink">
                {butterfly.flight.pattern.speed}
              </span>
              <span className="text-xs text-butterfly-ink/50">/</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-butterfly-green to-butterfly-green-deep rounded-full"
                  style={{ width: `${butterfly.flight.pattern.agility}%` }}
                />
              </div>
              <span className="text-xs font-medium text-butterfly-ink">
                {butterfly.flight.pattern.agility}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlightComparison({ butterflies }: { butterflies: Butterfly[] }) {
  const attributes = [
    {
      key: "speed",
      label: "飞行速度",
      icon: <Zap className="w-4 h-4" strokeWidth={1.8} />,
      getValue: (b: Butterfly) => b.flight.pattern.speed,
      max: 100,
    },
    {
      key: "agility",
      label: "敏捷度",
      icon: <Wind className="w-4 h-4" strokeWidth={1.8} />,
      getValue: (b: Butterfly) => b.flight.pattern.agility,
      max: 100,
    },
    {
      key: "maxAltitude",
      label: "最大飞行高度(米)",
      icon: <Mountain className="w-4 h-4" strokeWidth={1.8} />,
      getValue: (b: Butterfly) => b.flight.altitude.maxAltitude,
      max: 50,
    },
    {
      key: "minAltitude",
      label: "最低飞行高度(米)",
      icon: <Mountain className="w-4 h-4" strokeWidth={1.8} />,
      getValue: (b: Butterfly) => b.flight.altitude.minAltitude,
      max: 5,
    },
  ];

  const colors = [
    "from-pink-400 to-pink-600",
    "from-green-400 to-green-600",
    "from-amber-400 to-amber-600",
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
  ];

  return (
    <div className="space-y-6 opacity-0 animate-fade-up">
      {/* Animation Preview */}
      <ButterflyFlightAnimation
        butterflies={butterflies}
        height={350}
        showControls={true}
        autoPlay={true}
        showTrail={true}
      />

      {/* Attribute Comparison */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-butterfly-pink/20 shadow-soft">
        <h3 className="font-display text-xl font-semibold text-butterfly-ink mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-butterfly-pink-deep" strokeWidth={1.8} />
          属性对比
        </h3>

        <div className="space-y-6">
          {attributes.map((attr, attrIndex) => (
            <div key={attr.key}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-butterfly-pink-light/40 flex items-center justify-center text-butterfly-pink-deep">
                  {attr.icon}
                </div>
                <span className="text-sm font-medium text-butterfly-ink">
                  {attr.label}
                </span>
              </div>
              <div className="space-y-3">
                {butterflies.map((b, i) => {
                  const value = attr.getValue(b);
                  const percentage = (value / attr.max) * 100;
                  return (
                    <div key={b.id} className="flex items-center gap-3">
                      <img
                        src={b.image}
                        alt={b.name}
                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="text-xs text-butterfly-ink/70 w-24 truncate flex-shrink-0">
                        {b.name}
                      </span>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full bg-gradient-to-r rounded-full flex items-center justify-end pr-2", colors[i % colors.length])}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        >
                          <span className="text-[10px] font-bold text-white">
                            {value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pattern Comparison */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-butterfly-pink/20 shadow-soft">
        <h3 className="font-display text-xl font-semibold text-butterfly-ink mb-6 flex items-center gap-2">
          <Wind className="w-5 h-5 text-butterfly-pink-deep" strokeWidth={1.8} />
          飞行模式对比
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {butterflies.map((b, i) => {
            const pattern = patternConfig[b.flight.pattern.patternType];
            const habitat = habitatConfig[b.flight.altitude.habitat];
            return (
              <div key={b.id} className="bg-white/50 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-medium text-butterfly-ink">{b.name}</p>
                    <p className="text-xs text-butterfly-ink/50 font-serif italic">
                      {b.latinName}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-butterfly-ink/50 mb-1">飞行模式</p>
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", pattern.color)}>
                      {pattern.icon} {b.flight.pattern.patternType}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-butterfly-ink/50 mb-1">栖息环境</p>
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", habitat.color)}>
                      {habitat.icon} {b.flight.altitude.habitat}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-butterfly-ink/50 mb-1">活动时间</p>
                    <div className="flex flex-wrap gap-1">
                      {b.flight.activity.activeTime.map((t) => {
                        const config = activityTimeConfig[t];
                        return (
                          <span
                            key={t}
                            className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium", config.color)}
                          >
                            {config.icon} {t.replace("活跃", "")}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-butterfly-ink/50 mb-1">飞行高度</p>
                    <p className="text-sm font-medium text-butterfly-ink">
                      {b.flight.altitude.preferredAltitude}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-butterfly-ink/50 mb-1">翅振频率</p>
                    <p className="text-sm font-medium text-butterfly-ink">
                      {b.flight.pattern.wingbeatFrequency}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Habits Comparison */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-butterfly-pink/20 shadow-soft">
        <h3 className="font-display text-xl font-semibold text-butterfly-ink mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-butterfly-pink-deep" strokeWidth={1.8} />
          飞行习性对比
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {butterflies.map((b, i) => (
            <div key={b.id} className="bg-white/50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: ["#D28FB8", "#86B98E", "#D4A574", "#B4D4E8", "#E8B4B4"][i % 5] }}
                />
                <span className="font-medium text-butterfly-ink">{b.name}</span>
              </div>
              <div className="space-y-2">
                {b.flight.habits.map((habit, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-butterfly-pink-deep/60 mt-2 flex-shrink-0" />
                    <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                      {habit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description Comparison */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-butterfly-pink/20 shadow-soft">
        <h3 className="font-display text-xl font-semibold text-butterfly-ink mb-6 flex items-center gap-2">
          <Info className="w-5 h-5 text-butterfly-pink-deep" strokeWidth={1.8} />
          飞行描述对比
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {butterflies.map((b, i) => (
            <div key={b.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={b.image}
                  alt={b.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <span className="font-medium text-butterfly-ink">{b.name}</span>
              </div>
              <div className="space-y-3">
                <div className="bg-butterfly-pink-light/20 rounded-xl p-3">
                  <p className="text-xs text-butterfly-pink-deep font-medium mb-1">飞行特征</p>
                  <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                    {b.flight.pattern.description}
                  </p>
                </div>
                <div className="bg-butterfly-green-light/20 rounded-xl p-3">
                  <p className="text-xs text-butterfly-green-deep font-medium mb-1">活动规律</p>
                  <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                    {b.flight.activity.description}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3">
                  <p className="text-xs text-amber-700 font-medium mb-1">高度偏好</p>
                  <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                    {b.flight.altitude.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
