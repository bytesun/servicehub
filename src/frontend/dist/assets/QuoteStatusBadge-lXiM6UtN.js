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
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "bg-muted/40 text-muted-foreground border border-border"
  },
  replied: {
    label: "Offer Received",
    className: "bg-primary/10 text-primary border border-primary/30"
  },
  accepted: {
    label: "Accepted",
    className: "bg-accent/15 text-accent border border-accent/30"
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border border-destructive/20"
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-muted/20 text-muted-foreground border border-border line-through"
  }
};
function QuoteStatusBadge({
  status,
  className = ""
}) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-muted/20 text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.className} ${className}`,
      "data-ocid": `quote-status-${status}`,
      children: config.label
    }
  );
}
export {
  MapPin as M,
  QuoteStatusBadge as Q
};
