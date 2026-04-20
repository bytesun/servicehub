import { j as jsxRuntimeExports } from "./index-BJQw-dZb.js";
const STATUS_CONFIG = {
  paymentPending: {
    label: "Payment Pending",
    className: "bg-primary/10 text-primary border border-primary/30"
  },
  started: {
    label: "In Progress",
    className: "bg-accent/15 text-accent border border-accent/30"
  },
  completed: {
    label: "Completed",
    className: "bg-primary/15 text-primary border border-primary/30"
  },
  disputed: {
    label: "Disputed",
    className: "bg-destructive/10 text-destructive border border-destructive/20"
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-muted/20 text-muted-foreground border border-border"
  }
};
function BookingStatusBadge({
  status,
  className = ""
}) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-muted/20 text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.className} ${className}`,
      "data-ocid": `booking-status-${status}`,
      children: config.label
    }
  );
}
export {
  BookingStatusBadge as B
};
