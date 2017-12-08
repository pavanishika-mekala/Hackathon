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
//Constructor
var NotificationHistory = function() {
    //contains RequestId of every row according to its rowindex
    this.contextDataIndices = [];
    //storing current form as constructor is executed in bind data
    //which is technically still executed in prev form
    this.previousForm = kony.application.getCurrentForm();
};

NotificationHistory.prototype.storeRequestDetails = function(index, requestId) {
  kony.print("Start <==> NotificationHistory.prototype.fetchLeaveDetails");
  try {
      this.contextDataIndices.push(requestId);
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
  if(this.previousForm) {
    //Just show previous form with pre-loaded data
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(this.previousForm.id);
    if(formController !== null && formController !== undefined){
      formController.loadDataAndShowForm();  
    }
    else{
      this.previousForm.show();  
    }
  } else {
    //Generally, It shouldn't happen.
    //ToDo : Add default landing page
  }
  //Destroy Notification History Singleton Instance
  kony.apps.coe.ess.notifications.notificationHistoryObject = null;
  kony.print("-- End NotificationHistory.prototype.exitNotificationsScreen");
};

NotificationHistory.prototype.showDetailsOfRequest = function(){
  kony.print("----- Viewing details of request");
  if(kony.apps.coe.ess.globalVariables.isNativeTablet === true){
    var selectedIndex = kony.application.getCurrentForm().segNotifications.selectedRowIndex[1];
    var requestId = this.contextDataIndices[selectedIndex];
    this.checkIfRequestExists(requestId, kony.apps.coe.ess.KMS.deepDropForTablet, this.requestUnavailable)
  }else{
    var selectedIndex = frmNotificationsList.segNotificationList.selectedRowIndex[1];
    var requestId = this.contextDataIndices[selectedIndex];
    this.checkIfRequestExists(requestId, kony.apps.coe.ess.KMS.deepDropForMobile, this.requestUnavailable)
  }
  kony.print("----- End viewing details of request");

}

NotificationHistory.prototype.requestUnavailable = function(){
  kony.print("The request isn't available");
  toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.myApprovals.requestUnavailable"), 2000);
}

NotificationHistory.prototype.checkIfRequestExists = function(requestId, callbackIfRequestExists, callbackIfRequestDoesNotExist){
  kony.print("Checking if request available in data");
  var query = "SELECT * from approval_request WHERE approval_request.request_id = '" +requestId + "';";
  kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, function(callbackIfRequestExists,callbackIfRequestDoesNotExist, requestId, res){
    if(res !== null && res!== undefined && res.length > 0){
      kony.apps.coe.ess.myApprovals.IdFromGoToDetailFlex = res[0].id;
      callbackIfRequestExists(requestId);
    }else{
      callbackIfRequestDoesNotExist();
    }
  }.bind(this,callbackIfRequestExists, callbackIfRequestDoesNotExist, requestId), function(err){
    kony.print(JSON.stringify(err));
    callbackIfRequestDoesNotExist();
  });
}