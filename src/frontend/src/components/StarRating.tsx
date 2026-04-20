import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-6 h-6" };

export default function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
  className = "",
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];
  const sizeClass = SIZE_MAP[size];

  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role={readonly ? "img" : "radiogroup"}
      aria-label={`Rating: ${value} out of 5 stars`}
    >
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          role={readonly ? undefined : "radio"}
          aria-checked={readonly ? undefined : value === star}
          aria-label={
            readonly ? undefined : `${star} star${star !== 1 ? "s" : ""}`
          }
          onClick={readonly ? undefined : () => onChange?.(star)}
          disabled={readonly}
          className={`transition-colors ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110 transition-transform"} disabled:pointer-events-none`}
          data-ocid={readonly ? undefined : `star-${star}`}
        >
          <Star
            className={`${sizeClass} ${
              star <= Math.round(value)
                ? "fill-primary text-primary"
                : "fill-none text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
