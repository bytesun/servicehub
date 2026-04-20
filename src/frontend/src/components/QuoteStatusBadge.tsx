import type { QuoteStatus } from "../types";

interface QuoteStatusBadgeProps {
  status: QuoteStatus;
  className?: string;
}

const STATUS_CONFIG: Record<QuoteStatus, { label: string; className: string }> =
  {
    pending: {
      label: "Pending",
      className: "bg-muted/40 text-muted-foreground border border-border",
    },
    replied: {
      label: "Offer Received",
      className: "bg-primary/10 text-primary border border-primary/30",
    },
    accepted: {
      label: "Accepted",
      className: "bg-accent/15 text-accent border border-accent/30",
    },
    rejected: {
      label: "Rejected",
      className:
        "bg-destructive/10 text-destructive border border-destructive/20",
    },
    cancelled: {
      label: "Cancelled",
      className:
        "bg-muted/20 text-muted-foreground border border-border line-through",
    },
  };

export default function QuoteStatusBadge({
  status,
  className = "",
}: QuoteStatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-muted/20 text-muted-foreground",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.className} ${className}`}
      data-ocid={`quote-status-${status}`}
    >
      {config.label}
    </span>
  );
}
