import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import ServiceCard from "../components/ServiceCard";
import { useAuth } from "../hooks/useAuth";
import { useListServices } from "../hooks/useBackend";
import {
  SERVICE_CATEGORIES,
  type ServiceCategory,
  type ServiceView,
} from "../types";

// ── Types ──────────────────────────────────────────────────────────────────────
type SortKey = "newest" | "price_asc" | "price_desc";

const ALL_FILTERS = [
  { value: "all", label: "All", icon: "✨" },
  ...SERVICE_CATEGORIES,
];

// ── Skeleton ───────────────────────────────────────────────────────────────────
function ServiceGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      aria-busy="true"
      data-ocid="services.loading_state"
    >
      {["a", "b", "c", "d", "e", "f", "g", "h"].map((sk) => (
        <div
          key={`skeleton-${sk}`}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <div className="h-1 w-full bg-muted" />
          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-6 w-6 rounded" />
            </div>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center justify-between pt-1 border-t border-border/60">
              <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-8 w-28 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Sort helpers ───────────────────────────────────────────────────────────────
function sortServices(list: ServiceView[], sort: SortKey): ServiceView[] {
  const copy = [...list];
  if (sort === "price_asc") {
    return copy.sort((a, b) => {
      const ap =
        a.priceType === "onSiteEstimate"
          ? Number.MAX_SAFE_INTEGER
          : Number(a.basePrice);
      const bp =
        b.priceType === "onSiteEstimate"
          ? Number.MAX_SAFE_INTEGER
          : Number(b.basePrice);
      return ap - bp;
    });
  }
  if (sort === "price_desc") {
    return copy.sort((a, b) => {
      const ap = a.priceType === "onSiteEstimate" ? -1 : Number(a.basePrice);
      const bp = b.priceType === "onSiteEstimate" ? -1 : Number(b.basePrice);
      return bp - ap;
    });
  }
  // newest — higher id = more recent
  return copy.sort((a, b) => (a.id > b.id ? -1 : a.id < b.id ? 1 : 0));
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Services() {
  const navigate = useNavigate();
  const { isAuthenticated, actorReady } = useAuth();

  // Read optional ?category= param from the URL
  const urlSearch = useSearch({ strict: false }) as { category?: string };
  const initialCategory =
    urlSearch.category &&
    SERVICE_CATEGORIES.some((c) => c.value === urlSearch.category)
      ? (urlSearch.category as ServiceCategory)
      : null;

  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(
    initialCategory,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const { data: services = [], isLoading } = useListServices(activeCategory);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const base = q
      ? services.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q),
        )
      : services;
    return sortServices(base, sort);
  }, [services, searchQuery, sort]);

  const handleCategoryChange = (cat: ServiceCategory | null) => {
    setActiveCategory(cat);
    // Sync URL
    navigate({
      to: "/services",
      search: cat ? { category: cat } : {},
    });
  };

  const handleRequestQuote = (serviceId: bigint) => {
    if (!isAuthenticated) {
      navigate({ to: "/auth/register" });
      return;
    }
    navigate({ to: "/services/$id", params: { id: String(serviceId) } });
  };

  const showLoading = isLoading || !actorReady;

  return (
    <div className="min-h-screen bg-background" data-ocid="services.page">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display font-bold text-3xl text-foreground">
            Browse Services
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Discover skilled professionals ready to help with your next project.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Category Filter Pills ────────────────────────────────────────── */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 mb-4"
          style={{ scrollbarWidth: "none" }}
          aria-label="Filter by category"
          data-ocid="services.category-filters"
        >
          {ALL_FILTERS.map((cat) => {
            const isActive =
              cat.value === "all"
                ? activeCategory === null
                : activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() =>
                  handleCategoryChange(
                    cat.value === "all" ? null : (cat.value as ServiceCategory),
                  )
                }
                aria-pressed={isActive}
                data-ocid={`services.filter.${cat.value}.tab`}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Search + Sort ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search services…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 bg-card border-border"
              data-ocid="services.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
                data-ocid="services.search-clear.button"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger
              className="w-full sm:w-44"
              data-ocid="services.sort.select"
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ── Loading ─────────────────────────────────────────────────────── */}
        {showLoading && <ServiceGridSkeleton />}

        {/* ── Results ─────────────────────────────────────────────────────── */}
        {!showLoading && filtered.length > 0 && (
          <>
            <p className="text-xs text-muted-foreground mb-4">
              {filtered.length} service{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              data-ocid="services.list"
            >
              {filtered.map((service, idx) => (
                <div
                  key={String(service.id)}
                  data-ocid={`services.item.${idx + 1}`}
                >
                  <ServiceCard
                    service={service}
                    onRequestQuote={() => handleRequestQuote(service.id)}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Empty ───────────────────────────────────────────────────────── */}
        {!showLoading && filtered.length === 0 && (
          <div data-ocid="services.empty_state">
            {searchQuery ? (
              <EmptyState
                icon="🔍"
                title="No services match your search"
                description={`We couldn't find services matching "${searchQuery}". Try a different keyword or clear the search.`}
                actionLabel="Clear search"
                onAction={() => setSearchQuery("")}
              />
            ) : activeCategory !== null ? (
              <EmptyState
                icon={
                  SERVICE_CATEGORIES.find((c) => c.value === activeCategory)
                    ?.icon ?? "📦"
                }
                title="No services in this category yet"
                description="Be the first to offer services here, or browse all categories."
                actionLabel="Browse all"
                onAction={() => handleCategoryChange(null)}
              />
            ) : (
              <EmptyState
                icon="🛠️"
                title="No services available yet"
                description="Check back soon, or become a provider and post the first service."
                actionLabel="Become a Provider"
                actionHref="/auth/register"
              />
            )}
          </div>
        )}

        {/* ── Provider CTA ─────────────────────────────────────────────────── */}
        {!showLoading && (
          <div className="mt-16 rounded-2xl bg-primary/5 border border-primary/15 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-1">
              <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                Are you a skilled professional?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Post your services, respond to quote requests, and grow your
                client base — no approval required.
              </p>
            </div>
            <Link to="/auth/register" data-ocid="services.provider-cta.button">
              <Button className="button-primary shrink-0">
                Get started free
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
