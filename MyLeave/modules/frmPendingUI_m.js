//-----------------------------------File Header -------------------------------------------------
/**
 * @module Pending Leave Requests
 * @Author Waseem Ahmed
 * @category  UI
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
var check = true;
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI = function () {
    kony.print("-- Start PendingLeaveRequestUI --");
    prevId = "";
    kony.print("-- End PendingLeaveRequestUI --");
};

/**
 * @function showForm
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - code that displays the pendingLeaveRequest form
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.showForm = function () {
    kony.print("-- Start showForm --");
    frmPendingLeaveRequest.show();
    kony.print("-- End showForm --");
};

/**
 * @function initShow
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - code for setting gestures
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.initShow = function () {

    kony.print("-- Start initShow --");
    flxSegPending.setGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
        fingers : 1
    }, this.swipeAnimation);
    kony.print("-- End initShow --");
};

/**
 * @function swipeAnimation
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - code for swiping animations
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.swipeAnimation = function (commonWidget, gestureInfo, context) {

    kony.print("-- Start swipeAnimation --");
    var obj = new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI();
    if (gestureInfo.swipeDirection == 1) {
        check = false;
        obj.leftSwipe(commonWidget);

    } else if (gestureInfo.swipeDirection === 2) {
        check = false;
        obj.rightSwipe(commonWidget);
    }
    kony.print("-- End swipeAnimation --");
};

/**
 * @function leftSwipe
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - code for swiping the segment row to its left side
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.leftSwipe = function (commonWidget) {

    kony.print("-- Start leftSwipe --");
    frmLeaveRequestDetails.destroy();
    if (kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prevId !== undefined && kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prevId !== "") {
        var obj = new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI();
        obj.rightSwipe(kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prevId);
    }
    commonWidget.flxOuter.animate(
        kony.ui.createAnimation({

            "100" : {
                "left" : "-40%",

                "stepConfig" : {
                    "timingFunction" : kony.anim.EASE
                }
            }
        }), {
        "delay" : 0,
        "iterationCount" : 1,
        "fillMode" : kony.anim.FILL_MODE_FORWARDS,
        "duration" : 0.5
    }, {
        "animationEnd" : function () {}
    });

    commonWidget.flxImgHidden.animate(
        kony.ui.createAnimation({

            "100" : {
                "left" : "60%",

                "stepConfig" : {
                    "timingFunction" : kony.anim.EASE
                }
            }
        }), {
        "delay" : 0,
        "iterationCount" : 1,
        "fillMode" : kony.anim.FILL_MODE_FORWARDS,
        "duration" : 0.5
    }, {
        "animationEnd" : function () {
            check = true;
        }

    });
    kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prevId = commonWidget;
    kony.print("-- End leftSwipe --");

};

/**
 * @function rightSwipe
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - code for swiping the segment row back to its original position
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.rightSwipe = function (commonWidget) {

    kony.print("-- Start rightSwipe --");
    frmLeaveRequestDetails.destroy();
    commonWidget.flxOuter.animate(
        kony.ui.createAnimation({

            "100" : {
                "left" : "0%",

                "stepConfig" : {
                    "timingFunction" : kony.anim.EASE
                }
            }
        }), {
        "delay" : 0,
        "iterationCount" : 1,
        "fillMode" : kony.anim.FILL_MODE_FORWARDS,
        "duration" : 0.5
    }, {
        "animationEnd" : function () {}
    });

    commonWidget.flxImgHidden.animate(
        kony.ui.createAnimation({

            "100" : {
                "left" : "100%",

                "stepConfig" : {
                    "timingFunction" : kony.anim.EASE
                }
            }
        }), {
        "delay" : 0,
        "iterationCount" : 1,
        "fillMode" : kony.anim.FILL_MODE_FORWARDS,
        "duration" : 0.5
    }, {
        "animationEnd" : function () {
            check = true;
        }
    });
    kony.print("--  End rightSwipe --");
};

/**
 * @function onClickOfDelete
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - code for visibility ON for pop-up flex
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.onClickOfDelete = function () {

    kony.print("-- Start onClickOfDelete --");
    if (kony.application.getCurrentForm().id === "frmPendingLeaveRequest") {
        frmPendingLeaveRequest.flxPopUp.setVisibility(true);
        frmPendingLeaveRequest.TxtAreaComments.text = "";
    } else {
        frmSearchLog.flxPopUp.setVisibility(true);
        frmSearchLog.TxtAreaComments.text = "";
    }
    kony.print("-- End onClickOfDelete --");
};

/**
 * @function onClickOfCancel
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - code for visibility OFF for pop-up flex
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.onClickOfCancel = function () {

    kony.print("-- Start onClickOfCancel --");
    if (kony.application.getCurrentForm().id === "frmPendingLeaveRequest")
        frmPendingLeaveRequest.flxPopUp.setVisibility(false);
    else
        frmSearchLog.flxPopUp.setVisibility(false);
    kony.print("-- End onClickOfCancel --");

};

/**
 * @function processData
 * @member of PendingLeaveRequestUI#
 * @return - {processedData}
 * @description - code for data mapping for segment row
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.getPendingData = function () {
    kony.print("-- Start getPendingData --");
    var currDate = new Date();
    var actualCurrYear = currDate.getFullYear().toString().trim(0, 4);
    var query = "select l.employee_id,l.id,l.no_of_hours,l.lastmodifiedts,l.start_date,l.end_date,l.createdts,tr.TEXT_DISPLAY as name,s.Status_Name,lt.name as name1 from leave l LEFT JOIN translation tr ON ( l.leave_type_id = tr.TEXT_CODE),leave_type lt,Status s where l.leave_type_id = lt.id AND l.status_id = s.Id AND s.Status_Name like 'PENDING' and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " AND ((l.start_date between '" + (parseInt(actualCurrYear) - 1).toString() + "0101'" +
        " AND '" + (parseInt(actualCurrYear) + 1).toString() + "1231')) AND tr.SPRAS like '"+kony.i18n.getCurrentLocale().substring(0, 2).toUpperCase()+"' order by l.start_date";
    kony.sync.single_select_execute(kony.sync.getDBName(), query, null, function (data) {
        var processedData = [];
        for (var i = 0; i < data.length; i++) {
            var pendingData = {};
            pendingData.lblLeaveId = data[i].id + "$" + data[i].start_date;
            pendingData.lblLeaveType = data[i].name;
            var sdate = data[i].start_date;
            var ldate = data[i].end_date;
            var pendingDate = parseInt(sdate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(sdate.substring(4, 6) * 1) - 1).toString()] +
                " - " + parseInt(ldate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(ldate.substring(4, 6) * 1) - 1).toString()];
            pendingData.lblDates = pendingDate;
            var adate = data[i].lastmodifiedts;
            if (adate === "") {
                pendingData.lblAppliedDate = "";
            } else {
                adate = data[i].lastmodifiedts;
                var mins = parseInt(adate.substring(10, 12) * 1);
                if (mins < 10)
                    mins = "0" + parseInt(adate.substring(10, 12) * 1);
                var hrs = parseInt(adate.substring(8, 10) * 1);
              	var AP = "";
//                 var AP = "AM";
//                 if (hrs >= 12) {
//                     hrs = hrs - 12;
//                     AP = "PM";
//                 }
                pendingData.lblAppliedDate = parseInt(adate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(adate.substring(4, 6) * 1) - 1).toString()] +
                    " " + parseInt(adate.substring(0, 4) * 1) + " " + hrs + ":" + mins + " " + AP;
            }

            pendingData.lblStatus = kony.i18n.getLocalizedString("i18n.ess.common.pending.valueKA");
            // if (data[i].no_of_hours < 8) {
            //  if (data[i].no_of_hours == 7.5) {
            //      pendingData.lblDays = "1 DAY";
            //  } else
            //      pendingData.lblDays = data[i].no_of_hours + " " + "HOURS";
            // } else
            //  pendingData.lblDays = ((parseInt(data[i].no_of_hours) * 1) / 7.5).toFixed() + " DAYS";
            var diff = ((parseInt(data[i].no_of_hours) * 1) / kony.apps.coe.ess.appconfig.workingHours).toFixed();
            if(parseInt(diff) === 1){
                 pendingData.lblDays = diff.toString() + kony.i18n.getLocalizedString("i18.ess.frmTeamView.day");
            } else{
              pendingData.lblDays = diff.toString() + kony.i18n.getLocalizedString("i18.ess.frmTeamView.days");
            }
            pendingData.imgCal = "cal.png";
            pendingData.lblLine1 = " ";
            pendingData.flxEdit = "sknflxbg1C7393op100";
            pendingData.flxDelete = "sknflxbgFF6E5Fop100";
            pendingData.imgEdit = "edit_white.png";
            pendingData.imgDelete = "cancel_white.png";
            pendingData.startDate = data[i].start_date;
            pendingData.endDate = data[i].end_date;
            processedData.push(pendingData);
        }
        var obj = new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI();
        obj.setDataToPendingForm(processedData);
    }, function (err) {
        handleError(err);
    }, false);
    kony.print("-- End processData --");

};

/**
 * @function setDataToPendingForm
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - code for setting the required data to the segment row
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.setDataToPendingForm = function (data) {
  kony.print("-- Start setDataToPendingForm --");
  data = this.addAlternateSkinToSegment(data, "flxOuter", "sknSegRowFAFAFAop100", "sknSegAltRowF8F8F8op100");
  function onRowClick() {
    if(check === true)
      kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.onSegClick();
  }
  for(var i in data) {
    data[i].flxOuter.onClick = onRowClick;
  }
  if(data.length !=null && data.length >0){
      frmPendingLeaveRequest.segPendingLeaveRequest.setData(data);
      frmPendingLeaveRequest.lblNoRecords.setVisibility(false);
  }else{
      frmPendingLeaveRequest.segPendingLeaveRequest.removeAll();
      frmPendingLeaveRequest.lblNoRecords.setVisibility(true);
  }
  kony.print("-- End setDataToPendingForm --");
};

/**
 * @function showPendingForm
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - code that initiates the service call to get the data required for the pendingLeaveRequest form
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.showPendingForm = function () {
    kony.print("-- Start showPendingForm --");
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmPendingLeaveRequest");
    formController.loadDataAndShowForm();
    kony.print("-- End showPendingForm --");
};

/**
 * @function deleteLeave
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - This method is used to delete a leave.
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.deleteLeave = function () {
    try {
        kony.print("-- Start deleteLeave --");
        var data = "";
        var tempJSON = "";
        var curForm = kony.application.getCurrentForm();
        var date1 = new Date();
        var tstamp = date1.getFullYear().toString().trim(0,4)+""+getTimeHourswithZero(date1.getMonth()+1)+""+getTimeHourswithZero(date1.getDate())+""+getTimeHourswithZero(date1.getHours())+""+getTimeHourswithZero(date1.getMinutes())+""+getTimeHourswithZero(date1.getSeconds());
       if (curForm.id === "frmPendingLeaveRequest") {
            data = frmPendingLeaveRequest.segPendingLeaveRequest.selectedItems[0].lblLeaveId.split("$")[0];
            tempJSON = {
                "id" : data,
                "status_id" : "3",
                "employee_id" : kony.apps.coe.ess.globalVariables.employeeId,
                "lastmodifiedts" : tstamp,
            };

            kony.apps.coe.ess.MVVM.update("MYLEAVE", "leave", tempJSON, function (data) {
                new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI().deleteLeaveSuccess();
            }, function (err) {
                var obj = new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI();
                obj.showPendingForm();
                obj.onClickOfCancel();
                handleError(err);
            });
        } else {
            data = frmSearchLog.segList.selectedItems[0].lblLeaveId.split("$")[0];
            tempJSON = {
                "id" : data,
                "status_id" : "3",
                "employee_id" : kony.apps.coe.ess.globalVariables.employeeId,
                "lastmodifiedts" : tstamp,
            };
           //        alert(JSON.stringify(tempJSON));

        //  kony.print(""+JSON.stringify(tempJSON));
            kony.apps.coe.ess.MVVM.update("MYLEAVE", "leave", tempJSON, function (data) {
                new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI().deleteLeaveSuccess();
            }, function (err) {
                var obj = new kony.apps.coe.myLeave.search();
                obj.done();
                var ob = new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI();
                ob.onClickOfCancel();
                handleError(err);
            });

        }
        kony.print("-- End deleteLeave --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @function deleteLeaveSuccess
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - This method is used to delete a leave with comments.
 */

kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.deleteLeaveSuccess = function (response) {
    var data = {};
    data.employee_id = kony.apps.coe.ess.globalVariables.employeeId;
    var date = new Date();
    var timestamp = date.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date.getMonth() + 1) + "" + getTimeHourswithZero(date.getDate()) + "" + getTimeHourswithZero(date.getHours()) + "" + getTimeHourswithZero(date.getMinutes()) + "" + getTimeHourswithZero(date.getSeconds());
    data.createdts = timestamp;
    var curForm = kony.application.getCurrentForm();
    if (curForm.id === "frmPendingLeaveRequest") {
        var selectedLeaveData = frmPendingLeaveRequest.segPendingLeaveRequest.selectedItems[0];
//comenting Calendar Event Creation in Phone
//         var evtobj={
//           type:"starting",
//           start: selectedLeaveData.startDate.substring(6,8)+"/"+selectedLeaveData.startDate.substring(4,6) +"/" + selectedLeaveData.startDate.substring(0,4) + " 00:00:00",
//           finish:selectedLeaveData.endDate.substring(6,8)+"/"+selectedLeaveData.endDate.substring(4,6) +"/" + selectedLeaveData.endDate.substring(0,4) + " 23:59:59"
//         };
//       var options = {};
//       var result = kony.application.checkPermission(kony.os.RESOURCE_CALENDAR,options);
//       if(result.status == kony.application.PERMISSION_DENIED) {
//         if(result.canRequestPermission){
//           kony.application.requestPermission(kony.os.RESOURCE_CALENDAR, permissionStatusCallback);
//         }
//         else{
//           var basicConfig = {
//             alertType : constants.ALERT_TYPE_CONFIRMATION,
//             message : kony.i18n.getLocalizedString("i18n.ess.common.enablePermissionSettings"),
//             alertHandler : alertCallback
//           }
//           var pspConfig={};
//           kony.ui.Alert(basicConfig,pspConfig);
//         }
//       }
//       else{
//     permissionStatusCallback(result);
//   }  
//   function alertCallback(resp){
//     if(resp == true){
//       kony.application.openApplicationSettings();
//   }
// } 
//       function permissionStatusCallback(response){
//         kony.print("in permissionStatusCallback of all pending requests delete.");
//         if(response.status == true || response.status == 50002){
//         var events = kony.phone.findCalendarEvents(evtobj);
//         for (var eventNo = 0; eventNo < events.length; eventNo++){
//           if(events[eventNo].summary.substring(0,12) == kony.i18n.getLocalizedString("i18n.ess.common.MyLeaveApp.valueKA")){
//             kony.phone.removeCalendarEvent(events[eventNo]);
//           }
//         }
        data.leave_id = frmPendingLeaveRequest.segPendingLeaveRequest.selectedItems[0].lblLeaveId.split("$")[0];
        data.comments = frmPendingLeaveRequest.TxtAreaComments.text;
        if (data.comments !== "") {
          kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave_note", data, function (res) {
            var ob = new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI();
            ob.onClickOfCancel();
            frmPendingLeaveRequest.segPendingLeaveRequest.removeAt(parseInt(frmPendingLeaveRequest.segPendingLeaveRequest.selectedIndex[1]));
            frmPendingLeaveRequest.forceLayout();
          }, function (err) {});
        } else {
          var ob = new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI();
          ob.onClickOfCancel();
          frmPendingLeaveRequest.segPendingLeaveRequest.removeAt(parseInt(frmPendingLeaveRequest.segPendingLeaveRequest.selectedIndex[1]));
          frmPendingLeaveRequest.forceLayout();
        }
