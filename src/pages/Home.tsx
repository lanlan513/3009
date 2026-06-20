import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Shuffle, ChevronRight, Globe2, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyCard from "@/components/ButterflyCard";
import ButterflyIcon from "@/components/ButterflyIcon";
import ButterflyLifecycle from "@/components/ButterflyLifecycle";
import { getPopularButterflies, getRandomButterflies, categories, continents } from "@/data/butterflies";
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
