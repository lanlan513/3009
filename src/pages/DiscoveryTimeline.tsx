import { useState, useMemo, useEffect, useRef } from "react";
import {
  Clock,
  MapPin,
  User,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  BookOpen,
  Compass,
  Shield,
  Zap,
  Award,
  Globe2,
  Calendar,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyIcon from "@/components/ButterflyIcon";
import {
  eras,
  discoveryEvents,
  explorationRoutes,
  allCategories,
  getEventsByEra,
} from "@/data/discoveryHistory";
import type { DiscoveryEvent, EraInfo } from "@/types";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  物种发现: <Sparkles className="w-3.5 h-3.5" />,
  分类学突破: <BookOpen className="w-3.5 h-3.5" />,
  迁徙研究: <Compass className="w-3.5 h-3.5" />,
  保护里程碑: <Shield className="w-3.5 h-3.5" />,
  探索远征: <Zap className="w-3.5 h-3.5" />,
};

const categoryColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  物种发现: {
    bg: "bg-butterfly-pink-light/60",
    text: "text-butterfly-pink-deep",
    border: "border-butterfly-pink/40",
    dot: "bg-butterfly-pink-deep",
  },
  分类学突破: {
    bg: "bg-amber-100/60",
    text: "text-amber-700",
    border: "border-amber-300/40",
    dot: "bg-amber-500",
  },
  迁徙研究: {
    bg: "bg-blue-100/60",
    text: "text-blue-700",
    border: "border-blue-300/40",
    dot: "bg-blue-500",
  },
  保护里程碑: {
    bg: "bg-butterfly-green-light/60",
    text: "text-butterfly-green-deep",
    border: "border-butterfly-green/40",
    dot: "bg-butterfly-green-deep",
  },
  探索远征: {
    bg: "bg-purple-100/60",
    text: "text-purple-700",
    border: "border-purple-300/40",
    dot: "bg-purple-500",
  },
};

