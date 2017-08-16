/** 
 *  @author    Rishika Karri
 *  @category   Business Logic.	
 *  @desc       Contains UI related code for frmPendingLeaveRequests
 *  @ © 2016    Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
kony.apps.coe.ess.myLeave.frmPendingLeaveRequests = kony.apps.coe.ess.myLeave.frmPendingLeaveRequests || {};
/**
 * @memberof       frmPendingLeaveRequests
 * @param          None.
 * @return         None.
 * @description    This method is used to initialize UI for frmPendingLeaveRequests on desktopWeb.
 */
kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.initializeUI = function(data, fullData, flag, statusType) {
 var empLeaveData = [];
 if (data.length > 0 || data !== undefined || data !== "" || data !== null) {
  if (flag === true) {
   frmPendingLeaveRequestsDW.lblLeaveCalendarBreadCrumb.text = "Leave Calendar";
   frmPendingLeaveRequestsDW.lblPendingLeaveRequestsBreadcrumb.text = "All Pending Leave Requests "
   if (frmPendingLeaveRequestsDW.flxFilter.isVisible == true) {
    frmPendingLeaveRequestsDW.flxFilter.setVisibility(false);
   }
   frmPendingLeaveRequestsDW.segPendingLeaves.top = "0dp";
   frmPendingLeaveRequestsDW.segPendingLeaves.height = "700dp";
   frmPendingLeaveRequestsDW.forceLayout();
   var leaveDataToFilter = [];
   leaveDataToFilter = data.MYLEAVE.leave;
   for (var index = 0; index <
    leaveDataToFilter.length; index++) {
    if (leaveDataToFilter[index].employee_id === kony.apps.coe.ess.globalVariables.employeeId && leaveDataToFilter[index].status_id === "2") {
     empLeaveData.push(leaveDataToFilter[index]);
    }
    if (index == leaveDataToFilter.length - 1) {
     kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.populate(empLeaveData, fullData, statusType);
    }
   }
  } else {
   kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.populate(data, fullData, statusType);
   //  frmPendingLeaveRequestsDW.segPendingLeaves.onRowClick();
  }
 } else {
  frmPendingLeaveRequestsDW.destroy();
  frmLeaveDashboardDW.show();
  kony.print("No Pending Leave Requests");
 }
};
kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.populate = function(empLeaveData, data, statusType) {
 kony.print("-----pending leaves data empLeave data: " + JSON.stringify(empLeaveData));
 var RequestTypesTable = [];
 frmPendingLeaveRequestsDW.segPendingLeaves.widgetDataMap = {
  "imgRightArrow": "imgRightArrow",
  "flxDurationContainer": "flxDurationContainer",
  "flxSegLeaveList": "flxSegLeaveList",
  "flxViewDetails": "flxViewDetails",
  "lblAppliedOn": "lblAppliedOn",
  "lblDateRange": "lblDateRange",
  "lblDummyDivider": "lblDummyDivider",
  "lblLeaveDuration": "lblLeaveDuration",
  "lblLeaveType": "lblLeaveType",
  "lblStatusButton": "lblStatusButton"
 };
 for (var i = 0; i <
  empLeaveData.length; i++) {
  var sampleJson = {};
  var leaveTypes = " ";
  for (var j = 0; j <
   data.MYLEAVE.leave_type.length; j++) {
   if (empLeaveData[i].leave_type_id === data.MYLEAVE.leave_type[j].id) {
    leaveTypes = data.MYLEAVE.leave_type[j].name;
    break;
   }
  }
  switch (empLeaveData[i].status_id) {
   case "0":
    {
     sampleJson.lblStatusButton = {
      "skin": "sknLbl6a777b14pxRomanDW",
      "text": "Approved"
     };
     sampleJson.flxViewDetails = {
      "skin": "sknFlxBorder1px05C8AF14Rad50pxDW"
     };
     sampleJson.imgRightArrow = "chevrongreen.png";
     break;
    }
   case "1":
    {
     sampleJson.lblStatusButton = {
      "skin": "sknLblff6e5f14pxRomanDW",
      "text": "Rejected"
     };
     sampleJson.flxViewDetails = {
      "skin": "sknFlxBorder1pxff6e5f14Rad50pxDW"
     };
     sampleJson.imgRightArrow = "chevronred.png";
     break;
    }
   case "2":
    {
     sampleJson.lblStatusButton = {
      "skin": "sknLblfcc35614pxRomanDW",
      "text": "Pending"
     };
     sampleJson.flxViewDetails = {
      "skin": "sknFlxBorder1pxfcb234Rad50pxDW"
     };
     sampleJson.imgRightArrow = "chevronyellow.png";
     break;
    }
   case "4":
    {
     sampleJson.lblStatusButton = {
      "skin": "sknLbl1C739314pxRomanDW",
      "text": "Sent Back"
     };
     sampleJson.flxViewDetails = {
      "skin": "sknFlxBorder1px1C739314Rad50pxDW"
     };
     sampleJson.imgRightArrow = "chevronblueright.png";
     break;
    }
  }
  var timeStamp = "  ";
  var hoursTime = " ";
  var sdate = empLeaveData[i].start_date;
  var ldate = empLeaveData[i].end_date;
  var pendingDate = parseInt(sdate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(sdate.substring(4, 6) * 1) - 1).toString()] +
   " - " + parseInt(ldate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(ldate.substring(4, 6) * 1) - 1).toString()];
  var adate = empLeaveData[i].lastmodifiedts;
  if (adate === "") {
   timeStamp = "";
  } else {
   adate = empLeaveData[i].lastmodifiedts;
   var mins = parseInt(adate.substring(10, 12) * 1);
   if (mins <
    10)
    mins = "0" + parseInt(adate.substring(10, 12) * 1);
   var hrs = parseInt(adate.substring(8, 10) * 1);
   var AP = "AM";
   if (hrs >= 12) {
    hrs = hrs - 12;
    AP = "PM";
   }
   timeStamp = parseInt(adate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(adate.substring(4, 6) * 1) - 1).toString()] +
    " " + parseInt(adate.substring(0, 4) * 1) + ", " + hrs + ":" + mins + " " + AP;
  }
  if (empLeaveData[i].no_of_hours <
   8) {
   if (empLeaveData[i].no_of_hours == 7.5) {
    hoursTime = "1 DAY";
   } else
    hoursTime = empLeaveData[i].no_of_hours + " " + "HOURS";
  } else
   hoursTime = ((parseInt(empLeaveData[i].no_of_hours) * 1) / 7.5).toFixed() + " DAYS";
  sampleJson.lblLeaveType = leaveTypes;
  sampleJson.lblLeaveDuration = hoursTime;
  sampleJson.lblDummyDivider = " ";
  sampleJson.flxDurationContainer = " ";
  sampleJson.lblDateRange = pendingDate;
  sampleJson.lblAppliedOn = timeStamp;
  sampleJson.template = flxSegLeaveList;
  sampleJson.id = empLeaveData[i].id;
  sampleJson.leave_type_id = empLeaveData[i].leave_type_id;
  sampleJson.start_date = empLeaveData[i].start_date;
  sampleJson.end_date = empLeaveData[i].end_date;
  RequestTypesTable.push(sampleJson);
 }
 frmPendingLeaveRequestsDW.segPendingLeaves.setData(RequestTypesTable);
 /**
 *
 /**
 * @function onRowClick
 * @member of PendingLeaveRequestUI#
 * @return - {void}
 * @description - This method is used to navigate to Leave Request Details Form.
 */
 kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.OnClick = function(widgetRef, sectionIndex, rowIndex) {
  kony.print("--- Start onRowClick ---");

  // frmPendingLeaveRequestsDW.segPendingLeaves.data[rowIndex].skin= "sknSegFocusFFFFFFOp100DW";
  var data1 = frmPendingLeaveRequestsDW.segPendingLeaves.data[rowIndex];
  switch (data1.lblStatusButton.text) {
   case "Approved":
    {
     frmPendingLeaveRequestsDW.flxRequestHeader.skin = "sknFlxBGFAB745OpApp100DW";
     frmPendingLeaveRequestsDW.lblCurrentStatus.skin = "sknLbl6a777b14pxRomanDW";
     frmPendingLeaveRequestsDW.lblCurrentStatus.text = "Approved";
     break;
    }
   case "Rejected":
    {
     frmPendingLeaveRequestsDW.flxRequestHeader.skin = "sknFlxBGFAB745OpRej100DW";
     frmPendingLeaveRequestsDW.lblCurrentStatus.skin = "sknLblff6e5f14pxRomanDW";
     frmPendingLeaveRequestsDW.lblCurrentStatus.text = "Rejected";
     break;
    }
   case "Sent Back":
    {
     frmPendingLeaveRequestsDW.flxRequestHeader.skin = "sknFlxBGFAB745OpSB100DW";
     frmPendingLeaveRequestsDW.lblCurrentStatus.skin = "sknLbl1C739314pxRomanDW";
     frmPendingLeaveRequestsDW.lblCurrentStatus.text = "Sent Back";
     break;
    }
   case "Pending":
    {
     frmPendingLeaveRequestsDW.flxRequestHeader.skin = "sknFlxBGFAB745Op100DW";
     frmPendingLeaveRequestsDW.lblCurrentStatus.skin = "sknLblfcc35614pxRomanDW";
     frmPendingLeaveRequestsDW.lblCurrentStatus.text = "Pending";
     break;
    }
  }
  frmPendingLeaveRequestsDW.lblLeaveType.text = data1.lblLeaveType;
  frmPendingLeaveRequestsDW.lblLeaveDateTime.text = data1.lblDateRange;
  var leaveLength = " ";
  if (parseInt(data1.lblLeaveDuration.substring(0, 1)) <
   8) {
   leaveLength = "Partial Day";
  } else {
   leaveLength = "Full Day";
  }

  frmPendingLeaveRequestsDW.lblLeaveLength.text = leaveLength;
  frmPendingLeaveRequestsDW.lblLeaveDuration.text = data1.lblLeaveDuration;
  frmPendingLeaveRequestsDW.lblAppliedDate.text = data1.lblAppliedOn;
  if (data1.lblLeaveType === "PL - Sick Leave" || data1.lblLeaveType === "Sick Leave") {
   if (typeof data1.leave_attachments === 'undefined') {
    frmPendingLeaveRequestsDW.flxComments.top = "230dp";
    frmPendingLeaveRequestsDW.flxDocumentStatus.setVisibility(true);
    frmPendingLeaveRequestsDW.flxAttachment.setVisibility(false);
   } else {
    frmPendingLeaveRequestsDW.flxComments.top = "230dp";
    frmPendingLeaveRequestsDW.flxDocumentStatus.setVisibility(false);
    frmPendingLeaveRequestsDW.flxAttachment.setVisibility(true);
    kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.setAttachments(data1);
   }
  } else {
   frmPendingLeaveRequestsDW.flxComments.top = "100dp";
   frmPendingLeaveRequestsDW.flxDocumentStatus.setVisibility(false);
   frmPendingLeaveRequestsDW.flxAttachment.setVisibility(false);
  }
  for (var k = 0; k <
   empLeaveData.length; k++) {
   if (empLeaveData[k].id === data1.id) {
    kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.setCommentsInDetailsFlex(empLeaveData[k], data);
   }
  }

  frmPendingLeaveRequestsDW.forceLayout();
  frmPendingLeaveRequestsDW.flxWithdrawOption.onClick = function() {
   frmPendingLeaveRequestsDW.flxBGBlur.setVisibility(true);
   frmPendingLeaveRequestsDW.lblWithdrawLeavePopupQuestion.text = "Do you really want to Withdraw the leave request on " + data1.lblDateRange + "?";
   frmPendingLeaveRequestsDW.flxWithdrawPopup.setVisibility(true);
   frmPendingLeaveRequestsDW.forceLayout();
   frmPendingLeaveRequestsDW.flxConfirmWithdraw.onClick = function() {

    kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.withdrawLeave(data1);
   }

   frmPendingLeaveRequestsDW.flxCancelWithdraw.onClick = function() {

    frmPendingLeaveRequestsDW.flxWithdrawPopup.setVisibility(false);
    frmPendingLeaveRequestsDW.flxBGBlur.setVisibility(false);

   }
  }
  frmPendingLeaveRequestsDW.flxEditOption.onClick = function() {
   kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.navigateToApplyLeave(data1);
  }


  kony.print("--- End onRowClick ---");
 };
 kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.OnClick(frmPendingLeaveRequestsDW.segPendingLeaves, 0, 0);
};


