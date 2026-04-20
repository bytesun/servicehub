import { j as jsxRuntimeExports, L as Link, U as UserAvatar, B as Button } from "./index-BJQw-dZb.js";
import { C as Card, a as CardContent } from "./card-DJwG1xfA.js";
import { g as getCategoryInfo, f as formatCurrency } from "./types-CFG00yAA.js";
import { C as CategoryBadge } from "./CategoryBadge-32UOtp1V.js";
import { a as StarRating } from "./StarRating-CUXHeY46.js";
function ServiceCard({
  service,
  averageRating = 0,
  ratingCount = 0,
  providerName,
  onRequestQuote
}) {
  const { icon } = getCategoryInfo(service.category);
  const isEstimate = service.priceType === "onSiteEstimate";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "group overflow-hidden flex flex-col border border-border bg-card hover:shadow-md transition-smooth cursor-pointer rounded-xl",
      "data-ocid": `service.card.${service.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0 flex flex-col flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-primary/70 rounded-t-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: service.category, size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", "aria-hidden": "true", children: icon })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/services/$id",
                params: { id: String(service.id) },
                className: "font-display font-semibold text-base text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug block",
                "data-ocid": `service.title.${service.id}`,
                children: service.title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 leading-relaxed", children: service.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { name: providerName ?? "Provider", size: "xs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: providerName ?? "Provider" })
            ] }),
            ratingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: averageRating, readonly: true, size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "(",
                ratingCount,
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 pt-1 border-t border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: isEstimate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pricing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-medium text-foreground text-sm", children: "Contact for estimate" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Starting at" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-base font-mono-amount", children: formatCurrency(service.basePrice) })
            ] }) }),
            onRequestQuote && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "button-primary shrink-0",
                onClick: onRequestQuote,
                "data-ocid": `service.quote-btn.${service.id}`,
                children: "Request Quote"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
export {
  ServiceCard as S
};
