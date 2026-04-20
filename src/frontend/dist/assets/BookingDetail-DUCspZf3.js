import { c as createLucideIcon, j as jsxRuntimeExports, g as useParams, u as useNavigate, a as useAuth, V as useBooking, h as useService, o as useUserProfile, A as useInvoiceByBooking, m as useServiceRatings, t as useBookingAction, r as reactExports, k as LoadingSpinner, n as Separator, B as Button, W as Shield, F as FileText, L as Link, U as UserAvatar } from "./index-BJQw-dZb.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DJwG1xfA.js";
import { u as ue } from "./index-CLm5tAfo.js";
import { A as AuthGuard } from "./AuthGuard-ODJ9Wg5N.js";
import { B as BookingStatusBadge } from "./BookingStatusBadge-ClZSToCp.js";
import { a as CreditCard, C as CircleX, R as RatingForm } from "./RatingForm-CTr2PLPR.js";
import { S as Star, a as StarRating } from "./StarRating-CUXHeY46.js";
import { a as formatTimestamp, f as formatCurrency } from "./types-CFG00yAA.js";
import { C as CircleAlert } from "./circle-alert-BiMYm_2y.js";
import { A as ArrowLeft } from "./arrow-left-Byg1VtFE.js";
import { L as Lock } from "./lock-UAlJn9eS.js";
import { C as CircleCheckBig } from "./circle-check-big-BDcmROHD.js";
import { E as ExternalLink } from "./external-link-t3TBpq6y.js";
import "./textarea-yVhHD2GQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const ESCROW_STEPS = [
  { key: "paymentPending", label: "Booking Created" },
  { key: "started", label: "Provider Works" },
  { key: "completed", label: "Work Delivered" },
  { key: "released", label: "Escrow Released" }
];
function getActiveStep(bookingStatus, escrowStatus) {
  if (escrowStatus === "released") return 3;
  if (bookingStatus === "completed") return 2;
  if (bookingStatus === "started") return 1;
  return 0;
}
function EscrowFlow({
  bookingStatus,
  escrowStatus
}) {
  const activeStep = getActiveStep(bookingStatus, escrowStatus);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 rounded-xl bg-primary/5 border border-primary/15",
      "data-ocid": "booking-detail.escrow_flow",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Escrow Protection" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs font-mono text-muted-foreground capitalize", children: escrowStatus })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0", children: ESCROW_STEPS.map((step, i) => {
          const done = i <= activeStep;
          const current = i === activeStep;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-smooth ${done ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/50 text-muted-foreground border border-border"} ${current ? "ring-2 ring-primary/30 ring-offset-1 ring-offset-background" : ""}`,
                  children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }) : i + 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] text-center leading-tight hidden sm:block ${done ? "text-primary font-medium" : "text-muted-foreground"}`,
                  children: step.label
                }
              )
            ] }),
            i < ESCROW_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-0.5 flex-1 mx-1 shrink transition-smooth ${i < activeStep ? "bg-primary" : "bg-border"}`
              }
            )
          ] }, step.key);
        }) })
      ]
    }
  );
}
function DetailRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide w-28 shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: value })
  ] });
}
function PartyCard({
  label,
  displayName,
  userId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/profile/$userId",
      params: { userId },
      className: "flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-smooth group",
      "data-ocid": `booking-detail.${label.toLowerCase()}_profile_link`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { name: displayName ?? label, size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: displayName ?? "Loading…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-smooth shrink-0" })
      ]
    }
  );
}
function BookingDetailContent() {
  var _a;
  const { id } = useParams({ from: "/bookings/$id" });
  const navigate = useNavigate();
  const bookingId = BigInt(id);
  const { user, isClient, actorReady, isFetched: authFetched } = useAuth();
  const {
    data: booking,
    isLoading: bookingLoading,
    isFetched: bookingFetched
  } = useBooking(bookingId);
  const myId = (_a = user == null ? void 0 : user.id) == null ? void 0 : _a.toString();
  const isParticipant = !booking || myId === String(booking.clientId) || myId === String(booking.providerId);
  const { data: service } = useService((booking == null ? void 0 : booking.serviceId) ?? null);
  const { data: clientProfile } = useUserProfile((booking == null ? void 0 : booking.clientId) ?? null);
  const { data: providerProfile } = useUserProfile((booking == null ? void 0 : booking.providerId) ?? null);
  const { data: invoice } = useInvoiceByBooking(bookingId);
  const { data: ratings } = useServiceRatings((booking == null ? void 0 : booking.serviceId) ?? null);
  const actions = useBookingAction();
  const [showRating, setShowRating] = reactExports.useState(false);
  const isLoading = !actorReady || !authFetched || bookingLoading || !bookingFetched;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex justify-center py-20",
        "data-ocid": "booking-detail.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading booking…" })
      }
    );
  }
  if (!booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-20 text-center",
        "data-ocid": "booking-detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Booking not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "This booking may have been removed or doesn't exist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: isClient ? "/client-dashboard" : "/dashboard" }),
              className: "inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Go Back"
              ]
            }
          )
        ]
      }
    );
  }
  if (!isParticipant) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-20 text-center",
        "data-ocid": "booking-detail.access_denied_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Access Denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "You are not a party to this booking." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: isClient ? "/client-dashboard" : "/dashboard" }),
              className: "inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Go to Dashboard"
              ]
            }
          )
        ]
      }
    );
  }
  const status = booking.bookingStatus;
  const escrow = booking.escrowStatus;
  const isBookingClient = myId === String(booking.clientId);
  const isBookingProvider = myId === String(booking.providerId);
  const myRating = ratings == null ? void 0 : ratings.find(
    (r) => r.bookingId === bookingId && r.clientId.toString() === myId
  );
  const handleAction = async (action, successMsg) => {
    try {
      await action();
      ue.success(successMsg);
    } catch {
      ue.error("Action failed. Please try again.");
    }
  };
  const showRatingForm = isBookingClient && status === "completed" && !myRating && !showRating;
  const showRatingFormExpanded = isBookingClient && status === "completed" && !myRating && showRating;
  const canReleaseEscrow = isBookingClient && escrow === "held" && (status === "started" || status === "completed");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: isClient ? "/client-dashboard" : "/dashboard" }),
        className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6",
        "data-ocid": "booking-detail.back_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          " Back to Dashboard"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mb-1", children: [
                "BOOKING-",
                String(booking.id).padStart(6, "0")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CardTitle,
                {
                  className: "font-display text-xl leading-tight",
                  "data-ocid": "booking-detail.page",
                  children: (service == null ? void 0 : service.title) ?? "Service Booking"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBadge, { status, className: "shrink-0 mt-0.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Created ",
            formatTimestamp(booking.createdAt)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Agreed Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-3xl font-bold font-mono text-foreground tracking-tight",
                  "data-ocid": "booking-detail.price",
                  children: formatCurrency(booking.agreedPrice)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-6 h-6 text-primary" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PartyCard,
              {
                label: "Client",
                displayName: clientProfile == null ? void 0 : clientProfile.displayName,
                userId: String(booking.clientId)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PartyCard,
              {
                label: "Provider",
                displayName: providerProfile == null ? void 0 : providerProfile.displayName,
                userId: String(booking.providerId)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Last Updated",
              value: formatTimestamp(booking.updatedAt)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EscrowFlow, { bookingStatus: status, escrowStatus: escrow }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-wrap gap-2 pt-1",
              "data-ocid": "booking-detail.actions_panel",
              children: [
                isBookingProvider && status === "paymentPending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => handleAction(
                      () => actions.start.mutateAsync(booking.id),
                      "Work started! The client will be notified."
                    ),
                    disabled: actions.start.isPending,
                    className: "button-primary flex-1 sm:flex-none",
                    "data-ocid": "booking-detail.start_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 mr-1.5" }),
                      actions.start.isPending ? "Starting…" : "Mark as Started"
                    ]
                  }
                ),
                isBookingProvider && status === "started" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => handleAction(
                      () => actions.complete.mutateAsync(booking.id),
                      "Marked as complete. Awaiting client confirmation."
                    ),
                    disabled: actions.complete.isPending,
                    className: "button-primary flex-1 sm:flex-none",
                    "data-ocid": "booking-detail.provider_complete_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mr-1.5" }),
                      actions.complete.isPending ? "Completing…" : "Mark as Completed"
                    ]
                  }
                ),
                canReleaseEscrow && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => handleAction(
                      () => actions.releaseEscrow.mutateAsync(booking.id),
                      "Work confirmed! Payment released to provider."
                    ),
                    disabled: actions.releaseEscrow.isPending,
                    className: "button-primary flex-1 sm:flex-none",
                    "data-ocid": "booking-detail.release_escrow_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 mr-1.5" }),
                      actions.releaseEscrow.isPending ? "Releasing…" : "Mark as Completed"
                    ]
                  }
                ),
                isBookingClient && (status === "started" || status === "paymentPending") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => handleAction(
                      () => actions.dispute.mutateAsync(booking.id),
                      "Dispute filed. Our team will review."
                    ),
                    disabled: actions.dispute.isPending,
                    "data-ocid": "booking-detail.dispute_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 mr-1.5" }),
                      "File Dispute"
                    ]
                  }
                ),
                isBookingClient && status === "paymentPending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => handleAction(
                      () => actions.cancel.mutateAsync(booking.id),
                      "Booking cancelled."
                    ),
                    disabled: actions.cancel.isPending,
                    "data-ocid": "booking-detail.cancel_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 mr-1.5" }),
                      " Cancel Booking"
                    ]
                  }
                ),
                showRatingForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setShowRating(true),
                    "data-ocid": "booking-detail.rate_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 mr-1.5" }),
                      " Rate Service"
                    ]
                  }
                )
              ]
            }
          ),
          showRatingFormExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
            RatingForm,
            {
              bookingId: booking.id,
              onSuccess: () => setShowRating(false)
            }
          ),
          myRating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-border bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Your Rating" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: Number(myRating.stars), readonly: true, size: "md" }),
            myRating.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 leading-relaxed", children: myRating.comment })
          ] })
        ] })
      ] }),
      invoice && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "booking-detail.invoice_card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Invoice" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground mb-0.5", children: [
                "INV-",
                String(invoice.id).padStart(6, "0")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                "Invoice #",
                String(invoice.id)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-2xl font-bold font-mono text-foreground",
                "data-ocid": "booking-detail.invoice_amount",
                children: formatCurrency(invoice.amount)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "sm",
              className: "w-full",
              "data-ocid": "booking-detail.invoice_link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/invoices/$id", params: { id: String(invoice.id) }, children: "View Full Invoice →" })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function BookingDetail() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingDetailContent, {}) });
}
export {
  BookingDetail as default
};
