import { c as createLucideIcon, j as jsxRuntimeExports, u as useNavigate, p as useMyServices, q as useMyProviderQuotes, s as useMyProviderBookings, t as useBookingAction, v as useDeleteService, r as reactExports, B as Button, w as Briefcase, x as useCreateService, y as useUpdateService, z as useReplyQuote, o as useUserProfile, A as useInvoiceByBooking, F as FileText, R as ReplyType } from "./index-BJQw-dZb.js";
import { B as Badge } from "./badge-DWGdRvla.js";
import { C as Card, a as CardContent } from "./card-DJwG1xfA.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, I as Image } from "./dialog-SanxLYiU.js";
import { I as Input } from "./input-CTsVHrW8.js";
import { L as Label, T as Textarea } from "./textarea-yVhHD2GQ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BhFflofZ.js";
import { S as Skeleton } from "./skeleton-l7FOGfhk.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-HRjyVvBX.js";
import { u as ue } from "./index-CLm5tAfo.js";
import { A as AuthGuard } from "./AuthGuard-ODJ9Wg5N.js";
import { B as BookingStatusBadge } from "./BookingStatusBadge-ClZSToCp.js";
import { C as CategoryBadge } from "./CategoryBadge-32UOtp1V.js";
import { E as EmptyState } from "./EmptyState-ilxOlh8N.js";
import { Q as QuoteStatusBadge, M as MapPin } from "./QuoteStatusBadge-lXiM6UtN.js";
import { f as formatCurrency, a as formatTimestamp, S as SERVICE_CATEGORIES } from "./types-CFG00yAA.js";
import { C as Clock } from "./clock-BUsQig5K.js";
import { C as CircleCheck } from "./circle-check-B9CFG7d7.js";
import { M as MessageSquare } from "./message-square-DtTxccu1.js";
import { U as User } from "./user-C4s_Swch.js";
import "./index-B1k2S2C4.js";
import "./Combination-B1w9Esvu.js";
import "./index-B9jclvFD.js";
import "./index-RUaXRNIr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
];
const CalendarCheck = createLucideIcon("calendar-check", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
];
const CirclePlay = createLucideIcon("circle-play", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const DEFAULT_FORM = {
  title: "",
  description: "",
  category: "",
  basePrice: "",
  priceType: "fixed"
};
function ClientNameDisplay({ clientId }) {
  const { data: profile, isLoading } = useUserProfile(clientId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20 inline-block" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }),
    (profile == null ? void 0 : profile.displayName) ?? "Unknown client"
  ] });
}
function InvoiceLinkButton({
  bookingId,
  onNavigate
}) {
  const { data: invoice, isLoading } = useInvoiceByBooking(bookingId);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28 rounded-md" });
  if (!invoice) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      size: "sm",
      variant: "outline",
      className: "h-8 text-xs gap-1.5",
      onClick: () => onNavigate(String(invoice.id)),
      "data-ocid": `booking.invoice_button.${String(bookingId)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
        "Invoice"
      ]
    }
  );
}
function ServiceSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-5/6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded-md mt-1" })
  ] });
}
function QuoteSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-4 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded-md" })
  ] });
}
function BookingSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-4 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28 rounded-md" })
  ] });
}
function ServiceCard({
  service,
  quoteCount,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-3 hover:border-primary/30 hover:shadow-md transition-all duration-200",
      "data-ocid": `service.item.${String(service.id)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground truncate leading-snug", children: service.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed", children: service.description })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CategoryBadge,
            {
              category: service.category,
              size: "sm"
            }
          ),
          service.priceType === "onSiteEstimate" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Contact for estimate" }) : service.basePrice > 0n ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "from ",
            formatCurrency(service.basePrice)
          ] }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
            quoteCount,
            " ",
            quoteCount === 1 ? "quote" : "quotes"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1 border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "flex-1 h-8 text-xs",
              onClick: onEdit,
              "data-ocid": `service.edit_button.${String(service.id)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3 h-3 mr-1" }),
                "Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 text-xs text-destructive hover:text-destructive hover:border-destructive/40",
              onClick: onDelete,
              "data-ocid": `service.delete_button.${String(service.id)}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
            }
          )
        ] })
      ]
    }
  );
}
function AttachmentThumbnails({ attachments }) {
  if (!attachments || attachments.length === 0) return null;
  const visible = attachments.slice(0, 4);
  const overflow = attachments.length - 4;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
      visible.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-9 h-9 rounded overflow-hidden border border-border bg-muted/40 shrink-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: url,
              alt: `Attachment ${i + 1}`,
              className: "w-full h-full object-cover"
            }
          )
        },
        url
      )),
      overflow > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded border border-border bg-muted/40 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground", children: [
        "+",
        overflow
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3 h-3" }),
      attachments.length,
      " ",
      attachments.length === 1 ? "photo" : "photos"
    ] })
  ] });
}
function QuoteCard({
  quote,
  serviceTitle,
  onReply,
  onNavigate
}) {
  const isPending = quote.status === "pending";
  const hasOffer = quote.status === "replied" || quote.status === "accepted";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-all duration-200",
      "data-ocid": `quote.item.${String(quote.id)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: serviceTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientNameDisplay, { clientId: quote.clientId }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 inline" }),
              formatTimestamp(quote.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteStatusBadge, { status: quote.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3", children: quote.requirements }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AttachmentThumbnails, { attachments: quote.attachments }),
        hasOffer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 p-2.5 rounded-md bg-primary/5 border border-primary/15 mb-3", children: quote.replyType === "onSiteEstimate" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "On-site estimate required" })
        ] }) : quote.proposedPrice !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your offer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold font-mono text-primary", children: formatCurrency(quote.proposedPrice) })
          ] }),
          quote.proposedTimeline && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Timeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: quote.proposedTimeline })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "Message only reply" }) }),
        isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "w-full h-8 text-xs button-primary",
            onClick: onReply,
            "data-ocid": `quote.reply_button.${String(quote.id)}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3 h-3 mr-1.5" }),
              "Reply with Quote"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "w-full h-8 text-xs",
            onClick: onNavigate,
            "data-ocid": `quote.view_button.${String(quote.id)}`,
            children: "View Details"
          }
        )
      ]
    }
  );
}
function BookingRow({
  booking,
  serviceTitle,
  onStart,
  onComplete,
  onNavigateDetail,
  onNavigateInvoice,
  isStarting,
  isCompleting
}) {
  const canStart = booking.bookingStatus === "paymentPending";
  const canComplete = booking.bookingStatus === "started";
  const isCompleted = booking.bookingStatus === "completed";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-primary/20 transition-all duration-200",
      "data-ocid": `booking.item.${String(booking.id)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: serviceTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono-amount", children: formatCurrency(booking.agreedPrice) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientNameDisplay, { clientId: booking.clientId }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-3 h-3" }),
              formatTimestamp(booking.createdAt)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.bookingStatus }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
          canStart && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "h-8 text-xs button-primary gap-1.5",
              onClick: onStart,
              disabled: isStarting,
              "data-ocid": `booking.start_button.${String(booking.id)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3.5 h-3.5" }),
                isStarting ? "Starting…" : "Mark Started"
              ]
            }
          ),
          canComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "h-8 text-xs gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90",
              onClick: onComplete,
              disabled: isCompleting,
              "data-ocid": `booking.complete_button.${String(booking.id)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                isCompleting ? "Completing…" : "Mark Completed"
              ]
            }
          ),
          isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(
            InvoiceLinkButton,
            {
              bookingId: booking.id,
              onNavigate: onNavigateInvoice
            }
          ),
          !canStart && !canComplete && !isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 text-xs",
              onClick: onNavigateDetail,
              "data-ocid": `booking.view_button.${String(booking.id)}`,
              children: "View Details"
            }
          )
        ] })
      ]
    }
  );
}
function ServiceFormModal({
  open,
  onClose,
  editService
}) {
  const [form, setForm] = reactExports.useState(
    editService ? {
      title: editService.title,
      description: editService.description,
      category: editService.category,
      basePrice: editService.priceType === "onSiteEstimate" ? "" : String(Number(editService.basePrice) / 100),
      priceType: editService.priceType === "onSiteEstimate" ? "onSiteEstimate" : "fixed"
    } : DEFAULT_FORM
  );
  const createService = useCreateService();
  const updateService = useUpdateService();
  const isEdit = !!editService;
  const isSubmitting = createService.isPending || updateService.isPending;
  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.category || !form.description.trim()) {
      ue.error("Please fill in all required fields");
      return;
    }
    if (form.priceType === "fixed") {
      const parsed = Number.parseFloat(form.basePrice || "0");
      if (Number.isNaN(parsed) || parsed <= 0) {
        ue.error("Please enter a valid price for a fixed-price service");
        return;
      }
    }
    const priceInCents = form.priceType === "onSiteEstimate" ? 0n : BigInt(Math.round(Number.parseFloat(form.basePrice || "0") * 100));
    const priceTypeValue = form.priceType;
    try {
      if (isEdit) {
        await updateService.mutateAsync({
          id: editService.id,
          input: {
            title: form.title,
            description: form.description,
            basePrice: priceInCents,
            priceType: priceTypeValue
          }
        });
        ue.success("Service updated successfully");
      } else {
        await createService.mutateAsync({
          title: form.title,
          description: form.description,
          category: form.category,
          basePrice: priceInCents,
          priceType: priceTypeValue
        });
        ue.success("Service posted successfully");
      }
      onClose();
    } catch {
      ue.error(
        isEdit ? "Failed to update service" : "Failed to create service"
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg", "data-ocid": "service.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: isEdit ? "Edit Service" : "Post New Service" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "svc-title", children: [
          "Title ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "svc-title",
            value: form.title,
            onChange: (e) => set("title", e.target.value),
            placeholder: "e.g. Home Electrical Repairs",
            "data-ocid": "service.title_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "svc-description", children: [
          "Description ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "svc-description",
            value: form.description,
            onChange: (e) => set("description", e.target.value),
            placeholder: "Describe what you offer, your experience, and what clients can expect...",
            rows: 3,
            className: "resize-none",
            "data-ocid": "service.description_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "svc-category", children: [
          "Category ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: form.category,
            onValueChange: (v) => set("category", v),
            disabled: isEdit,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  id: "svc-category",
                  "data-ocid": "service.category_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a category" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SERVICE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat.value, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.icon }),
                cat.label
              ] }) }, cat.value)) })
            ]
          }
        ),
        isEdit && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Category cannot be changed after posting." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pricing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-2 p-1 rounded-lg bg-muted/50 border border-border",
            "data-ocid": "service.price_type_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: `flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${form.priceType === "fixed" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                  onClick: () => set("priceType", "fixed"),
                  "data-ocid": "service.price_type_fixed",
                  children: "Fixed Price"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: `flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${form.priceType === "onSiteEstimate" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                  onClick: () => set("priceType", "onSiteEstimate"),
                  "data-ocid": "service.price_type_estimate",
                  children: "On-site Estimate"
                }
              )
            ]
          }
        )
      ] }),
      form.priceType === "fixed" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "svc-base-price", children: [
          "Base Price (USD) ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "$" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "svc-base-price",
              type: "number",
              min: "0.01",
              step: "0.01",
              value: form.basePrice,
              onChange: (e) => set("basePrice", e.target.value),
              placeholder: "0.00",
              className: "pl-7",
              "data-ocid": "service.price_input"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-muted/40 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Clients will see",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: '"Contact for estimate"' }),
        " ",
        "— ideal for jobs that need an on-site assessment before pricing."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "flex-1",
            onClick: onClose,
            "data-ocid": "service.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "flex-1 button-primary",
            disabled: isSubmitting,
            "data-ocid": "service.submit_button",
            children: isSubmitting ? "Saving…" : isEdit ? "Save Changes" : "Post Service"
          }
        )
      ] })
    ] })
  ] }) });
}
const EMPTY_REPLY = {
  message: "",
  price: "",
  timeline: "",
  labor: "",
  materials: "",
  hourlyRate: "",
  hours: "",
  notes: ""
};
function computeTotal(f) {
  return (Number.parseFloat(f.labor) || 0) + (Number.parseFloat(f.materials) || 0);
}
function ReplyQuoteModal({
  quote,
  serviceTitle,
  onClose
}) {
  const [tab, setTab] = reactExports.useState("messageOnly");
  const [form, setForm] = reactExports.useState(EMPTY_REPLY);
  const replyQuote = useReplyQuote();
  function setField(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (tab === "detailedEstimate" && (field === "labor" || field === "materials")) {
        const total = computeTotal(next);
        if (total > 0) return { ...next, price: String(total) };
      }
      return next;
    });
  }
  function handleClose() {
    setForm(EMPTY_REPLY);
    setTab("messageOnly");
    onClose();
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!quote) return;
    if (!form.message.trim()) {
      ue.error("Please enter a message for the client");
      return;
    }
    const toCents = (v) => {
      const n = Number.parseFloat(v);
      return v.trim() && !Number.isNaN(n) && n > 0 ? BigInt(Math.round(n * 100)) : void 0;
    };
    const toBigInt = (v) => {
      const n = Number.parseFloat(v);
      return v.trim() && !Number.isNaN(n) && n > 0 ? BigInt(Math.round(n)) : 0n;
    };
    let breakdown;
    let proposedPriceCents;
    let replyType;
    if (tab === "detailedEstimate") {
      breakdown = {
        hours: toBigInt(form.hours),
        hourlyRate: toCents(form.hourlyRate) ?? 0n,
        labor: toCents(form.labor) ?? 0n,
        materials: toCents(form.materials) ?? 0n,
        notes: form.notes.trim()
      };
      proposedPriceCents = toCents(form.price);
      replyType = ReplyType.detailedEstimate;
    } else if (tab === "onSiteEstimate") {
      replyType = ReplyType.onSiteEstimate;
      proposedPriceCents = void 0;
    } else {
      replyType = ReplyType.messageOnly;
      proposedPriceCents = toCents(form.price);
    }
    try {
      await replyQuote.mutateAsync({
        quoteId: quote.id,
        replyType,
        replyMessage: form.message.trim(),
        proposedPrice: proposedPriceCents,
        proposedTimeline: form.timeline.trim() || void 0,
        estimationBreakdown: breakdown
      });
      ue.success("Reply sent to client");
      handleClose();
    } catch {
      ue.error("Failed to send reply");
    }
  }
  const suggestedTotal = computeTotal(form);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!quote, onOpenChange: (v) => !v && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-lg max-h-[90vh] overflow-y-auto",
      "data-ocid": "reply-quote.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Reply to Quote" }) }),
        quote && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-muted/40 border border-border mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground mb-1", children: [
              serviceTitle,
              " · Client request"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: quote.requirements }),
            quote.attachments && quote.attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1.5 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3 h-3" }),
                quote.attachments.length,
                " attachment",
                quote.attachments.length !== 1 ? "s" : ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: quote.attachments.map((url, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-14 h-14 rounded-md overflow-hidden border border-border bg-muted/40 hover:border-primary/50 transition-colors block",
                  "aria-label": `View attachment ${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: url,
                      alt: `Attachment ${idx + 1}`,
                      className: "w-full h-full object-cover"
                    }
                  )
                },
                url
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Tabs,
            {
              value: tab,
              onValueChange: (v) => setTab(v),
              className: "mb-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsList,
                  {
                    className: "w-full bg-muted/40 border border-border",
                    "data-ocid": "reply-quote.type_tabs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        TabsTrigger,
                        {
                          value: "messageOnly",
                          className: "flex-1 text-xs",
                          "data-ocid": "reply-quote.tab_message_only",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5 mr-1" }),
                            "Message"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TabsTrigger,
                        {
                          value: "detailedEstimate",
                          className: "flex-1 text-xs",
                          "data-ocid": "reply-quote.tab_detailed_estimate",
                          children: "Estimate"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        TabsTrigger,
                        {
                          value: "onSiteEstimate",
                          className: "flex-1 text-xs",
                          "data-ocid": "reply-quote.tab_onsite_estimate",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 mr-1" }),
                            "On-site"
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "messageOnly", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-muted/20 border border-border mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Send a message without committing to a price. Useful for clarifying details before quoting." }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "detailedEstimate", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-muted/20 border border-border mb-3 flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Provide a full cost breakdown — builds trust and clarity for the client." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bd-labor", className: "text-xs", children: "Labor ($)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "bd-labor",
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "0.00",
                          value: form.labor,
                          onChange: (e) => setField("labor", e.target.value),
                          className: "h-8 text-sm",
                          "data-ocid": "reply-quote.breakdown_labor_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bd-materials", className: "text-xs", children: "Materials ($)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "bd-materials",
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "0.00",
                          value: form.materials,
                          onChange: (e) => setField("materials", e.target.value),
                          className: "h-8 text-sm",
                          "data-ocid": "reply-quote.breakdown_materials_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bd-hourly", className: "text-xs", children: "Hourly Rate ($)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "bd-hourly",
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "0.00",
                          value: form.hourlyRate,
                          onChange: (e) => setField("hourlyRate", e.target.value),
                          className: "h-8 text-sm",
                          "data-ocid": "reply-quote.breakdown_hourly_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bd-hours", className: "text-xs", children: "Estimated Hours" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "bd-hours",
                          type: "number",
                          min: "0",
                          step: "0.5",
                          placeholder: "0",
                          value: form.hours,
                          onChange: (e) => setField("hours", e.target.value),
                          className: "h-8 text-sm",
                          "data-ocid": "reply-quote.breakdown_hours_input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bd-notes", className: "text-xs", children: "Notes" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "bd-notes",
                        rows: 2,
                        placeholder: "e.g. Includes travel time, special equipment...",
                        value: form.notes,
                        onChange: (e) => setForm((p) => ({ ...p, notes: e.target.value })),
                        className: "resize-none text-sm",
                        "data-ocid": "reply-quote.breakdown_notes_textarea"
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
                        onClick: () => setForm((p) => ({
                          ...p,
                          price: String(suggestedTotal)
                        })),
                        "data-ocid": "reply-quote.apply_suggestion_button",
                        children: [
                          "Apply $",
                          suggestedTotal.toFixed(2),
                          " →"
                        ]
                      }
                    )
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "onSiteEstimate", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-primary/5 border border-primary/20 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground", children: "The client will be informed that pricing requires an on-site visit. No price commitment is made at this stage." })
                ] }) }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reply-message", children: [
                "Message to Client ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "reply-message",
                  rows: 3,
                  placeholder: tab === "onSiteEstimate" ? "e.g. I'd be happy to help! I'll need to visit to give an accurate estimate..." : tab === "detailedEstimate" ? "e.g. Here's my breakdown for this project..." : "e.g. Thanks for reaching out! I'd be happy to help...",
                  value: form.message,
                  onChange: (e) => setForm((p) => ({ ...p, message: e.target.value })),
                  className: "resize-none",
                  "data-ocid": "reply-quote.message_textarea"
                }
              )
            ] }),
            tab !== "onSiteEstimate" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reply-price", children: [
                  "Proposed Price (USD)",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "— optional" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "$" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "reply-price",
                      type: "number",
                      min: "0.01",
                      step: "0.01",
                      value: form.price,
                      onChange: (e) => setForm((p) => ({ ...p, price: e.target.value })),
                      placeholder: "Leave blank if on-site",
                      className: "pl-7",
                      "data-ocid": "reply-quote.price_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reply-timeline", children: [
                  "Timeline",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "— optional" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "reply-timeline",
                    value: form.timeline,
                    onChange: (e) => setForm((p) => ({ ...p, timeline: e.target.value })),
                    placeholder: "e.g. 2–3 business days",
                    "data-ocid": "reply-quote.timeline_input"
                  }
                )
              ] })
            ] }),
            tab === "onSiteEstimate" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reply-timeline-onsite", children: [
                "Proposed Visit Timeline",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "— optional" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "reply-timeline-onsite",
                  value: form.timeline,
                  onChange: (e) => setForm((p) => ({ ...p, timeline: e.target.value })),
                  placeholder: "e.g. This week or next",
                  "data-ocid": "reply-quote.timeline_input_onsite"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "flex-1",
                  onClick: handleClose,
                  "data-ocid": "reply-quote.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "flex-1 button-primary",
                  disabled: replyQuote.isPending,
                  "data-ocid": "reply-quote.submit_button",
                  children: replyQuote.isPending ? "Sending…" : "Send Reply"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
