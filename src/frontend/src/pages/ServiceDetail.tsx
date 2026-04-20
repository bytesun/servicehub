import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ImagePlus,
  MessageSquare,
  Star,
  UserCircle2,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import CategoryBadge from "../components/CategoryBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import StarRating from "../components/StarRating";
import UserAvatar from "../components/UserAvatar";
import { useAuth } from "../hooks/useAuth";
import {
  useRequestQuote,
  useService,
  useServiceRatings,
  useUserProfile,
} from "../hooks/useBackend";
import { usePhotoUpload } from "../hooks/usePhotoUpload";
import { formatCurrency, formatTimestamp } from "../types";

// ── Loading skeleton ───────────────────────────────────────────────────────────
function ServiceDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-52 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ── Provider Card ──────────────────────────────────────────────────────────────
interface ProviderCardProps {
  providerId: string;
  onRequestQuote: () => void;
  isAuthenticated: boolean;
  onSignIn: () => void;
}

function ProviderCard({
  providerId,
  onRequestQuote,
  isAuthenticated,
  onSignIn,
}: ProviderCardProps) {
  const { data: provider, isLoading } = useUserProfile(providerId as never);

  if (isLoading) {
    return (
      <Card className="bg-card border border-border">
        <CardContent className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </CardContent>
      </Card>
    );
  }

  const displayName = provider?.displayName ?? "Provider";

  return (
    <Card className="bg-card border border-border">
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Service Provider
        </div>
        <Link
          to="/profile/$userId"
          params={{ userId: providerId }}
          className="flex items-center gap-3 group"
          data-ocid="service-detail.provider.link"
        >
          <UserAvatar name={displayName} size="md" />
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
              {displayName}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <UserCircle2 className="w-3 h-3" />
              View profile
            </p>
          </div>
        </Link>

        {provider?.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {provider.bio}
          </p>
        )}

        <Separator />

        {isAuthenticated ? (
          <Button
            className="button-primary w-full"
            onClick={onRequestQuote}
            data-ocid="service-detail.request-quote.button"
          >
            Request Quote
          </Button>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Sign in to request a quote
            </p>
            <Button
              variant="outline"
              className="w-full border-primary/30 text-primary hover:bg-primary/5"
              onClick={onSignIn}
              data-ocid="service-detail.sign-in-to-quote.button"
            >
              Sign In
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Ratings Section ────────────────────────────────────────────────────────────
function RatingsSection({ serviceId }: { serviceId: bigint }) {
  const { data: ratings, isLoading } = useServiceRatings(serviceId);

  const avgRating =
    ratings && ratings.length > 0
      ? ratings.reduce((sum, r) => sum + Number(r.stars), 0) / ratings.length
      : 0;

  return (
    <div className="mt-10" data-ocid="service-detail.ratings.section">
      <Separator className="mb-8" />
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display font-bold text-xl text-foreground">
          Client Reviews
        </h2>
        {!isLoading && ratings && ratings.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating value={avgRating} readonly size="sm" />
            <span className="text-sm text-muted-foreground">
              {avgRating.toFixed(1)} ({ratings.length}{" "}
              {ratings.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}
      </div>

      {isLoading ? (
        <div
          className="space-y-4"
          data-ocid="service-detail.ratings.loading_state"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              key={i}
              className="p-4 rounded-xl border border-border bg-card space-y-3"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : !ratings || ratings.length === 0 ? (
        <div
          className="flex flex-col items-center gap-3 py-10 text-center"
          data-ocid="service-detail.ratings.empty_state"
        >
          <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="font-semibold text-foreground">No reviews yet</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Be the first to hire this provider and leave a review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {ratings.map((rating, i) => (
            <div
              key={String(rating.id)}
              className="p-5 rounded-xl border border-border bg-card"
              data-ocid={`service-detail.ratings.item.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <UserAvatar
                    name={`Client ${String(rating.clientId).slice(-4)}`}
                    size="sm"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Verified Client
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarRating
                        value={Number(rating.stars)}
                        readonly
                        size="sm"
                      />
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatTimestamp(rating.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 text-xs font-semibold text-primary bg-primary/8 px-2 py-0.5 rounded-full">
                  {Number(rating.stars)}/5
                </div>
              </div>

              {rating.comment && (
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {rating.comment}
                </p>
              )}

              {rating.providerReply && (
                <div className="mt-3 ml-4 pl-3 border-l-2 border-primary/30">
                  <p className="text-xs font-semibold text-primary mb-1">
                    Provider reply
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {rating.providerReply}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Photo Upload Panel ─────────────────────────────────────────────────────────
interface PhotoUploadPanelProps {
  photos: ReturnType<typeof usePhotoUpload>["photos"];
  canAddMore: boolean;
  maxPhotos: number;
  onAdd: (files: FileList | File[]) => void;
  onRemove: (index: number) => void;
}

function PhotoUploadPanel({
  photos,
  canAddMore,
  maxPhotos,
  onAdd,
  onRemove,
}: PhotoUploadPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        onAdd(e.dataTransfer.files);
      }
    },
    [onAdd],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">
        Photo Attachments
        <span className="text-muted-foreground font-normal ml-1.5">
          (optional, up to {maxPhotos})
        </span>
      </Label>

      {/* Photo grid */}
      {photos.length > 0 && (
        <div
          className="grid grid-cols-3 gap-2"
          data-ocid="service-detail.photos.list"
        >
          {photos.map((photo, idx) => (
            <div
              key={photo.previewUrl}
              className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted/30 group"
              data-ocid={`service-detail.photos.item.${idx + 1}`}
            >
              <img
                src={photo.previewUrl}
                alt={`Attachment ${idx + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Upload progress overlay */}
              {photo.uploading && (
                <div className="absolute inset-0 bg-background/70 flex flex-col items-center justify-center gap-1.5 p-2">
                  <LoadingSpinner size="sm" />
                  <Progress value={photo.progress} className="h-1 w-full" />
                </div>
              )}

              {/* Error overlay */}
              {photo.error && (
                <div className="absolute inset-0 bg-destructive/80 flex items-center justify-center p-2">
                  <p className="text-xs text-destructive-foreground text-center leading-tight">
                    Upload failed
                  </p>
                </div>
              )}

              {/* Uploaded indicator */}
              {photo.uploadedUrl && !photo.uploading && (
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              {/* Remove button */}
              {!photo.uploading && (
                <button
                  type="button"
                  onClick={() => onRemove(idx)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-background/80 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                  aria-label={`Remove photo ${idx + 1}`}
                  data-ocid={`service-detail.photos.delete_button.${idx + 1}`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      {canAddMore && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-lg border-2 border-dashed transition-colors text-sm ${
            isDragging
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-muted/20 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
          }`}
          data-ocid="service-detail.photos.dropzone"
        >
          <ImagePlus className="w-5 h-5" />
          <span>
            {photos.length === 0
              ? "Drag & drop or click to add photos"
              : `Add more (${photos.length}/${maxPhotos})`}
          </span>
          <span className="text-xs opacity-70">
            JPEG, PNG, WebP · max 10 MB each
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            onAdd(e.target.files);
            e.target.value = "";
          }
        }}
        data-ocid="service-detail.photos.upload_button"
      />
    </div>
  );
}

// ── Quote Request Form ─────────────────────────────────────────────────────────
function QuoteRequestForm({
  serviceId,
  onSuccess,
  onCancel,
}: {
  serviceId: bigint;
  onSuccess: () => void;
  onCancel?: () => void;
}) {
  const [requirements, setRequirements] = useState("");
  const [reqError, setReqError] = useState("");
  const { mutateAsync, isPending } = useRequestQuote();
  const {
    photos,
    addPhotos,
    removePhoto,
    uploadAll,
    isUploading,
    canAddMore,
    maxPhotos,
  } = usePhotoUpload();

  const isBusy = isPending || isUploading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requirements.trim()) {
      setReqError("Please describe your requirements.");
      return;
    }
    setReqError("");

    try {
      // Upload photos first, then submit the quote
      let attachments: string[] = [];
      if (photos.length > 0) {
        attachments = await uploadAll();
      }

      await mutateAsync({
        serviceId,
        requirements: requirements.trim(),
        attachments,
      });
      toast.success("Quote request sent! The provider will respond soon.");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send quote request. Please try again.");
    }
  };

  return (
    <Card className="bg-card border border-border">
      <CardContent className="p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">
          Describe your requirements
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Requirements textarea */}
          <div className="space-y-1.5">
            <Label htmlFor="requirements" className="text-sm font-medium">
              Project Requirements
              <span className="text-destructive ml-0.5">*</span>
            </Label>
            <Textarea
              id="requirements"
              placeholder="Describe what you need in detail — scope, timeline, any special requirements…"
              value={requirements}
              onChange={(e) => {
                setRequirements(e.target.value);
                if (reqError) setReqError("");
              }}
              rows={5}
              className="resize-none bg-card border-border"
              data-ocid="service-detail.requirements.textarea"
            />
            {reqError && (
              <p
                className="text-xs text-destructive"
                data-ocid="service-detail.requirements.field_error"
              >
                {reqError}
              </p>
            )}
          </div>

          {/* Photo attachments */}
          <PhotoUploadPanel
            photos={photos}
            canAddMore={canAddMore}
            maxPhotos={maxPhotos}
            onAdd={addPhotos}
            onRemove={removePhoto}
          />

          {/* Upload status */}
          {isUploading && (
            <div
              className="flex items-center gap-2 text-sm text-muted-foreground"
              data-ocid="service-detail.photos.loading_state"
            >
              <LoadingSpinner size="sm" />
              Uploading photos…
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="button-primary w-full"
              disabled={isBusy}
              data-ocid="service-detail.submit-quote.submit_button"
            >
              {isBusy ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  {isUploading ? "Uploading photos…" : "Sending…"}
                </span>
              ) : (
                "Send Quote Request"
              )}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancel}
                data-ocid="service-detail.cancel-quote.cancel_button"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ── Quote Success State ────────────────────────────────────────────────────────
function QuoteSuccessCard({ onDashboard }: { onDashboard: () => void }) {
  return (
    <Card
      className="bg-card border border-border"
      data-ocid="service-detail.quote.success_state"
    >
      <CardContent className="p-6 flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-accent" />
        </div>
        <div className="space-y-1">
          <p className="font-display font-bold text-foreground text-lg">
            Quote request sent!
          </p>
          <p className="text-sm text-muted-foreground">
            The provider will review your request and respond with a quote soon.
          </p>
        </div>
        <Button
          className="button-primary w-full"
          onClick={onDashboard}
          data-ocid="service-detail.go-to-dashboard.button"
        >
          View in Dashboard
        </Button>
      </CardContent>
    </Card>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ServiceDetail() {
  const { id } = useParams({ from: "/services/$id" });
  const navigate = useNavigate();

  // useAuth exposes actorReady — use it as the single source of truth for
  // backend readiness so we stay consistent with all other pages.
  const { isAuthenticated, actorReady, login } = useAuth();

  // Safely parse the URL param to BigInt — null if invalid.
  const serviceId: bigint | null = (() => {
    try {
      const parsed = BigInt(id);
      return parsed >= 0n ? parsed : null;
    } catch {
      return null;
    }
  })();

  // useService already gates its own query on actorReady internally, but we
  // also gate the whole page on actorReady here to ensure the service data is
  // never rendered before the backend connection is confirmed. This prevents
  // the "no service" flash where the query fires before the actor is ready.
  const { data: service, isLoading, isFetched } = useService(serviceId);

  const [showForm, setShowForm] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleRequestQuoteClick = () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to request a quote.");
      return;
    }
    setShowForm(true);
    setTimeout(() => {
      document
        .getElementById("quote-form-anchor")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleQuoteSuccess = () => {
    setShowForm(false);
    setQuoteSubmitted(true);
  };

  const handleGoToDashboard = () => {
    navigate({ to: "/client-dashboard" });
  };

  // ── Loading State ────────────────────────────────────────────────────────────
  // Show skeleton while:
  //   • actor is still initialising (!actorReady)
  //   • the query is loading (isLoading already includes !actorReady guard)
  //   • actor became ready but the query hasn't fired/finished yet
  //     (isFetched stays false until the query resolves)
  if (
    !actorReady ||
    isLoading ||
    (actorReady && !isFetched && serviceId !== null)
  ) {
    return (
      <div
        className="min-h-screen bg-background"
        data-ocid="service-detail.page"
      >
        <div
          className="bg-card border-b border-border"
          data-ocid="service-detail.loading_state"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
        <ServiceDetailSkeleton />
      </div>
    );
  }

  // ── Not Found ────────────────────────────────────────────────────────────────
  // Only show "not found" once: actor is ready AND query has fully completed
  // AND there is still no service. An invalid URL param also lands here.
  if (!service) {
    return (
      <div
        className="min-h-screen bg-background flex flex-col items-center justify-center gap-4"
        data-ocid="service-detail.page"
      >
        <div className="text-5xl" aria-hidden="true">
          🔍
        </div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Service not found
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm text-center">
          This service may have been removed or the link is incorrect.
        </p>
        <Button
          asChild
          className="button-primary mt-2"
          data-ocid="service-detail.back-to-services.button"
        >
          <Link to="/services">Browse all services</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="service-detail.page">
      {/* ── Breadcrumb / Back ─────────────────────────────────────────────── */}
      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="service-detail.back.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ── Left Column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Category + Title */}
            <div className="space-y-3">
              <CategoryBadge category={service.category} size="md" />
              <h1 className="font-display font-bold text-3xl text-foreground leading-snug">
                {service.title}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              {service.priceType === "onSiteEstimate" ? (
                <>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    Pricing
                  </span>
                  <span className="font-display font-semibold text-xl text-foreground">
                    On-site estimate
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    Starting at
                  </span>
                  <span className="font-display font-bold text-3xl text-primary font-mono-amount">
                    {formatCurrency(service.basePrice)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="bg-muted/20 rounded-xl p-5 border border-border/60">
              <h2 className="font-display font-semibold text-foreground text-sm uppercase tracking-wide mb-3">
                About this service
              </h2>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {service.description}
              </p>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Listed {formatTimestamp(service.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                New listing
              </span>
            </div>

            {/* Mobile: Quote CTA / form / success */}
            <div id="quote-form-anchor" className="lg:hidden pt-2">
              {quoteSubmitted ? (
                <QuoteSuccessCard onDashboard={handleGoToDashboard} />
              ) : showForm ? (
                <QuoteRequestForm
                  serviceId={service.id}
                  onSuccess={handleQuoteSuccess}
                  onCancel={() => setShowForm(false)}
                />
              ) : isAuthenticated ? (
                <Button
                  className="button-primary w-full"
                  onClick={handleRequestQuoteClick}
                  data-ocid="service-detail.request-quote-mobile.button"
                >
                  Request Quote
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary/5"
                  onClick={login}
                  data-ocid="service-detail.sign-in-mobile.button"
                >
                  Sign In to Request Quote
                </Button>
              )}
            </div>

            {/* Ratings */}
            <RatingsSection serviceId={service.id} />
          </div>

          {/* ── Right Column ─────────────────────────────────────────────── */}
          <div className="hidden lg:flex flex-col gap-4 sticky top-24">
            {quoteSubmitted ? (
              <QuoteSuccessCard onDashboard={handleGoToDashboard} />
            ) : (
              <ProviderCard
                providerId={String(service.providerId)}
                onRequestQuote={handleRequestQuoteClick}
                isAuthenticated={isAuthenticated}
                onSignIn={login}
              />
            )}

            {showForm && !quoteSubmitted && (
              <QuoteRequestForm
                serviceId={service.id}
                onSuccess={handleQuoteSuccess}
                onCancel={() => setShowForm(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
