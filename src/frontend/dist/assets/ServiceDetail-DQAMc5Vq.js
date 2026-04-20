import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Primitive, e as cn, f as useInternetIdentity, l as loadConfig, H as HttpAgent, S as StorageClient, g as useParams, u as useNavigate, a as useAuth, h as useService, B as Button, L as Link, i as useRequestQuote, k as LoadingSpinner, m as useServiceRatings, n as Separator, U as UserAvatar, o as useUserProfile, X } from "./index-BJQw-dZb.js";
import { C as Card, a as CardContent } from "./card-DJwG1xfA.js";
import { L as Label, T as Textarea } from "./textarea-yVhHD2GQ.js";
import { S as Skeleton } from "./skeleton-l7FOGfhk.js";
import { u as ue } from "./index-CLm5tAfo.js";
import { C as CategoryBadge } from "./CategoryBadge-32UOtp1V.js";
import { S as Star, a as StarRating } from "./StarRating-CUXHeY46.js";
import { f as formatCurrency, a as formatTimestamp } from "./types-CFG00yAA.js";
import { A as ArrowLeft } from "./arrow-left-Byg1VtFE.js";
import { C as Calendar } from "./calendar-OhfRUxPl.js";
import { C as CircleCheck } from "./circle-check-B9CFG7d7.js";
import { M as MessageSquare } from "./message-square-DtTxccu1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }],
  ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const CircleUserRound = createLucideIcon("circle-user-round", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const MAX_PHOTOS = 5;
const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
async function createStorageClient(identity) {
  var _a;
  const config = await loadConfig();
  const agent = new HttpAgent({
    host: config.backend_host,
    ...identity ? { identity } : {}
  });
  if ((_a = config.backend_host) == null ? void 0 : _a.includes("localhost")) {
    await agent.fetchRootKey().catch(() => {
    });
  }
  return new StorageClient(
    config.bucket_name ?? "default-bucket",
    config.storage_gateway_url ?? "https://blob.caffeine.ai",
    config.backend_canister_id,
    config.project_id ?? "0000000-0000-0000-0000-00000000000",
    agent
  );
}
function usePhotoUpload() {
  const { identity } = useInternetIdentity();
  const [photos, setPhotos] = reactExports.useState([]);
  const addPhotos = reactExports.useCallback(
    (files) => {
      const fileArray = Array.from(files);
      const remaining = MAX_PHOTOS - photos.length;
      if (remaining <= 0) return;
      const toAdd = fileArray.slice(0, remaining).filter((f) => {
        if (!ACCEPTED_TYPES.includes(f.type)) return false;
        if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) return false;
        return true;
      });
      const newPhotos = toAdd.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        progress: 0,
        uploading: false
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    },
    [photos.length]
  );
  const removePhoto = reactExports.useCallback((index) => {
    setPhotos((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].previewUrl);
      updated.splice(index, 1);
      return updated;
    });
  }, []);
  const uploadAll = reactExports.useCallback(async () => {
    const pending = photos.filter((p) => !p.uploadedUrl && !p.error);
    if (pending.length === 0) {
      return photos.filter((p) => p.uploadedUrl).map((p) => p.uploadedUrl);
    }
    let storageClient;
    try {
      storageClient = await createStorageClient(identity ?? void 0);
    } catch {
      throw new Error("Failed to initialize storage client");
    }
    await Promise.all(
      photos.map(async (photo, idx) => {
        if (photo.uploadedUrl || photo.error) return;
        setPhotos((prev) => {
          const next = [...prev];
          next[idx] = { ...next[idx], uploading: true, error: void 0 };
          return next;
        });
        try {
          const bytes = new Uint8Array(await photo.file.arrayBuffer());
          const { hash } = await storageClient.putFile(bytes, (progress) => {
            setPhotos((prev) => {
              const next = [...prev];
              next[idx] = { ...next[idx], progress };
              return next;
            });
          });
          const url = await storageClient.getDirectURL(hash);
          setPhotos((prev) => {
            const next = [...prev];
            next[idx] = {
              ...next[idx],
              uploading: false,
              progress: 100,
              uploadedUrl: url
            };
            return next;
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Upload failed";
          setPhotos((prev) => {
            const next = [...prev];
            next[idx] = { ...next[idx], uploading: false, error: message };
            return next;
          });
        }
      })
    );
    return new Promise((resolve) => {
      setPhotos((prev) => {
        const urls = prev.filter((p) => p.uploadedUrl).map((p) => p.uploadedUrl);
        resolve(urls);
        return prev;
      });
    });
  }, [photos, identity]);
  const isUploading = photos.some((p) => p.uploading);
  const hasErrors = photos.some((p) => p.error);
  const canAddMore = photos.length < MAX_PHOTOS;
  return {
    photos,
    addPhotos,
    removePhoto,
    uploadAll,
    isUploading,
    hasErrors,
    canAddMore,
    maxPhotos: MAX_PHOTOS
  };
}
function ServiceDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full rounded-xl" }) })
  ] }) });
}
function ProviderCard({
  providerId,
  onRequestQuote,
  isAuthenticated,
  onSignIn
}) {
  const { data: provider, isLoading } = useUserProfile(providerId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-md" })
    ] }) });
  }
  const displayName = (provider == null ? void 0 : provider.displayName) ?? "Provider";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Service Provider" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/profile/$userId",
        params: { userId: providerId },
        className: "flex items-center gap-3 group",
        "data-ocid": "service-detail.provider.link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { name: displayName, size: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate", children: displayName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "w-3 h-3" }),
              "View profile"
            ] })
          ] })
        ]
      }
    ),
    (provider == null ? void 0 : provider.bio) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-3", children: provider.bio }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        className: "button-primary w-full",
        onClick: onRequestQuote,
        "data-ocid": "service-detail.request-quote.button",
        children: "Request Quote"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sign in to request a quote" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "w-full border-primary/30 text-primary hover:bg-primary/5",
          onClick: onSignIn,
          "data-ocid": "service-detail.sign-in-to-quote.button",
          children: "Sign In"
        }
      )
    ] })
  ] }) });
}
function RatingsSection({ serviceId }) {
  const { data: ratings, isLoading } = useServiceRatings(serviceId);
  const avgRating = ratings && ratings.length > 0 ? ratings.reduce((sum, r) => sum + Number(r.stars), 0) / ratings.length : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", "data-ocid": "service-detail.ratings.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Client Reviews" }),
      !isLoading && ratings && ratings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: avgRating, readonly: true, size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          avgRating.toFixed(1),
          " (",
          ratings.length,
          " ",
          ratings.length === 1 ? "review" : "reviews",
          ")"
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "space-y-4",
        "data-ocid": "service-detail.ratings.loading_state",
        children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-4 rounded-xl border border-border bg-card space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
            ]
          },
          i
        ))
      }
    ) : !ratings || ratings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-10 text-center",
        "data-ocid": "service-detail.ratings.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No reviews yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Be the first to hire this provider and leave a review." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ratings.map((rating, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-5 rounded-xl border border-border bg-card",
        "data-ocid": `service-detail.ratings.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                UserAvatar,
                {
                  name: `Client ${String(rating.clientId).slice(-4)}`,
                  size: "sm"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Verified Client" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StarRating,
                    {
                      value: Number(rating.stars),
                      readonly: true,
                      size: "sm"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                    formatTimestamp(rating.createdAt)
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-xs font-semibold text-primary bg-primary/8 px-2 py-0.5 rounded-full", children: [
              Number(rating.stars),
              "/5"
            ] })
          ] }),
          rating.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90 leading-relaxed", children: rating.comment }),
          rating.providerReply && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 ml-4 pl-3 border-l-2 border-primary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary mb-1", children: "Provider reply" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: rating.providerReply })
          ] })
        ]
      },
      String(rating.id)
    )) })
  ] });
}
function PhotoUploadPanel({
  photos,
  canAddMore,
  maxPhotos,
  onAdd,
  onRemove
}) {
  const inputRef = reactExports.useRef(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        onAdd(e.dataTransfer.files);
      }
    },
    [onAdd]
  );
  const handleDragOver = reactExports.useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = reactExports.useCallback(() => setIsDragging(false), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium", children: [
      "Photo Attachments",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal ml-1.5", children: [
        "(optional, up to ",
        maxPhotos,
        ")"
      ] })
    ] }),
    photos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-3 gap-2",
        "data-ocid": "service-detail.photos.list",
        children: photos.map((photo, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative aspect-square rounded-lg overflow-hidden border border-border bg-muted/30 group",
            "data-ocid": `service-detail.photos.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: photo.previewUrl,
                  alt: `Attachment ${idx + 1}`,
                  className: "w-full h-full object-cover"
                }
              ),
              photo.uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/70 flex flex-col items-center justify-center gap-1.5 p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: photo.progress, className: "h-1 w-full" })
              ] }),
              photo.error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-destructive/80 flex items-center justify-center p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive-foreground text-center leading-tight", children: "Upload failed" }) }),
              photo.uploadedUrl && !photo.uploading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1 right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "w-2.5 h-2.5 text-primary-foreground",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  strokeWidth: 3,
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M5 13l4 4L19 7"
                    }
                  )
                }
              ) }),
              !photo.uploading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onRemove(idx),
                  className: "absolute top-1 right-1 w-5 h-5 rounded-full bg-background/80 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground hover:border-destructive",
                  "aria-label": `Remove photo ${idx + 1}`,
                  "data-ocid": `service-detail.photos.delete_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                }
              )
            ]
          },
          photo.previewUrl
        ))
      }
    ),
    canAddMore && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.click();
        },
        onDrop: handleDrop,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        className: `w-full flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-lg border-2 border-dashed transition-colors text-sm ${isDragging ? "border-primary bg-primary/5 text-primary" : "border-border bg-muted/20 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"}`,
        "data-ocid": "service-detail.photos.dropzone",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: photos.length === 0 ? "Drag & drop or click to add photos" : `Add more (${photos.length}/${maxPhotos})` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-70", children: "JPEG, PNG, WebP · max 10 MB each" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept: "image/jpeg,image/png,image/webp,image/gif",
        multiple: true,
        className: "hidden",
        onChange: (e) => {
          if (e.target.files) {
            onAdd(e.target.files);
            e.target.value = "";
          }
        },
        "data-ocid": "service-detail.photos.upload_button"
      }
    )
  ] });
}
function QuoteRequestForm({
  serviceId,
  onSuccess,
  onCancel
}) {
  const [requirements, setRequirements] = reactExports.useState("");
  const [reqError, setReqError] = reactExports.useState("");
  const { mutateAsync, isPending } = useRequestQuote();
  const {
    photos,
    addPhotos,
    removePhoto,
    uploadAll,
    isUploading,
    canAddMore,
    maxPhotos
  } = usePhotoUpload();
  const isBusy = isPending || isUploading;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requirements.trim()) {
      setReqError("Please describe your requirements.");
      return;
    }
    setReqError("");
    try {
      let attachments = [];
      if (photos.length > 0) {
        attachments = await uploadAll();
      }
      await mutateAsync({
        serviceId,
        requirements: requirements.trim(),
        attachments
      });
      ue.success("Quote request sent! The provider will respond soon.");
      onSuccess();
    } catch (err) {
      console.error(err);
      ue.error("Failed to send quote request. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Describe your requirements" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "requirements", className: "text-sm font-medium", children: [
          "Project Requirements",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "requirements",
            placeholder: "Describe what you need in detail — scope, timeline, any special requirements…",
            value: requirements,
            onChange: (e) => {
              setRequirements(e.target.value);
              if (reqError) setReqError("");
            },
            rows: 5,
            className: "resize-none bg-card border-border",
            "data-ocid": "service-detail.requirements.textarea"
          }
        ),
        reqError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "service-detail.requirements.field_error",
            children: reqError
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PhotoUploadPanel,
        {
          photos,
          canAddMore,
          maxPhotos,
          onAdd: addPhotos,
          onRemove: removePhoto
        }
      ),
      isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 text-sm text-muted-foreground",
          "data-ocid": "service-detail.photos.loading_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
            "Uploading photos…"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "button-primary w-full",
            disabled: isBusy,
            "data-ocid": "service-detail.submit-quote.submit_button",
            children: isBusy ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
              isUploading ? "Uploading photos…" : "Sending…"
            ] }) : "Send Quote Request"
          }
        ),
        onCancel && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: onCancel,
            "data-ocid": "service-detail.cancel-quote.cancel_button",
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
function QuoteSuccessCard({ onDashboard }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "bg-card border border-border",
      "data-ocid": "service-detail.quote.success_state",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col items-center gap-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg", children: "Quote request sent!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "The provider will review your request and respond with a quote soon." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "button-primary w-full",
            onClick: onDashboard,
            "data-ocid": "service-detail.go-to-dashboard.button",
            children: "View in Dashboard"
          }
        )
      ] })
    }
  );
}
function ServiceDetail() {
  const { id } = useParams({ from: "/services/$id" });
  const navigate = useNavigate();
  const { isAuthenticated, actorReady, login } = useAuth();
  const serviceId = (() => {
    try {
      const parsed = BigInt(id);
      return parsed >= 0n ? parsed : null;
    } catch {
      return null;
    }
  })();
  const { data: service, isLoading, isFetched } = useService(serviceId);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = reactExports.useState(false);
  const handleRequestQuoteClick = () => {
    if (!isAuthenticated) {
      ue.info("Please sign in to request a quote.");
      return;
    }
    setShowForm(true);
    setTimeout(() => {
      var _a;
      (_a = document.getElementById("quote-form-anchor")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  const handleQuoteSuccess = () => {
    setShowForm(false);
    setQuoteSubmitted(true);
  };
  const handleGoToDashboard = () => {
    navigate({ to: "/client-dashboard" });
  };
  if (!actorReady || isLoading || actorReady && !isFetched && serviceId !== null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen bg-background",
        "data-ocid": "service-detail.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-card border-b border-border",
              "data-ocid": "service-detail.loading_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28" }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceDetailSkeleton, {})
        ]
      }
    );
  }
  if (!service) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen bg-background flex flex-col items-center justify-center gap-4",
        "data-ocid": "service-detail.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", "aria-hidden": "true", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Service not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm text-center", children: "This service may have been removed or the link is incorrect." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "button-primary mt-2",
              "data-ocid": "service-detail.back-to-services.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", children: "Browse all services" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "service-detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/services",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
        "data-ocid": "service-detail.back.link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Services"
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: service.category, size: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground leading-snug", children: service.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-baseline gap-2", children: service.priceType === "onSiteEstimate" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Pricing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-xl text-foreground", children: "On-site estimate" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Starting at" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-3xl text-primary font-mono-amount", children: formatCurrency(service.basePrice) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-5 border border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm uppercase tracking-wide mb-3", children: "About this service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed whitespace-pre-wrap", children: service.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
            "Listed ",
            formatTimestamp(service.createdAt)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-primary text-primary" }),
            "New listing"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "quote-form-anchor", className: "lg:hidden pt-2", children: quoteSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteSuccessCard, { onDashboard: handleGoToDashboard }) : showForm ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuoteRequestForm,
          {
            serviceId: service.id,
            onSuccess: handleQuoteSuccess,
            onCancel: () => setShowForm(false)
          }
        ) : isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "button-primary w-full",
            onClick: handleRequestQuoteClick,
            "data-ocid": "service-detail.request-quote-mobile.button",
            children: "Request Quote"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full border-primary/30 text-primary hover:bg-primary/5",
            onClick: login,
            "data-ocid": "service-detail.sign-in-mobile.button",
            children: "Sign In to Request Quote"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RatingsSection, { serviceId: service.id })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex flex-col gap-4 sticky top-24", children: [
        quoteSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteSuccessCard, { onDashboard: handleGoToDashboard }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProviderCard,
          {
            providerId: String(service.providerId),
            onRequestQuote: handleRequestQuoteClick,
            isAuthenticated,
            onSignIn: login
          }
        ),
        showForm && !quoteSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuoteRequestForm,
          {
            serviceId: service.id,
            onSuccess: handleQuoteSuccess,
            onCancel: () => setShowForm(false)
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ServiceDetail as default
};