/**
 * @memberof       frmPendingLeaveRequestsDW
 * @param          None.
 * @return         None.
 * @description    navigates to apply leave form
 */
kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.navigateToApplyLeave = function(leaveData) {

  if (leaveData) {
   kony.apps.coe.ess.myLeave.frmApplyLeaveDW.navigationMode(leaveData);
  } else {
   kony.apps.coe.ess.myLeave.frmApplyLeaveDW.navigationMode();
  }
 }
 /**
  * @memberof       frmPendingLeaveRequestsDW
  * @param          None.
  * @return         None.
  * @description    withdraw leave request
  */
kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.withdrawLeave = function(leaveData) {

  var tempJSON = {
   "id": leaveData.id,
   "status_id": "3",
   "employee_id": kony.apps.coe.ess.globalVariables.employeeId
  };
  kony.apps.coe.ess.MVVM.partialUpdate("MYLEAVE", "leave", tempJSON, function(leaveData, res) {
   frmPendingLeaveRequestsDW.flxWithdrawPopup.setVisibility(false);
   frmPendingLeaveRequestsDW.flxBGBlur.setVisibility(false);
   var leaveDate = leaveData.lblDateRange;
   frmPendingLeaveRequestsDW.lblSuccessAction.text = "Leave request on " + leaveDate + " is successfully withdrawn";
   frmPendingLeaveRequestsDW.flxSuccessAction.setVisibility(true);

   function timerFunc() {
    frmPendingLeaveRequestsDW.flxSuccessAction.setVisibility(false);
   }
   kony.timer.schedule("NotificationHide", timerFunc, 4, false);
   frmPendingLeaveRequestsDW.forceLayout();
  }.bind(this, leaveData), function(err) {
   kony.print(err);
  });
 }
 /**
  * @memberof       frmPendingLeaveRequestsDW
  * @param          None.
  * @return         None.
  * @description    sets attachments in Leave Request Details Flex
  */
kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.setAttachments = function(leaveData) {
 if (leaveData.leave_attachments.length === 0) {
  return;
 }
 var mediaObject = new kony.apps.coe.ess.myLeave.media();
 var successFetchEmployeeImage = function(res) {
  frmPendingLeaveRequestsDW.imgAttachmentScreenshot.base64 = res;
 }
 var failureFetchingEmployeeImage = function() {
  kony.print("Failed fetching employee image");
 }

 for (var i = 0; i < leaveData.leave_attachments.length; i++) {
  mediaObject.fetchEmployeeImageDW(media_id, successFetchAttachment, failureFetchingAttachment)
 }
}

kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.setCommentsInDetailsFlex = function(leaveData, data) {
 var segData = [];
 var EmpName = "";
 if (leaveData.reason_desc !== "" && typeof leaveData.leave_note === 'undefined') {
  /*  for (var k = 0; k <
        data.Employee.Employee.length; k++) {
        if (data.Employee.Employee[k].Id === kony.apps.coe.ess.globalVariables.employeeId) {
            EmpName = data.Employee.Employee[k].First_Name;
        }
    }*/
  segData.push({
   "lblComment": leaveData.reason_desc,
   "lblCommentTimestamp": "Created on " + leaveData.createdts.slice(6, 8) + " " + Date.getMonthMapNumberToMonth[leaveData.createdts.slice(4, 6)] + " " + leaveData.createdts.slice(0, 4) + " " + leaveData.createdts.slice(8, 10) + ":" + leaveData.createdts.slice(10, 12),
   "imgEmpPic": "adduserpic.png",
   "lblUserName": "Rose",
   template: flxSegCommentsSelf
  });
 };
 if (leaveData.leave_note) {
  for (var i = 0; i <
   leaveData.leave_note.length; i++) {
   if (leaveData.leave_note[i].employee_id === kony.apps.coe.ess.globalVariables.employeeId) {
    /*    for (var k = 0; k <
            data.Employee.Employee.length; k++) {
            if (data.Employee.Employee[k].Id === leaveData.leave_note[i].employee_id) {
                EmpName = data.Employee.Employee[k].First_Name;
            }
        }*/
    segData.push({
     "lblComment": leaveData.leave_note[i].comments,
     "lblCommentTimestamp": "Created on " + leaveData.leave_note[i].lastmodifiedts.slice(6, 8) + " " + Date.getMonthMapNumberToMonth[leaveData.lastmodifiedts.slice(4, 6)] + " " + leaveData.lastmodifiedts.slice(0, 4) + " " + leaveData.lastmodifiedts.slice(8, 10) + ":" + leaveData.lastmodifiedts.slice(10, 12),
     "imgEmpPic": "adduserpic.png",
     "lblUserName": frmHamburgerDW.lblProfileName.text.split(" ")[0],
     template: flxSegCommentsSelf
    });
   } else {
    for (var k = 0; k <
     data.Employee.Employee.length; k++) {
     if (data.Employee.Employee[k].Id === leaveData.leave_note[i].employee_id) {
      EmpName = data.Employee.Employee[k].First_Name;
     }
    }
    segData.push({
     "lblComment": leaveData.leave_note[i].comments,
     "lblCommentTimestamp": "Created on " + leaveData.leave_note[i].lastmodifiedts.slice(6, 8) + " " + Date.getMonthMapNumberToMonth[leaveData.lastmodifiedts.slice(4, 6)] + " " + leaveData.lastmodifiedts.slice(0, 4) + " " + leaveData.lastmodifiedts.slice(8, 10) + ":" + leaveData.lastmodifiedts.slice(10, 12),
     "imgEmpPic": "adduserpic.png",
     "lblUserName": EmpName,
     template: flxSegComments
    });
   }
  }
 }
 if (segData.length === 0) {
  frmPendingLeaveRequestsDW.flxComments.setVisibility(false);
 } else {
  frmPendingLeaveRequestsDW.flxComments.setVisibility(true);

  kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.setUserImagesInComments(segData, leaveData, data);
 }

}

