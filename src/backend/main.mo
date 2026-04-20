import List "mo:core/List";
import UserTypes "types/users";
import ServiceTypes "types/services";
import QuoteTypes "types/quotes";
import BookingTypes "types/bookings";
import InvoiceTypes "types/invoices";
import RatingTypes "types/ratings";
import NotifLib "lib/notifications";
import UsersApi "mixins/users-api";
import ServicesApi "mixins/services-api";
import QuotesApi "mixins/quotes-api";
import BookingsApi "mixins/bookings-api";
import InvoicesApi "mixins/invoices-api";
import RatingsApi "mixins/ratings-api";
import NotificationsApi "mixins/notifications-api";

actor {
  let users = List.empty<UserTypes.User>();
  let services = List.empty<ServiceTypes.Service>();
  let quotes = List.empty<QuoteTypes.Quote>();
  let bookings = List.empty<BookingTypes.Booking>();
  let invoices = List.empty<InvoiceTypes.Invoice>();
  let ratings = List.empty<RatingTypes.Rating>();
  let notifications = List.empty<NotifLib.Notification>();

  let nextServiceId = { var value : Nat = 0 };
  let nextQuoteId = { var value : Nat = 0 };
  let nextBookingId = { var value : Nat = 0 };
  let nextInvoiceId = { var value : Nat = 0 };
  let nextRatingId = { var value : Nat = 0 };
  let nextNotificationId = { var value : Nat = 0 };

  include UsersApi(users);
  include ServicesApi(services, users, nextServiceId);
  include QuotesApi(quotes, services, users, notifications, nextQuoteId, nextNotificationId);
  include BookingsApi(bookings, quotes, notifications, nextBookingId, invoices, nextInvoiceId, nextNotificationId);
  include InvoicesApi(invoices, nextInvoiceId);
  include RatingsApi(ratings, bookings, nextRatingId);
  include NotificationsApi(notifications, nextNotificationId);
};
