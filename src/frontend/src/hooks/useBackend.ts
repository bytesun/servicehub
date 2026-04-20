import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Backend } from "../backend";
import type {
  BookingId,
  BookingView,
  CreateRatingInput,
  CreateServiceInput,
  InvoiceId,
  InvoiceView,
  NotificationView,
  QuoteId,
  QuoteView,
  RatingId,
  RatingView,
  RegisterInput,
  ReplyQuoteInput,
  RequestQuoteInput,
  ServiceCategory,
  ServiceId,
  ServiceView,
  UpdateServiceInput,
  UserId,
  UserProfile,
} from "../types";

// ─── helper: gates ALL queries on actor being ready ──────────────────────────

function useActorQuery<T>(
  key: unknown[],
  fn: (actor: Backend) => Promise<T>,
  extraEnabled = true,
) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  // Actor is only considered ready when it exists AND is not in the middle of
  // (re)fetching its identity/canister binding.
  const actorReady = !!actor && !actorFetching;

  const query = useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      // Double-check actor availability inside queryFn to prevent firing
      // against a stale/null actor if React Query retries unexpectedly.
      if (!actor) return null as T;
      return fn(actor);
    },
    enabled: actorReady && extraEnabled,
    // Retry once on null/error to handle transient initialisation races where
    // the actor momentarily resolves before its identity is fully wired up.
    retry: 1,
    retryDelay: 600,
    // Treat fresh data as stale only after 5 s so rapid navigations don't
    // re-fire queries that already returned valid data.
    staleTime: 5_000,
  });

  return {
    ...query,
    // Keep isLoading true until actor is confirmed ready AND a fetch is either
    // in-flight or has not yet started. This prevents consumers from seeing
    // empty/null before the first backend response completes.
    isLoading:
      !actorReady ||
      query.isLoading ||
      (!query.isFetched &&
        query.isFetching === false &&
        actorReady &&
        extraEnabled),
    // Only report isFetched once the actor was ready when the query ran.
    isFetched: actorReady && query.isFetched,
  };
}

function useBackendActor() {
  return useActor(createActor);
}

// ─── profile ─────────────────────────────────────────────────────────────────

export function useRegisterUser() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: RegisterInput) => actor!.registerUser(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUserProfile"] }),
  });
}

export function useMyProfile() {
  return useActorQuery<UserProfile | null>(["currentUserProfile"], (a) =>
    a.getMyProfile(),
  );
}

export function useUserProfile(userId: UserId | null) {
  return useActorQuery<UserProfile | null>(
    ["userProfile", userId?.toString()],
    (a) => (userId ? a.getUserProfile(userId) : Promise.resolve(null)),
  );
}

// ─── services ────────────────────────────────────────────────────────────────

export function useListServices(category: ServiceCategory | null = null) {
  return useActorQuery<ServiceView[]>(["services", category], (a) =>
    a.listServices(category),
  );
}

export function useMyServices() {
  return useActorQuery<ServiceView[]>(["myServices"], (a) =>
    a.listMyServices(),
  );
}

export function useService(serviceId: ServiceId | null) {
  return useActorQuery<ServiceView | null>(
    ["service", serviceId?.toString()],
    (a) => (serviceId ? a.getService(serviceId) : Promise.resolve(null)),
  );
}

export function useCreateService() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateServiceInput) => actor!.createService(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myServices"] });
      qc.invalidateQueries({ queryKey: ["services"] });
    },
  });
}

export function useUpdateService() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: ServiceId; input: UpdateServiceInput }) =>
      actor!.updateService(id, input),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["myServices"] });
      qc.invalidateQueries({ queryKey: ["services"] });
      qc.invalidateQueries({ queryKey: ["service", id.toString()] });
    },
  });
}

export function useDeleteService() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (serviceId: ServiceId) => actor!.deleteService(serviceId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myServices"] });
      qc.invalidateQueries({ queryKey: ["services"] });
    },
  });
}

// ─── quotes ──────────────────────────────────────────────────────────────────

export function useMyClientQuotes() {
  return useActorQuery<QuoteView[]>(["myClientQuotes"], (a) =>
    a.listMyClientQuotes(),
  );
}

export function useMyProviderQuotes() {
  return useActorQuery<QuoteView[]>(["myProviderQuotes"], (a) =>
    a.listMyProviderQuotes(),
  );
}

export function useQuote(quoteId: QuoteId | null) {
  return useActorQuery<QuoteView | null>(["quote", quoteId?.toString()], (a) =>
    quoteId ? a.getQuote(quoteId) : Promise.resolve(null),
  );
}

export function useRequestQuote() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: RequestQuoteInput) => actor!.requestQuote(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myClientQuotes"] }),
  });
}

export function useReplyQuote() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      quoteId,
      ...input
    }: { quoteId: QuoteId } & ReplyQuoteInput) =>
      actor!.replyQuote(quoteId, input),
    onSuccess: (_, { quoteId }) => {
      qc.invalidateQueries({ queryKey: ["myProviderQuotes"] });
      qc.invalidateQueries({ queryKey: ["myClientQuotes"] });
      qc.invalidateQueries({ queryKey: ["quote", quoteId.toString()] });
    },
  });
}

export function useAcceptQuote() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: QuoteId) => actor!.acceptQuote(quoteId),
    onSuccess: (_, quoteId) => {
      qc.invalidateQueries({ queryKey: ["myClientQuotes"] });
      qc.invalidateQueries({ queryKey: ["myProviderQuotes"] });
      qc.invalidateQueries({ queryKey: ["quote", quoteId.toString()] });
    },
  });
}

