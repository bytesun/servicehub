import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  CreditCard,
  FileText,
  Image as ImageIcon,
  MapPin,
  MessageSquare,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AuthGuard from "../components/AuthGuard";
import BookingStatusBadge from "../components/BookingStatusBadge";
import EmptyState from "../components/EmptyState";
import QuoteStatusBadge from "../components/QuoteStatusBadge";
import RatingForm from "../components/RatingForm";
import { useAuth } from "../hooks/useAuth";
import {
  useAcceptQuote,
  useBookingAction,
  useCancelQuote,
  useCreateBooking,
  useInvoiceByBooking,
  useListServices,
  useMyClientBookings,
  useMyClientQuotes,
  useRejectQuote,
  useUserProfile,
} from "../hooks/useBackend";
import type { BookingId, BookingView, QuoteView, UserId } from "../types";
import { formatCurrency, formatTimestamp } from "../types";

// ─── Provider Name ────────────────────────────────────────────────────────────

function ProviderName({ providerId }: { providerId: UserId }) {
  const { data: profile, isLoading } = useUserProfile(providerId);
  if (isLoading)
    return <span className="text-xs text-muted-foreground">Loading…</span>;
  return (
    <Link
      to="/profile/$userId"
      params={{ userId: providerId.toString() }}
      className="text-xs text-primary hover:underline truncate"
      onClick={(e) => e.stopPropagation()}
    >
      {profile?.displayName ?? "Unknown provider"}
    </Link>
  );
}

// ─── Attachment Thumbnails ────────────────────────────────────────────────────

