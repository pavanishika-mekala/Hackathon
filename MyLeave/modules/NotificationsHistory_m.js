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


//Constructor
var NotificationHistory = function() {
    //contains leaveId of every row according to its rowindex
    this.contextDataIndices = [];
    //storing current form as constructor is executed in bind data
    //which is technically still executed in prev form
    this.previousForm = kony.application.getCurrentForm();
};

/**
 * Fetches Leave details of specified leave-id and populates/updates segment data at specified index.
 * @param index 
 *        Index of Segment Data Element
 * @param leaveId
 *        Leave ID of leave
 */
NotificationHistory.prototype.fetchLeaveDetails = function(index, leaveId) {
  kony.print("-- Start NotificationHistory.prototype.fetchLeaveDetails");
  try {

    if (index && leaveId) {
      var sqlQuery = "SELECT lv.start_date, lv.end_date, s.status_name as leaveStatus " +
        "FROM leave lv INNER JOIN status s ON lv.status_id = s.id WHERE lv.id = '" + leaveId + "'";
      var successCall = function(res) {

        if (res && res.length !== 0) {
          if(kony.apps.coe.ess.globalVariables.isNativeTablet === true){
              var segData = kony.application.getCurrentForm().segNotifications.data;
          }else{
              var segData = frmNotificationsList.segNotificationList.data;
          }
          
          if (segData && segData.length > index) {
            var dataItem = segData[index];
            var monthMap = {
              "0": "Jan",
              "1": "Feb",
              "2": "Mar",
              "3": "Apr",
              "4": "May",
              "5": "Jun",
              "6": "Jul",
              "7": "Aug",
              "8": "Sep",
              "9": "Oct",
              "10": "Nov",
              "11": "Dec"
            };
            //Time Period & Time Duration
            var startDateString = String(res[0].start_date);
            var endDateString = String(res[0].end_date);
            if (startDateString && endDateString) { 
              
              var startDate = new Date(startDateString.substring(0, 4), parseInt(startDateString.substring(4, 6)) - 1, startDateString.substring(6, 8));
              var endDate = new Date(endDateString.substring(0, 4), parseInt(endDateString.substring(4, 6)) - 1, endDateString.substring(6, 8));
              var convertedStartDate = startDate.getDate() + " " + monthMap[(startDate.getMonth())];
              var convertedEndDate = endDate.getDate() + " " + monthMap[(endDate.getMonth())];
              //Check if it's one day leave
              if (convertedStartDate === convertedEndDate) {
                dataItem.timePeriod = convertedStartDate + "," + startDate.getFullYear();
                dataItem.timeDuration = "1 Day"
              } else {
                dataItem.timePeriod = convertedStartDate + " - " + convertedEndDate;
                dataItem.timeDuration = startDate.differenceInDays(endDate);
              }  
            } else {
              dataItem.timePeriod = "";
              dataItem.timeDuration = "";
            }
            //Icon of Notification
            switch (res[0].leaveStatus) {
              case "Approved":
                dataItem.notificationIcon = "approved.png";
                break;
              case "Rejected":
                dataItem.notificationIcon = "rejected.png";
                break;
              case "Saved":
                dataItem.notificationIcon = "notifications.png";
                break;
              case "Error":
                dataItem.notificationIcon = "systemerror.png";
                break;
              case "Submitted":
                dataItem.notificationIcon = "submitted.png";
                break;
              case "Pending":
                dataItem.notificationIcon = "submitted.png";
                break;
              default:
                dataItem.notificationIcon = "notifications.png";
                break;
            }
            if(kony.apps.coe.ess.globalVariables.isNativeTablet === true){
              kony.application.getCurrentForm().segNotifications.setDataAt(dataItem, parseInt(index), 0);
            }else{
              frmNotificationsList.segNotificationList.setDataAt(dataItem, parseInt(index), 0);
            }
            this.contextDataIndices.push(leaveId);

          } else {
            //Shouldn't happen
          }
        } else {
          //  Nothing to do if response is null or empty
        }
      }.bind(this);
      var failureCall = function(err) {
        kony.print("Error in fetching leave details : " + JSON.stringify(err));
      };
      kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, successCall, failureCall);

    } else {
      kony.print("Passed parameters are not valid. Please pass valid parameters");
    }

  } catch (excp) {
    kony.sdk.mvvm.log.error("Exception occured while fetching data " + JSON.stringify(excp));
  }
  kony.print("-- End NotificationHistory.prototype.fetchLeaveDetails");
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
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showLeaveHome();
  }
  //Destroy Notification History Singleton Instance
  kony.apps.coe.ess.notifications.notificationHistoryObject = null;
  kony.print("-- End NotificationHistory.prototype.exitNotificationsScreen");
};

/**
 * Action for onclick of a row in notif segment
 */
NotificationHistory.prototype.showDetailsOfRequest = function(){
  kony.print("----- Viewing details of request");
  if(kony.apps.coe.ess.globalVariables.isNativeTablet === true){
    var selectedIndex = kony.application.getCurrentForm().segNotifications.selectedRowIndex[1];
    var leaveId = this.contextDataIndices[selectedIndex];
    kony.apps.coe.ess.KMS.deepDropForTablet(leaveId);
  }else{
    var selectedIndex = frmNotificationsList.segNotificationList.selectedRowIndex[1];
    var leaveId = this.contextDataIndices[selectedIndex];
    kony.apps.coe.ess.KMS.deepDropForMobile(leaveId);
  }
  kony.print("----- End viewing details of request");

};
