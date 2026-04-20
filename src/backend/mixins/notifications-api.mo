import List "mo:core/List";
import NotifLib "../lib/notifications";
import NotifTypes "../types/notifications";
import Common "../types/common";

mixin (
  notifications : List.List<NotifLib.Notification>,
  nextNotificationId : { var value : Nat },
) {
  public shared query ({ caller }) func getUnreadNotificationCount() : async Nat {
    NotifLib.getUnreadCount(notifications, caller);
  };

  public shared query ({ caller }) func listNotifications(offset : Nat, limit : Nat) : async [NotifTypes.NotificationView] {
    NotifLib.listNotifications(notifications, caller, limit, offset);
  };

  public shared ({ caller }) func markNotificationAsRead(notificationId : Common.NotificationId) : async { #ok; #err : Text } {
    NotifLib.markAsRead(notifications, caller, notificationId);
  };

  public shared ({ caller }) func markAllNotificationsAsRead() : async () {
    NotifLib.markAllAsRead(notifications, caller);
  };
};
