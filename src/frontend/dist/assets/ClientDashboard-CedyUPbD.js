import { j as jsxRuntimeExports, u as useNavigate, a as useAuth, G as useMyClientQuotes, I as useMyClientBookings, b as useListServices, r as reactExports, B as Button, J as useAcceptQuote, K as useRejectQuote, M as useCancelQuote, N as useCreateBooking, L as Link, t as useBookingAction, o as useUserProfile, A as useInvoiceByBooking, F as FileText } from "./index-BJQw-dZb.js";
import { C as Card, a as CardContent } from "./card-DJwG1xfA.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, I as Image } from "./dialog-SanxLYiU.js";
import { S as Skeleton } from "./skeleton-l7FOGfhk.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-HRjyVvBX.js";
import { u as ue } from "./index-CLm5tAfo.js";
import { A as AuthGuard } from "./AuthGuard-ODJ9Wg5N.js";
import { B as BookingStatusBadge } from "./BookingStatusBadge-ClZSToCp.js";
import { E as EmptyState } from "./EmptyState-ilxOlh8N.js";
import { Q as QuoteStatusBadge, M as MapPin } from "./QuoteStatusBadge-lXiM6UtN.js";
import { R as RatingForm, C as CircleX, a as CreditCard } from "./RatingForm-CTr2PLPR.js";
import { a as formatTimestamp, f as formatCurrency } from "./types-CFG00yAA.js";
import { U as User } from "./user-C4s_Swch.js";
import { M as MessageSquare } from "./message-square-DtTxccu1.js";
import { C as Calendar } from "./calendar-OhfRUxPl.js";
import { A as ArrowRight } from "./arrow-right-CYMntHeN.js";
import { C as CircleCheck } from "./circle-check-B9CFG7d7.js";
import "./index-B1k2S2C4.js";
import "./Combination-B1w9Esvu.js";
import "./index-B9jclvFD.js";
import "./textarea-yVhHD2GQ.js";
import "./StarRating-CUXHeY46.js";
import "./circle-check-big-BDcmROHD.js";
import "./circle-alert-BiMYm_2y.js";
function ProviderName({ providerId }) {
  const { data: profile, isLoading } = useUserProfile(providerId);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Loading…" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/profile/$userId",
      params: { userId: providerId.toString() },
      className: "text-xs text-primary hover:underline truncate",
      onClick: (e) => e.stopPropagation(),
      children: (profile == null ? void 0 : profile.displayName) ?? "Unknown provider"
    }
  );
}
function AttachmentThumbnails({
  attachments,
  quoteId
}) {
  if (!attachments || attachments.length === 0) return null;
  const visible = attachments.slice(0, 4);
  const overflow = attachments.length - 4;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 flex-wrap", children: [
    visible.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-10 h-10 rounded-md overflow-hidden border border-border bg-muted/40 shrink-0",
        "data-ocid": `quotes.attachment.${quoteId}.${i + 1}`,
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
    overflow > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-md border border-border bg-muted/40 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground", children: [
      "+",
      overflow
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3 h-3" }),
      attachments.length,
      " photo",
      attachments.length !== 1 ? "s" : ""
    ] })
  ] });
}
function ReplyTypeLabel({ replyType }) {
  if (!replyType) return null;
  if (replyType === "onSiteEstimate") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
      " On-site estimate"
    ] });
  }
  if (replyType === "detailedEstimate") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full", children: "Detailed estimate" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
    " Message only"
  ] });
}
function BookingInvoiceLink({ bookingId }) {
  const { data: invoice, isLoading } = useInvoiceByBooking(bookingId);
  if (isLoading) return null;
  if (!invoice) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/invoices/$id",
      params: { id: String(invoice.id) },
      className: "inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium",
      onClick: (e) => e.stopPropagation(),
      "data-ocid": `bookings.invoice_link.${String(bookingId)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
        "View Invoice"
      ]
    }
  );
}
function QuoteRow({
  quote,
  serviceTitle
}) {
  const acceptQuote = useAcceptQuote();
  const rejectQuote = useRejectQuote();
  const cancelQuote = useCancelQuote();
  const createBooking = useCreateBooking();
  const handleAccept = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await acceptQuote.mutateAsync(quote.id);
      ue.success("Quote accepted!");
    } catch {
      ue.error("Failed to accept quote.");
    }
  };
  const handleDecline = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await rejectQuote.mutateAsync(quote.id);
      ue.success("Quote declined.");
    } catch {
      ue.error("Failed to decline quote.");
    }
  };
  const handleCancel = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await cancelQuote.mutateAsync(quote.id);
      ue.success("Quote request cancelled.");
    } catch {
      ue.error("Failed to cancel quote.");
    }
  };
  const handleCreateBooking = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await createBooking.mutateAsync(quote.id);
      ue.success("Booking created! Payment is now pending.");
    } catch {
      ue.error("Failed to create booking.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-3 p-4 rounded-lg border border-border bg-card hover:bg-muted/20 transition-smooth",
      "data-ocid": `quotes.item.${String(quote.id)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: serviceTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderName, { providerId: quote.providerId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 mt-1 line-clamp-2 leading-snug", children: quote.requirements }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: formatTimestamp(quote.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AttachmentThumbnails,
              {
                attachments: quote.attachments,
                quoteId: String(quote.id)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteStatusBadge, { status: quote.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/quotes/$id",
                params: { id: String(quote.id) },
                className: "text-muted-foreground hover:text-primary transition-colors",
                "aria-label": "View quote details",
                "data-ocid": `quotes.link.${String(quote.id)}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }),
        quote.status === "replied" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 p-3 rounded-md bg-muted/40 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ReplyTypeLabel, { replyType: quote.replyType }),
            quote.proposedPrice !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold font-mono text-foreground", children: formatCurrency(quote.proposedPrice) }) : quote.replyType === "onSiteEstimate" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Price determined on-site" }) : null
          ] }),
          quote.proposedTimeline && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Timeline:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: quote.proposedTimeline })
          ] }),
          quote.replyMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground italic line-clamp-2", children: [
            '"',
            quote.replyMessage,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "button-primary flex-1",
                onClick: handleAccept,
                disabled: acceptQuote.isPending,
                "data-ocid": `quotes.accept_button.${String(quote.id)}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1" }),
                  acceptQuote.isPending ? "Accepting…" : "Accept"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "flex-1",
                onClick: handleDecline,
                disabled: rejectQuote.isPending,
                "data-ocid": `quotes.reject_button.${String(quote.id)}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mr-1" }),
                  rejectQuote.isPending ? "Declining…" : "Decline"
                ]
              }
            )
          ] })
        ] }),
        quote.status === "accepted" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "button-primary self-start gap-1.5",
            onClick: handleCreateBooking,
            disabled: createBooking.isPending,
            "data-ocid": `quotes.create_booking_button.${String(quote.id)}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-3.5 h-3.5" }),
              createBooking.isPending ? "Creating Booking…" : "Create Booking"
            ]
          }
        ),
        quote.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "self-start text-muted-foreground hover:text-destructive hover:border-destructive/40",
            onClick: handleCancel,
            disabled: cancelQuote.isPending,
            "data-ocid": `quotes.cancel_button.${String(quote.id)}`,
            children: cancelQuote.isPending ? "Cancelling…" : "Cancel Request"
          }
        )
      ]
    }
  );
}
function QuotesTab({
  quotes,
  isLoading,
  serviceTitleMap
}) {
  const navigate = useNavigate();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "quotes.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-lg" }, i)) });
  }
  if (quotes.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "quotes.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-7 h-7 text-muted-foreground" }),
        title: "No quote requests yet",
        description: "Find a service you need and request a custom quote from a provider.",
        actionLabel: "Browse Services",
        onAction: () => navigate({ to: "/services" })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "quotes.list", children: quotes.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    QuoteRow,
    {
      quote: q,
      serviceTitle: serviceTitleMap[String(q.serviceId)] ?? `Service #${String(q.serviceId)}`
    },
    String(q.id)
  )) });
}
function BookingRow({
  booking,
  serviceTitle,
  onRatingPrompt
}) {
  const { complete, releaseEscrow } = useBookingAction();
  const handleMarkCompleted = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await complete.mutateAsync(booking.id);
      ue.success("Booking marked as completed!");
      onRatingPrompt(booking.id);
    } catch {
      ue.error("Failed to mark as completed.");
    }
  };
  const handleReleaseEscrow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await releaseEscrow.mutateAsync(booking.id);
      ue.success("Payment released to provider!");
      onRatingPrompt(booking.id);
    } catch {
      ue.error("Failed to release payment.");
    }
  };
  const isStarted = booking.bookingStatus === "started";
  const isCompleted = booking.bookingStatus === "completed";
  const escrowHeld = booking.escrowStatus === "held";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-3 p-4 rounded-lg border border-border bg-card hover:bg-muted/20 transition-smooth",
      "data-ocid": `bookings.item.${String(booking.id)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: serviceTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderName, { providerId: booking.providerId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mt-1 font-mono", children: formatCurrency(booking.agreedPrice) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "Updated ",
              formatTimestamp(booking.updatedAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status: booking.bookingStatus }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/bookings/$id",
                params: { id: String(booking.id) },
                className: "text-muted-foreground hover:text-primary transition-colors",
                "aria-label": "View booking details",
                "data-ocid": `bookings.link.${String(booking.id)}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          isStarted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "button-primary gap-1.5",
              onClick: handleMarkCompleted,
              disabled: complete.isPending,
              "data-ocid": `bookings.complete_button.${String(booking.id)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                complete.isPending ? "Marking…" : "Mark Completed"
              ]
            }
          ),
          isCompleted && escrowHeld && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "button-primary gap-1.5",
              onClick: handleReleaseEscrow,
              disabled: releaseEscrow.isPending,
              "data-ocid": `bookings.release_escrow_button.${String(booking.id)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                releaseEscrow.isPending ? "Processing…" : "Confirm Work & Release Payment"
              ]
            }
          ),
          isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsx(BookingInvoiceLink, { bookingId: booking.id })
        ] })
      ]
    }
  );
}
function BookingsTab({
  bookings,
  isLoading,
  serviceTitleMap,
  onRatingPrompt
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "bookings.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" }, i)) });
  }
  if (bookings.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "bookings.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-7 h-7 text-muted-foreground" }),
        title: "No bookings yet",
        description: "Accept a quote from a provider to create your first booking."
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "bookings.list", children: bookings.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    BookingRow,
    {
      booking: b,
      serviceTitle: serviceTitleMap[String(b.serviceId)] ?? `Service #${String(b.serviceId)}`,
      onRatingPrompt
    },
    String(b.id)
  )) });
}
function StatCard({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-foreground", children: String(value) })
  ] }) });
}
function ClientDashboardContent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: quotes = [], isLoading: quotesLoading } = useMyClientQuotes();
  const { data: bookings = [], isLoading: bookingsLoading } = useMyClientBookings();
  const { data: allServices = [] } = useListServices(null);
  const [ratingBookingId, setRatingBookingId] = reactExports.useState(
    null
  );
  const serviceTitleMap = allServices.reduce(
    (acc, s) => {
      acc[String(s.id)] = s.title;
      return acc;
    },
    {}
  );
  const actionableQuotes = quotes.filter(
    (q) => q.status === "pending" || q.status === "replied" || q.status === "accepted"
  );
  const activeBookings = bookings.filter(
    (b) => b.bookingStatus === "started" || b.bookingStatus === "paymentPending"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "h1",
          {
            className: "font-display font-bold text-2xl text-foreground",
            "data-ocid": "client-dashboard.page",
            children: [
              (user == null ? void 0 : user.displayName) ?? "My",
              " Dashboard"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Track your quotes and bookings in one place." })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Active Quotes", value: actionableQuotes.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Active Bookings", value: activeBookings.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Bookings", value: bookings.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "quotes", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsList,
          {
            className: "w-full mb-6 bg-muted/40 border border-border",
            "data-ocid": "client-dashboard.tabs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "quotes",
                  className: "flex-1",
                  "data-ocid": "quotes.tab",
                  children: [
                    "My Quotes",
                    actionableQuotes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold inline-flex items-center justify-center", children: actionableQuotes.length })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: "bookings",
                  className: "flex-1",
                  "data-ocid": "bookings.tab",
                  children: [
                    "My Bookings",
                    activeBookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 min-w-[18px] h-[18px] rounded-full bg-accent text-accent-foreground text-[10px] font-bold inline-flex items-center justify-center", children: activeBookings.length })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "quotes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuotesTab,
          {
            quotes,
            isLoading: quotesLoading,
            serviceTitleMap
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "bookings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingsTab,
          {
            bookings,
            isLoading: bookingsLoading,
            serviceTitleMap,
            onRatingPrompt: setRatingBookingId
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 p-5 rounded-xl bg-muted/30 border border-border flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Need something done?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Browse our providers and request a custom quote." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "button-primary shrink-0",
            onClick: () => navigate({ to: "/services" }),
            "data-ocid": "client-dashboard.browse_services_button",
            children: "Browse Services"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: ratingBookingId !== null,
        onOpenChange: (open) => {
          if (!open) setRatingBookingId(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "rating.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Rate your experience" }) }),
          ratingBookingId !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
            RatingForm,
            {
              bookingId: ratingBookingId,
              onSuccess: () => setRatingBookingId(null)
            }
          )
        ] })
      }
    )
  ] });
}
function ClientDashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { requireClient: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientDashboardContent, {}) });
}
export {
  ClientDashboard as default
};
