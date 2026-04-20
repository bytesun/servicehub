import { c as createLucideIcon, j as jsxRuntimeExports, g as useParams, a1 as useInvoice, h as useService, o as useUserProfile, k as LoadingSpinner, L as Link, B as Button, n as Separator } from "./index-BJQw-dZb.js";
import { C as Card, a as CardContent } from "./card-DJwG1xfA.js";
import { S as Skeleton } from "./skeleton-l7FOGfhk.js";
import { A as AuthGuard } from "./AuthGuard-ODJ9Wg5N.js";
import { E as EmptyState } from "./EmptyState-ilxOlh8N.js";
import { g as getCategoryInfo, a as formatTimestamp, f as formatCurrency } from "./types-CFG00yAA.js";
import { A as ArrowLeft } from "./arrow-left-Byg1VtFE.js";
import { U as User } from "./user-C4s_Swch.js";
import { C as Calendar } from "./calendar-OhfRUxPl.js";
import { E as ExternalLink } from "./external-link-t3TBpq6y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$2);
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
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3", children });
}
function InfoRow({
  icon,
  label,
  value,
  loading,
  link
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 text-muted-foreground", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: label }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32 mt-0.5" }) : link ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: link,
          className: "text-sm font-medium text-primary hover:underline truncate flex items-center gap-1",
          children: [
            value ?? "—",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 shrink-0" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: value ?? "—" })
    ] })
  ] });
}
function InvoiceDetailContent() {
  const { id } = useParams({ from: "/invoices/$id" });
  const invoiceId = BigInt(id);
  const { data: invoice, isLoading, isFetched } = useInvoice(invoiceId);
  const { data: service, isLoading: serviceLoading } = useService(
    (invoice == null ? void 0 : invoice.serviceId) ?? null
  );
  const { data: clientProfile, isLoading: clientLoading } = useUserProfile(
    (invoice == null ? void 0 : invoice.clientId) ?? null
  );
  const { data: providerProfile, isLoading: providerLoading } = useUserProfile(
    (invoice == null ? void 0 : invoice.providerId) ?? null
  );
  if (isLoading || !isFetched) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex justify-center items-center py-32",
        "data-ocid": "invoice-detail.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading invoice…" })
      }
    );
  }
  if (!invoice) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "❓",
        title: "Invoice not found",
        description: "This invoice may not exist or you may not have access to it.",
        actionLabel: "Back to Invoices",
        actionHref: "/invoices"
      }
    );
  }
  const categoryInfo = service ? getCategoryInfo(service.category) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 print:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/invoices",
          className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "invoice-detail.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Invoices"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => window.print(),
          className: "gap-2",
          "data-ocid": "invoice-detail.print_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
            "Print / Download"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-subtle", "data-ocid": "invoice-detail.card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 flex flex-col gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-widest mb-2", children: "Invoice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-4xl font-bold font-mono tracking-tight text-foreground leading-none",
              "data-ocid": "invoice-detail.invoice_number",
              children: [
                "#",
                String(invoice.id).padStart(6, "0")
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-1", children: "Date Issued" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: formatTimestamp(invoice.createdAt) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-8 bg-primary/5 rounded-2xl border border-primary/15", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-2", children: "Total Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-5xl font-bold font-mono tabular-nums tracking-tight text-primary leading-none",
            "data-ocid": "invoice-detail.total_amount",
            children: formatCurrency(invoice.amount)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3", children: [
          "Booking #",
          String(invoice.bookingId).padStart(6, "0")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-4 h-4" }),
              label: "Service Title",
              value: service == null ? void 0 : service.title,
              loading: serviceLoading,
              link: service ? `/services/${String(invoice.serviceId)}` : void 0
            }
          ),
          categoryInfo && /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: categoryInfo.icon }),
              label: "Category",
              value: categoryInfo.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
              label: "Booking Reference",
              value: `BOOKING-${String(invoice.bookingId).padStart(6, "0")}`,
              link: `/bookings/${String(invoice.bookingId)}`
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Client" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
              label: "Name",
              value: clientProfile == null ? void 0 : clientProfile.displayName,
              loading: clientLoading,
              link: invoice.clientId ? `/profile/${String(invoice.clientId)}` : void 0
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Provider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
              label: "Name",
              value: providerProfile == null ? void 0 : providerProfile.displayName,
              loading: providerLoading,
              link: invoice.providerId ? `/profile/${String(invoice.providerId)}` : void 0
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Timeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
            label: "Invoice Created",
            value: formatTimestamp(invoice.createdAt)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "This invoice was generated automatically by the ServiceHub platform. Payments are secured by ServiceHub Escrow." }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mt-4 flex justify-center gap-3 print:hidden",
        "data-ocid": "invoice-detail.actions",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => window.print(),
              className: "gap-2",
              "data-ocid": "invoice-detail.print_button_bottom",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-4 h-4" }),
                " Print / Download"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/bookings/$id",
              params: { id: String(invoice.bookingId) },
              "data-ocid": "invoice-detail.view_booking_link",
              children: "View Booking →"
            }
          ) })
        ]
      }
    )
  ] });
}
function InvoiceDetail() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceDetailContent, {}) });
}
export {
  InvoiceDetail as default
};
