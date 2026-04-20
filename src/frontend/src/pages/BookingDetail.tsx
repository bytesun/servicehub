import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  ExternalLink,
  FileText,
  Lock,
  Play,
  Shield,
  Star,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AuthGuard from "../components/AuthGuard";
import BookingStatusBadge from "../components/BookingStatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import RatingForm from "../components/RatingForm";
import StarRating from "../components/StarRating";
import UserAvatar from "../components/UserAvatar";
import { useAuth } from "../hooks/useAuth";
import {
  useBooking,
  useBookingAction,
  useInvoiceByBooking,
  useService,
  useServiceRatings,
  useUserProfile,
} from "../hooks/useBackend";
import { formatCurrency, formatTimestamp } from "../types";

// ─── Escrow progress steps ────────────────────────────────────────────────────

const ESCROW_STEPS = [
  { key: "paymentPending", label: "Booking Created" },
  { key: "started", label: "Provider Works" },
  { key: "completed", label: "Work Delivered" },
  { key: "released", label: "Escrow Released" },
] as const;

function getActiveStep(bookingStatus: string, escrowStatus: string): number {
  if (escrowStatus === "released") return 3;
  if (bookingStatus === "completed") return 2;
  if (bookingStatus === "started") return 1;
  return 0;
}

function EscrowFlow({
  bookingStatus,
  escrowStatus,
}: {
  bookingStatus: string;
  escrowStatus: string;
}) {
  const activeStep = getActiveStep(bookingStatus, escrowStatus);
  return (
    <div
      className="p-4 rounded-xl bg-primary/5 border border-primary/15"
      data-ocid="booking-detail.escrow_flow"
    >
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-4 h-4 text-primary shrink-0" />
        <span className="text-sm font-semibold text-foreground">
          Escrow Protection
        </span>
        <span className="ml-auto text-xs font-mono text-muted-foreground capitalize">
          {escrowStatus}
        </span>
      </div>
      <div className="flex items-center gap-0">
        {ESCROW_STEPS.map((step, i) => {
          const done = i <= activeStep;
          const current = i === activeStep;
          return (
            <div key={step.key} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-smooth ${
                    done
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 text-muted-foreground border border-border"
                  } ${current ? "ring-2 ring-primary/30 ring-offset-1 ring-offset-background" : ""}`}
                >
                  {done ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span
                  className={`text-[10px] text-center leading-tight hidden sm:block ${done ? "text-primary font-medium" : "text-muted-foreground"}`}
                >
                  {step.label}
                </span>
              </div>
              {i < ESCROW_STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-1 shrink transition-smooth ${i < activeStep ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Detail row ───────────────────────────────────────────────────────────────

function DetailRow({
  label,
  value,
}: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4">
      <span className="text-xs text-muted-foreground uppercase tracking-wide w-28 shrink-0">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

// ─── Party Card ───────────────────────────────────────────────────────────────

function PartyCard({
  label,
  displayName,
  userId,
}: {
  label: "Client" | "Provider";
  displayName: string | undefined;
  userId: string;
}) {
  return (
    <Link
      to="/profile/$userId"
      params={{ userId }}
      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-smooth group"
      data-ocid={`booking-detail.${label.toLowerCase()}_profile_link`}
    >
      <UserAvatar name={displayName ?? label} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-medium text-foreground truncate">
          {displayName ?? "Loading…"}
        </p>
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-smooth shrink-0" />
    </Link>
  );
}

// ─── Main content ─────────────────────────────────────────────────────────────

function BookingDetailContent() {
  const { id } = useParams({ from: "/bookings/$id" });
  const navigate = useNavigate();
  const bookingId = BigInt(id);

  const { user, isClient, actorReady, isFetched: authFetched } = useAuth();

  const {
    data: booking,
    isLoading: bookingLoading,
    isFetched: bookingFetched,
  } = useBooking(bookingId);

  const myId = user?.id?.toString();

  // Access check: only participants can view the booking
  const isParticipant =
    !booking ||
    myId === String(booking.clientId) ||
    myId === String(booking.providerId);

  const { data: service } = useService(booking?.serviceId ?? null);
  const { data: clientProfile } = useUserProfile(booking?.clientId ?? null);
  const { data: providerProfile } = useUserProfile(booking?.providerId ?? null);
  const { data: invoice } = useInvoiceByBooking(bookingId);
  const { data: ratings } = useServiceRatings(booking?.serviceId ?? null);

  const actions = useBookingAction();
  const [showRating, setShowRating] = useState(false);

  // Wait for actor to be ready AND auth to be fetched AND booking query to complete
  const isLoading =
    !actorReady || !authFetched || bookingLoading || !bookingFetched;

  if (isLoading) {
    return (
      <div
        className="flex justify-center py-20"
        data-ocid="booking-detail.loading_state"
      >
        <LoadingSpinner size="lg" label="Loading booking…" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-20 text-center"
        data-ocid="booking-detail.error_state"
      >
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display font-bold text-xl text-foreground mb-2">
          Booking not found
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          This booking may have been removed or doesn't exist.
        </p>
        <button
          type="button"
          onClick={() =>
            navigate({ to: isClient ? "/client-dashboard" : "/dashboard" })
          }
          className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  if (!isParticipant) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-20 text-center"
        data-ocid="booking-detail.access_denied_state"
      >
        <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display font-bold text-xl text-foreground mb-2">
          Access Denied
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          You are not a party to this booking.
        </p>
        <button
          type="button"
          onClick={() =>
            navigate({ to: isClient ? "/client-dashboard" : "/dashboard" })
          }
          className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Dashboard
        </button>
      </div>
    );
  }

  const status = booking.bookingStatus;
  const escrow = booking.escrowStatus;

  const isBookingClient = myId === String(booking.clientId);
  const isBookingProvider = myId === String(booking.providerId);

  const myRating = ratings?.find(
    (r) => r.bookingId === bookingId && r.clientId.toString() === myId,
  );

  const handleAction = async (
    action: () => Promise<unknown>,
    successMsg: string,
  ) => {
    try {
      await action();
      toast.success(successMsg);
    } catch {
      toast.error("Action failed. Please try again.");
    }
  };

  const showRatingForm =
    isBookingClient && status === "completed" && !myRating && !showRating;
  const showRatingFormExpanded =
    isBookingClient && status === "completed" && !myRating && showRating;

  // Client can release escrow (confirm work received) when status=started or completed with escrow still held
  const canReleaseEscrow =
    isBookingClient &&
    escrow === "held" &&
    (status === "started" || status === "completed");

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        type="button"
        onClick={() =>
          navigate({ to: isClient ? "/client-dashboard" : "/dashboard" })
        }
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        data-ocid="booking-detail.back_link"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="flex flex-col gap-5">
        {/* Header Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  BOOKING-{String(booking.id).padStart(6, "0")}
                </p>
                <CardTitle
                  className="font-display text-xl leading-tight"
                  data-ocid="booking-detail.page"
                >
                  {service?.title ?? "Service Booking"}
                </CardTitle>
              </div>
              <BookingStatusBadge status={status} className="shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Created {formatTimestamp(booking.createdAt)}
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            {/* Price */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Agreed Price
                </p>
                <p
                  className="text-3xl font-bold font-mono text-foreground tracking-tight"
                  data-ocid="booking-detail.price"
                >
                  {formatCurrency(booking.agreedPrice)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Parties with profile links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <PartyCard
                label="Client"
                displayName={clientProfile?.displayName}
                userId={String(booking.clientId)}
              />
              <PartyCard
                label="Provider"
                displayName={providerProfile?.displayName}
                userId={String(booking.providerId)}
              />
            </div>

            <Separator />

            <DetailRow
              label="Last Updated"
              value={formatTimestamp(booking.updatedAt)}
            />

            {/* Escrow flow */}
            <EscrowFlow bookingStatus={status} escrowStatus={escrow} />

            {/* Action buttons */}
            <div
              className="flex flex-wrap gap-2 pt-1"
              data-ocid="booking-detail.actions_panel"
            >
              {/* Provider: start work when payment pending */}
              {isBookingProvider && status === "paymentPending" && (
                <Button
                  onClick={() =>
                    handleAction(
                      () => actions.start.mutateAsync(booking.id),
                      "Work started! The client will be notified.",
                    )
                  }
                  disabled={actions.start.isPending}
                  className="button-primary flex-1 sm:flex-none"
                  data-ocid="booking-detail.start_button"
                >
                  <Play className="w-4 h-4 mr-1.5" />
                  {actions.start.isPending ? "Starting…" : "Mark as Started"}
                </Button>
              )}

              {/* Provider: mark as complete when work is started */}
              {isBookingProvider && status === "started" && (
                <Button
                  onClick={() =>
                    handleAction(
                      () => actions.complete.mutateAsync(booking.id),
                      "Marked as complete. Awaiting client confirmation.",
                    )
                  }
                  disabled={actions.complete.isPending}
                  className="button-primary flex-1 sm:flex-none"
                  data-ocid="booking-detail.provider_complete_button"
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  {actions.complete.isPending
                    ? "Completing…"
                    : "Mark as Completed"}
                </Button>
              )}

              {/* Client: confirm work done / release escrow */}
              {canReleaseEscrow && (
                <Button
                  onClick={() =>
                    handleAction(
                      () => actions.releaseEscrow.mutateAsync(booking.id),
                      "Work confirmed! Payment released to provider.",
                    )
                  }
                  disabled={actions.releaseEscrow.isPending}
                  className="button-primary flex-1 sm:flex-none"
                  data-ocid="booking-detail.release_escrow_button"
                >
                  <Shield className="w-4 h-4 mr-1.5" />
                  {actions.releaseEscrow.isPending
                    ? "Releasing…"
                    : "Mark as Completed"}
                </Button>
              )}

              {/* Client: file dispute */}
              {isBookingClient &&
                (status === "started" || status === "paymentPending") && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleAction(
                        () => actions.dispute.mutateAsync(booking.id),
                        "Dispute filed. Our team will review.",
                      )
                    }
                    disabled={actions.dispute.isPending}
                    data-ocid="booking-detail.dispute_button"
                  >
                    <AlertTriangle className="w-4 h-4 mr-1.5" />
                    File Dispute
                  </Button>
                )}

              {/* Client: cancel booking when still pending */}
              {isBookingClient && status === "paymentPending" && (
                <Button
                  variant="outline"
                  onClick={() =>
                    handleAction(
                      () => actions.cancel.mutateAsync(booking.id),
                      "Booking cancelled.",
                    )
                  }
                  disabled={actions.cancel.isPending}
                  data-ocid="booking-detail.cancel_button"
                >
                  <XCircle className="w-4 h-4 mr-1.5" /> Cancel Booking
                </Button>
              )}

              {/* Client: rate service button (opens inline form) */}
              {showRatingForm && (
                <Button
                  variant="outline"
                  onClick={() => setShowRating(true)}
                  data-ocid="booking-detail.rate_button"
                >
                  <Star className="w-4 h-4 mr-1.5" /> Rate Service
                </Button>
              )}
            </div>

            {/* Inline rating form */}
            {showRatingFormExpanded && (
              <RatingForm
                bookingId={booking.id}
                onSuccess={() => setShowRating(false)}
              />
            )}

            {/* Existing rating display */}
            {myRating && (
              <div className="p-4 rounded-xl border border-border bg-muted/20">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Your Rating
                </p>
                <StarRating value={Number(myRating.stars)} readonly size="md" />
                {myRating.comment && (
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {myRating.comment}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invoice Card — shown when booking is completed and invoice exists */}
        {invoice && (
          <Card data-ocid="booking-detail.invoice_card">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <CardTitle className="font-display text-base">
                  Invoice
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-mono text-muted-foreground mb-0.5">
                    INV-{String(invoice.id).padStart(6, "0")}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Invoice #{String(invoice.id)}
                  </p>
                </div>
                <p
                  className="text-2xl font-bold font-mono text-foreground"
                  data-ocid="booking-detail.invoice_amount"
                >
                  {formatCurrency(invoice.amount)}
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full"
                data-ocid="booking-detail.invoice_link"
              >
                <Link to="/invoices/$id" params={{ id: String(invoice.id) }}>
                  View Full Invoice →
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function BookingDetail() {
  return (
    <AuthGuard>
      <BookingDetailContent />
    </AuthGuard>
  );
}
