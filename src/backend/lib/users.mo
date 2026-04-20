import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/users";
import Common "../types/common";

module {
  func findUser(users : List.List<Types.User>, userId : Common.UserId) : ?Types.User {
    var result : ?Types.User = null;
    users.forEach(func(u : Types.User) {
      if (u.id == userId) { result := ?u };
    });
    result;
  };

  public func register(
    users : List.List<Types.User>,
    caller : Common.UserId,
    input : Types.RegisterInput,
  ) : Types.UserProfile {
    switch (findUser(users, caller)) {
      case (?existing) { toView(existing) };
      case null {
        let user : Types.User = {
          id = caller;
          var displayName = input.displayName;
          role = input.role;
          var bio = input.bio;
          createdAt = Time.now();
        };
        users.add(user);
        toView(user);
      };
    };
  };

  public func getProfile(
    users : List.List<Types.User>,
    userId : Common.UserId,
  ) : ?Types.UserProfile {
    switch (findUser(users, userId)) {
      case (?u) { ?toView(u) };
      case null { null };
    };
  };

  public func requireUser(
    users : List.List<Types.User>,
    userId : Common.UserId,
  ) : Types.User {
    switch (findUser(users, userId)) {
      case (?u) { u };
      case null { Runtime.trap("User not found") };
    };
  };

  public func toView(user : Types.User) : Types.UserProfile {
    {
      id = user.id;
      displayName = user.displayName;
      role = user.role;
      bio = user.bio;
      createdAt = user.createdAt;
    };
  };
};
