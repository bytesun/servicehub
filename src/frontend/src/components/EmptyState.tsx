import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-8 ${className}`}
      data-ocid="empty-state"
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 text-3xl">
          {icon}
        </div>
      )}
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="button-primary"
          data-ocid="empty-state-cta"
        >
          {actionLabel}
        </Button>
      )}
      {actionLabel && actionHref && !onAction && (
        <a
          href={actionHref}
          className="button-primary inline-flex items-center"
          data-ocid="empty-state-cta"
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}
