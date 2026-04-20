import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/services";
import Common "../types/common";

module {
  func findService(services : List.List<Types.Service>, serviceId : Common.ServiceId) : ?Types.Service {
    var result : ?Types.Service = null;
    services.forEach(func(s : Types.Service) {
      if (s.id == serviceId) { result := ?s };
    });
    result;
  };

  public func createService(
    services : List.List<Types.Service>,
    nextId : Nat,
    providerId : Common.UserId,
    input : Types.CreateServiceInput,
  ) : Types.ServiceView {
    let service : Types.Service = {
      id = nextId;
      providerId;
      var title = input.title;
      var description = input.description;
      var category = input.category;
      var basePrice = input.basePrice;
      var priceType = input.priceType;
      createdAt = Time.now();
    };
    services.add(service);
    toView(service);
  };

  public func updateService(
    services : List.List<Types.Service>,
    serviceId : Common.ServiceId,
    callerId : Common.UserId,
    input : Types.UpdateServiceInput,
  ) : ?Types.ServiceView {
    switch (findService(services, serviceId)) {
      case null { null };
      case (?s) {
        if (s.providerId != callerId) { Runtime.trap("Not authorized") };
        switch (input.title) { case (?t) { s.title := t }; case null {} };
        switch (input.description) { case (?d) { s.description := d }; case null {} };
        switch (input.category) { case (?c) { s.category := c }; case null {} };
        switch (input.basePrice) { case (?p) { s.basePrice := p }; case null {} };
        switch (input.priceType) { case (?pt) { s.priceType := pt }; case null {} };
        ?toView(s);
      };
    };
  };

  public func deleteService(
    services : List.List<Types.Service>,
    serviceId : Common.ServiceId,
    callerId : Common.UserId,
  ) : Bool {
    switch (findService(services, serviceId)) {
      case null { false };
      case (?s) {
        if (s.providerId != callerId) { Runtime.trap("Not authorized") };
        let remaining = List.empty<Types.Service>();
        services.forEach(func(sv : Types.Service) {
          if (sv.id != serviceId) { remaining.add(sv) };
        });
        services.clear();
        services.append(remaining);
        true;
      };
    };
  };

  public func getService(
    services : List.List<Types.Service>,
    serviceId : Common.ServiceId,
  ) : ?Types.ServiceView {
    switch (findService(services, serviceId)) {
      case (?s) { ?toView(s) };
      case null { null };
    };
  };

  public func listServices(
    services : List.List<Types.Service>,
    category : ?Common.ServiceCategory,
  ) : [Types.ServiceView] {
    let buf = List.empty<Types.ServiceView>();
    switch (category) {
      case null {
        services.forEach(func(s : Types.Service) { buf.add(toView(s)) });
      };
      case (?cat) {
        services.forEach(func(s : Types.Service) {
          if (s.category == cat) { buf.add(toView(s)) };
        });
      };
    };
    buf.toArray();
  };

  public func listProviderServices(
    services : List.List<Types.Service>,
    providerId : Common.UserId,
  ) : [Types.ServiceView] {
    let buf = List.empty<Types.ServiceView>();
    services.forEach(func(s : Types.Service) {
      if (s.providerId == providerId) { buf.add(toView(s)) };
    });
    buf.toArray();
  };

  public func toView(service : Types.Service) : Types.ServiceView {
    {
      id = service.id;
      providerId = service.providerId;
      title = service.title;
      description = service.description;
      category = service.category;
      basePrice = service.basePrice;
      priceType = service.priceType;
      createdAt = service.createdAt;
    };
  };
};
