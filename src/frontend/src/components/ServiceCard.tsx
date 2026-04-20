import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import type { ServiceView } from "../types";
import { formatCurrency, getCategoryInfo } from "../types";
import CategoryBadge from "./CategoryBadge";
import StarRating from "./StarRating";
import UserAvatar from "./UserAvatar";

interface ServiceCardProps {
  service: ServiceView;
  averageRating?: number;
  ratingCount?: number;
  providerName?: string;
  onRequestQuote?: () => void;
}

export default function ServiceCard({
  service,
  averageRating = 0,
  ratingCount = 0,
  providerName,
  onRequestQuote,
}: ServiceCardProps) {
  const { icon } = getCategoryInfo(service.category);
  const isEstimate = service.priceType === "onSiteEstimate";

  return (
    <Card
      className="group overflow-hidden flex flex-col border border-border bg-card hover:shadow-md transition-smooth cursor-pointer rounded-xl"
      data-ocid={`service.card.${service.id}`}
    >
      <CardContent className="p-0 flex flex-col flex-1">
        {/* Category accent strip */}
        <div className="h-1 w-full bg-primary/70 rounded-t-xl" />

        <div className="p-5 flex flex-col flex-1 gap-3">
          {/* Category badge + icon */}
          <div className="flex items-center justify-between">
            <CategoryBadge category={service.category} size="sm" />
            <span className="text-xl" aria-hidden="true">
              {icon}
            </span>
          </div>

          {/* Title & description */}
          <div className="flex-1 space-y-1.5">
            <Link
              to="/services/$id"
              params={{ id: String(service.id) }}
              className="font-display font-semibold text-base text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug block"
              data-ocid={`service.title.${service.id}`}
            >
              {service.title}
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Provider + rating row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <UserAvatar name={providerName ?? "Provider"} size="xs" />
              <span className="text-xs text-muted-foreground truncate">
                {providerName ?? "Provider"}
              </span>
            </div>
            {ratingCount > 0 && (
              <div className="flex items-center gap-1">
                <StarRating value={averageRating} readonly size="sm" />
                <span className="text-xs text-muted-foreground">
                  ({ratingCount})
                </span>
              </div>
            )}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between gap-3 pt-1 border-t border-border/60">
            <div>
              {isEstimate ? (
                <>
                  <p className="text-xs text-muted-foreground">Pricing</p>
                  <p className="font-display font-medium text-foreground text-sm">
                    Contact for estimate
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground">Starting at</p>
                  <p className="font-display font-bold text-foreground text-base font-mono-amount">
                    {formatCurrency(service.basePrice)}
                  </p>
                </>
              )}
            </div>
            {onRequestQuote && (
              <Button
                size="sm"
                className="button-primary shrink-0"
                onClick={onRequestQuote}
                data-ocid={`service.quote-btn.${service.id}`}
              >
                Request Quote
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
