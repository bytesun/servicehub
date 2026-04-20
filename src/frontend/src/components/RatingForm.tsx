import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, Loader2, Star } from "lucide-react";
import { useState } from "react";
import { useCreateRating } from "../hooks/useBackend";
import type { BookingId } from "../types";
import StarRating from "./StarRating";

interface RatingFormProps {
  bookingId: BookingId;
  onSuccess?: () => void;
  className?: string;
}

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

export default function RatingForm({
  bookingId,
  onSuccess,
  className = "",
}: RatingFormProps) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const createRating = useCreateRating();

  const alreadyRated =
    createRating.isError &&
    createRating.error instanceof Error &&
    createRating.error.message.toLowerCase().includes("already");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stars === 0) return;

    try {
      await createRating.mutateAsync({
        bookingId,
        stars: BigInt(stars),
        comment: comment.trim() || undefined,
      });
      setSubmitted(true);
      onSuccess?.();
    } catch {
      // error surfaced via createRating.isError
    }
  };

  if (submitted) {
    return (
      <Card
        className={`p-6 border border-border text-center space-y-3 ${className}`}
        data-ocid="rating-success"
      >
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-6 h-6 text-accent" />
        </div>
        <h3 className="font-display font-semibold text-foreground">
          Thank you for your review!
        </h3>
        <p className="text-sm text-muted-foreground">
          Your feedback helps providers improve and helps clients choose the
          right professional.
        </p>
      </Card>
    );
  }

  if (alreadyRated) {
    return (
      <Card
        className={`p-6 border border-border text-center space-y-2 ${className}`}
        data-ocid="rating-already-exists"
      >
        <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto" />
        <p className="text-sm text-muted-foreground">
          You've already submitted a review for this booking.
        </p>
      </Card>
    );
  }

  return (
    <Card className={`p-6 border border-border ${className}`}>
      <div className="flex items-center gap-2 mb-5">
        <Star className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-foreground">
          Rate this service
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Star picker */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Your rating</Label>
          <div
            className="flex items-center gap-3"
            data-ocid="star-rating-input"
          >
            <StarRating value={stars} onChange={setStars} size="lg" />
            {stars > 0 && (
              <span className="text-sm font-medium text-primary">
                {STAR_LABELS[stars]}
              </span>
            )}
          </div>
          {stars === 0 && (
            <p className="text-xs text-muted-foreground">
              Click a star to rate
            </p>
          )}
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <Label htmlFor="rating-comment" className="text-sm font-medium">
            Comment{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </Label>
          <Textarea
            id="rating-comment"
            placeholder="Share your experience with this provider…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            maxLength={500}
            className="resize-none text-sm"
            data-ocid="input-rating-comment"
          />
          {comment.length > 0 && (
            <p className="text-xs text-muted-foreground text-right">
              {comment.length}/500
            </p>
          )}
        </div>

        {/* Generic error */}
        {createRating.isError && !alreadyRated && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              {createRating.error instanceof Error
                ? createRating.error.message
                : "Failed to submit rating. Please try again."}
            </span>
          </div>
        )}

        <Button
          type="submit"
          disabled={stars === 0 || createRating.isPending}
          className="w-full"
          data-ocid="btn-submit-rating"
        >
          {createRating.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit review"
          )}
        </Button>
      </form>
    </Card>
  );
}
