import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Menu, X, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ButterflyIcon from "@/components/ButterflyIcon";

export default function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/butterflies?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setMobileOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/40">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <ButterflyIcon
            className="w-7 h-7 text-butterfly-pink-deep group-hover:animate-flutter transition-transform duration-500"
            strokeWidth={1.5}
          />
          <span className="font-display text-2xl font-semibold tracking-wide text-butterfly-ink">
            蝶<span className="text-butterfly-pink-deep italic">语</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-butterfly-ink/80 hover:text-butterfly-pink-deep transition-colors"
          >
            首页
          </Link>
          <Link
            to="/map"
            className="text-sm font-medium text-butterfly-ink/80 hover:text-butterfly-pink-deep transition-colors inline-flex items-center gap-1.5"
          >
            <Globe2 className="w-4 h-4" strokeWidth={1.8} />
            世界地图
          </Link>
          <Link
            to="/butterflies"
            className="text-sm font-medium text-butterfly-ink/80 hover:text-butterfly-pink-deep transition-colors"
          >
            蝴蝶图鉴
          </Link>
          <form onSubmit={handleSearch} className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-butterfly-ink/40"
              strokeWidth={2}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索蝴蝶..."
              className={cn(
                "w-56 pl-10 pr-4 py-2 rounded-full",
                "bg-white/70 border border-butterfly-pink/30",
                "text-sm text-butterfly-ink placeholder:text-butterfly-ink/40",
                "focus:outline-none focus:ring-2 focus:ring-butterfly-pink/50",
                "focus:w-72 transition-all duration-300"
              )}
            />
          </form>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-full hover:bg-butterfly-pink-light/40 transition-colors"
          aria-label="menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-butterfly-ink" />
          ) : (
            <Menu className="w-5 h-5 text-butterfly-ink" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/40 bg-cream-50/95 backdrop-blur animate-fade-in">
          <div className="container mx-auto py-4 flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="text-butterfly-ink/80 hover:text-butterfly-pink-deep py-2"
            >
              首页
            </Link>
            <Link
              to="/map"
              onClick={() => setMobileOpen(false)}
              className="text-butterfly-ink/80 hover:text-butterfly-pink-deep py-2 inline-flex items-center gap-2"
            >
              <Globe2 className="w-4 h-4" strokeWidth={1.8} />
              世界地图
            </Link>
            <Link
              to="/butterflies"
              onClick={() => setMobileOpen(false)}
              className="text-butterfly-ink/80 hover:text-butterfly-pink-deep py-2"
            >
              蝴蝶图鉴
            </Link>
            <form onSubmit={handleSearch} className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-butterfly-ink/40"
                strokeWidth={2}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索蝴蝶..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/70 border border-butterfly-pink/30 text-sm focus:outline-none focus:ring-2 focus:ring-butterfly-pink/50"
              />
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
