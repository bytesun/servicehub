import List "mo:core/List";
import Runtime "mo:core/Runtime";
import BookingTypes "../types/bookings";
import QuoteTypes "../types/quotes";
import InvoiceTypes "../types/invoices";
import NotifLib "../lib/notifications";
import Common "../types/common";
import BookingLib "../lib/bookings";

mixin (
  bookings : List.List<BookingTypes.Booking>,
  quotes : List.List<QuoteTypes.Quote>,
  notifications : List.List<NotifLib.Notification>,
  nextBookingId : { var value : Nat },
  invoices : List.List<InvoiceTypes.Invoice>,
  nextInvoiceId : { var value : Nat },
  nextNotificationId : { var value : Nat },
) {
  public shared ({ caller }) func createBooking(quoteId : Common.QuoteId) : async BookingTypes.BookingView {
    var foundQuote : ?QuoteTypes.Quote = null;
    quotes.forEach(func(q : QuoteTypes.Quote) {
      if (q.id == quoteId) { foundQuote := ?q };
    });
    let quote = switch (foundQuote) {
      case (?q) { q };
      case null { Runtime.trap("Quote not found") };
    };
    let view = BookingLib.createBooking(bookings, nextBookingId.value, caller, quote);
    nextBookingId.value += 1;
    ignore NotifLib.createNotification(notifications, nextNotificationId, {
      recipientId = quote.providerId;
      notifType = #bookingConfirmed;
      title = "New Booking Confirmed";
      body = "A client has confirmed a booking with you.";
      link = "/bookings/" # debug_show(view.id);
    });
    view;
  };

  public shared ({ caller }) func markBookingStarted(bookingId : Common.BookingId) : async ?BookingTypes.BookingView {
    BookingLib.markStarted(bookings, bookingId, caller);
  };

  public shared ({ caller }) func markBookingCompleted(bookingId : Common.BookingId) : async ?BookingTypes.BookingView {
    let result = BookingLib.markCompleted(bookings, bookingId, caller, invoices, nextInvoiceId);
    switch (result) {
      case (?view) {
        ignore NotifLib.createNotification(notifications, nextNotificationId, {
          recipientId = view.providerId;
          notifType = #paymentReceived;
          title = "Payment Released";
          body = "The escrow payment has been released for your completed booking.";
          link = "/bookings/" # debug_show(view.id);
        });
        ?view;
      };
      case null { null };
    };
  };

  public shared ({ caller }) func markBookingDisputed(bookingId : Common.BookingId) : async ?BookingTypes.BookingView {
    BookingLib.markDisputed(bookings, bookingId, caller);
  };

  public shared ({ caller }) func cancelBooking(bookingId : Common.BookingId) : async ?BookingTypes.BookingView {
    BookingLib.cancelBooking(bookings, bookingId, caller);
  };

  public shared ({ caller }) func releaseEscrow(bookingId : Common.BookingId) : async ?BookingTypes.BookingView {
    BookingLib.releaseEscrow(bookings, bookingId, caller);
  };

  public shared query func getBooking(bookingId : Common.BookingId) : async ?BookingTypes.BookingView {
    BookingLib.getBooking(bookings, bookingId);
  };

  public shared query ({ caller }) func listMyClientBookings() : async [BookingTypes.BookingView] {
    BookingLib.listClientBookings(bookings, caller);
  };

  public shared query ({ caller }) func listMyProviderBookings() : async [BookingTypes.BookingView] {
    BookingLib.listProviderBookings(bookings, caller);
  };
};
