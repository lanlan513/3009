import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Home,
  ChevronRight,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  BookOpen,
  Gem,
  Flame,
  MapPin,
  Calendar,
  User,
  Archive,
  Award,
  FileText,
  Clock,
  Building2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Layers,
  Shield,
  Ruler,
  Tag,
  AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { getSpecimenById, conservationStatusColors, conditionColors } from "@/data/specimens";
import { getButterflyById } from "@/data/butterflies";
import type { Specimen, DiscoveryRecord, ResearchRecord } from "@/types";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  "历史标本": <BookOpen className="w-5 h-5" strokeWidth={1.8} />,
  "珍稀物种": <Gem className="w-5 h-5" strokeWidth={1.8} />,
  "已灭绝近缘种": <Flame className="w-5 h-5" strokeWidth={1.8} />,
};

const categoryColors: Record<string, string> = {
  "历史标本": "text-amber-700 bg-amber-100",
  "珍稀物种": "text-emerald-700 bg-emerald-100",
  "已灭绝近缘种": "text-rose-700 bg-rose-100",
};

const categoryGradients: Record<string, string> = {
  "历史标本": "from-amber-500 to-orange-500",
  "珍稀物种": "from-emerald-500 to-teal-500",
  "已灭绝近缘种": "from-rose-500 to-pink-500",
};

