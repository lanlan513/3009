import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight, Search, BookOpen, Gem, Flame, Filter, MapPin, Calendar, User, ArrowRight, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import { specimens, specimenCategories, conservationStatusColors, conditionColors } from "@/data/specimens";
import type { Specimen } from "@/types";
import { cn } from "@/lib/utils";

const ENHANCED_3D_IDS = ["specimen-1", "specimen-2", "specimen-4"];

function SparklesBadge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L13 7L17 8L13 9L12 13L11 9L7 8L11 7L12 3Z" fill="currentColor" />
      <path d="M19 14L19.6 15.6L21.2 16.2L19.6 16.8L19 18.4L18.4 16.8L16.8 16.2L18.4 15.6L19 14Z" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

const categoryIcons: Record<string, React.ReactNode> = {
  "历史标本": <BookOpen className="w-4 h-4" strokeWidth={1.8} />,
  "珍稀物种": <Gem className="w-4 h-4" strokeWidth={1.8} />,
  "已灭绝近缘种": <Flame className="w-4 h-4" strokeWidth={1.8} />,
};

const categoryGradients: Record<string, string> = {
  "历史标本": "from-amber-50 to-amber-100/50 border-amber-200/50",
  "珍稀物种": "from-emerald-50 to-emerald-100/50 border-emerald-200/50",
  "已灭绝近缘种": "from-rose-50 to-rose-100/50 border-rose-200/50",
  "全部": "from-purple-50 to-purple-100/50 border-purple-200/50",
};

const categoryAccentColors: Record<string, string> = {
  "历史标本": "text-amber-700",
  "珍稀物种": "text-emerald-700",
  "已灭绝近缘种": "text-rose-700",
  "全部": "text-purple-700",
};

