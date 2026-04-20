import Common "common";

module {
  public type Booking = {
    id : Common.BookingId;
    quoteId : Common.QuoteId;
    serviceId : Common.ServiceId;
    clientId : Common.UserId;
    providerId : Common.UserId;
    agreedPrice : Nat;
    var bookingStatus : Common.BookingStatus;
    var escrowStatus : Common.EscrowStatus;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type BookingView = {
    id : Common.BookingId;
    quoteId : Common.QuoteId;
    serviceId : Common.ServiceId;
    clientId : Common.UserId;
    providerId : Common.UserId;
    agreedPrice : Nat;
    bookingStatus : Common.BookingStatus;
    escrowStatus : Common.EscrowStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
