import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Sun,
  Cloud,
  Thermometer,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  Bug,
  Leaf,
  Egg,
  Bird,
  ArrowRight,
  Navigation,
  BookOpen,
  Sparkles as SparklesIcon,
  Globe2,
  Clock,
  Trophy,
  Map,
  TreeDeciduous,
  Mountain,
  Flower2,
  Flame,
  Snowflake,
  TreePine,
  Palmtree,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyIcon from "@/components/ButterflyIcon";
import ButterflyCard from "@/components/ButterflyCard";
import {
  getButterflyById,
} from "@/data/butterflies";
import {
  months,
  monthlyCalendar,
  monthNames,
  seasonColors,
  getCurrentMonth,
  getSeasonFromMonth,
  getRegionsByMonth,
  getMigrationsByMonth,
  observationGuides,
  seasonalPatterns,
} from "@/data/observationCalendar";
import { cn } from "@/lib/utils";
import type { MonthNumber, Season, MonthlyButterfly, ObservationGuide as ObservationGuideType, SeasonalPattern } from "@/types";

const seasonIcons: Record<Season, React.ReactNode> = {
  "春": <Flower2 className="w-5 h-5" strokeWidth={1.8} />,
  "夏": <Sun className="w-5 h-5" strokeWidth={1.8} />,
  "秋": <Leaf className="w-5 h-5" strokeWidth={1.8} />,
  "冬": <Snowflake className="w-5 h-5" strokeWidth={1.8} />,
};

const lifeStageIcons: Record<string, React.ReactNode> = {
  "卵期": <Egg className="w-3.5 h-3.5" strokeWidth={2} />,
  "幼虫期": <Bug className="w-3.5 h-3.5" strokeWidth={2} />,
  "蛹期": <Leaf className="w-3.5 h-3.5" strokeWidth={2} />,
  "成虫期": <Bird className="w-3.5 h-3.5" strokeWidth={2} />,
  "全年可见": <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />,
};

const tipIcons: Record<string, React.ReactNode> = {
  "leaf": <Leaf className="w-5 h-5" strokeWidth={1.8} />,
  "sun": <Sun className="w-5 h-5" strokeWidth={1.8} />,
  "book": <BookOpen className="w-5 h-5" strokeWidth={1.8} />,
  "eye": <Eye className="w-5 h-5" strokeWidth={1.8} />,
  "flower": <Flower2 className="w-5 h-5" strokeWidth={1.8} />,
  "pencil": <SparklesIcon className="w-5 h-5" strokeWidth={1.8} />,
  "droplet": <Cloud className="w-5 h-5" strokeWidth={1.8} />,
  "thermometer": <Thermometer className="w-5 h-5" strokeWidth={1.8} />,
  "mountain": <Mountain className="w-5 h-5" strokeWidth={1.8} />,
  "moon": <Cloud className="w-5 h-5" strokeWidth={1.8} />,
  "cloud": <Cloud className="w-5 h-5" strokeWidth={1.8} />,
  "navigation": <Navigation className="w-5 h-5" strokeWidth={1.8} />,
  "bug": <Bug className="w-5 h-5" strokeWidth={1.8} />,
  "map": <Map className="w-5 h-5" strokeWidth={1.8} />,
  "snowflake": <Snowflake className="w-5 h-5" strokeWidth={1.8} />,
  "camera": <Eye className="w-5 h-5" strokeWidth={1.8} />,
  "settings": <Sparkles className="w-5 h-5" strokeWidth={1.8} />,
  "butterfly": <ButterflyIcon className="w-5 h-5" strokeWidth={1.8} />,
  "calendar": <Calendar className="w-5 h-5" strokeWidth={1.8} />,
  "tree-palm": <Palmtree className="w-5 h-5" strokeWidth={1.8} />,
  "plane": <Mountain className="w-5 h-5" strokeWidth={1.8} />,
};

const guideCategoryColors: Record<ObservationGuideType["category"], { bg: string; text: string; border: string }> = {
  "季节观察": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "地区指南": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "生命周期": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
  "迁徙追踪": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "新手入门": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
};

const difficultyColors: Record<ObservationGuideType["difficulty"], string> = {
  "入门": "bg-green-100 text-green-700",
  "进阶": "bg-yellow-100 text-yellow-700",
  "专家": "bg-red-100 text-red-700",
};

