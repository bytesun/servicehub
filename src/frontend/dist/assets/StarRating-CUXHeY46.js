import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-BJQw-dZb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const SIZE_MAP = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-6 h-6" };
function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
  className = ""
}) {
  const stars = [1, 2, 3, 4, 5];
  const sizeClass = SIZE_MAP[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `flex items-center gap-0.5 ${className}`,
      role: readonly ? "img" : "radiogroup",
      "aria-label": `Rating: ${value} out of 5 stars`,
      children: stars.map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          role: readonly ? void 0 : "radio",
          "aria-checked": readonly ? void 0 : value === star,
          "aria-label": readonly ? void 0 : `${star} star${star !== 1 ? "s" : ""}`,
          onClick: readonly ? void 0 : () => onChange == null ? void 0 : onChange(star),
          disabled: readonly,
          className: `transition-colors ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110 transition-transform"} disabled:pointer-events-none`,
          "data-ocid": readonly ? void 0 : `star-${star}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              className: `${sizeClass} ${star <= Math.round(value) ? "fill-primary text-primary" : "fill-none text-muted-foreground/40"}`
            }
          )
        },
        star
      ))
    }
  );
}
export {
  Star as S,
  StarRating as a
};
