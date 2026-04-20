module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type ServiceId = Nat;
  public type QuoteId = Nat;
  public type BookingId = Nat;
  public type InvoiceId = Nat;
  public type RatingId = Nat;
  public type NotificationId = Nat;

  public type UserRole = {
    #provider;
    #client;
  };

  public type ServiceCategory = {
    #homeRepair;
    #cleaning;
    #design;
    #it;
    #marketing;
    #garden;
    #other;
  };

  public type QuoteStatus = {
    #pending;
    #replied;
    #accepted;
    #rejected;
    #cancelled;
  };

  public type BookingStatus = {
    #paymentPending;
    #started;
    #completed;
    #disputed;
    #cancelled;
  };

  public type EscrowStatus = {
    #none;
    #held;
    #released;
    #refunded;
  };
};
