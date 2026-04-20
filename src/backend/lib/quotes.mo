import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/quotes";
import Common "../types/common";

module {
  func findQuote(quotes : List.List<Types.Quote>, quoteId : Common.QuoteId) : ?Types.Quote {
    var result : ?Types.Quote = null;
    quotes.forEach(func(q : Types.Quote) {
      if (q.id == quoteId) { result := ?q };
    });
    result;
  };

  public func requestQuote(
    quotes : List.List<Types.Quote>,
    nextId : Nat,
    clientId : Common.UserId,
    providerId : Common.UserId,
    input : Types.RequestQuoteInput,
  ) : Types.QuoteView {
    let now = Time.now();
    let quote : Types.Quote = {
      id = nextId;
      serviceId = input.serviceId;
      clientId;
      providerId;
      var requirements = input.requirements;
      var attachments = input.attachments;
      var replyType = null;
      var replyMessage = null;
      var estimationBreakdown = null;
      var proposedPrice = null;
      var proposedTimeline = null;
      var status = #pending;
      createdAt = now;
      var updatedAt = now;
    };
    quotes.add(quote);
    toView(quote);
  };

  public func replyQuote(
    quotes : List.List<Types.Quote>,
    quoteId : Common.QuoteId,
    callerId : Common.UserId,
    input : Types.ReplyQuoteInput,
  ) : ?Types.QuoteView {
    switch (findQuote(quotes, quoteId)) {
      case null { null };
      case (?q) {
        if (q.providerId != callerId) { Runtime.trap("Not authorized") };
        if (q.status != #pending) { Runtime.trap("Quote is not in pending status") };
        q.replyType := ?input.replyType;
        q.replyMessage := input.replyMessage;
        q.estimationBreakdown := input.estimationBreakdown;
        q.proposedPrice := input.proposedPrice;
        q.proposedTimeline := input.proposedTimeline;
        q.status := #replied;
        q.updatedAt := Time.now();
        ?toView(q);
      };
    };
  };

  public func acceptQuote(
    quotes : List.List<Types.Quote>,
    callerId : Common.UserId,
    quoteId : Common.QuoteId,
  ) : ?Types.QuoteView {
    switch (findQuote(quotes, quoteId)) {
      case null { null };
      case (?q) {
        if (q.clientId != callerId) { Runtime.trap("Not authorized") };
        if (q.status != #replied) { Runtime.trap("Quote must be replied before accepting") };
        q.status := #accepted;
        q.updatedAt := Time.now();
        ?toView(q);
      };
    };
  };

  public func rejectQuote(
    quotes : List.List<Types.Quote>,
    callerId : Common.UserId,
    quoteId : Common.QuoteId,
  ) : ?Types.QuoteView {
    switch (findQuote(quotes, quoteId)) {
      case null { null };
      case (?q) {
        if (q.clientId != callerId) { Runtime.trap("Not authorized") };
        q.status := #rejected;
        q.updatedAt := Time.now();
        ?toView(q);
      };
    };
  };

  public func cancelQuote(
    quotes : List.List<Types.Quote>,
    callerId : Common.UserId,
    quoteId : Common.QuoteId,
  ) : ?Types.QuoteView {
    switch (findQuote(quotes, quoteId)) {
      case null { null };
      case (?q) {
        if (q.clientId != callerId and q.providerId != callerId) { Runtime.trap("Not authorized") };
        q.status := #cancelled;
        q.updatedAt := Time.now();
        ?toView(q);
      };
    };
  };

  public func getQuote(
    quotes : List.List<Types.Quote>,
    quoteId : Common.QuoteId,
  ) : ?Types.QuoteView {
    switch (findQuote(quotes, quoteId)) {
      case (?q) { ?toView(q) };
      case null { null };
    };
  };

  public func listClientQuotes(
    quotes : List.List<Types.Quote>,
    clientId : Common.UserId,
  ) : [Types.QuoteView] {
    let buf = List.empty<Types.QuoteView>();
    quotes.forEach(func(q : Types.Quote) {
      if (q.clientId == clientId) { buf.add(toView(q)) };
    });
    buf.toArray();
  };

  public func listProviderQuotes(
    quotes : List.List<Types.Quote>,
    providerId : Common.UserId,
  ) : [Types.QuoteView] {
    let buf = List.empty<Types.QuoteView>();
    quotes.forEach(func(q : Types.Quote) {
      if (q.providerId == providerId) { buf.add(toView(q)) };
    });
    buf.toArray();
  };

  public func toView(q : Types.Quote) : Types.QuoteView {
    {
      id = q.id;
      serviceId = q.serviceId;
      clientId = q.clientId;
      providerId = q.providerId;
      requirements = q.requirements;
      attachments = q.attachments;
      replyType = q.replyType;
      replyMessage = q.replyMessage;
      estimationBreakdown = q.estimationBreakdown;
      proposedPrice = q.proposedPrice;
      proposedTimeline = q.proposedTimeline;
      status = q.status;
      createdAt = q.createdAt;
      updatedAt = q.updatedAt;
    };
  };
};
