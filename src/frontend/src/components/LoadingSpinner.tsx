import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const SIZE_MAP = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-10 h-10" };

export default function LoadingSpinner({
  size = "md",
  label = "Loading…",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
      aria-label={label}
      aria-busy="true"
    >
      <Loader2 className={`${SIZE_MAP[size]} text-primary animate-spin`} />
      {size === "lg" && (
        <span className="text-sm text-muted-foreground">{label}</span>
      )}
      <span className="sr-only">{label}</span>
    </div>
  );
}
