import Common "common";

module {
  public type NotificationType = {
    #quoteReceived;
    #replyReceived;
    #bookingConfirmed;
    #paymentReceived;
  };

  public type Notification = {
    id : Common.NotificationId;
    recipientId : Common.UserId;
    notifType : NotificationType;
    title : Text;
    body : Text;
    link : Text;
    var isRead : Bool;
    createdAt : Common.Timestamp;
  };

  public type NotificationView = {
    id : Common.NotificationId;
    recipientId : Common.UserId;
    notifType : NotificationType;
    title : Text;
    body : Text;
    link : Text;
    isRead : Bool;
    createdAt : Common.Timestamp;
  };

  public type CreateNotificationInput = {
    recipientId : Common.UserId;
    notifType : NotificationType;
    title : Text;
    body : Text;
    link : Text;
  };
};