//       }
//         else{
//           var basicConfig = {
//             alertType : constants.ALERT_TYPE_CONFIRMATION,
//             message : kony.i18n.getLocalizedString("i18n.ess.common.permissionDeniedPleaseEnablePermssions"),
//             alertHandler : alertCallback
//           }
//           var pspConfig={};
//           kony.ui.Alert(basicConfig,pspConfig);
//         }          }
}
  else {
        var selectedLeaveData = frmSearchLog.segList.selectedItems[0];
//comenting Calendar Event Creation in Phone
//         var evtobj={
//           type:"starting",
//           start: selectedLeaveData.startDate.substring(6,8)+"/"+selectedLeaveData.startDate.substring(4,6) +"/" + selectedLeaveData.startDate.substring(0,4) + " 00:00:00",
//           finish:selectedLeaveData.endDate.substring(6,8)+"/"+selectedLeaveData.endDate.substring(4,6) +"/" + selectedLeaveData.endDate.substring(0,4) + " 23:59:59"
//         };
//     var options = {};
//     var result = kony.application.checkPermission(kony.os.RESOURCE_CALENDAR,options);
//     if(result.status == kony.application.PERMISSION_DENIED) {
//       if(result.canRequestPermission){
//         kony.application.requestPermission(kony.os.RESOURCE_CALENDAR, permissionStatusCallback);
//       }
//       else{
//         var basicConfig = {
//           alertType : constants.ALERT_TYPE_CONFIRMATION,
//           message : kony.i18n.getLocalizedString("i18n.ess.common.enablePermissionSettings"),
//           alertHandler : alertCallback
//         };
//         var pspConfig={};
//         kony.ui.Alert(basicConfig,pspConfig);
//       }
//     }
//     else{
//       permissionStatusCallback(result);
//     }  
//     function alertCallback(resp){
//       if(resp == true){
//         kony.application.openApplicationSettings();
//       }
//     }
//      function permissionStatusCallback(response){
//        kony.print("in permission callback of searchlog delete");
//         if(response.status == true || response.status == 50002){
//         var events = kony.phone.findCalendarEvents(evtobj);
//         for (var eventNo = 0; eventNo < events.length; eventNo++){
//           if(events[eventNo].summary.substring(0,12) == kony.i18n.getLocalizedString("i18n.ess.common.MyLeaveApp.valueKA")){
//             kony.phone.removeCalendarEvent(events[eventNo]);
//           }
//         }
        data.leave_id = frmSearchLog.segList.selectedItems[0].lblLeaveId.split("$")[0];
        data.comments = frmSearchLog.TxtAreaComments.text;
        if (data.comments !== "") {
            kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave_note", data, function (res) {
                var obj = new kony.apps.coe.myLeave.search();
                obj.done();
                var ob = new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI();
                ob.onClickOfCancel();
            }, function (err) {});
        } else {
            var obj = new kony.apps.coe.myLeave.search();
            obj.done();
            new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI().onClickOfCancel();
        }
