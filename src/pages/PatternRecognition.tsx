import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Layers,
  Palette,
  Sparkles,
  ChevronRight,
  X,
  RotateCcw,
  Eye,
  BarChart3,
  BookOpen,
  Zap,
  Target,
  CircleDot,
  ArrowRightLeft,
  Shapes,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyIcon from "@/components/ButterflyIcon";
import { cn } from "@/lib/utils";
import { butterflies } from "@/data/butterflies";
import {
  wingPatterns,
  searchByPatternFeatures,
  getSimilarPatterns,
  allPatternColors,
  allStripePatterns,
  allTailShapes,
  allWingEdges,
  allEyespotSizes,
} from "@/data/wingPatterns";
import type { WingPattern } from "@/types";

function getButterflyById(id: string) {
  return butterflies.find((b) => b.id === id);
}

interface FilterState {
  colors: string[];
  hasEyespots: boolean | null;
  eyespotSize: string | null;
  hasStripes: boolean | null;
  stripePattern: string | null;
  hasGradients: boolean | null;
  hasMetallicSheen: boolean | null;
  tailShape: string | null;
  wingEdge: string | null;
}

const initialFilters: FilterState = {
  colors: [],
  hasEyespots: null,
  eyespotSize: null,
  hasStripes: null,
  stripePattern: null,
  hasGradients: null,
  hasMetallicSheen: null,
  tailShape: null,
  wingEdge: null,
};

function FilterChip({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: "pink" | "green" | "gold" | "purple" | "blue";
}) {
  const colorClasses = {
    pink: "bg-butterfly-pink-light/60 text-butterfly-pink-deep border-butterfly-pink/40",
    green: "bg-butterfly-green-light/60 text-butterfly-green-deep border-butterfly-green/40",
    gold: "bg-amber-100 text-amber-700 border-amber-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
  };
  const activeClasses = color ? colorClasses[color] : "bg-butterfly-pink-deep text-white border-butterfly-pink-deep";

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
        active
          ? activeClasses
          : "bg-white/70 border-butterfly-ink/15 text-butterfly-ink/60 hover:bg-white hover:border-butterfly-pink/40"
      )}
    >
      {label}
    </button>
  );
}