function AttachmentThumbnails({
  attachments,
  quoteId,
}: { attachments: string[]; quoteId: string }) {
  if (!attachments || attachments.length === 0) return null;
  const visible = attachments.slice(0, 4);
  const overflow = attachments.length - 4;

  return (
    <div className="flex items-center gap-2 mt-2 flex-wrap">
      {visible.map((url, i) => (
        <div
          key={url}
          className="w-10 h-10 rounded-md overflow-hidden border border-border bg-muted/40 shrink-0"
          data-ocid={`quotes.attachment.${quoteId}.${i + 1}`}
        >
          <img
            src={url}
            alt={`Attachment ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {overflow > 0 && (
        <div className="w-10 h-10 rounded-md border border-border bg-muted/40 flex items-center justify-center shrink-0">
          <span className="text-xs font-semibold text-muted-foreground">
            +{overflow}
          </span>
        </div>
      )}
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        <ImageIcon className="w-3 h-3" />
        {attachments.length} photo{attachments.length !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

// ─── Reply Preview ────────────────────────────────────────────────────────────

function ReplyTypeLabel({ replyType }: { replyType?: string }) {
  if (!replyType) return null;
  if (replyType === "onSiteEstimate") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
        <MapPin className="w-3 h-3" /> On-site estimate
      </span>
    );
  }
  if (replyType === "detailedEstimate") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
        Detailed estimate
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
      <MessageSquare className="w-3 h-3" /> Message only
    </span>
  );
}

// ─── Invoice Link for Booking ─────────────────────────────────────────────────

function BookingInvoiceLink({ bookingId }: { bookingId: BookingId }) {
  const { data: invoice, isLoading } = useInvoiceByBooking(bookingId);
  if (isLoading) return null;
  if (!invoice) return null;
  return (
    <Link
      to="/invoices/$id"
      params={{ id: String(invoice.id) }}
      className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
      onClick={(e) => e.stopPropagation()}
      data-ocid={`bookings.invoice_link.${String(bookingId)}`}
    >
      <FileText className="w-3.5 h-3.5" />
      View Invoice
    </Link>
  );
}

// ─── Quote Row ────────────────────────────────────────────────────────────────

function QuoteRow({
  quote,
  serviceTitle,
}: { quote: QuoteView; serviceTitle: string }) {
  const acceptQuote = useAcceptQuote();
  const rejectQuote = useRejectQuote();
  const cancelQuote = useCancelQuote();
  const createBooking = useCreateBooking();

  const handleAccept = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await acceptQuote.mutateAsync(quote.id);
      toast.success("Quote accepted!");
    } catch {
      toast.error("Failed to accept quote.");
    }
  };

  const handleDecline = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await rejectQuote.mutateAsync(quote.id);
      toast.success("Quote declined.");
    } catch {
      toast.error("Failed to decline quote.");
    }
  };

  const handleCancel = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await cancelQuote.mutateAsync(quote.id);
      toast.success("Quote request cancelled.");
    } catch {
      toast.error("Failed to cancel quote.");
    }
  };

  const handleCreateBooking = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await createBooking.mutateAsync(quote.id);
      toast.success("Booking created! Payment is now pending.");
    } catch {
      toast.error("Failed to create booking.");
    }
  };

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-card hover:bg-muted/20 transition-smooth"
      data-ocid={`quotes.item.${String(quote.id)}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {serviceTitle}
          </p>
          <ProviderName providerId={quote.providerId} />
          <p className="text-xs text-foreground/80 mt-1 line-clamp-2 leading-snug">
            {quote.requirements}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatTimestamp(quote.createdAt)}
          </p>
          <AttachmentThumbnails
            attachments={quote.attachments}
            quoteId={String(quote.id)}
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <QuoteStatusBadge status={quote.status} />
          <Link
            to="/quotes/$id"
            params={{ id: String(quote.id) }}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="View quote details"
            data-ocid={`quotes.link.${String(quote.id)}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Provider reply preview for replied quotes */}
      {quote.status === "replied" && (
        <div className="flex flex-col gap-2 p-3 rounded-md bg-muted/40 border border-border">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <ReplyTypeLabel replyType={quote.replyType} />
            {quote.proposedPrice !== undefined ? (
              <span className="text-base font-bold font-mono text-foreground">
                {formatCurrency(quote.proposedPrice)}
              </span>
            ) : quote.replyType === "onSiteEstimate" ? (
              <span className="text-xs text-muted-foreground">
                Price determined on-site
              </span>
            ) : null}
          </div>
          {quote.proposedTimeline && (
            <p className="text-xs text-muted-foreground">
              Timeline:{" "}
              <span className="text-foreground">{quote.proposedTimeline}</span>
            </p>
          )}
          {quote.replyMessage && (
            <p className="text-xs text-foreground italic line-clamp-2">
              "{quote.replyMessage}"
            </p>
          )}
          <div className="flex gap-2 mt-1">
            <Button
              size="sm"
              className="button-primary flex-1"
              onClick={handleAccept}
              disabled={acceptQuote.isPending}
              data-ocid={`quotes.accept_button.${String(quote.id)}`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              {acceptQuote.isPending ? "Accepting…" : "Accept"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={handleDecline}
              disabled={rejectQuote.isPending}
              data-ocid={`quotes.reject_button.${String(quote.id)}`}
            >
              <XCircle className="w-3.5 h-3.5 mr-1" />
              {rejectQuote.isPending ? "Declining…" : "Decline"}
            </Button>
          </div>
        </div>
      )}

      {/* Create Booking for accepted quotes */}
      {quote.status === "accepted" && (
        <Button
          size="sm"
          className="button-primary self-start gap-1.5"
          onClick={handleCreateBooking}
          disabled={createBooking.isPending}
          data-ocid={`quotes.create_booking_button.${String(quote.id)}`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          {createBooking.isPending ? "Creating Booking…" : "Create Booking"}
        </Button>
      )}

      {/* Cancel for pending quotes */}
      {quote.status === "pending" && (
        <Button
          size="sm"
          variant="outline"
          className="self-start text-muted-foreground hover:text-destructive hover:border-destructive/40"
          onClick={handleCancel}
          disabled={cancelQuote.isPending}
          data-ocid={`quotes.cancel_button.${String(quote.id)}`}
        >
          {cancelQuote.isPending ? "Cancelling…" : "Cancel Request"}
        </Button>
      )}
    </div>
  );
}

// ─── Quotes Tab ───────────────────────────────────────────────────────────────

function QuotesTab({
  quotes,
  isLoading,
  serviceTitleMap,
}: {
  quotes: QuoteView[];
  isLoading: boolean;
  serviceTitleMap: Record<string, string>;
}) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3" data-ocid="quotes.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div data-ocid="quotes.empty_state">
        <EmptyState
          icon={<MessageSquare className="w-7 h-7 text-muted-foreground" />}
          title="No quote requests yet"
          description="Find a service you need and request a custom quote from a provider."
          actionLabel="Browse Services"
          onAction={() => navigate({ to: "/services" })}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3" data-ocid="quotes.list">
      {quotes.map((q) => (
        <QuoteRow
          key={String(q.id)}
          quote={q}
          serviceTitle={
            serviceTitleMap[String(q.serviceId)] ??
            `Service #${String(q.serviceId)}`
          }
        />
      ))}
    </div>
  );
}

