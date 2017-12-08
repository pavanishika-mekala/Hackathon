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

String.prototype.replaceAll = function(f, r) {
  return this.split(f).join(r);
};


//Constructor
var NotificationHistory = function() {

};

NotificationHistory.prototype.fetchTimeSheetDetails = function(index, timeId) {
  kony.print("--Start NotificationHistory.prototype.fetchPayDetails --");
  try {
    if (index && timeId) {
      var sqlQuery = "SELECT ts.Start_Date as startDate, ts.End_Date as endDate, s.status_name as timesheetStatus " +
      "FROM Timesheet ts INNER JOIN status s on s.id = ts.Status_Id WHERE " + 
      "ts.Id = '" + timeId + "'";
      var successCall = function(res) {
        if (res && res.length !== 0) {
          var dataItem = frmNotificationsList.segNotificationList.data[index];
          if(dataItem) {
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
            var startDateString = String(res[0].startDate);
            var endDateString = String(res[0].endDate);
            if(startDateString && endDateString) {
              var startDate = new Date(startDateString.substring(0, 4), parseInt(startDateString.substring(4, 6)) - 1, startDateString.substring(6, 8));
              var endDate = new Date(endDateString.substring(0, 4), parseInt(endDateString.substring(4, 6)) - 1, endDateString.substring(6, 8));
              var convertedStartDate = startDate.getDate() + " " + monthMap[(startDate.getMonth())];
              var convertedEndDate = endDate.getDate() + " " + monthMap[(endDate.getMonth())];
              //Check if it's one day timesheet
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
            frmNotificationsList.segNotificationList.setDataAt(dataItem, parseInt(index), 0);
          } else {
            //Passed Index might not correct.
          }
        } else {
          //Empty response. Nothing to do
        }
      };
      var failureCall = function(err) {

      };
      kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, successCall, failureCall);
    } else {
      kony.print("Please pass valid parameters to fetchPayDetails");
    }
  } catch (excp) {
    kony.sdk.mvvm.log.error("Exception occured while fetching data " + JSON.stringify(excp));
  }
  kony.print("--End NotificationHistory.prototype.fetchPayDetails--");
};

/**
 * Navigates back from Notification History screen and destorys it's objects to freeup memory
 */
NotificationHistory.prototype.exitNotificationsHistory = function () {
  kony.print("-- Start NotificationHistory.prototype.exitNotificationsHistory" );
  var previousForm = kony.application.getPreviousForm();
  if(previousForm) {
    previousForm.show();
  } else {
    //Generally, It shouldn't happen
    showAndLoadPayCheckForm();
  }
  kony.apps.coe.ess.notifications.notificationHistoryObject = null;
  kony.print("-- End NotificationHistory.prototype.exitNotificationsHistory" );
};