import type { backendInterface, ServiceView, QuoteView, BookingView, InvoiceView, RatingView, NotificationView, UserProfile } from "../backend";
import { BookingStatus, EscrowStatus, NotificationType, PriceType, QuoteStatus, ReplyType, ServiceCategory, UserRole } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const mockPrincipal = { toText: () => "aaaaa-aa", compareTo: () => 0, isAnonymous: () => false } as unknown as Principal;

const mockServices: ServiceView[] = [
  {
    id: BigInt(1),
    title: "Professional Home Cleaning",
    description: "Deep cleaning service for homes and apartments. We bring all supplies and equipment.",
    category: ServiceCategory.cleaning,
    priceType: PriceType.fixed,
    basePrice: BigInt(12000),
    providerId: mockPrincipal,
    createdAt: BigInt(Date.now() * 1000),
  },
  {
    id: BigInt(2),
    title: "Web Development & Design",
    description: "Custom websites and web applications built with modern technologies. React, TypeScript, and more.",
    category: ServiceCategory.it,
    priceType: PriceType.fixed,
    basePrice: BigInt(50000),
    providerId: mockPrincipal,
    createdAt: BigInt(Date.now() * 1000),
  },
  {
    id: BigInt(3),
    title: "Garden Landscaping",
    description: "Complete garden design, planting, and maintenance services. Transform your outdoor space.",
    category: ServiceCategory.garden,
    priceType: PriceType.onSiteEstimate,
    basePrice: BigInt(0),
    providerId: mockPrincipal,
    createdAt: BigInt(Date.now() * 1000),
  },
  {
    id: BigInt(4),
    title: "Home Repair & Renovation",
    description: "General home repairs including plumbing, electrical, carpentry, and painting.",
    category: ServiceCategory.homeRepair,
    priceType: PriceType.onSiteEstimate,
    basePrice: BigInt(0),
    providerId: mockPrincipal,
    createdAt: BigInt(Date.now() * 1000),
  },
  {
    id: BigInt(5),
    title: "Logo & Brand Design",
    description: "Professional logo design and brand identity packages for businesses of all sizes.",
    category: ServiceCategory.design,
    priceType: PriceType.fixed,
    basePrice: BigInt(25000),
    providerId: mockPrincipal,
    createdAt: BigInt(Date.now() * 1000),
  },
  {
    id: BigInt(6),
    title: "Social Media Marketing",
    description: "Comprehensive social media strategy, content creation, and ad campaign management.",
    category: ServiceCategory.marketing,
    priceType: PriceType.fixed,
    basePrice: BigInt(30000),
    providerId: mockPrincipal,
    createdAt: BigInt(Date.now() * 1000),
  },
];

const mockNotifications: NotificationView[] = [
  {
    id: BigInt(1),
    title: "New Quote Request",
    notifType: NotificationType.quoteReceived,
    body: "A client has requested a quote for your Home Cleaning service.",
    link: "/quotes/1",
    createdAt: BigInt(Date.now() * 1000),
    isRead: false,
    recipientId: mockPrincipal,
  },
  {
    id: BigInt(2),
    title: "Quote Reply Received",
    notifType: NotificationType.replyReceived,
    body: "Your provider has replied to your quote request.",
    link: "/quotes/2",
    createdAt: BigInt((Date.now() - 3600000) * 1000),
    isRead: false,
    recipientId: mockPrincipal,
  },
  {
    id: BigInt(3),
    title: "Booking Confirmed",
    notifType: NotificationType.bookingConfirmed,
    body: "Your booking for Web Development has been confirmed.",
    link: "/bookings/1",
    createdAt: BigInt((Date.now() - 7200000) * 1000),
    isRead: true,
    recipientId: mockPrincipal,
  },
];

const mockProfile: UserProfile = {
  id: mockPrincipal,
  displayName: "Alex Provider",
  bio: "Professional service provider with 5+ years of experience.",
  role: UserRole.provider,
  createdAt: BigInt(Date.now() * 1000),
};

export const mockBackend: backendInterface = {
  listServices: async (category) => {
    if (category === null) return mockServices;
    return mockServices.filter(s => s.category === category);
  },
  getService: async (serviceId) => mockServices.find(s => s.id === serviceId) ?? null,
  createService: async (input) => ({
    id: BigInt(99),
    title: input.title,
    description: input.description,
    category: input.category,
    priceType: input.priceType,
    basePrice: input.basePrice,
    providerId: mockPrincipal,
    createdAt: BigInt(Date.now() * 1000),
  }),
  updateService: async () => null,
  deleteService: async () => true,
  listMyServices: async () => mockServices.slice(0, 2),

  getMyProfile: async () => mockProfile,
  getUserProfile: async () => mockProfile,
  registerUser: async (input) => ({
    id: mockPrincipal,
    displayName: input.displayName,
    bio: input.bio,
    role: input.role,
    createdAt: BigInt(Date.now() * 1000),
  }),

  requestQuote: async (input) => ({
    id: BigInt(1),
    status: QuoteStatus.pending,
    clientId: mockPrincipal,
    providerId: mockPrincipal,
    serviceId: input.serviceId,
    requirements: input.requirements,
    attachments: input.attachments,
    createdAt: BigInt(Date.now() * 1000),
    updatedAt: BigInt(Date.now() * 1000),
  }),
  getQuote: async () => null,
  listMyClientQuotes: async () => [],
  listMyProviderQuotes: async () => [],
  replyQuote: async () => null,
  acceptQuote: async () => null,
  cancelQuote: async () => null,
  rejectQuote: async () => null,

  createBooking: async (quoteId) => ({
    id: BigInt(1),
    clientId: mockPrincipal,
    providerId: mockPrincipal,
    serviceId: BigInt(1),
    quoteId,
    agreedPrice: BigInt(12000),
    bookingStatus: BookingStatus.paymentPending,
    escrowStatus: EscrowStatus.none,
    createdAt: BigInt(Date.now() * 1000),
    updatedAt: BigInt(Date.now() * 1000),
  }),
  getBooking: async () => null,
  listMyClientBookings: async () => [],
  listMyProviderBookings: async () => [],
  cancelBooking: async () => null,
  markBookingStarted: async () => null,
  markBookingCompleted: async () => null,
  markBookingDisputed: async () => null,

  getInvoice: async () => null,
  getInvoiceByBooking: async () => null,
  listMyClientInvoices: async () => [],
  listMyProviderInvoices: async () => [],

  createRating: async (input) => ({
    id: BigInt(1),
    clientId: mockPrincipal,
    providerId: mockPrincipal,
    serviceId: BigInt(1),
    bookingId: input.bookingId,
    stars: input.stars,
    comment: input.comment,
    createdAt: BigInt(Date.now() * 1000),
  }),
  listProviderRatings: async () => [],
  listServiceRatings: async () => [],
  replyRating: async () => null,

  getUnreadNotificationCount: async () => BigInt(2),
  listNotifications: async () => mockNotifications,
  markNotificationAsRead: async () => ({ __kind__: "ok", ok: null }),
  markAllNotificationsAsRead: async () => undefined,

  releaseEscrow: async () => null,
};
