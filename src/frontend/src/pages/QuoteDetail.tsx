import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  FileText,
  Hammer,
  Info,
  Lock,
  MapPin,
  MessageSquare,
  Package,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { QuoteStatus, ReplyType } from "../backend";
import AuthGuard from "../components/AuthGuard";
import QuoteStatusBadge from "../components/QuoteStatusBadge";
import UserAvatar from "../components/UserAvatar";
import { useAuth } from "../hooks/useAuth";
import {
  useAcceptQuote,
  useCancelQuote,
  useCreateBooking,
  useQuote,
  useRejectQuote,
  useReplyQuote,
  useService,
  useUserProfile,
} from "../hooks/useBackend";
import type { EstimationBreakdown } from "../types";
import { formatCurrency, formatTimestamp } from "../types";

// ─── Attachment gallery — all photos, click to expand ─────────────────────────

function AttachmentGallery({ attachments }: { attachments: string[] }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  if (attachments.length === 0) return null;

  return (
    <>
      <div className="space-y-2" data-ocid="quote-detail.attachments.section">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Reference Photos ({attachments.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {attachments.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setLightbox(url)}
              className="relative w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted/40 hover:border-primary/50 hover:opacity-90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`View attachment ${i + 1}`}
              data-ocid={`quote-detail.attachment.item.${i + 1}`}
            >
              <img
                src={url}
                alt={`Attachment ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <dialog
          open
          className="fixed inset-0 z-50 m-0 max-w-none w-full h-full flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4 border-0"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightbox(null)}
          aria-label="Photo preview"
          data-ocid="quote-detail.attachment.dialog"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-card/90 hover:bg-card flex items-center justify-center transition-colors shadow-md"
            aria-label="Close preview"
            data-ocid="quote-detail.attachment.close_button"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
          <img
            src={lightbox}
            alt="Full size attachment"
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </dialog>
      )}
    </>
  );
}

// ─── Reply type badge ──────────────────────────────────────────────────────────

function ReplyTypeBadge({ type }: { type: ReplyType }) {
  if (type === ReplyType.detailedEstimate) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/25">
        <FileText className="w-3 h-3" /> Detailed Estimate
      </span>
    );
  }
  if (type === ReplyType.onSiteEstimate) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/25">
        <MapPin className="w-3 h-3" /> On-site Estimate
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
      <MessageSquare className="w-3 h-3" /> Message
    </span>
  );
}

// ─── Breakdown display ─────────────────────────────────────────────────────────

function BreakdownDisplay({ bd }: { bd: EstimationBreakdown }) {
  const labor = Number(bd.labor) / 100;
  const materials = Number(bd.materials) / 100;
  const hourlyRate = Number(bd.hourlyRate) / 100;
  const hours = Number(bd.hours);
  const total = labor + materials;

  const rows: { icon: React.ReactNode; label: string; value: string }[] = [
    {
      icon: <Clock className="w-3.5 h-3.5 text-muted-foreground" />,
      label: "Hourly Rate",
      value: formatCurrency(bd.hourlyRate),
    },
    {
      icon: <Clock className="w-3.5 h-3.5 text-muted-foreground" />,
      label: "Hours",
      value: `${hours} hr${hours !== 1 ? "s" : ""}`,
    },
    {
      icon: <Hammer className="w-3.5 h-3.5 text-muted-foreground" />,
      label: "Labor",
      value: formatCurrency(bd.labor),
    },
    {
      icon: <Package className="w-3.5 h-3.5 text-muted-foreground" />,
      label: "Materials",
      value: formatCurrency(bd.materials),
    },
  ];

  // suppress unused variable warning — used for conceptual documentation
  void hourlyRate;

  return (
    <div
      className="mt-3 pt-3 border-t border-primary/15 space-y-2"
      data-ocid="quote-detail.breakdown_display"
    >
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Price Breakdown
      </p>
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {r.icon}
            {r.label}
          </span>
          <span className="text-xs font-medium text-foreground">{r.value}</span>
        </div>
      ))}

      {/* Total line */}
      {total > 0 && (
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/60">
          <span className="text-xs font-semibold text-foreground">Total</span>
          <span className="text-sm font-bold text-foreground">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </span>
        </div>
      )}

      {bd.notes && (
        <div className="flex items-start gap-1.5 text-xs text-muted-foreground pt-1">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground" />
          <span className="italic leading-relaxed">{bd.notes}</span>
        </div>
      )}
    </div>
  );
}

// ─── Dollar input helper ───────────────────────────────────────────────────────

function DollarInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  ocid,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ocid?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
          $
        </span>
        <Input
          id={id}
          type="number"
          min="0"
          step="0.01"
          placeholder={placeholder ?? "0.00"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-7"
          data-ocid={ocid}
        />
      </div>
    </div>
  );
}

// ─── Provider reply form state ─────────────────────────────────────────────────

interface ReplyFormState {
  mode: "message" | "detailed" | "onsite";
  message: string;
  price: string;
  timeline: string;
  hourlyRate: string;
  hours: string;
  materials: string;
  labor: string;
  notes: string;
}

const DEFAULT_REPLY: ReplyFormState = {
  mode: "message",
  message: "",
  price: "",
  timeline: "",
  hourlyRate: "",
  hours: "",
  materials: "",
  labor: "",
  notes: "",
};

function computeSuggestedTotal(state: ReplyFormState): number {
  const labor = Number.parseFloat(state.labor) || 0;
  const materials = Number.parseFloat(state.materials) || 0;
  return labor + materials;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function QuoteDetailSkeleton() {
  return (
    <div
      className="max-w-2xl mx-auto px-4 py-10 space-y-6"
      data-ocid="quote-detail.loading_state"
    >
      <Skeleton className="h-5 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-12 rounded-lg" />
    </div>
  );
}

// ─── Mode tab button ──────────────────────────────────────────────────────────

function ModeTab({
  active,
  onClick,
  children,
  ocid,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
      }`}
      data-ocid={ocid}
    >
      {children}
    </button>
  );
}

// ─── Main content ──────────────────────────────────────────────────────────────

function QuoteDetailContent() {
  const { id } = useParams({ from: "/quotes/$id" });
  const navigate = useNavigate();
  const quoteId = BigInt(id);

  const { user, isClient, actorReady, isFetched: authFetched } = useAuth();

  const {
    data: quote,
    isLoading: quoteLoading,
    isError: quoteError,
    isFetched: quoteFetched,
  } = useQuote(quoteId);

  const { data: service, isLoading: serviceLoading } = useService(
    quote?.serviceId ?? null,
  );
  const { data: clientProfile } = useUserProfile(quote?.clientId ?? null);
  const { data: providerProfile } = useUserProfile(quote?.providerId ?? null);

  const acceptQuote = useAcceptQuote();
  const rejectQuote = useRejectQuote();
  const cancelQuote = useCancelQuote();
  const replyQuote = useReplyQuote();
  const createBooking = useCreateBooking();

  const [showReply, setShowReply] = useState(false);
  const [replyForm, setReplyForm] = useState<ReplyFormState>(DEFAULT_REPLY);

  function setField<K extends keyof ReplyFormState>(
    field: K,
    value: ReplyFormState[K],
  ) {
    setReplyForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "labor" || field === "materials") {
        const suggested = computeSuggestedTotal(next as ReplyFormState);
        if (suggested > 0)
          return { ...(next as ReplyFormState), price: String(suggested) };
      }
      return next as ReplyFormState;
    });
  }

  // ── Loading gate: wait for actor to be ready AND auth to resolve ────────────
  const isLoading =
    !actorReady ||
    !authFetched ||
    quoteLoading ||
    serviceLoading ||
    !quoteFetched;

  if (isLoading) {
    return <QuoteDetailSkeleton />;
  }

  // ── Error ────────────────────────────────────────────────────────────────────
  if (quoteError) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4"
        data-ocid="quote-detail.error_state"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="font-display font-bold text-xl text-foreground">
          Something went wrong
        </h2>
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t load this quote. Please try again.
        </p>
        <Button
          variant="outline"
          onClick={() =>
            navigate({ to: isClient ? "/client-dashboard" : "/dashboard" })
          }
          data-ocid="quote-detail.back_button"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  // ── Not found ───────────────────────────────────────────────────────────────
  if (!quote) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4"
        data-ocid="quote-detail.empty_state"
      >
        <div className="w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="font-display font-bold text-xl text-foreground">
          Quote not found
        </h2>
        <p className="text-sm text-muted-foreground">
          This quote doesn&apos;t exist or may have been removed.
        </p>
        <Button
          variant="outline"
          onClick={() =>
            navigate({ to: isClient ? "/client-dashboard" : "/dashboard" })
          }
          className="mt-2"
          data-ocid="quote-detail.back_button"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  // ── Access denied: user is neither client nor provider of this quote ─────────
  const myId = user?.id?.toString();
  const isQuoteClient = myId === quote.clientId.toString();
  const isQuoteProvider = myId === quote.providerId.toString();

  if (!isQuoteClient && !isQuoteProvider) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4"
        data-ocid="quote-detail.access_denied"
      >
        <div className="w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="font-display font-bold text-xl text-foreground">
          Access denied
        </h2>
        <p className="text-sm text-muted-foreground">
          You don&apos;t have permission to view this quote.
        </p>
        <Button
          variant="outline"
          onClick={() =>
            navigate({ to: isClient ? "/client-dashboard" : "/dashboard" })
          }
          data-ocid="quote-detail.back_button"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  // ── Derived state ────────────────────────────────────────────────────────────
  const isReplied = quote.status === QuoteStatus.replied;
  const isPending = quote.status === QuoteStatus.pending;
  const isAccepted = quote.status === QuoteStatus.accepted;
  const isClosed =
    quote.status === QuoteStatus.rejected ||
    quote.status === QuoteStatus.cancelled;

  // ── Action handlers ──────────────────────────────────────────────────────────

  const handleDecline = async () => {
    try {
      await rejectQuote.mutateAsync(quote.id);
      toast.success("Offer declined.");
    } catch {
      toast.error("Failed to decline offer.");
    }
  };

  const handleCancel = async () => {
    try {
      await cancelQuote.mutateAsync(quote.id);
      toast.success("Quote request cancelled.");
      navigate({ to: isClient ? "/client-dashboard" : "/dashboard" });
    } catch {
      toast.error("Failed to cancel quote.");
    }
  };

  const handleAcceptAndBook = async () => {
    try {
      await acceptQuote.mutateAsync(quote.id);
      const booking = await createBooking.mutateAsync(quote.id);
      toast.success("Booking created! The service is now confirmed.");
      navigate({ to: "/bookings/$id", params: { id: String(booking.id) } });
    } catch {
      toast.error("Failed to create booking.");
    }
  };

  const handleCreateBooking = async () => {
    try {
      const booking = await createBooking.mutateAsync(quote.id);
      toast.success("Booking created!");
      navigate({ to: "/bookings/$id", params: { id: String(booking.id) } });
    } catch {
      toast.error("Failed to create booking.");
    }
  };

  const handleReply = async () => {
    if (!replyForm.message.trim() && replyForm.mode !== "onsite") {
      toast.error("Please enter a message for the client.");
      return;
    }

    const toCents = (v: string): bigint | undefined => {
      const n = Number.parseFloat(v);
      return v.trim() && !Number.isNaN(n) && n > 0
        ? BigInt(Math.round(n * 100))
        : undefined;
    };

    const toBigInt = (v: string): bigint => {
      const n = Number.parseInt(v, 10);
      return v.trim() && !Number.isNaN(n) && n > 0 ? BigInt(n) : 0n;
    };

    let replyType: ReplyType;
    let breakdown: EstimationBreakdown | undefined;

    if (replyForm.mode === "onsite") {
      replyType = ReplyType.onSiteEstimate;
    } else if (replyForm.mode === "detailed") {
      replyType = ReplyType.detailedEstimate;
      breakdown = {
        hours: toBigInt(replyForm.hours),
        hourlyRate: toCents(replyForm.hourlyRate) ?? 0n,
        materials: toCents(replyForm.materials) ?? 0n,
        labor: toCents(replyForm.labor) ?? 0n,
        notes: replyForm.notes.trim(),
      };
    } else {
      replyType = ReplyType.messageOnly;
    }

    try {
      await replyQuote.mutateAsync({
        quoteId: quote.id,
        replyType,
        replyMessage:
          replyForm.message.trim() !== ""
            ? replyForm.message.trim()
            : undefined,
        proposedPrice:
          replyForm.mode !== "onsite" ? toCents(replyForm.price) : undefined,
        proposedTimeline:
          replyForm.timeline.trim() !== ""
            ? replyForm.timeline.trim()
            : undefined,
        estimationBreakdown: breakdown,
      });
      toast.success("Reply sent to client!");
      setShowReply(false);
      setReplyForm(DEFAULT_REPLY);
    } catch {
      toast.error("Failed to send reply.");
    }
  };

  const suggestedTotal = computeSuggestedTotal(replyForm);

  return (
    <div
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-5"
      data-ocid="quote-detail.page"
    >
      {/* Back navigation */}
      <button
        type="button"
        onClick={() =>
          navigate({ to: isClient ? "/client-dashboard" : "/dashboard" })
        }
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="quote-detail.back_link"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            {service?.title ?? `Quote #${String(quote.id)}`}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Submitted {formatTimestamp(quote.createdAt)}
          </p>
        </div>
        <QuoteStatusBadge status={quote.status} />
      </div>

      {/* Parties */}
      <Card>
        <CardContent className="pt-5 flex flex-wrap gap-5">
          <div className="flex items-center gap-2.5">
            <UserAvatar
              name={clientProfile?.displayName ?? "Client"}
              size="sm"
            />
            <div>
              <p className="text-xs text-muted-foreground">Client</p>
              <Link
                to="/profile/$userId"
                params={{ userId: quote.clientId.toString() }}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-ocid="quote-detail.client_link"
              >
                {clientProfile?.displayName ?? "Loading…"}
              </Link>
            </div>
          </div>
          <Separator orientation="vertical" className="h-10 hidden sm:block" />
          <div className="flex items-center gap-2.5">
            <UserAvatar
              name={providerProfile?.displayName ?? "Provider"}
              size="sm"
            />
            <div>
              <p className="text-xs text-muted-foreground">Provider</p>
              <Link
                to="/profile/$userId"
                params={{ userId: quote.providerId.toString() }}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-ocid="quote-detail.provider_link"
              >
                {providerProfile?.displayName ?? "Loading…"}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Request details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            Request Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p
            className="text-sm text-foreground leading-relaxed whitespace-pre-wrap"
            data-ocid="quote-detail.requirements_text"
          >
            {quote.requirements}
          </p>
          {quote.attachments && quote.attachments.length > 0 && (
            <AttachmentGallery attachments={quote.attachments} />
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            Submitted {formatTimestamp(quote.createdAt)}
            {quote.updatedAt !== quote.createdAt && (
              <span className="ml-2">
                · Updated {formatTimestamp(quote.updatedAt)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Provider reply — shown when replied */}
      {isReplied && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Provider Reply
              </CardTitle>
              {quote.replyType && <ReplyTypeBadge type={quote.replyType} />}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* On-site note */}
            {quote.replyType === ReplyType.onSiteEstimate && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Price determined on-site
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    The provider will assess the job before confirming a final
                    price.
                  </p>
                </div>
              </div>
            )}

            {/* Message-only reply */}
            {quote.replyType === ReplyType.messageOnly &&
              quote.replyMessage && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/30 border border-border">
                  <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p
                    className="text-sm text-foreground leading-relaxed"
                    data-ocid="quote-detail.reply_message"
                  >
                    {quote.replyMessage}
                  </p>
                </div>
              )}

            {/* Detailed estimate reply — message + breakdown */}
            {quote.replyType === ReplyType.detailedEstimate && (
              <>
                {quote.replyMessage && (
                  <p
                    className="text-sm text-foreground leading-relaxed"
                    data-ocid="quote-detail.reply_message"
                  >
                    {quote.replyMessage}
                  </p>
                )}
                {quote.estimationBreakdown && (
                  <BreakdownDisplay bd={quote.estimationBreakdown} />
                )}
              </>
            )}

            {/* On-site estimate reply — message if provided */}
            {quote.replyType === ReplyType.onSiteEstimate &&
              quote.replyMessage && (
                <p
                  className="text-sm text-foreground leading-relaxed"
                  data-ocid="quote-detail.reply_message"
                >
                  {quote.replyMessage}
                </p>
              )}

            {/* Proposed price (not on-site) */}
            {quote.proposedPrice !== undefined &&
              quote.proposedPrice !== null &&
              quote.replyType !== ReplyType.onSiteEstimate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Quoted price
                  </span>
                  <span
                    className="text-2xl font-bold text-foreground"
                    data-ocid="quote-detail.proposed_price"
                  >
                    {formatCurrency(quote.proposedPrice)}
                  </span>
                </div>
              )}

            {/* On-site: no fixed price */}
            {quote.replyType === ReplyType.onSiteEstimate &&
              (quote.proposedPrice === undefined ||
                quote.proposedPrice === null) && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <span className="text-sm font-semibold text-foreground">
                    To be determined on-site
                  </span>
                </div>
              )}

            {/* Timeline */}
            {quote.proposedTimeline && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Timeline:</span>
                <span
                  className="font-medium text-foreground"
                  data-ocid="quote-detail.proposed_timeline"
                >
                  {quote.proposedTimeline}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Client actions: replied */}
      {isQuoteClient && isReplied && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base">
              Accept this offer?
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Accept to create a booking and hold payment in escrow.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full"
              onClick={handleAcceptAndBook}
              disabled={acceptQuote.isPending || createBooking.isPending}
              data-ocid="quote-detail.accept_button"
            >
              {acceptQuote.isPending || createBooking.isPending
                ? "Creating Booking…"
                : "Accept Offer & Book"}
            </Button>
            <Separator />
            <Button
              variant="outline"
              className="w-full text-muted-foreground hover:text-destructive hover:border-destructive/40"
              onClick={handleDecline}
              disabled={rejectQuote.isPending}
              data-ocid="quote-detail.reject_button"
            >
              {rejectQuote.isPending ? "Declining…" : "Decline Offer"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Client: accepted — create booking */}
      {isQuoteClient && isAccepted && (
        <Card>
          <CardContent className="pt-5 space-y-4">
            <p className="text-sm text-muted-foreground">
              Quote accepted — create a booking to proceed to payment.
            </p>
            <Button
              className="w-full"
              onClick={handleCreateBooking}
              disabled={createBooking.isPending}
              data-ocid="quote-detail.create_booking_button"
            >
              {createBooking.isPending ? "Creating Booking…" : "Create Booking"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Client: pending — cancel */}
      {isQuoteClient && isPending && (
        <Card>
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm text-muted-foreground">
              Awaiting a response from the provider. You can cancel if you no
              longer need this service.
            </p>
            <Button
              variant="outline"
              className="w-full text-muted-foreground hover:text-destructive hover:border-destructive/40"
              onClick={handleCancel}
              disabled={cancelQuote.isPending}
              data-ocid="quote-detail.cancel_button"
            >
              {cancelQuote.isPending ? "Cancelling…" : "Cancel Request"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Provider: pending — trigger reply form */}
      {isQuoteProvider && isPending && !showReply && (
        <Button
          className="w-full"
          onClick={() => setShowReply(true)}
          data-ocid="quote-detail.send_offer_button"
        >
          Send Reply to Client
        </Button>
      )}

      {/* Provider: awaiting client action after reply */}
      {isQuoteProvider && isReplied && (
        <Card className="bg-muted/20">
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm text-muted-foreground">
              Your reply is awaiting client action.
            </p>
            <Button
              variant="outline"
              className="text-muted-foreground hover:text-destructive hover:border-destructive/40"
              onClick={handleCancel}
              disabled={cancelQuote.isPending}
              data-ocid="quote-detail.cancel_button"
            >
              {cancelQuote.isPending ? "Cancelling…" : "Cancel Quote"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Provider reply form — tabbed: message / detailed estimate / on-site */}
      {isQuoteProvider && showReply && (
        <Card data-ocid="quote-detail.reply_form">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base">
              Send Your Reply
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Choose how you want to respond to this request.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mode tabs */}
            <div
              className="flex gap-1 p-1 rounded-xl bg-muted/30 border border-border"
              role="tablist"
              data-ocid="quote-detail.reply_mode_tabs"
            >
              <ModeTab
                active={replyForm.mode === "message"}
                onClick={() => setField("mode", "message")}
                ocid="quote-detail.mode_message_tab"
              >
                <span className="flex items-center gap-1 justify-center">
                  <MessageSquare className="w-3 h-3" /> Message
                </span>
              </ModeTab>
              <ModeTab
                active={replyForm.mode === "detailed"}
                onClick={() => setField("mode", "detailed")}
                ocid="quote-detail.mode_detailed_tab"
              >
                <span className="flex items-center gap-1 justify-center">
                  <FileText className="w-3 h-3" /> Detailed
                </span>
              </ModeTab>
              <ModeTab
                active={replyForm.mode === "onsite"}
                onClick={() => setField("mode", "onsite")}
                ocid="quote-detail.mode_onsite_tab"
              >
                <span className="flex items-center gap-1 justify-center">
                  <MapPin className="w-3 h-3" /> On-site
                </span>
              </ModeTab>
            </div>

            {/* Message field — shown for message and detailed modes */}
            {replyForm.mode !== "onsite" && (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="reply-message" className="text-xs">
                  Message to Client
                  {replyForm.mode === "message" && (
                    <span className="text-destructive ml-0.5">*</span>
                  )}
                  {replyForm.mode === "detailed" && (
                    <span className="text-muted-foreground ml-1">
                      — optional
                    </span>
                  )}
                </Label>
                <Textarea
                  id="reply-message"
                  placeholder="e.g. Thanks for reaching out! I'd be happy to help…"
                  rows={3}
                  className="resize-none"
                  value={replyForm.message}
                  onChange={(e) =>
                    setReplyForm((p) => ({ ...p, message: e.target.value }))
                  }
                  data-ocid="quote-detail.message_textarea"
                />
              </div>
            )}

            {/* On-site mode: explanatory panel + optional message */}
            {replyForm.mode === "onsite" && (
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Price determined on-site
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      The client will be notified that you need to visit the
                      site before providing a final price.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="onsite-message" className="text-xs">
                    Message — optional
                  </Label>
                  <Textarea
                    id="onsite-message"
                    placeholder="e.g. I'll need to assess the scope in person. I'm available next week…"
                    rows={3}
                    className="resize-none"
                    value={replyForm.message}
                    onChange={(e) =>
                      setReplyForm((p) => ({ ...p, message: e.target.value }))
                    }
                    data-ocid="quote-detail.onsite_message_textarea"
                  />
                </div>
              </div>
            )}

            {/* Detailed estimate fields */}
            {replyForm.mode === "detailed" && (
              <div className="p-4 rounded-lg bg-muted/30 border border-border space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Price Breakdown
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <DollarInput
                    id="breakdown-labor"
                    label="Labor"
                    value={replyForm.labor}
                    onChange={(v) => setField("labor", v)}
                    ocid="quote-detail.breakdown_labor_input"
                  />
                  <DollarInput
                    id="breakdown-materials"
                    label="Materials"
                    value={replyForm.materials}
                    onChange={(v) => setField("materials", v)}
                    ocid="quote-detail.breakdown_materials_input"
                  />
                  <DollarInput
                    id="breakdown-hourly"
                    label="Hourly Rate"
                    value={replyForm.hourlyRate}
                    onChange={(v) => setField("hourlyRate", v)}
                    ocid="quote-detail.breakdown_hourly_input"
                  />
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="breakdown-hours" className="text-xs">
                      Hours
                    </Label>
                    <Input
                      id="breakdown-hours"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={replyForm.hours}
                      onChange={(e) => setField("hours", e.target.value)}
                      data-ocid="quote-detail.breakdown_hours_input"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="breakdown-notes" className="text-xs">
                    Notes / Justification
                  </Label>
                  <Textarea
                    id="breakdown-notes"
                    placeholder="e.g. Includes 2 hours travel, specialized equipment rental…"
                    rows={2}
                    className="resize-none text-sm"
                    value={replyForm.notes}
                    onChange={(e) =>
                      setReplyForm((p) => ({ ...p, notes: e.target.value }))
                    }
                    data-ocid="quote-detail.breakdown_notes_textarea"
                  />
                </div>
                {suggestedTotal > 0 && (
                  <div className="flex items-center justify-between pt-2 border-t border-border/60">
                    <span className="text-xs text-muted-foreground">
                      Suggested total (labor + materials)
                    </span>
                    <button
                      type="button"
                      className="text-xs font-semibold text-primary hover:underline"
                      onClick={() =>
                        setReplyForm((p) => ({
                          ...p,
                          price: String(suggestedTotal),
                        }))
                      }
                      data-ocid="quote-detail.apply_suggestion_button"
                    >
                      Apply ${suggestedTotal.toFixed(2)} →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Price & timeline for message + detailed modes */}
            {replyForm.mode !== "onsite" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DollarInput
                  id="reply-price"
                  label="Proposed Price (USD) — optional"
                  value={replyForm.price}
                  onChange={(v) => setReplyForm((p) => ({ ...p, price: v }))}
                  placeholder="Leave blank if TBD"
                  ocid="quote-detail.price_input"
                />
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="reply-timeline" className="text-xs">
                    Estimated Timeline — optional
                  </Label>
                  <Input
                    id="reply-timeline"
                    placeholder="e.g. 3–5 business days"
                    value={replyForm.timeline}
                    onChange={(e) =>
                      setReplyForm((p) => ({
                        ...p,
                        timeline: e.target.value,
                      }))
                    }
                    data-ocid="quote-detail.timeline_input"
                  />
                </div>
              </div>
            )}

            {/* On-site: optional proposed timeline */}
            {replyForm.mode === "onsite" && (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="onsite-timeline" className="text-xs">
                  Proposed Timeline — optional
                </Label>
                <Input
                  id="onsite-timeline"
                  placeholder="e.g. Can visit within 3 business days"
                  value={replyForm.timeline}
                  onChange={(e) =>
                    setReplyForm((p) => ({ ...p, timeline: e.target.value }))
                  }
                  data-ocid="quote-detail.onsite_timeline_input"
                />
              </div>
            )}

            <Separator />

            <Button
              className="w-full"
              onClick={handleReply}
              disabled={replyQuote.isPending}
              data-ocid="quote-detail.submit_offer_button"
            >
              {replyQuote.isPending ? "Sending Reply…" : "Send Reply"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => {
                setShowReply(false);
                setReplyForm(DEFAULT_REPLY);
              }}
              data-ocid="quote-detail.cancel_reply_button"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Closed state */}
      {isClosed && (
        <div
          className="p-4 rounded-lg bg-muted/30 border border-border text-center"
          data-ocid="quote-detail.closed_notice"
        >
          <Badge variant="secondary" className="mb-2">
            {quote.status === QuoteStatus.rejected ? "Declined" : "Cancelled"}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {quote.status === QuoteStatus.rejected
              ? "This offer was declined."
              : "This quote request was cancelled."}
          </p>
        </div>
      )}
    </div>
  );
}

export default function QuoteDetail() {
  return (
    <AuthGuard>
      <QuoteDetailContent />
    </AuthGuard>
  );
}
