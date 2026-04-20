import { c as createLucideIcon, u as useNavigate, a as useAuth, d as useSearch, r as reactExports, b as useListServices, j as jsxRuntimeExports, X, L as Link, B as Button } from "./index-BJQw-dZb.js";
import { I as Input } from "./input-CTsVHrW8.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BhFflofZ.js";
import { S as Skeleton } from "./skeleton-l7FOGfhk.js";
import { E as EmptyState } from "./EmptyState-ilxOlh8N.js";
import { S as ServiceCard } from "./ServiceCard-DoPxfTEI.js";
import { S as SERVICE_CATEGORIES } from "./types-CFG00yAA.js";
import "./index-B1k2S2C4.js";
import "./Combination-B1w9Esvu.js";
import "./index-RUaXRNIr.js";
import "./card-DJwG1xfA.js";
import "./CategoryBadge-32UOtp1V.js";
import "./StarRating-CUXHeY46.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const ALL_FILTERS = [
  { value: "all", label: "All", icon: "✨" },
  ...SERVICE_CATEGORIES
];
function ServiceGridSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
      "aria-busy": "true",
      "data-ocid": "services.loading_state",
      children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-card overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-muted" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-6 rounded" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28 rounded-md" })
              ] })
            ] })
          ]
        },
        `skeleton-${sk}`
      ))
    }
  );
}
function sortServices(list, sort) {
  const copy = [...list];
  if (sort === "price_asc") {
    return copy.sort((a, b) => {
      const ap = a.priceType === "onSiteEstimate" ? Number.MAX_SAFE_INTEGER : Number(a.basePrice);
      const bp = b.priceType === "onSiteEstimate" ? Number.MAX_SAFE_INTEGER : Number(b.basePrice);
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
  return copy.sort((a, b) => a.id > b.id ? -1 : a.id < b.id ? 1 : 0);
}
function Services() {
  var _a;
  const navigate = useNavigate();
  const { isAuthenticated, actorReady } = useAuth();
  const urlSearch = useSearch({ strict: false });
  const initialCategory = urlSearch.category && SERVICE_CATEGORIES.some((c) => c.value === urlSearch.category) ? urlSearch.category : null;
  const [activeCategory, setActiveCategory] = reactExports.useState(
    initialCategory
  );
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("newest");
  const { data: services = [], isLoading } = useListServices(activeCategory);
  const filtered = reactExports.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const base = q ? services.filter(
      (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    ) : services;
    return sortServices(base, sort);
  }, [services, searchQuery, sort]);
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    navigate({
      to: "/services",
      search: cat ? { category: cat } : {}
    });
  };
  const handleRequestQuote = (serviceId) => {
    if (!isAuthenticated) {
      navigate({ to: "/auth/register" });
      return;
    }
    navigate({ to: "/services/$id", params: { id: String(serviceId) } });
  };
  const showLoading = isLoading || !actorReady;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "services.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "Browse Services" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Discover skilled professionals ready to help with your next project." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 mb-4",
          style: { scrollbarWidth: "none" },
          "aria-label": "Filter by category",
          "data-ocid": "services.category-filters",
          children: ALL_FILTERS.map((cat) => {
            const isActive = cat.value === "all" ? activeCategory === null : activeCategory === cat.value;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleCategoryChange(
                  cat.value === "all" ? null : cat.value
                ),
                "aria-pressed": isActive,
                "data-ocid": `services.filter.${cat.value}.tab`,
                className: `shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth ${isActive ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: cat.icon }),
                  cat.label
                ]
              },
              cat.value
            );
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:items-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "search",
              placeholder: "Search services…",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "pl-9 pr-9 bg-card border-border",
              "data-ocid": "services.search_input"
            }
          ),
          searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearchQuery(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Clear search",
              "data-ocid": "services.search-clear.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort, onValueChange: (v) => setSort(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "w-full sm:w-44",
              "data-ocid": "services.sort.select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort by" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", children: "Newest first" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price_asc", children: "Price: Low to High" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price_desc", children: "Price: High to Low" })
          ] })
        ] })
      ] }),
      showLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceGridSkeleton, {}),
      !showLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-4", children: [
          filtered.length,
          " service",
          filtered.length !== 1 ? "s" : "",
          " found"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
            "data-ocid": "services.list",
            children: filtered.map((service, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": `services.item.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ServiceCard,
                  {
                    service,
                    onRequestQuote: () => handleRequestQuote(service.id)
                  }
                )
              },
              String(service.id)
            ))
          }
        )
      ] }),
      !showLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "services.empty_state", children: searchQuery ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: "🔍",
          title: "No services match your search",
          description: `We couldn't find services matching "${searchQuery}". Try a different keyword or clear the search.`,
          actionLabel: "Clear search",
          onAction: () => setSearchQuery("")
        }
      ) : activeCategory !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: ((_a = SERVICE_CATEGORIES.find((c) => c.value === activeCategory)) == null ? void 0 : _a.icon) ?? "📦",
          title: "No services in this category yet",
          description: "Be the first to offer services here, or browse all categories.",
          actionLabel: "Browse all",
          onAction: () => handleCategoryChange(null)
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: "🛠️",
          title: "No services available yet",
          description: "Check back soon, or become a provider and post the first service.",
          actionLabel: "Become a Provider",
          actionHref: "/auth/register"
        }
      ) }),
      !showLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 rounded-2xl bg-primary/5 border border-primary/15 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-1", children: "Are you a skilled professional?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Post your services, respond to quote requests, and grow your client base — no approval required." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/register", "data-ocid": "services.provider-cta.button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "button-primary shrink-0", children: "Get started free" }) })
      ] })
    ] })
  ] });
}
export {
  Services as default
};
