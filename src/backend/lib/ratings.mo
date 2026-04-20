import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/ratings";
import Common "../types/common";

module {
  func findRating(ratings : List.List<Types.Rating>, ratingId : Common.RatingId) : ?Types.Rating {
    var result : ?Types.Rating = null;
    ratings.forEach(func(r : Types.Rating) {
      if (r.id == ratingId) { result := ?r };
    });
    result;
  };

  func findRatingByBooking(ratings : List.List<Types.Rating>, bookingId : Common.BookingId) : ?Types.Rating {
    var result : ?Types.Rating = null;
    ratings.forEach(func(r : Types.Rating) {
      if (r.bookingId == bookingId) { result := ?r };
    });
    result;
  };

  public func createRating(
    ratings : List.List<Types.Rating>,
    nextId : Nat,
    clientId : Common.UserId,
    providerId : Common.UserId,
    serviceId : Common.ServiceId,
    input : Types.CreateRatingInput,
  ) : Types.RatingView {
    // One rating per booking
    switch (findRatingByBooking(ratings, input.bookingId)) {
      case (?_) { Runtime.trap("Rating already exists for this booking") };
      case null {};
    };
    if (input.stars < 1 or input.stars > 5) { Runtime.trap("Stars must be between 1 and 5") };
    let rating : Types.Rating = {
      id = nextId;
      bookingId = input.bookingId;
      serviceId;
      clientId;
      providerId;
      stars = input.stars;
      comment = input.comment;
      var providerReply = null;
      createdAt = Time.now();
    };
    ratings.add(rating);
    toView(rating);
  };

  public func replyRating(
    ratings : List.List<Types.Rating>,
    ratingId : Common.RatingId,
    callerId : Common.UserId,
    reply : Text,
  ) : ?Types.RatingView {
    switch (findRating(ratings, ratingId)) {
      case null { null };
      case (?r) {
        if (r.providerId != callerId) { Runtime.trap("Not authorized") };
        r.providerReply := ?reply;
        ?toView(r);
      };
    };
  };

  public func getRating(
    ratings : List.List<Types.Rating>,
    ratingId : Common.RatingId,
  ) : ?Types.RatingView {
    switch (findRating(ratings, ratingId)) {
      case (?r) { ?toView(r) };
      case null { null };
    };
  };

  public func listServiceRatings(
    ratings : List.List<Types.Rating>,
    serviceId : Common.ServiceId,
  ) : [Types.RatingView] {
    let buf = List.empty<Types.RatingView>();
    ratings.forEach(func(r : Types.Rating) {
      if (r.serviceId == serviceId) { buf.add(toView(r)) };
    });
    buf.toArray();
  };

  public func listProviderRatings(
    ratings : List.List<Types.Rating>,
    providerId : Common.UserId,
  ) : [Types.RatingView] {
    let buf = List.empty<Types.RatingView>();
    ratings.forEach(func(r : Types.Rating) {
      if (r.providerId == providerId) { buf.add(toView(r)) };
    });
    buf.toArray();
  };

  public func toView(r : Types.Rating) : Types.RatingView {
    {
      id = r.id;
      bookingId = r.bookingId;
      serviceId = r.serviceId;
      clientId = r.clientId;
      providerId = r.providerId;
      stars = r.stars;
      comment = r.comment;
      providerReply = r.providerReply;
      createdAt = r.createdAt;
    };
  };
};
