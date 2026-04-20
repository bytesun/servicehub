import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  Calendar,
  ExternalLink,
  Printer,
  Tag,
  User,
} from "lucide-react";
import AuthGuard from "../components/AuthGuard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { useInvoice, useService, useUserProfile } from "../hooks/useBackend";
import { formatCurrency, formatTimestamp, getCategoryInfo } from "../types";

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
      {children}
    </p>
  );
}

// ─── Info Row ─────────────────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  value,
  loading,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  loading?: boolean;
  link?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 text-muted-foreground">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        {loading ? (
          <Skeleton className="h-4 w-32 mt-0.5" />
        ) : link ? (
          <Link
            to={link}
            className="text-sm font-medium text-primary hover:underline truncate flex items-center gap-1"
          >
            {value ?? "—"}
            <ExternalLink className="w-3 h-3 shrink-0" />
          </Link>
        ) : (
          <p className="text-sm font-medium text-foreground truncate">
            {value ?? "—"}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Page Content ─────────────────────────────────────────────────────────────

function InvoiceDetailContent() {
  const { id } = useParams({ from: "/invoices/$id" });
  const invoiceId = BigInt(id);
  const { data: invoice, isLoading, isFetched } = useInvoice(invoiceId);
  const { data: service, isLoading: serviceLoading } = useService(
    invoice?.serviceId ?? null,
  );
  const { data: clientProfile, isLoading: clientLoading } = useUserProfile(
    invoice?.clientId ?? null,
  );
  const { data: providerProfile, isLoading: providerLoading } = useUserProfile(
    invoice?.providerId ?? null,
  );

  if (isLoading || !isFetched) {
    return (
      <div
        className="flex justify-center items-center py-32"
        data-ocid="invoice-detail.loading_state"
      >
        <LoadingSpinner size="lg" label="Loading invoice…" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <EmptyState
        icon="❓"
        title="Invoice not found"
        description="This invoice may not exist or you may not have access to it."
        actionLabel="Back to Invoices"
        actionHref="/invoices"
      />
    );
  }

  const categoryInfo = service ? getCategoryInfo(service.category) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Nav */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <Link
          to="/invoices"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="invoice-detail.back_link"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Invoices
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="gap-2"
          data-ocid="invoice-detail.print_button"
        >
          <Printer className="w-4 h-4" />
          Print / Download
        </Button>
      </div>

      {/* Invoice Card */}
      <Card className="shadow-subtle" data-ocid="invoice-detail.card">
        <CardContent className="p-8 flex flex-col gap-8">
          {/* Invoice Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-2">
                Invoice
              </p>
              <p
                className="text-4xl font-bold font-mono tracking-tight text-foreground leading-none"
                data-ocid="invoice-detail.invoice_number"
              >
                #{String(invoice.id).padStart(6, "0")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Date Issued
              </p>
              <p className="text-sm font-medium text-foreground">
                {formatTimestamp(invoice.createdAt)}
              </p>
            </div>
          </div>

          <Separator />

          {/* Amount hero */}
          <div className="flex flex-col items-center py-8 bg-primary/5 rounded-2xl border border-primary/15">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
              Total Amount
            </p>
            <p
              className="text-5xl font-bold font-mono tabular-nums tracking-tight text-primary leading-none"
              data-ocid="invoice-detail.total_amount"
            >
              {formatCurrency(invoice.amount)}
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              Booking #{String(invoice.bookingId).padStart(6, "0")}
            </p>
          </div>

          {/* Service Details */}
          <div>
            <SectionLabel>Service</SectionLabel>
            <div className="flex flex-col gap-3">
              <InfoRow
                icon={<Tag className="w-4 h-4" />}
                label="Service Title"
                value={service?.title}
                loading={serviceLoading}
                link={
                  service ? `/services/${String(invoice.serviceId)}` : undefined
                }
              />
              {categoryInfo && (
                <InfoRow
                  icon={<span className="text-base">{categoryInfo.icon}</span>}
                  label="Category"
                  value={categoryInfo.label}
                />
              )}
              <InfoRow
                icon={<Building2 className="w-4 h-4" />}
                label="Booking Reference"
                value={`BOOKING-${String(invoice.bookingId).padStart(6, "0")}`}
                link={`/bookings/${String(invoice.bookingId)}`}
              />
            </div>
          </div>

          <Separator />

          {/* Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <SectionLabel>Client</SectionLabel>
              <InfoRow
                icon={<User className="w-4 h-4" />}
                label="Name"
                value={clientProfile?.displayName}
                loading={clientLoading}
                link={
                  invoice.clientId
                    ? `/profile/${String(invoice.clientId)}`
                    : undefined
                }
              />
            </div>
            <div>
              <SectionLabel>Provider</SectionLabel>
              <InfoRow
                icon={<Building2 className="w-4 h-4" />}
                label="Name"
                value={providerProfile?.displayName}
                loading={providerLoading}
                link={
                  invoice.providerId
                    ? `/profile/${String(invoice.providerId)}`
                    : undefined
                }
              />
            </div>
          </div>

          <Separator />

          {/* Dates */}
          <div>
            <SectionLabel>Timeline</SectionLabel>
            <InfoRow
              icon={<Calendar className="w-4 h-4" />}
              label="Invoice Created"
              value={formatTimestamp(invoice.createdAt)}
            />
          </div>

          {/* Footer branding */}
          <div className="pt-2 text-center">
            <p className="text-[10px] text-muted-foreground">
              This invoice was generated automatically by the ServiceHub
              platform. Payments are secured by ServiceHub Escrow.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions below card */}
      <div
        className="mt-4 flex justify-center gap-3 print:hidden"
        data-ocid="invoice-detail.actions"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="gap-2"
          data-ocid="invoice-detail.print_button_bottom"
        >
          <Printer className="w-4 h-4" /> Print / Download
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link
            to="/bookings/$id"
            params={{ id: String(invoice.bookingId) }}
            data-ocid="invoice-detail.view_booking_link"
          >
            View Booking →
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function InvoiceDetail() {
  return (
    <AuthGuard>
      <InvoiceDetailContent />
    </AuthGuard>
  );
}
