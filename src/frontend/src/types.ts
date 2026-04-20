export type {
  ServiceView,
  QuoteView,
  BookingView,
  InvoiceView,
  RatingView,
  UserProfile,
  ServiceCategory,
  QuoteStatus,
  BookingStatus,
  EscrowStatus,
  UserRole,
  NotificationView,
  NotificationId,
  CreateServiceInput,
  UpdateServiceInput,
  RequestQuoteInput,
  ReplyQuoteInput,
  EstimationBreakdown,
  CreateRatingInput,
  RegisterInput,
  ServiceId,
  QuoteId,
  BookingId,
  InvoiceId,
  RatingId,
  UserId,
  Timestamp,
} from "./backend.d.ts";

// Service categories — must match backend ServiceCategory enum exactly
export const SERVICE_CATEGORIES: Array<{
  value: string;
  label: string;
  icon: string;
}> = [
  { value: "homeRepair", label: "Home Repair", icon: "🔧" },
  { value: "cleaning", label: "Cleaning", icon: "🧹" },
  { value: "design", label: "Design", icon: "🎨" },
  { value: "it", label: "IT & Tech", icon: "💻" },
  { value: "marketing", label: "Marketing", icon: "📣" },
  { value: "garden", label: "Garden", icon: "🌱" },
  { value: "other", label: "Other", icon: "📦" },
];

export function getCategoryInfo(cat: string): { label: string; icon: string } {
  return (
    SERVICE_CATEGORIES.find((c) => c.value === cat) ?? {
      label: String(cat),
      icon: "📦",
    }
  );
}

/** Convert nanosecond timestamp (bigint) to locale date string */
export function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Format integer cents (e.g. 250000n = $2,500.00) to USD currency string */
export function formatCurrency(amount: bigint): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount) / 100);
}