// ─── Booking Row ──────────────────────────────────────────────────────────────

function BookingRow({
  booking,
  serviceTitle,
  onRatingPrompt,
}: {
  booking: BookingView;
  serviceTitle: string;
  onRatingPrompt: (bookingId: BookingId) => void;
}) {
  const { complete, releaseEscrow } = useBookingAction();

  const handleMarkCompleted = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await complete.mutateAsync(booking.id);
      toast.success("Booking marked as completed!");
      onRatingPrompt(booking.id);
    } catch {
      toast.error("Failed to mark as completed.");
    }
  };

  const handleReleaseEscrow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await releaseEscrow.mutateAsync(booking.id);
      toast.success("Payment released to provider!");
      onRatingPrompt(booking.id);
    } catch {
      toast.error("Failed to release payment.");
    }
  };

  const isStarted = booking.bookingStatus === "started";
  const isCompleted = booking.bookingStatus === "completed";
  const escrowHeld = booking.escrowStatus === "held";

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-card hover:bg-muted/20 transition-smooth"
      data-ocid={`bookings.item.${String(booking.id)}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {serviceTitle}
          </p>
          <ProviderName providerId={booking.providerId} />
          <p className="text-xs font-semibold text-foreground mt-1 font-mono">
            {formatCurrency(booking.agreedPrice)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Updated {formatTimestamp(booking.updatedAt)}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <BookingStatusBadge status={booking.bookingStatus} />
          <Link
            to="/bookings/$id"
            params={{ id: String(booking.id) }}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="View booking details"
            data-ocid={`bookings.link.${String(booking.id)}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Actions row */}
      <div className="flex flex-wrap gap-2">
        {/* Mark Completed for started bookings */}
        {isStarted && (
          <Button
            size="sm"
            className="button-primary gap-1.5"
            onClick={handleMarkCompleted}
            disabled={complete.isPending}
            data-ocid={`bookings.complete_button.${String(booking.id)}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {complete.isPending ? "Marking…" : "Mark Completed"}
          </Button>
        )}

        {/* Release escrow when completed but funds still held */}
        {isCompleted && escrowHeld && (
          <Button
            size="sm"
            className="button-primary gap-1.5"
            onClick={handleReleaseEscrow}
            disabled={releaseEscrow.isPending}
            data-ocid={`bookings.release_escrow_button.${String(booking.id)}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {releaseEscrow.isPending
              ? "Processing…"
              : "Confirm Work & Release Payment"}
          </Button>
        )}

        {/* Invoice link for completed bookings */}
        {isCompleted && <BookingInvoiceLink bookingId={booking.id} />}
      </div>
    </div>
  );
}

// ─── Bookings Tab ─────────────────────────────────────────────────────────────

