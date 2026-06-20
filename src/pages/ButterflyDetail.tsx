import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  TreeDeciduous,
  Sparkles,
  Flame,
  BookOpen,
  ChevronRight,
  Home,
  Search,
  ThermometerSun,
  ShieldAlert,
  Globe2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyCard from "@/components/ButterflyCard";
import { getButterflyById, getRandomButterflies, butterflies } from "@/data/butterflies";
import type { RarityLevel, Climate } from "@/types";
import { cn } from "@/lib/utils";

const rarityConfig: Record<RarityLevel, { bg: string; text: string; border: string; icon: string; desc: string }> = {
  常见: {
    bg: "bg-butterfly-green-light/40",
    text: "text-butterfly-green-deep",
    border: "border-butterfly-green/40",
    icon: "🌿",
    desc: "种群稳定，在适宜栖息地较为常见",
  },
  较常见: {
    bg: "bg-butterfly-pink-light/40",
    text: "text-butterfly-pink-deep",
    border: "border-butterfly-pink/40",
    icon: "🌸",
    desc: "分布较广，在特定季节数量较多",
  },
  稀有: {
    bg: "bg-[#E8D4B4]/40",
    text: "text-[#B8956A]",
    border: "border-[#D4B48F]/40",
    icon: "✨",
    desc: "数量稀少，需要特定栖息环境",
  },
  极稀有: {
    bg: "bg-[#D4B4E8]/40",
    text: "text-[#956AB8]",
    border: "border-[#B895D4]/40",
    icon: "💎",
    desc: "极为罕见，仅在少数地点有记录",
  },
  濒危: {
    bg: "bg-[#E8B4B4]/40",
    text: "text-[#B86A6A]",
    border: "border-[#E89595]/40",
    icon: "🔴",
    desc: "生存面临严重威胁，需重点保护",
  },
};

const climateConfig: Record<Climate, { icon: string; desc: string }> = {
  热带: { icon: "🌴", desc: "全年高温多雨，热带雨林气候" },
  亚热带: { icon: "🌿", desc: "四季分明，夏季炎热冬季温和" },
  温带: { icon: "🍂", desc: "四季分明，冬夏温差较大" },
  寒带: { icon: "❄️", desc: "全年寒冷，短暂夏季" },
  高山: { icon: "⛰️", desc: "高海拔山地，气温随高度递减" },
  地中海: { icon: "🌊", desc: "夏季干燥炎热，冬季温和多雨" },
};

