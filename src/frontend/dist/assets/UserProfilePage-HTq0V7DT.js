import { c as createLucideIcon, g as useParams, a as useAuth, r as reactExports, o as useUserProfile, a2 as useProviderRatings, b as useListServices, j as jsxRuntimeExports, k as LoadingSpinner, U as UserAvatar, B as Button, w as Briefcase, n as Separator, L as Link, a3 as useReplyRating, Z as LoaderCircle, X } from "./index-BJQw-dZb.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DJwG1xfA.js";
import { I as Input } from "./input-CTsVHrW8.js";
import { T as Textarea, L as Label } from "./textarea-yVhHD2GQ.js";
import { S as Skeleton } from "./skeleton-l7FOGfhk.js";
import { u as ue } from "./index-CLm5tAfo.js";
import { E as EmptyState } from "./EmptyState-ilxOlh8N.js";
import { S as ServiceCard } from "./ServiceCard-DoPxfTEI.js";
import { a as StarRating, S as Star } from "./StarRating-CUXHeY46.js";
import { a as formatTimestamp } from "./types-CFG00yAA.js";
import { A as ArrowLeft } from "./arrow-left-Byg1VtFE.js";
import { C as Calendar } from "./calendar-OhfRUxPl.js";
import { M as MessageSquare } from "./message-square-DtTxccu1.js";
import "./CategoryBadge-32UOtp1V.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
function parsePrincipal(str) {
  return str;
}
function RatingItem({
  rating,
  isOwnProfile,
  index
}) {
  const [showReply, setShowReply] = reactExports.useState(false);
  const [replyText, setReplyText] = reactExports.useState("");
  const [localReply, setLocalReply] = reactExports.useState(null);
  const replyMutation = useReplyRating();
  const displayedReply = rating.providerReply ?? localReply;
  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    try {
      await replyMutation.mutateAsync({
        ratingId: rating.id,
        reply: replyText.trim()
      });
      setLocalReply(replyText.trim());
      setShowReply(false);
      ue.success("Reply posted.");
    } catch {
      ue.error("Failed to post reply. Try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "py-4 border-b border-border last:border-0 last:pb-0 space-y-2",
      "data-ocid": `profile.rating.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: Number(rating.stars), readonly: true, size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatTimestamp(rating.createdAt) })
          ] }),
          isOwnProfile && !displayedReply && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "text-xs h-7",
              onClick: () => setShowReply((v) => !v),
              "data-ocid": `profile.rating.reply_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3 mr-1" }),
                "Reply"
              ]
            }
          )
        ] }),
        rating.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: rating.comment }),
        displayedReply && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pl-3 border-l-2 border-primary/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-primary mb-0.5", children: "Provider reply" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: displayedReply })
        ] }),
        showReply && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Write your response to this review…",
              value: replyText,
              onChange: (e) => setReplyText(e.target.value),
              rows: 3,
              className: "text-sm resize-none",
              "data-ocid": `profile.rating.reply_input.${index + 1}`
            }
          ),
          replyMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Failed to send reply. Please try again." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setShowReply(false),
                "data-ocid": `profile.rating.cancel_button.${index + 1}`,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                onClick: handleSendReply,
                disabled: !replyText.trim() || replyMutation.isPending,
                "data-ocid": `profile.rating.submit_button.${index + 1}`,
                children: replyMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : "Send reply"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function EditProfileModal({
  currentName,
  currentBio,
  onClose
}) {
  const [name, setName] = reactExports.useState(currentName);
  const [bio, setBio] = reactExports.useState(currentBio);
  const handleSave = () => {
    if (!name.trim()) {
      ue.error("Name is required.");
      return;
    }
    ue.info("Profile updates will be available in a future release.");
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm",
      "data-ocid": "profile.edit_dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Edit Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7",
              onClick: onClose,
              "data-ocid": "profile.edit_dialog.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", children: "Display Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-name",
                value: name,
                onChange: (e) => setName(e.target.value),
                className: "mt-1",
                "data-ocid": "profile.edit_dialog.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-bio", children: "Bio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "edit-bio",
                value: bio,
                onChange: (e) => setBio(e.target.value),
                placeholder: "Tell people about yourself…",
                rows: 3,
                className: "mt-1 resize-none text-sm",
                "data-ocid": "profile.edit_dialog.bio_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: onClose,
                "data-ocid": "profile.edit_dialog.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "button-primary",
                onClick: handleSave,
                "data-ocid": "profile.edit_dialog.save_button",
                children: "Save Changes"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function UserProfilePage() {
  var _a;
  const { userId } = useParams({ from: "/profile/$userId" });
  const { user: currentUser, actorReady } = useAuth();
  const [showEditModal, setShowEditModal] = reactExports.useState(false);
  const isOwnProfile = ((_a = currentUser == null ? void 0 : currentUser.id) == null ? void 0 : _a.toString()) === userId;
  const principalId = parsePrincipal(userId);
  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
    isFetched: profileFetched
  } = useUserProfile(actorReady ? principalId : null);
  const isProvider = (profile == null ? void 0 : profile.role) === "provider";
  const { data: ratings = [], isLoading: ratingsLoading } = useProviderRatings(
    isProvider && actorReady ? principalId : null
  );
  const { data: allServices = [], isLoading: servicesLoading } = useListServices(null);
  const providerServices = allServices.filter(
    (s) => s.providerId.toString() === userId
  );
  const avgRating = ratings.length > 0 ? ratings.reduce((s, r) => s + Number(r.stars), 0) / ratings.length : 0;
  const isLoading = !actorReady || profileLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex justify-center items-center py-32",
        "data-ocid": "profile.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading profile…" })
      }
    );
  }
  if (profileError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "⚠️",
        title: "Couldn't load profile",
        description: "There was a problem loading this profile. Please try again.",
        actionLabel: "Browse Services",
        actionHref: "/services"
      }
    ) });
  }
  if (profileFetched && !profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "👤",
        title: "User not found",
        description: "This profile doesn't exist or may have been removed.",
        actionLabel: "Browse Services",
        actionHref: "/services"
      }
    ) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex justify-center items-center py-32",
        "data-ocid": "profile.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading profile…" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6",
      "data-ocid": "profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => window.history.back(),
            className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
            "data-ocid": "profile.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Back"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "profile.card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-6 flex-wrap sm:flex-nowrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { name: profile.displayName, size: "lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: profile.displayName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "provider-badge capitalize", children: profile.role }),
                isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full", children: "You" })
              ] }),
              isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "gap-1.5 shrink-0",
                  onClick: () => setShowEditModal(true),
                  "data-ocid": "profile.edit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
                    "Edit Profile"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground flex-wrap mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                "Member since ",
                formatTimestamp(profile.createdAt)
              ] }),
              isProvider && ratings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: avgRating, readonly: true, size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: avgRating.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "(",
                  ratings.length,
                  " review",
                  ratings.length !== 1 ? "s" : "",
                  ")"
                ] })
              ] }),
              isProvider && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4" }),
                providerServices.length,
                " service",
                providerServices.length !== 1 ? "s" : ""
              ] })
            ] }),
            profile.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: profile.bio })
          ] })
        ] }) }) }),
        isProvider && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "profile.services.card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-5 h-5 text-primary" }),
            "Services",
            providerServices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground", children: [
              "(",
              providerServices.length,
              ")"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: servicesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "space-y-3 rounded-xl border border-border p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28" })
                ] })
              ]
            },
            i
          )) }) : providerServices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-10 text-center",
              "data-ocid": "profile.services.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No active services listed yet." }),
                isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "mt-3 button-primary", children: "Add a Service" }) })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
              "data-ocid": "profile.services.list",
              children: providerServices.map((service, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": `profile.services.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ServiceCard,
                    {
                      service,
                      providerName: profile.displayName,
                      averageRating: avgRating,
                      ratingCount: ratings.length
                    }
                  )
                },
                String(service.id)
              ))
            }
          ) })
        ] }),
        isProvider && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "profile.reviews.card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-primary" }),
            "Reviews",
            ratings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground", children: [
              "(",
              ratings.length,
              ")"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: ratingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "space-y-2 pb-4 border-b border-border last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
              ]
            },
            i
          )) }) : ratings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-10 flex flex-col items-center gap-3 text-center",
              "data-ocid": "profile.reviews.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-6 h-6 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No reviews yet. Completed bookings will appear here." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", "data-ocid": "profile.reviews.list", children: ratings.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            RatingItem,
            {
              rating: r,
              isOwnProfile,
              index: i
            },
            String(r.id)
          )) }) })
        ] }),
        showEditModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditProfileModal,
          {
            currentName: profile.displayName,
            currentBio: profile.bio,
            onClose: () => setShowEditModal(false)
          }
        )
      ]
    }
  );
}
export {
  UserProfilePage as default
};