function BookingsTab({
  bookings,
  isLoading,
  serviceTitleMap,
  onRatingPrompt,
}: {
  bookings: BookingView[];
  isLoading: boolean;
  serviceTitleMap: Record<string, string>;
  onRatingPrompt: (bookingId: BookingId) => void;
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3" data-ocid="bookings.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div data-ocid="bookings.empty_state">
        <EmptyState
          icon={<Calendar className="w-7 h-7 text-muted-foreground" />}
          title="No bookings yet"
          description="Accept a quote from a provider to create your first booking."
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3" data-ocid="bookings.list">
      {bookings.map((b) => (
        <BookingRow
          key={String(b.id)}
          booking={b}
          serviceTitle={
            serviceTitleMap[String(b.serviceId)] ??
            `Service #${String(b.serviceId)}`
          }
          onRatingPrompt={onRatingPrompt}
        />
      ))}
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold font-display text-foreground">
          {String(value)}
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

function ClientDashboardContent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: quotes = [], isLoading: quotesLoading } = useMyClientQuotes();
  const { data: bookings = [], isLoading: bookingsLoading } =
    useMyClientBookings();
  const { data: allServices = [] } = useListServices(null);

  const [ratingBookingId, setRatingBookingId] = useState<BookingId | null>(
    null,
  );

  // Build service title map from all services
  const serviceTitleMap = allServices.reduce<Record<string, string>>(
    (acc, s) => {
      acc[String(s.id)] = s.title;
      return acc;
    },
    {},
  );

  const actionableQuotes = quotes.filter(
    (q) =>
      q.status === "pending" ||
      q.status === "replied" ||
      q.status === "accepted",
  );
  const activeBookings = bookings.filter(
    (b) =>
      b.bookingStatus === "started" || b.bookingStatus === "paymentPending",
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header zone */}
      <div className="bg-card border-b border-border shadow-subtle">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1
                className="font-display font-bold text-2xl text-foreground"
                data-ocid="client-dashboard.page"
              >
                {user?.displayName ?? "My"} Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Track your quotes and bookings in one place.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <StatCard label="Active Quotes" value={actionableQuotes.length} />
          <StatCard label="Active Bookings" value={activeBookings.length} />
          <StatCard label="Total Bookings" value={bookings.length} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="quotes" className="w-full">
          <TabsList
            className="w-full mb-6 bg-muted/40 border border-border"
            data-ocid="client-dashboard.tabs"
          >
            <TabsTrigger
              value="quotes"
              className="flex-1"
              data-ocid="quotes.tab"
            >
              My Quotes
              {actionableQuotes.length > 0 && (
                <span className="ml-1.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold inline-flex items-center justify-center">
                  {actionableQuotes.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="flex-1"
              data-ocid="bookings.tab"
            >
              My Bookings
              {activeBookings.length > 0 && (
                <span className="ml-1.5 min-w-[18px] h-[18px] rounded-full bg-accent text-accent-foreground text-[10px] font-bold inline-flex items-center justify-center">
                  {activeBookings.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quotes">
            <QuotesTab
              quotes={quotes}
              isLoading={quotesLoading}
              serviceTitleMap={serviceTitleMap}
            />
          </TabsContent>
          <TabsContent value="bookings">
            <BookingsTab
              bookings={bookings}
              isLoading={bookingsLoading}
              serviceTitleMap={serviceTitleMap}
              onRatingPrompt={setRatingBookingId}
            />
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="mt-10 p-5 rounded-xl bg-muted/30 border border-border flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Need something done?
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Browse our providers and request a custom quote.
            </p>
          </div>
          <Button
            className="button-primary shrink-0"
            onClick={() => navigate({ to: "/services" })}
            data-ocid="client-dashboard.browse_services_button"
          >
            Browse Services
          </Button>
        </div>
      </div>

      {/* Rating dialog — shown after marking a booking as completed */}
      <Dialog
        open={ratingBookingId !== null}
        onOpenChange={(open) => {
          if (!open) setRatingBookingId(null);
        }}
      >
        <DialogContent data-ocid="rating.dialog">
          <DialogHeader>
            <DialogTitle className="font-display">
              Rate your experience
            </DialogTitle>
          </DialogHeader>
          {ratingBookingId !== null && (
            <RatingForm
              bookingId={ratingBookingId}
              onSuccess={() => setRatingBookingId(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ClientDashboard() {
  return (
    <AuthGuard requireClient>
      <ClientDashboardContent />
    </AuthGuard>
  );
}
