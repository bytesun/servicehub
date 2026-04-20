import type { ServiceCategory } from "../types";
import { getCategoryInfo } from "../types";

interface CategoryBadgeProps {
  category: ServiceCategory;
  size?: "sm" | "md";
  className?: string;
}

export default function CategoryBadge({
  category,
  size = "md",
  className = "",
}: CategoryBadgeProps) {
  const { label, icon } = getCategoryInfo(category);
  const sizeClass =
    size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-secondary/60 text-secondary-foreground font-medium border border-border/50 ${sizeClass} ${className}`}
      data-ocid={`category-badge-${category}`}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </span>
  );
}
