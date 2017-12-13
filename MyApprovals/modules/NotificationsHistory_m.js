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

NotificationHistory.prototype.fetchLeaveDetails = function(index,selectedApprovalID) {
  //kony.print("-- Start NotificationHistory.prototype.fetchLeaveDetails");
  try {
    kony.print("selectedApprovalID is::"+selectedApprovalID);
	if (selectedApprovalID !== "") {
      var sqlQuery = "SELECT approval_request.id  AS ID,approval_request.request_date AS RequestDate,approval_request.leave_hours AS Leave_hours,request_approver.status_id AS StatusId,status.status_name AS StatusName,t2.TEXT_DISPLAY As	Category,"+
          "attribute.id AS attributeID,attribute.attribute_def_id AS Attribute_DEF,attribute_def.attribute_section_id AS AttributeSection,Group_concat(attribute.value) AS Attributevalue,Group_concat(attribute_def.label)  AS AttributeNAME "+
          "FROM approval_request LEFT JOIN request_approver ON ( approval_request.id = request_approver.approval_id ) "+
          "LEFT JOIN status ON ( request_approver.status_id = status.id ) "+
          "LEFT JOIN request_category ON ( approval_request.category_id = request_category.id ) "+
          "LEFT JOIN translation t1 ON (request_category.name=t1.TEXT_DISPLAY) "+
          "LEFT JOIN translation t2 ON(t2.TEXT_CODE=t1.TEXT_CODE) "+
          "LEFT JOIN attribute ON ( approval_request.id = attribute.approval_id ) "+
          "LEFT JOIN attribute_def ON ( attribute.attribute_def_id = attribute_def.id ) "+
          "WHERE  request_approver.approver_id = '" + kony.apps.coe.ess.globalVariables.EmployeeID +"' and  t2.SPRAS like '"+kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase()+"' "+
                  " and  approval_request.request_id ='" + selectedApprovalID + "'";
      var successCall = function(res) {
         var segData = [];
        if (res && res.length !== 0) {
          if(kony.apps.coe.ess.globalVariables.isNativeTablet === true){
              segData = kony.application.getCurrentForm().segNotifications.data;
          }else{
              segData = frmNotificationsList.segNotificationList.data;
          }
          
          if (segData && segData.length > index) {
            var dataItem = segData[index];
            dataItem.selectedApprovalID = selectedApprovalID;
            //Time Period & Time Duration
            var duration = "";
            var notDates = "";
            if (isEmpty(res[0].AttributeNAME) || isEmpty(res[0].Attributevalue)) {
              kony.print("AttributeNAME and Attributevalue are empty");
              res[0].attributejson = {};
            } else {
              res[0].attributejson = res[0].AttributeNAME.returnCombinationInJsonFormat(res[0].Attributevalue, ",");
            }
            var startDateString = String(res[0].RequestDate);
            var leaveHours = String(res[0].Leave_hours);
            kony.print("leaveHours::"+leaveHours);
            if(leaveHours !== null && leaveHours !== "" && leaveHours !== "null"){
              var hours = Number(leaveHours).toFixed();
              kony.print(";hours::"+hours);
              if(hours == 1){
                dataItem.timeDuration = {text:hours + " " + kony.i18n.getLocalizedString("i18n.ess.myApprovals.hour"),isVisible:true,centerX:"50%"};
              }else{
                dataItem.timeDuration = {text:hours +" "+kony.i18n.getLocalizedString("i18n.ess.myApprovals.hours"),isVisible:true,centerX:"50%"};
              }
            }else{
              dataItem.timeDuration = {text:"",isVisible:false,centerX:"50%"};
            }
            if (res[0].attributejson.StartDate && res[0].attributejson.EndDate) {
              var startdate = new Date().modifyByYYYYMMDDHHMMSS(res[0].attributejson.StartDate);
              var endDate = new Date().modifyByYYYYMMDDHHMMSS(res[0].attributejson.EndDate);
              dataItem.timePeriod = {text:startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3),isVisible:true};
              if(leaveHours > 8){
					notDates = startdate.getDate() + " " + startdate.retriveMonthName().substring(0, 3) + " - " + endDate.getDate() + " " + endDate.retriveMonthName().substring(0, 3);
                	dataItem.timePeriod = {text:notDates,isVisible:true};
                	dataItem.timeDuration.centerX = "55%";
              }
            }else{
              dataItem.timePeriod = {text:"",isVisible:false};
            }
            if(dataItem.timePeriod.text === "" && dataItem.timeDuration.text === ""){
              dataItem["flxNotificationListTemplate"] = {
                height: "15.5%"
              };
              dataItem["description"].top = "60%"
            }else{
              dataItem["flxNotificationListTemplate"] = {
                height: "20.5%"
              };
              dataItem["description"].top = "40%"
            }
            //Icon of Notification
            switch (res[0].StatusName) {
              case "Approved":
                dataItem.notificationIcon = {src:"approved.png"};
                break;
              case "Rejected":
                dataItem.notificationIcon = {src:"rejected.png"};
                break;
              case "Saved":
                dataItem.notificationIcon = {src:"notifications.png"};
                break;
              case "Error":
                dataItem.notificationIcon = {src:"systemerror.png"};
                break;
              case "Submitted":
                dataItem.notificationIcon = {src:"submitted.png"};
                break;
              case "Pending":
                dataItem.notificationIcon = {src:"submitted.png"};
                break;
              default:
                dataItem.notificationIcon = {src:"reminder.png"};
                break;
            }
            if(kony.apps.coe.ess.globalVariables.isNativeTablet === true){
              kony.application.getCurrentForm().segNotifications.setDataAt(dataItem, parseInt(index), 0);
            }else{
              frmNotificationsList.segNotificationList.setDataAt(dataItem, parseInt(index), 0);
            }
            this.contextDataIndices.push(selectedApprovalID);

          } else {
            //Shouldn't happen
          }
        } else {
          kony.print("Result is null");
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
    kony.print("Exception occured while fetching notification data " + JSON.stringify(excp));
  }
  //kony.print("-- End NotificationHistory.prototype.fetchLeaveDetails");
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
  //kony.print("----- Viewing details of request");
  if(kony.apps.coe.ess.globalVariables.isNativeTablet === true){
    var selectedIndex = kony.application.getCurrentForm().segNotifications.selectedRowItems;
    var requestId = selectedIndex[0].selectedApprovalID;//this.contextDataIndices[selectedIndex];
    this.checkIfRequestExists(requestId, kony.apps.coe.ess.KMS.deepDropForTablet, this.requestUnavailable)
  }else{
    var selectedIndex = frmNotificationsList.segNotificationList.selectedRowItems;
    kony.print("selectedIndex is::"+JSON.stringify(selectedIndex));
    var requestId = selectedIndex[0].selectedApprovalID;//this.contextDataIndices[selectedIndex];
    this.checkIfRequestExists(requestId, kony.apps.coe.ess.KMS.deepDropForMobile, this.requestUnavailable)
  }
  //kony.print("----- End viewing details of request");

}

NotificationHistory.prototype.requestUnavailable = function(){
  kony.print("The request isn't available");
  if(kony.i18n.getLocalizedString("i18n.ess.myApprovals.requestUnavailable") != null)
  toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.myApprovals.requestUnavailable"), 2000);
}

NotificationHistory.prototype.checkIfRequestExists = function(requestId, callbackIfRequestExists, callbackIfRequestDoesNotExist){
  kony.print("Checking if request available in data");
  var query = "SELECT * from approval_request WHERE approval_request.request_id = '" +requestId + "'";
  kony.print("query is::"+query);
  kony.sync.single_select_execute(kony.sync.getDBName(),query,null,CurrSuccessCallBack,callbackIfRequestDoesNotExist);
  function CurrSuccessCallBack(res){
    kony.print("inside CurrSuccessCallBackis::"+res);
    if(res !== undefined && res !== null && res !== ""){
    	callbackIfRequestExists(requestId);
    }
  }
  /*kony.apps.coe.ess.MVVM.executeDBQuery("MYAPPROVALS", query, function(callbackIfRequestExists,callbackIfRequestDoesNotExist, requestId, res){
    if(res !== null && res!== undefined && res.length > 0){
      kony.apps.coe.ess.myApprovals.IdFromGoToDetailFlex = res[0].id;
      callbackIfRequestExists(requestId);
    }else{
      callbackIfRequestDoesNotExist();
    }
  }.bind(this,callbackIfRequestExists, callbackIfRequestDoesNotExist, requestId), function(err){
    kony.print(JSON.stringify(err));
    callbackIfRequestDoesNotExist();
  });*/
}