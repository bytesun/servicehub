import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Receipt, ShoppingBag } from "lucide-react";
import AuthGuard from "../components/AuthGuard";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../hooks/useAuth";
import {
  useMyClientInvoices,
  useMyProviderInvoices,
  useService,
  useUserProfile,
} from "../hooks/useBackend";
import type { InvoiceView, ServiceId, UserId } from "../types";
import { formatCurrency, formatTimestamp } from "../types";

// ─── Sub-resolvers ────────────────────────────────────────────────────────────

function ServiceName({ serviceId }: { serviceId: ServiceId }) {
  const { data: service, isLoading } = useService(serviceId);
  if (isLoading)
    return <Skeleton className="inline-block h-3.5 w-28 rounded-sm" />;
  return <span>{service?.title ?? "—"}</span>;
}

function CounterpartyName({ userId }: { userId: UserId }) {
  const { data: profile, isLoading } = useUserProfile(userId);
  if (isLoading)
    return <Skeleton className="inline-block h-3 w-24 rounded-sm" />;
  return <span>{profile?.displayName ?? "—"}</span>;
}

// ─── Invoice Skeleton Row ─────────────────────────────────────────────────────

function InvoiceRowSkeleton() {
  return (
    <Card className="border border-border bg-card">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-36" />
          </div>
          <Skeleton className="h-7 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Invoice Row ──────────────────────────────────────────────────────────────

function InvoiceRow({
  inv,
  index,
  perspective,
}: {
  inv: InvoiceView;
  index: number;
  perspective: "client" | "provider";
}) {
  const counterpartyId =
    perspective === "client" ? inv.providerId : inv.clientId;
  const counterpartyLabel = perspective === "client" ? "Provider" : "Client";

  return (
    <Link
      to="/invoices/$id"
      params={{ id: String(inv.id) }}
      data-ocid={`invoice.item.${index + 1}`}
    >
      <Card className="hover:shadow-md hover:border-primary/30 transition-smooth group cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Receipt className="w-5 h-5 text-primary" />
            </div>

            {/* Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-muted-foreground tracking-wide">
                  INV-{String(inv.id).padStart(6, "0")}
                </span>
                <Badge
                  variant="secondary"
                  className="text-[10px] py-0 px-1.5 h-4"
                >
                  Paid
                </Badge>
              </div>
              <p className="text-sm font-semibold text-foreground mb-0.5 truncate">
                <ServiceName serviceId={inv.serviceId} />
              </p>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1 flex-wrap">
                <span>{counterpartyLabel}:</span>
                <span className="font-medium text-foreground/80">
                  <CounterpartyName userId={counterpartyId} />
                </span>
                <span className="text-muted-foreground/50">·</span>
                <span>{formatTimestamp(inv.createdAt)}</span>
              </p>
            </div>

            {/* Amount + Arrow */}
            <div className="flex items-center gap-3 shrink-0">
              <p
                className="text-lg font-bold font-mono-amount text-foreground tabular-nums"
                data-ocid={`invoice.amount.${index + 1}`}
              >
                {formatCurrency(inv.amount)}
              </p>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-smooth" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ─── Invoice List ─────────────────────────────────────────────────────────────

function InvoiceList({
  invoices,
  isLoading,
  perspective,
}: {
  invoices: InvoiceView[];
  isLoading: boolean;
  perspective: "client" | "provider";
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3" data-ocid="invoice.loading_state">
        {[1, 2, 3].map((i) => (
          <InvoiceRowSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <EmptyState
        icon="🧾"
        title="No invoices yet"
        description={
          perspective === "client"
            ? "Invoices are auto-generated when bookings are completed."
            : "Invoices appear here once clients complete their bookings."
        }
        actionLabel={
          perspective === "client" ? "Browse Services" : "View Dashboard"
        }
        actionHref={perspective === "client" ? "/services" : "/dashboard"}
      />
    );
  }

  return (
    <div
      className="flex flex-col gap-3"
      data-ocid={`invoice.list.${perspective}`}
    >
      {invoices.map((inv, i) => (
        <InvoiceRow
          key={String(inv.id)}
          inv={inv}
          index={i}
          perspective={perspective}
        />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function InvoicesContent() {
  const { isProvider } = useAuth();
  const { data: clientInvoices = [], isLoading: clientLoading } =
    useMyClientInvoices();
  const { data: providerInvoices = [], isLoading: providerLoading } =
    useMyProviderInvoices();

  const defaultTab = isProvider ? "provider" : "client";
  const primaryInvoices = isProvider ? providerInvoices : clientInvoices;
  const totalCents = primaryInvoices.reduce((s, i) => s + Number(i.amount), 0);
  const totalAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalCents / 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-1">
            Invoices
          </h1>
          <p className="text-muted-foreground text-sm">
            Financial records for all your completed bookings
          </p>
        </div>

        {primaryInvoices.length > 0 && (
          <div
            className="hidden sm:block p-4 rounded-xl bg-card border border-border shadow-subtle text-right"
            data-ocid="invoices.summary"
          >
            <p className="text-xs text-muted-foreground mb-0.5">Total Volume</p>
            <p className="text-2xl font-bold font-mono-amount text-foreground tabular-nums">
              {totalAmount}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {primaryInvoices.length} invoice
              {primaryInvoices.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue={defaultTab} data-ocid="invoice.tab">
        <TabsList className="mb-6">
          <TabsTrigger
            value="client"
            className="gap-2"
            data-ocid="invoice.tab.client"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            As Client
            {clientInvoices.length > 0 && (
              <span className="text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 font-mono">
                {clientInvoices.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="provider"
            className="gap-2"
            data-ocid="invoice.tab.provider"
          >
            <Briefcase className="w-3.5 h-3.5" />
            As Provider
            {providerInvoices.length > 0 && (
              <span className="text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 font-mono">
                {providerInvoices.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="client" data-ocid="invoice.tab.client-panel">
          <InvoiceList
            invoices={clientInvoices}
            isLoading={clientLoading}
            perspective="client"
          />
        </TabsContent>

        <TabsContent value="provider" data-ocid="invoice.tab.provider-panel">
          <InvoiceList
            invoices={providerInvoices}
            isLoading={providerLoading}
            perspective="provider"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Invoices() {
  return (
    <AuthGuard>
      <InvoicesContent />
    </AuthGuard>
  );
}
