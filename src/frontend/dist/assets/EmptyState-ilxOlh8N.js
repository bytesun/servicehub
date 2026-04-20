import { j as jsxRuntimeExports, B as Button } from "./index-BJQw-dZb.js";
function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col items-center justify-center text-center py-16 px-8 ${className}`,
      "data-ocid": "empty-state",
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 text-3xl", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-2", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm leading-relaxed mb-6", children: description }),
        actionLabel && onAction && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: onAction,
            className: "button-primary",
            "data-ocid": "empty-state-cta",
            children: actionLabel
          }
        ),
        actionLabel && actionHref && !onAction && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: actionHref,
            className: "button-primary inline-flex items-center",
            "data-ocid": "empty-state-cta",
            children: actionLabel
          }
        )
      ]
    }
  );
}
export {
  EmptyState as E
};
