import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Shuffle, ChevronRight, Globe2, MapPin, TreeDeciduous, Layers, BookOpen, Gem, Flame, GitCompare, Ruler, Palette, ShieldAlert } from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyCard from "@/components/ButterflyCard";
import ButterflyIcon from "@/components/ButterflyIcon";
import ButterflyLifecycle from "@/components/ButterflyLifecycle";
import { getPopularButterflies, getRandomButterflies, categories, continents } from "@/data/butterflies";
import { rareButterflies } from "@/data/rareButterflies";
import { cn } from "@/lib/utils";

export default function Home() {
  const popular = useMemo(() => getPopularButterflies(8), []);
  const recommended = useMemo(() => getRandomButterflies(6), []);

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div
          className="absolute inset-0 opacity-30 bg-grain"
          aria-hidden
        />
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-butterfly-pink/40 blur-3xl animate-float"
          aria-hidden
        />
        <div
          className="absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-butterfly-green/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />

        <div className="container relative mx-auto px-4 pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-sm text-butterfly-pink-deep opacity-0 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <Sparkles className="w-4 h-4" strokeWidth={1.8} />
              <span>探索自然之美 · 发现蝶舞奥秘</span>
            </div>

            <h1
              className="font-display text-5xl md:text-7xl font-semibold leading-tight text-butterfly-ink mb-6 text-balance opacity-0 animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              蝶<span className="italic text-butterfly-pink-deep">语</span>
              <span className="block text-3xl md:text-4xl font-serif font-normal mt-3 text-butterfly-ink/70">
                Butterfly Whispers
              </span>
            </h1>

            <p
              className="text-base md:text-lg text-butterfly-ink/70 leading-relaxed mb-10 max-w-xl mx-auto opacity-0 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              走进翩然蝶舞的世界，领略万种蝶类的斑斓光彩，
              从帝王蝶的万里迁徙到枯叶蝶的神奇拟态，
              开启一段轻盈的自然学习之旅。
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.55s" }}
            >
              <Link
                to="/butterflies"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-butterfly-pink-deep text-white font-medium shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                <ButterflyIcon className="w-4 h-4" strokeWidth={2} />
                浏览蝴蝶图鉴
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <a
                href="#popular"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-butterfly-ink/20 text-butterfly-ink/80 font-medium hover:bg-white/60 hover:border-butterfly-pink/50 transition-all duration-300"
              >
                查看热门蝴蝶
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* 蝴蝶剪影装饰 */}
          <ButterflyIcon
            className="hidden md:block absolute top-16 left-[8%] w-8 h-8 text-butterfly-pink-deep/60 animate-flutter"
            strokeWidth={1}
            aria-hidden
          />
          <ButterflyIcon
            className="hidden md:block absolute top-24 right-[12%] w-10 h-10 text-butterfly-green-deep/50 animate-flutter"
            strokeWidth={1}
            style={{ animationDelay: "1s" }}
            aria-hidden
          />
          <ButterflyIcon
            className="hidden md:block absolute bottom-20 right-[20%] w-6 h-6 text-butterfly-gold/70 animate-flutter"
            strokeWidth={1}
            style={{ animationDelay: "2s" }}
            aria-hidden
          />
        </div>
      </section>

      {/* 分类概览 */}
      <section className="py-16 bg-cream-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <div
                key={cat}
                className="text-center py-6 px-4 rounded-2xl bg-white/60 hover:bg-white hover:shadow-card transition-all duration-300 opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 80 + 0.2}s` }}
              >
                <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-butterfly-pink-light/60 mb-3">
                  <ButterflyIcon
                    className="w-6 h-6 text-butterfly-pink-deep"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="font-display text-lg font-medium text-butterfly-ink">
                  {cat}
                </p>
                <p className="text-xs text-butterfly-ink/50 mt-1">科属分类</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 世界地图探索入口 */}
      <section className="py-16 bg-cream-50 relative overflow-hidden">
        <div
          className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-butterfly-green/20 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-butterfly-pink/20 blur-3xl"
          aria-hidden
        />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/map"
              className="group block opacity-0 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-cream-50 via-white to-butterfly-pink-light/40 border border-butterfly-pink/20 shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-1">
                <div
                  className="absolute inset-0 opacity-30 bg-grain"
                  aria-hidden
                />

                <div className="relative p-8 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-butterfly-green-light/50 text-sm text-butterfly-green-deep font-medium mb-5">
                        <Globe2 className="w-4 h-4" strokeWidth={1.8} />
                        Global Atlas
                      </div>

                      <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink leading-tight mb-4">
                        世界蝴蝶地图
                      </h2>
                      <p className="text-butterfly-ink/60 leading-relaxed mb-6">
                        点击地图探索六大洲的蝴蝶分布，从亚马逊雨林到喜马拉雅山脉，
                        发现每一片土地上分布的蝶种。
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {continents.slice(0, 4).map((c, i) => (
                          <span
                            key={c}
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs",
                              i % 2 === 0
                                ? "bg-butterfly-pink-light/40 text-butterfly-pink-deep"
                                : "bg-butterfly-green-light/40 text-butterfly-green-deep"
                            )}
                          >
                            <MapPin className="w-3 h-3" strokeWidth={2} />
                            {c}
                          </span>
                        ))}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-butterfly-gold/30 text-butterfly-gold">
                          + {continents.length - 4} 更多
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2 text-butterfly-pink-deep font-medium group-hover:gap-3 transition-all duration-300">
                        开始探索
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-br from-butterfly-pink/20 via-butterfly-green/15 to-butterfly-gold/20 rounded-[2rem] blur-xl opacity-60" />
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-cream-100 to-butterfly-pink-light/30">
                        <svg viewBox="0 0 400 300" className="w-full h-full">
                          <defs>
                            <linearGradient id="miniMapBg" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFBF7" />
                              <stop offset="100%" stopColor="#FDF1E8" />
                            </linearGradient>
                          </defs>
                          <rect width="400" height="300" fill="url(#miniMapBg)" />
                          <g className="animate-float" style={{ transformOrigin: "center" }}>
                            <path d="M 50 70 Q 35 55 50 40 Q 70 25 100 30 Q 130 35 145 55 Q 160 75 150 100 Q 140 125 115 135 Q 90 145 70 125 Q 55 105 50 85 Z" fill="#E8B4D4" opacity="0.7" />
                            <path d="M 110 150 Q 95 140 100 170 Q 105 205 120 230 Q 130 252 145 265 Q 160 278 175 268 Q 190 248 200 215 Q 210 180 195 150 Q 180 130 150 125 Q 120 120 110 150 Z" fill="#B7D9BC" opacity="0.7" />
                            <path d="M 190 65 Q 175 50 190 38 Q 220 25 260 30 Q 300 35 320 60 Q 335 85 325 110 Q 310 135 280 130 Q 250 125 225 105 Q 200 85 195 75 Z" fill="#F5D9E8" opacity="0.8" />
                            <path d="M 215 120 Q 195 105 200 140 Q 205 180 220 220 Q 240 260 270 275 Q 300 290 325 275 Q 350 260 355 225 Q 360 190 345 155 Q 325 120 280 110 Q 240 100 215 120 Z" fill="#E8C4B4" opacity="0.7" />
                            <path d="M 290 40 Q 260 25 290 15 Q 350 5 420 15 Q 490 25 520 55 Q 540 90 530 130 Q 520 170 485 190 Q 450 210 410 195 Q 370 180 340 145 Q 320 110 310 75 Q 305 50 290 40 Z" fill="#F5D9E8" opacity="0.7" transform="scale(0.7) translate(30, 20)" />
                            <path d="M 380 200 Q 360 185 375 215 Q 395 255 430 280 Q 465 300 495 285 Q 520 270 535 235 Q 550 200 530 175 Q 510 150 465 140 Q 420 130 380 200 Z" fill="#B4D4E8" opacity="0.7" transform="scale(0.7) translate(20, 15)" />
                          </g>
                          <circle cx="200" cy="150" r="5" fill="#D28FB8" className="animate-pulse" />
                          <circle cx="200" cy="150" r="12" fill="#D28FB8" opacity="0.3" className="animate-ping" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 家族关系馆入口 */}
      <section className="py-16 bg-cream-100 relative overflow-hidden">
        <div
          className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-butterfly-gold/20 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-butterfly-green/20 blur-3xl"
          aria-hidden
        />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/family-tree"
              className="group block opacity-0 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-cream-50 via-white to-butterfly-gold/30 border border-butterfly-gold/20 shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-1">
                <div
                  className="absolute inset-0 opacity-30 bg-grain"
                  aria-hidden
                />

                <div className="relative p-8 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-butterfly-gold/30 text-sm text-butterfly-gold font-medium mb-5">
                        <TreeDeciduous className="w-4 h-4" strokeWidth={1.8} />
                        Taxonomy Explorer
                      </div>

                      <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink leading-tight mb-4">
                        蝴蝶家族关系馆
                      </h2>
                      <p className="text-butterfly-ink/60 leading-relaxed mb-6">
                        通过树状图探索蝶类的生命之树，从凤蝶科、粉蝶科到蛱蝶科，
                        了解不同蝴蝶家族之间的分类关系和亲缘演化。
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-butterfly-pink-light/40 text-butterfly-pink-deep">
                          5 科
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-butterfly-green-light/40 text-butterfly-green-deep">
                          8 亚科
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-butterfly-gold/30 text-butterfly-gold">
                          14 属
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-butterfly-ink/10 text-butterfly-ink/70">
                          21 种
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2 text-butterfly-gold font-medium group-hover:gap-3 transition-all duration-300">
                        探索家族树
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-br from-butterfly-gold/20 via-butterfly-pink/15 to-butterfly-green/20 rounded-[2rem] blur-xl opacity-60" />
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-cream-100 to-butterfly-gold/20">
                        <svg viewBox="0 0 400 300" className="w-full h-full">
                          <defs>
                            <linearGradient id="treeBg" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFBF7" />
                              <stop offset="100%" stopColor="#FAF0E6" />
                            </linearGradient>
                          </defs>
                          <rect width="400" height="300" fill="url(#treeBg)" />
                          
                          <g className="animate-float" style={{ transformOrigin: "center", animationDelay: "0.5s" }}>
                            <line x1="200" y1="50" x2="200" y2="80" stroke="#D4A574" strokeWidth="2" opacity="0.6" />
                            <line x1="200" y1="80" x2="120" y2="120" stroke="#D4A574" strokeWidth="2" opacity="0.6" />
                            <line x1="200" y1="80" x2="280" y2="120" stroke="#D4A574" strokeWidth="2" opacity="0.6" />
                            
                            <line x1="120" y1="120" x2="80" y2="170" stroke="#86B98E" strokeWidth="2" opacity="0.6" />
                            <line x1="120" y1="120" x2="160" y2="170" stroke="#86B98E" strokeWidth="2" opacity="0.6" />
                            <line x1="280" y1="120" x2="240" y2="170" stroke="#86B98E" strokeWidth="2" opacity="0.6" />
                            <line x1="280" y1="120" x2="320" y2="170" stroke="#86B98E" strokeWidth="2" opacity="0.6" />
                            
                            <line x1="80" y1="170" x2="60" y2="220" stroke="#E8B4D4" strokeWidth="2" opacity="0.6" />
                            <line x1="80" y1="170" x2="100" y2="220" stroke="#E8B4D4" strokeWidth="2" opacity="0.6" />
                            <line x1="160" y1="170" x2="140" y2="220" stroke="#E8B4D4" strokeWidth="2" opacity="0.6" />
                            <line x1="160" y1="170" x2="180" y2="220" stroke="#E8B4D4" strokeWidth="2" opacity="0.6" />
                            <line x1="240" y1="170" x2="220" y2="220" stroke="#E8B4D4" strokeWidth="2" opacity="0.6" />
                            <line x1="240" y1="170" x2="260" y2="220" stroke="#E8B4D4" strokeWidth="2" opacity="0.6" />
                            <line x1="320" y1="170" x2="300" y2="220" stroke="#E8B4D4" strokeWidth="2" opacity="0.6" />
                            <line x1="320" y1="170" x2="340" y2="220" stroke="#E8B4D4" strokeWidth="2" opacity="0.6" />
                            
                            <circle cx="200" cy="40" r="20" fill="#D4A574" opacity="0.9" className="animate-pulse" />
                            <circle cx="200" cy="40" r="28" fill="#D4A574" opacity="0.3" className="animate-ping" />
                            
                            <circle cx="120" cy="110" r="14" fill="#86B98E" opacity="0.85" />
                            <circle cx="280" cy="110" r="14" fill="#86B98E" opacity="0.85" />
                            
                            <circle cx="80" cy="160" r="10" fill="#E8B4D4" opacity="0.8" />
                            <circle cx="160" cy="160" r="10" fill="#E8B4D4" opacity="0.8" />
                            <circle cx="240" cy="160" r="10" fill="#E8B4D4" opacity="0.8" />
                            <circle cx="320" cy="160" r="10" fill="#E8B4D4" opacity="0.8" />
                            
                            <circle cx="60" cy="220" r="7" fill="#D28FB8" opacity="0.75" />
                            <circle cx="100" cy="220" r="7" fill="#D28FB8" opacity="0.75" />
                            <circle cx="140" cy="220" r="7" fill="#D28FB8" opacity="0.75" />
                            <circle cx="180" cy="220" r="7" fill="#D28FB8" opacity="0.75" />
                            <circle cx="220" cy="220" r="7" fill="#D28FB8" opacity="0.75" />
                            <circle cx="260" cy="220" r="7" fill="#D28FB8" opacity="0.75" />
                            <circle cx="300" cy="220" r="7" fill="#D28FB8" opacity="0.75" />
                            <circle cx="340" cy="220" r="7" fill="#D28FB8" opacity="0.75" />
                            
                            <text x="200" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">科</text>
                            <text x="120" y="115" textAnchor="middle" fill="white" fontSize="10">亚科</text>
                            <text x="280" y="115" textAnchor="middle" fill="white" fontSize="10">亚科</text>
                            <text x="80" y="165" textAnchor="middle" fill="white" fontSize="9">属</text>
                            <text x="160" y="165" textAnchor="middle" fill="white" fontSize="9">属</text>
                            <text x="240" y="165" textAnchor="middle" fill="white" fontSize="9">属</text>
                            <text x="320" y="165" textAnchor="middle" fill="white" fontSize="9">属</text>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 标本博物馆入口 */}
      <section className="py-16 bg-cream-50 relative overflow-hidden">
        <div
          className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-amber-200/30 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-rose-200/30 blur-3xl"
          aria-hidden
        />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/specimen-museum"
              className="group block opacity-0 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-cream-50 via-white to-amber-100/40 border border-amber-200/30 shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-1">
                <div
                  className="absolute inset-0 opacity-30 bg-grain"
                  aria-hidden
                />

                <div className="relative p-8 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-sm text-amber-700 font-medium mb-5">
                        <Layers className="w-4 h-4" strokeWidth={1.8} />
                        Digital Museum
                      </div>

                      <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink leading-tight mb-4">
                        蝴蝶标本数字博物馆
                      </h2>
                      <p className="text-butterfly-ink/60 leading-relaxed mb-6">
                        收录历史标本、珍稀物种和已灭绝近缘种资料。通过3D展示页面旋转查看标本细节，
                        了解每件标本背后的发现历史和研究记录。
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-amber-100 text-amber-700">
                          <BookOpen className="w-3 h-3" strokeWidth={2} />
                          历史标本
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                          <Gem className="w-3 h-3" strokeWidth={2} />
                          珍稀物种
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-700">
                          <Flame className="w-3 h-3" strokeWidth={2} />
                          已灭绝近缘种
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-butterfly-ink/10 text-butterfly-ink/70">
                          3D 旋转展示
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2 text-amber-700 font-medium group-hover:gap-3 transition-all duration-300">
                        进入标本馆
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-br from-amber-200/30 via-rose-200/20 to-emerald-200/30 rounded-[2rem] blur-xl opacity-60" />
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-cream-100 to-amber-50">
                        <svg viewBox="0 0 400 300" className="w-full h-full">
                          <defs>
                            <linearGradient id="museumBg" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFBF7" />
                              <stop offset="100%" stopColor="#FEF3C7" />
                            </linearGradient>
                          </defs>
                          <rect width="400" height="300" fill="url(#museumBg)" />
                          
                          <g className="animate-float" style={{ transformOrigin: "center", animationDelay: "0.5s" }}>
                            <rect x="50" y="40" width="300" height="220" rx="12" fill="#FDF6E3" stroke="#E8D5B7" strokeWidth="2" opacity="0.8" />
                            
                            <rect x="70" y="60" width="80" height="80" rx="8" fill="white" stroke="#D4B896" strokeWidth="1.5" />
                            <rect x="160" y="60" width="80" height="80" rx="8" fill="white" stroke="#D4B896" strokeWidth="1.5" />
                            <rect x="250" y="60" width="80" height="80" rx="8" fill="white" stroke="#D4B896" strokeWidth="1.5" />
                            
                            <rect x="70" y="150" width="80" height="80" rx="8" fill="white" stroke="#D4B896" strokeWidth="1.5" />
                            <rect x="160" y="150" width="80" height="80" rx="8" fill="white" stroke="#D4B896" strokeWidth="1.5" />
                            <rect x="250" y="150" width="80" height="80" rx="8" fill="white" stroke="#D4B896" strokeWidth="1.5" />
                            
                            <ellipse cx="110" cy="100" rx="25" ry="15" fill="#E8B4D4" opacity="0.6" transform="rotate(-20 110 100)" />
                            <ellipse cx="110" cy="100" rx="25" ry="15" fill="#E8B4D4" opacity="0.6" transform="rotate(20 110 100)" />
                            <ellipse cx="200" cy="100" rx="30" ry="18" fill="#86B98E" opacity="0.6" transform="rotate(-15 200 100)" />
                            <ellipse cx="200" cy="100" rx="30" ry="18" fill="#86B98E" opacity="0.6" transform="rotate(15 200 100)" />
                            <ellipse cx="290" cy="100" rx="28" ry="16" fill="#D4A574" opacity="0.6" transform="rotate(-25 290 100)" />
                            <ellipse cx="290" cy="100" rx="28" ry="16" fill="#D4A574" opacity="0.6" transform="rotate(25 290 100)" />
                            
                            <ellipse cx="110" cy="190" rx="22" ry="13" fill="#D28FB8" opacity="0.5" transform="rotate(-10 110 190)" />
                            <ellipse cx="110" cy="190" rx="22" ry="13" fill="#D28FB8" opacity="0.5" transform="rotate(10 110 190)" />
                            <ellipse cx="200" cy="190" rx="35" ry="20" fill="#B4D4E8" opacity="0.5" />
                            <ellipse cx="290" cy="190" rx="24" ry="14" fill="#E8C4B4" opacity="0.5" transform="rotate(-30 290 190)" />
                            <ellipse cx="290" cy="190" rx="24" ry="14" fill="#E8C4B4" opacity="0.5" transform="rotate(30 290 190)" />
                            
                            <circle cx="200" cy="40" r="18" fill="#D4A574" opacity="0.9" className="animate-pulse" />
                            <circle cx="200" cy="40" r="26" fill="#D4A574" opacity="0.3" className="animate-ping" />
                            <text x="200" y="45" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">馆藏</text>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 对比实验室入口 */}
      <section className="py-16 bg-cream-100 relative overflow-hidden">
        <div
          className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-butterfly-pink/20 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-purple-200/30 blur-3xl"
          aria-hidden
        />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/compare-lab"
              className="group block opacity-0 animate-fade-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-cream-50 via-white to-purple-100/40 border border-purple-200/30 shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-1">
                <div
                  className="absolute inset-0 opacity-30 bg-grain"
                  aria-hidden
                />

                <div className="relative p-8 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-sm text-purple-700 font-medium mb-5">
                        <GitCompare className="w-4 h-4" strokeWidth={1.8} />
                        Morphology Lab
                      </div>

                      <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink leading-tight mb-4">
                        蝴蝶形态对比实验室
                      </h2>
                      <p className="text-butterfly-ink/60 leading-relaxed mb-6">
                        选择 2-4 种蝴蝶进行多维度形态学对比，从翅展、色彩、花纹到栖息地与生命周期，
                        深入探索蝶类世界的千姿百态。
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-purple-100/50 text-purple-700">
                          <Ruler className="w-3 h-3" strokeWidth={2} />
                          翅展形态
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-pink-100/50 text-pink-700">
                          <Palette className="w-3 h-3" strokeWidth={2} />
                          色彩花纹
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-green-100/50 text-green-700">
                          <TreeDeciduous className="w-3 h-3" strokeWidth={2} />
                          栖息生态
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-butterfly-ink/10 text-butterfly-ink/70">
                          同步缩放对比
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-2 text-purple-700 font-medium group-hover:gap-3 transition-all duration-300">
                        开始对比
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-br from-purple-200/30 via-butterfly-pink/15 to-butterfly-gold/20 rounded-[2rem] blur-xl opacity-60" />
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-cream-100 to-purple-50">
                        <svg viewBox="0 0 400 300" className="w-full h-full">
                          <defs>
                            <linearGradient id="compareBg" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFBF7" />
                              <stop offset="100%" stopColor="#F3E8FF" />
                            </linearGradient>
                          </defs>
                          <rect width="400" height="300" fill="url(#compareBg)" />
                          
                          <g className="animate-float" style={{ transformOrigin: "center", animationDelay: "0.3s" }}>
                            <rect x="30" y="50" width="160" height="130" rx="12" fill="white" stroke="#E9D5FF" strokeWidth="2" />
                            <rect x="35" y="55" width="150" height="100" rx="8" fill="#FDF2F8" />
                            <ellipse cx="110" cy="105" rx="30" ry="20" fill="#E8B4D4" opacity="0.5" transform="rotate(-15 110 105)" />
                            <ellipse cx="110" cy="105" rx="30" ry="20" fill="#E8B4D4" opacity="0.5" transform="rotate(15 110 105)" />
                            <rect x="45" y="162" width="80" height="6" rx="3" fill="#F3E8FF" />
                            <rect x="45" y="172" width="50" height="4" rx="2" fill="#E9D5FF" />
                          </g>

                          <g className="animate-float" style={{ transformOrigin: "center", animationDelay: "0.6s" }}>
                            <rect x="210" y="50" width="160" height="130" rx="12" fill="white" stroke="#C4B5FD" strokeWidth="2" />
                            <rect x="215" y="55" width="150" height="100" rx="8" fill="#ECFDF5" />
                            <ellipse cx="290" cy="105" rx="32" ry="22" fill="#86B98E" opacity="0.5" transform="rotate(-10 290 105)" />
                            <ellipse cx="290" cy="105" rx="32" ry="22" fill="#86B98E" opacity="0.5" transform="rotate(10 290 105)" />
                            <rect x="225" y="162" width="80" height="6" rx="3" fill="#D1FAE5" />
                            <rect x="225" y="172" width="60" height="4" rx="2" fill="#6EE7B7" />
                          </g>

                          <g className="animate-float" style={{ transformOrigin: "center", animationDelay: "0.9s" }}>
                            <rect x="30" y="200" width="160" height="70" rx="12" fill="white" stroke="#FDE68A" strokeWidth="2" />
                            <rect x="45" y="212" width="60" height="8" rx="4" fill="#FEF3C7" />
                            <rect x="45" y="226" width="120" height="6" rx="3" fill="#FDE68A" opacity="0.6" />
                            <rect x="45" y="238" width="90" height="6" rx="3" fill="#FDE68A" opacity="0.4" />
                          </g>

                          <g className="animate-float" style={{ transformOrigin: "center", animationDelay: "1.2s" }}>
                            <rect x="210" y="200" width="160" height="70" rx="12" fill="white" stroke="#FBCFE8" strokeWidth="2" />
                            <rect x="225" y="212" width="60" height="8" rx="4" fill="#FCE7F3" />
                            <rect x="225" y="226" width="120" height="6" rx="3" fill="#FBCFE8" opacity="0.6" />
                            <rect x="225" y="238" width="90" height="6" rx="3" fill="#FBCFE8" opacity="0.4" />
                          </g>

                          <circle cx="200" cy="115" r="12" fill="#A78BFA" opacity="0.9" className="animate-pulse" />
                          <circle cx="200" cy="115" r="20" fill="#A78BFA" opacity="0.3" className="animate-ping" />
                          <text x="200" y="120" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">VS</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 热门蝴蝶 */}
      <section id="popular" className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm text-butterfly-pink-deep font-medium tracking-wide uppercase mb-2">
                Most Popular
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink">
                人气蝴蝶 · 最受青睐
              </h2>
            </div>
            <Link
              to="/butterflies"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-butterfly-green-deep hover:text-butterfly-green-deep font-medium"
            >
              查看全部
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory -mx-4 px-4">
            {popular.map((b, i) => (
              <div
                key={b.id}
                className="flex-none w-[280px] snap-start"
              >
                <ButterflyCard
                  butterfly={b}
                  index={i}
                  priority={i < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 珍稀物种专题 */}
      <section className="py-16 bg-cream-100 relative overflow-hidden">
        <div
          className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-rose-200/30 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-amber-200/30 blur-3xl"
          aria-hidden
        />

        <div className="container relative mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm text-rose-600 font-medium tracking-wide uppercase mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" strokeWidth={2} />
                Rare Species
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink">
                珍稀物种专题 · 守护蝶之未来
              </h2>
            </div>
            <Link
              to="/rare-archive"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-rose-600 hover:text-rose-700 font-medium"
            >
              查看全部
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {rareButterflies.slice(0, 6).map((b, i) => (
              <Link
                key={b.id}
                to={`/rare-butterfly/${b.id}`}
                className="group block rounded-3xl overflow-hidden bg-white shadow-card card-hover opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative h-44 overflow-hidden">
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
                      b.conservationStatus === "濒危" ? "bg-red-100 text-red-700 border-red-200" :
                      b.conservationStatus === "极危" ? "bg-rose-100 text-rose-800 border-rose-200" :
                      b.conservationStatus === "易危" ? "bg-orange-100 text-orange-700 border-orange-200" :
                      "bg-yellow-100 text-yellow-700 border-yellow-200"
                    )}>
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
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-display text-lg font-semibold">{b.name}</p>
                    <p className="text-xs opacity-80 font-serif italic">{b.latinName}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-butterfly-ink/70 line-clamp-2 leading-relaxed mb-3">
                    {b.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-butterfly-ink/50">
                    <span>{b.family}</span>
                    <span className="text-rose-600 font-medium group-hover:text-rose-700 inline-flex items-center gap-1 transition-colors">
                      了解保育详情
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/rare-archive"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-rose-600 text-white font-medium shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <ShieldAlert className="w-4 h-4" strokeWidth={2} />
              进入珍稀蝴蝶档案库
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* 蝴蝶生命周期 */}
      <ButterflyLifecycle />

      {/* 随机推荐 */}
      <section className="py-20 bg-cream-200/50 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full bg-butterfly-pink-light/40 blur-3xl"
          aria-hidden
        />
        <div className="container relative mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm text-butterfly-green-deep font-medium tracking-wide uppercase mb-2 flex items-center gap-1.5">
                <Shuffle className="w-4 h-4" strokeWidth={2} />
                Discover
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink">
                今日邂逅 · 随机推荐
              </h2>
            </div>
            <Link
              to="/butterflies"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-butterfly-pink-deep hover:text-butterfly-pink-deep font-medium"
            >
              浏览更多
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommended.map((b, i) => (
              <ButterflyCard key={b.id} butterfly={b} index={i} />
            ))}
          </div>
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