export default function SpecimenDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"3d" | "history" | "research">("3d");
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const viewerRef = useRef<HTMLDivElement>(null);

  const specimen = useMemo(() => {
    if (!id) return undefined;
    return getSpecimenById(id);
  }, [id]);

  const relatedButterfly = useMemo(() => {
    if (!specimen?.relatedButterflyId) return undefined;
    return getButterflyById(specimen.relatedButterflyId);
  }, [specimen]);

  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        ...prev,
        y: prev.y + 0.5,
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setRotation((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5,
    }));
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setAutoRotate(false);
    setStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;
    setRotation((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5,
    }));
    setStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(2.5, prev + 0.2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0.5, prev - 0.2));
  };

  if (!specimen) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl text-butterfly-ink mb-2">标本未找到</h2>
          <p className="text-butterfly-ink/60 mb-6">请检查链接是否正确</p>
          <Link
            to="/specimen-museum"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-butterfly-pink-deep text-white font-medium"
          >
            返回标本博物馆
          </Link>
        </div>
      </div>
    );
  }

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
          <Link to="/specimen-museum" className="hover:text-butterfly-pink-deep transition-colors">
            标本博物馆
          </Link>
          <ChevronRight className="w-3 h-3" strokeWidth={2} />
          <span className="text-butterfly-ink/80 truncate">{specimen.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-butterfly-ink/60 hover:text-butterfly-pink-deep transition-colors"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            返回列表
          </button>
          <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium", categoryColors[specimen.category])}>
            {categoryIcons[specimen.category]}
            {specimen.category}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div
              ref={viewerRef}
              className={cn(
                "relative rounded-3xl overflow-hidden border-2 border-white/50 shadow-xl cursor-grab active:cursor-grabbing",
                "bg-gradient-to-br",
                categoryGradients[specimen.category]
              )}
              style={{ minHeight: "500px" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="absolute inset-0 bg-grain opacity-30" aria-hidden />

              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div
                  className="relative transition-transform duration-100 ease-out"
                  style={{
                    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={specimen.image}
                    alt={specimen.name}
                    className="w-80 h-80 object-contain rounded-2xl shadow-2xl"
                    draggable={false}
                    style={{
                      filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.3))",
                      backfaceVisibility: "visible",
                    }}
                  />

                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(${rotation.y * -0.5 + 45}deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)`,
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                  <span className="text-xs font-mono text-butterfly-ink/70">
                    {specimen.specimenNumber}
                  </span>
                </div>
              </div>

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={handleZoomIn}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  title="放大"
                >
                  <ZoomIn className="w-4 h-4 text-butterfly-ink" strokeWidth={2} />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  title="缩小"
                >
                  <ZoomOut className="w-4 h-4 text-butterfly-ink" strokeWidth={2} />
                </button>
                <button
                  onClick={resetView}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  title="重置视角"
                >
                  <RotateCcw className="w-4 h-4 text-butterfly-ink" strokeWidth={2} />
                </button>
              </div>

              <div className="absolute bottom-4 left-4">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all",
                    autoRotate
                      ? "bg-white text-butterfly-ink shadow-lg"
                      : "bg-white/70 text-butterfly-ink/60 hover:bg-white/90"
                  )}
                >
                  <Move className="w-4 h-4" strokeWidth={2} />
                  {autoRotate ? "自动旋转中" : "已暂停"}
                </button>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-4 text-xs text-butterfly-ink/60">
                  <span>X: {Math.round(rotation.x)}°</span>
                  <span>Y: {Math.round(rotation.y)}°</span>
                  <span>×{zoom.toFixed(1)}</span>
                </div>
              </div>

              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-butterfly-ink/60">
                拖动标本可360°旋转查看 · 滚轮或按钮缩放
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("3d")}
                className={cn(
                  "flex-1 py-3 px-6 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-2",
                  activeTab === "3d"
                    ? cn("bg-gradient-to-r", categoryGradients[specimen.category], "text-white shadow-lg")
                    : "bg-white/70 text-butterfly-ink/60 hover:bg-white"
                )}
              >
                <Layers className="w-4 h-4" strokeWidth={1.8} />
                3D展示
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={cn(
                  "flex-1 py-3 px-6 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-2",
                  activeTab === "history"
                    ? cn("bg-gradient-to-r", categoryGradients[specimen.category], "text-white shadow-lg")
                    : "bg-white/70 text-butterfly-ink/60 hover:bg-white"
                )}
              >
                <Clock className="w-4 h-4" strokeWidth={1.8} />
                发现历史
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">
                  {specimen.discoveryHistory.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("research")}
                className={cn(
                  "flex-1 py-3 px-6 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-2",
                  activeTab === "research"
                    ? cn("bg-gradient-to-r", categoryGradients[specimen.category], "text-white shadow-lg")
                    : "bg-white/70 text-butterfly-ink/60 hover:bg-white"
                )}
              >
                <FileText className="w-4 h-4" strokeWidth={1.8} />
                研究记录
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">
                  {specimen.researchRecords.length}
                </span>
              </button>
            </div>

            {activeTab === "history" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-100 shadow-lg opacity-0 animate-fade-up">
                <h3 className="font-display text-xl font-semibold text-butterfly-ink mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" strokeWidth={1.8} />
                  发现历史时间线
                </h3>
                <DiscoveryTimeline records={specimen.discoveryHistory} category={specimen.category} />
              </div>
            )}

            {activeTab === "research" && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-100 shadow-lg opacity-0 animate-fade-up">
                <h3 className="font-display text-xl font-semibold text-butterfly-ink mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600" strokeWidth={1.8} />
                  研究文献记录
                </h3>
                <ResearchRecords records={specimen.researchRecords} category={specimen.category} />
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-100 shadow-lg">
              <div className="mb-6">
                <h1 className="font-display text-3xl font-semibold text-butterfly-ink mb-2 leading-tight">
                  {specimen.name}
                </h1>
                <p className="text-butterfly-ink/50 font-serif italic text-lg">
                  {specimen.latinName}
                </p>
              </div>

              <p className="text-butterfly-ink/70 leading-relaxed mb-6">
                {specimen.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <InfoItem
                  icon={<Ruler className="w-4 h-4" strokeWidth={1.8} />}
                  label="翅展"
                  value={specimen.wingspan}
                />
                <InfoItem
                  icon={<Shield className="w-4 h-4" strokeWidth={1.8} />}
                  label="保存状态"
                  value={specimen.condition}
                  valueClass={conditionColors[specimen.condition]}
                />
                <InfoItem
                  icon={<Tag className="w-4 h-4" strokeWidth={1.8} />}
                  label="稀有度"
                  value={specimen.rarity}
                />
                <InfoItem
                  icon={<AlertTriangle className="w-4 h-4" strokeWidth={1.8} />}
                  label="保护等级"
                  value={specimen.conservationStatus}
                  valueClass={conservationStatusColors[specimen.conservationStatus]}
                />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-100 shadow-lg">
              <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-4 flex items-center gap-2">
                <Archive className="w-5 h-5 text-amber-600" strokeWidth={1.8} />
                采集与保存信息
              </h3>
              <div className="space-y-4">
                <DetailRow icon={<Calendar className="w-4 h-4" strokeWidth={1.8} />} label="采集日期" value={specimen.collectionDate} />
                <DetailRow icon={<MapPin className="w-4 h-4" strokeWidth={1.8} />} label="采集地点" value={specimen.collectionLocation} />
                <DetailRow icon={<User className="w-4 h-4" strokeWidth={1.8} />} label="采集者" value={specimen.collector} />
                <DetailRow icon={<Award className="w-4 h-4" strokeWidth={1.8} />} label="捐赠方" value={specimen.donor} />
                <DetailRow icon={<Archive className="w-4 h-4" strokeWidth={1.8} />} label="保存方式" value={specimen.preservationMethod} />
                <DetailRow icon={<Building2 className="w-4 h-4" strokeWidth={1.8} />} label="馆藏位置" value={specimen.storageLocation} />
              </div>
            </div>

            {relatedButterfly && (
              <div className="bg-gradient-to-br from-butterfly-pink-light/40 to-butterfly-pink-light/20 rounded-3xl p-6 border border-butterfly-pink/20 shadow-lg">
                <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-4 flex items-center gap-2">
                  <Gem className="w-5 h-5 text-butterfly-pink-deep" strokeWidth={1.8} />
                  关联现生物种
                </h3>
                <Link
                  to={`/butterfly/${relatedButterfly.id}`}
                  className="group block"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={relatedButterfly.image}
                      alt={relatedButterfly.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-butterfly-ink group-hover:text-butterfly-pink-deep transition-colors">
                        {relatedButterfly.name}
                      </p>
                      <p className="text-xs text-butterfly-ink/50 font-serif italic">
                        {relatedButterfly.latinName}
                      </p>
                      <p className="text-xs text-butterfly-ink/60 mt-1">
                        {relatedButterfly.family} · {relatedButterfly.rarity}
                      </p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-butterfly-pink-deep group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                  </div>
                </Link>
              </div>
            )}

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-100 shadow-lg">
              <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" strokeWidth={1.8} />
                馆藏备注
              </h3>
              <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                {specimen.notes}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-100 shadow-lg">
              <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-600" strokeWidth={1.8} />
                标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {specimen.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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

function InfoItem({
  icon,
  label,
  value,
  valueClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-amber-50/50 rounded-2xl p-3">
      <div className="flex items-center gap-2 text-amber-600/70 mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      {valueClass ? (
        <span className={cn("inline-block px-2 py-0.5 rounded-full text-xs font-medium", valueClass)}>
          {value}
        </span>
      ) : (
        <p className="text-sm font-medium text-butterfly-ink">{value}</p>
      )}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-amber-100/50 flex items-center justify-center text-amber-600/70 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-butterfly-ink/50 mb-0.5">{label}</p>
        <p className="text-sm text-butterfly-ink font-medium">{value}</p>
      </div>
    </div>
  );
}

function DiscoveryTimeline({ records, category }: { records: DiscoveryRecord[]; category: string }) {
  const sortedRecords = [...records].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-amber-300 to-emerald-200" />

      <div className="space-y-6">
        {sortedRecords.map((record, index) => (
          <div key={index} className="relative pl-16">
            <div
              className={cn(
                "absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
                "bg-gradient-to-br",
                categoryGradients[category]
              )}
            >
              <span className="text-white text-xs font-bold">
                {record.date.split("-")[0].slice(2)}
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-semibold text-butterfly-ink">{record.discoverer}</p>
                  <p className="text-xs text-butterfly-ink/50">{record.date}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-600/70 bg-amber-50 px-2 py-1 rounded-full">
                  <MapPin className="w-3 h-3" strokeWidth={1.8} />
                  {record.location}
                </div>
              </div>
              <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                {record.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResearchRecords({ records, category }: { records: ResearchRecord[]; category: string }) {
  const sortedRecords = [...records].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  return (
    <div className="space-y-4">
      {sortedRecords.map((record, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-5 border border-amber-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0",
                "bg-gradient-to-br",
                categoryGradients[category]
              )}
            >
              <span className="text-white text-lg font-bold">{record.year}</span>
              <span className="text-white/70 text-[10px]">研究年份</span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-butterfly-ink mb-1 leading-snug">
                {record.title}
              </h4>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-xs text-butterfly-ink/60">
                  <User className="w-3 h-3" strokeWidth={1.8} />
                  {record.researcher}
                </span>
                <span className="text-butterfly-ink/30">·</span>
                <span className="inline-flex items-center gap-1 text-xs text-butterfly-ink/60">
                  <Building2 className="w-3 h-3" strokeWidth={1.8} />
                  {record.institution}
                </span>
              </div>
              <p className="text-sm text-butterfly-ink/70 leading-relaxed">
                {record.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
