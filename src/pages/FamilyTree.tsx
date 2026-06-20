import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Home,
  Bug,
  Leaf,
  Flower2,
  Sparkles,
  ArrowRight,
  TreeDeciduous,
  Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ButterflyIcon from "@/components/ButterflyIcon";
import { butterflyFamilyTree } from "@/data/butterflies";
import type {
  TaxonFamily,
  TaxonSubfamily,
  TaxonGenus,
  TaxonSpecies,
  BreadcrumbItem,
} from "@/types";
import { cn } from "@/lib/utils";

type ExpandedState = Record<string, boolean>;
type SelectedNode = {
  type: "family" | "subfamily" | "genus";
  data: TaxonFamily | TaxonSubfamily | TaxonGenus;
} | null;

const levelColors = {
  family: {
    bg: "bg-butterfly-pink-light/60",
    border: "border-butterfly-pink/40",
    text: "text-butterfly-pink-deep",
    hover: "hover:bg-butterfly-pink-light/80",
    active: "bg-butterfly-pink-deep text-white",
  },
  subfamily: {
    bg: "bg-butterfly-green-light/60",
    border: "border-butterfly-green/40",
    text: "text-butterfly-green-deep",
    hover: "hover:bg-butterfly-green-light/80",
    active: "bg-butterfly-green-deep text-white",
  },
  genus: {
    bg: "bg-butterfly-gold/30",
    border: "border-butterfly-gold/50",
    text: "text-butterfly-gold",
    hover: "hover:bg-butterfly-gold/40",
    active: "bg-butterfly-gold text-white",
  },
};

function getRarityColor(rarity: string) {
  const colors: Record<string, string> = {
    常见: "bg-butterfly-green/20 text-butterfly-green-deep",
    较常见: "bg-butterfly-green-light/40 text-butterfly-green-deep",
    稀有: "bg-butterfly-pink/20 text-butterfly-pink-deep",
    极稀有: "bg-butterfly-pink-light/40 text-butterfly-pink-deep",
    濒危: "bg-red-100 text-red-600",
  };
  return colors[rarity] || "bg-gray-100 text-gray-600";
}

