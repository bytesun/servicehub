import List "mo:core/List";
import Runtime "mo:core/Runtime";
import QuoteTypes "../types/quotes";
import ServiceTypes "../types/services";
import UserTypes "../types/users";
import NotifLib "../lib/notifications";
import Common "../types/common";
import QuoteLib "../lib/quotes";
import ServiceLib "../lib/services";
import UserLib "../lib/users";

mixin (
  quotes : List.List<QuoteTypes.Quote>,
  services : List.List<ServiceTypes.Service>,
  users : List.List<UserTypes.User>,
  notifications : List.List<NotifLib.Notification>,
  nextQuoteId : { var value : Nat },
  nextNotificationId : { var value : Nat },
) {
  public shared ({ caller }) func requestQuote(input : QuoteTypes.RequestQuoteInput) : async QuoteTypes.QuoteView {
    ignore UserLib.requireUser(users, caller);
    let service = switch (ServiceLib.getService(services, input.serviceId)) {
      case (?s) { s };
      case null { Runtime.trap("Service not found") };
    };
    let view = QuoteLib.requestQuote(quotes, nextQuoteId.value, caller, service.providerId, input);
    nextQuoteId.value += 1;
    ignore NotifLib.createNotification(notifications, nextNotificationId, {
      recipientId = service.providerId;
      notifType = #quoteReceived;
      title = "New Quote Request";
      body = "You have received a new quote request.";
      link = "/quotes/" # debug_show(view.id);
    });
    view;
  };

  public shared ({ caller }) func replyQuote(quoteId : Common.QuoteId, input : QuoteTypes.ReplyQuoteInput) : async ?QuoteTypes.QuoteView {
    let result = QuoteLib.replyQuote(quotes, quoteId, caller, input);
    switch (result) {
      case (?view) {
        ignore NotifLib.createNotification(notifications, nextNotificationId, {
          recipientId = view.clientId;
          notifType = #replyReceived;
          title = "Quote Reply Received";
          body = "Your quote request has received a reply.";
          link = "/quotes/" # debug_show(view.id);
        });
        ?view;
      };
      case null { null };
    };
  };

  public shared ({ caller }) func acceptQuote(quoteId : Common.QuoteId) : async ?QuoteTypes.QuoteView {
    QuoteLib.acceptQuote(quotes, caller, quoteId);
  };

  public shared ({ caller }) func rejectQuote(quoteId : Common.QuoteId) : async ?QuoteTypes.QuoteView {
    QuoteLib.rejectQuote(quotes, caller, quoteId);
  };

  public shared ({ caller }) func cancelQuote(quoteId : Common.QuoteId) : async ?QuoteTypes.QuoteView {
    QuoteLib.cancelQuote(quotes, caller, quoteId);
  };

  public shared query func getQuote(quoteId : Common.QuoteId) : async ?QuoteTypes.QuoteView {
    QuoteLib.getQuote(quotes, quoteId);
  };

  public shared query ({ caller }) func listMyClientQuotes() : async [QuoteTypes.QuoteView] {
    QuoteLib.listClientQuotes(quotes, caller);
  };

  public shared query ({ caller }) func listMyProviderQuotes() : async [QuoteTypes.QuoteView] {
    QuoteLib.listProviderQuotes(quotes, caller);
  };
};
