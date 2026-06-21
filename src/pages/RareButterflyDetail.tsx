import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  ShieldAlert,
  ChevronRight,
  Home,
  TrendingDown,
  TrendingUp,
  Minus,
  AlertTriangle,
  Sparkles,
  BookOpen,
  TreeDeciduous,
  Clock,
  CheckCircle2,
  CircleDot,
  Circle,
  Users,
  Globe2,
  Leaf,
  Microscope,
  GraduationCap,
  Handshake,
  Scale,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { getRareButterflyById, rareButterflies, conservationRegions } from "@/data/rareButterflies";
import type { ConservationStatus, ThreatFactor, ConservationMeasure } from "@/types";
import { cn } from "@/lib/utils";

const statusConfig: Record<ConservationStatus, { bg: string; text: string; border: string; dot: string; desc: string }> = {
  无危: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", dot: "bg-green-500", desc: "种群数量稳定，暂无灭绝风险" },
  近危: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500", desc: "接近受威胁状态，需持续关注" },
  易危: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500", desc: "面临较高灭绝风险" },
  濒危: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", dot: "bg-red-500", desc: "生存面临严重威胁，种群急剧减少" },
  极危: { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-200", dot: "bg-rose-600", desc: "野外灭绝风险极高，需紧急保护" },
  野外灭绝: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500", desc: "仅在人工条件下存活" },
  灭绝: { bg: "bg-gray-200", text: "text-gray-700", border: "border-gray-300", dot: "bg-gray-500", desc: "已确认灭绝" },
};

const severityConfig: Record<ThreatFactor["severity"], { bg: string; text: string; width: string }> = {
  低: { bg: "bg-yellow-100", text: "text-yellow-700", width: "w-1/4" },
  中: { bg: "bg-orange-100", text: "text-orange-700", width: "w-2/4" },
  高: { bg: "bg-red-100", text: "text-red-700", width: "w-3/4" },
  极高: { bg: "bg-rose-100", text: "text-rose-800", width: "w-full" },
};

const measureTypeIcon: Record<ConservationMeasure["type"], typeof Scale> = {
  法律保护: Scale,
  栖息地恢复: TreeDeciduous,
  人工繁育: Microscope,
  科学研究: BookOpen,
  公众教育: GraduationCap,
  国际合作: Handshake,
};

const measureStatusIcon: Record<ConservationMeasure["status"], typeof CheckCircle2> = {
  已实施: CheckCircle2,
  进行中: CircleDot,
  规划中: Circle,
};

const trendConfig = {
  上升: { icon: TrendingUp, color: "text-green-600", bg: "bg-green-50", label: "种群上升" },
  稳定: { icon: Minus, color: "text-yellow-600", bg: "bg-yellow-50", label: "种群稳定" },
  下降: { icon: TrendingDown, color: "text-orange-600", bg: "bg-orange-50", label: "种群下降" },
  急剧下降: { icon: TrendingDown, color: "text-red-600", bg: "bg-red-50", label: "急剧下降" },
  未知: { icon: Minus, color: "text-gray-500", bg: "bg-gray-50", label: "趋势未知" },
};

export default function RareButterflyDetail() {
  const { id } = useParams<{ id: string }>();
  const butterfly = id ? getRareButterflyById(id) : undefined;

  if (!butterfly) {
    return (
      <div className="min-h-screen bg-cream-100">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex w-24 h-24 items-center justify-center rounded-full bg-rose-100/60 mb-6">
            <ShieldAlert className="w-10 h-10 text-rose-500/60" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-3xl font-semibold text-butterfly-ink mb-3">
            未找到该珍稀蝴蝶
          </h1>
          <p className="text-butterfly-ink/60 mb-8">
            你访问的珍稀蝴蝶档案可能尚未收录，请返回档案库查看更多。
          </p>
          <Link
            to="/rare-archive"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 text-white font-medium hover:shadow-soft transition-all"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            返回珍稀档案库
          </Link>
        </div>
      </div>
    );
  }

  const sc = statusConfig[butterfly.conservationStatus];
  const trend = trendConfig[butterfly.population.trend];
  const TrendIcon = trend.icon;

  const relatedRegions = conservationRegions.filter((r) =>
    r.keySpecies.includes(butterfly.name)
  );

  const relatedButterflies = rareButterflies
    .filter((b) => b.id !== butterfly.id)
    .filter((b) =>
      b.distributionRegions.some((r1) =>
        butterfly.distributionRegions.some((r2) => r1.continent === r2.continent)
      )
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-cream-50 to-amber-50 opacity-80" />
        <div className="absolute inset-0 opacity-20 bg-grain" aria-hidden />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl animate-float" aria-hidden />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} aria-hidden />

        <div className="container relative mx-auto px-4 pt-20 pb-28 md:pt-28 md:pb-32">
          <nav className="flex items-center gap-2 text-xs text-butterfly-ink/50 flex-wrap mb-8 opacity-0 animate-fade-up">
            <Link to="/" className="inline-flex items-center gap-1 hover:text-rose-600 transition-colors">
              <Home className="w-3.5 h-3.5" strokeWidth={2} />
              首页
            </Link>
            <ChevronRight className="w-3 h-3" strokeWidth={2} />
            <Link to="/rare-archive" className="hover:text-rose-600 transition-colors">
              珍稀蝴蝶档案库
            </Link>
            <ChevronRight className="w-3 h-3" strokeWidth={2} />
            <span className="text-butterfly-ink/80 truncate">{butterfly.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className={cn(
                  "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-sm",
                  sc.bg, sc.text, sc.border
                )}>
                  <span className={cn("w-2 h-2 rounded-full", sc.dot)} />
                  {butterfly.conservationStatus}
                </span>
                {butterfly.isEndemic && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100 text-sm font-medium text-amber-700 border border-amber-200">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                    {butterfly.endemicRegion}特有
                  </span>
                )}
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-butterfly-ink leading-[1.1] mb-3">
                {butterfly.name}
              </h1>
              <p className="font-serif italic text-xl text-butterfly-ink/60 mb-6">
                {butterfly.latinName}
              </p>

              <p className="text-butterfly-ink/70 text-lg leading-[1.8] max-w-xl mb-8">
                {butterfly.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/rare-archive"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 text-white text-sm font-medium shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                  返回档案库
                </Link>
                {butterfly.relatedButterflyId && (
                  <Link
                    to={`/butterfly/${butterfly.relatedButterflyId}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-rose-200/50 text-butterfly-ink/80 text-sm font-medium hover:bg-white transition-all"
                  >
                    <Sparkles className="w-4 h-4" strokeWidth={2} />
                    蝴蝶图鉴
                  </Link>
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-rose-200/40 via-amber-200/30 to-rose-300/30 rounded-[3rem] blur-2xl opacity-60" />
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-hover">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={butterfly.image}
                      alt={butterfly.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div className="text-white">
                      <p className="text-xs opacity-80 font-serif italic">{butterfly.family}</p>
                      <p className="text-sm opacity-70">{butterfly.genus}</p>
                    </div>
                    <div className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm",
                      sc.bg, sc.text, sc.border
                    )}>
                      {butterfly.conservationStatus}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-rose-200/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100/60 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-rose-600" strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-xs text-butterfly-ink/50 mb-1">翅展范围</p>
              <p className="text-lg font-semibold text-butterfly-ink">{butterfly.wingspan}</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-rose-200/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.45s" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100/60 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-600" strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-xs text-butterfly-ink/50 mb-1">分布区域</p>
              <p className="text-sm font-semibold text-butterfly-ink leading-tight">{butterfly.distribution}</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-rose-200/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-100/60 flex items-center justify-center">
                  <TreeDeciduous className="w-5 h-5 text-green-600" strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-xs text-butterfly-ink/50 mb-1">栖息环境</p>
              <p className="text-sm font-semibold text-butterfly-ink leading-tight">{butterfly.habitat}</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-rose-200/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", sc.bg)}>
                  <ShieldAlert className={cn("w-5 h-5", sc.text)} strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-xs text-butterfly-ink/50 mb-1">保护等级</p>
              <p className={cn("text-lg font-semibold", sc.text)}>{butterfly.conservationStatus}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="lg:col-span-2 space-y-6">

              <div className={cn("rounded-3xl p-7 border", sc.bg, sc.border)} style={{ animationDelay: "0.6s" }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className={cn("w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center")}>
                    <Users className={cn("w-5 h-5", sc.text)} strokeWidth={1.8} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-butterfly-ink">
                    种群现状
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div className="bg-white/60 rounded-2xl p-4">
                    <p className="text-xs text-butterfly-ink/50 mb-1">估计种群数量</p>
                    <p className="text-xl font-bold text-butterfly-ink">{butterfly.population.estimatedPopulation}</p>
                  </div>
                  <div className={cn("rounded-2xl p-4", trend.bg)}>
                    <p className="text-xs text-butterfly-ink/50 mb-1">种群趋势</p>
                    <div className="flex items-center gap-2">
                      <TrendIcon className={cn("w-5 h-5", trend.color)} strokeWidth={2} />
                      <p className={cn("text-xl font-bold", trend.color)}>{trend.label}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-butterfly-ink/60">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" strokeWidth={1.8} />
                    最近评估：{butterfly.population.lastAssessment}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" strokeWidth={1.8} />
                    {butterfly.population.assessmentSource}
                  </span>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 border border-rose-200/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-red-100/60 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" strokeWidth={1.8} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-butterfly-ink">
                    威胁因素
                  </h2>
                </div>

                <div className="space-y-4">
                  {butterfly.threats.map((threat, i) => {
                    const sev = severityConfig[threat.severity];
                    return (
                      <div key={i} className="rounded-2xl p-5 bg-white/70 border border-rose-200/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{threat.category === "栖息地丧失" ? "🌲" : threat.category === "气候变化" ? "🌡️" : threat.category === "非法采集" ? "🪤" : threat.category === "农药污染" ? "⚗️" : threat.category === "外来物种入侵" ? "🐛" : threat.category === "过度开发" ? "⛏️" : threat.category === "疾病" ? "🦠" : "💡"}</span>
                            <span className="font-medium text-butterfly-ink">{threat.category}</span>
                          </div>
                          <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", sev.bg, sev.text)}>
                            {threat.severity}威胁
                          </span>
                        </div>
                        <p className="text-sm text-butterfly-ink/70 leading-relaxed mb-3">
                          {threat.description}
                        </p>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full transition-all duration-500",
                            threat.severity === "极高" ? "bg-gradient-to-r from-red-400 to-rose-600" :
                            threat.severity === "高" ? "bg-gradient-to-r from-orange-400 to-red-500" :
                            threat.severity === "中" ? "bg-gradient-to-r from-yellow-400 to-orange-400" :
                            "bg-gradient-to-r from-yellow-300 to-yellow-400",
                            sev.width
                          )} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 border border-rose-200/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-green-100/60 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-green-600" strokeWidth={1.8} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-butterfly-ink">
                    保护措施
                  </h2>
                </div>

                <div className="space-y-4">
                  {butterfly.conservationMeasures.map((measure, i) => {
                    const TypeIcon = measureTypeIcon[measure.type];
                    const StatusIcon = measureStatusIcon[measure.status];
                    return (
                      <div key={i} className="rounded-2xl p-5 bg-white/70 border border-green-200/20 hover:border-green-200/50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-green-100/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <TypeIcon className="w-5 h-5 text-green-600" strokeWidth={1.8} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-display text-lg font-semibold text-butterfly-ink">
                                {measure.title}
                              </h3>
                              <span className={cn(
                                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium",
                                measure.status === "已实施" ? "bg-green-100 text-green-700" :
                                measure.status === "进行中" ? "bg-blue-100 text-blue-700" :
                                "bg-gray-100 text-gray-600"
                              )}>
                                <StatusIcon className="w-3 h-3" strokeWidth={2} />
                                {measure.status}
                              </span>
                            </div>
                            <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                              {measure.description}
                            </p>
                            <div className="mt-2">
                              <span className="text-xs text-butterfly-ink/40">{measure.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 border border-rose-200/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.75s" }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-butterfly-pink-light/50 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-butterfly-pink-deep" strokeWidth={1.8} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-butterfly-ink">
                    识别特征
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {butterfly.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 border border-rose-200/20 hover:bg-white hover:border-rose-200/50 transition-all"
                    >
                      <span className="flex-none w-6 h-6 mt-0.5 rounded-full bg-rose-100 flex items-center justify-center text-[11px] font-semibold text-rose-600">
                        {i + 1}
                      </span>
                      <p className="text-sm text-butterfly-ink/80 leading-relaxed">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className={cn("rounded-3xl p-6 border opacity-0 animate-fade-up", sc.bg, sc.border)} style={{ animationDelay: "0.6s" }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center">
                    <ShieldAlert className={cn("w-5 h-5", sc.text)} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-butterfly-ink">
                    保护等级
                  </h3>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={cn("w-4 h-4 rounded-full", sc.dot)} />
                  <p className={cn("text-2xl font-bold", sc.text)}>{butterfly.conservationStatus}</p>
                </div>
                <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                  {sc.desc}
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-rose-200/20 opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-butterfly-pink-light/50 flex items-center justify-center">
                    <Globe2 className="w-5 h-5 text-butterfly-pink-deep" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-butterfly-ink">
                    分布范围
                  </h3>
                </div>
                <div className="space-y-3">
                  {butterfly.distributionRegions.map((region, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="text-sm font-semibold text-butterfly-ink">{region.continent}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pl-4">
                        {region.countries.map((country) => (
                          <span
                            key={country}
                            className="px-2.5 py-1 rounded-full bg-rose-50 text-xs text-butterfly-ink/70 border border-rose-200/30"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {butterfly.isEndemic && butterfly.endemicRegion && (
                  <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200/50">
                    <p className="text-xs text-amber-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                      地区特有种：仅分布于 {butterfly.endemicRegion}
                    </p>
                  </div>
                )}
              </div>

              {relatedRegions.length > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-cream-50 rounded-3xl p-6 border border-green-200/30 opacity-0 animate-fade-up" style={{ animationDelay: "0.8s" }}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-green-100/60 flex items-center justify-center">
                      <Globe2 className="w-5 h-5 text-green-600" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-butterfly-ink">
                      所属保育区域
                    </h3>
                  </div>
                  {relatedRegions.map((region) => (
                    <div key={region.name} className="rounded-2xl p-4 bg-white/60 border border-green-200/20 mb-3 last:mb-0">
                      <p className="font-medium text-butterfly-ink text-sm mb-2">{region.name}</p>
                      <p className="text-xs text-butterfly-ink/60 leading-relaxed mb-2">{region.description}</p>
                      <div className="space-y-1">
                        {region.conservationEfforts.slice(0, 3).map((effort, j) => (
                          <p key={j} className="text-xs text-butterfly-ink/70 flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                            {effort}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-gradient-to-br from-white/70 to-cream-50/70 backdrop-blur-sm rounded-3xl p-6 border border-rose-200/20 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
                <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-4">
                  科学分类
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-rose-200/15">
                    <span className="text-butterfly-ink/50">科</span>
                    <span className="font-medium text-butterfly-ink">{butterfly.family}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-rose-200/15">
                    <span className="text-butterfly-ink/50">属</span>
                    <span className="font-medium text-butterfly-ink">{butterfly.genus}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-butterfly-ink/50">学名</span>
                    <span className="font-serif italic text-butterfly-ink">{butterfly.latinName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedButterflies.length > 0 && (
        <section className="py-16 bg-cream-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-rose-200/20 blur-3xl" aria-hidden />
          <div className="container relative mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-sm text-rose-600 font-medium tracking-wide uppercase mb-2">
                    Related Rare Species
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink">
                    同区域珍稀物种
                  </h2>
                </div>
                <Link
                  to="/rare-archive"
                  className="hidden sm:inline-flex items-center gap-1 text-sm text-rose-600 hover:text-rose-700 font-medium"
                >
                  查看全部
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedButterflies.map((b, i) => {
                  const rsc = statusConfig[b.conservationStatus];
                  return (
                    <Link
                      key={b.id}
                      to={`/rare-butterfly/${b.id}`}
                      className="group block rounded-3xl overflow-hidden bg-white shadow-card card-hover"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={b.image}
                          alt={b.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-sm",
                            rsc.bg, rsc.text, rsc.border
                          )}>
                            {b.conservationStatus}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-lg font-semibold text-butterfly-ink">{b.name}</h3>
                        <p className="text-xs text-butterfly-ink/50 italic font-serif">{b.latinName}</p>
                        <p className="text-sm text-butterfly-ink/60 mt-2 line-clamp-2">{b.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

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
