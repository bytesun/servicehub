import type { BookingStatus } from "../types";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  paymentPending: {
    label: "Payment Pending",
    className: "bg-primary/10 text-primary border border-primary/30",
  },
  started: {
    label: "In Progress",
    className: "bg-accent/15 text-accent border border-accent/30",
  },
  completed: {
    label: "Completed",
    className: "bg-primary/15 text-primary border border-primary/30",
  },
  disputed: {
    label: "Disputed",
    className:
      "bg-destructive/10 text-destructive border border-destructive/20",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-muted/20 text-muted-foreground border border-border",
  },
};

export default function BookingStatusBadge({
  status,
  className = "",
}: BookingStatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-muted/20 text-muted-foreground",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.className} ${className}`}
      data-ocid={`booking-status-${status}`}
    >
      {config.label}
    </span>
  );
}