/**
 * @memberof       frmPendingLeaveRequestsDW
 * @param          None.
 * @return         None.
 * @description    sets user images for comments in Leave Request Details Flex
 */
kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.setUserImagesInComments = function(segData, leaveData, data) {
 if (leaveData.reason_desc !== "" && typeof leaveData.leave_note === 'undefined') {
  var imgBase64;
  var commentEmployeeId = kony.apps.coe.ess.globalVariables.employeeId;
  if (commentEmployeeId === kony.apps.coe.ess.globalVariables.employeeId) {
   imgBase64 = frmHamburgerDW.imgProfileImage.base64;
  }
  segData[0].imgEmpPic.base64 = imgBase64;
  frmPendingLeaveRequestsDW.segLeaveComments.setData(segData);
  return;
 }
 for (var i = 0; i < leaveData.leave_note.length; i++) {
  var imgBase64;
  var commentEmployeeId = leaveData.leave_note[i].employee_id;
  if (commentEmployeeId === kony.apps.coe.ess.globalVariables.employeeId)
   imgBase64 = frmHamburgerDW.imgProfileImage.base64;
  else {
   for (var j = 0; j < data.Employee.Employee.length; j++) {
    if (commentEmployeeId === data.Employee.Employee[j].employee_id) {
     var mediaIdToFetch = data.Employee.Employee[j].Media_Id;
     break;
    }
   }
   var successFetchEmployeeImage = function(res) {
    imgBase64 = res;
   }
   var failureFetchingEmployeeImage = function(err) {
    kony.print(err);
   }
   if (mediaIdToFetch != null && typeof mediaIdToFetch != 'undefined') {
    var mediaObject = new kony.apps.coe.ess.myLeave.media();
    mediaObject.fetchEmployeeImageDW(mediaIdToFetch, successFetchEmployeeImage, failureFetchingEmployeeImage);
   }
  }
  if (segData[i].template === flxSegCommentsSelf) {
   if (imgBase64 === null || typeof imgBase64 === "undefined") {
    segData[i].imgEmpPic = "adduserpic.png"
   } else {
    segData[i].imgEmpPic = {
     "base64": imgBase64
    };
   }
  } else {
   if (imgBase64 === null || typeof imgBase64 === "undefined") {
    segData[i].imgapprover = "adduserpic.png"
   } else {
    segData[i].imgapprover = {
     "base64": imgBase64
    };
   }
  }

 }
 frmPendingLeaveRequestsDW.segLeaveComments.setData(segData);
}


 
 /**
  * @memberof       frmPendingLeaveRequestsDW
  * @param          None.
  * @return         None.
  * @description    closes Leave Request Details Flex
  */
kony.apps.coe.ess.myLeave.frmPendingLeaveRequests.closeRequestDetails = function() {
 frmPendingLeaveRequestsDW.flxBGBlur.setVisibility(false);
 frmPendingLeaveRequestsDW.flxLeaveRequestDetails.setVisibility(false);
 frmPendingLeaveRequestsDW.flxPendingLeaveRequests.setVisibility(false);
}