import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UpdateServiceInput {
    title?: string;
    description?: string;
    category?: ServiceCategory;
    priceType?: PriceType;
    basePrice?: bigint;
}
export type Timestamp = bigint;
export interface RequestQuoteInput {
    serviceId: ServiceId;
    requirements: string;
    attachments: Array<string>;
}
export interface NotificationView {
    id: NotificationId;
    title: string;
    notifType: NotificationType;
    body: string;
    link: string;
    createdAt: Timestamp;
    isRead: boolean;
    recipientId: UserId;
}
export type QuoteId = bigint;
export interface EstimationBreakdown {
    hours: bigint;
    hourlyRate: bigint;
    labor: bigint;
    notes: string;
    materials: bigint;
}
export interface RegisterInput {
    bio: string;
    displayName: string;
    role: UserRole;
}
export type RatingId = bigint;
export interface RatingView {
    id: RatingId;
    clientId: UserId;
    bookingId: BookingId;
    createdAt: Timestamp;
    comment?: string;
    stars: bigint;
    providerReply?: string;
    serviceId: ServiceId;
    providerId: UserId;
}
export type ServiceId = bigint;
export type BookingId = bigint;
export interface InvoiceView {
    id: InvoiceId;
    clientId: UserId;
    bookingId: BookingId;
    createdAt: Timestamp;
    serviceId: ServiceId;
    amount: bigint;
    providerId: UserId;
}
export interface BookingView {
    id: BookingId;
    clientId: UserId;
    createdAt: Timestamp;
    quoteId: QuoteId;
    agreedPrice: bigint;
    escrowStatus: EscrowStatus;
    updatedAt: Timestamp;
    bookingStatus: BookingStatus;
    serviceId: ServiceId;
    providerId: UserId;
}
export interface CreateServiceInput {
    title: string;
    description: string;
    category: ServiceCategory;
    priceType: PriceType;
    basePrice: bigint;
}
export interface CreateRatingInput {
    bookingId: BookingId;
    comment?: string;
    stars: bigint;
}
export type UserId = Principal;
export interface ReplyQuoteInput {
    estimationBreakdown?: EstimationBreakdown;
    replyMessage?: string;
    proposedPrice?: bigint;
    replyType: ReplyType;
    proposedTimeline?: string;
}
export type NotificationId = bigint;
export type InvoiceId = bigint;
export interface ServiceView {
    id: ServiceId;
    title: string;
    createdAt: Timestamp;
    description: string;
    category: ServiceCategory;
    priceType: PriceType;
    basePrice: bigint;
    providerId: UserId;
}
export interface UserProfile {
    id: UserId;
    bio: string;
    displayName: string;
    createdAt: Timestamp;
    role: UserRole;
}
export interface QuoteView {
    id: QuoteId;
    status: QuoteStatus;
    clientId: UserId;
    createdAt: Timestamp;
    estimationBreakdown?: EstimationBreakdown;
    updatedAt: Timestamp;
    replyMessage?: string;
    proposedPrice?: bigint;
    serviceId: ServiceId;
    replyType?: ReplyType;
    requirements: string;
    providerId: UserId;
    attachments: Array<string>;
    proposedTimeline?: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    disputed = "disputed",
    started = "started",
    completed = "completed",
    paymentPending = "paymentPending"
}
export enum EscrowStatus {
    held = "held",
    none = "none",
    refunded = "refunded",
    released = "released"
}
export enum NotificationType {
    bookingConfirmed = "bookingConfirmed",
    paymentReceived = "paymentReceived",
    quoteReceived = "quoteReceived",
    replyReceived = "replyReceived"
}
export enum PriceType {
    fixed = "fixed",
    onSiteEstimate = "onSiteEstimate"
}
export enum QuoteStatus {
    cancelled = "cancelled",
    pending = "pending",
    replied = "replied",
    rejected = "rejected",
    accepted = "accepted"
}
export enum ReplyType {
    detailedEstimate = "detailedEstimate",
    onSiteEstimate = "onSiteEstimate",
    messageOnly = "messageOnly"
}
export enum ServiceCategory {
    it = "it",
    cleaning = "cleaning",
    other = "other",
    marketing = "marketing",
    garden = "garden",
    design = "design",
    homeRepair = "homeRepair"
}
export enum UserRole {
    client = "client",
    provider = "provider"
}
export interface backendInterface {
    acceptQuote(quoteId: QuoteId): Promise<QuoteView | null>;
    cancelBooking(bookingId: BookingId): Promise<BookingView | null>;
    cancelQuote(quoteId: QuoteId): Promise<QuoteView | null>;
    createBooking(quoteId: QuoteId): Promise<BookingView>;
    createRating(input: CreateRatingInput): Promise<RatingView>;
    createService(input: CreateServiceInput): Promise<ServiceView>;
    deleteService(serviceId: ServiceId): Promise<boolean>;
    getBooking(bookingId: BookingId): Promise<BookingView | null>;
    getInvoice(invoiceId: InvoiceId): Promise<InvoiceView | null>;
    getInvoiceByBooking(bookingId: BookingId): Promise<InvoiceView | null>;
    getMyProfile(): Promise<UserProfile | null>;
    getQuote(quoteId: QuoteId): Promise<QuoteView | null>;
    getService(serviceId: ServiceId): Promise<ServiceView | null>;
    getUnreadNotificationCount(): Promise<bigint>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    listMyClientBookings(): Promise<Array<BookingView>>;
    listMyClientInvoices(): Promise<Array<InvoiceView>>;
    listMyClientQuotes(): Promise<Array<QuoteView>>;
    listMyProviderBookings(): Promise<Array<BookingView>>;
    listMyProviderInvoices(): Promise<Array<InvoiceView>>;
    listMyProviderQuotes(): Promise<Array<QuoteView>>;
    listMyServices(): Promise<Array<ServiceView>>;
    listNotifications(offset: bigint, limit: bigint): Promise<Array<NotificationView>>;
    listProviderRatings(providerId: UserId): Promise<Array<RatingView>>;
    listServiceRatings(serviceId: ServiceId): Promise<Array<RatingView>>;
    listServices(category: ServiceCategory | null): Promise<Array<ServiceView>>;
    markAllNotificationsAsRead(): Promise<void>;
    markBookingCompleted(bookingId: BookingId): Promise<BookingView | null>;
    markBookingDisputed(bookingId: BookingId): Promise<BookingView | null>;
    markBookingStarted(bookingId: BookingId): Promise<BookingView | null>;
    markNotificationAsRead(notificationId: NotificationId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    registerUser(input: RegisterInput): Promise<UserProfile>;
    rejectQuote(quoteId: QuoteId): Promise<QuoteView | null>;
    releaseEscrow(bookingId: BookingId): Promise<BookingView | null>;
    replyQuote(quoteId: QuoteId, input: ReplyQuoteInput): Promise<QuoteView | null>;
    replyRating(ratingId: RatingId, reply: string): Promise<RatingView | null>;
    requestQuote(input: RequestQuoteInput): Promise<QuoteView>;
    updateService(serviceId: ServiceId, input: UpdateServiceInput): Promise<ServiceView | null>;
}
