import { useState, useMemo } from "react";
import {
  Eye,
  Sparkles,
  Sun,
  Flower2,
  ArrowRightLeft,
  BookOpen,
  ChevronRight,
  Info,
  Zap,
  ScanEye,
  Target,
  Shield,
  Heart,
  Leaf,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyIcon from "@/components/ButterflyIcon";
import ButterflyVisionWorld from "@/components/ButterflyVisionWorld";
import { cn } from "@/lib/utils";
import {
  butterflyVisionCapability,
  flowerSignals,
  visionScenarios,
  visionComparisonFacts,
} from "@/data/butterflyVision";
import type { VisionScenario, FlowerSignal, VisionScenarioCategory } from "@/types";

type VisionMode = "human" | "butterfly";

const categoryIcons: Record<VisionScenarioCategory, typeof Eye> = {
  "觅食导航": Target,
  "配偶识别": Heart,
  "领地防御": Shield,
  "天敌规避": ScanEye,
  "产卵选择": Leaf,
};

const categoryColors: Record<VisionScenarioCategory, string> = {
  "觅食导航": "bg-butterfly-pink-deep",
  "配偶识别": "bg-rose-500",
  "领地防御": "bg-butterfly-green-deep",
  "天敌规避": "bg-amber-500",
  "产卵选择": "bg-emerald-600",
};

function VisionToggle({
  mode,
  onToggle,
}: {
  mode: VisionMode;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative inline-flex items-center h-14 rounded-full p-1 transition-all duration-500",
        mode === "human"
          ? "bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100"
          : "bg-gradient-to-r from-violet-300 via-indigo-300 to-blue-300"
      )}
    >
      <span
        className={cn(
          "absolute left-1.5 top-1.5 w-[calc(50%-4px)] h-[calc(100%-12px)] rounded-full transition-all duration-500 shadow-md",
          mode === "human"
            ? "translate-x-0 bg-white"
            : "translate-x-full bg-white/90"
        )}
      />
      <span
        className={cn(
          "relative z-10 flex items-center gap-2 px-6 py-2 text-sm font-semibold transition-colors duration-300",
          mode === "human"
            ? "text-butterfly-ink"
            : "text-butterfly-ink/50"
        )}
      >
        <Eye className="w-4 h-4" />
        人类视角
      </span>
      <span
        className={cn(
          "relative z-10 flex items-center gap-2 px-6 py-2 text-sm font-semibold transition-colors duration-300",
          mode === "butterfly"
            ? "text-violet-900"
            : "text-butterfly-ink/50"
        )}
      >
        <Sparkles className="w-4 h-4" />
        蝴蝶视角
      </span>
    </button>
  );
}

