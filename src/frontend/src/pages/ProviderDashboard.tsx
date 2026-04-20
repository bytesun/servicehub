import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Edit2,
  FileText,
  Image as ImageIcon,
  MapPin,
  MessageSquare,
  PlayCircle,
  Plus,
  Send,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ReplyType } from "../backend";
import type { PriceType as PriceTypeT } from "../backend.d.ts";
import AuthGuard from "../components/AuthGuard";
import BookingStatusBadge from "../components/BookingStatusBadge";
import CategoryBadge from "../components/CategoryBadge";
import EmptyState from "../components/EmptyState";
import QuoteStatusBadge from "../components/QuoteStatusBadge";
import {
  useBookingAction,
  useCreateService,
  useDeleteService,
  useInvoiceByBooking,
  useMyProviderBookings,
  useMyProviderQuotes,
  useMyServices,
  useReplyQuote,
  useUpdateService,
  useUserProfile,
} from "../hooks/useBackend";
import type {
  BookingId,
  BookingView,
  EstimationBreakdown,
  QuoteView,
  ServiceCategory,
  ServiceView,
  UserId,
} from "../types";
import { SERVICE_CATEGORIES, formatCurrency, formatTimestamp } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceFormData {
  title: string;
  description: string;
  category: string;
  basePrice: string;
  priceType: "fixed" | "onSiteEstimate";
}

const DEFAULT_FORM: ServiceFormData = {
  title: "",
  description: "",
  category: "",
  basePrice: "",
  priceType: "fixed",
};

// ─── Client Name Display ──────────────────────────────────────────────────────

function ClientNameDisplay({ clientId }: { clientId: UserId }) {
  const { data: profile, isLoading } = useUserProfile(clientId);
  if (isLoading) {
    return <Skeleton className="h-3 w-20 inline-block" />;
  }
  return (
    <span className="inline-flex items-center gap-1">
      <User className="w-3 h-3" />
      {profile?.displayName ?? "Unknown client"}
    </span>
  );
}

// ─── Invoice Link Button ───────────────────────────────────────────────────────

function InvoiceLinkButton({
  bookingId,
  onNavigate,
}: {
  bookingId: BookingId;
  onNavigate: (invoiceId: string) => void;
}) {
  const { data: invoice, isLoading } = useInvoiceByBooking(bookingId);
  if (isLoading) return <Skeleton className="h-8 w-28 rounded-md" />;
  if (!invoice) return null;
  return (
    <Button
      size="sm"
      variant="outline"
      className="h-8 text-xs gap-1.5"
      onClick={() => onNavigate(String(invoice.id))}
      data-ocid={`booking.invoice_button.${String(bookingId)}`}
    >
      <FileText className="w-3.5 h-3.5" />
      Invoice
    </Button>
  );
}

// ─── Skeletons ────────────────────────────────────────────────────────────────

function ServiceSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex gap-2 mt-1">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-8 w-full rounded-md mt-1" />
    </div>
  );
}

function QuoteSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-8 w-full rounded-md" />
    </div>
  );
}

function BookingSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <Skeleton className="h-5 w-24 rounded-full" />
      <Skeleton className="h-8 w-28 rounded-md" />
    </div>
  );
}

// ─── Service Card ──────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  quoteCount,
  onEdit,
  onDelete,
}: {
  service: ServiceView;
  quoteCount: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 hover:border-primary/30 hover:shadow-md transition-all duration-200"
      data-ocid={`service.item.${String(service.id)}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-base text-foreground truncate leading-snug">
            {service.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge
          category={service.category as ServiceCategory}
          size="sm"
        />
        {service.priceType === "onSiteEstimate" ? (
          <span className="text-xs text-muted-foreground">
            Contact for estimate
          </span>
        ) : service.basePrice > 0n ? (
          <span className="text-xs text-muted-foreground">
            from {formatCurrency(service.basePrice)}
          </span>
        ) : null}
        <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
          <MessageSquare className="w-3 h-3" />
          {quoteCount} {quoteCount === 1 ? "quote" : "quotes"}
        </span>
      </div>

      <div className="flex gap-2 pt-1 border-t border-border/60">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-xs"
          onClick={onEdit}
          data-ocid={`service.edit_button.${String(service.id)}`}
        >
          <Edit2 className="w-3 h-3 mr-1" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs text-destructive hover:text-destructive hover:border-destructive/40"
          onClick={onDelete}
          data-ocid={`service.delete_button.${String(service.id)}`}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

// ─── Attachment Thumbnails ─────────────────────────────────────────────────────

function AttachmentThumbnails({ attachments }: { attachments: string[] }) {
  if (!attachments || attachments.length === 0) return null;
  const visible = attachments.slice(0, 4);
  const overflow = attachments.length - 4;

  return (
    <div className="flex items-center gap-1.5 mb-3">
      <div className="flex gap-1">
        {visible.map((url, i) => (
          <div
            key={url}
            className="w-9 h-9 rounded overflow-hidden border border-border bg-muted/40 shrink-0"
          >
            <img
              src={url}
              alt={`Attachment ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {overflow > 0 && (
          <div className="w-9 h-9 rounded border border-border bg-muted/40 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-muted-foreground">
              +{overflow}
            </span>
          </div>
        )}
      </div>
      <span className="text-xs text-muted-foreground flex items-center gap-0.5">
        <ImageIcon className="w-3 h-3" />
        {attachments.length} {attachments.length === 1 ? "photo" : "photos"}
      </span>
    </div>
  );
}

