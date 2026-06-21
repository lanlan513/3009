import { useState, useMemo, useRef } from "react";
import {
  Search,
  X,
  Plus,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Ruler,
  Palette,
  Flower2,
  TreeDeciduous,
  Sparkles,
  Egg,
  Bug,
  Leaf,
  Bird,
  ChevronRight,
  Info,
  Check,
  GitCompare,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyIcon from "@/components/ButterflyIcon";
import { butterflies, searchButterflies } from "@/data/butterflies";
import type { Butterfly } from "@/types";
import { cn } from "@/lib/utils";

const lifecycleStages = [
  { id: "egg", label: "卵期", icon: <Egg className="w-4 h-4" />, color: "text-amber-700", bg: "bg-amber-100" },
  { id: "larva", label: "幼虫期", icon: <Bug className="w-4 h-4" />, color: "text-green-700", bg: "bg-green-100" },
  { id: "pupa", label: "蛹期", icon: <Leaf className="w-4 h-4" />, color: "text-emerald-700", bg: "bg-emerald-100" },
  { id: "adult", label: "成虫期", icon: <Bird className="w-4 h-4" />, color: "text-pink-700", bg: "bg-pink-100" },
];

const defaultLifecycle: Record<string, string> = {
  egg: "3-7天",
  larva: "2-5周",
  pupa: "1-2周",
  adult: "2-4周",
};

const colorKeywords: Record<string, string[]> = {
  橙色: ["橙", "橘"],
  黑色: ["黑"],
  蓝色: ["蓝", "青"],
  绿色: ["绿", "翠"],
  黄色: ["黄", "金"],
  白色: ["白", "银"],
  红色: ["红"],
  紫色: ["紫"],
  棕色: ["棕", "褐"],
  粉色: ["粉", "玫"],
};

function extractColors(butterfly: Butterfly): string[] {
  const text = butterfly.name + butterfly.description + butterfly.features.join(" ");
  const found: string[] = [];
  for (const [color, keywords] of Object.entries(colorKeywords)) {
    if (keywords.some((k) => text.includes(k))) {
      found.push(color);
    }
  }
  return found.length > 0 ? found : ["多彩"];
}

function extractPatterns(butterfly: Butterfly): string[] {
  const text = butterfly.features.join(" ") + butterfly.description;
  const patterns: string[] = [];
  if (text.includes("斑") || text.includes("点")) patterns.push("斑点纹");
  if (text.includes("条") || text.includes("纹")) patterns.push("条纹");
  if (text.includes("眼")) patterns.push("眼斑");
  if (text.includes("带")) patterns.push("横带");
  if (text.includes("尾") || text.includes("燕尾")) patterns.push("燕尾突");
  if (text.includes("金属") || text.includes("虹彩") || text.includes("光泽")) patterns.push("金属虹彩");
  if (text.includes("拟态") || text.includes("枯叶")) patterns.push("拟态保护");
  if (text.includes("半透明") || text.includes("透明")) patterns.push("半透明");
  return patterns.length > 0 ? patterns : ["自然纹理"];
}

function parseWingspanCm(wingspan: string): { min: number; max: number; avg: number } {
  const nums = wingspan.match(/\d+(\.\d+)?/g);
  if (!nums || nums.length === 0) return { min: 0, max: 0, avg: 0 };
  const values = nums.map(Number);
  if (values.length === 1) return { min: values[0], max: values[0], avg: values[0] };
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { min, max, avg: (min + max) / 2 };
}

export default function ButterflyCompareLab() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["1", "2"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [activeDimension, setActiveDimension] = useState("all");
  const [showPicker, setShowPicker] = useState(false);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedButterflies = useMemo(
    () => selectedIds.map((id) => butterflies.find((b) => b.id === id)).filter(Boolean) as Butterfly[],
    [selectedIds]
  );

  const searchResults = useMemo(
    () => (searchQuery.trim() ? searchButterflies(searchQuery) : butterflies),
    [searchQuery]
  );

  const canAddMore = selectedIds.length < 4;
  const canRemove = selectedIds.length > 2;

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (canRemove) setSelectedIds(selectedIds.filter((x) => x !== id));
    } else {
      if (canAddMore) setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemove = (id: string) => {
    if (canRemove) setSelectedIds(selectedIds.filter((x) => x !== id));
  };

  const handleAddRandom = () => {
    if (!canAddMore) return;
    const available = butterflies.filter((b) => !selectedIds.includes(b.id));
    if (available.length > 0) {
      const random = available[Math.floor(Math.random() * available.length)];
      setSelectedIds([...selectedIds, random.id]);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.max(0.5, Math.min(3, z + delta)));
  };

  const resetZoom = () => setZoom(1);

  const gridCols =
    selectedButterflies.length === 2
      ? "grid-cols-2"
      : selectedButterflies.length === 3
      ? "grid-cols-3"
      : "grid-cols-2 lg:grid-cols-4";

  const renderComparisonValue = (
    butterfly: Butterfly,
    values: Butterfly[],
    getValue: (b: Butterfly) => string | number,
    type: "text" | "numeric" = "text",
    highlightBest: boolean = true
  ) => {
    const current = getValue(butterfly);
    if (type === "numeric" && highlightBest) {
      const allValues = values.map((v) => Number(getValue(v)) || 0);
      const maxVal = Math.max(...allValues);
      const minVal = Math.min(...allValues);
      const numCurrent = Number(current) || 0;
      const isMax = numCurrent === maxVal && maxVal !== minVal;
      const isMin = numCurrent === minVal && maxVal !== minVal;
      return (
        <span
          className={cn(
            "font-semibold",
            isMax && "text-butterfly-pink-deep",
            isMin && "text-butterfly-green-deep"
          )}
        >
          {current}
          {isMax && <span className="ml-1 text-xs">↑最大</span>}
          {isMin && <span className="ml-1 text-xs">↓最小</span>}
        </span>
      );
    }
    return <span className="font-medium">{current}</span>;
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 opacity-20 bg-grain" aria-hidden />
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-butterfly-pink/40 blur-3xl animate-float"
          aria-hidden
        />
        <div
          className="absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-butterfly-green/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />
        <div className="container relative mx-auto px-4 pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-sm text-butterfly-pink-deep">
              <GitCompare className="w-4 h-4" strokeWidth={1.8} />
              <span>对比实验室 · Morphology Lab</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-butterfly-ink mb-6 text-balance">
              蝴蝶形态<span className="italic text-butterfly-pink-deep">对比实验室</span>
            </h1>
            <p className="text-base md:text-lg text-butterfly-ink/70 leading-relaxed max-w-xl mx-auto">
              选择 2-4 种蝴蝶进行多维度形态学对比，从翅展、色彩、花纹到栖息地与生命周期，
              深入探索蝶类世界的千姿百态。
            </p>
          </div>
        </div>
      </section>

      {/* Butterfly Selector */}
      <section className="py-8 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-butterfly-pink/20 shadow-soft">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-butterfly-ink flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-butterfly-pink-deep" />
                  选择对比蝴蝶
                </h2>
                <p className="text-sm text-butterfly-ink/60 mt-1">
                  已选择 <span className="font-semibold text-butterfly-pink-deep">{selectedIds.length}</span> / 4 只
                  {canRemove && <span className="ml-2">· 至少保留 2 只</span>}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddRandom}
                  disabled={!canAddMore}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    canAddMore
                      ? "bg-butterfly-green-light/50 text-butterfly-green-deep hover:bg-butterfly-green-light"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <Plus className="w-4 h-4" />
                  随机添加
                </button>
                <button
                  onClick={() => setShowPicker(!showPicker)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-butterfly-pink-deep text-white hover:shadow-soft transition-all"
                >
                  {showPicker ? (
                    <><X className="w-4 h-4" />收起选择器</>
                  ) : (
                    <><Plus className="w-4 h-4" />展开选择器</>
                  )}
                </button>
              </div>
            </div>

            {/* Selected Pills */}
            <div className="flex flex-wrap gap-3 mb-6">
              {selectedButterflies.map((b) => (
                <div
                  key={b.id}
                  className="inline-flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-butterfly-pink-light/40 border border-butterfly-pink/30"
                >
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-butterfly-ink">{b.name}</span>
                  <button
                    onClick={() => handleRemove(b.id)}
                    disabled={!canRemove}
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center transition-all",
                      canRemove
                        ? "bg-white/80 text-butterfly-ink/60 hover:bg-butterfly-pink-deep hover:text-white"
                        : "bg-gray-100 text-gray-300 cursor-not-allowed"
                    )}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Picker */}
            {showPicker && (
              <div className="animate-fade-in">
                <div className="relative mb-4">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-butterfly-ink/40"
                    strokeWidth={2}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索蝴蝶名称、特征..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-butterfly-pink/30 text-butterfly-ink placeholder:text-butterfly-ink/40 focus:outline-none focus:ring-2 focus:ring-butterfly-pink/50"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[400px] overflow-y-auto pr-2">
                  {searchResults.map((b) => {
                    const selected = selectedIds.includes(b.id);
                    return (
                      <button
                        key={b.id}
                        onClick={() => handleToggleSelect(b.id)}
                        disabled={!selected && !canAddMore}
                        className={cn(
                          "group relative rounded-2xl overflow-hidden border-2 transition-all",
                          selected
                            ? "border-butterfly-pink-deep shadow-lg"
                            : canAddMore
                            ? "border-transparent hover:border-butterfly-pink/50 hover:shadow-card"
                            : "border-transparent opacity-50 cursor-not-allowed"
                        )}
                      >
                        <div className="aspect-square overflow-hidden bg-cream-100">
                          <img
                            src={b.image}
                            alt={b.name}
                            className={cn(
                              "w-full h-full object-cover transition-transform duration-500",
                              !selected && canAddMore && "group-hover:scale-110"
                            )}
                          />
                        </div>
                        <div className="p-2 bg-white">
                          <p className="text-xs font-medium text-butterfly-ink truncate">{b.name}</p>
                          <p className="text-[10px] text-butterfly-ink/50 italic truncate">{b.latinName}</p>
                        </div>
                        {selected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-butterfly-pink-deep text-white flex items-center justify-center shadow-md">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Sync Zoom Viewer */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-butterfly-pink/20 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-butterfly-ink flex items-center gap-2">
                  <ZoomIn className="w-5 h-5 text-butterfly-pink-deep" />
                  图像同步缩放对比
                </h2>
                <p className="text-sm text-butterfly-ink/60 mt-1">
                  滚动鼠标滚轮或使用控制按钮同步缩放所有图片，查看细微差异
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
                  className="w-10 h-10 rounded-xl bg-white border border-butterfly-pink/20 flex items-center justify-center text-butterfly-ink/70 hover:bg-butterfly-pink-light/30 hover:text-butterfly-pink-deep transition-all"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <div className="px-4 py-2 rounded-xl bg-butterfly-pink-light/40 text-butterfly-pink-deep font-semibold text-sm min-w-[70px] text-center">
                  {Math.round(zoom * 100)}%
                </div>
                <button
                  onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
                  className="w-10 h-10 rounded-xl bg-white border border-butterfly-pink/20 flex items-center justify-center text-butterfly-ink/70 hover:bg-butterfly-pink-light/30 hover:text-butterfly-pink-deep transition-all"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={resetZoom}
                  className="w-10 h-10 rounded-xl bg-white border border-butterfly-pink/20 flex items-center justify-center text-butterfly-ink/70 hover:bg-butterfly-pink-light/30 hover:text-butterfly-pink-deep transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className={cn("grid gap-4", gridCols)}>
              {selectedButterflies.map((b, idx) => (
                <div key={b.id} className="relative">
                  <div
                    ref={(el) => (containerRefs.current[idx] = el)}
                    onWheel={handleWheel}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-cream-50 border border-butterfly-pink/20 cursor-zoom-in"
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-200 ease-out"
                      style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
                    >
                      <img
                        src={b.image}
                        alt={b.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div className="text-white">
                        <p className="font-display text-lg font-semibold">{b.name}</p>
                        <p className="text-[11px] opacity-80 italic">{b.latinName}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur text-[10px] text-white">
                        {b.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dimension Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-butterfly-pink/20 shadow-soft overflow-hidden">
            <div className="p-6 md:p-8 border-b border-butterfly-pink/10">
              <h2 className="font-display text-2xl font-semibold text-butterfly-ink mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-butterfly-pink-deep" />
                多维度对比报告
              </h2>
              <p className="text-sm text-butterfly-ink/60">
                从形态学、色彩学、生态学等多个维度进行系统对比分析
              </p>
            </div>

            <div className="flex flex-wrap gap-2 p-4 md:p-6 bg-cream-50/50 border-b border-butterfly-pink/10">
              {[
                { id: "all", label: "全部维度", icon: <Sparkles className="w-4 h-4" /> },
                { id: "wingspan", label: "翅展形态", icon: <Ruler className="w-4 h-4" /> },
                { id: "color", label: "色彩分析", icon: <Palette className="w-4 h-4" /> },
                { id: "pattern", label: "花纹特征", icon: <Flower2 className="w-4 h-4" /> },
                { id: "habitat", label: "栖息地", icon: <TreeDeciduous className="w-4 h-4" /> },
                { id: "lifecycle", label: "生命周期", icon: <Egg className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDimension(tab.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeDimension === tab.id
                      ? "bg-butterfly-pink-deep text-white shadow-soft"
                      : "bg-white text-butterfly-ink/70 hover:bg-butterfly-pink-light/30 hover:text-butterfly-pink-deep border border-butterfly-pink/10"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8 overflow-x-auto">
              {/* Wingspan */}
              {(activeDimension === "all" || activeDimension === "wingspan") && (
                <div className="mb-8 animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-butterfly-pink-light/50 flex items-center justify-center">
                      <Ruler className="w-4 h-4 text-butterfly-pink-deep" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-butterfly-ink">翅展形态</h3>
                  </div>
                  <div className="bg-white/60 rounded-2xl border border-butterfly-pink/10 overflow-hidden">
                    <div className="grid min-w-[600px]" style={{ gridTemplateColumns: `160px repeat(${selectedButterflies.length}, 1fr)` }}>
                      <div className="p-4 bg-cream-50 font-medium text-butterfly-ink/70 text-sm border-r border-butterfly-pink/10">
                        对比项
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 text-center border-r border-butterfly-pink/10 last:border-r-0 bg-cream-50">
                          <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden mb-2">
                            <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-sm font-semibold text-butterfly-ink">{b.name}</p>
                        </div>
                      ))}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        翅展范围
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 text-center border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                          {renderComparisonValue(b, selectedButterflies, (x) => x.wingspan)}
                        </div>
                      ))}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        平均翅展
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 text-center border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                          {renderComparisonValue(b, selectedButterflies, (x) => parseWingspanCm(x.wingspan).avg.toFixed(1) + " cm", "numeric")}
                        </div>
                      ))}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        相对大小
                      </div>
                      {selectedButterflies.map((b) => {
                        const sizes = selectedButterflies.map((x) => parseWingspanCm(x.wingspan).avg);
                        const maxSize = Math.max(...sizes);
                        const mySize = parseWingspanCm(b.wingspan).avg;
                        const percent = (mySize / maxSize) * 100;
                        return (
                          <div key={b.id} className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                            <div className="h-3 bg-cream-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-butterfly-pink-light to-butterfly-pink-deep rounded-full transition-all duration-1000"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <p className="text-xs text-butterfly-ink/50 mt-1.5">{Math.round(percent)}%</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Color */}
              {(activeDimension === "all" || activeDimension === "color") && (
                <div className="mb-8 animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Palette className="w-4 h-4 text-purple-600" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-butterfly-ink">色彩分析</h3>
                  </div>
                  <div className="bg-white/60 rounded-2xl border border-butterfly-pink/10 overflow-hidden">
                    <div className="grid min-w-[600px]" style={{ gridTemplateColumns: `160px repeat(${selectedButterflies.length}, 1fr)` }}>
                      <div className="p-4 bg-cream-50 font-medium text-butterfly-ink/70 text-sm border-r border-butterfly-pink/10">
                        对比项
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 text-center border-r border-butterfly-pink/10 last:border-r-0 bg-cream-50">
                          <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden mb-2">
                            <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-sm font-semibold text-butterfly-ink">{b.name}</p>
                        </div>
                      ))}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        主要色彩
                      </div>
                      {selectedButterflies.map((b) => {
                        const colors = extractColors(b);
                        const colorMap: Record<string, string> = {
                          橙色: "#F59E0B",
                          黑色: "#374151",
                          蓝色: "#3B82F6",
                          绿色: "#10B981",
                          黄色: "#EAB308",
                          白色: "#F3F4F6",
                          红色: "#EF4444",
                          紫色: "#8B5CF6",
                          棕色: "#92400E",
                          粉色: "#EC4899",
                          多彩: "#D946EF",
                        };
                        return (
                          <div key={b.id} className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                            <div className="flex flex-wrap gap-1.5 justify-center">
                              {colors.map((c) => (
                                <span
                                  key={c}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                                  style={{ backgroundColor: colorMap[c] + "25", color: colorMap[c] }}
                                >
                                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colorMap[c] }} />
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        色彩描述
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                          <p className="text-sm text-butterfly-ink/80 leading-relaxed">
                            {b.features.filter((f) =>
                              /色|光|泽|斑|纹|彩/.test(f)
                            ).slice(0, 2).join("；") || "色彩斑斓，独具特色"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Pattern */}
              {(activeDimension === "all" || activeDimension === "pattern") && (
                <div className="mb-8 animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-butterfly-gold/30 flex items-center justify-center">
                      <Flower2 className="w-4 h-4 text-butterfly-gold" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-butterfly-ink">花纹特征</h3>
                  </div>
                  <div className="bg-white/60 rounded-2xl border border-butterfly-pink/10 overflow-hidden">
                    <div className="grid min-w-[600px]" style={{ gridTemplateColumns: `160px repeat(${selectedButterflies.length}, 1fr)` }}>
                      <div className="p-4 bg-cream-50 font-medium text-butterfly-ink/70 text-sm border-r border-butterfly-pink/10">
                        对比项
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 text-center border-r border-butterfly-pink/10 last:border-r-0 bg-cream-50">
                          <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden mb-2">
                            <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-sm font-semibold text-butterfly-ink">{b.name}</p>
                        </div>
                      ))}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        花纹类型
                      </div>
                      {selectedButterflies.map((b) => {
                        const patterns = extractPatterns(b);
                        return (
                          <div key={b.id} className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                            <div className="flex flex-wrap gap-1.5 justify-center">
                              {patterns.map((p) => (
                                <span
                                  key={p}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-butterfly-gold/20 text-butterfly-gold"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        识别特征
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                          <ul className="space-y-1.5">
                            {b.features.slice(0, 3).map((f, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-butterfly-ink/75">
                                <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5 text-butterfly-pink-deep" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Habitat */}
              {(activeDimension === "all" || activeDimension === "habitat") && (
                <div className="mb-8 animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-butterfly-green-light/50 flex items-center justify-center">
                      <TreeDeciduous className="w-4 h-4 text-butterfly-green-deep" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-butterfly-ink">栖息地与分布</h3>
                  </div>
                  <div className="bg-white/60 rounded-2xl border border-butterfly-pink/10 overflow-hidden">
                    <div className="grid min-w-[600px]" style={{ gridTemplateColumns: `160px repeat(${selectedButterflies.length}, 1fr)` }}>
                      <div className="p-4 bg-cream-50 font-medium text-butterfly-ink/70 text-sm border-r border-butterfly-pink/10">
                        对比项
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 text-center border-r border-butterfly-pink/10 last:border-r-0 bg-cream-50">
                          <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden mb-2">
                            <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-sm font-semibold text-butterfly-ink">{b.name}</p>
                        </div>
                      ))}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        栖息环境
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                          <p className="text-sm text-butterfly-ink/80">{b.habitat}</p>
                        </div>
                      ))}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        分布区域
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                          <div className="flex flex-wrap gap-1.5 justify-center">
                            {b.distributionRegions.map((r) => (
                              <span
                                key={r.continent}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-butterfly-green-light/40 text-butterfly-green-deep"
                              >
                                {r.continent}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-butterfly-ink/50 mt-2">{b.distribution}</p>
                        </div>
                      ))}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        气候偏好
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                          <div className="flex flex-wrap gap-1.5 justify-center">
                            {b.climate.map((c) => (
                              <span
                                key={c}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-700"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        稀有程度
                      </div>
                      {selectedButterflies.map((b) => {
                        const rarityOrder = ["常见", "较常见", "稀有", "极稀有", "濒危"];
                        const myIndex = rarityOrder.indexOf(b.rarity);
                        return (
                          <div key={b.id} className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                            <div className="flex justify-center gap-0.5 mb-1">
                              {rarityOrder.map((r, i) => (
                                <div
                                  key={r}
                                  className={cn(
                                    "w-6 h-2 rounded-full",
                                    i <= myIndex
                                      ? b.rarity === "濒危"
                                        ? "bg-red-400"
                                        : b.rarity === "极稀有"
                                        ? "bg-purple-400"
                                        : b.rarity === "稀有"
                                        ? "bg-amber-400"
                                        : b.rarity === "较常见"
                                        ? "bg-butterfly-pink"
                                        : "bg-butterfly-green"
                                      : "bg-cream-200"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-medium text-butterfly-ink/70">{b.rarity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Lifecycle */}
              {(activeDimension === "all" || activeDimension === "lifecycle") && (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center">
                      <Egg className="w-4 h-4 text-pink-600" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-butterfly-ink">生命周期对比</h3>
                  </div>
                  <div className="bg-white/60 rounded-2xl border border-butterfly-pink/10 overflow-hidden">
                    <div className="grid min-w-[600px]" style={{ gridTemplateColumns: `160px repeat(${selectedButterflies.length}, 1fr)` }}>
                      <div className="p-4 bg-cream-50 font-medium text-butterfly-ink/70 text-sm border-r border-butterfly-pink/10">
                        阶段
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={b.id} className="p-4 text-center border-r border-butterfly-pink/10 last:border-r-0 bg-cream-50">
                          <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden mb-2">
                            <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-sm font-semibold text-butterfly-ink">{b.name}</p>
                        </div>
                      ))}

                      {lifecycleStages.map((stage) => (
                        <>
                          <div
                            key={`label-${stage.id}`}
                            className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40"
                          >
                            <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full", stage.bg, stage.color)}>
                              {stage.icon}
                              <span className="text-sm font-medium">{stage.label}</span>
                            </div>
                          </div>
                          {selectedButterflies.map((b) => (
                            <div
                              key={`${b.id}-${stage.id}`}
                              className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0 text-center"
                            >
                              <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold", stage.bg, stage.color)}>
                                {defaultLifecycle[stage.id]}
                              </span>
                            </div>
                          ))}
                        </>
                      ))}

                      <div className="p-4 text-sm text-butterfly-ink/70 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 bg-white/40">
                        飞行能力
                      </div>
                      {selectedButterflies.map((b) => (
                        <div key={`${b.id}-flight`} className="p-4 border-r border-butterfly-pink/10 border-t border-butterfly-pink/5 last:border-r-0">
                          <div className="space-y-2">
                            <div>
                              <p className="text-[11px] text-butterfly-ink/50 mb-1">飞行模式</p>
                              <p className="text-xs font-medium text-butterfly-pink-deep">{b.flight.pattern.patternType}</p>
                            </div>
                            <div className="flex gap-2 justify-center">
                              <div className="flex-1">
                                <p className="text-[10px] text-butterfly-ink/50 mb-0.5">速度</p>
                                <div className="h-1.5 bg-cream-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-butterfly-pink rounded-full"
                                    style={{ width: `${b.flight.pattern.speed}%` }}
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="text-[10px] text-butterfly-ink/50 mb-0.5">敏捷</p>
                                <div className="h-1.5 bg-cream-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-butterfly-green rounded-full"
                                    style={{ width: `${b.flight.pattern.agility}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-butterfly-ink text-cream-100/80 py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ButterflyIcon className="w-5 h-5 text-butterfly-pink" strokeWidth={1.5} />
            <span className="font-display text-xl font-semibold text-cream-100">
              蝶<span className="italic text-butterfly-pink">语</span>
            </span>
          </div>
          <p className="text-xs text-cream-100/40">
            © 2026 蝶语 Butterfly Whispers · Made with 🦋
          </p>
        </div>
      </footer>
    </div>
  );
}
