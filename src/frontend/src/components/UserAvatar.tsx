interface UserAvatarProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  imageUrl?: string;
  className?: string;
}

const SIZE_MAP = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-14 h-14 text-xl",
};

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function getColorClass(name: string): string {
  const colors = [
    "bg-primary/20 text-primary",
    "bg-accent/20 text-accent-foreground",
    "bg-secondary text-secondary-foreground",
    "bg-chart-3/20 text-foreground",
    "bg-chart-4/20 text-foreground",
  ];
  const idx =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  return colors[idx];
}

export default function UserAvatar({
  name,
  size = "md",
  imageUrl,
  className = "",
}: UserAvatarProps) {
  const sizeClass = SIZE_MAP[size];
  const colorClass = getColorClass(name);
  const initials = getInitials(name || "?");

  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold shrink-0 overflow-hidden ${sizeClass} ${colorClass} ${className}`}
      aria-label={name}
      title={name}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span aria-hidden="true">{initials || "?"}</span>
      )}
    </div>
  );
}