function MonthCard({ month, isActive, onClick }: { month: MonthNumber; isActive: boolean; onClick: () => void }) {
  const season = getSeasonFromMonth(month);
  const colors = seasonColors[season];

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-2xl transition-all duration-300 text-center",
        "hover:scale-105 hover:shadow-lg",
        isActive
          ? "bg-white shadow-lg scale-105"
          : "bg-white/60 hover:bg-white"
      )}
      style={{
        boxShadow: isActive ? `0 0 0 2px ${colors.accent}, 0 0 0 6px #FFF9F5` : undefined,
      }}
    >
      <div className={cn(
        "w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center",
        isActive ? colors.light : "bg-cream-200/50"
      )}>
        <span className={cn("text-lg font-semibold", isActive ? colors.text : "text-butterfly-ink/50")}>
          {month}
        </span>
      </div>
      <p className={cn("text-sm font-medium", isActive ? "text-butterfly-ink" : "text-butterfly-ink/60")}>
        {monthNames[month]}
      </p>
      <div className={cn(
        "mt-1.5 w-1.5 h-1.5 mx-auto rounded-full",
        isActive ? "bg-butterfly-pink-deep" : "bg-transparent"
      )} />
    </button>
  );
}

function ButterflyMonthlyCard({
  monthlyButterfly,
  index,
}: {
  monthlyButterfly: MonthlyButterfly;
  index: number;
}) {
  const butterfly = getButterflyById(monthlyButterfly.butterflyId);
  if (!butterfly) return null;

  const abundanceColors: Record<string, string> = {
    "极多": "bg-emerald-100 text-emerald-700",
    "较多": "bg-green-100 text-green-700",
    "常见": "bg-blue-100 text-blue-700",
    "较少": "bg-yellow-100 text-yellow-700",
    "稀有": "bg-rose-100 text-rose-700",
  };

  return (
    <Link
      to={`/butterfly/${butterfly.id}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-card card-hover opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={butterfly.image}
          alt={butterfly.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
        <div className="absolute top-2.5 left-2.5">
          <span className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
            abundanceColors[monthlyButterfly.abundance]
          )}>
            {monthlyButterfly.abundance}
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur text-[10px] font-medium text-butterfly-ink/70">
            {lifeStageIcons[monthlyButterfly.lifeStage]}
            {monthlyButterfly.lifeStage}
          </span>
        </div>
        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
          <p className="font-display text-base font-semibold truncate">{butterfly.name}</p>
          <p className="text-[10px] opacity-80 font-serif italic truncate">{butterfly.latinName}</p>
        </div>
      </div>
      <div className="p-3.5">
        <p className="text-xs text-butterfly-pink-deep font-medium mb-1.5">
          {monthlyButterfly.highlight}
        </p>
        {monthlyButterfly.observationNote && (
          <p className="text-[11px] text-butterfly-ink/50 leading-relaxed">
            {monthlyButterfly.observationNote}
          </p>
        )}
      </div>
    </Link>
  );
}

function SeasonalPatternCard({ pattern }: { pattern: SeasonalPattern }) {
  const allMonths: MonthNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const stageColors = [
    { key: "eggMonths" as const, label: "卵期", color: "bg-amber-400" },
    { key: "larvaMonths" as const, label: "幼虫期", color: "bg-green-500" },
    { key: "pupaMonths" as const, label: "蛹期", color: "bg-emerald-500" },
    { key: "adultMonths" as const, label: "成虫期", color: "bg-pink-500" },
  ];

  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-5 border border-white/50">
      <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-butterfly-pink-light/50 flex items-center justify-center">
        <ButterflyIcon className="w-5 h-5 text-butterfly-pink-deep" strokeWidth={1.5} />
      </div>
      <div>
        <h4 className="font-display text-lg font-semibold text-butterfly-ink">
          {pattern.butterflyName}
        </h4>
        <p className="text-xs text-butterfly-ink/50">{pattern.region}</p>
      </div>
    </div>

    <div className="space-y-2.5">
      {stageColors.map((stage) => (
        <div key={stage.key} className="flex items-center gap-3">
          <span className="w-14 text-[11px] text-butterfly-ink/60 shrink-0">
            {stage.label}
          </span>
          <div className="flex-1 flex gap-0.5">
            {allMonths.map((m) => {
              const isActive = (pattern[stage.key] as MonthNumber[]).includes(m);
              return (
                <div
                  key={m}
                  className={cn(
                    "flex-1 h-4 rounded-sm",
                    isActive ? stage.color : "bg-cream-200/50"
                  )}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>

    <div className="flex justify-between mt-3 pt-3 border-t border-cream-200/50">
      <div className="text-center">
        <p className="text-lg font-semibold text-butterfly-pink-deep">{pattern.generationsPerYear}</p>
        <p className="text-[10px] text-butterfly-ink/50">年世代数</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-butterfly-green-deep">{pattern.overwinteringStage}</p>
        <p className="text-[10px] text-butterfly-ink/50">越冬虫态</p>
      </div>
    </div>
    </div>
  );
}

function GuideCard({ guide, index }: { guide: ObservationGuideType; index: number }) {
  const colors = guideCategoryColors[guide.category];

  return (
    <div
      className="group rounded-2xl overflow-hidden bg-white shadow-card card-hover opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={cn("p-5", colors.bg)}>
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center",
            "bg-white shadow-sm"
          )}>
            <span className={colors.text}>
              {tipIcons[guide.icon] || <BookOpen className="w-5 h-5" strokeWidth={1.8} />}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-semibold text-butterfly-ink truncate">
              {guide.title}
            </h3>
            <p className="text-xs text-butterfly-ink/50 font-serif italic truncate">
              {guide.subtitle}
            </p>
          </div>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-semibold",
            difficultyColors[guide.difficulty]
          )}>
            {guide.difficulty}
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-butterfly-ink/65 leading-relaxed mb-4">
          {guide.content}
        </p>
        <div className="space-y-2 mb-4">
          {guide.keyPoints.slice(0, 3).map((point, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-butterfly-ink/60">
            <span className={cn("mt-0.5 w-1.5 h-1.5 rounded-full shrink-0", colors.text.replace("text-", "bg-"))} />
            <span className="leading-relaxed">{point}</span>
          </div>
          ))}
        </div>
        {(guide.bestTime || guide.bestLocation) && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-cream-200/50">
            {guide.bestTime && (
              <span className="inline-flex items-center gap-1 text-[10px] text-butterfly-ink/50">
              <Clock className="w-3 h-3" strokeWidth={2} />
              {guide.bestTime}
            </span>
          )}
            {guide.bestLocation && (
            <span className="inline-flex items-center gap-1 text-[10px] text-butterfly-ink/50">
              <MapPin className="w-3 h-3" strokeWidth={2} />
              {guide.bestLocation}
            </span>
          )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ObservationCalendar() {
  const [selectedMonth, setSelectedMonth] = useState<MonthNumber>(getCurrentMonth());
  const [activeTab, setActiveTab] = useState<"monthly" | "regions" | "migration" | "guides">("monthly");

  const currentMonthData = useMemo(() => {
    return monthlyCalendar.find((m) => m.month === selectedMonth);
  }, [selectedMonth]);

  const season = useMemo(() => getSeasonFromMonth(selectedMonth), [selectedMonth]);
  const seasonColor = seasonColors[season];
  const regions = useMemo(() => getRegionsByMonth(selectedMonth), [selectedMonth]);
  const migrations = useMemo(() => getMigrationsByMonth(selectedMonth), [selectedMonth]);

  const { common: commonButterflies, rare: rareButterflies } = useMemo(
    () => {
      const data = currentMonthData;
      if (!data) return { common: [], rare: [] };
      return { common: data.commonButterflies, rare: data.rareButterflies };
    },
    [currentMonthData]
  );

  const goToPrevMonth = () => {
    setSelectedMonth((prev) => (prev === 1 ? 12 : ((prev - 1) as MonthNumber)));
  };

  const goToNextMonth = () => {
    setSelectedMonth((prev) => (prev === 12 ? 1 : ((prev + 1) as MonthNumber)));
  };

  const tabs = [
    { id: "monthly", label: "当月蝶讯", icon: <Calendar className="w-4 h-4" strokeWidth={1.8} /> },
    { id: "regions", label: "地区指南", icon: <Globe2 className="w-4 h-4" strokeWidth={1.8} /> },
    { id: "migration", label: "迁徙追踪", icon: <Navigation className="w-4 h-4" strokeWidth={1.8} /> },
    { id: "guides", label: "观察攻略", icon: <BookOpen className="w-4 h-4" strokeWidth={1.8} /> },
  ] as const;

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      {/* Hero Section */}
      <section className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-br",
        seasonColor.bg
      )}>
        <div className="absolute inset-0 opacity-30 bg-grain" aria-hidden />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/30 blur-3xl animate-float" aria-hidden />
        <div className="absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-butterfly-green/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} aria-hidden />

        <div className="container relative mx-auto px-4 pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-sm",
              seasonColor.text
            )}>
              <Calendar className="w-4 h-4" strokeWidth={1.8} />
              <span>Butterfly Observation Calendar</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-butterfly-ink mb-4 text-balance">
              蝴蝶观察<span className="italic text-butterfly-pink-deep">季历</span>
            </h1>
            <p className="text-base md:text-lg text-butterfly-ink/70 leading-relaxed mb-8 max-w-xl mx-auto">
              跟随季节的脚步，探索每个月最值得观察的蝴蝶，
              发现不同地区的最佳观蝶时节，掌握生命周期与迁徙的奥秘
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={goToPrevMonth}
                className="w-10 h-10 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-butterfly-ink/70 hover:text-butterfly-ink transition-all"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <div className="px-6 py-2.5 rounded-full glass min-w-[160px] text-center">
                <span className={cn("font-display text-2xl font-semibold", seasonColor.text)}>
                  {monthNames[selectedMonth]}
                </span>
              </div>
              <button
                onClick={goToNextMonth}
                className="w-10 h-10 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-butterfly-ink/70 hover:text-butterfly-ink transition-all"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Month Selector */}
      <section className="py-8 bg-cream-50 -mt-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-3">
            {months.map((m) => (
              <MonthCard
                key={m}
                month={m}
                isActive={m === selectedMonth}
                onClick={() => setSelectedMonth(m)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-6 bg-cream-100 sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 p-1 rounded-full bg-white/70 backdrop-blur-sm w-fit mx-auto shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeTab === tab.id
                    ? "bg-butterfly-pink-deep text-white shadow-md"
                    : "text-butterfly-ink/60 hover:text-butterfly-ink hover:bg-white/80"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          {/* 当月蝶讯 */}
          {activeTab === "monthly" && currentMonthData && (
            <div className="space-y-12">
              {/* 本月主题 */}
              <div className={cn(
                "relative rounded-[2rem] overflow-hidden",
                "bg-gradient-to-br",
                seasonColor.bg
              )}>
                <div className="absolute inset-0 opacity-20 bg-grain" aria-hidden />
                <div className="relative p-8 md:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 mb-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", seasonColor.light, seasonColor.text)}>
                          {seasonIcons[season]}
                        </div>
                        <span className={cn("font-semibold", seasonColor.text)}>
                          {season}季
                        </span>
                      </div>
                      <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink mb-2">
                        {currentMonthData.theme}
                      </h2>
                      <p className="text-butterfly-ink/60 max-w-2xl leading-relaxed">
                        {currentMonthData.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4">
                      <Thermometer className="w-5 h-5 text-butterfly-pink-deep mb-2" strokeWidth={1.8} />
                      <p className="text-xs text-butterfly-ink/50 mb-1">平均气温</p>
                      <p className="font-display text-lg font-semibold text-butterfly-ink">
                        {currentMonthData.averageTemperature}
                      </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4">
                      <Sun className="w-5 h-5 text-butterfly-gold mb-2" strokeWidth={1.8} />
                      <p className="text-xs text-butterfly-ink/50 mb-1">日照时长</p>
                      <p className="font-display text-lg font-semibold text-butterfly-ink">
                        {currentMonthData.daylightHours}
                      </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4">
                      <Sparkles className="w-5 h-5 text-butterfly-green-deep mb-2" strokeWidth={1.8} />
                      <p className="text-xs text-butterfly-ink/50 mb-1">常见蝶种</p>
                      <p className="font-display text-lg font-semibold text-butterfly-ink">
                        {commonButterflies.length + rareButterflies.length} 种
                      </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4">
                      <MapPin className="w-5 h-5 text-blue-500 mb-2" strokeWidth={1.8} />
                      <p className="text-xs text-butterfly-ink/50 mb-1">推荐地区</p>
                      <p className="font-display text-lg font-semibold text-butterfly-ink">
                        {regions.length} 个
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 常见蝴蝶 */}
              <div>
                <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-sm text-butterfly-green-deep font-medium tracking-wide uppercase mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" strokeWidth={2} />
                    Common Species
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink">
                    本月常见蝴蝶
                  </h3>
                </div>
              </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {commonButterflies.map((mb, i) => (
                    <ButterflyMonthlyCard key={mb.butterflyId} monthlyButterfly={mb} index={i} />
                  ))}
                </div>
              </div>

              {/* 珍稀蝴蝶 */}
              {rareButterflies.length > 0 && (
                <div>
                  <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-sm text-rose-600 font-medium tracking-wide uppercase mb-2 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4" strokeWidth={2} />
                    Rare Species
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink">
                    本月珍稀蝶踪
                  </h3>
                </div>
              </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rareButterflies.map((mb, i) => (
                    <ButterflyMonthlyCard key={mb.butterflyId} monthlyButterfly={mb} index={i} />
                  ))}
                </div>
              </div>
              )}

              {/* 观察贴士 */}
              <div>
                <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-sm text-butterfly-pink-deep font-medium tracking-wide uppercase mb-2 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" strokeWidth={2} />
                    Observation Tips
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink">
                    本月观察贴士
                  </h3>
                </div>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentMonthData.tips.map((tip, i) => (
                    <div
                      key={i}
                      className="rounded-2xl bg-white p-5 shadow-card card-hover"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-butterfly-pink-light/50 flex items-center justify-center mb-4 text-butterfly-pink-deep">
                        {tipIcons[tip.icon] || <Sparkles className="w-6 h-6" strokeWidth={1.8} />}
                      </div>
                      <h4 className="font-display text-lg font-semibold text-butterfly-ink mb-2">
                        {tip.title}
                      </h4>
                      <p className="text-sm text-butterfly-ink/60 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 生命周期模式 */}
              <div>
                <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-sm text-emerald-700 font-medium tracking-wide uppercase mb-2 flex items-center gap-1.5">
                    <TreeDeciduous className="w-4 h-4" strokeWidth={2} />
                    Seasonal Patterns
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink">
                    季节生活史
                  </h3>
                </div>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {seasonalPatterns.slice(0, 4).map((pattern) => (
                    <SeasonalPatternCard key={pattern.butterflyId} pattern={pattern} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 地区指南 */}
          {activeTab === "regions" && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink mb-3">
              本月最佳观蝶地区
            </h2>
            <p className="text-butterfly-ink/60 max-w-xl mx-auto">
              选择不同的月份，发现世界各地的最佳观蝶时节
            </p>
          </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {regions.map((region, i) => (
                  <div
                    key={region.region}
                    className="group rounded-2xl overflow-hidden bg-white shadow-card card-hover opacity-0 animate-fade-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="relative h-32 bg-gradient-to-br from-butterfly-green-light/40 to-butterfly-pink-light/40 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <TreePine className="w-16 h-16 text-white/40" strokeWidth={1} />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur text-xs font-medium text-butterfly-ink/70">
                          <MapPin className="w-3 h-3" strokeWidth={2} />
                          {region.continent}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-display text-xl font-semibold text-butterfly-ink">
                          {region.region}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1">
                          <p className="text-xs text-butterfly-ink/50 mb-0.5">高峰季节</p>
                          <p className="text-sm font-medium text-butterfly-ink">{region.peakSeason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-butterfly-ink/50 mb-0.5">蝶种数量</p>
                          <p className="text-sm font-semibold text-butterfly-pink-deep">
                            {region.butterflyCount}+
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-butterfly-ink/50 mb-3">
                        {region.climate}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {region.highlights.slice(0, 3).map((h, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full bg-butterfly-pink-light/30 text-butterfly-pink-deep text-[10px]"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {region.bestMonths.slice(0, 6).map((m) => (
                          <div
                            key={m}
                            className={cn(
                              "w-6 h-6 rounded-md text-[10px] font-medium flex items-center justify-center",
                              m === selectedMonth
                                ? "bg-butterfly-pink-deep text-white"
                                : "bg-cream-100 text-butterfly-ink/50"
                            )}
                          >
                            {m}月
                          </div>
                        ))}
                        {region.bestMonths.length > 6 && (
                          <span className="text-[10px] text-butterfly-ink/40">
                            +{region.bestMonths.length - 6}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 迁徙追踪 */}
          {activeTab === "migration" && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink mb-3">
                  蝴蝶迁徙追踪
                </h2>
                <p className="text-butterfly-ink/60 max-w-xl mx-auto">
                  追踪那些踏上迁徙之旅的蝴蝶，见证自然界最壮观的旅程
                </p>
              </div>

              {migrations.length > 0 ? (
                <div className="space-y-6">
                  {migrations.map((migration, i) => {
                const butterfly = getButterflyById(migration.butterflyId);
                return (
                  <div
                    key={migration.butterflyId}
                    className="relative rounded-[2rem] overflow-hidden bg-white shadow-card card-hover opacity-0 animate-fade-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                      <div className="md:col-span-2 relative h-48 md:h-auto">
                        {butterfly && (
                          <img
                            src={butterfly.image}
                            alt={migration.butterflyName}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/60 md:to-white/80" />
                      </div>
                      <div className="md:col-span-3 p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
                            <Navigation className="w-6 h-6" strokeWidth={1.8} />
                          </div>
                          <div>
                            <h3 className="font-display text-2xl font-semibold text-butterfly-ink">
                              {migration.butterflyName}
                            </h3>
                            <p className="text-sm text-butterfly-ink/50">
                              迁徙距离：{migration.distance}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-5">
                          <div className="flex-1 p-3 rounded-xl bg-cream-100">
                            <p className="text-[10px] text-butterfly-ink/50 mb-1">出发地</p>
                            <p className="text-sm font-medium text-butterfly-ink">{migration.fromRegion}</p>
                          </div>
                          <div className="text-butterfly-pink-deep">
                            <ArrowRight className="w-5 h-5 animate-pulse" strokeWidth={2} />
                          </div>
                          <div className="flex-1 p-3 rounded-xl bg-cream-100 text-right">
                            <p className="text-[10px] text-butterfly-ink/50 mb-1">目的地</p>
                            <p className="text-sm font-medium text-butterfly-ink">{migration.toRegion}</p>
                          </div>
                        </div>

                        <p className="text-sm text-butterfly-ink/65 leading-relaxed mb-5">
                          {migration.description}
                        </p>

                        <div className="flex flex-wrap gap-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                          <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                          历时 {migration.duration}
                        </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                          <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                          {migration.startMonth}月 - {migration.endMonth}月
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cream-200/50 flex items-center justify-center">
                  <Navigation className="w-10 h-10 text-butterfly-ink/30" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-butterfly-ink/60 mb-2">
                  本月无大规模迁徙
                </h3>
                <p className="text-sm text-butterfly-ink/40">
                  蝴蝶们正在各自的栖息地中生活
                </p>
              </div>
            )}
            </div>
          )}

          {/* 观察攻略 */}
          {activeTab === "guides" && (
            <div className="space-y-8">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink mb-3">
                  蝴蝶观察攻略
                </h2>
                <p className="text-butterfly-ink/60 max-w-xl mx-auto">
                  从入门到专家，掌握蝴蝶观察的全攻略指南
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {observationGuides.map((guide, i) => (
                  <GuideCard key={guide.id} guide={guide} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-butterfly-ink text-cream-100/80 py-12">
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
          <p className="text-sm text-cream-100/60 max-w-md mx-auto leading-relaxed">
            Butterfly Whispers — 以轻盈自然之姿，讲述万千蝶类的故事。
            愿每一次停留，都能让你感受到自然的温柔与美好。
          </p>
          <div className="mt-6 pt-6 border-t border-cream-100/10 text-xs text-cream-100/40">
            © 2026 蝶语 Butterfly Whispers · Made with 🦋
          </div>
        </div>
      </footer>
    </div>
  );
}
