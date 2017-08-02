var dashWidAdded = false;

function dynRejOnClick(eo)
{
  var x=eo.id.replace("flxReject","");
  var y=eval("frmWinTabDashboard.lblRejectId"+x).text;
  kony.print("Reject rec EO ::: "+JSON.stringify(y));
  kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.rejectRequest(y);
}


function dynApproveOnClick(eo)
{
  var x=eo.id.replace("flxApprove","");
  var y=eval("frmWinTabDashboard.lblApproveId"+x).text;
  kony.print("Approve rec EO ::: "+JSON.stringify(y));	
  kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.approveRequest(y);
}

function dynSlipOnClick(eo){
  var x=eo.id.replace("flxSlip","");
  var y=eval("frmWinTabDashboard.lblSkipId"+x).text;
  kony.print("Skip rec EO ::: "+JSON.stringify(y));	
  kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.markAsLater(y);
}

function getProcessedData(rec) {
  kony.print("--- start getProcessedData---");
  kony.print("rec ::: " + JSON.stringify(rec));
  var temp = {};
  if (rec.request_type === "WORKORDER") {
    if (rec.MediaID !== undefined && rec.MediaID !== "" && rec.MediaID !== null) {
      temp.lblShortNameisVisible = false;
      temp.imgProfileisVisible = true;
      //kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(0, eval("frmWinTabDashboard.imgProfile" + i), "Employee", "mediaEmployee", mediaID, {});
    }
    if (rec.MediaID === undefined || rec.MediaID === "" || rec.MediaID === null) {
      temp.imgProfileisVisible = false;
      temp.lblShortNameisVisible = true;
    }
    temp.approvalID = rec.ID;
    temp.lblShortNametext = rec.CreatedUserShortName;
    temp.lblShortNameskin = "sknLbl777777Roman34px"; //sknLbl777777Roman34px sknLblWorkProfilePicBg
    temp.flxProfileskin = "sknWinWorkProfileBg039BE5";
    temp.flxSubFlexskin = "sknWinWorkProfileBg039BE5";
    temp.imgReqsrc = "workorderwincal.png";
    temp.lblReasonskin = "sknWinLblPendWorkReqCnt";
    temp.lblReasontext = rec.category.text;
    temp.lblDateRangeskin = "sknWinLblPendWorkReqCnt";
    temp.lblDueDateskin = "sknWinLblPendWorkReqCnt";
    temp.lblReqTypetext = "Work Order";
    temp.lblReqDatetext = rec.RequestDate;
    if (rec.RequestInfo.text !== undefined && rec.RequestInfo.text !== "" && rec.RequestInfo.text !== null) {
      temp.lblDateRangetext = rec.RequestInfo.text;
    }
    temp.lblNoOfDaysisVisble = false;
    if (rec.Delegated.isVisble === false) {
      temp.flxStatusisVisble = false;
    } else {
      temp.flxStatusisVisble = true;
    }
    if (rec.UserName.text !== undefined && rec.UserName.text !== "" && rec.UserName.text !== null) {
      temp.lblProfileNametext = rec.UserName.text;
    }
    if (rec.dueDate.text !== undefined && rec.dueDate.text !== "" && rec.dueDate.text !== null) {
      temp.lblDueDateValtext = rec.dueDate.text;
    }
    if(rec.FlxTimerUi.isVisible === true){
      temp.flxExpiryProfileisVisible = true;
      }
    else{
      temp.flxExpiryProfileisVisible = false;
    }
  }
  if (rec.request_type === "TIMESHEET") {
    if (rec.MediaID !== undefined && rec.MediaID !== "" && rec.MediaID !== null) {
      temp.lblShortNameisVisible = false;
      temp.imgProfileisVisible = true;
      //kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(0, eval("frmWinTabDashboard.imgProfile" + i), "Employee", "mediaEmployee", mediaID, {});
    }
    if (rec.MediaID === undefined || rec.MediaID === "" || rec.MediaID === null) {
      temp.imgProfileisVisible = false;
      temp.lblShortNameisVisible = true;
    }
    temp.approvalID = rec.ID;
    temp.lblShortNametext = rec.CreatedUserShortName;
    temp.lblShortNameskin = "sknLbl777777Roman34px"; //sknLbl777777Roman34px sknLblWorkProfilePicBg
    temp.flxProfileskin = "sknWinFlxTimeBg4A90E2";
    temp.flxSubFlexskin = "sknWinFlxTimeBg4A90E2";
    temp.imgReqsrc = "timewincal.png";
    temp.lblReasonskin = "sknWinLblTimePendCnt4a90e2";
    temp.lblReasontext = rec.category.text;
    temp.lblDateRangeskin = "sknWinLblTimePendCnt4a90e2";
    temp.lblDueDateskin = "sknWinLblTimePendCnt4a90e2";
    temp.lblReqTypetext = "Time";
    temp.lblReqDatetext = rec.RequestDate;
    if (rec.RequestInfo.text !== undefined && rec.RequestInfo.text !== "" && rec.RequestInfo.text !== null) {
      temp.lblDateRangetext = rec.RequestInfo.text;
    }
    if (rec.AdditionalData.text !== undefined && rec.AdditionalData.text !== "" && rec.AdditionalData.text !== null && rec.AdditionalData.isVisble === true) {
      temp.lblNoOfDaysskin = "sknLblA6A6A620px";
      temp.lblNoOfDaysisVisble = true;
      temp.lblNoOfDaystext = rec.AdditionalData.text;
    }
    if (rec.Delegated.isVisble === false) {
      temp.flxStatusisVisble = false;
    } else {
      temp.flxStatusisVisble = true;
    }
    if (rec.UserName.text !== undefined && rec.UserName.text !== "" && rec.UserName.text !== null) {
      temp.lblProfileNametext = rec.UserName.text;
    }
    if (rec.dueDate.text !== undefined && rec.dueDate.text !== "" && rec.dueDate.text !== null) {
      temp.lblDueDateValtext = rec.dueDate.text;
    }
    if(rec.FlxTimerUi.isVisible === true){
      temp.flxExpiryProfileisVisible = true;
      }
    else{
      temp.flxExpiryProfileisVisible = false;
    }
  }
  if (rec.request_type === "LEAVE") {
    if (rec.MediaID !== undefined && rec.MediaID !== "" && rec.MediaID !== null) {
      temp.lblShortNameisVisible = false;
      temp.imgProfileisVisible = true;
      //kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(0, eval("frmWinTabDashboard.imgProfile" + i), "Employee", "mediaEmployee", mediaID, {});
    }
    if (rec.MediaID === undefined || rec.MediaID === "" || rec.MediaID === null) {
      temp.imgProfileisVisible = false;
      temp.lblShortNameisVisible = true;
    }
    temp.approvalID = rec.ID;
    temp.lblShortNametext = rec.CreatedUserShortName;
    temp.lblShortNameskin = "sknLbl777777Roman34px"; //sknLbl777777Roman34px sknLblWorkProfilePicBg
    temp.flxProfileskin = "sknWinFlxLeaveProfile7986cb";
    temp.flxSubFlexskin = "sknWinFlxLeaveProfile7986cb";
    temp.imgReqsrc = "leavewincal.png";
    temp.lblReasonskin = "sknWinLblLeaveReason7986CB12pxRoman";
    temp.lblReasontext = rec.category.text;
    temp.lblDateRangeskin = "sknWinLblLeaveReason7986CB12pxRoman";
    temp.lblDueDateskin = "sknWinLblLeaveReason7986CB12pxRoman";
    temp.lblReqTypetext = "Leave Request";
    temp.lblReqDatetext = rec.RequestDate;
    if (rec.RequestInfo.text !== undefined && rec.RequestInfo.text !== "" && rec.RequestInfo.text !== null) {
      temp.lblDateRangetext = rec.RequestInfo.text;
    }
    if (rec.TypeID !== undefined && rec.TypeID !== "" && rec.TypeID !== null) {
      temp.lblNoOfDaysskin = "sknWinLblDays7986CB16px";
      temp.lblNoOfDaysisVisble = true;
      temp.lblNoOfDaystext = rec.TypeID;
    }
    if (rec.Delegated.isVisble === false) {
      temp.flxStatusisVisble = false;
    } else {
      temp.flxStatusisVisble = true;
    }
    if (rec.UserName.text !== undefined && rec.UserName.text !== "" && rec.UserName.text !== null) {
      temp.lblProfileNametext = rec.UserName.text;
    }
    if (rec.dueDate.text !== undefined && rec.dueDate.text !== "" && rec.dueDate.text !== null) {
      temp.lblDueDateValtext = rec.dueDate.text;
    }
    if(rec.FlxTimerUi.isVisible === true){
      temp.flxExpiryProfileisVisible = true;
      }
    else{
      temp.flxExpiryProfileisVisible = false;
    }
  }
  if (rec.request_type === "EXPENSES") {
    if (rec.MediaID !== undefined && rec.MediaID !== "" && rec.MediaID !== null) {
      temp.lblShortNameisVisible = false;
      temp.imgProfileisVisible = true;
      //kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(0, eval("frmWinTabDashboard.imgProfile" + i), "Employee", "mediaEmployee", mediaID, {});
    }
    if (rec.MediaID === undefined || rec.MediaID === "" || rec.MediaID === null) {
      temp.imgProfileisVisible = false;
      temp.lblShortNameisVisible = true;
    }
    temp.approvalID = rec.ID;
    temp.lblShortNametext = rec.CreatedUserShortName;
    temp.lblShortNameskin = "sknLbl777777Roman34px"; //sknLbl777777Roman34px sknLblWorkProfilePicBg
    temp.flxProfileskin = "sknWinFlxExpProfile1DB6C9";
    temp.flxSubFlexskin = "sknWinFlxExpProfile1DB6C9";
    temp.imgReqsrc = "expensewincal.png";
    temp.lblReasonskin = "sknWinLblExp1DB6C9";
    temp.lblReasontext = rec.category.text;
    temp.lblDateRangeskin = "sknWinLblExp1DB6C9";
    temp.lblDueDateskin = "sknWinLblExp1DB6C9";
    temp.lblReqTypetext = "Expense Request";
    temp.lblReqDatetext = rec.RequestDate;
    if (rec.RequestInfo.text !== undefined && rec.RequestInfo.text !== "" && rec.RequestInfo.text !== null) {
      temp.lblDateRangetext = rec.RequestInfo.text;
    }
    if (rec.TypeID !== undefined && rec.TypeID !== "" && rec.TypeID !== null) {
      temp.lblNoOfDaysskin = "sknWinLblDays7986CB16px";
      temp.lblNoOfDaysisVisble = true;
      temp.lblNoOfDaystext = rec.TypeID;
    }
    if (rec.Delegated.isVisble === false) {
      temp.flxStatusisVisble = false;
    } else {
      temp.flxStatusisVisble = true;
    }
    if (rec.UserName.text !== undefined && rec.UserName.text !== "" && rec.UserName.text !== null) {
      temp.lblProfileNametext = rec.UserName.text;
    }
    if (rec.dueDate.text !== undefined && rec.dueDate.text !== "" && rec.dueDate.text !== null) {
      temp.lblDueDateValtext = rec.dueDate.text;
    }
    if(rec.FlxTimerUi.isVisible === true){
      temp.flxExpiryProfileisVisible = true;
      }
    else{
      temp.flxExpiryProfileisVisible = false;
    }
  }
  if (rec.request_type === "PURCHASEORDER") {
    if (rec.MediaID !== undefined && rec.MediaID !== "" && rec.MediaID !== null) {
      temp.lblShortNameisVisible = false;
      temp.imgProfileisVisible = true;
      //kony.apps.coe.ess.MyApprovals.media.lazyLoadingImages(0, eval("frmWinTabDashboard.imgProfile" + i), "Employee", "mediaEmployee", mediaID, {});
    }
    if (rec.MediaID === undefined || rec.MediaID === "" || rec.MediaID === null) {
      temp.imgProfileisVisible = false;
      temp.lblShortNameisVisible = true;
    }
    temp.approvalID = rec.ID;
    temp.lblShortNametext = rec.CreatedUserShortName;
    temp.lblShortNameskin = "sknLbl777777Roman34px"; //sknLbl777777Roman34px sknLblWorkProfilePicBg
    temp.flxProfileskin = "sknWinFlxPurchaseBg1C7393";
    temp.flxSubFlexskin = "sknWinFlxPurchaseBg1C7393";
    temp.imgReqsrc = "purwincal.png";
    temp.lblReasonskin = "sknWinLblPurReqCnt";
    temp.lblReasontext = rec.category.text;
    temp.lblDateRangeskin = "sknWinLblPurReqCnt";
    temp.lblDueDateskin = "sknWinLblPurReqCnt";
    temp.lblReqTypetext = "Purchase Order";
    temp.lblReqDatetext = rec.RequestDate;
    temp.lblNoOfDaysisVisble = false;
    if (rec.RequestInfo.text !== undefined && rec.RequestInfo.text !== "" && rec.RequestInfo.text !== null) {
      temp.lblDateRangetext = rec.RequestInfo.text;
    }
    if (rec.TypeID !== undefined && rec.TypeID !== "" && rec.TypeID !== null) {
      temp.lblNoOfDaysskin = "sknWinLblDays7986CB16px";
      temp.lblNoOfDaysisVisble = true;
      temp.lblNoOfDaystext = rec.TypeID;
    }
    if (rec.Delegated.isVisble === false) {
      temp.flxStatusisVisble = false;
    } else {
      temp.flxStatusisVisble = true;
    }
    if (rec.UserName.text !== undefined && rec.UserName.text !== "" && rec.UserName.text !== null) {
      temp.lblProfileNametext = rec.UserName.text;
    }
    if (rec.dueDate.text !== undefined && rec.dueDate.text !== "" && rec.dueDate.text !== null) {
      temp.lblDueDateValtext = rec.dueDate.text;
    }
    if(rec.FlxTimerUi.isVisible === true){
      temp.flxExpiryProfileisVisible = true;
      }
    else{
      temp.flxExpiryProfileisVisible = false;
    }
  }
  kony.print("temp ::: " + JSON.stringify(temp));
  return temp;
}