function ProviderDashboardContent() {
  const navigate = useNavigate();
  const { data: services = [], isLoading: servicesLoading } = useMyServices();
  const { data: quotes = [], isLoading: quotesLoading } = useMyProviderQuotes();
  const { data: bookings = [], isLoading: bookingsLoading } = useMyProviderBookings();
  const bookingActions = useBookingAction();
  const deleteService = useDeleteService();
  const [activeTab, setActiveTab] = reactExports.useState("services");
  const [showServiceModal, setShowServiceModal] = reactExports.useState(false);
  const [editingService, setEditingService] = reactExports.useState(
    null
  );
  const [replyingQuote, setReplyingQuote] = reactExports.useState(null);
  const quoteCountMap = quotes.reduce((acc, q) => {
    const key = String(q.serviceId);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const serviceTitleMap = services.reduce((acc, s) => {
    acc[String(s.id)] = s.title;
    return acc;
  }, {});
  const pendingQuotes = quotes.filter((q) => q.status === "pending");
  const activeBookings = bookings.filter(
    (b) => b.bookingStatus === "paymentPending" || b.bookingStatus === "started"
  );
  function openNewService() {
    setEditingService(null);
    setShowServiceModal(true);
  }
  function openEditService(service) {
    setEditingService(service);
    setShowServiceModal(true);
  }
  function closeServiceModal() {
    setShowServiceModal(false);
    setEditingService(null);
  }
  async function handleDeleteService(service) {
    if (!window.confirm(`Delete "${service.title}"? This cannot be undone.`))
      return;
    try {
      await deleteService.mutateAsync(service.id);
      ue.success("Service deleted");
    } catch {
      ue.error("Failed to delete service");
    }
  }
  async function handleStartBooking(booking) {
    try {
      await bookingActions.start.mutateAsync(booking.id);
      ue.success("Booking marked as started");
    } catch {
      ue.error("Failed to update booking");
    }
  }
  async function handleCompleteBooking(booking) {
    try {
      await bookingActions.complete.mutateAsync(booking.id);
      ue.success("Booking marked as completed");
    } catch {
      ue.error("Failed to update booking");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground tracking-tight", children: "Provider Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Manage your services, respond to quote requests, and track bookings." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openNewService,
          className: "button-primary gap-2 self-start sm:self-auto",
          "data-ocid": "dashboard.add_service_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Post New Service"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: [
      {
        label: "My Services",
        value: services.length,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4" }),
        accent: "text-primary"
      },
      {
        label: "Pending Quotes",
        value: pendingQuotes.length,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
        accent: pendingQuotes.length > 0 ? "text-accent" : "text-foreground"
      },
      {
        label: "Active Bookings",
        value: activeBookings.length,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-4 h-4" }),
        accent: activeBookings.length > 0 ? "text-accent" : "text-foreground"
      },
      {
        label: "Total Bookings",
        value: bookings.length,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
        accent: "text-foreground"
      }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${stat.accent} opacity-70`, children: stat.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-none mb-1", children: stat.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-display font-bold ${stat.accent}`, children: stat.value })
      ] })
    ] }) }, stat.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: setActiveTab,
        "data-ocid": "dashboard.tab",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6 bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "services",
                className: "gap-2",
                "data-ocid": "dashboard.services_tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4" }),
                  "My Services",
                  services.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs ml-1 h-5 min-w-5 px-1",
                      children: services.length
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "quotes",
                className: "gap-2",
                "data-ocid": "dashboard.quotes_tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
                  "Incoming Quotes",
                  pendingQuotes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs ml-1 h-5 min-w-5 px-1 bg-primary/90", children: pendingQuotes.length })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsTrigger,
              {
                value: "bookings",
                className: "gap-2",
                "data-ocid": "dashboard.bookings_tab",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-4 h-4" }),
                  "My Bookings",
                  activeBookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs ml-1 h-5 min-w-5 px-1 bg-accent/90 text-accent-foreground", children: activeBookings.length })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "services", "data-ocid": "dashboard.services_panel", children: servicesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
              "data-ocid": "services.loading_state",
              children: Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceSkeleton, {}, i)
              ))
            }
          ) : services.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "services.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-7 h-7 text-muted-foreground" }),
              title: "No services posted yet",
              description: "Post your first service to start receiving quote requests from clients.",
              actionLabel: "Post New Service",
              onAction: openNewService
            }
          ) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
              "data-ocid": "services.list",
              children: services.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ServiceCard,
                {
                  service,
                  quoteCount: quoteCountMap[String(service.id)] ?? 0,
                  onEdit: () => openEditService(service),
                  onDelete: () => handleDeleteService(service)
                },
                String(service.id)
              ))
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "quotes", "data-ocid": "dashboard.quotes_panel", children: quotesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 md:grid-cols-2 gap-3",
              "data-ocid": "quotes.loading_state",
              children: Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteSkeleton, {}, i)
              ))
            }
          ) : quotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "quotes.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-7 h-7 text-muted-foreground" }),
              title: "No quote requests yet",
              description: "Once clients request quotes for your services, they'll appear here."
            }
          ) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", "data-ocid": "quotes.list", children: [
            pendingQuotes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                "Awaiting your reply (",
                pendingQuotes.length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: pendingQuotes.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuoteCard,
                {
                  quote: q,
                  serviceTitle: serviceTitleMap[String(q.serviceId)] ?? "Service",
                  onReply: () => setReplyingQuote(q),
                  onNavigate: () => navigate({
                    to: "/quotes/$id",
                    params: { id: String(q.id) }
                  })
                },
                String(q.id)
              )) })
            ] }),
            quotes.filter((q) => q.status !== "pending").length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              pendingQuotes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "All other requests" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: quotes.filter((q) => q.status !== "pending").map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                QuoteCard,
                {
                  quote: q,
                  serviceTitle: serviceTitleMap[String(q.serviceId)] ?? "Service",
                  onReply: () => setReplyingQuote(q),
                  onNavigate: () => navigate({
                    to: "/quotes/$id",
                    params: { id: String(q.id) }
                  })
                },
                String(q.id)
              )) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "bookings", "data-ocid": "dashboard.bookings_panel", children: bookingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-col gap-3",
              "data-ocid": "bookings.loading_state",
              children: Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookingSkeleton, {}, i)
              ))
            }
          ) : bookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "bookings.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-7 h-7 text-muted-foreground" }),
              title: "No bookings yet",
              description: "When clients accept your quotes and complete payment, their bookings will appear here."
            }
          ) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", "data-ocid": "bookings.list", children: [
            activeBookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-accent uppercase tracking-wider mb-3 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3.5 h-3.5" }),
                "Action required (",
                activeBookings.length,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: activeBookings.map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                BookingRow,
                {
                  booking,
                  serviceTitle: serviceTitleMap[String(booking.serviceId)] ?? "Service",
                  onStart: () => handleStartBooking(booking),
                  onComplete: () => handleCompleteBooking(booking),
                  onNavigateDetail: () => navigate({
                    to: "/bookings/$id",
                    params: { id: String(booking.id) }
                  }),
                  onNavigateInvoice: (invoiceId) => navigate({
                    to: "/invoices/$id",
                    params: { id: invoiceId }
                  }),
                  isStarting: bookingActions.start.isPending && bookingActions.start.variables === booking.id,
                  isCompleting: bookingActions.complete.isPending && bookingActions.complete.variables === booking.id
                },
                String(booking.id)
              )) })
            ] }),
            bookings.filter(
              (b) => b.bookingStatus !== "paymentPending" && b.bookingStatus !== "started"
            ).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              activeBookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Past bookings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: bookings.filter(
                (b) => b.bookingStatus !== "paymentPending" && b.bookingStatus !== "started"
              ).map((booking) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                BookingRow,
                {
                  booking,
                  serviceTitle: serviceTitleMap[String(booking.serviceId)] ?? "Service",
                  onStart: () => handleStartBooking(booking),
                  onComplete: () => handleCompleteBooking(booking),
                  onNavigateDetail: () => navigate({
                    to: "/bookings/$id",
                    params: { id: String(booking.id) }
                  }),
                  onNavigateInvoice: (invoiceId) => navigate({
                    to: "/invoices/$id",
                    params: { id: invoiceId }
                  }),
                  isStarting: bookingActions.start.isPending && bookingActions.start.variables === booking.id,
                  isCompleting: bookingActions.complete.isPending && bookingActions.complete.variables === booking.id
                },
                String(booking.id)
              )) })
            ] })
          ] }) })
        ]
      }
    ),
    showServiceModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServiceFormModal,
      {
        open: showServiceModal,
        onClose: closeServiceModal,
        editService: editingService
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReplyQuoteModal,
      {
        quote: replyingQuote,
        serviceTitle: replyingQuote ? serviceTitleMap[String(replyingQuote.serviceId)] ?? "Service" : "",
        onClose: () => setReplyingQuote(null)
      }
    )
  ] });
}
function ProviderDashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { requireProvider: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderDashboardContent, {}) });
}
export {
  ProviderDashboard as default
};