function PatternCard({
  pattern,
  onClick,
  selected,
  similarity,
}: {
  pattern: WingPattern;
  onClick: () => void;
  selected?: boolean;
  similarity?: number;
}) {
  const butterfly = getButterflyById(pattern.butterflyId);

  return (
    <div
      onClick={onClick}
      className={cn(
        "group rounded-3xl overflow-hidden bg-white shadow-card card-hover cursor-pointer",
        selected && "ring-2 ring-butterfly-pink-deep ring-offset-2"
      )}
    >
      <div className="relative h-44 overflow-hidden">
        {butterfly && (
          <img
            src={butterfly.image}
            alt={pattern.butterflyName}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-80" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {pattern.patternStyle.slice(0, 2).map((style) => (
            <span
              key={style}
              className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/80 backdrop-blur text-[10px] font-medium text-butterfly-pink-deep"
            >
              {style}
            </span>
          ))}
        </div>
        {similarity !== undefined && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-butterfly-green-deep/90 text-white text-[11px] font-semibold backdrop-blur">
              <BarChart3 className="w-3 h-3" strokeWidth={2.5} />
              {similarity}% 相似
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="font-display text-lg font-semibold">{pattern.butterflyName}</p>
          <p className="text-xs opacity-80">底色: {pattern.baseColor}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {pattern.dominantColors.map((c) => (
            <span
              key={c}
              className="inline-flex items-center px-2 py-0.5 rounded-full bg-butterfly-pink-light/50 text-[10px] font-medium text-butterfly-pink-deep"
            >
              <Palette className="w-2.5 h-2.5 mr-1" />
              {c}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-butterfly-ink/50">
          <div className="flex items-center gap-2">
            {pattern.eyespots.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <CircleDot className="w-3 h-3" />
                眼斑
              </span>
            )}
            {pattern.stripes.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <Layers className="w-3 h-3" />
                条纹
              </span>
            )}
            {pattern.hasMetallicSheen && (
              <span className="inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                金属光
              </span>
            )}
          </div>
          <Link
            to={`/butterfly/${pattern.butterflyId}`}
            className="text-butterfly-green-deep font-medium inline-flex items-center gap-1 hover:text-butterfly-green-deep"
            onClick={(e) => e.stopPropagation()}
          >
            详情
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function PatternDetailPanel({
  pattern,
  onClose,
  onFindSimilar,
}: {
  pattern: WingPattern;
  onClose: () => void;
  onFindSimilar: () => void;
}) {
  const butterfly = getButterflyById(pattern.butterflyId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-cream-50 shadow-2xl animate-fade-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur text-butterfly-ink/60 hover:bg-white hover:text-butterfly-ink transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {butterfly && (
          <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
            <img
              src={butterfly.image}
              alt={pattern.butterflyName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <p className="font-display text-3xl font-semibold">{pattern.butterflyName}</p>
              <p className="text-sm opacity-80 font-serif italic">{butterfly.latinName}</p>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8">
          <p className="text-butterfly-ink/70 leading-relaxed mb-6">{pattern.overallDescription}</p>

          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-butterfly-pink-light/40">
                <p className="text-xs text-butterfly-ink/50 mb-1">主色调</p>
                <p className="font-semibold text-butterfly-ink">{pattern.baseColor}</p>
              </div>
              <div className="p-4 rounded-2xl bg-butterfly-green-light/40">
                <p className="text-xs text-butterfly-ink/50 mb-1">尾突形态</p>
                <p className="font-semibold text-butterfly-ink">{pattern.tailShape}</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-100/60">
                <p className="text-xs text-butterfly-ink/50 mb-1">翅缘特征</p>
                <p className="font-semibold text-butterfly-ink">{pattern.wingEdge}</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-100/60">
                <p className="text-xs text-butterfly-ink/50 mb-1">金属光泽</p>
                <p className="font-semibold text-butterfly-ink">
                  {pattern.hasMetallicSheen ? "有虹彩" : "无虹彩"}
                </p>
              </div>
            </div>

            {pattern.metallicDescription && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border border-purple-100">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-purple-700 mb-1">结构色 · 虹彩光泽</p>
                    <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                      {pattern.metallicDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {pattern.eyespots.length > 0 && (
              <div>
                <h4 className="font-display text-lg font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
                  <CircleDot className="w-5 h-5 text-butterfly-pink-deep" />
                  眼斑结构元素
                </h4>
                <div className="space-y-3">
                  {pattern.eyespots.map((eyespot) => (
                    <div
                      key={eyespot.id}
                      className="p-4 rounded-2xl bg-white border border-butterfly-pink/20"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-butterfly-ink">
                            {eyespot.position} · {eyespot.location}
                          </p>
                          <p className="text-xs text-butterfly-ink/50">
                            {eyespot.shape} · {eyespot.size} · 共 {eyespot.count} 个
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {eyespot.rings.map((color, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-0.5 rounded-full bg-butterfly-ink/5 text-[10px] text-butterfly-ink/70"
                          >
                            第{i + 1}环: {color}
                          </span>
                        ))}
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-butterfly-ink/10 text-[10px] text-butterfly-ink font-medium">
                          中心: {eyespot.centerColor}
                        </span>
                      </div>
                      <p className="text-sm text-butterfly-ink/60 leading-relaxed">
                        {eyespot.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pattern.stripes.length > 0 && (
              <div>
                <h4 className="font-display text-lg font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-butterfly-green-deep" />
                  条纹结构元素
                </h4>
                <div className="space-y-3">
                  {pattern.stripes.map((stripe) => (
                    <div
                      key={stripe.id}
                      className="p-4 rounded-2xl bg-white border border-butterfly-green/20"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-butterfly-ink">
                            {stripe.position} · {stripe.pattern}
                          </p>
                          <p className="text-xs text-butterfly-ink/50">
                            {stripe.width} · 共 {stripe.count} 条
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-butterfly-pink-light/50 text-[10px] text-butterfly-pink-deep">
                          条纹色: {stripe.color}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-butterfly-green-light/50 text-[10px] text-butterfly-green-deep">
                          背景色: {stripe.backgroundColor}
                        </span>
                      </div>
                      <p className="text-sm text-butterfly-ink/60 leading-relaxed">
                        {stripe.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pattern.gradients.length > 0 && (
              <div>
                <h4 className="font-display text-lg font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-butterfly-gold" />
                  渐变区结构元素
                </h4>
                <div className="space-y-3">
                  {pattern.gradients.map((gradient) => (
                    <div
                      key={gradient.id}
                      className="p-4 rounded-2xl bg-white border border-amber-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-butterfly-ink">
                            {gradient.position} · {gradient.direction}
                          </p>
                          <p className="text-xs text-butterfly-ink/50">{gradient.transition}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {gradient.colors.map((color, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-50 to-pink-50 text-[10px] text-butterfly-ink/70"
                          >
                            色阶{i + 1}: {color}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-butterfly-ink/60 leading-relaxed">
                        {gradient.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-5 rounded-2xl bg-gradient-to-br from-butterfly-green-light/40 via-white to-butterfly-pink-light/40 border border-butterfly-green/20">
              <h4 className="font-display text-lg font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-butterfly-green-deep" />
                识别要点 · 学习指南
              </h4>
              <ul className="space-y-2">
                {pattern.identificationTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-butterfly-ink/70">
                    <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-butterfly-pink-deep text-white text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onFindSimilar}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-butterfly-pink-deep text-white font-medium shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <ArrowRightLeft className="w-4 h-4" />
              查找相似花纹
            </button>
            <Link
              to={`/butterfly/${pattern.butterflyId}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-butterfly-ink/20 text-butterfly-ink/80 font-medium hover:bg-white hover:border-butterfly-pink/50 transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
              查看蝴蝶详情
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatternRecognition() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedPattern, setSelectedPattern] = useState<WingPattern | null>(null);
  const [similarForId, setSimilarForId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"search" | "similar" | "learn">("search");

  const filteredPatterns = useMemo(() => {
    const params: {
      colors?: string[];
      hasEyespots?: boolean;
      eyespotSize?: string;
      hasStripes?: boolean;
      stripePattern?: string;
      hasGradients?: boolean;
      hasMetallicSheen?: boolean;
      tailShape?: string;
      wingEdge?: string;
    } = {};
    if (filters.colors.length > 0) params.colors = filters.colors;
    if (filters.hasEyespots !== null) params.hasEyespots = filters.hasEyespots;
    if (filters.eyespotSize) params.eyespotSize = filters.eyespotSize;
    if (filters.hasStripes !== null) params.hasStripes = filters.hasStripes;
    if (filters.stripePattern) params.stripePattern = filters.stripePattern;
    if (filters.hasGradients !== null) params.hasGradients = filters.hasGradients;
    if (filters.hasMetallicSheen !== null) params.hasMetallicSheen = filters.hasMetallicSheen;
    if (filters.tailShape) params.tailShape = filters.tailShape;
    if (filters.wingEdge) params.wingEdge = filters.wingEdge;
    return searchByPatternFeatures(params);
  }, [filters]);

  const similarPatterns = useMemo(() => {
    if (!similarForId) return [];
    return getSimilarPatterns(similarForId, 6);
  }, [similarForId]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.colors.length > 0) count++;
    if (filters.hasEyespots !== null) count++;
    if (filters.eyespotSize) count++;
    if (filters.hasStripes !== null) count++;
    if (filters.stripePattern) count++;
    if (filters.hasGradients !== null) count++;
    if (filters.hasMetallicSheen !== null) count++;
    if (filters.tailShape) count++;
    if (filters.wingEdge) count++;
    return count;
  }, [filters]);

  const toggleColor = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSimilarForId(null);
  };

  const handleFindSimilar = (pattern: WingPattern) => {
    setSimilarForId(pattern.butterflyId);
    setActiveTab("similar");
    setSelectedPattern(null);
  };

  const similarBasePattern = similarForId ? wingPatterns.find((w) => w.butterflyId === similarForId) : null;
  const similarBaseButterfly = similarForId ? getButterflyById(similarForId) : null;

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-butterfly-pink-light/30 to-butterfly-green-light/30">
        <div className="absolute inset-0 opacity-30 bg-grain" aria-hidden />
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-butterfly-pink/40 blur-3xl animate-float"
          aria-hidden
        />
        <div
          className="absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-butterfly-green/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />

        <div className="container relative mx-auto px-4 pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-sm text-butterfly-pink-deep opacity-0 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <Sparkles className="w-4 h-4" strokeWidth={1.8} />
              <span>系统识别 · 花纹拆解</span>
            </div>

            <h1
              className="font-display text-4xl md:text-6xl font-semibold leading-tight text-butterfly-ink mb-6 text-balance opacity-0 animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              蝴蝶花纹识别中心
              <span className="block text-2xl md:text-3xl font-serif font-normal mt-3 text-butterfly-ink/70">
                Wing Pattern Recognition
              </span>
            </h1>

            <p
              className="text-base md:text-lg text-butterfly-ink/70 leading-relaxed mb-8 max-w-xl mx-auto opacity-0 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              将蝴蝶翅膀花纹拆解为眼斑、条纹、渐变区等结构元素，
              通过特征检索对应物种，建立系统化识别能力。
            </p>

            <div className="flex flex-wrap justify-center gap-3 opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
              {[
                { icon: CircleDot, label: "眼斑分析", color: "text-butterfly-pink-deep" },
                { icon: Layers, label: "条纹识别", color: "text-butterfly-green-deep" },
                { icon: Palette, label: "渐变解析", color: "text-butterfly-gold" },
                { icon: Zap, label: "相似度匹配", color: "text-purple-600" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-white/50"
                >
                  <item.icon className={cn("w-4 h-4", item.color)} strokeWidth={2} />
                  <span className="text-sm text-butterfly-ink/80 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-16 z-40 glass border-b border-white/40 -mt-1">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-2">
            {[
              { key: "search", label: "特征检索", icon: Search },
              { key: "similar", label: "相似度推荐", icon: ArrowRightLeft },
              { key: "learn", label: "花纹学习", icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "search" | "similar" | "learn")}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  activeTab === tab.key
                    ? "bg-butterfly-pink-deep text-white shadow-soft"
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

      {/* Search Panel */}
      {activeTab === "search" && (
        <section className="py-8 bg-cream-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
              {/* Filters Sidebar */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold text-butterfly-ink flex items-center gap-2">
                    <Target className="w-5 h-5 text-butterfly-pink-deep" />
                    特征筛选
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-butterfly-ink/50 hover:text-butterfly-pink-deep hover:bg-butterfly-pink-light/40 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      重置
                    </button>
                  )}
                </div>

                {/* Color Filter */}
                <div className="p-4 rounded-2xl bg-white/70 backdrop-blur border border-butterfly-pink/20">
                  <p className="text-sm font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-butterfly-pink-deep" />
                    主色调
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {allPatternColors.map((color) => (
                      <FilterChip
                        key={color}
                        label={color}
                        active={filters.colors.includes(color)}
                        onClick={() => toggleColor(color)}
                        color="pink"
                      />
                    ))}
                  </div>
                </div>

                {/* Eyespots Filter */}
                <div className="p-4 rounded-2xl bg-white/70 backdrop-blur border border-butterfly-pink/20">
                  <p className="text-sm font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
                    <CircleDot className="w-4 h-4 text-butterfly-pink-deep" />
                    眼斑特征
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <FilterChip
                      label="有眼斑"
                      active={filters.hasEyespots === true}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, hasEyespots: prev.hasEyespots === true ? null : true }))
                      }
                      color="pink"
                    />
                    <FilterChip
                      label="无眼斑"
                      active={filters.hasEyespots === false}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, hasEyespots: prev.hasEyespots === false ? null : false }))
                      }
                      color="pink"
                    />
                  </div>
                  {filters.hasEyespots === true && (
                    <div>
                      <p className="text-xs text-butterfly-ink/50 mb-2">眼斑大小</p>
                      <div className="flex flex-wrap gap-2">
                        {allEyespotSizes.map((size) => (
                          <FilterChip
                            key={size}
                            label={size}
                            active={filters.eyespotSize === size}
                            onClick={() =>
                              setFilters((prev) => ({
                                ...prev,
                                eyespotSize: prev.eyespotSize === size ? null : size,
                              }))
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Stripes Filter */}
                <div className="p-4 rounded-2xl bg-white/70 backdrop-blur border border-butterfly-green/20">
                  <p className="text-sm font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-butterfly-green-deep" />
                    条纹特征
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <FilterChip
                      label="有条纹"
                      active={filters.hasStripes === true}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, hasStripes: prev.hasStripes === true ? null : true }))
                      }
                      color="green"
                    />
                    <FilterChip
                      label="无条纹"
                      active={filters.hasStripes === false}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, hasStripes: prev.hasStripes === false ? null : false }))
                      }
                      color="green"
                    />
                  </div>
                  {filters.hasStripes === true && (
                    <div>
                      <p className="text-xs text-butterfly-ink/50 mb-2">条纹类型</p>
                      <div className="flex flex-wrap gap-2">
                        {allStripePatterns.map((pattern) => (
                          <FilterChip
                            key={pattern}
                            label={pattern}
                            active={filters.stripePattern === pattern}
                            onClick={() =>
                              setFilters((prev) => ({
                                ...prev,
                                stripePattern: prev.stripePattern === pattern ? null : pattern,
                              }))
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Gradient & Metallic */}
                <div className="p-4 rounded-2xl bg-white/70 backdrop-blur border border-amber-200">
                  <p className="text-sm font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-butterfly-gold" />
                    特殊光泽
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <FilterChip
                      label="有渐变区"
                      active={filters.hasGradients === true}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, hasGradients: prev.hasGradients === true ? null : true }))
                      }
                      color="gold"
                    />
                    <FilterChip
                      label="无渐变区"
                      active={filters.hasGradients === false}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, hasGradients: prev.hasGradients === false ? null : false }))
                      }
                      color="gold"
                    />
                    <FilterChip
                      label="金属虹彩"
                      active={filters.hasMetallicSheen === true}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          hasMetallicSheen: prev.hasMetallicSheen === true ? null : true,
                        }))
                      }
                      color="purple"
                    />
                    <FilterChip
                      label="无虹彩"
                      active={filters.hasMetallicSheen === false}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          hasMetallicSheen: prev.hasMetallicSheen === false ? null : false,
                        }))
                      }
                      color="purple"
                    />
                  </div>
                </div>

                {/* Shape Filter */}
                <div className="p-4 rounded-2xl bg-white/70 backdrop-blur border border-purple-200">
                  <p className="text-sm font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
                    <Shapes className="w-4 h-4 text-purple-600" />
                    形态特征
                  </p>
                  <div className="mb-3">
                    <p className="text-xs text-butterfly-ink/50 mb-2">尾突形态</p>
                    <div className="flex flex-wrap gap-2">
                      {allTailShapes.map((shape) => (
                        <FilterChip
                          key={shape}
                          label={shape}
                          active={filters.tailShape === shape}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              tailShape: prev.tailShape === shape ? null : shape,
                            }))
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-butterfly-ink/50 mb-2">翅缘形态</p>
                    <div className="flex flex-wrap gap-2">
                      {allWingEdges.map((edge) => (
                        <FilterChip
                          key={edge}
                          label={edge}
                          active={filters.wingEdge === edge}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              wingEdge: prev.wingEdge === edge ? null : edge,
                            }))
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-sm text-butterfly-pink-deep font-medium tracking-wide uppercase mb-2">
                      Pattern Results
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink">
                      匹配结果 · {filteredPatterns.length} 种
                    </h2>
                  </div>
                </div>

                {filteredPatterns.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredPatterns.map((pattern, i) => (
                      <div
                        key={pattern.butterflyId}
                        className="opacity-0 animate-fade-up"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <PatternCard
                          pattern={pattern}
                          onClick={() => setSelectedPattern(pattern)}
                          selected={selectedPattern?.butterflyId === pattern.butterflyId}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 rounded-3xl bg-white/60 backdrop-blur">
                    <ButterflyIcon
                      className="w-16 h-16 mx-auto text-butterfly-ink/20 mb-4"
                      strokeWidth={1}
                    />
                    <p className="text-lg font-medium text-butterfly-ink/60 mb-2">未找到匹配的蝴蝶</p>
                    <p className="text-sm text-butterfly-ink/40 mb-4">请尝试调整筛选条件</p>
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-butterfly-pink-deep text-white text-sm font-medium hover:-translate-y-0.5 transition-transform"
                    >
                      <RotateCcw className="w-4 h-4" />
                      重置筛选
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Similar Recommendations */}
      {activeTab === "similar" && (
        <section className="py-8 bg-cream-50">
          <div className="container mx-auto px-4">
            {!similarForId ? (
              <div className="text-center py-16">
                <div className="inline-flex w-20 h-20 items-center justify-center rounded-full bg-butterfly-pink-light/40 mb-6">
                  <ArrowRightLeft className="w-10 h-10 text-butterfly-pink-deep" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink mb-3">
                  选择蝴蝶开始相似度推荐
                </h2>
                <p className="text-butterfly-ink/60 mb-8 max-w-md mx-auto">
                  先选择一种蝴蝶，系统将基于花纹元素（眼斑、条纹、色彩、结构色等）
                  计算相似度，为你推荐花纹特征最接近的物种。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                  {wingPatterns.slice(0, 8).map((pattern) => (
                    <button
                      key={pattern.butterflyId}
                      onClick={() => setSimilarForId(pattern.butterflyId)}
                      className="text-left p-3 rounded-2xl bg-white/70 hover:bg-white hover:shadow-card transition-all duration-300 border border-transparent hover:border-butterfly-pink/30"
                    >
                      <div className="flex items-center gap-3">
                        {getButterflyById(pattern.butterflyId) && (
                          <img
                            src={getButterflyById(pattern.butterflyId)!.image}
                            alt={pattern.butterflyName}
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-butterfly-ink text-sm">{pattern.butterflyName}</p>
                          <p className="text-xs text-butterfly-ink/50 truncate">{pattern.baseColor}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  {similarBaseButterfly && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur border border-butterfly-pink/30">
                      <img
                        src={similarBaseButterfly.image}
                        alt={similarBasePattern?.butterflyName}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-display text-2xl font-semibold text-butterfly-ink">
                          {similarBasePattern?.butterflyName}
                        </p>
                        <p className="text-sm text-butterfly-ink/50">
                          基于花纹元素的相似度推荐
                        </p>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setSimilarForId(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-butterfly-ink/60 hover:text-butterfly-pink-deep hover:bg-butterfly-pink-light/40 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    重新选择
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {similarPatterns.map((item, i) => (
                    <div
                      key={item.pattern.butterflyId}
                      className="opacity-0 animate-fade-up"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <PatternCard
                        pattern={item.pattern}
                        onClick={() => setSelectedPattern(item.pattern)}
                        similarity={item.similarity}
                      />
                    </div>
                  ))}
                </div>

                {similarBasePattern && (
                  <div className="mt-10 p-6 rounded-3xl bg-gradient-to-br from-butterfly-pink-light/30 via-white to-butterfly-green-light/30 border border-butterfly-pink/20">
                    <h3 className="font-display text-xl font-semibold text-butterfly-ink mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-butterfly-pink-deep" />
                      相似度计算维度
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: "主色调", weight: "30%", desc: "色彩匹配度" },
                        { label: "眼斑结构", weight: "20%", desc: "形状与分布" },
                        { label: "条纹模式", weight: "20%", desc: "类型与排列" },
                        { label: "结构光泽", weight: "30%", desc: "金属虹彩等" },
                      ].map((dim, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/60">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-butterfly-ink">{dim.label}</span>
                            <span className="text-xs font-bold text-butterfly-pink-deep">{dim.weight}</span>
                          </div>
                          <p className="text-xs text-butterfly-ink/50">{dim.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Learn Section */}
      {activeTab === "learn" && (
        <section className="py-8 bg-cream-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink mb-4">
                  花纹结构学习指南
                </h2>
                <p className="text-butterfly-ink/60 leading-relaxed">
                  掌握蝴蝶翅膀花纹的结构元素，建立系统化的识别能力
                </p>
              </div>

              <div className="space-y-6">
                {/* Eyespots */}
                <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-butterfly-pink-light/20 to-white border border-butterfly-pink/20">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-butterfly-pink-deep text-white shadow-soft flex-shrink-0">
                      <CircleDot className="w-7 h-7" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-butterfly-ink mb-1">眼斑（Eyespot）</h3>
                      <p className="text-butterfly-ink/60">蝴蝶翅膀上最醒目的花纹元素之一</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-butterfly-ink mb-2">结构组成</h4>
                      <p className="text-sm text-butterfly-ink/70 leading-relaxed mb-3">
                        典型的眼斑由多层同心圆环组成：最外层为浅色环，中层为深色环，中心为对比鲜明的核心色。
                        这种层层递进的结构模拟了大型动物的眼睛，用以震慑天敌。
                      </p>
                      <h4 className="font-semibold text-butterfly-ink mb-2">功能作用</h4>
                      <ul className="space-y-1.5 text-sm text-butterfly-ink/70">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-butterfly-pink-deep flex-shrink-0" />
                          <span>警戒作用：模拟捕食者的眼睛，使小鸟等天敌不敢攻击</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-butterfly-pink-deep flex-shrink-0" />
                          <span>转移攻击：吸引天敌攻击翅膀边缘而非身体要害</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-butterfly-pink-deep flex-shrink-0" />
                          <span>求偶信号：同种蝴蝶之间的识别标志</span>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/60">
                      <h4 className="font-semibold text-butterfly-ink mb-3">代表物种</h4>
                      <div className="space-y-3">
                        {wingPatterns.filter((w) => w.eyespots.length > 0).slice(0, 4).map((w) => {
                          const b = getButterflyById(w.butterflyId);
                          const largest = w.eyespots.reduce((a, e) => (a.size.length > e.size.length ? a : e));
                          return (
                            <div key={w.butterflyId} className="flex items-center gap-3">
                              {b && (
                                <img
                                  src={b.image}
                                  alt={w.butterflyName}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-butterfly-ink">{w.butterflyName}</p>
                                <p className="text-xs text-butterfly-ink/50">
                                  {largest.shape} · {largest.size} · {largest.count}个
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stripes */}
                <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-butterfly-green-light/20 to-white border border-butterfly-green/20">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-butterfly-green-deep text-white shadow-soft flex-shrink-0">
                      <Layers className="w-7 h-7" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-butterfly-ink mb-1">条纹（Stripe）</h3>
                      <p className="text-butterfly-ink/60">蝴蝶翅膀最常见的花纹元素</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-butterfly-ink mb-2">条纹类型</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: "纵条纹", desc: "沿翅脉方向" },
                          { name: "横条纹", desc: "垂直翅脉方向" },
                          { name: "放射纹", desc: "从翅基放射" },
                          { name: "锯齿纹", desc: "边缘呈锯齿状" },
                          { name: "网状纹", desc: "交织成网格" },
                          { name: "波浪纹", desc: "如波浪起伏" },
                        ].map((t, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-white/50">
                            <p className="text-sm font-medium text-butterfly-green-deep">{t.name}</p>
                            <p className="text-xs text-butterfly-ink/50">{t.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-butterfly-ink mb-2">功能作用</h4>
                      <ul className="space-y-2 text-sm text-butterfly-ink/70">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-butterfly-green-deep flex-shrink-0" />
                          <span>割裂形态：打破身体轮廓，使天敌难以识别蝶形</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-butterfly-green-deep flex-shrink-0" />
                          <span>拟态伪装：模拟叶脉、树枝等环境元素</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-butterfly-green-deep flex-shrink-0" />
                          <span>警戒色：高对比度条纹警示有毒或不可食用</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-butterfly-green-deep flex-shrink-0" />
                          <span>种类识别：每种蝴蝶有独特的条纹模式</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Gradients */}
                <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-amber-100/40 to-white border border-amber-200">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-butterfly-gold text-white shadow-soft flex-shrink-0">
                      <Palette className="w-7 h-7" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-butterfly-ink mb-1">渐变区（Gradient）</h3>
                      <p className="text-butterfly-ink/60">色彩的柔和过渡与层次变化</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        dir: "由内向外",
                        desc: "从翅基到外缘的色彩渐变，最常见的模式",
                        example: "大多数闪蝶科种类",
                      },
                      {
                        dir: "由外向内",
                        desc: "从外缘到翅基的色彩渐变，较少见",
                        example: "菜粉蝶的翅尖黑化",
                      },
                      {
                        dir: "斑驳渐变",
                        desc: "不规则的色彩过渡，模拟枯叶等",
                        example: "枯叶蛱蝶的反面",
                      },
                    ].map((g, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/60">
                        <p className="font-semibold text-butterfly-gold mb-1">{g.dir}</p>
                        <p className="text-sm text-butterfly-ink/70 mb-2">{g.desc}</p>
                        <p className="text-xs text-butterfly-ink/40">代表: {g.example}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structural Color */}
                <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-butterfly-pink-light/30 border border-purple-200">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-soft flex-shrink-0">
                      <Sparkles className="w-7 h-7" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-butterfly-ink mb-1">
                        结构色（Structural Color）
                      </h3>
                      <p className="text-butterfly-ink/60">并非来自色素，而是光的奇迹</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-butterfly-ink mb-3">科学原理</h4>
                      <p className="text-sm text-butterfly-ink/70 leading-relaxed mb-4">
                        蝴蝶翅膀的金属虹彩并非来自色素分子，而是鳞片表面的微观结构
                        （间距约为可见光波长的几百纳米）对光线产生干涉、衍射和散射的结果。
                        这就是为什么闪蝶的翅膀在不同角度下会呈现不同颜色的原因。
                      </p>
                      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-amber-100/50">
                        <p className="text-xs text-butterfly-ink/60">
                          <span className="font-semibold">💡 小知识：</span>
                          如果用酒精等液体填充闪蝶翅膀鳞片的间隙，金属蓝会暂时消失，
                          因为改变了折射率。干燥后又会恢复！
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-butterfly-ink mb-3">具有结构色的代表物种</h4>
                      <div className="space-y-2.5">
                        {wingPatterns.filter((w) => w.hasMetallicSheen).map((w) => {
                          const b = getButterflyById(w.butterflyId);
                          return (
                            <div key={w.butterflyId} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/50">
                              {b && (
                                <img
                                  src={b.image}
                                  alt={w.butterflyName}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-butterfly-ink">{w.butterflyName}</p>
                                <p className="text-xs text-purple-600 truncate">{w.baseColor}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Tips Summary */}
                <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-butterfly-ink via-butterfly-ink/95 to-butterfly-ink/90 text-cream-100">
                  <h3 className="font-display text-2xl font-semibold mb-5 flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    系统化识别五步走
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {[
                      { step: 1, title: "观察底色", desc: "先看翅膀的基本色调" },
                      { step: 2, title: "寻找眼斑", desc: "有无、大小、数量、位置" },
                      { step: 3, title: "识别条纹", desc: "类型、颜色、宽度、方向" },
                      { step: 4, title: "注意光泽", desc: "是否具有金属虹彩" },
                      { step: 5, title: "检查形态", desc: "尾突、翅缘等特殊结构" },
                    ].map((s) => (
                      <div key={s.step} className="p-4 rounded-2xl bg-cream-100/10 backdrop-blur">
                        <div className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-butterfly-pink text-butterfly-ink font-bold text-sm mb-3">
                          {s.step}
                        </div>
                        <p className="font-medium mb-1">{s.title}</p>
                        <p className="text-xs text-cream-100/60">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-butterfly-ink text-cream-100/80 py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ButterflyIcon
              className="w-6 h-6 text-butterfly-pink"
              strokeWidth={1.5}
            />
            <span className="font-display text-2xl font-semibold text-cream-100">
              蝶<span className="italic text-butterfly-pink">语</span>
            </span>
          </div>
          <p className="text-sm text-cream-100/60">
            花纹识别中心 · 以结构化的方式理解蝶翅之美
          </p>
        </div>
      </footer>

      {/* Detail Panel */}
      {selectedPattern && (
        <PatternDetailPanel
          pattern={selectedPattern}
          onClose={() => setSelectedPattern(null)}
          onFindSimilar={() => handleFindSimilar(selectedPattern)}
        />
      )}
    </div>
  );
}
