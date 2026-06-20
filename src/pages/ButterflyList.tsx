import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, X, Filter, Sparkles, Home as HomeIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyCard from "@/components/ButterflyCard";
import { butterflies, searchButterflies, categories } from "@/data/butterflies";

export default function ButterflyList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  const results = useMemo(() => {
    let list = query.trim() ? searchButterflies(query) : butterflies;
    if (activeCategory) {
      list = list.filter((b) => b.category === activeCategory);
    }
    return list;
  }, [query, activeCategory]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setSearchParams({ q: value.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearchParams({});
    setActiveCategory(null);
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden bg-hero-gradient py-16">
        <div
          className="absolute inset-0 opacity-20 bg-grain"
          aria-hidden
        />
        <div
          className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-butterfly-pink/40 blur-3xl"
          aria-hidden
        />
        <div className="container relative mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-butterfly-pink-deep font-medium tracking-wide uppercase mb-2 inline-flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" strokeWidth={2} />
              Butterfly Gallery
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-butterfly-ink mb-4">
              蝴蝶图鉴
            </h1>
            <p className="text-butterfly-ink/60 leading-relaxed">
              收录 {butterflies.length} 种美丽蝶类，输入关键词或按分类筛选，探索每一只蝶的独特故事。
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-10 bg-cream-50 border-b border-butterfly-pink/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-butterfly-ink/40"
                strokeWidth={1.8}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="搜索名称、学名、分类或特征..."
                className="w-full pl-14 pr-12 py-4 rounded-full bg-white border border-butterfly-pink/30 text-base text-butterfly-ink placeholder:text-butterfly-ink/40 shadow-soft focus:outline-none focus:ring-2 focus:ring-butterfly-pink/50 focus:border-transparent transition-all"
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-butterfly-pink-light/40 transition-colors"
                  aria-label="清除搜索"
                >
                  <X className="w-4 h-4 text-butterfly-ink/50" strokeWidth={2} />
                </button>
              )}
            </div>

            <div className="mt-6 flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-xs text-butterfly-ink/50 mr-1">
                <Filter className="w-3.5 h-3.5" strokeWidth={2} />
                分类筛选:
              </span>
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === null
                    ? "bg-butterfly-pink-deep text-white shadow-soft"
                    : "bg-white border border-butterfly-pink/30 text-butterfly-ink/70 hover:bg-butterfly-pink-light/30"
                }`}
              >
                全部
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveCategory(activeCategory === cat ? null : cat)
                  }
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-butterfly-green-deep text-white shadow-soft"
                      : "bg-white border border-butterfly-green/30 text-butterfly-ink/70 hover:bg-butterfly-green-light/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-14 bg-cream-100">
        <div className="container mx-auto px-4">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-semibold text-butterfly-ink">
                {query || activeCategory ? "搜索结果" : "全部蝴蝶"}
              </h2>
              <p className="text-sm text-butterfly-ink/50 mt-1">
                共找到 <span className="text-butterfly-pink-deep font-medium">{results.length}</span> 种
                {query && <> 与「{query}」相关的</>}
                {activeCategory && <>{activeCategory}类</>}
                蝴蝶
              </p>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((b, i) => (
                <ButterflyCard
                  key={b.id}
                  butterfly={b}
                  index={i}
                  priority={i < 4}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex w-20 h-20 items-center justify-center rounded-full bg-butterfly-pink-light/40 mb-6">
                <Search
                  className="w-9 h-9 text-butterfly-pink-deep/60"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-display text-2xl font-semibold text-butterfly-ink mb-3">
                暂无匹配结果
              </h3>
              <p className="text-butterfly-ink/60 mb-6 max-w-sm mx-auto">
                试试换一个关键词？或者清除筛选条件，浏览全部蝴蝶。
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={clearSearch}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-butterfly-pink-deep text-white text-sm font-medium hover:shadow-soft transition-all"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                  清除筛选
                </button>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-butterfly-ink/20 text-butterfly-ink/80 text-sm font-medium hover:bg-white/60 transition-all"
                >
                  <HomeIcon className="w-4 h-4" strokeWidth={2} />
                  返回首页
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

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