export default function ButterflyDetail() {
  const { id } = useParams<{ id: string }>();
  const butterfly = id ? getButterflyById(id) : undefined;
  const related = useMemo(() => {
    if (!butterfly) return [];
    const sameCategory = butterflies
      .filter((b) => b.id !== butterfly.id && b.category === butterfly.category)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    if (sameCategory.length >= 3) return sameCategory;
    return getRandomButterflies(3).filter((b) => b.id !== butterfly.id).slice(0, 3);
  }, [butterfly]);

  if (!butterfly) {
    return (
      <div className="min-h-screen bg-cream-100">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex w-24 h-24 items-center justify-center rounded-full bg-butterfly-pink-light/40 mb-6">
            <Search
              className="w-10 h-10 text-butterfly-pink-deep/60"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="font-display text-3xl font-semibold text-butterfly-ink mb-3">
            未找到该蝴蝶
          </h1>
          <p className="text-butterfly-ink/60 mb-8">
            你访问的蝴蝶可能已经飞走了，换一只看看吧～
          </p>
          <Link
            to="/butterflies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-butterfly-pink-deep text-white font-medium hover:shadow-soft transition-all"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            返回蝴蝶图鉴
          </Link>
        </div>
      </div>
    );
  }

  const rarityInfo = rarityConfig[butterfly.rarity];

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-60" />
        <div
          className="absolute inset-0 opacity-20 bg-grain"
          aria-hidden
        />
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-butterfly-pink/30 blur-3xl animate-float"
          aria-hidden
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-butterfly-green/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />

        <div className="container relative mx-auto px-4 pt-20 pb-28 md:pt-28 md:pb-32">
          <nav className="flex items-center gap-2 text-xs text-butterfly-ink/50 flex-wrap mb-8 opacity-0 animate-fade-up">
            <Link to="/" className="inline-flex items-center gap-1 hover:text-butterfly-pink-deep transition-colors">
              <Home className="w-3.5 h-3.5" strokeWidth={2} />
              首页
            </Link>
            <ChevronRight className="w-3 h-3" strokeWidth={2} />
            <Link to="/map" className="hover:text-butterfly-pink-deep transition-colors">
              世界地图
            </Link>
            <ChevronRight className="w-3 h-3" strokeWidth={2} />
            <Link to="/butterflies" className="hover:text-butterfly-pink-deep transition-colors">
              蝴蝶图鉴
            </Link>
            <ChevronRight className="w-3 h-3" strokeWidth={2} />
            <span className="text-butterfly-ink/80 truncate">{butterfly.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 text-sm text-butterfly-pink-deep font-medium mb-5 backdrop-blur-sm border border-white/50">
                <Sparkles className="w-4 h-4" strokeWidth={2} />
                {butterfly.category}
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
                  to="/map"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-butterfly-pink-deep text-white text-sm font-medium shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Globe2 className="w-4 h-4" strokeWidth={2} />
                  在地图上查看
                </Link>
                <Link
                  to="/butterflies"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-butterfly-pink/30 text-butterfly-ink/80 text-sm font-medium hover:bg-white transition-all"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                  返回图鉴
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-butterfly-pink/30 via-butterfly-green/20 to-butterfly-gold/30 rounded-[3rem] blur-2xl opacity-60" />
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-hover">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={butterfly.image}
                      alt={butterfly.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {butterfly.popularity >= 90 && (
                    <div className="absolute top-5 right-5">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-butterfly-gold/95 text-white text-xs font-semibold tracking-wide backdrop-blur-sm">
                        <Flame className="w-3.5 h-3.5" strokeWidth={2} />
                        人气蝴蝶
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-center justify-between">
                      <div className="text-white">
                        <p className="text-xs opacity-80 font-serif italic">{butterfly.family}</p>
                        <p className="text-sm opacity-70">{butterfly.genus}</p>
                      </div>
                      <div className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm",
                        rarityInfo.bg,
                        rarityInfo.text,
                        rarityInfo.border
                      )}>
                        {rarityInfo.icon} {butterfly.rarity}
                      </div>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-butterfly-pink/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-butterfly-green-light/60 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-butterfly-green-deep" strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-xs text-butterfly-ink/50 mb-1">翅展范围</p>
              <p className="text-lg font-semibold text-butterfly-ink">{butterfly.wingspan}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-butterfly-pink/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.45s" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-butterfly-pink-light/60 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-butterfly-pink-deep" strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-xs text-butterfly-ink/50 mb-1">分布区域</p>
              <p className="text-sm font-semibold text-butterfly-ink leading-tight">{butterfly.distribution}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-butterfly-pink/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5E6D3] flex items-center justify-center">
                  <TreeDeciduous className="w-5 h-5 text-butterfly-gold" strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-xs text-butterfly-ink/50 mb-1">栖息环境</p>
              <p className="text-sm font-semibold text-butterfly-ink leading-tight">{butterfly.habitat}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-butterfly-pink/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", rarityInfo.bg)}>
                  <ShieldAlert className={cn("w-5 h-5", rarityInfo.text)} strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-xs text-butterfly-ink/50 mb-1">稀有程度</p>
              <p className={cn("text-lg font-semibold", rarityInfo.text)}>{butterfly.rarity}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 border border-butterfly-pink/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.6s" }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-butterfly-green-light/50 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-butterfly-green-deep" strokeWidth={1.8} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-butterfly-ink">
                    物种简介
                  </h2>
                </div>
                <p className="text-butterfly-ink/80 leading-[1.9] text-[15px]">
                  {butterfly.description}
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 border border-butterfly-pink/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
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
                      className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 border border-butterfly-pink/20 hover:bg-white hover:border-butterfly-pink/40 transition-all"
                    >
                      <span className="flex-none w-6 h-6 mt-0.5 rounded-full bg-butterfly-pink-light flex items-center justify-center text-[11px] font-semibold text-butterfly-pink-deep">
                        {i + 1}
                      </span>
                      <p className="text-sm text-butterfly-ink/80 leading-relaxed">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-cream-50 to-butterfly-green-light/40 rounded-3xl p-6 border border-butterfly-green/20 opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-white/80 flex items-center justify-center">
                    <ThermometerSun className="w-5 h-5 text-butterfly-green-deep" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-butterfly-ink">
                    气候环境
                  </h3>
                </div>
                <div className="space-y-3">
                  {butterfly.climate.map((c) => (
                    <div key={c} className="flex items-center gap-3 p-3 rounded-2xl bg-white/70">
                      <span className="text-2xl">{climateConfig[c].icon}</span>
                      <div>
                        <p className="text-sm font-medium text-butterfly-ink">{c}气候</p>
                        <p className="text-xs text-butterfly-ink/50">{climateConfig[c].desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn(
                "rounded-3xl p-6 border opacity-0 animate-fade-up",
                rarityInfo.bg,
                rarityInfo.border
              )} style={{ animationDelay: "0.75s" }}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center">
                    <ShieldAlert className={cn("w-5 h-5", rarityInfo.text)} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-butterfly-ink">
                    稀有情况
                  </h3>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{rarityInfo.icon}</span>
                  <div>
                    <p className={cn("text-xl font-bold", rarityInfo.text)}>{butterfly.rarity}</p>
                    <p className="text-xs text-butterfly-ink/50">保护等级评估</p>
                  </div>
                </div>
                <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                  {rarityInfo.desc}
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-butterfly-pink/20 opacity-0 animate-fade-up" style={{ animationDelay: "0.85s" }}>
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
                        <span className="w-2 h-2 rounded-full bg-butterfly-pink-deep" />
                        <span className="text-sm font-semibold text-butterfly-ink">{region.continent}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pl-4">
                        {region.countries.map((country) => (
                          <span
                            key={country}
                            className="px-2.5 py-1 rounded-full bg-butterfly-pink-light/40 text-xs text-butterfly-ink/70"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/map"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-butterfly-pink-deep font-medium hover:text-butterfly-pink-deep/80 transition-colors"
                >
                  在地图上查看分布
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </Link>
              </div>

              <div className="bg-gradient-to-br from-white/70 to-cream-50/70 backdrop-blur-sm rounded-3xl p-6 border border-butterfly-pink/20 opacity-0 animate-fade-up" style={{ animationDelay: "0.95s" }}>
                <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-4">
                  科学分类
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-butterfly-pink/15">
                    <span className="text-butterfly-ink/50">科</span>
                    <span className="font-medium text-butterfly-ink">{butterfly.family}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-butterfly-pink/15">
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

      {related.length > 0 && (
        <section className="py-16 bg-cream-50 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full bg-butterfly-pink-light/30 blur-3xl"
            aria-hidden
          />
          <div className="container relative mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-sm text-butterfly-green-deep font-medium tracking-wide uppercase mb-2">
                    Related Species
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink">
                    同类蝴蝶 · 一起探索
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((b, i) => (
                  <ButterflyCard key={b.id} butterfly={b} index={i} />
                ))}
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
