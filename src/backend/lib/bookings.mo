import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/bookings";
import QuoteTypes "../types/quotes";
import InvoiceTypes "../types/invoices";
import Common "../types/common";

module {
  public func createBooking(
    bookings : List.List<Types.Booking>,
    nextId : Nat,
    clientId : Common.UserId,
    quote : QuoteTypes.Quote,
  ) : Types.BookingView {
    if (quote.status != #accepted) { Runtime.trap("Quote must be accepted") };
    if (quote.clientId != clientId) { Runtime.trap("Not authorized") };
    let now = Time.now();
    let agreedPrice = switch (quote.proposedPrice) {
      case (?p) { p };
      case null { 0 };
    };
    let booking : Types.Booking = {
      id = nextId;
      quoteId = quote.id;
      serviceId = quote.serviceId;
      clientId = quote.clientId;
      providerId = quote.providerId;
      agreedPrice;
      var bookingStatus = #paymentPending;
      var escrowStatus = #held;
      createdAt = now;
      var updatedAt = now;
    };
    bookings.add(booking);
    toView(booking);
  };

  func findBooking(bookings : List.List<Types.Booking>, bookingId : Common.BookingId) : ?Types.Booking {
    var result : ?Types.Booking = null;
    bookings.forEach(func(b : Types.Booking) {
      if (b.id == bookingId) { result := ?b };
    });
    result;
  };

  public func markStarted(
    bookings : List.List<Types.Booking>,
    bookingId : Common.BookingId,
    callerId : Common.UserId,
  ) : ?Types.BookingView {
    switch (findBooking(bookings, bookingId)) {
      case null { null };
      case (?b) {
        if (b.providerId != callerId) { Runtime.trap("Not authorized") };
        b.bookingStatus := #started;
        b.updatedAt := Time.now();
        ?toView(b);
      };
    };
  };

  public func markCompleted(
    bookings : List.List<Types.Booking>,
    bookingId : Common.BookingId,
    callerId : Common.UserId,
    invoices : List.List<InvoiceTypes.Invoice>,
    nextInvoiceId : { var value : Nat },
  ) : ?Types.BookingView {
    switch (findBooking(bookings, bookingId)) {
      case null { null };
      case (?b) {
        if (b.clientId != callerId) { Runtime.trap("Not authorized") };
        b.bookingStatus := #completed;
        b.escrowStatus := #released;
        b.updatedAt := Time.now();
        // Auto-generate invoice
        let invoice : InvoiceTypes.Invoice = {
          id = nextInvoiceId.value;
          bookingId = b.id;
          serviceId = b.serviceId;
          clientId = b.clientId;
          providerId = b.providerId;
          amount = b.agreedPrice;
          createdAt = Time.now();
        };
        invoices.add(invoice);
        nextInvoiceId.value += 1;
        ?toView(b);
      };
    };
  };

  public func markDisputed(
    bookings : List.List<Types.Booking>,
    bookingId : Common.BookingId,
    callerId : Common.UserId,
  ) : ?Types.BookingView {
    switch (findBooking(bookings, bookingId)) {
      case null { null };
      case (?b) {
        if (b.clientId != callerId and b.providerId != callerId) { Runtime.trap("Not authorized") };
        b.bookingStatus := #disputed;
        b.updatedAt := Time.now();
        ?toView(b);
      };
    };
  };

  public func cancelBooking(
    bookings : List.List<Types.Booking>,
    bookingId : Common.BookingId,
    callerId : Common.UserId,
  ) : ?Types.BookingView {
    switch (findBooking(bookings, bookingId)) {
      case null { null };
      case (?b) {
        if (b.clientId != callerId and b.providerId != callerId) { Runtime.trap("Not authorized") };
        b.bookingStatus := #cancelled;
        b.escrowStatus := #refunded;
        b.updatedAt := Time.now();
        ?toView(b);
      };
    };
  };

  public func releaseEscrow(
    bookings : List.List<Types.Booking>,
    bookingId : Common.BookingId,
    callerId : Common.UserId,
  ) : ?Types.BookingView {
    switch (findBooking(bookings, bookingId)) {
      case null { null };
      case (?b) {
        if (b.clientId != callerId) { Runtime.trap("Not authorized") };
        b.escrowStatus := #released;
        b.updatedAt := Time.now();
        ?toView(b);
      };
    };
  };

  public func getBooking(
    bookings : List.List<Types.Booking>,
    bookingId : Common.BookingId,
  ) : ?Types.BookingView {
    switch (findBooking(bookings, bookingId)) {
      case (?b) { ?toView(b) };
      case null { null };
    };
  };

  public func listClientBookings(
    bookings : List.List<Types.Booking>,
    clientId : Common.UserId,
  ) : [Types.BookingView] {
    let buf = List.empty<Types.BookingView>();
    bookings.forEach(func(b : Types.Booking) {
      if (b.clientId == clientId) { buf.add(toView(b)) };
    });
    buf.toArray();
  };

  public func listProviderBookings(
    bookings : List.List<Types.Booking>,
    providerId : Common.UserId,
  ) : [Types.BookingView] {
    let buf = List.empty<Types.BookingView>();
    bookings.forEach(func(b : Types.Booking) {
      if (b.providerId == providerId) { buf.add(toView(b)) };
    });
    buf.toArray();
  };

  public func toView(b : Types.Booking) : Types.BookingView {
    {
      id = b.id;
      quoteId = b.quoteId;
      serviceId = b.serviceId;
      clientId = b.clientId;
      providerId = b.providerId;
      agreedPrice = b.agreedPrice;
      bookingStatus = b.bookingStatus;
      escrowStatus = b.escrowStatus;
      createdAt = b.createdAt;
      updatedAt = b.updatedAt;
    };
  };
};
