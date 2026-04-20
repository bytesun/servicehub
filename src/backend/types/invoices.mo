import Common "common";

module {
  public type Invoice = {
    id : Common.InvoiceId;
    bookingId : Common.BookingId;
    serviceId : Common.ServiceId;
    clientId : Common.UserId;
    providerId : Common.UserId;
    amount : Nat;
    createdAt : Common.Timestamp;
  };

  public type InvoiceView = {
    id : Common.InvoiceId;
    bookingId : Common.BookingId;
    serviceId : Common.ServiceId;
    clientId : Common.UserId;
    providerId : Common.UserId;
    amount : Nat;
    createdAt : Common.Timestamp;
  };
};
