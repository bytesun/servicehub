import List "mo:core/List";
import Runtime "mo:core/Runtime";
import ServiceTypes "../types/services";
import UserTypes "../types/users";
import Common "../types/common";
import ServiceLib "../lib/services";
import UserLib "../lib/users";

mixin (
  services : List.List<ServiceTypes.Service>,
  users : List.List<UserTypes.User>,
  nextServiceId : { var value : Nat },
) {
  public shared ({ caller }) func createService(input : ServiceTypes.CreateServiceInput) : async ServiceTypes.ServiceView {
    ignore UserLib.requireUser(users, caller);
    let view = ServiceLib.createService(services, nextServiceId.value, caller, input);
    nextServiceId.value += 1;
    view;
  };

  public shared ({ caller }) func updateService(serviceId : Common.ServiceId, input : ServiceTypes.UpdateServiceInput) : async ?ServiceTypes.ServiceView {
    ServiceLib.updateService(services, serviceId, caller, input);
  };

  public shared ({ caller }) func deleteService(serviceId : Common.ServiceId) : async Bool {
    ServiceLib.deleteService(services, serviceId, caller);
  };

  public shared query func getService(serviceId : Common.ServiceId) : async ?ServiceTypes.ServiceView {
    ServiceLib.getService(services, serviceId);
  };

  public shared query func listServices(category : ?Common.ServiceCategory) : async [ServiceTypes.ServiceView] {
    ServiceLib.listServices(services, category);
  };

  public shared query ({ caller }) func listMyServices() : async [ServiceTypes.ServiceView] {
    ServiceLib.listProviderServices(services, caller);
  };
};