function addDashDynCards(data) {
  kony.print("dataaa ::: " + JSON.stringify(data));
  var len = (data.length / 2) + 1;
  var i = 0;
  var cnt = 0;
  for (; i < len; i++) {
   var aid=data[i].ID;
    var flxHorizontal = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "clipBounds": true,
      "height": "40%",
      "id": "flxHorizontal" + i,
      "isVisible": false,
      "layoutType": kony.flex.FLOW_HORIZONTAL,
      "left": "0dp",
      "skin": "slFbox",
      "top": "3.30%",
      "width": "100%",
      "zIndex": 1
    }, {}, {});
    flxHorizontal.setDefaultUnit(kony.flex.DP);
    //frmWinTabDashboard.flxMiddle.add(flxHorizontal);
    var j = 0;
    for (; cnt < data.length && j < 2; j++) {
      var tempObj = {};
      if (j === 0) {
        tempObj = getProcessedData(data[2 * i]);
      } else {
        tempObj = getProcessedData(data[(2 * i) + 1]);
      }
      kony.print("tempObj ::: " + JSON.stringify(tempObj));
      var flxLeaveCard = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "100%",
        "id": "flxLeaveCard" + i + j,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "2.60%",
        "skin": "sknWinFlxCardfffffff",
        "top": "0%",
        "width": "46.10%",
        "zIndex": 2
      }, {}, {});
      flxLeaveCard.setDefaultUnit(kony.flex.DP);
      var flxProfile = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "31%",
        "id": "flxProfile" + i + j,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": tempObj.flxProfileskin === undefined ? "N/A" : tempObj.flxProfileskin,
        "top": "0%",
        "width": "100%",
        "zIndex": 1
      }, {}, {});
      flxProfile.setDefaultUnit(kony.flex.DP);
      var flxProfileImg = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "90%",
        "id": "flxProfileImg" + i + j,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "1%",
        "skin": "slFbox",
        "top": "13%",
        "width": "35%",
        "zIndex": 1
      }, {}, {});
      flxProfileImg.setDefaultUnit(kony.flex.DP);
      var imgProfile = new kony.ui.Image2({
        "height": "100%",
        "id": "imgProfile" + i + j,
        "isVisible": tempObj.imgProfileisVisible === undefined ? true : tempObj.imgProfileisVisible,
        "left": "0%",
        "skin": "slImage",
        "src": "personwin.png",
        "top": "-7%",
        "width": "100%",
        "zIndex": 1
      }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblShortName = new kony.ui.Label({
        "height": "100%",
        "id": "lblShortName" + i + j,
        "isVisible": tempObj.lblShortNameisVisible === undefined ? true : tempObj.lblShortNameisVisible,
        "left": "0%",
        "skin": tempObj.lblShortNameskin === undefined ? "sknWinLblProfileNameffffff12px" : tempObj.lblShortNameskin,
        "text": tempObj.lblShortNametext === undefined ? "N/A" : tempObj.lblShortNametext,
        "top": "0%",
        "width": "100%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      flxProfileImg.add(imgProfile, lblShortName);
      var lblProfileName = new kony.ui.Label({
        "id": "lblProfileName" + i + j,
        "isVisible": true,
        "left": "30%",
        "skin": "sknWinLblProfileNameffffff12px",
        "text": tempObj.lblProfileNametext === undefined ? "N/A" : tempObj.lblProfileNametext,
        "top": "26%",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblReqType = new kony.ui.Label({
        "id": "lblReqType" + i + j,
        "isVisible": true,
        "left": "30%",
        "skin": "sknWinLblReqTypeffffff12pxRoman",
        "text": tempObj.lblReqTypetext === undefined ? "N/A" : tempObj.lblReqTypetext, //"Leave Request",
        "top": "53%",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var flxSlip = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "30%",
        "id": "flxSlip" + i + j,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "83%",
        "skin": "slFbox",
        "top": "14%",
        //"onClick":dynCardSlip,
         "onClick": function() {
            kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.markAsLater(aid);
        },
        "width": "14%",
        "zIndex": 1
      }, {}, {});
      flxSlip.setDefaultUnit(kony.flex.DP);
      var lblSkip = new kony.ui.Label({
        "height": "100%",
        "id": "lblSkip" + i + j,
        "isVisible": true,
        "left": "0%",
        "skin": "sknWinLblProfileNameffffff12px",
        "text": "Skip",
        "top": "0%",
        "width": "100%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblSkipId = new kony.ui.Label({
        "height": "50%",
        "id": "lblSkipId" + i + j,
        "isVisible": true,
        "left": "0%",
        "skin": "slLabel",
        "text":tempObj.approvalID===undefined?"N/A":tempObj.approvalID,
        "top": "100%",
        "width": "50%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      flxSlip.add(lblSkip, lblSkipId);
      flxProfile.add(flxProfileImg, lblProfileName, lblReqType, flxSlip);
      var flxExpiryProfile = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "31%",
        "id": "flxExpiryProfile" + i + j,
        "isVisible": tempObj.flxExpiryProfileisVisible === undefined ? N/A : tempObj.flxExpiryProfileisVisible,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "sknWinFlxExpiryFF8376",
        "top": "0%",
        "width": "100%",
        "zIndex": 1
      }, {}, {});
      flxExpiryProfile.setDefaultUnit(kony.flex.DP);
      var flxExpImg = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "90%",
        "id": "flxExpImg" + i + j,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "1%",
        "skin": "slFbox",
        "top": "13%",
        "width": "35%",
        "zIndex": 1
      }, {}, {});
      flxExpImg.setDefaultUnit(kony.flex.DP);
      var imgExpProfile = new kony.ui.Image2({
        "height": "100%",
        "id": "imgExpProfile" + i + j,
        "isVisible": true,
        "left": "0%",
        "skin": "slImage",
        "src": "personwin.png",
        "top": "-7%",
        "width": "100%",
        "zIndex": 1
      }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var imgExpShortName = new kony.ui.Label({
        "height": "100%",
        "id": "imgExpShortName" + i + j,
        "isVisible": false,
        "left": "0%",
        "skin": "slLabel",
        "text": "RG",
        "top": "0%",
        "width": "100%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      flxExpImg.add(imgExpProfile, imgExpShortName);
      var lblExpProfileName = new kony.ui.Label({
        "id": "lblExpProfileName" + i + j,
        "isVisible": true,
        "left": "30%",
        "skin": "sknWinLblProfileNameffffff12px",
        "text": "PC",
        "top": "26%",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblExpReqType = new kony.ui.Label({
        "id": "lblExpReqType" + i + j,
        "isVisible": true,
        "left": "30%",
        "skin": "sknWinLblReqTypeffffff12pxRoman",
        "text": "Leave Request",
        "top": "53%",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblExpiry = new kony.ui.Label({
        "id": "lblExpiry" + i + j,
        "isVisible": true,
        "left": "60%",
        "skin": "sknWinLblProfileNameffffff12px",
        "text": "2 Hours",
        "top": "55%",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var imgAlertWin = new kony.ui.Image2({
        "height": "70%",
        "id": "imgAlertWin" + i + j,
        "isVisible": true,
        "left": "70%",
        "skin": "slImage",
        "src": "alertwhitewin.png",
        "top": "0%",
        "width": "8%",
        "zIndex": 1
      }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      flxExpiryProfile.add(flxExpImg, lblExpProfileName, lblExpReqType, lblExpiry, imgAlertWin);
      var flxRequestTypeInfo = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "35%",
        "id": "flxRequestTypeInfo" + i + j,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "sknWinReqTypeDB",
        "top": "29%",
        "width": "100%",
        "zIndex": 2
      }, {}, {});
      flxRequestTypeInfo.setDefaultUnit(kony.flex.DP);
      var lblReason = new kony.ui.Label({
        "id": "lblReason" + i + j,
        "isVisible": true,
        "left": "6%",
        "skin": tempObj.lblReasonskin === undefined ? "N/A" : tempObj.lblReasonskin, //"sknWinLblLeaveReason7986CB12pxRoman",
        "text": tempObj.lblReasontext === undefined ? "N/A" : tempObj.lblReasontext, //"Medical Leave",
        "top": "20%",
        "width": "30%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblDateRange = new kony.ui.Label({
        "height": "20%",
        "id": "lblDateRange" + i + j,
        "isVisible": true,
        "left": "6%",
        "skin": tempObj.lblDateRangeskin === undefined ? "N/A" : tempObj.lblDateRangeskin, //"sknWinLblLeaveReason7986CB12pxRoman",
        "text": tempObj.lblDateRangetext === undefined ? "N/A" : tempObj.lblDateRangetext,
        "top": "61%",
        "width": "30%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblNoOfDays = new kony.ui.Label({
        "height": "20%",
        "id": "lblNoOfDays" + i + j,
        //"isVisible": tempObj.lblNoOfDaysisVisble === undefined ? true : tempObj.lblNoOfDaysisVisble,
        "isVisible": false,
        "left": "37%",
        "skin": "sknWinLblDays7986CB16px",
        "text": tempObj.lblNoOfDaystext === undefined ? "N/A" : tempObj.lblNoOfDaystext,
        "top": "61%",
        "width": "20%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblReqDate = new kony.ui.Label({
        "height": "20%",
        "id": "lblReqDate" + i + j,
        "isVisible": true,
        "left": "64%",
        "skin": "sknWinLblReqDateB0B0B07pxRoman",
        "text": tempObj.lblReqDatetext === undefined ? "N/A" : tempObj.lblReqDatetext, //"16 Jan 6:30PM",
        "top": "20%",
        "width": "30%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_RIGHT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblDueDate = new kony.ui.Label({
        "height": "20%",
        "id": "lblDueDate" + i + j,
        "isVisible": true,
        "left": "74%",
        "skin": "sknWinLblLeaveReason7986CB12pxRoman",
        "text": "Due Date",
        "top": "41%",
        "width": "20%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_RIGHT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblDueDateVal = new kony.ui.Label({
        "height": "20%",
        "id": "lblDueDateVal" + i + j,
        "isVisible": true,
        "left": "69%",
        "skin": "sknWinLblReqDateB0B0B07pxRoman",
        "text": tempObj.lblDueDateValtext === undefined ? "N/A" : tempObj.lblDueDateValtext, //"30 Jan 2016",
        "top": "61%",
        "width": "25%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_RIGHT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      flxRequestTypeInfo.add(lblReason, lblDateRange, lblNoOfDays, lblReqDate, lblDueDate, lblDueDateVal);
      var flxApproveReject = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "35%",
        "id": "flxApproveReject" + i + j,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0%",
        "skin": "slFbox",
        "top": "65%",
        "width": "100%",
        "zIndex": 1
      }, {}, {});
      flxApproveReject.setDefaultUnit(kony.flex.DP);
      var flxSubFlex = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "50%",
        "id": "flxSubFlex" + i + j,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "skin": tempObj.flxSubFlexskin === undefined ? "N/A" : tempObj.flxSubFlexskin,
        "width": "100%",
        "zIndex": 1
      }, {}, {});
      flxSubFlex.setDefaultUnit(kony.flex.DP);
      flxSubFlex.add();
      var flxReqImg = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "70%",
        "id": "flxReqImg" + i + j,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "3%",
        "skin": "slFbox",
        "top": "15%",
        "width": "33%",
        "zIndex": 1
      }, {}, {});
      flxReqImg.setDefaultUnit(kony.flex.DP);
      var imgReq = new kony.ui.Image2({
        "height": "100%",
        "id": "imgReq" + i + j,
        "isVisible": true,
        "left": "0%",
        "skin": "slImage",
        "src": tempObj.imgReqsrc === undefined ? "deselecttick.png" : tempObj.imgReqsrc, // "leavewincal.png",
        "top": "0%",
        "width": "100%",
        "zIndex": 1
      }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      flxReqImg.add(imgReq);
      var flxReject = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "40%",
        "id": "flxReject" + i + j,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "38%",
        "skin": "slFbox",
        //"onClick":dynCardReject,
        "onClick": function() {
            kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.rejectRequest(aid);
        },
        "top": "53%",
        "width": "30%",
        "zIndex": 1
      }, {}, {});
      flxReject.setDefaultUnit(kony.flex.DP);
      var lblReject = new kony.ui.Label({
        "id": "lblReject" + i + j,
        "isVisible": true,
        "left": "45%",
        "skin": "sknWinLblRejectRomanFF6E5F12px",
        "text": "REJECT",
        "top": "19%",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblRejectId = new kony.ui.Label({
        "id": "lblRejectId" + i + j,
        "isVisible": true,
        "left": "25%",
        "skin": "sknWinLblApprove3EBEA312pxRoman",
        "text": tempObj.approvalID===undefined?"N/A":tempObj.approvalID,
        "top": "100%",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      flxReject.add(lblReject,lblRejectId);
      var flxApprove = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "40%",
        "id": "flxApprove" + i + j,
        "isVisible": true,
        //"onClick":dynCardApprove,
        "onClick": function() {
            kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.approveRequest(aid);
        },
        "layoutType": kony.flex.FREE_FORM,
        "left": "68%",
        "skin": "slFbox",
        "top": "55%",
        "width": "30%",
        "zIndex": 1
      }, {}, {});
      flxApprove.setDefaultUnit(kony.flex.DP);
      var lblApprove = new kony.ui.Label({
        "id": "lblApprove" + i + j,
        "isVisible": true,
        "left": "25%",
        "skin": "sknWinLblApprove3EBEA312pxRoman",
        "text": "APPROVE",
        "top": "19%",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblApproveId = new kony.ui.Label({
        "id": "lblApproveId" + i + j,
        "isVisible": true,
        "left": "25%",
        "skin": "sknWinLblApprove3EBEA312pxRoman",
        "text": tempObj.approvalID===undefined?"N/A":tempObj.approvalID,
        "top": "100%",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      flxApprove.add(lblApprove,lblApproveId);
      flxApproveReject.add(flxSubFlex, flxReqImg, flxReject, flxApprove);
      flxLeaveCard.add(flxProfile, flxExpiryProfile, flxRequestTypeInfo, flxApproveReject);
      flxHorizontal.isVisible = true;
      cnt++;

      //if (i === 7 && j === 1)
        //flxLeaveCard.isVisible = false;

      flxHorizontal.add(flxLeaveCard);
    }
    frmWinTabDashboard.flxMiddle.add(flxHorizontal);
  }
  dashWidAdded = true;
}