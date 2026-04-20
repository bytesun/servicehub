import { c as createLucideIcon, r as reactExports, Y as useCreateRating, j as jsxRuntimeExports, B as Button, Z as LoaderCircle } from "./index-BJQw-dZb.js";
import { C as Card } from "./card-DJwG1xfA.js";
import { L as Label, T as Textarea } from "./textarea-yVhHD2GQ.js";
import { S as Star, a as StarRating } from "./StarRating-CUXHeY46.js";
import { C as CircleCheckBig } from "./circle-check-big-BDcmROHD.js";
import { C as CircleAlert } from "./circle-alert-BiMYm_2y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
const STAR_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
function RatingForm({
  bookingId,
  onSuccess,
  className = ""
}) {
  const [stars, setStars] = reactExports.useState(0);
  const [comment, setComment] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const createRating = useCreateRating();
  const alreadyRated = createRating.isError && createRating.error instanceof Error && createRating.error.message.toLowerCase().includes("already");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stars === 0) return;
    try {
      await createRating.mutateAsync({
        bookingId,
        stars: BigInt(stars),
        comment: comment.trim() || void 0
      });
      setSubmitted(true);
      onSuccess == null ? void 0 : onSuccess();
    } catch {
    }
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: `p-6 border border-border text-center space-y-3 ${className}`,
        "data-ocid": "rating-success",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-6 h-6 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Thank you for your review!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your feedback helps providers improve and helps clients choose the right professional." })
        ]
      }
    );
  }
  if (alreadyRated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: `p-6 border border-border text-center space-y-2 ${className}`,
        "data-ocid": "rating-already-exists",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-muted-foreground mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You've already submitted a review for this booking." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-6 border border-border ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Rate this service" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Your rating" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3",
            "data-ocid": "star-rating-input",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: stars, onChange: setStars, size: "lg" }),
              stars > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-primary", children: STAR_LABELS[stars] })
            ]
          }
        ),
        stars === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click a star to rate" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rating-comment", className: "text-sm font-medium", children: [
          "Comment",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "rating-comment",
            placeholder: "Share your experience with this provider…",
            value: comment,
            onChange: (e) => setComment(e.target.value),
            rows: 3,
            maxLength: 500,
            className: "resize-none text-sm",
            "data-ocid": "input-rating-comment"
          }
        ),
        comment.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
          comment.length,
          "/500"
        ] })
      ] }),
      createRating.isError && !alreadyRated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: createRating.error instanceof Error ? createRating.error.message : "Failed to submit rating. Please try again." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: stars === 0 || createRating.isPending,
          className: "w-full",
          "data-ocid": "btn-submit-rating",
          children: createRating.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
            "Submitting…"
          ] }) : "Submit review"
        }
      )
    ] })
  ] });
}
export {
  CircleX as C,
  RatingForm as R,
  CreditCard as a
};
