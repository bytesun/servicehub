import { c as createLucideIcon, j as jsxRuntimeExports, a as useAuth, r as reactExports, a9 as useNotifications, aa as useMarkAllNotificationsRead, k as LoadingSpinner, B as Button, u as useNavigate, ab as useMarkNotificationRead, ac as NotificationType, ad as Bell } from "./index-BJQw-dZb.js";
import { B as Badge } from "./badge-DWGdRvla.js";
import { S as Skeleton } from "./skeleton-l7FOGfhk.js";
import { u as ue } from "./index-CLm5tAfo.js";
import { A as AuthGuard } from "./AuthGuard-ODJ9Wg5N.js";
import { a as formatTimestamp } from "./types-CFG00yAA.js";
import { D as DollarSign } from "./dollar-sign-DpHGY5oy.js";
import { C as CircleCheckBig } from "./circle-check-big-BDcmROHD.js";
import { M as MessageSquare } from "./message-square-DtTxccu1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M20 18v-2a4 4 0 0 0-4-4H4", key: "5vmcpk" }],
  ["path", { d: "m9 17-5-5 5-5", key: "nvlc11" }]
];
const Reply = createLucideIcon("reply", __iconNode);
const NOTIFICATION_META = {
  [NotificationType.quoteReceived]: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 text-primary" }),
    bg: "bg-primary/10",
    label: "Quote",
    variant: "default"
  },
  [NotificationType.replyReceived]: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Reply, { className: "w-5 h-5 text-accent" }),
    bg: "bg-accent/10",
    label: "Reply",
    variant: "secondary"
  },
  [NotificationType.bookingConfirmed]: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-primary" }),
    bg: "bg-primary/10",
    label: "Booking",
    variant: "outline"
  },
  [NotificationType.paymentReceived]: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-5 h-5 text-primary" }),
    bg: "bg-primary/10",
    label: "Payment",
    variant: "outline"
  }
};
const getFallbackMeta = () => ({
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 text-muted-foreground" }),
  bg: "bg-muted/40",
  label: "Update",
  variant: "outline"
});
function NotificationItem({
  notification,
  index
}) {
  const navigate = useNavigate();
  const markRead = useMarkNotificationRead();
  const meta = NOTIFICATION_META[notification.notifType] ?? getFallbackMeta();
  async function handleClick() {
    if (!notification.isRead) {
      await markRead.mutateAsync(notification.id).catch(() => {
      });
    }
    if (notification.link) {
      navigate({ to: notification.link });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: `w-full text-left flex items-start gap-4 px-5 py-4 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${!notification.isRead ? "bg-primary/5" : ""}`,
      onClick: handleClick,
      "data-ocid": `notifications.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${meta.bg}`,
            children: meta.icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-sm leading-snug truncate ${notification.isRead ? "text-foreground" : "font-semibold text-foreground"}`,
                  children: notification.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: meta.variant, className: "shrink-0 text-xs py-0 h-5", children: meta.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: formatTimestamp(notification.createdAt) }),
              !notification.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary shrink-0" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 leading-relaxed", children: notification.body })
        ] })
      ]
    }
  );
}
function NotificationSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 px-5 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-full shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-12 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
    ] })
  ] });
}
const PAGE_SIZE = 20;
function NotificationsContent() {
  const { actorReady } = useAuth();
  const [page, setPage] = reactExports.useState(0);
  const { data: notifications = [], isLoading } = useNotifications(
    PAGE_SIZE,
    page * PAGE_SIZE
  );
  const markAllRead = useMarkAllNotificationsRead();
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  async function handleMarkAllRead() {
    try {
      await markAllRead.mutateAsync();
      ue.success("All notifications marked as read.");
    } catch {
      ue.error("Failed to mark notifications as read.");
    }
  }
  if (!actorReady) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex justify-center items-center py-32",
        "data-ocid": "notifications.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading notifications…" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display font-bold text-2xl text-foreground",
            "data-ocid": "notifications.page",
            children: "Notifications"
          }
        ),
        !isLoading && unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          unreadCount,
          " unread"
        ] })
      ] }),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleMarkAllRead,
          disabled: markAllRead.isPending,
          className: "gap-1.5 shrink-0",
          "data-ocid": "notifications.mark_all_read_button",
          children: [
            markAllRead.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin",
                "aria-hidden": "true"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-4 h-4" }),
            "Mark all read"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "notifications.loading_state", children: Array.from({ length: 5 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
      /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationSkeleton, {}, i)
    )) }) : notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-16 text-center px-6",
        "data-ocid": "notifications.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No notifications yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "You'll see updates about your quotes, bookings, and payments here." })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "divide-y divide-border",
        "data-ocid": "notifications.list",
        children: notifications.map((notification, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          NotificationItem,
          {
            notification,
            index: i
          },
          String(notification.id)
        ))
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-3 mt-6", children: [
      page > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => setPage((p) => Math.max(0, p - 1)),
          "data-ocid": "notifications.pagination_prev",
          children: "← Previous"
        }
      ),
      notifications.length === PAGE_SIZE && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: () => setPage((p) => p + 1),
          "data-ocid": "notifications.pagination_next",
          children: "Load more"
        }
      )
    ] })
  ] });
}
function Notifications() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthGuard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsContent, {}) });
}
export {
  Notifications as default
};
