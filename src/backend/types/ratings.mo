import Common "common";

module {
  public type Rating = {
    id : Common.RatingId;
    bookingId : Common.BookingId;
    serviceId : Common.ServiceId;
    clientId : Common.UserId;
    providerId : Common.UserId;
    stars : Nat;
    comment : ?Text;
    var providerReply : ?Text;
    createdAt : Common.Timestamp;
  };

  public type RatingView = {
    id : Common.RatingId;
    bookingId : Common.BookingId;
    serviceId : Common.ServiceId;
    clientId : Common.UserId;
    providerId : Common.UserId;
    stars : Nat;
    comment : ?Text;
    providerReply : ?Text;
    createdAt : Common.Timestamp;
  };

  public type CreateRatingInput = {
    bookingId : Common.BookingId;
    stars : Nat;
    comment : ?Text;
  };
};
