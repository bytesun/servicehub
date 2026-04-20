import { c as createLucideIcon, j as jsxRuntimeExports, g as useParams, u as useNavigate, a as useAuth, Q as useQuote, h as useService, o as useUserProfile, J as useAcceptQuote, K as useRejectQuote, M as useCancelQuote, z as useReplyQuote, N as useCreateBooking, r as reactExports, B as Button, T as QuoteStatus, U as UserAvatar, L as Link, n as Separator, F as FileText, R as ReplyType, X } from "./index-BJQw-dZb.js";
import { B as Badge } from "./badge-DWGdRvla.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DJwG1xfA.js";
import { I as Input } from "./input-CTsVHrW8.js";
import { L as Label, T as Textarea } from "./textarea-yVhHD2GQ.js";
import { S as Skeleton } from "./skeleton-l7FOGfhk.js";
import { u as ue } from "./index-CLm5tAfo.js";
import { A as AuthGuard } from "./AuthGuard-ODJ9Wg5N.js";
import { Q as QuoteStatusBadge, M as MapPin } from "./QuoteStatusBadge-lXiM6UtN.js";
import { a as formatTimestamp, f as formatCurrency } from "./types-CFG00yAA.js";
import { C as CircleAlert } from "./circle-alert-BiMYm_2y.js";
import { A as ArrowLeft } from "./arrow-left-Byg1VtFE.js";
import { L as Lock } from "./lock-UAlJn9eS.js";
import { C as Calendar } from "./calendar-OhfRUxPl.js";
import { D as DollarSign } from "./dollar-sign-DpHGY5oy.js";
import { M as MessageSquare } from "./message-square-DtTxccu1.js";
import { C as Clock } from "./clock-BUsQig5K.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9", key: "eefl8a" }],
  ["path", { d: "m18 15 4-4", key: "16gjal" }],
  [
    "path",
    {
      d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",
      key: "b7pghm"
    }
  ]
];
const Hammer = createLucideIcon("hammer", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
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
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode);
function AttachmentGallery({ attachments }) {
  const [lightbox, setLightbox] = reactExports.useState(null);
  if (attachments.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "quote-detail.attachments.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
        "Reference Photos (",
        attachments.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: attachments.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setLightbox(url),
          className: "relative w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted/40 hover:border-primary/50 hover:opacity-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "aria-label": `View attachment ${i + 1}`,
          "data-ocid": `quote-detail.attachment.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: url,
              alt: `Attachment ${i + 1}`,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.currentTarget.style.display = "none";
              }
            }
          )
        },
        url
      )) })
    ] }),
    lightbox && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "dialog",
      {
        open: true,
        className: "fixed inset-0 z-50 m-0 max-w-none w-full h-full flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4 border-0",
        onClick: () => setLightbox(null),
        onKeyDown: (e) => e.key === "Escape" && setLightbox(null),
        "aria-label": "Photo preview",
        "data-ocid": "quote-detail.attachment.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setLightbox(null),
              className: "absolute top-4 right-4 w-9 h-9 rounded-full bg-card/90 hover:bg-card flex items-center justify-center transition-colors shadow-md",
              "aria-label": "Close preview",
              "data-ocid": "quote-detail.attachment.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: lightbox,
              alt: "Full size attachment",
              className: "max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl",
              onClick: (e) => e.stopPropagation(),
              onKeyDown: (e) => e.stopPropagation()
            }
          )
        ]
      }
    )
  ] });
}
function ReplyTypeBadge({ type }) {
  if (type === ReplyType.detailedEstimate) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
      " Detailed Estimate"
    ] });
  }
  if (type === ReplyType.onSiteEstimate) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
      " On-site Estimate"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
    " Message"
  ] });
}
function BreakdownDisplay({ bd }) {
  const labor = Number(bd.labor) / 100;
  const materials = Number(bd.materials) / 100;
  Number(bd.hourlyRate) / 100;
  const hours = Number(bd.hours);
  const total = labor + materials;
  const rows = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-muted-foreground" }),
      label: "Hourly Rate",
      value: formatCurrency(bd.hourlyRate)
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-muted-foreground" }),
      label: "Hours",
      value: `${hours} hr${hours !== 1 ? "s" : ""}`
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "w-3.5 h-3.5 text-muted-foreground" }),
      label: "Labor",
      value: formatCurrency(bd.labor)
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5 text-muted-foreground" }),
      label: "Materials",
      value: formatCurrency(bd.materials)
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mt-3 pt-3 border-t border-primary/15 space-y-2",
      "data-ocid": "quote-detail.breakdown_display",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Price Breakdown" }),
        rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            r.icon,
            r.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: r.value })
        ] }, r.label)),
        total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 pt-2 border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(total) })
        ] }),
        bd.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5 text-xs text-muted-foreground pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic leading-relaxed", children: bd.notes })
        ] })
      ]
    }
  );
}
function DollarInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, className: "text-xs", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "$" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id,
          type: "number",
          min: "0",
          step: "0.01",
          placeholder: placeholder ?? "0.00",
          value,
          onChange: (e) => onChange(e.target.value),
          className: "pl-7",
          "data-ocid": ocid
        }
      )
    ] })
  ] });
}
const DEFAULT_REPLY = {
  mode: "message",
  message: "",
  price: "",
  timeline: "",
  hourlyRate: "",
  hours: "",
  materials: "",
  labor: "",
  notes: ""
};
function computeSuggestedTotal(state) {
  const labor = Number.parseFloat(state.labor) || 0;
  const materials = Number.parseFloat(state.materials) || 0;
  return labor + materials;
}
function QuoteDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 py-10 space-y-6",
      "data-ocid": "quote-detail.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" })
      ]
    }
  );
}
function ModeTab({
  active,
  onClick,
  children,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      className: `flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`,
      "data-ocid": ocid,
      children
    }
  );
}
function QuoteDetailContent() {
  var _a;
  const { id } = useParams({ from: "/quotes/$id" });
  const navigate = useNavigate();
  const quoteId = BigInt(id);
  const { user, isClient, actorReady, isFetched: authFetched } = useAuth();
  const {
    data: quote,
    isLoading: quoteLoading,
    isError: quoteError,
    isFetched: quoteFetched
  } = useQuote(quoteId);
  const { data: service, isLoading: serviceLoading } = useService(
    (quote == null ? void 0 : quote.serviceId) ?? null
  );
  const { data: clientProfile } = useUserProfile((quote == null ? void 0 : quote.clientId) ?? null);
  const { data: providerProfile } = useUserProfile((quote == null ? void 0 : quote.providerId) ?? null);
  const acceptQuote = useAcceptQuote();
  const rejectQuote = useRejectQuote();
  const cancelQuote = useCancelQuote();
  const replyQuote = useReplyQuote();
  const createBooking = useCreateBooking();
  const [showReply, setShowReply] = reactExports.useState(false);
  const [replyForm, setReplyForm] = reactExports.useState(DEFAULT_REPLY);
  function setField(field, value) {
    setReplyForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "labor" || field === "materials") {
        const suggested = computeSuggestedTotal(next);
        if (suggested > 0)
          return { ...next, price: String(suggested) };
      }
      return next;
    });
  }
  const isLoading = !actorReady || !authFetched || quoteLoading || serviceLoading || !quoteFetched;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteDetailSkeleton, {});
  }
  if (quoteError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-20 text-center space-y-4",
        "data-ocid": "quote-detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Something went wrong" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We couldn't load this quote. Please try again." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: isClient ? "/client-dashboard" : "/dashboard" }),
              "data-ocid": "quote-detail.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1.5" }),
                " Back to Dashboard"
              ]
            }
          )
        ]
      }
    );
  }
  if (!quote) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-20 text-center space-y-4",
        "data-ocid": "quote-detail.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Quote not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This quote doesn't exist or may have been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: isClient ? "/client-dashboard" : "/dashboard" }),
              className: "mt-2",
              "data-ocid": "quote-detail.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1.5" }),
                " Back to Dashboard"
              ]
            }
          )
        ]
      }
    );
  }
  const myId = (_a = user == null ? void 0 : user.id) == null ? void 0 : _a.toString();
  const isQuoteClient = myId === quote.clientId.toString();
  const isQuoteProvider = myId === quote.providerId.toString();
  if (!isQuoteClient && !isQuoteProvider) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-20 text-center space-y-4",
        "data-ocid": "quote-detail.access_denied",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Access denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You don't have permission to view this quote." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: isClient ? "/client-dashboard" : "/dashboard" }),
              "data-ocid": "quote-detail.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1.5" }),
                " Back to Dashboard"
              ]
            }
          )
        ]
      }
    );
  }
  const isReplied = quote.status === QuoteStatus.replied;
  const isPending = quote.status === QuoteStatus.pending;
  const isAccepted = quote.status === QuoteStatus.accepted;
  const isClosed = quote.status === QuoteStatus.rejected || quote.status === QuoteStatus.cancelled;
  const handleDecline = async () => {
    try {
      await rejectQuote.mutateAsync(quote.id);
      ue.success("Offer declined.");
    } catch {
      ue.error("Failed to decline offer.");
    }
  };
  const handleCancel = async () => {
    try {
      await cancelQuote.mutateAsync(quote.id);
      ue.success("Quote request cancelled.");
      navigate({ to: isClient ? "/client-dashboard" : "/dashboard" });
    } catch {
      ue.error("Failed to cancel quote.");
    }
  };
  const handleAcceptAndBook = async () => {
    try {
      await acceptQuote.mutateAsync(quote.id);
      const booking = await createBooking.mutateAsync(quote.id);
      ue.success("Booking created! The service is now confirmed.");
      navigate({ to: "/bookings/$id", params: { id: String(booking.id) } });
    } catch {
      ue.error("Failed to create booking.");
    }
  };
  const handleCreateBooking = async () => {
    try {
      const booking = await createBooking.mutateAsync(quote.id);
      ue.success("Booking created!");
      navigate({ to: "/bookings/$id", params: { id: String(booking.id) } });
    } catch {
      ue.error("Failed to create booking.");
    }
  };
  const handleReply = async () => {
    if (!replyForm.message.trim() && replyForm.mode !== "onsite") {
      ue.error("Please enter a message for the client.");
      return;
    }
    const toCents = (v) => {
      const n = Number.parseFloat(v);
      return v.trim() && !Number.isNaN(n) && n > 0 ? BigInt(Math.round(n * 100)) : void 0;
    };
    const toBigInt = (v) => {
      const n = Number.parseInt(v, 10);
      return v.trim() && !Number.isNaN(n) && n > 0 ? BigInt(n) : 0n;
    };
    let replyType;
    let breakdown;
    if (replyForm.mode === "onsite") {
      replyType = ReplyType.onSiteEstimate;
    } else if (replyForm.mode === "detailed") {
      replyType = ReplyType.detailedEstimate;
      breakdown = {
        hours: toBigInt(replyForm.hours),
        hourlyRate: toCents(replyForm.hourlyRate) ?? 0n,
        materials: toCents(replyForm.materials) ?? 0n,
        labor: toCents(replyForm.labor) ?? 0n,
        notes: replyForm.notes.trim()
      };
    } else {
      replyType = ReplyType.messageOnly;
    }
    try {
      await replyQuote.mutateAsync({
        quoteId: quote.id,
        replyType,
        replyMessage: replyForm.message.trim() !== "" ? replyForm.message.trim() : void 0,
        proposedPrice: replyForm.mode !== "onsite" ? toCents(replyForm.price) : void 0,
        proposedTimeline: replyForm.timeline.trim() !== "" ? replyForm.timeline.trim() : void 0,
        estimationBreakdown: breakdown
      });
      ue.success("Reply sent to client!");
      setShowReply(false);
      setReplyForm(DEFAULT_REPLY);
    } catch {
      ue.error("Failed to send reply.");
    }
  };
  const suggestedTotal = computeSuggestedTotal(replyForm);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-5",
      "data-ocid": "quote-detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: isClient ? "/client-dashboard" : "/dashboard" }),
            className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
            "data-ocid": "quote-detail.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back to Dashboard"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: (service == null ? void 0 : service.title) ?? `Quote #${String(quote.id)}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              "Submitted ",
              formatTimestamp(quote.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteStatusBadge, { status: quote.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 flex flex-wrap gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              UserAvatar,
              {
                name: (clientProfile == null ? void 0 : clientProfile.displayName) ?? "Client",
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Client" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/profile/$userId",
                  params: { userId: quote.clientId.toString() },
                  className: "text-sm font-medium text-foreground hover:text-primary transition-colors",
                  "data-ocid": "quote-detail.client_link",
                  children: (clientProfile == null ? void 0 : clientProfile.displayName) ?? "Loading…"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-10 hidden sm:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              UserAvatar,
              {
                name: (providerProfile == null ? void 0 : providerProfile.displayName) ?? "Provider",
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Provider" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/profile/$userId",
                  params: { userId: quote.providerId.toString() },
                  className: "text-sm font-medium text-foreground hover:text-primary transition-colors",
                  "data-ocid": "quote-detail.provider_link",
                  children: (providerProfile == null ? void 0 : providerProfile.displayName) ?? "Loading…"
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-muted-foreground" }),
            "Request Details"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-foreground leading-relaxed whitespace-pre-wrap",
                "data-ocid": "quote-detail.requirements_text",
                children: quote.requirements
              }
            ),
            quote.attachments && quote.attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AttachmentGallery, { attachments: quote.attachments }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
              "Submitted ",
              formatTimestamp(quote.createdAt),
              quote.updatedAt !== quote.createdAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2", children: [
                "· Updated ",
                formatTimestamp(quote.updatedAt)
              ] })
            ] })
          ] })
        ] }),
        isReplied && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-primary/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4 text-primary" }),
              "Provider Reply"
            ] }),
            quote.replyType && /* @__PURE__ */ jsxRuntimeExports.jsx(ReplyTypeBadge, { type: quote.replyType })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            quote.replyType === ReplyType.onSiteEstimate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 p-3 rounded-lg bg-accent/10 border border-accent/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-accent mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Price determined on-site" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "The provider will assess the job before confirming a final price." })
              ] })
            ] }),
            quote.replyType === ReplyType.messageOnly && quote.replyMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 p-3 rounded-lg bg-muted/30 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-muted-foreground mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-foreground leading-relaxed",
                  "data-ocid": "quote-detail.reply_message",
                  children: quote.replyMessage
                }
              )
            ] }),
            quote.replyType === ReplyType.detailedEstimate && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              quote.replyMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-foreground leading-relaxed",
                  "data-ocid": "quote-detail.reply_message",
                  children: quote.replyMessage
                }
              ),
              quote.estimationBreakdown && /* @__PURE__ */ jsxRuntimeExports.jsx(BreakdownDisplay, { bd: quote.estimationBreakdown })
            ] }),
            quote.replyType === ReplyType.onSiteEstimate && quote.replyMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-foreground leading-relaxed",
                "data-ocid": "quote-detail.reply_message",
                children: quote.replyMessage
              }
            ),
            quote.proposedPrice !== void 0 && quote.proposedPrice !== null && quote.replyType !== ReplyType.onSiteEstimate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Quoted price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-2xl font-bold text-foreground",
                  "data-ocid": "quote-detail.proposed_price",
                  children: formatCurrency(quote.proposedPrice)
                }
              )
            ] }),
            quote.replyType === ReplyType.onSiteEstimate && (quote.proposedPrice === void 0 || quote.proposedPrice === null) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "To be determined on-site" })
            ] }),
            quote.proposedTimeline && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Timeline:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-medium text-foreground",
                  "data-ocid": "quote-detail.proposed_timeline",
                  children: quote.proposedTimeline
                }
              )
            ] })
          ] })
        ] }),
        isQuoteClient && isReplied && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Accept this offer?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Accept to create a booking and hold payment in escrow." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full",
                onClick: handleAcceptAndBook,
                disabled: acceptQuote.isPending || createBooking.isPending,
                "data-ocid": "quote-detail.accept_button",
                children: acceptQuote.isPending || createBooking.isPending ? "Creating Booking…" : "Accept Offer & Book"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "w-full text-muted-foreground hover:text-destructive hover:border-destructive/40",
                onClick: handleDecline,
                disabled: rejectQuote.isPending,
                "data-ocid": "quote-detail.reject_button",
                children: rejectQuote.isPending ? "Declining…" : "Decline Offer"
              }
            )
          ] })
        ] }),
        isQuoteClient && isAccepted && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Quote accepted — create a booking to proceed to payment." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full",
              onClick: handleCreateBooking,
              disabled: createBooking.isPending,
              "data-ocid": "quote-detail.create_booking_button",
              children: createBooking.isPending ? "Creating Booking…" : "Create Booking"
            }
          )
        ] }) }),
        isQuoteClient && isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Awaiting a response from the provider. You can cancel if you no longer need this service." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "w-full text-muted-foreground hover:text-destructive hover:border-destructive/40",
              onClick: handleCancel,
              disabled: cancelQuote.isPending,
              "data-ocid": "quote-detail.cancel_button",
              children: cancelQuote.isPending ? "Cancelling…" : "Cancel Request"
            }
          )
        ] }) }),
        isQuoteProvider && isPending && !showReply && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full",
            onClick: () => setShowReply(true),
            "data-ocid": "quote-detail.send_offer_button",
            children: "Send Reply to Client"
          }
        ),
        isQuoteProvider && isReplied && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your reply is awaiting client action." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "text-muted-foreground hover:text-destructive hover:border-destructive/40",
              onClick: handleCancel,
              disabled: cancelQuote.isPending,
              "data-ocid": "quote-detail.cancel_button",
              children: cancelQuote.isPending ? "Cancelling…" : "Cancel Quote"
            }
          )
        ] }) }),
        isQuoteProvider && showReply && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "quote-detail.reply_form", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Send Your Reply" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Choose how you want to respond to this request." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-1 p-1 rounded-xl bg-muted/30 border border-border",
                role: "tablist",
                "data-ocid": "quote-detail.reply_mode_tabs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ModeTab,
                    {
                      active: replyForm.mode === "message",
                      onClick: () => setField("mode", "message"),
                      ocid: "quote-detail.mode_message_tab",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 justify-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
                        " Message"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ModeTab,
                    {
                      active: replyForm.mode === "detailed",
                      onClick: () => setField("mode", "detailed"),
                      ocid: "quote-detail.mode_detailed_tab",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 justify-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
                        " Detailed"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ModeTab,
                    {
                      active: replyForm.mode === "onsite",
                      onClick: () => setField("mode", "onsite"),
                      ocid: "quote-detail.mode_onsite_tab",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 justify-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                        " On-site"
                      ] })
                    }
                  )
                ]
              }
            ),
            replyForm.mode !== "onsite" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reply-message", className: "text-xs", children: [
                "Message to Client",
                replyForm.mode === "message" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" }),
                replyForm.mode === "detailed" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground ml-1", children: "— optional" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "reply-message",
                  placeholder: "e.g. Thanks for reaching out! I'd be happy to help…",
                  rows: 3,
                  className: "resize-none",
                  value: replyForm.message,
                  onChange: (e) => setReplyForm((p) => ({ ...p, message: e.target.value })),
                  "data-ocid": "quote-detail.message_textarea"
                }
              )
            ] }),
            replyForm.mode === "onsite" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 p-3 rounded-lg bg-accent/10 border border-accent/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-accent mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Price determined on-site" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "The client will be notified that you need to visit the site before providing a final price." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "onsite-message", className: "text-xs", children: "Message — optional" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "onsite-message",
                    placeholder: "e.g. I'll need to assess the scope in person. I'm available next week…",
                    rows: 3,
                    className: "resize-none",
                    value: replyForm.message,
                    onChange: (e) => setReplyForm((p) => ({ ...p, message: e.target.value })),
                    "data-ocid": "quote-detail.onsite_message_textarea"
                  }
                )
              ] })
            ] }),
            replyForm.mode === "detailed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-muted/30 border border-border space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Price Breakdown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DollarInput,
                  {
                    id: "breakdown-labor",
                    label: "Labor",
                    value: replyForm.labor,
                    onChange: (v) => setField("labor", v),
                    ocid: "quote-detail.breakdown_labor_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DollarInput,
                  {
                    id: "breakdown-materials",
                    label: "Materials",
                    value: replyForm.materials,
                    onChange: (v) => setField("materials", v),
                    ocid: "quote-detail.breakdown_materials_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DollarInput,
                  {
                    id: "breakdown-hourly",
                    label: "Hourly Rate",
                    value: replyForm.hourlyRate,
                    onChange: (v) => setField("hourlyRate", v),
                    ocid: "quote-detail.breakdown_hourly_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "breakdown-hours", className: "text-xs", children: "Hours" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "breakdown-hours",
                      type: "number",
                      min: "0",
                      placeholder: "0",
                      value: replyForm.hours,
                      onChange: (e) => setField("hours", e.target.value),
                      "data-ocid": "quote-detail.breakdown_hours_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "breakdown-notes", className: "text-xs", children: "Notes / Justification" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "breakdown-notes",
                    placeholder: "e.g. Includes 2 hours travel, specialized equipment rental…",
                    rows: 2,
                    className: "resize-none text-sm",
                    value: replyForm.notes,
                    onChange: (e) => setReplyForm((p) => ({ ...p, notes: e.target.value })),
                    "data-ocid": "quote-detail.breakdown_notes_textarea"
                  }
                )
              ] }),
              suggestedTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Suggested total (labor + materials)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "text-xs font-semibold text-primary hover:underline",
                    onClick: () => setReplyForm((p) => ({
                      ...p,
                      price: String(suggestedTotal)
                    })),
                    "data-ocid": "quote-detail.apply_suggestion_button",
                    children: [
                      "Apply $",
                      suggestedTotal.toFixed(2),
                      " →"
                    ]
                  }
                )
              ] })
            ] }),
            replyForm.mode !== "onsite" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DollarInput,
                {
                  id: "reply-price",
                  label: "Proposed Price (USD) — optional",
                  value: replyForm.price,
                  onChange: (v) => setReplyForm((p) => ({ ...p, price: v })),
                  placeholder: "Leave blank if TBD",
                  ocid: "quote-detail.price_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reply-timeline", className: "text-xs", children: "Estimated Timeline — optional" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "reply-timeline",
                    placeholder: "e.g. 3–5 business days",
                    value: replyForm.timeline,
                    onChange: (e) => setReplyForm((p) => ({
                      ...p,
                      timeline: e.target.value
                    })),
                    "data-ocid": "quote-detail.timeline_input"
                  }
                )
              ] })
            ] }),
            replyForm.mode === "onsite" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "onsite-timeline", className: "text-xs", children: "Proposed Timeline — optional" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "onsite-timeline",
                  placeholder: "e.g. Can visit within 3 business days",
                  value: replyForm.timeline,
                  onChange: (e) => setReplyForm((p) => ({ ...p, timeline: e.target.value })),
                  "data-ocid": "quote-detail.onsite_timeline_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full",
                onClick: handleReply,
                disabled: replyQuote.isPending,
                "data-ocid": "quote-detail.submit_offer_button",
                children: replyQuote.isPending ? "Sending Reply…" : "Send Reply"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "w-full",
                onClick: () => {
                  setShowReply(false);
                  setReplyForm(DEFAULT_REPLY);
                },
                "data-ocid": "quote-detail.cancel_reply_button",
                children: "Cancel"
              }
            )
          ] })
        ] }),
        isClosed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-4 rounded-lg bg-muted/30 border border-border text-center",
            "data-ocid": "quote-detail.closed_notice",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mb-2", children: quote.status === QuoteStatus.rejected ? "Declined" : "Cancelled" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: quote.status === QuoteStatus.rejected ? "This offer was declined." : "This quote request was cancelled." })
            ]
          }
        )
      ]
    }
  );
}
function QuoteDetail() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteDetailContent, {}) });
}
export {
  QuoteDetail as default
};