//      } 
//        else{
//          var basicConfig = {
//            alertType : constants.ALERT_TYPE_CONFIRMATION,
//            message : kony.i18n.getLocalizedString("i18n.ess.common.permissionDeniedPleaseEnablePermssions"),
//            alertHandler : alertCallback
//          };
//          var pspConfig={};
//          kony.ui.Alert(basicConfig,pspConfig);
//        }    
//  }
}
    kony.apps.coe.ess.Sync.syncAsynchronously();
};

/**
 * @function setCommentInPopup
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - This method is used to set text in comments of the popup.
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.setCommentInPopup = function () {
    try {
        kony.print("-- Start setCommentInPopup --");
        if (frmPendingLeaveRequest.TxtAreaComments.text == "Comments (optional)") {
            frmPendingLeaveRequest.TxtAreaComments.text = "";
        }
        kony.print("-- End setCommentInPopup --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @function OnclickOfEdit
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - This method is used to set data to ApplyLeave Form.
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.OnclickOfEdit = function () {
    kony.print("-- Start OnclickOfEdit --");
    var data = "";
    if (kony.application.getCurrentForm().id === "frmPendingLeaveRequest")
        data = frmPendingLeaveRequest.segPendingLeaveRequest.selectedItems[0];
    else
        data = frmSearchLog.segList.selectedItems[0];
    var start_date = (data.lblLeaveId).split("$")[1];
    start_date = (new Date(start_date.substring(0, 4), start_date.substring(4, 6) - 1, start_date.substring(6, 8)).toString()).substring(0, 15);
    kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate = start_date;
    kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId = (data.lblLeaveId).split("$")[0];
    frmApplyLeave.destroy();
    kony.apps.coe.ess.myLeave.applyLeave.showForm();
    kony.print("-- End OnclickOfEdit --");
};
/**
 * @function onRowClick
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - This method is used to navigate to Leave Request Details Form.
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.onSegClick = function (commonWidget, gestureInfo) {
    kony.print("--- Start onRowClick ---");
    var leave_id = (frmPendingLeaveRequest.segPendingLeaveRequest.selectedRowItems[0].lblLeaveId).split("$")[0];
    kony.apps.coe.ess.myLeave.leaveRequestDetails.showForm(leave_id);
    kony.print("--- End onRowClick ---");
};
/**
 * @function addAlternateSkinToSegment
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - This method is used for adding the skin for row alternate.
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.addAlternateSkinToSegment = function (data, flex, firstSkin, secondSkin) {
    kony.print("--- Start addAlternateSkinToSegment ---");
    try {
        if (typeof data != "undefined" && data !== null && data.length !== null && data.length > 0) {
            for (var index = 0; index < data.length; index++) {
                if (index % 2 === 0) {
                    data[index][flex] = {
                        "skin" : firstSkin,
                        "focusSkin" : firstSkin
                    };
                } else {
                    data[index][flex] = {
                        "skin" : secondSkin,
                        "focusSkin" : secondSkin
                    };
                }
            }
        }
        return data;
    } catch (e) {
        handleError(e);
    }
    kony.print("--- End addAlternateSkinToSegment ---");
};

/**
 * @function tapAnimation
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - code for tap animation
 */
kony.apps.coe.ess.myLeave.PendingLeaveRequestUI.prototype.tapAnimation = function (commonWidget, gestureInfo) {

    kony.print("-- Start tapAnimation --");
    var obj = new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI();
    if (gestureType[1]) {
        obj.onSegClick(commonWidget);
    }
    kony.print("-- End tapAnimation --");
};
