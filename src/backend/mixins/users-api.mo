import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import UserTypes "../types/users";
import Common "../types/common";
import UserLib "../lib/users";

mixin (
  users : List.List<UserTypes.User>,
) {
  public shared ({ caller }) func registerUser(input : UserTypes.RegisterInput) : async UserTypes.UserProfile {
    if (caller.isAnonymous()) { Runtime.trap("Anonymous caller not allowed") };
    UserLib.register(users, caller, input);
  };

  public shared query ({ caller }) func getMyProfile() : async ?UserTypes.UserProfile {
    UserLib.getProfile(users, caller);
  };

  public shared query func getUserProfile(userId : Common.UserId) : async ?UserTypes.UserProfile {
    UserLib.getProfile(users, userId);
  };
};