export default function FamilyTree() {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [selectedNode, setSelectedNode] = useState<SelectedNode>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleFamilyClick = useCallback(
    (family: TaxonFamily) => {
      const familyId = `family-${family.name}`;
      const isExpanded = expanded[familyId];
      if (!isExpanded) {
        toggleExpand(familyId);
      }
      setSelectedNode({ type: "family", data: family });
      setBreadcrumbs([
        {
          level: "family",
          name: family.name,
          latinName: family.latinName,
        },
      ]);
    },
    [expanded, toggleExpand]
  );

  const handleSubfamilyClick = useCallback(
    (family: TaxonFamily, subfamily: TaxonSubfamily) => {
      const subfamilyId = `subfamily-${family.name}-${subfamily.name}`;
      const isExpanded = expanded[subfamilyId];
      if (!isExpanded) {
        toggleExpand(subfamilyId);
      }
      setSelectedNode({ type: "subfamily", data: subfamily });
      setBreadcrumbs([
        {
          level: "family",
          name: family.name,
          latinName: family.latinName,
        },
        {
          level: "subfamily",
          name: subfamily.name,
          latinName: subfamily.latinName,
        },
      ]);
    },
    [expanded, toggleExpand]
  );

  const handleGenusClick = useCallback(
    (
      family: TaxonFamily,
      subfamily: TaxonSubfamily,
      genus: TaxonGenus
    ) => {
      const genusId = `genus-${family.name}-${subfamily.name}-${genus.name}`;
      const isExpanded = expanded[genusId];
      if (!isExpanded) {
        toggleExpand(genusId);
      }
      setSelectedNode({ type: "genus", data: genus });
      setBreadcrumbs([
        {
          level: "family",
          name: family.name,
          latinName: family.latinName,
        },
        {
          level: "subfamily",
          name: subfamily.name,
          latinName: subfamily.latinName,
        },
        {
          level: "genus",
          name: genus.name,
          latinName: genus.latinName,
        },
      ]);
    },
    [expanded, toggleExpand]
  );

  const handleBreadcrumbClick = useCallback(
    (index: number) => {
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
      setBreadcrumbs(newBreadcrumbs);

      if (newBreadcrumbs.length === 1) {
        const family = butterflyFamilyTree.find(
          (f) => f.name === newBreadcrumbs[0].name
        );
        if (family) {
          setSelectedNode({ type: "family", data: family });
        }
      } else if (newBreadcrumbs.length === 2) {
        const family = butterflyFamilyTree.find(
          (f) => f.name === newBreadcrumbs[0].name
        );
        const subfamily = family?.subfamilies.find(
          (s) => s.name === newBreadcrumbs[1].name
        );
        if (family && subfamily) {
          setSelectedNode({ type: "subfamily", data: subfamily });
        }
      } else if (newBreadcrumbs.length === 3) {
        const family = butterflyFamilyTree.find(
          (f) => f.name === newBreadcrumbs[0].name
        );
        const subfamily = family?.subfamilies.find(
          (s) => s.name === newBreadcrumbs[1].name
        );
        const genus = subfamily?.genera.find(
          (g) => g.name === newBreadcrumbs[2].name
        );
        if (family && subfamily && genus) {
          setSelectedNode({ type: "genus", data: genus });
        }
      }
    },
    [breadcrumbs]
  );

  const resetToRoot = useCallback(() => {
    setSelectedNode(null);
    setBreadcrumbs([]);
  }, []);

  const expandAll = useCallback(() => {
    const newExpanded: ExpandedState = {};
    butterflyFamilyTree.forEach((family) => {
      newExpanded[`family-${family.name}`] = true;
      family.subfamilies.forEach((subfamily) => {
        newExpanded[`subfamily-${family.name}-${subfamily.name}`] = true;
        subfamily.genera.forEach((genus) => {
          newExpanded[
            `genus-${family.name}-${subfamily.name}-${genus.name}`
          ] = true;
        });
      });
    });
    setExpanded(newExpanded);
  }, []);

  const collapseAll = useCallback(() => {
    setExpanded({});
  }, []);

  const familyStats = useMemo(() => {
    let totalSubfamilies = 0;
    let totalGenera = 0;
    let totalSpecies = 0;
    butterflyFamilyTree.forEach((family) => {
      totalSubfamilies += family.subfamilies.length;
      family.subfamilies.forEach((subfamily) => {
        totalGenera += subfamily.genera.length;
        subfamily.genera.forEach((genus) => {
          totalSpecies += genus.species.length;
        });
      });
    });
    return {
      families: butterflyFamilyTree.length,
      subfamilies: totalSubfamilies,
      genera: totalGenera,
      species: totalSpecies,
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-butterfly-pink-light/20 to-butterfly-green-light/20 py-16">
        <div
          className="absolute inset-0 opacity-30 bg-grain"
          aria-hidden
        />
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-butterfly-pink/20 blur-3xl animate-float"
          aria-hidden
        />
        <div
          className="absolute bottom-10 -left-10 w-72 h-72 rounded-full bg-butterfly-green/20 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-butterfly-green-light/50 text-sm text-butterfly-green-deep font-medium opacity-0 animate-fade-up">
              <TreeDeciduous className="w-4 h-4" strokeWidth={1.8} />
              分类学探索
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-semibold text-butterfly-ink mb-4 opacity-0 animate-fade-up">
              蝴蝶家族关系馆
            </h1>
            <p className="text-base md:text-lg text-butterfly-ink/70 leading-relaxed mb-8 max-w-2xl mx-auto opacity-0 animate-fade-up">
              探索蝶类的生命之树，从科到属到种，
              了解不同蝴蝶家族之间的亲缘关系和演化历程，
              发现每一个物种在自然界中的独特位置。
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8 opacity-0 animate-fade-up">
              <div className="text-center px-6 py-4 rounded-2xl bg-white/60 backdrop-blur">
                <p className="text-3xl font-display font-bold text-butterfly-pink-deep">
                  {familyStats.families}
                </p>
                <p className="text-sm text-butterfly-ink/60">科</p>
              </div>
              <div className="text-center px-6 py-4 rounded-2xl bg-white/60 backdrop-blur">
                <p className="text-3xl font-display font-bold text-butterfly-green-deep">
                  {familyStats.subfamilies}
                </p>
                <p className="text-sm text-butterfly-ink/60">亚科</p>
              </div>
              <div className="text-center px-6 py-4 rounded-2xl bg-white/60 backdrop-blur">
                <p className="text-3xl font-display font-bold text-butterfly-gold">
                  {familyStats.genera}
                </p>
                <p className="text-sm text-butterfly-ink/60">属</p>
              </div>
              <div className="text-center px-6 py-4 rounded-2xl bg-white/60 backdrop-blur">
                <p className="text-3xl font-display font-bold text-butterfly-ink">
                  {familyStats.species}
                </p>
                <p className="text-sm text-butterfly-ink/60">种</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 opacity-0 animate-fade-up">
              <button
                onClick={expandAll}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-butterfly-green-deep text-white text-sm font-medium hover:shadow-soft transition-all duration-300"
              >
                <ChevronDown className="w-4 h-4" />
                展开全部
              </button>
              <button
                onClick={collapseAll}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-butterfly-ink/20 text-butterfly-ink/80 text-sm font-medium hover:bg-butterfly-pink-light/30 transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
                收起全部
              </button>
              <button
                onClick={resetToRoot}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-butterfly-ink/20 text-butterfly-ink/80 text-sm font-medium hover:bg-butterfly-pink-light/30 transition-all duration-300"
              >
                <Home className="w-4 h-4" />
                返回根节点
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      {breadcrumbs.length > 0 && (
        <section className="py-4 bg-white/60 border-b border-butterfly-pink/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={resetToRoot}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-butterfly-ink/60 hover:text-butterfly-pink-deep hover:bg-butterfly-pink-light/40 transition-all"
              >
                <TreeDeciduous className="w-4 h-4" />
                全部
              </button>
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-butterfly-ink/30" />
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all",
                      index === breadcrumbs.length - 1
                        ? levelColors[crumb.level].active
                        : levelColors[crumb.level].text +
                            " " +
                            levelColors[crumb.level].bg +
                            " hover:opacity-80"
                    )}
                  >
                    {crumb.level === "family" && (
                      <Bug className="w-3.5 h-3.5" />
                    )}
                    {crumb.level === "subfamily" && (
                      <Leaf className="w-3.5 h-3.5" />
                    )}
                    {crumb.level === "genus" && (
                      <Flower2 className="w-3.5 h-3.5" />
                    )}
                    {crumb.name}
                    <span className="text-xs opacity-70 italic font-serif">
                      {crumb.latinName}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tree View */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <div className="bg-white rounded-3xl shadow-card p-6">
                  <h2 className="font-display text-xl font-semibold text-butterfly-ink mb-6 flex items-center gap-2">
                    <TreeDeciduous
                      className="w-5 h-5 text-butterfly-green-deep"
                      strokeWidth={1.8}
                    />
                    分类树
                  </h2>

                  <div className="space-y-2">
                    {butterflyFamilyTree.map((family, familyIndex) => {
                      const familyId = `family-${family.name}`;
                      const isFamilyExpanded = expanded[familyId];
                      const isFamilySelected =
                        selectedNode?.type === "family" &&
                        selectedNode.data.name === family.name;

                      return (
                        <div
                          key={familyId}
                          className="opacity-0 animate-fade-up"
                          style={{
                            animationDelay: `${familyIndex * 0.05}s`,
                          }}
                        >
                          <button
                            onClick={() => handleFamilyClick(family)}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300",
                              isFamilySelected
                                ? levelColors.family.active
                                : levelColors.family.bg +
                                    " " +
                                    levelColors.family.text +
                                    " " +
                                    levelColors.family.hover
                            )}
                          >
                            {isFamilyExpanded ? (
                              <ChevronDown className="w-4 h-4 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="w-4 h-4 flex-shrink-0" />
                            )}
                            <Bug className="w-4 h-4 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {family.name}
                              </p>
                              <p
                                className={cn(
                                  "text-xs italic font-serif truncate",
                                  isFamilySelected
                                    ? "text-white/70"
                                    : "text-butterfly-ink/50"
                                )}
                              >
                                {family.latinName}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                isFamilySelected
                                  ? "bg-white/20 text-white"
                                  : "bg-white/60 text-butterfly-ink/60"
                              )}
                            >
                              {family.subfamilies.length} 亚科
                            </span>
                          </button>

                          {isFamilyExpanded && (
                            <div className="ml-4 mt-2 space-y-2 border-l-2 border-butterfly-pink/30 pl-4">
                              {family.subfamilies.map(
                                (subfamily, subIndex) => {
                                  const subfamilyId = `subfamily-${family.name}-${subfamily.name}`;
                                  const isSubfamilyExpanded =
                                    expanded[subfamilyId];
                                  const isSubfamilySelected =
                                    selectedNode?.type === "subfamily" &&
                                    selectedNode.data.name ===
                                      subfamily.name;

                                  return (
                                    <div key={subfamilyId}>
                                      <button
                                        onClick={() =>
                                          handleSubfamilyClick(
                                            family,
                                            subfamily
                                          )
                                        }
                                        className={cn(
                                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300",
                                          isSubfamilySelected
                                            ? levelColors.subfamily.active
                                            : levelColors.subfamily.bg +
                                                " " +
                                                levelColors.subfamily.text +
                                                " " +
                                                levelColors.subfamily.hover
                                        )}
                                      >
                                        {isSubfamilyExpanded ? (
                                          <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
                                        ) : (
                                          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                                        )}
                                        <Leaf className="w-3.5 h-3.5 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-medium truncate">
                                            {subfamily.name}
                                          </p>
                                          <p
                                            className={cn(
                                              "text-[10px] italic font-serif truncate",
                                              isSubfamilySelected
                                                ? "text-white/70"
                                                : "text-butterfly-ink/50"
                                            )}
                                          >
                                            {subfamily.latinName}
                                          </p>
                                        </div>
                                        <span
                                          className={cn(
                                            "text-[10px] px-1.5 py-0.5 rounded-full",
                                            isSubfamilySelected
                                              ? "bg-white/20 text-white"
                                              : "bg-white/60 text-butterfly-ink/60"
                                          )}
                                        >
                                          {subfamily.genera.length} 属
                                        </span>
                                      </button>

                                      {isSubfamilyExpanded && (
                                        <div className="ml-3 mt-2 space-y-1.5 border-l-2 border-butterfly-green/30 pl-3">
                                          {subfamily.genera.map(
                                            (genus, genusIndex) => {
                                              const genusId = `genus-${family.name}-${subfamily.name}-${genus.name}`;
                                              const isGenusExpanded =
                                                expanded[genusId];
                                              const isGenusSelected =
                                                selectedNode?.type ===
                                                  "genus" &&
                                                selectedNode.data.name ===
                                                  genus.name;

                                              return (
                                                <div key={genusId}>
                                                  <button
                                                    onClick={() =>
                                                      handleGenusClick(
                                                        family,
                                                        subfamily,
                                                        genus
                                                      )
                                                    }
                                                    className={cn(
                                                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-300",
                                                      isGenusSelected
                                                        ? levelColors.genus.active
                                                        : levelColors.genus.bg +
                                                            " " +
                                                            levelColors.genus.text +
                                                            " " +
                                                            levelColors.genus.hover
                                                    )}
                                                  >
                                                    {isGenusExpanded ? (
                                                      <ChevronDown className="w-3 h-3 flex-shrink-0" />
                                                    ) : (
                                                      <ChevronRight className="w-3 h-3 flex-shrink-0" />
                                                    )}
                                                    <Flower2 className="w-3 h-3 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                      <p className="text-xs font-medium truncate">
                                                        {genus.name}
                                                      </p>
                                                      <p
                                                        className={cn(
                                                          "text-[9px] italic font-serif truncate",
                                                          isGenusSelected
                                                            ? "text-white/70"
                                                            : "text-butterfly-ink/50"
                                                        )}
                                                      >
                                                        {genus.latinName}
                                                      </p>
                                                    </div>
                                                    <span
                                                      className={cn(
                                                        "text-[9px] px-1.5 py-0.5 rounded-full",
                                                        isGenusSelected
                                                          ? "bg-white/20 text-white"
                                                          : "bg-white/60 text-butterfly-ink/60"
                                                      )}
                                                    >
                                                      {genus.species.length} 种
                                                    </span>
                                                  </button>

                                                  {isGenusExpanded && (
                                                    <div className="ml-3 mt-1.5 space-y-1 border-l-2 border-butterfly-gold/40 pl-3">
                                                      {genus.species.map(
                                                        (species) => (
                                                          <Link
                                                            key={species.id}
                                                            to={`/butterfly/${species.id}`}
                                                            className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/40 hover:bg-butterfly-pink-light/30 transition-all group"
                                                          >
                                                            <ButterflyIcon className="w-3 h-3 text-butterfly-pink-deep flex-shrink-0" />
                                                            <div className="flex-1 min-w-0">
                                                              <p className="text-[11px] font-medium text-butterfly-ink truncate">
                                                                {species.name}
                                                              </p>
                                                              <p className="text-[8px] italic font-serif text-butterfly-ink/50 truncate">
                                                                {species.latinName}
                                                              </p>
                                                            </div>
                                                            <ArrowRight className="w-3 h-3 text-butterfly-ink/30 group-hover:text-butterfly-pink-deep group-hover:translate-x-0.5 transition-all" />
                                                          </Link>
                                                        )
                                                      )}
                                                    </div>
                                                  )}
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-2">
              {selectedNode ? (
                <div className="bg-white rounded-3xl shadow-card overflow-hidden">
                  {/* Header */}
                  <div
                    className={cn(
                      "p-8 relative overflow-hidden",
                      selectedNode.type === "family" &&
                        "bg-gradient-to-r from-butterfly-pink-light/60 to-butterfly-pink-light/30",
                      selectedNode.type === "subfamily" &&
                        "bg-gradient-to-r from-butterfly-green-light/60 to-butterfly-green-light/30",
                      selectedNode.type === "genus" &&
                        "bg-gradient-to-r from-butterfly-gold/30 to-butterfly-gold/10"
                    )}
                  >
                    <div
                      className="absolute inset-0 opacity-20 bg-grain"
                      aria-hidden
                    />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {selectedNode.type === "family" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-butterfly-pink-deep text-white text-xs font-medium">
                                <Bug className="w-3 h-3" />
                                科
                              </span>
                            )}
                            {selectedNode.type === "subfamily" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-butterfly-green-deep text-white text-xs font-medium">
                                <Leaf className="w-3 h-3" />
                                亚科
                              </span>
                            )}
                            {selectedNode.type === "genus" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-butterfly-gold text-white text-xs font-medium">
                                <Flower2 className="w-3 h-3" />
                                属
                              </span>
                            )}
                          </div>
                          <h2 className="font-display text-3xl md:text-4xl font-semibold text-butterfly-ink mb-2">
                            {selectedNode.data.name}
                          </h2>
                          <p className="text-lg italic font-serif text-butterfly-ink/60">
                            {selectedNode.data.latinName}
                          </p>
                        </div>
                        <ButterflyIcon
                          className={cn(
                            "w-16 h-16 opacity-30",
                            selectedNode.type === "family" &&
                              "text-butterfly-pink-deep",
                            selectedNode.type === "subfamily" &&
                              "text-butterfly-green-deep",
                            selectedNode.type === "genus" &&
                              "text-butterfly-gold"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Description */}
                    <div className="mb-8">
                      <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-3 flex items-center gap-2">
                        <Info
                          className="w-4 h-4 text-butterfly-pink-deep"
                          strokeWidth={1.8}
                        />
                        简介
                      </h3>
                      <p className="text-butterfly-ink/70 leading-relaxed">
                        {selectedNode.data.description}
                      </p>
                    </div>

                    {/* Characteristics (for family) */}
                    {"characteristics" in selectedNode.data && (
                      <div className="mb-8">
                        <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-4 flex items-center gap-2">
                          <Sparkles
                            className="w-4 h-4 text-butterfly-gold"
                            strokeWidth={1.8}
                          />
                          主要特征
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedNode.data.characteristics.map(
                            (char: string, i: number) => (
                              <div
                                key={i}
                                className="flex items-start gap-3 p-4 rounded-2xl bg-butterfly-pink-light/30"
                              >
                                <ButterflyIcon className="w-4 h-4 text-butterfly-pink-deep mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-butterfly-ink/80">
                                  {char}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Species List (for genus) */}
                    {"species" in selectedNode.data && (
                      <div>
                        <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-4 flex items-center gap-2">
                          <Sparkles
                            className="w-4 h-4 text-butterfly-gold"
                            strokeWidth={1.8}
                          />
                          代表物种
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedNode.data.species.map(
                            (species: TaxonSpecies, i: number) => (
                              <Link
                                key={species.id}
                                to={`/butterfly/${species.id}`}
                                className="group block rounded-2xl overflow-hidden bg-cream-50 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                                style={{ animationDelay: `${i * 0.05}s` }}
                              >
                                <div className="aspect-video relative overflow-hidden">
                                  <img
                                    src={species.image}
                                    alt={species.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                  <div className="absolute top-3 right-3">
                                    <span
                                      className={cn(
                                        "text-[10px] px-2 py-0.5 rounded-full font-medium",
                                        getRarityColor(species.rarity)
                                      )}
                                    >
                                      {species.rarity}
                                    </span>
                                  </div>
                                </div>
                                <div className="p-4">
                                  <h4 className="font-display text-lg font-semibold text-butterfly-ink mb-1">
                                    {species.name}
                                  </h4>
                                  <p className="text-xs italic font-serif text-butterfly-ink/50 mb-2">
                                    {species.latinName}
                                  </p>
                                  <p className="text-xs text-butterfly-ink/60 line-clamp-2">
                                    {species.description}
                                  </p>
                                  <div className="mt-3 text-xs text-butterfly-pink-deep font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                    查看详情
                                    <ArrowRight className="w-3 h-3" />
                                  </div>
                                </div>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Subtaxa count (for family and subfamily) */}
                    {"subfamilies" in selectedNode.data && (
                      <div>
                        <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-4 flex items-center gap-2">
                          <Leaf
                            className="w-4 h-4 text-butterfly-green-deep"
                            strokeWidth={1.8}
                          />
                          包含亚科
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedNode.data.subfamilies.map(
                            (sub: TaxonSubfamily, i: number) => (
                              <div
                                key={sub.name}
                                className="p-5 rounded-2xl bg-butterfly-green-light/30 hover:bg-butterfly-green-light/50 transition-all cursor-pointer"
                                onClick={() => {
                                  const family = butterflyFamilyTree.find(
                                    (f) =>
                                      f.name === breadcrumbs[0]?.name
                                  );
                                  if (family) {
                                    handleSubfamilyClick(family, sub);
                                  }
                                }}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-display text-lg font-semibold text-butterfly-ink">
                                    {sub.name}
                                  </h4>
                                  <ChevronRight className="w-5 h-5 text-butterfly-green-deep" />
                                </div>
                                <p className="text-xs italic font-serif text-butterfly-ink/50 mb-2">
                                  {sub.latinName}
                                </p>
                                <p className="text-xs text-butterfly-ink/60 line-clamp-2">
                                  {sub.description}
                                </p>
                                <div className="mt-3 text-xs text-butterfly-green-deep font-medium">
                                  {sub.genera.length} 属 ·{" "}
                                  {sub.genera.reduce(
                                    (sum, g) => sum + g.species.length,
                                    0
                                  )}{" "}
                                  种
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {"genera" in selectedNode.data && (
                      <div>
                        <h3 className="font-display text-lg font-semibold text-butterfly-ink mb-4 flex items-center gap-2">
                          <Flower2
                            className="w-4 h-4 text-butterfly-gold"
                            strokeWidth={1.8}
                          />
                          包含属
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedNode.data.genera.map(
                            (genus: TaxonGenus, i: number) => (
                              <div
                                key={genus.name}
                                className="p-5 rounded-2xl bg-butterfly-gold/20 hover:bg-butterfly-gold/30 transition-all cursor-pointer"
                                onClick={() => {
                                  const family = butterflyFamilyTree.find(
                                    (f) =>
                                      f.name === breadcrumbs[0]?.name
                                  );
                                  const subfamily = family?.subfamilies.find(
                                    (s) =>
                                      s.name === breadcrumbs[1]?.name
                                  );
                                  if (family && subfamily) {
                                    handleGenusClick(
                                      family,
                                      subfamily,
                                      genus
                                    );
                                  }
                                }}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-display text-lg font-semibold text-butterfly-ink">
                                    {genus.name}
                                  </h4>
                                  <ChevronRight className="w-5 h-5 text-butterfly-gold" />
                                </div>
                                <p className="text-xs italic font-serif text-butterfly-ink/50 mb-2">
                                  {genus.latinName}
                                </p>
                                <p className="text-xs text-butterfly-ink/60 line-clamp-2">
                                  {genus.description}
                                </p>
                                <div className="mt-3 text-xs text-butterfly-gold font-medium">
                                  {genus.species.length} 种
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-card p-8 md:p-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-butterfly-pink-light/40 flex items-center justify-center">
                    <TreeDeciduous
                      className="w-12 h-12 text-butterfly-pink-deep"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-butterfly-ink mb-3">
                    选择一个分类节点开始探索
                  </h2>
                  <p className="text-butterfly-ink/60 leading-relaxed max-w-xl mx-auto mb-8">
                    点击左侧分类树中的任意节点，查看该分类单元的详细信息，
                    包括特征描述、包含的下级类群以及代表物种。
                    您可以逐级展开，从科一直浏览到具体的蝴蝶种类。
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="p-5 rounded-2xl bg-butterfly-pink-light/30 text-left">
                      <Bug className="w-6 h-6 text-butterfly-pink-deep mb-3" />
                      <h3 className="font-display font-semibold text-butterfly-ink mb-1">
                        科
                      </h3>
                      <p className="text-xs text-butterfly-ink/60">
                        最高分类等级，包含具有共同祖先的蝴蝶类群
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-butterfly-green-light/30 text-left">
                      <Leaf className="w-6 h-6 text-butterfly-green-deep mb-3" />
                      <h3 className="font-display font-semibold text-butterfly-ink mb-1">
                        亚科
                      </h3>
                      <p className="text-xs text-butterfly-ink/60">
                        科的进一步划分，具有更相近的形态特征
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-butterfly-gold/20 text-left">
                      <Flower2 className="w-6 h-6 text-butterfly-gold mb-3" />
                      <h3 className="font-display font-semibold text-butterfly-ink mb-1">
                        属 · 种
                      </h3>
                      <p className="text-xs text-butterfly-ink/60">
                        最基本的分类单元，包含具体的蝴蝶物种
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