export default function DiscoveryTimeline() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<DiscoveryEvent | null>(null);
  const [mapHighlightYear, setMapHighlightYear] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"timeline" | "split">("split");
  const timelineRef = useRef<HTMLDivElement>(null);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    let events = [...discoveryEvents];
    if (selectedEra) {
      events = getEventsByEra(selectedEra);
    }
    if (selectedCategories.length > 0) {
      events = events.filter((e) => selectedCategories.includes(e.category));
    }
    return events.sort((a, b) => a.year - b.year);
  }, [selectedEra, selectedCategories]);

  const visibleEvents = useMemo(() => {
    return filteredEvents;
  }, [filteredEvents]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const scrollTimeline = (direction: "left" | "right") => {
    if (!timelineRef.current) return;
    const scrollAmount = 400;
    timelineRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (selectedEvent) {
      setMapHighlightYear(selectedEvent.year);
    }
  }, [selectedEvent]);

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 opacity-20 bg-grain" aria-hidden />
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-butterfly-gold/30 blur-3xl animate-float"
          aria-hidden
        />
        <div
          className="absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-butterfly-green/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />
        <div className="container relative mx-auto px-4 pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-sm text-butterfly-green-deep">
              <Clock className="w-4 h-4" strokeWidth={1.8} />
              <span>探索长廊 · Discovery Timeline</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-butterfly-ink mb-6 text-balance">
              蝴蝶发现<span className="italic text-butterfly-gold">时间长廊</span>
            </h1>
            <p className="text-base md:text-lg text-butterfly-ink/70 leading-relaxed max-w-xl mx-auto">
              穿越270年的蝴蝶探索史，从林奈的分类启蒙到当代AI识别，
              沿着博物学家的足迹，见证每一次重要发现如何改变我们对蝴蝶世界的认知。
            </p>
          </div>

          {/* Stats */}
          <div className="max-w-4xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "重要事件", value: discoveryEvents.length, icon: <Award className="w-5 h-5" />, color: "text-butterfly-pink-deep" },
              { label: "历史时期", value: eras.length, icon: <Calendar className="w-5 h-5" />, color: "text-butterfly-gold" },
              { label: "探险路线", value: explorationRoutes.length, icon: <Compass className="w-5 h-5" />, color: "text-blue-600" },
              { label: "六大洲", value: 6, icon: <Globe2 className="w-5 h-5" />, color: "text-butterfly-green-deep" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-4 border border-white/40 backdrop-blur-sm"
              >
                <div className={cn("mb-2", stat.color)}>{stat.icon}</div>
                <div className="font-display text-3xl font-bold text-butterfly-ink">
                  {stat.value}
                </div>
                <div className="text-xs text-butterfly-ink/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Era Selector + Filters */}
      <section className="py-6 -mt-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 border border-butterfly-pink/20 shadow-soft">
            {/* Era selector */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-butterfly-gold" />
                <span className="text-sm font-medium text-butterfly-ink">选择历史时期</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedEra(null)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    !selectedEra
                      ? "bg-butterfly-pink-deep text-white shadow-soft"
                      : "bg-white/70 text-butterfly-ink/70 hover:bg-white border border-butterfly-pink/20"
                  )}
                >
                  全部时期
                </button>
                {eras.map((era) => (
                  <button
                    key={era.id}
                    onClick={() => setSelectedEra(selectedEra === era.id ? null : era.id)}
                    className={cn(
                      "group relative px-4 py-2 rounded-full text-sm font-medium transition-all overflow-hidden",
                      selectedEra === era.id
                        ? "text-white shadow-soft"
                        : "bg-white/70 text-butterfly-ink/70 hover:bg-white border border-butterfly-pink/20"
                    )}
                    style={selectedEra === era.id ? { backgroundColor: era.color } : {}}
                  >
                    <span className="relative z-10">
                      {era.name}
                      <span className={cn(
                        "ml-1.5 text-xs opacity-75",
                      )}>
                        {era.startYear}-{era.endYear}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              {selectedEra && (
                <p className="mt-3 text-sm text-butterfly-ink/60 pl-2 border-l-2 border-butterfly-gold/50">
                  {eras.find((e) => e.id === selectedEra)?.description}
                </p>
              )}
            </div>

            {/* Category filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-butterfly-green-deep" />
                <span className="text-sm font-medium text-butterfly-ink">筛选事件类别</span>
                <span className="text-xs text-butterfly-ink/50 ml-2">
                  ({filteredEvents.length} 条记录)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => {
                  const colors = categoryColors[cat];
                  const active = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                        active
                          ? `${colors.bg} ${colors.text} ${colors.border} shadow-sm scale-105`
                          : "bg-white/50 text-butterfly-ink/50 border-transparent hover:bg-white hover:text-butterfly-ink/70"
                      )}
                    >
                      <span className={cn("w-2 h-2 rounded-full", active ? colors.dot : "bg-butterfly-ink/30")} />
                      {categoryIcons[cat]}
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* View Mode Toggle + Main Content */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          {/* Map section */}
          <div className="mb-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 md:p-6 border border-butterfly-pink/20 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-butterfly-ink flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-butterfly-green-deep" />
                    全球探索足迹
                  </h2>
                  <p className="text-sm text-butterfly-ink/60 mt-1">
                    悬停或点击时间轴事件，查看对应发现地点在地图上的位置
                  </p>
                </div>
                <div className="flex gap-2 text-xs">
                  {[
                    { key: "event", label: "发现地点" },
                    { key: "route", label: "探险路线" },
                  ].map((item) => (
                    <span
                      key={item.key}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-50 border border-butterfly-pink/20"
                    >
                      <span
                        className={cn(
                          "w-2.5 h-2.5 rounded-full",
                          item.key === "event" ? "bg-butterfly-pink-deep" : "bg-butterfly-gold"
                        )}
                      />
                      <span className="text-butterfly-ink/70">{item.label}</span>
                    </span>
                  ))}
                </div>
              </div>

              <DiscoveryWorldMap
                events={visibleEvents}
                selectedEventId={selectedEvent?.id ?? null}
                hoveredEventId={hoveredEventId}
                highlightYear={mapHighlightYear}
                onSelectEvent={(e) => {
                  setSelectedEvent(e);
                }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-butterfly-pink/20 shadow-soft overflow-hidden">
            <div className="p-4 md:p-6 border-b border-butterfly-pink/10 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl md:text-2xl font-semibold text-butterfly-ink flex items-center gap-2">
                  <Clock className="w-5 h-5 text-butterfly-pink-deep" />
                  发现时间轴
                </h2>
                <p className="text-sm text-butterfly-ink/60 mt-1">
                  点击事件卡片查看详情，左右按钮滚动浏览
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollTimeline("left")}
                  className="w-10 h-10 rounded-xl bg-white border border-butterfly-pink/20 flex items-center justify-center text-butterfly-ink/70 hover:bg-butterfly-pink-light/30 hover:text-butterfly-pink-deep transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollTimeline("right")}
                  className="w-10 h-10 rounded-xl bg-white border border-butterfly-pink/20 flex items-center justify-center text-butterfly-ink/70 hover:bg-butterfly-pink-light/30 hover:text-butterfly-pink-deep transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Era markers */}
            <div className="px-4 md:px-6 pt-4 border-b border-butterfly-pink/10 bg-cream-50/50">
              <div className="flex overflow-x-auto pb-3 gap-2 timeline-erabar">
                {eras.map((era, idx) => {
                  const count = getEventsByEra(era.id).filter((e) =>
                    selectedCategories.length === 0 || selectedCategories.includes(e.category)
                  ).length;
                  return (
                    <div
                      key={era.id}
                      className={cn(
                        "flex-shrink-0 rounded-xl px-3 py-2 border transition-all cursor-pointer min-w-[140px]",
                        selectedEra === era.id
                          ? "shadow-md scale-[1.02]"
                          : "bg-white/60 border-transparent hover:bg-white"
                      )}
                      style={
                        selectedEra === era.id
                          ? { backgroundColor: era.color + "25", borderColor: era.color }
                          : {}
                      }
                      onClick={() => setSelectedEra(selectedEra === era.id ? null : era.id)}
                    >
                      <div
                        className="text-xs font-medium mb-1"
                        style={{ color: selectedEra === era.id ? era.color : "#6B7280" }}
                      >
                        {era.name}
                      </div>
                      <div className="text-[11px] text-butterfly-ink/50">
                        {era.startYear} – {era.endYear}
                      </div>
                      <div className="text-xs font-semibold text-butterfly-ink mt-1 flex items-center gap-1">
                        <ButterflyIcon className="w-3 h-3" strokeWidth={2} />
                        {count} 项
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative p-4 md:p-6">
              <div
                ref={timelineRef}
                className="overflow-x-auto pb-4 timeline-scroll"
                style={{ scrollbarWidth: "thin" }}
              >
                <div
                  className="relative"
                  style={{
                    minWidth: `${Math.max(visibleEvents.length * 280, 100)}%`,
                    paddingBottom: "2rem",
                  }}
                >
                  {/* Central line */}
                  <div
                    className="absolute top-28 left-0 right-0 h-1 rounded-full"
                    style={{
                      background:
                        "linear-gradient(to right, #E8B4D4, #D4A574, #86B98E, #8FB8D2, #D28FB8)",
                    }}
                  />

                  {/* Events */}
                  <div className="relative flex gap-4 px-2 pt-2">
                    {visibleEvents.map((event, idx) => {
                      const colors = categoryColors[event.category];
                      const isSelected = selectedEvent?.id === event.id;
                      const isHovered = hoveredEventId === event.id;
                      const isAbove = idx % 2 === 0;
                      return (
                        <div
                          key={event.id}
                          className="flex-shrink-0 relative"
                          style={{ width: "260px" }}
                          onMouseEnter={() => setHoveredEventId(event.id)}
                          onMouseLeave={() => setHoveredEventId(null)}
                        >
                          {/* Connector line */}
                          <div
                            className={cn(
                              "absolute left-1/2 -translate-x-1/2 w-0.5",
                              isAbove ? "top-12 bottom-[112px]" : "top-[112px] bottom-12",
                              isSelected || isHovered
                                ? colors.dot
                                : "bg-butterfly-pink/30"
                            )}
                            style={{
                              transition: "background-color 0.3s",
                            }}
                          />

                          {/* Card above */}
                          {isAbove && (
                            <div
                              className={cn(
                                "mb-16 rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-300",
                                isSelected
                                  ? `${colors.border} shadow-lg scale-[1.03]`
                                  : isHovered
                                  ? `${colors.border} shadow-md -translate-y-1`
                                  : "border-white bg-white/80 hover:shadow-card"
                              )}
                              onClick={() =>
                                setSelectedEvent(isSelected ? null : event)
                              }
                            >
                              <EventCard event={event} />
                            </div>
                          )}

                          {/* Dot */}
                          <div className="absolute left-1/2 -translate-x-1/2 top-28 z-10">
                            <div
                              className={cn(
                                "w-6 h-6 rounded-full border-4 border-white flex items-center justify-center transition-all",
                                isSelected || isHovered
                                  ? `${colors.dot} shadow-lg scale-125 animate-timeline-pulse`
                                  : `bg-white ${colors.border.replace("border-", "bg-")}/30`
                              )}
                              style={{
                                backgroundColor: isSelected || isHovered ? undefined : undefined,
                              }}
                            >
                              <div
                                className={cn(
                                  "w-2 h-2 rounded-full",
                                  isSelected || isHovered ? "bg-white" : colors.dot
                                )}
                              />
                            </div>
                          </div>

                          {/* Year label */}
                          <div className="absolute left-1/2 -translate-x-1/2 top-[124px] z-10">
                            <div
                              className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                                isSelected || isHovered
                                  ? `${colors.bg} ${colors.text} shadow-sm`
                                  : "bg-white/60 text-butterfly-ink/70"
                              )}
                            >
                              {event.yearDisplay}
                            </div>
                          </div>

                          {/* Card below */}
                          {!isAbove && (
                            <div
                              className={cn(
                                "mt-36 rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-300",
                                isSelected
                                  ? `${colors.border} shadow-lg scale-[1.03]`
                                  : isHovered
                                  ? `${colors.border} shadow-md -translate-y-1`
                                  : "border-white bg-white/80 hover:shadow-card"
                              )}
                              onClick={() =>
                                setSelectedEvent(isSelected ? null : event)
                              }
                            >
                              <EventCard event={event} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => {
            setSelectedEvent(null);
            setMapHighlightYear(null);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-butterfly-ink text-cream-100/80 py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ButterflyIcon
              className="w-5 h-5 text-butterfly-pink"
              strokeWidth={1.5}
            />
            <span className="font-display text-xl font-semibold text-cream-100">
              蝶<span className="italic text-butterfly-pink">语</span>
            </span>
          </div>
          <p className="text-xs text-cream-100/40">
            © 2026 蝶语 Butterfly Whispers · Made with 🦋
          </p>
        </div>
      </footer>
    </div>
  );
}

function EventCard({ event }: { event: DiscoveryEvent }) {
  const colors = categoryColors[event.category];
  return (
    <div>
      {event.butterflyImage && (
        <div className="aspect-video bg-cream-50 overflow-hidden relative">
          <img
            src={event.butterflyImage}
            alt={event.butterflyName || event.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div
            className={cn(
              "absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium",
              colors.bg,
              colors.text
            )}
          >
            {categoryIcons[event.category]}
            {event.category}
          </div>
        </div>
      )}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-base font-semibold text-butterfly-ink leading-tight line-clamp-2">
            {event.title}
          </h3>
        </div>
        <div className="space-y-1.5 text-xs text-butterfly-ink/65">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-butterfly-pink-deep flex-shrink-0" />
            <span className="truncate">
              {event.location.country} · {event.location.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3 h-3 text-butterfly-gold flex-shrink-0" />
            <span className="truncate">{event.discoverer}</span>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-butterfly-ink/55 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {event.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-[10px] bg-cream-100 text-butterfly-ink/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventDetailModal({
  event,
  onClose,
}: {
  event: DiscoveryEvent;
  onClose: () => void;
}) {
  const colors = categoryColors[event.category];
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-cream-50 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative aspect-[21/9] overflow-hidden">
          {event.butterflyImage ? (
            <img
              src={event.butterflyImage}
              alt={event.butterflyName || event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: colors.bg.replace("/60", "") }}
            >
              <ButterflyIcon className="w-24 h-24 opacity-40" strokeWidth={1} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                  colors.bg,
                  colors.text
                )}
              >
                {categoryIcons[event.category]}
                {event.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
                <Calendar className="w-3 h-3 inline mr-1" />
                {event.yearDisplay}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
                {event.era}
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-320px)]">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="rounded-2xl p-4 bg-white border border-butterfly-pink/15">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-butterfly-pink-deep" />
                <span className="text-xs text-butterfly-ink/50">发现地点</span>
              </div>
              <div className="font-display text-lg font-semibold text-butterfly-ink">
                {event.location.name}
              </div>
              <div className="text-sm text-butterfly-ink/60 mt-0.5">
                {event.location.country} · {event.location.continent}
              </div>
            </div>
            <div className="rounded-2xl p-4 bg-white border border-butterfly-pink/15">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-butterfly-gold" />
                <span className="text-xs text-butterfly-ink/50">发现者</span>
              </div>
              <div className="font-display text-base font-semibold text-butterfly-ink line-clamp-1">
                {event.discoverer}
              </div>
              <div className="text-xs text-butterfly-ink/55 mt-1 line-clamp-2">
                {event.discovererBio}
              </div>
            </div>
            <div className="rounded-2xl p-4 bg-white border border-butterfly-pink/15">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-butterfly-green-deep" />
                <span className="text-xs text-butterfly-ink/50">相关物种</span>
              </div>
              <div className="font-display text-lg font-semibold text-butterfly-ink">
                {event.butterflyName || "—"}
              </div>
              <div className="text-xs text-butterfly-ink/55 italic mt-0.5">
                {event.butterflyLatinName || ""}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-butterfly-pink-deep" />
                历史背景
              </h3>
              <p className="text-sm text-butterfly-ink/75 leading-relaxed">
                {event.description}
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-butterfly-gold" />
                历史意义
              </h3>
              <p className="text-sm text-butterfly-ink/75 leading-relaxed pl-4 border-l-2 border-butterfly-gold/50">
                {event.significance}
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-butterfly-green-deep" />
                关键词标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-butterfly-green-light/40 text-butterfly-green-deep border border-butterfly-green/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface WorldMapProps {
  events: DiscoveryEvent[];
  selectedEventId: string | null;
  hoveredEventId: string | null;
  highlightYear: number | null;
  onSelectEvent: (event: DiscoveryEvent) => void;
}

function DiscoveryWorldMap({
  events,
  selectedEventId,
  hoveredEventId,
  highlightYear,
  onSelectEvent,
}: WorldMapProps) {
  const continentPaths = [
    {
      id: "北美洲",
      d: "M 80 100 Q 60 80 75 60 Q 95 40 130 45 Q 170 50 185 75 Q 200 100 190 130 Q 180 160 150 170 Q 120 180 100 160 Q 85 140 80 120 Z",
    },
    {
      id: "南美洲",
      d: "M 155 200 Q 140 190 145 220 Q 150 260 165 290 Q 175 315 190 330 Q 200 345 210 335 Q 220 310 225 280 Q 230 250 220 220 Q 210 195 190 190 Q 170 185 155 200 Z",
    },
    {
      id: "欧洲",
      d: "M 280 95 Q 265 80 280 65 Q 300 55 330 60 Q 360 65 375 85 Q 385 105 370 120 Q 355 135 325 130 Q 295 125 280 110 Z",
    },
    {
      id: "非洲",
      d: "M 300 160 Q 280 150 285 180 Q 290 220 305 260 Q 320 300 340 320 Q 360 340 380 330 Q 400 320 405 290 Q 410 260 400 230 Q 390 200 370 180 Q 340 165 300 160 Z",
    },
    {
      id: "亚洲",
      d: "M 400 70 Q 370 55 400 40 Q 450 30 510 40 Q 570 50 600 80 Q 620 110 610 150 Q 600 190 570 210 Q 530 230 490 220 Q 450 210 420 180 Q 400 150 395 110 Q 395 85 400 70 Z",
    },
    {
      id: "大洋洲",
      d: "M 520 260 Q 500 250 510 270 Q 520 295 545 310 Q 570 325 595 315 Q 615 305 620 280 Q 625 255 610 240 Q 595 225 570 220 Q 540 215 520 260 Z",
    },
  ];

  const continentColors: Record<string, { base: string; active: string }> = {
    北美洲: { base: "#E8B4D4", active: "#D28FB8" },
    南美洲: { base: "#B7D9BC", active: "#5F9368" },
    欧洲: { base: "#D4A574", active: "#B8956A" },
    非洲: { base: "#E8C4B4", active: "#D4A594" },
    亚洲: { base: "#F5D9E8", active: "#E8B4D4" },
    大洋洲: { base: "#B4D4E8", active: "#8FB8D2" },
  };

  const activeEvents = useMemo(() => {
    const map = new Map<string, DiscoveryEvent[]>();
    events.forEach((e) => {
      const key = `${e.location.x}-${e.location.y}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    });
    return map;
  }, [events]);

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 700 380"
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 8px 32px rgba(134, 185, 142, 0.1))" }}
      >
        <defs>
          <linearGradient id="d-bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBF7" />
            <stop offset="50%" stopColor="#FDF1E8" />
            <stop offset="100%" stopColor="#F5D9E8" />
          </linearGradient>
          <pattern id="d-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(210, 143, 184, 0.06)"
              strokeWidth="1"
            />
          </pattern>
          <filter id="d-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 6 3, 0 6" fill="#D4A574" opacity="0.8" />
          </marker>
        </defs>

        <rect width="700" height="380" rx="24" fill="url(#d-bgGrad)" />
        <rect width="700" height="380" rx="24" fill="url(#d-grid)" />

        {/* Continents */}
        {continentPaths.map((c) => {
          const hasEvent = events.some((e) => e.location.continent === c.id);
          const colors = continentColors[c.id];
          return (
            <path
              key={c.id}
              d={c.d}
              fill={hasEvent ? `${colors.base}65` : `${colors.base}35`}
              stroke={hasEvent ? colors.active : "transparent"}
              strokeWidth={hasEvent ? 1 : 0}
              className="transition-all duration-500"
            />
          );
        })}

        {/* Exploration routes */}
        {explorationRoutes.map((route, idx) => {
          const shouldHighlight =
            !highlightYear || Math.abs(route.year - highlightYear) <= 20;
          return (
            <g key={idx}>
              <path
                d={`M ${route.from.x} ${route.from.y} Q ${(route.from.x + route.to.x) / 2} ${Math.min(route.from.y, route.to.y) - 50} ${route.to.x} ${route.to.y}`}
                fill="none"
                stroke="#D4A574"
                strokeWidth={shouldHighlight ? 2 : 1}
                strokeDasharray={shouldHighlight ? "0" : "6 4"}
                opacity={shouldHighlight ? 0.75 : 0.25}
                markerEnd="url(#arrowhead)"
                className="transition-all duration-500"
              />
              <text
                x={(route.from.x + route.to.x) / 2}
                y={(Math.min(route.from.y, route.to.y) - 55)}
                textAnchor="middle"
                fontSize="9"
                fill="#B8956A"
                opacity={shouldHighlight ? 0.9 : 0.3}
                fontFamily="'Noto Sans SC', sans-serif"
                className="select-none pointer-events-none transition-opacity duration-500"
              >
                {route.year} · {route.description}
              </text>
            </g>
          );
        })}

        {/* Event markers */}
        {Array.from(activeEvents.entries()).map(([key, evtsAtPoint]) => {
          const first = evtsAtPoint[0];
          const x = first.location.x;
          const y = first.location.y;
          const isSelected = evtsAtPoint.some(
            (e) => e.id === selectedEventId || e.id === hoveredEventId
          );
          const hasActiveCategory = evtsAtPoint.some((e) => {
            const colors = categoryColors[e.category];
            return colors;
          });
          const primaryEvent = evtsAtPoint.find((e) => e.id === hoveredEventId) ||
            evtsAtPoint.find((e) => e.id === selectedEventId) ||
            first;
          const colors = categoryColors[primaryEvent.category];
          return (
            <g
              key={key}
              className="cursor-pointer"
              onClick={() => onSelectEvent(primaryEvent)}
            >
              {isSelected && (
                <>
                  <circle
                    cx={x}
                    cy={y}
                    r={22}
                    fill="none"
                    stroke={colors.dot}
                    strokeWidth="1.5"
                    opacity="0.6"
                    style={{
                      animation: "timeline-pulse 2s ease-in-out infinite",
                    }}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={14}
                    fill={colors.dot}
                    opacity="0.15"
                  />
                </>
              )}

              <circle
                cx={x}
                cy={y}
                r={isSelected ? 9 : 6}
                fill={isSelected ? colors.dot : "#D28FB8"}
                stroke="white"
                strokeWidth="2.5"
                filter={isSelected ? "url(#d-glow)" : undefined}
                className="transition-all duration-300"
              />

              {evtsAtPoint.length > 1 && (
                <g>
                  <circle
                    cx={x + 8}
                    cy={y - 8}
                    r="8"
                    fill="white"
                    stroke={colors.dot}
                    strokeWidth="1.5"
                  />
                  <text
                    x={x + 8}
                    y={y - 5}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="bold"
                    fill={colors.text.replace("text-", "") === colors.dot ? colors.text : ""}
                    style={{
                      fill: colors.dot,
                      fontFamily: "'Noto Sans SC', sans-serif",
                    }}
                    className="select-none pointer-events-none"
                  >
                    {evtsAtPoint.length}
                  </text>
                </g>
              )}

              {(isSelected || hasActiveCategory) && (
                <g className="pointer-events-none select-none">
                  <rect
                    x={x + 12}
                    y={y - 22}
                    rx="8"
                    ry="8"
                    width={Math.max(90, first.title.length * 12 + 20)}
                    height="22"
                    fill="white"
                    stroke={colors.dot}
                    strokeWidth="1"
                    opacity="0.95"
                    filter="url(#d-glow)"
                  />
                  <text
                    x={x + 22}
                    y={y - 7}
                    fontSize="10"
                    fontWeight="600"
                    fill="#3A3A3A"
                    fontFamily="'Noto Sans SC', sans-serif"
                    className="truncate"
                  >
                    {first.yearDisplay} {first.title.length > 8 ? first.title.slice(0, 8) + "…" : first.title}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Legend bottom */}
        <g className="pointer-events-none select-none">
          <rect x="20" y="340" width="180" height="28" rx="8" fill="white" opacity="0.85" />
          <text x="32" y="358" fontSize="10" fill="#6B7280" fontFamily="'Noto Sans SC', sans-serif">
            {events.length} 处发现地点 · {explorationRoutes.length} 条探险路线
          </text>
        </g>
      </svg>

      {/* Quick location chips */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {Array.from(
          new Map(events.map((e) => [e.location.continent, e.location.continent])).values()
        ).map((continent) => {
          const count = events.filter((e) => e.location.continent === continent).length;
          const colors = continentColors[continent];
          return (
            <div
              key={continent}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-white/70 border border-butterfly-pink/15"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: colors.active }}
              />
              <span className="font-medium text-butterfly-ink">{continent}</span>
              <span className="text-butterfly-ink/50">{count}处</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