// ─── Quote Card ────────────────────────────────────────────────────────────────

function QuoteCard({
  quote,
  serviceTitle,
  onReply,
  onNavigate,
}: {
  quote: QuoteView;
  serviceTitle: string;
  onReply: () => void;
  onNavigate: () => void;
}) {
  const isPending = quote.status === "pending";
  const hasOffer = quote.status === "replied" || quote.status === "accepted";

  return (
    <article
      className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-all duration-200"
      data-ocid={`quote.item.${String(quote.id)}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {serviceTitle}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            <ClientNameDisplay clientId={quote.clientId} />
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <Clock className="w-3 h-3 inline" />
            {formatTimestamp(quote.createdAt)}
          </p>
        </div>
        <QuoteStatusBadge status={quote.status} />
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
        {quote.requirements}
      </p>

      <AttachmentThumbnails attachments={quote.attachments} />

      {hasOffer && (
        <div className="flex items-center gap-4 p-2.5 rounded-md bg-primary/5 border border-primary/15 mb-3">
          {quote.replyType === "onSiteEstimate" ? (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium text-foreground">
                On-site estimate required
              </p>
            </div>
          ) : quote.proposedPrice !== undefined ? (
            <>
              <div>
                <p className="text-xs text-muted-foreground">Your offer</p>
                <p className="text-base font-bold font-mono text-primary">
                  {formatCurrency(quote.proposedPrice)}
                </p>
              </div>
              {quote.proposedTimeline && (
                <div>
                  <p className="text-xs text-muted-foreground">Timeline</p>
                  <p className="text-sm font-medium text-foreground">
                    {quote.proposedTimeline}
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Message only reply
            </p>
          )}
        </div>
      )}

      {isPending ? (
        <Button
          size="sm"
          className="w-full h-8 text-xs button-primary"
          onClick={onReply}
          data-ocid={`quote.reply_button.${String(quote.id)}`}
        >
          <Send className="w-3 h-3 mr-1.5" />
          Reply with Quote
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="w-full h-8 text-xs"
          onClick={onNavigate}
          data-ocid={`quote.view_button.${String(quote.id)}`}
        >
          View Details
        </Button>
      )}
    </article>
  );
}

// ─── Booking Row ───────────────────────────────────────────────────────────────

function BookingRow({
  booking,
  serviceTitle,
  onStart,
  onComplete,
  onNavigateDetail,
  onNavigateInvoice,
  isStarting,
  isCompleting,
}: {
  booking: BookingView;
  serviceTitle: string;
  onStart: () => void;
  onComplete: () => void;
  onNavigateDetail: () => void;
  onNavigateInvoice: (invoiceId: string) => void;
  isStarting: boolean;
  isCompleting: boolean;
}) {
  const canStart = booking.bookingStatus === "paymentPending";
  const canComplete = booking.bookingStatus === "started";
  const isCompleted = booking.bookingStatus === "completed";

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-primary/20 transition-all duration-200"
      data-ocid={`booking.item.${String(booking.id)}`}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {serviceTitle}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1">
          <span className="text-xs text-muted-foreground font-mono-amount">
            {formatCurrency(booking.agreedPrice)}
          </span>
          <span className="text-xs text-muted-foreground">
            <ClientNameDisplay clientId={booking.clientId} />
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <CalendarCheck className="w-3 h-3" />
            {formatTimestamp(booking.createdAt)}
          </span>
        </div>
      </div>

      <BookingStatusBadge status={booking.bookingStatus} />

      <div className="flex gap-2 flex-wrap">
        {canStart && (
          <Button
            size="sm"
            className="h-8 text-xs button-primary gap-1.5"
            onClick={onStart}
            disabled={isStarting}
            data-ocid={`booking.start_button.${String(booking.id)}`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            {isStarting ? "Starting…" : "Mark Started"}
          </Button>
        )}
        {canComplete && (
          <Button
            size="sm"
            className="h-8 text-xs gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={onComplete}
            disabled={isCompleting}
            data-ocid={`booking.complete_button.${String(booking.id)}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isCompleting ? "Completing…" : "Mark Completed"}
          </Button>
        )}
        {isCompleted && (
          <InvoiceLinkButton
            bookingId={booking.id}
            onNavigate={onNavigateInvoice}
          />
        )}
        {!canStart && !canComplete && !isCompleted && (
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            onClick={onNavigateDetail}
            data-ocid={`booking.view_button.${String(booking.id)}`}
          >
            View Details
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Service Form Modal ────────────────────────────────────────────────────────

function ServiceFormModal({
  open,
  onClose,
  editService,
}: {
  open: boolean;
  onClose: () => void;
  editService: ServiceView | null;
}) {
  const [form, setForm] = useState<ServiceFormData>(
    editService
      ? {
          title: editService.title,
          description: editService.description,
          category: editService.category,
          basePrice:
            editService.priceType === "onSiteEstimate"
              ? ""
              : String(Number(editService.basePrice) / 100),
          priceType:
            editService.priceType === "onSiteEstimate"
              ? "onSiteEstimate"
              : "fixed",
        }
      : DEFAULT_FORM,
  );

  const createService = useCreateService();
  const updateService = useUpdateService();

  const isEdit = !!editService;
  const isSubmitting = createService.isPending || updateService.isPending;

  function set(field: keyof ServiceFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.category || !form.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (form.priceType === "fixed") {
      const parsed = Number.parseFloat(form.basePrice || "0");
      if (Number.isNaN(parsed) || parsed <= 0) {
        toast.error("Please enter a valid price for a fixed-price service");
        return;
      }
    }

    const priceInCents =
      form.priceType === "onSiteEstimate"
        ? 0n
        : BigInt(Math.round(Number.parseFloat(form.basePrice || "0") * 100));

    const priceTypeValue = form.priceType as unknown as PriceTypeT;

    try {
      if (isEdit) {
        await updateService.mutateAsync({
          id: editService.id,
          input: {
            title: form.title,
            description: form.description,
            basePrice: priceInCents,
            priceType: priceTypeValue,
          },
        });
        toast.success("Service updated successfully");
      } else {
        await createService.mutateAsync({
          title: form.title,
          description: form.description,
          category: form.category as ServiceCategory,
          basePrice: priceInCents,
          priceType: priceTypeValue,
        });
        toast.success("Service posted successfully");
      }
      onClose();
    } catch {
      toast.error(
        isEdit ? "Failed to update service" : "Failed to create service",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg" data-ocid="service.dialog">
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEdit ? "Edit Service" : "Post New Service"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="svc-title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="svc-title"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Home Electrical Repairs"
              data-ocid="service.title_input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="svc-description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="svc-description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe what you offer, your experience, and what clients can expect..."
              rows={3}
              className="resize-none"
              data-ocid="service.description_textarea"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="svc-category">
              Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.category}
              onValueChange={(v) => set("category", v)}
              disabled={isEdit}
            >
              <SelectTrigger
                id="svc-category"
                data-ocid="service.category_select"
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isEdit && (
              <p className="text-xs text-muted-foreground">
                Category cannot be changed after posting.
              </p>
            )}
          </div>

          {/* Price type toggle */}
          <div className="flex flex-col gap-2">
            <Label>Pricing</Label>
            <div
              className="flex gap-2 p-1 rounded-lg bg-muted/50 border border-border"
              data-ocid="service.price_type_toggle"
            >
              <button
                type="button"
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                  form.priceType === "fixed"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => set("priceType", "fixed")}
                data-ocid="service.price_type_fixed"
              >
                Fixed Price
              </button>
              <button
                type="button"
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
                  form.priceType === "onSiteEstimate"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => set("priceType", "onSiteEstimate")}
                data-ocid="service.price_type_estimate"
              >
                On-site Estimate
              </button>
            </div>
          </div>

          {form.priceType === "fixed" ? (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="svc-base-price">
                Base Price (USD) <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  $
                </span>
                <Input
                  id="svc-base-price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.basePrice}
                  onChange={(e) => set("basePrice", e.target.value)}
                  placeholder="0.00"
                  className="pl-7"
                  data-ocid="service.price_input"
                />
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-muted/40 border border-border">
              <p className="text-sm text-muted-foreground">
                Clients will see{" "}
                <span className="font-medium text-foreground">
                  "Contact for estimate"
                </span>{" "}
                — ideal for jobs that need an on-site assessment before pricing.
              </p>
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="service.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 button-primary"
              disabled={isSubmitting}
              data-ocid="service.submit_button"
            >
              {isSubmitting
                ? "Saving…"
                : isEdit
                  ? "Save Changes"
                  : "Post Service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Reply Quote Modal ─────────────────────────────────────────────────────────

type ReplyTab = "messageOnly" | "detailedEstimate" | "onSiteEstimate";

interface ReplyFormData {
  message: string;
  price: string;
  timeline: string;
  labor: string;
  materials: string;
  hourlyRate: string;
  hours: string;
  notes: string;
}

const EMPTY_REPLY: ReplyFormData = {
  message: "",
  price: "",
  timeline: "",
  labor: "",
  materials: "",
  hourlyRate: "",
  hours: "",
  notes: "",
};

function computeTotal(f: ReplyFormData): number {
  return (
    (Number.parseFloat(f.labor) || 0) + (Number.parseFloat(f.materials) || 0)
  );
}

function ReplyQuoteModal({
  quote,
  serviceTitle,
  onClose,
}: {
  quote: QuoteView | null;
  serviceTitle: string;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<ReplyTab>("messageOnly");
  const [form, setForm] = useState<ReplyFormData>(EMPTY_REPLY);
  const replyQuote = useReplyQuote();

  function setField(field: keyof ReplyFormData, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (
        tab === "detailedEstimate" &&
        (field === "labor" || field === "materials")
      ) {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!quote) return;

    if (!form.message.trim()) {
      toast.error("Please enter a message for the client");
      return;
    }

    const toCents = (v: string): bigint | undefined => {
      const n = Number.parseFloat(v);
      return v.trim() && !Number.isNaN(n) && n > 0
        ? BigInt(Math.round(n * 100))
        : undefined;
    };

    const toBigInt = (v: string): bigint => {
      const n = Number.parseFloat(v);
      return v.trim() && !Number.isNaN(n) && n > 0 ? BigInt(Math.round(n)) : 0n;
    };

    let breakdown: EstimationBreakdown | undefined;
    let proposedPriceCents: bigint | undefined;
    let replyType: ReplyType;

    if (tab === "detailedEstimate") {
      breakdown = {
        hours: toBigInt(form.hours),
        hourlyRate: toCents(form.hourlyRate) ?? 0n,
        labor: toCents(form.labor) ?? 0n,
        materials: toCents(form.materials) ?? 0n,
        notes: form.notes.trim(),
      };
      proposedPriceCents = toCents(form.price);
      replyType = ReplyType.detailedEstimate;
    } else if (tab === "onSiteEstimate") {
      replyType = ReplyType.onSiteEstimate;
      proposedPriceCents = undefined;
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
        proposedTimeline: form.timeline.trim() || undefined,
        estimationBreakdown: breakdown,
      });
      toast.success("Reply sent to client");
      handleClose();
    } catch {
      toast.error("Failed to send reply");
    }
  }

  const suggestedTotal = computeTotal(form);

  return (
    <Dialog open={!!quote} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="reply-quote.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display">Reply to Quote</DialogTitle>
        </DialogHeader>

        {quote && (
          <div className="mt-1">
            {/* Client request summary */}
            <div className="p-3 rounded-lg bg-muted/40 border border-border mb-4">
              <p className="text-xs font-semibold text-muted-foreground mb-1">
                {serviceTitle} · Client request
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {quote.requirements}
              </p>
              {quote.attachments && quote.attachments.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    {quote.attachments.length} attachment
                    {quote.attachments.length !== 1 ? "s" : ""}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {quote.attachments.map((url, idx) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-md overflow-hidden border border-border bg-muted/40 hover:border-primary/50 transition-colors block"
                        aria-label={`View attachment ${idx + 1}`}
                      >
                        <img
                          src={url}
                          alt={`Attachment ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reply type tabs */}
            <Tabs
              value={tab}
              onValueChange={(v) => setTab(v as ReplyTab)}
              className="mb-4"
            >
              <TabsList
                className="w-full bg-muted/40 border border-border"
                data-ocid="reply-quote.type_tabs"
              >
                <TabsTrigger
                  value="messageOnly"
                  className="flex-1 text-xs"
                  data-ocid="reply-quote.tab_message_only"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-1" />
                  Message
                </TabsTrigger>
                <TabsTrigger
                  value="detailedEstimate"
                  className="flex-1 text-xs"
                  data-ocid="reply-quote.tab_detailed_estimate"
                >
                  Estimate
                </TabsTrigger>
                <TabsTrigger
                  value="onSiteEstimate"
                  className="flex-1 text-xs"
                  data-ocid="reply-quote.tab_onsite_estimate"
                >
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  On-site
                </TabsTrigger>
              </TabsList>

              {/* ── Message Only ── */}
              <TabsContent value="messageOnly">
                <div className="p-3 rounded-lg bg-muted/20 border border-border mb-3">
                  <p className="text-xs text-muted-foreground">
                    Send a message without committing to a price. Useful for
                    clarifying details before quoting.
                  </p>
                </div>
              </TabsContent>

              {/* ── Detailed Estimate ── */}
              <TabsContent value="detailedEstimate">
                <div className="p-3 rounded-lg bg-muted/20 border border-border mb-3 flex flex-col gap-3">
                  <p className="text-xs text-muted-foreground">
                    Provide a full cost breakdown — builds trust and clarity for
                    the client.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="bd-labor" className="text-xs">
                        Labor ($)
                      </Label>
                      <Input
                        id="bd-labor"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={form.labor}
                        onChange={(e) => setField("labor", e.target.value)}
                        className="h-8 text-sm"
                        data-ocid="reply-quote.breakdown_labor_input"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="bd-materials" className="text-xs">
                        Materials ($)
                      </Label>
                      <Input
                        id="bd-materials"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={form.materials}
                        onChange={(e) => setField("materials", e.target.value)}
                        className="h-8 text-sm"
                        data-ocid="reply-quote.breakdown_materials_input"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="bd-hourly" className="text-xs">
                        Hourly Rate ($)
                      </Label>
                      <Input
                        id="bd-hourly"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={form.hourlyRate}
                        onChange={(e) => setField("hourlyRate", e.target.value)}
                        className="h-8 text-sm"
                        data-ocid="reply-quote.breakdown_hourly_input"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="bd-hours" className="text-xs">
                        Estimated Hours
                      </Label>
                      <Input
                        id="bd-hours"
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="0"
                        value={form.hours}
                        onChange={(e) => setField("hours", e.target.value)}
                        className="h-8 text-sm"
                        data-ocid="reply-quote.breakdown_hours_input"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="bd-notes" className="text-xs">
                      Notes
                    </Label>
                    <Textarea
                      id="bd-notes"
                      rows={2}
                      placeholder="e.g. Includes travel time, special equipment..."
                      value={form.notes}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, notes: e.target.value }))
                      }
                      className="resize-none text-sm"
                      data-ocid="reply-quote.breakdown_notes_textarea"
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
                          setForm((p) => ({
                            ...p,
                            price: String(suggestedTotal),
                          }))
                        }
                        data-ocid="reply-quote.apply_suggestion_button"
                      >
                        Apply ${suggestedTotal.toFixed(2)} →
                      </button>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* ── On-site Estimate ── */}
              <TabsContent value="onSiteEstimate">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 mb-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-xs text-foreground">
                      The client will be informed that pricing requires an
                      on-site visit. No price commitment is made at this stage.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Message (always shown) */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="reply-message">
                  Message to Client <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="reply-message"
                  rows={3}
                  placeholder={
                    tab === "onSiteEstimate"
                      ? "e.g. I'd be happy to help! I'll need to visit to give an accurate estimate..."
                      : tab === "detailedEstimate"
                        ? "e.g. Here's my breakdown for this project..."
                        : "e.g. Thanks for reaching out! I'd be happy to help..."
                  }
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className="resize-none"
                  data-ocid="reply-quote.message_textarea"
                />
              </div>

              {/* Price + Timeline (message only + detailed estimate) */}
              {tab !== "onSiteEstimate" && (
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <Label htmlFor="reply-price">
                      Proposed Price (USD){" "}
                      <span className="text-muted-foreground font-normal text-xs">
                        — optional
                      </span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        $
                      </span>
                      <Input
                        id="reply-price"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={form.price}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, price: e.target.value }))
                        }
                        placeholder="Leave blank if on-site"
                        className="pl-7"
                        data-ocid="reply-quote.price_input"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <Label htmlFor="reply-timeline">
                      Timeline{" "}
                      <span className="text-muted-foreground font-normal text-xs">
                        — optional
                      </span>
                    </Label>
                    <Input
                      id="reply-timeline"
                      value={form.timeline}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, timeline: e.target.value }))
                      }
                      placeholder="e.g. 2–3 business days"
                      data-ocid="reply-quote.timeline_input"
                    />
                  </div>
                </div>
              )}

              {/* Timeline only for on-site */}
              {tab === "onSiteEstimate" && (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="reply-timeline-onsite">
                    Proposed Visit Timeline{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      — optional
                    </span>
                  </Label>
                  <Input
                    id="reply-timeline-onsite"
                    value={form.timeline}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, timeline: e.target.value }))
                    }
                    placeholder="e.g. This week or next"
                    data-ocid="reply-quote.timeline_input_onsite"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleClose}
                  data-ocid="reply-quote.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 button-primary"
                  disabled={replyQuote.isPending}
                  data-ocid="reply-quote.submit_button"
                >
                  {replyQuote.isPending ? "Sending…" : "Send Reply"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Dashboard Content ────────────────────────────────────────────────────────

function ProviderDashboardContent() {
  const navigate = useNavigate();

  const { data: services = [], isLoading: servicesLoading } = useMyServices();
  const { data: quotes = [], isLoading: quotesLoading } = useMyProviderQuotes();
  const { data: bookings = [], isLoading: bookingsLoading } =
    useMyProviderBookings();

  const bookingActions = useBookingAction();
  const deleteService = useDeleteService();

  const [activeTab, setActiveTab] = useState("services");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceView | null>(
    null,
  );
  const [replyingQuote, setReplyingQuote] = useState<QuoteView | null>(null);

  const quoteCountMap = quotes.reduce<Record<string, number>>((acc, q) => {
    const key = String(q.serviceId);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const serviceTitleMap = services.reduce<Record<string, string>>((acc, s) => {
    acc[String(s.id)] = s.title;
    return acc;
  }, {});

  const pendingQuotes = quotes.filter((q) => q.status === "pending");
  const activeBookings = bookings.filter(
    (b) =>
      b.bookingStatus === "paymentPending" || b.bookingStatus === "started",
  );

  function openNewService() {
    setEditingService(null);
    setShowServiceModal(true);
  }

  function openEditService(service: ServiceView) {
    setEditingService(service);
    setShowServiceModal(true);
  }

  function closeServiceModal() {
    setShowServiceModal(false);
    setEditingService(null);
  }

  async function handleDeleteService(service: ServiceView) {
    if (!window.confirm(`Delete "${service.title}"? This cannot be undone.`))
      return;
    try {
      await deleteService.mutateAsync(service.id);
      toast.success("Service deleted");
    } catch {
      toast.error("Failed to delete service");
    }
  }

  async function handleStartBooking(booking: BookingView) {
    try {
      await bookingActions.start.mutateAsync(booking.id);
      toast.success("Booking marked as started");
    } catch {
      toast.error("Failed to update booking");
    }
  }

  async function handleCompleteBooking(booking: BookingView) {
    try {
      await bookingActions.complete.mutateAsync(booking.id);
      toast.success("Booking marked as completed");
    } catch {
      toast.error("Failed to update booking");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground tracking-tight">
            Provider Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your services, respond to quote requests, and track bookings.
          </p>
        </div>
        <Button
          onClick={openNewService}
          className="button-primary gap-2 self-start sm:self-auto"
          data-ocid="dashboard.add_service_button"
        >
          <Plus className="w-4 h-4" />
          Post New Service
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "My Services",
            value: services.length,
            icon: <Briefcase className="w-4 h-4" />,
            accent: "text-primary",
          },
          {
            label: "Pending Quotes",
            value: pendingQuotes.length,
            icon: <Clock className="w-4 h-4" />,
            accent:
              pendingQuotes.length > 0 ? "text-accent" : "text-foreground",
          },
          {
            label: "Active Bookings",
            value: activeBookings.length,
            icon: <PlayCircle className="w-4 h-4" />,
            accent:
              activeBookings.length > 0 ? "text-accent" : "text-foreground",
          },
          {
            label: "Total Bookings",
            value: bookings.length,
            icon: <CheckCircle2 className="w-4 h-4" />,
            accent: "text-foreground",
          },
        ].map((stat) => (
          <Card key={stat.label} className="shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`${stat.accent} opacity-70`}>{stat.icon}</div>
              <div>
                <p className="text-xs text-muted-foreground leading-none mb-1">
                  {stat.label}
                </p>
                <p className={`text-2xl font-display font-bold ${stat.accent}`}>
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        data-ocid="dashboard.tab"
      >
        <TabsList className="mb-6 bg-muted/50">
          <TabsTrigger
            value="services"
            className="gap-2"
            data-ocid="dashboard.services_tab"
          >
            <Briefcase className="w-4 h-4" />
            My Services
            {services.length > 0 && (
              <Badge
                variant="secondary"
                className="text-xs ml-1 h-5 min-w-5 px-1"
              >
                {services.length}
              </Badge>
            )}
          </TabsTrigger>

          <TabsTrigger
            value="quotes"
            className="gap-2"
            data-ocid="dashboard.quotes_tab"
          >
            <MessageSquare className="w-4 h-4" />
            Incoming Quotes
            {pendingQuotes.length > 0 && (
              <Badge className="text-xs ml-1 h-5 min-w-5 px-1 bg-primary/90">
                {pendingQuotes.length}
              </Badge>
            )}
          </TabsTrigger>

          <TabsTrigger
            value="bookings"
            className="gap-2"
            data-ocid="dashboard.bookings_tab"
          >
            <CalendarCheck className="w-4 h-4" />
            My Bookings
            {activeBookings.length > 0 && (
              <Badge className="text-xs ml-1 h-5 min-w-5 px-1 bg-accent/90 text-accent-foreground">
                {activeBookings.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ── My Services Tab ─────────────────────────────────────────────── */}
        <TabsContent value="services" data-ocid="dashboard.services_panel">
          {servicesLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="services.loading_state"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <ServiceSkeleton key={i} />
              ))}
            </div>
          ) : services.length === 0 ? (
            <Card data-ocid="services.empty_state">
              <CardContent className="p-0">
                <EmptyState
                  icon={<Briefcase className="w-7 h-7 text-muted-foreground" />}
                  title="No services posted yet"
                  description="Post your first service to start receiving quote requests from clients."
                  actionLabel="Post New Service"
                  onAction={openNewService}
                />
              </CardContent>
            </Card>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              data-ocid="services.list"
            >
              {services.map((service) => (
                <ServiceCard
                  key={String(service.id)}
                  service={service}
                  quoteCount={quoteCountMap[String(service.id)] ?? 0}
                  onEdit={() => openEditService(service)}
                  onDelete={() => handleDeleteService(service)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* ── Incoming Quotes Tab ─────────────────────────────────────────── */}
        <TabsContent value="quotes" data-ocid="dashboard.quotes_panel">
          {quotesLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              data-ocid="quotes.loading_state"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <QuoteSkeleton key={i} />
              ))}
            </div>
          ) : quotes.length === 0 ? (
            <Card data-ocid="quotes.empty_state">
              <CardContent className="p-0">
                <EmptyState
                  icon={
                    <MessageSquare className="w-7 h-7 text-muted-foreground" />
                  }
                  title="No quote requests yet"
                  description="Once clients request quotes for your services, they'll appear here."
                />
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-6" data-ocid="quotes.list">
              {pendingQuotes.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Awaiting your reply ({pendingQuotes.length})
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pendingQuotes.map((q) => (
                      <QuoteCard
                        key={String(q.id)}
                        quote={q}
                        serviceTitle={
                          serviceTitleMap[String(q.serviceId)] ?? "Service"
                        }
                        onReply={() => setReplyingQuote(q)}
                        onNavigate={() =>
                          navigate({
                            to: "/quotes/$id",
                            params: { id: String(q.id) },
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {quotes.filter((q) => q.status !== "pending").length > 0 && (
                <div>
                  {pendingQuotes.length > 0 && (
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      All other requests
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quotes
                      .filter((q) => q.status !== "pending")
                      .map((q) => (
                        <QuoteCard
                          key={String(q.id)}
                          quote={q}
                          serviceTitle={
                            serviceTitleMap[String(q.serviceId)] ?? "Service"
                          }
                          onReply={() => setReplyingQuote(q)}
                          onNavigate={() =>
                            navigate({
                              to: "/quotes/$id",
                              params: { id: String(q.id) },
                            })
                          }
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* ── My Bookings Tab ─────────────────────────────────────────────── */}
        <TabsContent value="bookings" data-ocid="dashboard.bookings_panel">
          {bookingsLoading ? (
            <div
              className="flex flex-col gap-3"
              data-ocid="bookings.loading_state"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                <BookingSkeleton key={i} />
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <Card data-ocid="bookings.empty_state">
              <CardContent className="p-0">
                <EmptyState
                  icon={
                    <CalendarCheck className="w-7 h-7 text-muted-foreground" />
                  }
                  title="No bookings yet"
                  description="When clients accept your quotes and complete payment, their bookings will appear here."
                />
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-3" data-ocid="bookings.list">
              {activeBookings.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <PlayCircle className="w-3.5 h-3.5" />
                    Action required ({activeBookings.length})
                  </p>
                  <div className="flex flex-col gap-3">
                    {activeBookings.map((booking) => (
                      <BookingRow
                        key={String(booking.id)}
                        booking={booking}
                        serviceTitle={
                          serviceTitleMap[String(booking.serviceId)] ??
                          "Service"
                        }
                        onStart={() => handleStartBooking(booking)}
                        onComplete={() => handleCompleteBooking(booking)}
                        onNavigateDetail={() =>
                          navigate({
                            to: "/bookings/$id",
                            params: { id: String(booking.id) },
                          })
                        }
                        onNavigateInvoice={(invoiceId) =>
                          navigate({
                            to: "/invoices/$id",
                            params: { id: invoiceId },
                          })
                        }
                        isStarting={
                          bookingActions.start.isPending &&
                          bookingActions.start.variables === booking.id
                        }
                        isCompleting={
                          bookingActions.complete.isPending &&
                          bookingActions.complete.variables === booking.id
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {bookings.filter(
                (b) =>
                  b.bookingStatus !== "paymentPending" &&
                  b.bookingStatus !== "started",
              ).length > 0 && (
                <div>
                  {activeBookings.length > 0 && (
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Past bookings
                    </p>
                  )}
                  <div className="flex flex-col gap-3">
                    {bookings
                      .filter(
                        (b) =>
                          b.bookingStatus !== "paymentPending" &&
                          b.bookingStatus !== "started",
                      )
                      .map((booking) => (
                        <BookingRow
                          key={String(booking.id)}
                          booking={booking}
                          serviceTitle={
                            serviceTitleMap[String(booking.serviceId)] ??
                            "Service"
                          }
                          onStart={() => handleStartBooking(booking)}
                          onComplete={() => handleCompleteBooking(booking)}
                          onNavigateDetail={() =>
                            navigate({
                              to: "/bookings/$id",
                              params: { id: String(booking.id) },
                            })
                          }
                          onNavigateInvoice={(invoiceId) =>
                            navigate({
                              to: "/invoices/$id",
                              params: { id: invoiceId },
                            })
                          }
                          isStarting={
                            bookingActions.start.isPending &&
                            bookingActions.start.variables === booking.id
                          }
                          isCompleting={
                            bookingActions.complete.isPending &&
                            bookingActions.complete.variables === booking.id
                          }
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showServiceModal && (
        <ServiceFormModal
          open={showServiceModal}
          onClose={closeServiceModal}
          editService={editingService}
        />
      )}

      <ReplyQuoteModal
        quote={replyingQuote}
        serviceTitle={
          replyingQuote
            ? (serviceTitleMap[String(replyingQuote.serviceId)] ?? "Service")
            : ""
        }
        onClose={() => setReplyingQuote(null)}
      />
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ProviderDashboard() {
  return (
    <AuthGuard requireProvider>
      <ProviderDashboardContent />
    </AuthGuard>
  );
}
