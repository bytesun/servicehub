import { j as jsxRuntimeExports } from "./index-BJQw-dZb.js";
import { g as getCategoryInfo } from "./types-CFG00yAA.js";
function CategoryBadge({
  category,
  size = "md",
  className = ""
}) {
  const { label, icon } = getCategoryInfo(category);
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 rounded-full bg-secondary/60 text-secondary-foreground font-medium border border-border/50 ${sizeClass} ${className}`,
      "data-ocid": `category-badge-${category}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: icon }),
        label
      ]
    }
  );
}
export {
  CategoryBadge as C
};
