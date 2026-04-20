import List "mo:core/List";
import Types "../types/invoices";
import BookingTypes "../types/bookings";
import Common "../types/common";

module {
  public func generateInvoice(
    invoices : List.List<Types.Invoice>,
    nextId : Nat,
    booking : BookingTypes.Booking,
  ) : Types.InvoiceView {
    let invoice : Types.Invoice = {
      id = nextId;
      bookingId = booking.id;
      serviceId = booking.serviceId;
      clientId = booking.clientId;
      providerId = booking.providerId;
      amount = booking.agreedPrice;
      createdAt = booking.updatedAt;
    };
    invoices.add(invoice);
    toView(invoice);
  };

  public func getInvoice(
    invoices : List.List<Types.Invoice>,
    invoiceId : Common.InvoiceId,
  ) : ?Types.InvoiceView {
    var result : ?Types.InvoiceView = null;
    invoices.forEach(func(i : Types.Invoice) {
      if (i.id == invoiceId) { result := ?toView(i) };
    });
    result;
  };

  public func getInvoiceByBooking(
    invoices : List.List<Types.Invoice>,
    bookingId : Common.BookingId,
  ) : ?Types.InvoiceView {
    var result : ?Types.InvoiceView = null;
    invoices.forEach(func(i : Types.Invoice) {
      if (i.bookingId == bookingId) { result := ?toView(i) };
    });
    result;
  };

  public func listClientInvoices(
    invoices : List.List<Types.Invoice>,
    clientId : Common.UserId,
  ) : [Types.InvoiceView] {
    let buf = List.empty<Types.InvoiceView>();
    invoices.forEach(func(i : Types.Invoice) {
      if (i.clientId == clientId) { buf.add(toView(i)) };
    });
    buf.toArray();
  };

  public func listProviderInvoices(
    invoices : List.List<Types.Invoice>,
    providerId : Common.UserId,
  ) : [Types.InvoiceView] {
    let buf = List.empty<Types.InvoiceView>();
    invoices.forEach(func(i : Types.Invoice) {
      if (i.providerId == providerId) { buf.add(toView(i)) };
    });
    buf.toArray();
  };

  public func toView(inv : Types.Invoice) : Types.InvoiceView {
    {
      id = inv.id;
      bookingId = inv.bookingId;
      serviceId = inv.serviceId;
      clientId = inv.clientId;
      providerId = inv.providerId;
      amount = inv.amount;
      createdAt = inv.createdAt;
    };
  };
};
