import { useState, useMemo } from "react";
import {
  Globe2,
  MapPin,
  ThermometerSun,
  Sparkles,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import WorldMap from "@/components/WorldMap";
import ButterflyCard from "@/components/ButterflyCard";
import type { Continent, Climate, RarityLevel } from "@/types";
import {
  trueButterflies,
  climates,
  rarityLevels,
  getCountriesByContinent,
} from "@/data/butterflies";
import { cn } from "@/lib/utils";

export default function MapExplorer() {
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedClimate, setSelectedClimate] = useState<Climate | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<RarityLevel | null>(null);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const filteredButterflies = useMemo(() => {
    let list = trueButterflies;

    if (selectedContinent) {
      list = list.filter((b) =>
        b.distributionRegions.some((r) => r.continent === selectedContinent)
      );
    }

    if (selectedCountry) {
      list = list.filter((b) =>
        b.distributionRegions.some((r) =>
          r.countries.some((c) => c === selectedCountry)
        )
      );
    }

    if (selectedClimate) {
      list = list.filter((b) => b.climate.includes(selectedClimate));
    }

    if (selectedRarity) {
      list = list.filter((b) => b.rarity === selectedRarity);
    }

    return list;
  }, [selectedContinent, selectedCountry, selectedClimate, selectedRarity]);

  const availableCountries = useMemo(() => {
    if (selectedContinent) {
      return getCountriesByContinent(selectedContinent);
    }
    return [];
  }, [selectedContinent]);

  const handleContinentChange = (continent: Continent | null) => {
    setSelectedContinent(continent);
    setSelectedCountry(null);
    setCountryDropdownOpen(false);
  };

  const clearAllFilters = () => {
    setSelectedContinent(null);
    setSelectedCountry(null);
    setSelectedClimate(null);
    setSelectedRarity(null);
  };

  const hasActiveFilters = selectedContinent || selectedCountry || selectedClimate || selectedRarity;

  const rarityColors: Record<RarityLevel, string> = {
    常见: "bg-butterfly-green-light/70 text-butterfly-green-deep",
    较常见: "bg-butterfly-pink-light/70 text-butterfly-pink-deep",
    稀有: "bg-[#E8D4B4]/70 text-[#B8956A]",
    极稀有: "bg-[#D4B4E8]/70 text-[#956AB8]",
    濒危: "bg-[#E8B4B4]/70 text-[#B86A6A]",
  };

  const climateIcons: Record<Climate, string> = {
    热带: "🌴",
    亚热带: "🌿",
    温带: "🍂",
    寒带: "❄️",
    高山: "⛰️",
    地中海: "🌊",
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      <section className="relative overflow-hidden bg-hero-gradient py-14">
        <div
          className="absolute inset-0 opacity-20 bg-grain"
          aria-hidden
        />
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-butterfly-pink/30 blur-3xl animate-float"
          aria-hidden
        />
        <div
          className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-butterfly-green/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-sm text-butterfly-pink-deep opacity-0 animate-fade-up">
              <Globe2 className="w-4 h-4" strokeWidth={1.8} />
              <span>Global Butterfly Atlas</span>
            </div>
            <h1
              className="font-display text-4xl md:text-5xl font-semibold text-butterfly-ink mb-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              世界蝴蝶地图
            </h1>
            <p
              className="text-butterfly-ink/60 leading-relaxed max-w-xl mx-auto opacity-0 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              点击地图上的大洲，探索世界各地分布的蝴蝶。
              从亚马逊雨林的蓝闪蝶到喜马拉雅的喙凤蝶，每一片土地都有独特的蝶舞。
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <WorldMap
              selectedContinent={selectedContinent}
              onSelectContinent={handleContinentChange}
            />
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-butterfly-pink/20 shadow-soft opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2 mb-5">
                <Filter className="w-5 h-5 text-butterfly-green-deep" strokeWidth={1.8} />
                <h2 className="font-display text-xl font-semibold text-butterfly-ink">
                  筛选条件
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="ml-auto inline-flex items-center gap-1 text-xs text-butterfly-ink/50 hover:text-butterfly-pink-deep transition-colors"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2} />
                    清除全部
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {selectedContinent && availableCountries.length > 0 && (
                  <div className="relative">
                    <label className="block text-xs text-butterfly-ink/50 mb-2 font-medium">
                      <MapPin className="w-3.5 h-3.5 inline mr-1.5" strokeWidth={2} />
                      国家/地区
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-butterfly-pink/30 text-left text-sm text-butterfly-ink flex items-center justify-between hover:border-butterfly-pink/50 transition-colors"
                      >
                        <span>{selectedCountry || "选择国家..."}</span>
                        <ChevronDown className={cn(
                          "w-4 h-4 text-butterfly-ink/40 transition-transform",
                          countryDropdownOpen && "rotate-180"
                        )} strokeWidth={2} />
                      </button>
                      {countryDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-full max-h-48 overflow-y-auto bg-white rounded-2xl border border-butterfly-pink/30 shadow-soft animate-fade-in">
                          <button
                            onClick={() => {
                              setSelectedCountry(null);
                              setCountryDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full px-4 py-2.5 text-left text-sm hover:bg-butterfly-pink-light/30 transition-colors",
                              !selectedCountry && "text-butterfly-pink-deep font-medium"
                            )}
                          >
                            全部国家
                          </button>
                          {availableCountries.map((country) => (
                            <button
                              key={country}
                              onClick={() => {
                                setSelectedCountry(country);
                                setCountryDropdownOpen(false);
                              }}
                              className={cn(
                                "w-full px-4 py-2.5 text-left text-sm hover:bg-butterfly-pink-light/30 transition-colors",
                                selectedCountry === country && "text-butterfly-pink-deep font-medium bg-butterfly-pink-light/20"
                              )}
                            >
                              {country}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs text-butterfly-ink/50 mb-2 font-medium">
                    <ThermometerSun className="w-3.5 h-3.5 inline mr-1.5" strokeWidth={2} />
                    气候带
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedClimate(null)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all",
                        !selectedClimate
                          ? "bg-butterfly-green-deep text-white shadow-soft"
                          : "bg-white border border-butterfly-green/30 text-butterfly-ink/70 hover:bg-butterfly-green-light/30"
                      )}
                    >
                      全部
                    </button>
                    {climates.map((c) => (
                      <button
                        key={c}
                        onClick={() =>
                          setSelectedClimate(selectedClimate === c ? null : c)
                        }
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all inline-flex items-center gap-1.5",
                          selectedClimate === c
                            ? "bg-butterfly-green-deep text-white shadow-soft"
                            : "bg-white border border-butterfly-green/30 text-butterfly-ink/70 hover:bg-butterfly-green-light/30"
                        )}
                      >
                        <span>{climateIcons[c]}</span>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-butterfly-ink/50 mb-2 font-medium">
                    <Sparkles className="w-3.5 h-3.5 inline mr-1.5" strokeWidth={2} />
                    稀有程度
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedRarity(null)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all",
                        !selectedRarity
                          ? "bg-butterfly-pink-deep text-white shadow-soft"
                          : "bg-white border border-butterfly-pink/30 text-butterfly-ink/70 hover:bg-butterfly-pink-light/30"
                      )}
                    >
                      全部
                    </button>
                    {rarityLevels.map((r) => (
                      <button
                        key={r}
                        onClick={() =>
                          setSelectedRarity(selectedRarity === r ? null : r)
                        }
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all",
                          selectedRarity === r
                            ? "bg-butterfly-pink-deep text-white shadow-soft"
                            : `${rarityColors[r]} hover:opacity-80`
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink">
                  {selectedContinent ? `${selectedContinent}蝴蝶` : "全部蝴蝶"}
                </h2>
                <p className="text-sm text-butterfly-ink/50 mt-1">
                  共找到 <span className="text-butterfly-pink-deep font-medium">{filteredButterflies.length}</span> 种
                  {selectedCountry && <> · 分布于 {selectedCountry}</>}
                </p>
              </div>
            </div>

            {filteredButterflies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredButterflies.map((b, i) => (
                  <ButterflyCard
                    key={b.id}
                    butterfly={b}
                    index={i}
                    priority={i < 3}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/50 rounded-3xl border border-butterfly-pink/10">
                <div className="inline-flex w-20 h-20 items-center justify-center rounded-full bg-butterfly-pink-light/40 mb-6">
                  <Globe2
                    className="w-9 h-9 text-butterfly-pink-deep/60"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display text-2xl font-semibold text-butterfly-ink mb-3">
                  该区域暂无匹配蝴蝶
                </h3>
                <p className="text-butterfly-ink/60 mb-6 max-w-sm mx-auto">
                  试试换一个筛选条件，或清除所有筛选浏览全部蝴蝶。
                </p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-butterfly-pink-deep text-white text-sm font-medium hover:shadow-soft transition-all"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                  清除筛选
                </button>
              </div>
            )}
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