export default function SpecimenMuseum() {
  const [activeCategory, setActiveCategory] = useState<string>("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpecimens = useMemo(() => {
    let result = specimens;

    if (activeCategory !== "全部") {
      result = result.filter((s) => s.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const lower = searchQuery.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(lower) ||
          s.latinName.toLowerCase().includes(lower) ||
          s.family.toLowerCase().includes(lower) ||
          s.genus.toLowerCase().includes(lower) ||
          s.collector.toLowerCase().includes(lower) ||
          s.tags.some((t) => t.toLowerCase().includes(lower))
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const stats = useMemo(() => ({
    total: specimens.length,
    historical: specimens.filter((s) => s.category === "历史标本").length,
    rare: specimens.filter((s) => s.category === "珍稀物种").length,
    extinct: specimens.filter((s) => s.category === "已灭绝近缘种").length,
  }), []);

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      <div className="container mx-auto px-4 pt-8">
        <nav className="flex items-center gap-2 text-xs text-butterfly-ink/50 flex-wrap mb-8">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-butterfly-pink-deep transition-colors">
            <Home className="w-3.5 h-3.5" strokeWidth={2} />
            首页
          </Link>
          <ChevronRight className="w-3 h-3" strokeWidth={2} />
          <span className="text-butterfly-ink/80">标本博物馆</span>
        </nav>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-cream-100 to-rose-50">
        <div
          className="absolute inset-0 opacity-30 bg-grain"
          aria-hidden
        />
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl animate-float"
          aria-hidden
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-rose-200/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />

        <div className="container relative mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-sm text-amber-700 opacity-0 animate-fade-up">
              <Layers className="w-4 h-4" strokeWidth={1.8} />
              <span>珍藏百年的自然遗产</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-semibold text-butterfly-ink mb-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              蝴蝶标本数字博物馆
            </h1>
            <p className="text-butterfly-ink/60 leading-relaxed mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              收录历史标本、珍稀物种和已灭绝近缘种资料。每一件标本都承载着一段发现的故事，
              通过3D展示页面可以旋转查看标本细节，了解背后的发现历史和研究记录。
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <StatCard number={stats.total} label="总藏标本" icon="🦋" delay="0.1s" />
              <StatCard number={stats.historical} label="历史标本" icon="📜" delay="0.2s" />
              <StatCard number={stats.rare} label="珍稀物种" icon="💎" delay="0.3s" />
              <StatCard number={stats.extinct} label="已灭绝种" icon="🕯️" delay="0.4s" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {specimenCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                    activeCategory === cat.value
                      ? cn("bg-gradient-to-r", categoryGradients[cat.value], "shadow-md", categoryAccentColors[cat.value])
                      : "bg-white/70 text-butterfly-ink/60 hover:bg-white hover:text-butterfly-ink"
                  )}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-butterfly-ink/40"
                strokeWidth={2}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索标本名称、采集者..."
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 rounded-2xl",
                  "bg-white border border-amber-200/50",
                  "text-sm text-butterfly-ink placeholder:text-butterfly-ink/40",
                  "focus:outline-none focus:ring-2 focus:ring-amber-300/50"
                )}
              />
            </div>
          </div>

          {filteredSpecimens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpecimens.map((specimen, index) => (
                <SpecimenCard key={specimen.id} specimen={specimen} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/60 rounded-3xl border border-amber-100">
              <div className="inline-flex w-20 h-20 items-center justify-center rounded-full bg-amber-100/50 mb-6">
                <Filter className="w-10 h-10 text-amber-600/60" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-semibold text-butterfly-ink mb-3">
                未找到相关标本
              </h3>
              <p className="text-butterfly-ink/60">
                请尝试其他筛选条件或搜索关键词
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-butterfly-ink text-cream-100/80 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-cream-100/40">
            © 2026 蝶语 Butterfly Whispers · 标本数字博物馆 · Made with 🦋
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ number, label, icon, delay }: { number: number; label: string; icon: string; delay: string }) {
  return (
    <div 
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-amber-100 opacity-0 animate-fade-up"
      style={{ animationDelay: delay }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-display text-3xl font-semibold text-butterfly-ink">{number}</div>
      <div className="text-xs text-butterfly-ink/50">{label}</div>
    </div>
  );
}

function SpecimenCard({ specimen, index }: { specimen: Specimen; index: number }) {
  return (
    <Link
      to={`/specimen/${specimen.id}`}
      className="group block opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className={cn(
        "relative rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl",
        categoryGradients[specimen.category]
      )}>
        <div
          className="absolute inset-0 opacity-20 bg-grain"
          aria-hidden
        />

        <div className="relative p-5">
          <div className="flex items-start gap-4 mb-4">
            <div className="relative flex-shrink-0">
              <img
                src={specimen.image}
                alt={specimen.name}
                className="w-28 h-28 rounded-2xl object-cover border-2 border-white/50 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/90 border border-amber-200 text-butterfly-ink">
                {specimen.specimenNumber}
              </div>
              {ENHANCED_3D_IDS.includes(specimen.id) && (
                <div className="absolute -top-2 -left-2 bg-gradient-to-br from-amber-400 via-rose-400 to-amber-500 text-white rounded-xl px-2 py-1 shadow-lg flex items-center gap-1 animate-pulse-slow">
                  <SparklesBadge />
                  <span className="text-[10px] font-bold tracking-wide">3D增强</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  <span className={cn("text-amber-600", categoryAccentColors[specimen.category])}>
                    {categoryIcons[specimen.category]}
                  </span>
                  <span className={cn("text-xs font-medium", categoryAccentColors[specimen.category])}>
                    {specimen.category}
                  </span>
                </div>
                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0", conservationStatusColors[specimen.conservationStatus])}>
                  {specimen.conservationStatus}
                </span>
              </div>

              <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-1 leading-tight">
                {specimen.name}
              </h3>
              <p className="text-xs text-butterfly-ink/50 font-serif italic mb-2 truncate">
                {specimen.latinName}
              </p>
              <span className={cn("inline-block px-2 py-0.5 rounded-full text-[10px] font-medium", conditionColors[specimen.condition])}>
                保存状态：{specimen.condition}
              </span>
            </div>
          </div>

          <p className="text-sm text-butterfly-ink/70 leading-relaxed mb-4 line-clamp-2">
            {specimen.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-butterfly-ink/60">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-amber-600/70" strokeWidth={1.8} />
              <span className="truncate">{specimen.collectionLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-butterfly-ink/60">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-amber-600/70" strokeWidth={1.8} />
              <span>{specimen.collectionDate}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-butterfly-ink/60">
              <User className="w-3.5 h-3.5 flex-shrink-0 text-amber-600/70" strokeWidth={1.8} />
              <span className="truncate">{specimen.collector}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {specimen.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-white/60 text-[10px] text-butterfly-ink/60 border border-amber-100"
              >
                #{tag}
              </span>
            ))}
            {specimen.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-full bg-white/60 text-[10px] text-butterfly-ink/60 border border-amber-100">
                +{specimen.tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-amber-100/50">
            <span className="text-xs text-butterfly-ink/50">
              {specimen.family} · {specimen.genus}
            </span>
            <span className={cn("inline-flex items-center gap-1 text-sm font-medium", categoryAccentColors[specimen.category], "group-hover:gap-2 transition-all")}>
              {ENHANCED_3D_IDS.includes(specimen.id) ? (
                <span className="inline-flex items-center gap-1">
                  <span className="inline-flex w-4 h-4 items-center justify-center text-rose-500">
                    <SparklesBadge />
                  </span>
                  增强3D解剖
                </span>
              ) : (
                "查看3D展示"
              )}
              <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