export function useRejectQuote() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: QuoteId) => actor!.rejectQuote(quoteId),
    onSuccess: (_, quoteId) => {
      qc.invalidateQueries({ queryKey: ["myClientQuotes"] });
      qc.invalidateQueries({ queryKey: ["myProviderQuotes"] });
      qc.invalidateQueries({ queryKey: ["quote", quoteId.toString()] });
    },
  });
}

export function useCancelQuote() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: QuoteId) => actor!.cancelQuote(quoteId),
    onSuccess: (_, quoteId) => {
      qc.invalidateQueries({ queryKey: ["myClientQuotes"] });
      qc.invalidateQueries({ queryKey: ["quote", quoteId.toString()] });
    },
  });
}

// ─── bookings ────────────────────────────────────────────────────────────────

export function useMyClientBookings() {
  return useActorQuery<BookingView[]>(["myClientBookings"], (a) =>
    a.listMyClientBookings(),
  );
}

export function useMyProviderBookings() {
  return useActorQuery<BookingView[]>(["myProviderBookings"], (a) =>
    a.listMyProviderBookings(),
  );
}

export function useBooking(bookingId: BookingId | null) {
  return useActorQuery<BookingView | null>(
    ["booking", bookingId?.toString()],
    (a) => (bookingId ? a.getBooking(bookingId) : Promise.resolve(null)),
  );
}

export function useCreateBooking() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: QuoteId) => actor!.createBooking(quoteId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myClientBookings"] });
      qc.invalidateQueries({ queryKey: ["myClientQuotes"] });
      qc.invalidateQueries({ queryKey: ["myProviderQuotes"] });
    },
  });
}

export function useBookingAction() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  const invalidate = (bookingId?: BookingId) => {
    qc.invalidateQueries({ queryKey: ["myClientBookings"] });
    qc.invalidateQueries({ queryKey: ["myProviderBookings"] });
    if (bookingId !== undefined) {
      qc.invalidateQueries({ queryKey: ["booking", bookingId.toString()] });
    }
  };
  return {
    start: useMutation({
      mutationFn: (id: BookingId) => actor!.markBookingStarted(id),
      onSuccess: (_, id) => invalidate(id),
    }),
    complete: useMutation({
      mutationFn: (id: BookingId) => actor!.markBookingCompleted(id),
      onSuccess: (_, id) => invalidate(id),
    }),
    dispute: useMutation({
      mutationFn: (id: BookingId) => actor!.markBookingDisputed(id),
      onSuccess: (_, id) => invalidate(id),
    }),
    cancel: useMutation({
      mutationFn: (id: BookingId) => actor!.cancelBooking(id),
      onSuccess: (_, id) => invalidate(id),
    }),
    releaseEscrow: useMutation({
      mutationFn: (id: BookingId) => actor!.releaseEscrow(id),
      onSuccess: (_, id) => invalidate(id),
    }),
  };
}

// ─── invoices ────────────────────────────────────────────────────────────────

export function useMyClientInvoices() {
  return useActorQuery<InvoiceView[]>(["myClientInvoices"], (a) =>
    a.listMyClientInvoices(),
  );
}

export function useMyProviderInvoices() {
  return useActorQuery<InvoiceView[]>(["myProviderInvoices"], (a) =>
    a.listMyProviderInvoices(),
  );
}

export function useInvoice(invoiceId: InvoiceId | null) {
  return useActorQuery<InvoiceView | null>(
    ["invoice", invoiceId?.toString()],
    (a) => (invoiceId ? a.getInvoice(invoiceId) : Promise.resolve(null)),
  );
}

export function useInvoiceByBooking(bookingId: BookingId | null) {
  return useActorQuery<InvoiceView | null>(
    ["invoiceByBooking", bookingId?.toString()],
    (a) =>
      bookingId ? a.getInvoiceByBooking(bookingId) : Promise.resolve(null),
  );
}

// ─── ratings ─────────────────────────────────────────────────────────────────

export function useServiceRatings(serviceId: ServiceId | null) {
  return useActorQuery<RatingView[]>(
    ["serviceRatings", serviceId?.toString()],
    (a) => (serviceId ? a.listServiceRatings(serviceId) : Promise.resolve([])),
  );
}

export function useProviderRatings(providerId: UserId | null) {
  return useActorQuery<RatingView[]>(
    ["providerRatings", providerId?.toString()],
    (a) =>
      providerId ? a.listProviderRatings(providerId) : Promise.resolve([]),
  );
}

export function useCreateRating() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateRatingInput) => actor!.createRating(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["serviceRatings"] });
      qc.invalidateQueries({ queryKey: ["providerRatings"] });
    },
  });
}

export function useReplyRating() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      ratingId,
      reply,
    }: {
      ratingId: RatingId;
      reply: string;
    }) => actor!.replyRating(ratingId, reply),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["serviceRatings"] });
      qc.invalidateQueries({ queryKey: ["providerRatings"] });
    },
  });
}

// ─── notifications ────────────────────────────────────────────────────────────

export function useUnreadNotificationCount() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const actorReady = !!actor && !actorFetching;
  return useQuery<number>({
    queryKey: ["unreadNotificationCount"],
    queryFn: async () => {
      if (!actor) return 0;
      const count = await actor.getUnreadNotificationCount();
      return Number(count);
    },
    enabled: actorReady,
    refetchInterval: 30_000,
  });
}

export function useNotifications(limit = 20, offset = 0) {
  return useActorQuery<NotificationView[]>(
    ["notifications", limit, offset],
    (a) => a.listNotifications(BigInt(offset), BigInt(limit)),
  );
}

export function useMarkNotificationRead() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: bigint) =>
      actor!.markNotificationAsRead(notificationId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["unreadNotificationCount"] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => actor!.markAllNotificationsAsRead(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["unreadNotificationCount"] });
    },
  });
}
