import List "mo:core/List";
import Runtime "mo:core/Runtime";
import InvoiceTypes "../types/invoices";
import Common "../types/common";
import InvoiceLib "../lib/invoices";

mixin (
  invoices : List.List<InvoiceTypes.Invoice>,
  nextInvoiceId : { var value : Nat },
) {
  public shared ({ caller }) func getInvoice(invoiceId : Common.InvoiceId) : async ?InvoiceTypes.InvoiceView {
    switch (InvoiceLib.getInvoice(invoices, invoiceId)) {
      case null { null };
      case (?inv) {
        if (inv.clientId != caller and inv.providerId != caller) {
          Runtime.trap("Not authorized");
        };
        ?inv;
      };
    };
  };

  public shared ({ caller }) func getInvoiceByBooking(bookingId : Common.BookingId) : async ?InvoiceTypes.InvoiceView {
    switch (InvoiceLib.getInvoiceByBooking(invoices, bookingId)) {
      case null { null };
      case (?inv) {
        if (inv.clientId != caller and inv.providerId != caller) {
          Runtime.trap("Not authorized");
        };
        ?inv;
      };
    };
  };

  public shared query ({ caller }) func listMyClientInvoices() : async [InvoiceTypes.InvoiceView] {
    InvoiceLib.listClientInvoices(invoices, caller);
  };

  public shared query ({ caller }) func listMyProviderInvoices() : async [InvoiceTypes.InvoiceView] {
    InvoiceLib.listProviderInvoices(invoices, caller);
  };
};
