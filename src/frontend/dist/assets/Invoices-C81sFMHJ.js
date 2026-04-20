import { c as createLucideIcon, j as jsxRuntimeExports, a as useAuth, _ as useMyClientInvoices, $ as useMyProviderInvoices, a0 as ShoppingBag, w as Briefcase, L as Link, h as useService, o as useUserProfile } from "./index-BJQw-dZb.js";
import { B as Badge } from "./badge-DWGdRvla.js";
import { C as Card, a as CardContent } from "./card-DJwG1xfA.js";
import { S as Skeleton } from "./skeleton-l7FOGfhk.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-HRjyVvBX.js";
import { A as AuthGuard } from "./AuthGuard-ODJ9Wg5N.js";
import { E as EmptyState } from "./EmptyState-ilxOlh8N.js";
import { a as formatTimestamp, f as formatCurrency } from "./types-CFG00yAA.js";
import { A as ArrowRight } from "./arrow-right-CYMntHeN.js";
import "./index-B1k2S2C4.js";
import "./index-B9jclvFD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode);
function ServiceName({ serviceId }) {
  const { data: service, isLoading } = useService(serviceId);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "inline-block h-3.5 w-28 rounded-sm" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (service == null ? void 0 : service.title) ?? "—" });
}
function CounterpartyName({ userId }) {
  const { data: profile, isLoading } = useUserProfile(userId);
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "inline-block h-3 w-24 rounded-sm" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (profile == null ? void 0 : profile.displayName) ?? "—" });
}
function InvoiceRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-xl shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-36" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20" })
  ] }) }) });
}
function InvoiceRow({
  inv,
  index,
  perspective
}) {
  const counterpartyId = perspective === "client" ? inv.providerId : inv.clientId;
  const counterpartyLabel = perspective === "client" ? "Provider" : "Client";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/invoices/$id",
      params: { id: String(inv.id) },
      "data-ocid": `invoice.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:shadow-md hover:border-primary/30 transition-smooth group cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-muted-foreground tracking-wide", children: [
              "INV-",
              String(inv.id).padStart(6, "0")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] py-0 px-1.5 h-4",
                children: "Paid"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-0.5 truncate", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceName, { serviceId: inv.serviceId }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground flex items-center gap-1 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              counterpartyLabel,
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CounterpartyName, { userId: counterpartyId }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTimestamp(inv.createdAt) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-lg font-bold font-mono-amount text-foreground tabular-nums",
              "data-ocid": `invoice.amount.${index + 1}`,
              children: formatCurrency(inv.amount)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-smooth" })
        ] })
      ] }) }) })
    }
  );
}
function InvoiceList({
  invoices,
  isLoading,
  perspective
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "invoice.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceRowSkeleton, {}, i)) });
  }
  if (invoices.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "🧾",
        title: "No invoices yet",
        description: perspective === "client" ? "Invoices are auto-generated when bookings are completed." : "Invoices appear here once clients complete their bookings.",
        actionLabel: perspective === "client" ? "Browse Services" : "View Dashboard",
        actionHref: perspective === "client" ? "/services" : "/dashboard"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex flex-col gap-3",
      "data-ocid": `invoice.list.${perspective}`,
      children: invoices.map((inv, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        InvoiceRow,
        {
          inv,
          index: i,
          perspective
        },
        String(inv.id)
      ))
    }
  );
}
function InvoicesContent() {
  const { isProvider } = useAuth();
  const { data: clientInvoices = [], isLoading: clientLoading } = useMyClientInvoices();
  const { data: providerInvoices = [], isLoading: providerLoading } = useMyProviderInvoices();
  const defaultTab = isProvider ? "provider" : "client";
  const primaryInvoices = isProvider ? providerInvoices : clientInvoices;
  const totalCents = primaryInvoices.reduce((s, i) => s + Number(i.amount), 0);
  const totalAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(totalCents / 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground mb-1", children: "Invoices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Financial records for all your completed bookings" })
      ] }),
      primaryInvoices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "hidden sm:block p-4 rounded-xl bg-card border border-border shadow-subtle text-right",
          "data-ocid": "invoices.summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Total Volume" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-mono-amount text-foreground tabular-nums", children: totalAmount }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              primaryInvoices.length,
              " invoice",
              primaryInvoices.length !== 1 ? "s" : ""
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: defaultTab, "data-ocid": "invoice.tab", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "client",
            className: "gap-2",
            "data-ocid": "invoice.tab.client",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3.5 h-3.5" }),
              "As Client",
              clientInvoices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 font-mono", children: clientInvoices.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: "provider",
            className: "gap-2",
            "data-ocid": "invoice.tab.provider",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-3.5 h-3.5" }),
              "As Provider",
              providerInvoices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 font-mono", children: providerInvoices.length })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "client", "data-ocid": "invoice.tab.client-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        InvoiceList,
        {
          invoices: clientInvoices,
          isLoading: clientLoading,
          perspective: "client"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "provider", "data-ocid": "invoice.tab.provider-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        InvoiceList,
        {
          invoices: providerInvoices,
          isLoading: providerLoading,
          perspective: "provider"
        }
      ) })
    ] })
  ] });
}
function Invoices() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InvoicesContent, {}) });
}
export {
  Invoices as default
};
