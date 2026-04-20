import List "mo:core/List";
import Runtime "mo:core/Runtime";
import RatingTypes "../types/ratings";
import BookingTypes "../types/bookings";
import Common "../types/common";
import RatingsLib "../lib/ratings";
import BookingLib "../lib/bookings";

mixin (
  ratings : List.List<RatingTypes.Rating>,
  bookings : List.List<BookingTypes.Booking>,
  nextRatingId : { var value : Nat },
) {
  public shared ({ caller }) func createRating(input : RatingTypes.CreateRatingInput) : async RatingTypes.RatingView {
    let booking = switch (BookingLib.getBooking(bookings, input.bookingId)) {
      case (?b) { b };
      case null { Runtime.trap("Booking not found") };
    };
    if (booking.bookingStatus != #completed) { Runtime.trap("Booking is not completed") };
    if (booking.clientId != caller) { Runtime.trap("Not authorized") };
    let view = RatingsLib.createRating(ratings, nextRatingId.value, caller, booking.providerId, booking.serviceId, input);
    nextRatingId.value += 1;
    view;
  };

  public shared ({ caller }) func replyRating(ratingId : Common.RatingId, reply : Text) : async ?RatingTypes.RatingView {
    RatingsLib.replyRating(ratings, ratingId, caller, reply);
  };

  public shared query func listServiceRatings(serviceId : Common.ServiceId) : async [RatingTypes.RatingView] {
    RatingsLib.listServiceRatings(ratings, serviceId);
  };

  public shared query func listProviderRatings(providerId : Common.UserId) : async [RatingTypes.RatingView] {
    RatingsLib.listProviderRatings(ratings, providerId);
  };
};
