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
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyCard from "@/components/ButterflyCard";
import { getButterflyById, getRandomButterflies, butterflies } from "@/data/butterflies";

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

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-cream-50/80 border-b border-butterfly-pink/10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-xs text-butterfly-ink/50 flex-wrap">
            <Link to="/" className="inline-flex items-center gap-1 hover:text-butterfly-pink-deep transition-colors">
              <Home className="w-3.5 h-3.5" strokeWidth={2} />
              首页
            </Link>
            <ChevronRight className="w-3 h-3" strokeWidth={2} />
            <Link to="/butterflies" className="hover:text-butterfly-pink-deep transition-colors">
              蝴蝶图鉴
            </Link>
            <ChevronRight className="w-3 h-3" strokeWidth={2} />
            <span className="text-butterfly-ink/80 truncate">{butterfly.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Image Section */}
            <div className="lg:col-span-3">
              <div className="relative rounded-[2rem] overflow-hidden shadow-soft group opacity-0 animate-fade-up">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={butterfly.image}
                    alt={butterfly.name}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                {butterfly.popularity >= 90 && (
                  <div className="absolute top-5 right-5">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-butterfly-gold/95 text-white text-xs font-semibold tracking-wide">
                      <Flame className="w-3.5 h-3.5" strokeWidth={2} />
                      人气蝴蝶
                    </span>
                  </div>
                )}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                  <div>
                    <p className="text-xs opacity-80 font-serif italic mb-1">
                      {butterfly.latinName}
                    </p>
                    <p className="text-xs opacity-70">
                      {butterfly.family} · {butterfly.genus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-10 opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-butterfly-green-deep" strokeWidth={1.8} />
                  <h2 className="font-display text-2xl font-semibold text-butterfly-ink">
                    物种简介
                  </h2>
                </div>
                <p className="text-butterfly-ink/80 leading-[1.9] text-[15px]">
                  {butterfly.description}
                </p>
              </div>

              {/* Features */}
              <div className="mt-10 opacity-0 animate-fade-up" style={{ animationDelay: "0.25s" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-5 h-5 text-butterfly-pink-deep" strokeWidth={1.8} />
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

            {/* Info Panel */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Title */}
                <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-butterfly-pink-light/60 text-sm text-butterfly-pink-deep font-medium mb-4">
                    <Sparkles className="w-4 h-4" strokeWidth={2} />
                    {butterfly.category}
                  </div>
                  <h1 className="font-display text-4xl md:text-5xl font-semibold text-butterfly-ink leading-tight mb-2">
                    {butterfly.name}
                  </h1>
                  <p className="font-serif italic text-butterfly-ink/60 text-lg">
                    {butterfly.latinName}
                  </p>
                </div>

                {/* Info Cards */}
                <div
                  className="p-6 rounded-3xl bg-white shadow-card border border-butterfly-pink/10 space-y-5 opacity-0 animate-fade-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <h3 className="font-display text-lg font-semibold text-butterfly-ink pb-3 border-b border-butterfly-pink/10">
                    基础信息
                  </h3>

                  <div className="flex items-start gap-4">
                    <div className="flex-none w-10 h-10 rounded-2xl bg-butterfly-green-light/60 flex items-center justify-center">
                      <Ruler className="w-5 h-5 text-butterfly-green-deep" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-xs text-butterfly-ink/50 mb-0.5">翅展范围</p>
                      <p className="text-butterfly-ink font-medium">{butterfly.wingspan}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-none w-10 h-10 rounded-2xl bg-butterfly-pink-light/60 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-butterfly-pink-deep" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-xs text-butterfly-ink/50 mb-0.5">分布地区</p>
                      <p className="text-butterfly-ink font-medium leading-relaxed">{butterfly.distribution}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-none w-10 h-10 rounded-2xl bg-[#F5E6D3] flex items-center justify-center">
                      <TreeDeciduous className="w-5 h-5 text-butterfly-gold" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-xs text-butterfly-ink/50 mb-0.5">栖息环境</p>
                      <p className="text-butterfly-ink font-medium leading-relaxed">{butterfly.habitat}</p>
                    </div>
                  </div>
                </div>

                {/* Taxonomy */}
                <div
                  className="p-6 rounded-3xl bg-gradient-to-br from-cream-50 to-butterfly-pink-light/40 border border-butterfly-pink/20 opacity-0 animate-fade-up"
                  style={{ animationDelay: "0.3s" }}
                >
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

                {/* Action */}
                <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                  <Link
                    to="/butterflies"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-butterfly-ink/20 text-butterfly-ink/80 text-sm font-medium hover:bg-white hover:border-butterfly-pink/40 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                    返回蝴蝶图鉴
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-cream-50">
          <div className="container mx-auto px-4">
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
        </section>
      )}

      {/* Footer */}
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