function SceneCard({
  scenario,
  visionMode,
  selected,
  onClick,
}: {
  scenario: VisionScenario;
  visionMode: VisionMode;
  selected: boolean;
  onClick: () => void;
}) {
  const CategoryIcon = categoryIcons[scenario.category];

  return (
    <div
      onClick={onClick}
      className={cn(
        "group rounded-3xl overflow-hidden bg-white shadow-card card-hover cursor-pointer",
        selected && "ring-2 ring-violet-500 ring-offset-2"
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={scenario.sceneImage}
          alt={scenario.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500",
            visionMode === "butterfly"
              ? "bg-gradient-to-b from-violet-500/30 via-indigo-400/20 to-purple-600/40 mix-blend-multiply"
              : "bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-80"
          )}
        />
        {visionMode === "butterfly" && (
          <div className="absolute inset-0 animate-pulse opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/30 via-transparent to-indigo-400/30" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur text-[11px] font-semibold text-white",
              categoryColors[scenario.category]
            )}
          >
            <CategoryIcon className="w-3 h-3" />
            {scenario.category}
          </span>
        </div>
        {visionMode === "butterfly" && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-600/80 backdrop-blur text-[11px] font-semibold text-white">
              <Sparkles className="w-3 h-3" />
              UV视觉
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="font-display text-lg font-semibold">{scenario.title}</p>
          <p className="text-xs opacity-80 font-serif italic">{scenario.subtitle}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-butterfly-ink/60 leading-relaxed line-clamp-3">
          {visionMode === "human"
            ? scenario.humanDescription
            : scenario.butterflyDescription}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-butterfly-ink/40">
              UV图案: {scenario.uvPatterns.length}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-violet-600 font-medium">
            查看详情
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

function ScenarioDetail({
  scenario,
  visionMode,
  onToggleVision,
  onClose,
}: {
  scenario: VisionScenario;
  visionMode: VisionMode;
  onToggleVision: () => void;
  onClose: () => void;
}) {
  const CategoryIcon = categoryIcons[scenario.category];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-cream-50 shadow-2xl animate-fade-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur text-butterfly-ink/60 hover:bg-white hover:text-butterfly-ink transition-colors"
        >
          ×
        </button>

        <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
          <img
            src={scenario.sceneImage}
            alt={scenario.title}
            className="w-full h-full object-cover"
          />
          <div
            className={cn(
              "absolute inset-0 transition-all duration-500",
              visionMode === "butterfly"
                ? "bg-gradient-to-b from-violet-500/30 via-indigo-400/20 to-purple-600/40 mix-blend-multiply"
                : "bg-gradient-to-t from-black/60 via-transparent to-transparent"
            )}
          />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white",
                  categoryColors[scenario.category]
                )}
              >
                <CategoryIcon className="w-3 h-3" />
                {scenario.category}
              </span>
              {visionMode === "butterfly" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-600/80 text-[11px] font-semibold text-white">
                  <Sparkles className="w-3 h-3" />
                  UV视觉模式
                </span>
              )}
            </div>
            <p className="font-display text-3xl font-semibold">{scenario.title}</p>
            <p className="text-sm opacity-80 font-serif italic">{scenario.subtitle}</p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center justify-center mb-6">
            <VisionToggle mode={visionMode} onToggle={onToggleVision} />
          </div>

          <div
            className={cn(
              "p-5 rounded-2xl mb-6 transition-all duration-500",
              visionMode === "butterfly"
                ? "bg-gradient-to-br from-violet-100 via-indigo-50 to-purple-100 border border-violet-200"
                : "bg-gradient-to-br from-amber-50 via-white to-orange-50 border border-amber-200"
            )}
          >
            <div className="flex items-start gap-3">
              {visionMode === "butterfly" ? (
                <Sparkles className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
              ) : (
                <Eye className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p
                  className={cn(
                    "text-sm font-semibold mb-1",
                    visionMode === "butterfly" ? "text-violet-700" : "text-amber-700"
                  )}
                >
                  {visionMode === "human" ? "👁 人类所见" : "🦋 蝴蝶所见"}
                </p>
                <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                  {visionMode === "human"
                    ? scenario.humanDescription
                    : scenario.butterflyDescription}
                </p>
              </div>
            </div>
          </div>

          {scenario.uvPatterns.length > 0 && (
            <div className="mb-6">
              <h4 className="font-display text-lg font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
                <Sun className="w-5 h-5 text-violet-500" />
                紫外线图案解析
              </h4>
              <div className="space-y-3">
                {scenario.uvPatterns.map((pattern, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white border border-violet-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-butterfly-ink">{pattern.name}</p>
                        <p className="text-xs text-butterfly-ink/50 mt-0.5">
                          {pattern.humanVisible ? "人眼可见" : "人眼不可见"}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold",
                          pattern.humanVisible
                            ? "bg-amber-100 text-amber-700"
                            : "bg-violet-100 text-violet-700"
                        )}
                      >
                        {pattern.humanVisible ? "可见光" : "仅UV可见"}
                      </span>
                    </div>
                    <p className="text-sm text-butterfly-ink/60 leading-relaxed mb-3">
                      {pattern.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-violet-50">
                        <p className="text-[10px] text-violet-500 font-medium mb-0.5">蝴蝶所见</p>
                        <p className="text-xs text-butterfly-ink/80">{pattern.uvColor}</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-amber-50">
                        <p className="text-[10px] text-amber-500 font-medium mb-0.5">人类所见</p>
                        <p className="text-xs text-butterfly-ink/80">{pattern.visibleColor}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-start gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-violet-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-butterfly-ink/60">{pattern.function}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h4 className="font-display text-lg font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-butterfly-pink-deep" />
              人蝶视角差异
            </h4>
            <div className="space-y-2">
              {scenario.keyDifferences.map((diff, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-butterfly-ink/70"
                >
                  <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-butterfly-pink-deep text-white text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {diff}
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-butterfly-green-light/40 via-white to-violet-100/40 border border-butterfly-green/20">
            <h4 className="font-display text-lg font-semibold text-butterfly-ink mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-butterfly-green-deep" />
              蝴蝶的视觉优势
            </h4>
            <p className="text-sm text-butterfly-ink/70 leading-relaxed">
              {scenario.butterflyAdvantage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowerSignalCard({
  flower,
  visionMode,
}: {
  flower: FlowerSignal;
  visionMode: VisionMode;
}) {
  return (
    <div className="group rounded-3xl overflow-hidden bg-white shadow-card card-hover">
      <div className="relative h-52 overflow-hidden">
        <img
          src={flower.image}
          alt={flower.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500",
            visionMode === "butterfly"
              ? "bg-gradient-to-b from-violet-500/30 via-indigo-400/20 to-purple-600/40 mix-blend-multiply"
              : "bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-80"
          )}
        />
        {visionMode === "butterfly" && flower.nectarGuideVisible && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-violet-400/60 animate-pulse" />
            <div className="absolute w-8 h-8 rounded-full border border-violet-300/60 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        )}
        {visionMode === "butterfly" && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-600/80 backdrop-blur text-[11px] font-semibold text-white">
              <Sun className="w-3 h-3" />
              UV图案可见
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="font-display text-lg font-semibold">{flower.name}</p>
          <p className="text-xs opacity-80 font-serif italic">{flower.latinName}</p>
        </div>
      </div>
      <div className="p-4">
        <div
          className={cn(
            "p-3 rounded-xl mb-3 transition-all duration-500",
            visionMode === "butterfly"
              ? "bg-violet-50 border border-violet-100"
              : "bg-amber-50 border border-amber-100"
          )}
        >
          <p className="text-xs font-semibold mb-1 flex items-center gap-1">
            {visionMode === "butterfly" ? (
              <>
                <Sparkles className="w-3 h-3 text-violet-500" />
                <span className="text-violet-600">蝴蝶所见</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 text-amber-500" />
                <span className="text-amber-600">人类所见</span>
              </>
            )}
          </p>
          <p className="text-xs text-butterfly-ink/70 leading-relaxed">
            {visionMode === "human"
              ? flower.humanDescription
              : flower.butterflyDescription}
          </p>
        </div>

        {visionMode === "butterfly" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium",
                  flower.nectarGuideVisible
                    ? "bg-violet-100 text-violet-700"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                <Target className="w-2.5 h-2.5" />
                {flower.nectarGuideVisible ? "蜜源标记可见" : "无蜜源标记"}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium",
                  flower.landingStripVisible
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                <Flower2 className="w-2.5 h-2.5" />
                {flower.landingStripVisible ? "着陆标记可见" : "无着陆标记"}
              </span>
            </div>
            {flower.nectarGuideDescription && (
              <div className="p-2.5 rounded-xl bg-violet-50/60">
                <p className="text-[10px] text-violet-600 font-medium mb-0.5">蜜源导航</p>
                <p className="text-[11px] text-butterfly-ink/60 leading-relaxed">
                  {flower.nectarGuideDescription}
                </p>
              </div>
            )}
            {flower.landingStripDescription && (
              <div className="p-2.5 rounded-xl bg-emerald-50/60">
                <p className="text-[10px] text-emerald-600 font-medium mb-0.5">着陆引导</p>
                <p className="text-[11px] text-butterfly-ink/60 leading-relaxed">
                  {flower.landingStripDescription}
                </p>
              </div>
            )}
            <div className="p-2.5 rounded-xl bg-indigo-50/60">
              <p className="text-[10px] text-indigo-600 font-medium mb-0.5">UV图案类型</p>
              <p className="text-[11px] text-butterfly-ink/60">{flower.uvPattern}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ButterflyVision() {
  const [visionMode, setVisionMode] = useState<VisionMode>("human");
  const [selectedScenario, setSelectedScenario] = useState<VisionScenario | null>(null);
  const [activeTab, setActiveTab] = useState<"world" | "scenes" | "flowers" | "compare" | "learn">("world");
  const [categoryFilter, setCategoryFilter] = useState<VisionScenarioCategory | "all">("all");

  const toggleVision = () => {
    setVisionMode((prev) => (prev === "human" ? "butterfly" : "human"));
  };

  const filteredScenarios = useMemo(() => {
    if (categoryFilter === "all") return visionScenarios;
    return visionScenarios.filter((s) => s.category === categoryFilter);
  }, [categoryFilter]);

  const categories = useMemo(() => {
    const cats = [...new Set(visionScenarios.map((s) => s.category))];
    return cats as VisionScenarioCategory[];
  }, []);

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      <section
        className={cn(
          "relative overflow-hidden transition-all duration-700",
          visionMode === "butterfly"
            ? "bg-gradient-to-br from-violet-100 via-indigo-50 to-purple-100"
            : "bg-gradient-to-br from-cream-50 via-butterfly-pink-light/30 to-butterfly-green-light/30"
        )}
      >
        <div className="absolute inset-0 opacity-30 bg-grain" aria-hidden />
        <div
          className={cn(
            "absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl animate-float transition-colors duration-700",
            visionMode === "butterfly"
              ? "bg-violet-400/40"
              : "bg-butterfly-pink/40"
          )}
          aria-hidden
        />
        <div
          className={cn(
            "absolute bottom-10 -left-10 w-72 h-72 rounded-full blur-3xl animate-float transition-colors duration-700",
            visionMode === "butterfly"
              ? "bg-indigo-300/30"
              : "bg-butterfly-green/30"
          )}
          style={{ animationDelay: "2s" }}
          aria-hidden
        />

        <div className="container relative mx-auto px-4 pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-sm transition-colors duration-500",
                visionMode === "butterfly"
                  ? "text-violet-700"
                  : "text-butterfly-pink-deep"
              )}
              style={{ animationDelay: "0.1s" }}
            >
              <Sparkles className="w-4 h-4" strokeWidth={1.8} />
              <span>紫外线视觉 · 花朵密语</span>
            </div>

            <h1
              className="font-display text-4xl md:text-6xl font-semibold leading-tight text-butterfly-ink mb-6 text-balance opacity-0 animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              蝴蝶视觉世界
              <span
                className={cn(
                  "block text-2xl md:text-3xl font-serif font-normal mt-3 transition-colors duration-500",
                  visionMode === "butterfly"
                    ? "text-violet-600/70"
                    : "text-butterfly-ink/70"
                )}
              >
                Butterfly Vision World
              </span>
            </h1>

            <p
              className="text-base md:text-lg text-butterfly-ink/70 leading-relaxed mb-8 max-w-xl mx-auto opacity-0 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              沉浸式体验蝴蝶眼中的世界！在「视觉世界」中实时模拟紫外线视觉，
              观察花朵隐藏的蜜源标记，理解蝴蝶如何以独特的四色视觉系统寻找食物与配偶。
            </p>

            <div
              className="flex flex-col items-center gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.55s" }}
            >
              <VisionToggle mode={visionMode} onToggle={toggleVision} />
              <p className="text-xs text-butterfly-ink/40">
                {visionMode === "human"
                  ? "当前：人类视角 — 你看到的日常世界"
                  : "当前：蝴蝶视角 — 紫外线与偏振光的世界"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={cn(
          "sticky top-16 z-40 glass border-b border-white/40 -mt-1 transition-all duration-300",
          visionMode === "butterfly" && "border-violet-200/40"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-2 overflow-x-auto hide-scrollbar">
            {[
              { key: "world", label: "视觉世界", icon: Globe },
              { key: "scenes", label: "视觉场景", icon: ScanEye },
              { key: "flowers", label: "花朵信号", icon: Flower2 },
              { key: "compare", label: "视觉对比", icon: ArrowRightLeft },
              { key: "learn", label: "视觉百科", icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(tab.key as "world" | "scenes" | "flowers" | "compare" | "learn")
                }
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  activeTab === tab.key
                    ? visionMode === "butterfly"
                      ? "bg-violet-600 text-white shadow-soft"
                      : "bg-butterfly-pink-deep text-white shadow-soft"
                    : "text-butterfly-ink/60 hover:bg-white/60 hover:text-butterfly-ink"
                )}
              >
                <tab.icon className="w-4 h-4" strokeWidth={2} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeTab === "world" && (
        <section className="py-8 bg-cream-50">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p
                    className={cn(
                      "text-sm font-medium tracking-wide uppercase mb-2",
                      visionMode === "butterfly" ? "text-violet-600" : "text-butterfly-pink-deep"
                    )}
                  >
                    Interactive Vision World
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink">
                    沉浸式蝴蝶视觉世界
                  </h2>
                  <p className="text-butterfly-ink/60 mt-2 max-w-2xl">
                    实时模拟蝴蝶眼中的世界，观察花朵隐藏的紫外线蜜源标记，理解蝴蝶如何寻找食物和配偶。
                    切换视角、缩放平移、点击花朵或蝴蝶获取详细信息。
                  </p>
                </div>
              </div>

              <ButterflyVisionWorld visionMode={visionMode} onToggleVision={toggleVision} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {[
                {
                  icon: "🌸",
                  title: "花朵蜜源标记",
                  desc: "花瓣上的紫外线图案如同机场跑道灯，引导蝴蝶精准降落"
                },
                {
                  icon: "🦋",
                  title: "翅膀UV信号",
                  desc: "蝴蝶翅膀的紫外线反射图案是种间识别和配偶选择的关键信号"
                },
                {
                  icon: "🌿",
                  title: "寄主植物识别",
                  desc: "蝴蝶可通过紫外线特征识别适合幼虫食用的寄主植物叶片"
                },
                {
                  icon: "👁️",
                  title: "360°视野",
                  desc: "复眼结构提供接近全方位视野，仅有正后方少量盲区"
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white shadow-card card-hover"
                >
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h4 className="font-semibold text-butterfly-ink mb-1">{item.title}</h4>
                  <p className="text-sm text-butterfly-ink/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === "scenes" && (
        <section className="py-8 bg-cream-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6 overflow-x-auto hide-scrollbar pb-2">
              <button
                onClick={() => setCategoryFilter("all")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  categoryFilter === "all"
                    ? "bg-violet-600 text-white shadow-soft"
                    : "bg-white/70 text-butterfly-ink/60 hover:bg-white hover:text-butterfly-ink border border-butterfly-ink/10"
                )}
              >
                全部场景
              </button>
              {categories.map((cat) => {
                const CatIcon = categoryIcons[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                      categoryFilter === cat
                        ? "bg-violet-600 text-white shadow-soft"
                        : "bg-white/70 text-butterfly-ink/60 hover:bg-white hover:text-butterfly-ink border border-butterfly-ink/10"
                    )}
                  >
                    <CatIcon className="w-3.5 h-3.5" />
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredScenarios.map((scenario, i) => (
                <div
                  key={scenario.id}
                  className="opacity-0 animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <SceneCard
                    scenario={scenario}
                    visionMode={visionMode}
                    selected={selectedScenario?.id === scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === "flowers" && (
        <section className="py-8 bg-cream-50">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p
                  className={cn(
                    "text-sm font-medium tracking-wide uppercase mb-2",
                    visionMode === "butterfly" ? "text-violet-600" : "text-butterfly-pink-deep"
                  )}
                >
                  Flower UV Signals
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink">
                  花朵隐藏信号 · {flowerSignals.length} 种
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {flowerSignals.map((flower, i) => (
                <div
                  key={flower.name}
                  className="opacity-0 animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <FlowerSignalCard flower={flower} visionMode={visionMode} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === "compare" && (
        <section className="py-8 bg-cream-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink mb-4">
                  人蝶视觉对比
                </h2>
                <p className="text-butterfly-ink/60 leading-relaxed">
                  切换视角，感受人类与蝴蝶视觉系统的根本差异
                </p>
              </div>

              <div className="space-y-4">
                {visionComparisonFacts.map((fact, i) => (
                  <div
                    key={i}
                    className="opacity-0 animate-fade-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="rounded-2xl overflow-hidden bg-white shadow-card">
                      <div className="flex items-center gap-3 p-4 border-b border-butterfly-ink/5">
                        <span className="text-2xl">{fact.icon}</span>
                        <h3 className="font-display text-lg font-semibold text-butterfly-ink">
                          {fact.aspect}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-4 md:p-5 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
                          <div className="flex items-center gap-2 mb-2">
                            <Eye className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-semibold text-amber-700">
                              人类视觉
                            </span>
                          </div>
                          <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                            {fact.human}
                          </p>
                        </div>
                        <div className="p-4 md:p-5 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 border-t md:border-t-0 md:border-l border-butterfly-ink/5">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-violet-600" />
                            <span className="text-sm font-semibold text-violet-700">
                              蝴蝶视觉
                            </span>
                          </div>
                          <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                            {fact.butterfly}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === "learn" && (
        <section className="py-8 bg-cream-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink mb-4">
                  蝴蝶视觉百科
                </h2>
                <p className="text-butterfly-ink/60 leading-relaxed">
                  深入了解蝴蝶独特的视觉系统结构和功能
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-violet-50/30 to-white border border-violet-100">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-soft flex-shrink-0">
                      <ScanEye className="w-7 h-7" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-butterfly-ink mb-1">
                        复眼结构
                      </h3>
                      <p className="text-butterfly-ink/60">Compound Eye Architecture</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-butterfly-ink mb-2">复眼原理</h4>
                      <p className="text-sm text-butterfly-ink/70 leading-relaxed mb-3">
                        蝴蝶的复眼由数千个小眼（ommatidium）组成，每个小眼都是一个独立的视觉单元。
                        每个小眼含有8-9个感光细胞，包括对紫外线敏感的感光细胞。
                        这种结构使蝴蝶拥有接近360°的视野，虽然空间分辨率不如人眼，
                        但在运动检测和紫外线感知方面远超人类。
                      </p>
                      <h4 className="font-semibold text-butterfly-ink mb-2">感光细胞类型</h4>
                      <ul className="space-y-1.5 text-sm text-butterfly-ink/70">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-violet-500 flex-shrink-0" />
                          <span>UV感光细胞：感知300-400nm紫外线波段</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                          <span>蓝色感光细胞：感知400-500nm蓝色波段</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                          <span>绿色感光细胞：感知500-600nm绿色波段</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                          <span>宽频感光细胞：部分蝶类可感知红色波段</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50">
                      <h4 className="font-semibold text-butterfly-ink mb-3">视觉参数</h4>
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-white/60">
                          <p className="text-xs text-butterfly-ink/50 mb-0.5">感知波长范围</p>
                          <p className="font-semibold text-violet-700">{butterflyVisionCapability.wavelengthRange}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/60">
                          <p className="text-xs text-butterfly-ink/50 mb-0.5">色彩类型</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {butterflyVisionCapability.colorTypes.map((c) => (
                              <span
                                key={c}
                                className="inline-flex px-2 py-0.5 rounded-full bg-violet-100 text-[10px] font-medium text-violet-700"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/60">
                          <p className="text-xs text-butterfly-ink/50 mb-0.5">视野范围</p>
                          <p className="font-semibold text-violet-700">{butterflyVisionCapability.fieldOfView}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/60">
                          <p className="text-xs text-butterfly-ink/50 mb-0.5">闪烁融合率</p>
                          <p className="font-semibold text-violet-700">{butterflyVisionCapability.flickerFusionRate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-butterfly-pink-light/20 to-white border border-butterfly-pink/20">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-butterfly-pink-deep text-white shadow-soft flex-shrink-0">
                      <Sun className="w-7 h-7" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-butterfly-ink mb-1">
                        紫外线视觉
                      </h3>
                      <p className="text-butterfly-ink/60">Ultraviolet Vision</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-butterfly-ink mb-2">紫外线感知机制</h4>
                      <p className="text-sm text-butterfly-ink/70 leading-relaxed mb-3">
                        蝴蝶复眼中的紫外线感光细胞含有特殊的感光色素，
                        能吸收300-400nm波长的紫外线。这些细胞与蓝色和绿色感光细胞协同工作，
                        使蝴蝶能够区分紫外线反射和吸收的表面，形成一种人类完全无法想象的色彩维度。
                      </p>
                      <h4 className="font-semibold text-butterfly-ink mb-2">蜜源标记系统</h4>
                      <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                        许多花朵进化出仅在紫外线下可见的图案，这些"蜜源标记"如同机场跑道上的灯光，
                        精确引导蝴蝶降落在花蜜入口。这种花蝶协同进化已持续数千万年，
                        是自然界最精妙的视觉通信系统之一。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-butterfly-ink mb-2">紫外线视觉应用</h4>
                      <div className="space-y-2.5">
                        {[
                          { title: "觅食导航", desc: "识别花朵蜜源标记，远距离定位花蜜" },
                          { title: "配偶识别", desc: "检测翅膀紫外线图案，识别同种异性" },
                          { title: "产卵选址", desc: "识别寄主植物叶片的紫外线特征" },
                          { title: "领地标记", desc: "紫外线翅膀信号用于领地宣告" },
                        ].map((app, i) => (
                          <div key={i} className="p-3 rounded-xl bg-white/60">
                            <p className="text-sm font-medium text-butterfly-pink-deep">{app.title}</p>
                            <p className="text-xs text-butterfly-ink/50">{app.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-butterfly-green-light/20 to-white border border-butterfly-green/20">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-butterfly-green-deep text-white shadow-soft flex-shrink-0">
                      <Zap className="w-7 h-7" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-butterfly-ink mb-1">
                        特殊视觉能力
                      </h3>
                      <p className="text-butterfly-ink/60">Special Visual Abilities</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-butterfly-ink mb-3">超凡能力</h4>
                      <div className="space-y-2.5">
                        {butterflyVisionCapability.specialAbilities.map((ability, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-butterfly-ink/70">
                            <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-butterfly-green-deep text-white text-[10px] font-bold flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            {ability}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-butterfly-ink mb-3">视觉局限</h4>
                      <div className="space-y-2.5">
                        {butterflyVisionCapability.limitations.map((lim, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-butterfly-ink/70">
                            <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-amber-500 text-white text-[10px] font-bold flex-shrink-0 mt-0.5">
                              !
                            </span>
                            {lim}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedScenario && (
        <ScenarioDetail
          scenario={selectedScenario}
          visionMode={visionMode}
          onToggleVision={toggleVision}
          onClose={() => setSelectedScenario(null)}
        />
      )}
    </div>
  );
}
