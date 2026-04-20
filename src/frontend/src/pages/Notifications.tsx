import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  BellOff,
  CheckCheck,
  CheckCircle,
  DollarSign,
  MessageSquare,
  Reply,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { NotificationType } from "../backend";
import AuthGuard from "../components/AuthGuard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from "../hooks/useBackend";
import type { NotificationView } from "../types";
import { formatTimestamp } from "../types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const NOTIFICATION_META: Record<
  string,
  {
    icon: React.ReactNode;
    bg: string;
    label: string;
    variant: "default" | "secondary" | "outline";
  }
> = {
  [NotificationType.quoteReceived]: {
    icon: <MessageSquare className="w-5 h-5 text-primary" />,
    bg: "bg-primary/10",
    label: "Quote",
    variant: "default",
  },
  [NotificationType.replyReceived]: {
    icon: <Reply className="w-5 h-5 text-accent" />,
    bg: "bg-accent/10",
    label: "Reply",
    variant: "secondary",
  },
  [NotificationType.bookingConfirmed]: {
    icon: <CheckCircle className="w-5 h-5 text-primary" />,
    bg: "bg-primary/10",
    label: "Booking",
    variant: "outline",
  },
  [NotificationType.paymentReceived]: {
    icon: <DollarSign className="w-5 h-5 text-primary" />,
    bg: "bg-primary/10",
    label: "Payment",
    variant: "outline",
  },
};

const getFallbackMeta = () => ({
  icon: <Bell className="w-5 h-5 text-muted-foreground" />,
  bg: "bg-muted/40",
  label: "Update",
  variant: "outline" as const,
});

// ─── Notification Item ────────────────────────────────────────────────────────

function NotificationItem({
  notification,
  index,
}: {
  notification: NotificationView;
  index: number;
}) {
  const navigate = useNavigate();
  const markRead = useMarkNotificationRead();
  const meta = NOTIFICATION_META[notification.notifType] ?? getFallbackMeta();

  async function handleClick() {
    if (!notification.isRead) {
      await markRead.mutateAsync(notification.id).catch(() => {});
    }
    if (notification.link) {
      navigate({ to: notification.link as never });
    }
  }

  return (
    <button
      type="button"
      className={`w-full text-left flex items-start gap-4 px-5 py-4 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        !notification.isRead ? "bg-primary/5" : ""
      }`}
      onClick={handleClick}
      data-ocid={`notifications.item.${index + 1}`}
    >
      {/* Icon */}
      <div
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${meta.bg}`}
      >
        {meta.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <p
              className={`text-sm leading-snug truncate ${
                notification.isRead
                  ? "text-foreground"
                  : "font-semibold text-foreground"
              }`}
            >
              {notification.title}
            </p>
            <Badge variant={meta.variant} className="shrink-0 text-xs py-0 h-5">
              {meta.label}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatTimestamp(notification.createdAt)}
            </span>
            {!notification.isRead && (
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {notification.body}
        </p>
      </div>
    </button>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function NotificationSkeleton() {
  return (
    <div className="flex items-start gap-4 px-5 py-4">
      <Skeleton className="w-10 h-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

function NotificationsContent() {
  const { actorReady } = useAuth();
  const [page, setPage] = useState(0);

  const { data: notifications = [], isLoading } = useNotifications(
    PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const markAllRead = useMarkAllNotificationsRead();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  async function handleMarkAllRead() {
    try {
      await markAllRead.mutateAsync();
      toast.success("All notifications marked as read.");
    } catch {
      toast.error("Failed to mark notifications as read.");
    }
  }

  // Show loading spinner until actor is ready
  if (!actorReady) {
    return (
      <div
        className="flex justify-center items-center py-32"
        data-ocid="notifications.loading_state"
      >
        <LoadingSpinner size="lg" label="Loading notifications…" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1
            className="font-display font-bold text-2xl text-foreground"
            data-ocid="notifications.page"
          >
            Notifications
          </h1>
          {!isLoading && unreadCount > 0 && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {unreadCount} unread
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={markAllRead.isPending}
            className="gap-1.5 shrink-0"
            data-ocid="notifications.mark_all_read_button"
          >
            {markAllRead.isPending ? (
              <span
                className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"
                aria-hidden="true"
              />
            ) : (
              <CheckCheck className="w-4 h-4" />
            )}
            Mark all read
          </Button>
        )}
      </div>

      {/* List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div data-ocid="notifications.loading_state">
            {Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <NotificationSkeleton key={i} />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div
            className="flex flex-col items-center gap-4 py-16 text-center px-6"
            data-ocid="notifications.empty_state"
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <BellOff className="w-7 h-7 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                No notifications yet
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                You'll see updates about your quotes, bookings, and payments
                here.
              </p>
            </div>
          </div>
        ) : (
          <div
            className="divide-y divide-border"
            data-ocid="notifications.list"
          >
            {notifications.map((notification, i) => (
              <NotificationItem
                key={String(notification.id)}
                notification={notification}
                index={i}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-6">
        {page > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            data-ocid="notifications.pagination_prev"
          >
            ← Previous
          </Button>
        )}
        {notifications.length === PAGE_SIZE && (
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            data-ocid="notifications.pagination_next"
          >
            Load more
          </Button>
        )}
      </div>
    </div>
  );
}

export default function Notifications() {
  return (
    <AuthGuard>
      <NotificationsContent />
    </AuthGuard>
  );
}
