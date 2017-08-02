kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.notifications = {
  notificationHistoryObject: null,
  getNotificationHistoryInstance: function() {
    if (this.notificationHistoryObject === null)
      this.notificationHistoryObject = new NotificationHistory();
    return this.notificationHistoryObject;
  }
};

/*
SELECT n.title, n.description, n.notification_id, GROUP_CONCAT(data_key) as dataKeys, GROUP_CONCAT(data_value) as dataValues FROM notification n LEFT JOIN notification_data nd on n.notification_id = nd.notification_id GROUP BY nd.notification_id;
*/
String.prototype.replaceAll = function(f, r) {
  return this.split(f).join(r);
};

//Constructor
var NotificationHistory = function() {

};

NotificationHistory.prototype.fetchDetails = function(index, leaveId) {
  kony.print("Start <==> NotificationHistory.prototype.fetchLeaveDetails");
  try {


  } catch (excp) {
    kony.sdk.mvvm.log.error("Exception occured while fetching data " + JSON.stringify(excp));
  }
  kony.print("End <==> NotificationHistory.prototype.fetchLeaveDetails");
};

/**
 *  Exits from Notification History Screen and destory its object to free memory
 * 
 */
NotificationHistory.prototype.exitNotificationsScreen = function() {
  kony.print("-- Start NotificationHistory.prototype.exitNotificationsScreen");
  var previousForm = kony.application.getPreviousForm();
  if(previousForm) {
    //Just show previous form with pre-loaded data
    previousForm.show();
  } else {
    //Generally, It shouldn't happen.
    //ToDo : Add default landing page
  }
  //Destroy Notification History Singleton Instance
  kony.apps.coe.ess.notifications.notificationHistoryObject = null;
  kony.print("-- End NotificationHistory.prototype.exitNotificationsScreen");
};