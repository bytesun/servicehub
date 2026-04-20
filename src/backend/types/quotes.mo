import Common "common";

module {
  public type ReplyType = {
    #messageOnly;
    #detailedEstimate;
    #onSiteEstimate;
  };

  public type EstimationBreakdown = {
    hourlyRate : Nat;
    hours : Nat;
    materials : Nat;
    labor : Nat;
    notes : Text;
  };

  public type Quote = {
    id : Common.QuoteId;
    serviceId : Common.ServiceId;
    clientId : Common.UserId;
    providerId : Common.UserId;
    var requirements : Text;
    var attachments : [Text];
    var replyType : ?ReplyType;
    var replyMessage : ?Text;
    var estimationBreakdown : ?EstimationBreakdown;
    var proposedPrice : ?Nat;
    var proposedTimeline : ?Text;
    var status : Common.QuoteStatus;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  public type QuoteView = {
    id : Common.QuoteId;
    serviceId : Common.ServiceId;
    clientId : Common.UserId;
    providerId : Common.UserId;
    requirements : Text;
    attachments : [Text];
    replyType : ?ReplyType;
    replyMessage : ?Text;
    estimationBreakdown : ?EstimationBreakdown;
    proposedPrice : ?Nat;
    proposedTimeline : ?Text;
    status : Common.QuoteStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type RequestQuoteInput = {
    serviceId : Common.ServiceId;
    requirements : Text;
    attachments : [Text];
  };

  public type ReplyQuoteInput = {
    replyType : ReplyType;
    replyMessage : ?Text;
    estimationBreakdown : ?EstimationBreakdown;
    proposedPrice : ?Nat;
    proposedTimeline : ?Text;
  };
};
