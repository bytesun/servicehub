import Common "common";

module {
  public type PriceType = {
    #fixed;
    #onSiteEstimate;
  };

  public type Service = {
    id : Common.ServiceId;
    providerId : Common.UserId;
    var title : Text;
    var description : Text;
    var category : Common.ServiceCategory;
    var basePrice : Nat;
    var priceType : PriceType;
    createdAt : Common.Timestamp;
  };

  public type ServiceView = {
    id : Common.ServiceId;
    providerId : Common.UserId;
    title : Text;
    description : Text;
    category : Common.ServiceCategory;
    basePrice : Nat;
    priceType : PriceType;
    createdAt : Common.Timestamp;
  };

  public type CreateServiceInput = {
    title : Text;
    description : Text;
    category : Common.ServiceCategory;
    basePrice : Nat;
    priceType : PriceType;
  };

  public type UpdateServiceInput = {
    title : ?Text;
    description : ?Text;
    category : ?Common.ServiceCategory;
    basePrice : ?Nat;
    priceType : ?PriceType;
  };
};
