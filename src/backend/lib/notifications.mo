import List "mo:core/List";
import Time "mo:core/Time";
import NotifTypes "../types/notifications";
import Common "../types/common";

module {
  public type Notification = NotifTypes.Notification;
  public type NotificationView = NotifTypes.NotificationView;
  public type CreateNotificationInput = NotifTypes.CreateNotificationInput;

  public func createNotification(
    notifications : List.List<Notification>,
    nextId : { var value : Nat },
    input : CreateNotificationInput,
  ) : Notification {
    let notif : Notification = {
      id = nextId.value;
      recipientId = input.recipientId;
      notifType = input.notifType;
      title = input.title;
      body = input.body;
      link = input.link;
      var isRead = false;
      createdAt = Time.now();
    };
    notifications.add(notif);
    nextId.value += 1;
    notif;
  };

  public func getUnreadCount(
    notifications : List.List<Notification>,
    userId : Common.UserId,
  ) : Nat {
    var count = 0;
    notifications.forEach(func(n : Notification) {
      if (n.recipientId == userId and not n.isRead) {
        count += 1;
      };
    });
    count;
  };

  public func listNotifications(
    notifications : List.List<Notification>,
    userId : Common.UserId,
    limit : Nat,
    offset : Nat,
  ) : [NotificationView] {
    let buf = List.empty<NotificationView>();
    notifications.forEach(func(n : Notification) {
      if (n.recipientId == userId) {
        buf.add(toView(n));
      };
    });
    let total = buf.size();
    if (offset >= total) { return [] };
    let end = if (offset + limit > total) { total } else { offset + limit };
    buf.sliceToArray(offset, end);
  };

  public func markAsRead(
    notifications : List.List<Notification>,
    userId : Common.UserId,
    notificationId : Common.NotificationId,
  ) : { #ok; #err : Text } {
    var found = false;
    var authorized = true;
    notifications.forEach(func(n : Notification) {
      if (n.id == notificationId) {
        found := true;
        if (n.recipientId != userId) {
          authorized := false;
        } else {
          n.isRead := true;
        };
      };
    });
    if (not found) { #err("Notification not found") }
    else if (not authorized) { #err("Not authorized") }
    else { #ok };
  };

  public func markAllAsRead(
    notifications : List.List<Notification>,
    userId : Common.UserId,
  ) {
    notifications.forEach(func(n : Notification) {
      if (n.recipientId == userId and not n.isRead) {
        n.isRead := true;
      };
    });
  };

  public func toView(n : Notification) : NotificationView {
    {
      id = n.id;
      recipientId = n.recipientId;
      notifType = n.notifType;
      title = n.title;
      body = n.body;
      link = n.link;
      isRead = n.isRead;
      createdAt = n.createdAt;
    };
  };
};
