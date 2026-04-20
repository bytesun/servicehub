import Common "common";

module {
  public type User = {
    id : Common.UserId;
    var displayName : Text;
    role : Common.UserRole;
    var bio : Text;
    createdAt : Common.Timestamp;
  };

  public type UserProfile = {
    id : Common.UserId;
    displayName : Text;
    role : Common.UserRole;
    bio : Text;
    createdAt : Common.Timestamp;
  };

  public type RegisterInput = {
    displayName : Text;
    role : Common.UserRole;
    bio : Text;
  };
};
