import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ShieldAlert,
  Filter,
  MapPin,
  ChevronRight,
  Globe2,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Minus,
  AlertTriangle,
  Sparkles,
  Trees,
  BookOpen,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  rareButterflies,
  conservationRegions,
  conservationStatuses,
} from "@/data/rareButterflies";
import type { ConservationStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusConfig: Record<ConservationStatus, { bg: string; text: string; border: string; dot: string }> = {
  无危: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" },
  近危: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
  易危: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500" },
  濒危: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
  极危: { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-200", dot: "bg-rose-600" },
  野外灭绝: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
  灭绝: { bg: "bg-gray-200", text: "text-gray-700", border: "border-gray-300", dot: "bg-gray-500" },
};

const trendIcon = {
  上升: TrendingUp,
  稳定: Minus,
  下降: TrendingDown,
  急剧下降: TrendingDown,
  未知: Minus,
};

type FilterTab = "all" | "endangered" | "endemic" | "regions";

export default function RareButterflyArchive() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [statusFilter, setStatusFilter] = useState<ConservationStatus | "all">("all");
  const [continentFilter, setContinentFilter] = useState<string>("all");

  const continents = useMemo(() => {
    const set = new Set<string>();
    rareButterflies.forEach((b) =>
      b.distributionRegions.forEach((r) => set.add(r.continent))
    );
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    let result = rareButterflies;

    if (activeTab === "endangered") {
      result = result.filter(
        (b) => b.conservationStatus === "濒危" || b.conservationStatus === "极危"
      );
    } else if (activeTab === "endemic") {
      result = result.filter((b) => b.isEndemic);
    }

    if (statusFilter !== "all") {
      result = result.filter((b) => b.conservationStatus === statusFilter);
    }

    if (continentFilter !== "all") {
      result = result.filter((b) =>
        b.distributionRegions.some((r) => r.continent === continentFilter)
      );
    }

    return result;
  }, [activeTab, statusFilter, continentFilter]);

  const tabs: { key: FilterTab; label: string; icon: typeof ShieldAlert }[] = [
    { key: "all", label: "全部珍稀物种", icon: Sparkles },
    { key: "endangered", label: "濒危与极危", icon: AlertTriangle },
    { key: "endemic", label: "地区特有种", icon: MapPin },
    { key: "regions", label: "保育区域", icon: Globe2 },
  ];

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-cream-50 to-amber-50">
        <div className="absolute inset-0 opacity-20 bg-grain" aria-hidden />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl animate-float" aria-hidden />
        <div className="absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-amber-200/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} aria-hidden />

        <div className="container relative mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-rose-100/80 text-sm text-rose-700 font-medium">
              <ShieldAlert className="w-4 h-4" strokeWidth={1.8} />
              Rare Butterfly Archive
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-butterfly-ink leading-tight mb-4">
              全球珍稀蝴蝶<span className="text-rose-600">档案库</span>
            </h1>
            <p className="text-butterfly-ink/60 text-lg leading-relaxed max-w-xl mx-auto">
              收录濒危、稀有和地区特有蝴蝶资料，了解种群现状、威胁因素与保护措施，
              关注全球保育行动，守护蝶类的未来。
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  activeTab === tab.key
                    ? "bg-rose-600 text-white shadow-md"
                    : "bg-white/70 text-butterfly-ink/70 hover:bg-white hover:text-butterfly-ink border border-rose-200/50"
                )}
              >
                <tab.icon className="w-4 h-4" strokeWidth={1.8} />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab !== "regions" && (
            <div className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl bg-white/60 border border-rose-200/30">
              <Filter className="w-4 h-4 text-butterfly-ink/50" strokeWidth={2} />
              <span className="text-sm text-butterfly-ink/50">筛选：</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ConservationStatus | "all")}
                className="px-3 py-1.5 rounded-full bg-white/80 border border-rose-200/50 text-sm text-butterfly-ink/80 focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                <option value="all">全部保护等级</option>
                {conservationStatuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                value={continentFilter}
                onChange={(e) => setContinentFilter(e.target.value)}
                className="px-3 py-1.5 rounded-full bg-white/80 border border-rose-200/50 text-sm text-butterfly-ink/80 focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                <option value="all">全部地区</option>
                {continents.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {activeTab !== "regions" ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((b, i) => {
                  const sc = statusConfig[b.conservationStatus];
                  const TrendIcon = trendIcon[b.population.trend];
                  return (
                    <Link
                      key={b.id}
                      to={`/rare-butterfly/${b.id}`}
                      className="group block rounded-3xl overflow-hidden bg-white shadow-card card-hover opacity-0 animate-fade-up"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={b.image}
                          alt={b.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm",
                            sc.bg, sc.text, sc.border
                          )}>
                            <span className={cn("w-1.5 h-1.5 rounded-full", sc.dot)} />
                            {b.conservationStatus}
                          </span>
                        </div>
                        {b.isEndemic && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-semibold backdrop-blur-sm">
                              <MapPin className="w-3 h-3" strokeWidth={2} />
                              特有种
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <div className="text-white">
                            <p className="font-display text-lg font-semibold">{b.name}</p>
                            <p className="text-xs opacity-80 font-serif italic">{b.latinName}</p>
                          </div>
                          <TrendIcon className={cn(
                            "w-5 h-5",
                            b.population.trend === "上升" ? "text-green-400" :
                            b.population.trend === "下降" || b.population.trend === "急剧下降" ? "text-red-400" :
                            "text-yellow-400"
                          )} strokeWidth={2} />
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-butterfly-ink/70 line-clamp-2 leading-relaxed mb-3">
                          {b.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-butterfly-ink/50">
                          <span>{b.family}</span>
                          <span className="text-rose-600 font-medium group-hover:text-rose-700 inline-flex items-center gap-1 transition-colors">
                            查看详情
                            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <ShieldAlert className="w-12 h-12 text-butterfly-ink/30 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-butterfly-ink/50">暂无符合条件的珍稀蝴蝶</p>
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conservationRegions.map((region, i) => (
                <div
                  key={region.name}
                  className="rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm border border-rose-200/30 shadow-card opacity-0 animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                        <Globe2 className="w-6 h-6 text-rose-600" strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-butterfly-ink">
                          {region.name}
                        </h3>
                        <p className="text-sm text-butterfly-ink/50 flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                          {region.continent} · {region.country}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-butterfly-ink/70 leading-relaxed mb-4">
                      {region.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs text-butterfly-ink/50 font-medium mb-2">关键物种</p>
                      <div className="flex flex-wrap gap-1.5">
                        {region.keySpecies.map((sp) => (
                          <span key={sp} className="px-2.5 py-1 rounded-full bg-rose-50 text-xs font-medium text-rose-700 border border-rose-200/50">
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-butterfly-ink/50 font-medium mb-2 flex items-center gap-1">
                          <Trees className="w-3.5 h-3.5" strokeWidth={2} />
                          保育行动
                        </p>
                        <ul className="space-y-1.5">
                          {region.conservationEfforts.map((effort, j) => (
                            <li key={j} className="text-xs text-butterfly-ink/70 flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                              {effort}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-butterfly-ink/50 font-medium mb-2 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} />
                          面临挑战
                        </p>
                        <ul className="space-y-1.5">
                          {region.challenges.map((c, j) => (
                            <li key={j} className="text-xs text-butterfly-ink/70 flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-rose-600" strokeWidth={1.8} />
            </div>
            <h2 className="font-display text-2xl font-semibold text-butterfly-ink">
              保护等级说明
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {conservationStatuses.map((status) => {
              const sc = statusConfig[status];
              return (
                <div key={status} className={cn("rounded-2xl p-4 border text-center", sc.bg, sc.border)}>
                  <div className={cn("w-3 h-3 rounded-full mx-auto mb-2", sc.dot)} />
                  <p className={cn("text-sm font-semibold", sc.text)}>{status}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream-100">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-to-br from-rose-50 via-cream-50 to-amber-50 border border-rose-200/30 p-8 md:p-10 text-center">
            <ShieldAlert className="w-10 h-10 text-rose-500 mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink mb-3">
              每一只蝴蝶都值得守护
            </h2>
            <p className="text-butterfly-ink/60 max-w-lg mx-auto leading-relaxed mb-6">
              全球约20%的蝴蝶物种面临灭绝威胁。栖息地丧失、气候变化和非法采集是最大威胁。
              了解是保护的第一步，让我们共同关注珍稀蝶类的命运。
            </p>
            <Link
              to="/butterflies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 text-white font-medium shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              浏览蝴蝶图鉴
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
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
