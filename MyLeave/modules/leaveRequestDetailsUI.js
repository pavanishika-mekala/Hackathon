/**
 * @module Leave Request Details
 * @Author Pravallika Myneni
 * @category UI data Binding/Bussiness Logic
 * @desc leaveRequestDeatilsUI class
 * @ © 2016 Kony Inc. */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};

//%Region - Constructor
/**
 * @param none.
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI = function() {
    kony.print("-- Start LeaveRequestDetailsUI --");
    var  previousFormName;
    kony.print("-- End LeaveReuestDetailsUI --");
};

// %Region - Methods in leaveReaquestDetailsUI
/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function called after fetching the data to bind it to flxLeaveSelected,flxApprovalStatus
 */

kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.setLeaveDetails = function(data) {
    var statusArray = ["ACCEPTED", "REJECTED", "PENDING", "CANCEL", "SENTBACK", "SAVED", "ERROR", "Submitted"];
    data[0].Status_Name = statusArray[parseInt(data[0].status_id)];
    var obj = new kony.apps.coe.ess.myLeave.leaveRequestDetailsUI();
    frmLeaveRequestDetails.lblLeaveType.text = data[0].name;
    var leave_id = data[0].id;

    var startdate = data[0].start_date;
    var enddate = data[0].end_date;
    var dates = parseInt(startdate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(startdate.substring(4, 6) * 1) - 1).toString()] +
        " - " + parseInt(enddate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(enddate.substring(4, 6) * 1) - 1).toString()];
    frmLeaveRequestDetails.lblFromTo.text = dates;
    var leaveData = {
        "startDate": startdate,
        "endDate": enddate
    };
    frmLeaveRequestDetails.btnConfirm.onClick = this.onClickConfirm.bind(this, leaveData);
    var atime = "",
        ltime = "";
    var lastdate = "",
        applydate = " ";
    var adate = data[0].createdts;
    var ldate = data[0].lastmodifiedts;

    //getting applied time and date
    if (adate !== null || adate !== "") {
        applydate = parseInt(adate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(adate.substring(4, 6) * 1) - 1).toString()] + " " + parseInt(adate.substring(0, 4) * 1);
        atime = obj.setTime(adate);
    } else {
        applydate = " ";
        atime = " ";
    }

    //getting lastmodified date and time
    if (ldate !== null || ldate !== "") {
        lastdate = parseInt(ldate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(ldate.substring(4, 6) * 1) - 1).toString()] + " " + parseInt(ldate.substring(0, 4) * 1);
        ltime = obj.setTime(ldate);

    } else {
        lastdate = " ";
        ltime = " ";
    }

    var appliedlbl = applydate + "," + atime;
    var lastlbl = lastdate + "," + ltime;
    frmLeaveRequestDetails.lblApplied.text = kony.i18n.getLocalizedString("i18n.ess.common.applied.valueKA");
    frmLeaveRequestDetails.lblAppliedDate.text = appliedlbl;
    frmLeaveRequestDetails.lblSelectedLeaveStatusOtherDate.text = lastlbl;

    //check for full day or partial day
    if (data[0].no_of_hours <= kony.apps.coe.ess.appconfig.workingHours && data[0].no_of_hours !== "") {
        if (data[0].no_of_hours === kony.apps.coe.ess.appconfig.workingHours) {
          	frmLeaveRequestDetails.flxStartDate.isVisible=false;
            frmLeaveRequestDetails.lblLeaveTime.text = "1 "+kony.i18n.getLocalizedString("i18.ess.frmTeamView.day");
            frmLeaveRequestDetails.lblFullDay.text = kony.i18n.getLocalizedString("i18n.ess.common.fullDay.valueKA");
        } else {
          	frmLeaveRequestDetails.flxStartDate.isVisible=true;
            frmLeaveRequestDetails.lblLeaveTime.text = (parseFloat((data[0].no_of_hours),10).toFixed(2) + kony.i18n.getLocalizedString("i18n.ess.myLeave.frmLeaveHome.Hours")).replace(".", ",");
            frmLeaveRequestDetails.lblFullDay.text = kony.i18n.getLocalizedString("i18n.ess.common.partial.valueKA");
          	frmLeaveRequestDetails.lblFromToTime.text=data[0].start_time.substring(0, 2)+":"+data[0].start_time.substring(2, 4)+" - "+data[0].end_time.substring(0, 2)+":"+data[0].end_time.substring(2, 4);
        }
    } else {
        if (data[0].no_of_hours !== undefined && data[0].no_of_hours !== "") {
          	frmLeaveRequestDetails.flxStartDate.isVisible=false;
            frmLeaveRequestDetails.lblLeaveTime.text = ((parseInt(data[0].no_of_hours) * 1) / kony.apps.coe.ess.appconfig.workingHours).toFixed() + " "+kony.i18n.getLocalizedString("i18.ess.frmTeamView.days");
            frmLeaveRequestDetails.lblFullDay.text = kony.i18n.getLocalizedString("i18n.ess.common.fullDay.valueKA");
        } else {
            frmLeaveRequestDetails.lblLeaveTime.isVisible = false;
          	frmLeaveRequestDetails.flxStartDate.isVisible=true;
            frmLeaveRequestDetails.lblFullDay.text = kony.i18n.getLocalizedString("i18n.ess.common.partial.valueKA");
          	frmLeaveRequestDetails.lblFromToTime.text=data[0].start_time.substring(0, 2)+":"+data[0].start_time.substring(2, 4)+" - "+data[0].end_time.substring(0, 2)+":"+data[0].end_time.substring(2, 4);
        }
    }

    if (data[0].Status_Name.toLowerCase() === "rejected") {
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.text = kony.i18n.getLocalizedString("i18n.ess.common.rejected.valueKA");
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.skin = "sknlblff3b2fop100s28Heavy";
        frmLeaveRequestDetails.imgStatus.src = "rejectedcrosswithfill.png";
        obj.isVisibleCenterImg(data[0].Status_Name.toLowerCase());
        obj.offVisibility();
    } else if (data[0].Status_Name.toLowerCase() === "cancel") {
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.text = kony.i18n.getLocalizedString("i18n.ess.common.cancelled.valueKA");
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.skin = "sknlblff3b2fop100s28Heavy";
        frmLeaveRequestDetails.imgStatus.src = "rejectedcrosswithfill.png";
        obj.isVisibleCenterImg(data[0].Status_Name.toLowerCase());
        obj.offVisibility();
    } else if (data[0].Status_Name.toLowerCase() === "accepted") {
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.text = kony.i18n.getLocalizedString("i18n.ess.common.approved.valueKA");
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.skin = "sknLbl00C6ADOp100S28px";
        frmLeaveRequestDetails.imgStatus.src = "approvedtickmarkwithfill.png";
        obj.isVisibleCenterImg(data[0].Status_Name.toLowerCase());
        obj.offVisibility();
    } else if (data[0].Status_Name.toLowerCase() === "submitted") {
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.text = kony.i18n.getLocalizedString("i18n.ess.common.submitted.valueKA");
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.skin = "sknLblMob2EbAEF28Px";
        frmLeaveRequestDetails.imgStatus.src = "submittedtickmarkwithfill.png";
    } else if (data[0].Status_Name.toLowerCase() === "pending") {
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.text = kony.i18n.getLocalizedString("i18n.ess.common.pending.valueKA");
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.skin = "sknlblFCAF2BOp100Sz28px";
        frmLeaveRequestDetails.imgStatus.src = "cautionsymbolwithfill.png";
        frmLeaveRequestDetails.lblSelectedLeaveStatusOtherDate.text = "";
    } else if (data[0].Status_Name.toLowerCase() === "error") {
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.text = kony.i18n.getLocalizedString("i18n.ess.common.error.valueKA");
        frmLeaveRequestDetails.lblSelectedLeaveStatusOther.skin = "sknlblff3b2fop100s28Heavy";
        frmLeaveRequestDetails.imgStatus.src = "alert.png";
        frmLeaveRequestDetails.lblSelectedLeaveStatusOtherDate.text = "";
    }
    frmLeaveRequestDetails.flxAttachmentImg.isVisible = "false";
    frmLeaveRequestDetails.flxAttachment.isVisible = "false";
    frmLeaveRequestDetails.segComments.height = "77.82%";

    obj.commentQuery();
};

/**
 * @member of  leaveRequestDetailsUI
 * @param   datetime
 * @return formatted time.
 * @throws none.
 * @Desc - function for formatting 24 hr time to 12hr time
 */

kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.setTime = function(srcDateTime) {
    var time = "";

    if (parseInt(srcDateTime.substring(8, 10) * 1) > "12") {

        if ((parseInt(srcDateTime.substring(8, 10) * 1) % 12) === 0) {
            //time = (getTimeHourswithZero((parseInt(srcDateTime.substring(8, 10)) * 1) % 12)) + ":" + getTimeHourswithZero(parseInt(srcDateTime.substring(10, 12) * 1)) + " AM";
          time = (getTimeHourswithZero((parseInt(srcDateTime.substring(8, 10)) * 1) )) + ":" + getTimeHourswithZero(parseInt(srcDateTime.substring(10, 12) * 1));
        } else {
          	//time = (getTimeHourswithZero((parseInt(srcDateTime.substring(8, 10)) * 1) % 12)) + ":" + getTimeHourswithZero(parseInt(srcDateTime.substring(10, 12) * 1)) + " PM";
            time = (getTimeHourswithZero((parseInt(srcDateTime.substring(8, 10)) * 1) )) + ":" + getTimeHourswithZero(parseInt(srcDateTime.substring(10, 12) * 1));
        }
    } else {
        if (parseInt(srcDateTime.substring(8, 10) * 1) == 12) {
            time = (getTimeHourswithZero(parseInt(srcDateTime.substring(8, 10) * 1))) + ":" + getTimeHourswithZero(parseInt(srcDateTime.substring(10, 12) * 1));
        } else {
            time = getTimeHourswithZero(parseInt(srcDateTime.substring(8, 10) * 1)) + ":" + getTimeHourswithZero(parseInt(srcDateTime.substring(10, 12) * 1));
        }
    }
    return time;

};

/**
 * @member of  leaveRequestDetailsUI
 * @param   leave status
 * @return {void} - none.
 * @throws none.
 * @Desc - function for enabiling and disabiling the visibility of footer images..
 */

kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.isVisibleCenterImg = function(status) {
    try {
        frmLeaveRequestDetails.flxFooterCenterImg.isVisible = true;
        if (status === "cancel" || status === "rejected") {
            frmLeaveRequestDetails.imgCenter.src = "add.png";
        } else {
            frmLeaveRequestDetails.imgCenter.src = "delete_red.png";
        }
    } catch (e) {
        handleError(e);
    }
};

kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.offVisibility = function() {
    frmLeaveRequestDetails.flxFooterEditImg.isVisible = false;
    frmLeaveRequestDetails.flxFooterDeleteImg.isVisible = false;
};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws none.
 * @Desc - function called on clicking cancel button in the PopUp for delete.
 */

kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.onClickCancel = function() {
    frmLeaveRequestDetails.TxtAreaComments.text = "";
    frmLeaveRequestDetails.flxPopUp.setVisibility(false);

};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws  Exception if something goes wrong
 * @Desc - function called on clicking add/delete button based on leave status.
 */

kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.onCenterImgClick = function() {
    try {
        var obj = new kony.apps.coe.ess.myLeave.leaveRequestDetailsUI();
        var st = frmLeaveRequestDetails.lblSelectedLeaveStatusOther.text;
        if (st.toLowerCase() === "approved") {
            frmLeaveRequestDetails.TxtAreaComments.text = "";
            frmLeaveRequestDetails.flxPopUp.setVisibility(true);
        } else {
            obj.onClickEdit(kony.apps.coe.ess.myLeave.leaveRequestDetails.leave_id);
        }
    } catch (e) {
        handleError(e);
    }

};
/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function called on clicking confirm button in popup to update leave status to cancelled.
 */

kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.onClickConfirm = function(leaveData) {
    try {
        var id = kony.apps.coe.ess.myLeave.leaveRequestDetails.leave_id;
        var date1 = new Date();
        var tstamp = date1.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date1.getMonth() + 1) + "" + getTimeHourswithZero(date1.getDate()) + "" + getTimeHourswithZero(date1.getHours()) + "" + getTimeHourswithZero(date1.getMinutes()) + "" + getTimeHourswithZero(date1.getSeconds());

        var tempJSON = {
            "id": id,
            "status_id": "3",
            "employee_id": kony.apps.coe.ess.globalVariables.employeeId,
            "lastmodifiedts": tstamp,
        };
        kony.apps.coe.ess.MVVM.update("MYLEAVE", "leave", tempJSON, function(leaveData, res) {
            frmLeaveRequestDetails.lblSelectedLeaveStatusOther.text = kony.i18n.getLocalizedString("i18n.ess.common.cancel.valueKA");
            frmLeaveRequestDetails.lblSelectedLeaveStatusOther.skin = "sknlblff3b2fop100s28Heavy";
            frmLeaveRequestDetails.imgStatus.src = "rejectedcrosswithfill.png";
            frmLeaveRequestDetails.flxPopUp.setVisibility(false);
            this.deleteSuccess(leaveData, res);
        }.bind(this, leaveData), function(err) {
            handleError(err);
        });
    } catch (e) {
        handleError(e);
    }

};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to update comments in popup while deleting.
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.deleteSuccess = function(leaveData, response) {
    var data = {};
    var evtobj = {
        type: "starting",
        start: leaveData.startDate.substring(6, 8) + "/" + leaveData.startDate.substring(4, 6) + "/" + leaveData.startDate.substring(0, 4) + " 00:00:00",
        finish: leaveData.endDate.substring(6, 8) + "/" + leaveData.endDate.substring(4, 6) + "/" + leaveData.endDate.substring(0, 4) + " 23:59:59"
    };
//comenting Calendar Event Creation in Phone
//   var options = {};
//   var result = kony.application.checkPermission(kony.os.RESOURCE_CALENDAR,options);
//   if(result.status == kony.application.PERMISSION_DENIED) {
//     if(result.canRequestPermission){
//       kony.application.requestPermission(kony.os.RESOURCE_CALENDAR, permissionStatusCallback);
//     }
//     else{
//       var basicConfig = {
//         alertType : constants.ALERT_TYPE_CONFIRMATION,
//         message : kony.i18n.getLocalizedString("i18n.ess.common.enablePermissionSettings"),
//         alertHandler : alertCallback
//       }
//       var pspConfig={};
//       kony.ui.Alert(basicConfig,pspConfig);
//     }
//   }
//   else{
//     permissionStatusCallback(result);
//   }
//   function alertCallback(resp){
//     if(resp == true){
//       kony.application.openApplicationSettings();
//     }
//   }
//   function permissionStatusCallback(response){
//     kony.print("permissionStatusCallback :: "+ JSON.stringify(response));
//     //50002 is permission granted and 500001 is permission denied.
//     if(response.status == true || response.status == 50002){
//     var events = kony.phone.findCalendarEvents(evtobj);
//     for (var eventNo = 0; eventNo < events.length; eventNo++) {
//         if (events[eventNo].summary.substring(0, 12) == kony.i18n.getLocalizedString("i18n.ess.common.MyLeaveApp.valueKA")) {
//             kony.phone.removeCalendarEvent(events[eventNo]);
//         }
//     }
    data.employee_id = kony.apps.coe.ess.globalVariables.employeeId;
    data.leave_id = kony.apps.coe.ess.myLeave.leaveRequestDetails.leave_id;
    if (frmLeaveRequestDetails.TxtAreaComments.text !== "" && typeof frmLeaveRequestDetails.TxtAreaComments.text !== "undefined" && frmLeaveRequestDetails.TxtAreaComments.text !== null) {
        data.comments = frmLeaveRequestDetails.TxtAreaComments.text;
        var date = new Date();
        var timestamp = date.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date.getMonth() + 1) + "" + getTimeHourswithZero(date.getDate()) + "" + getTimeHourswithZero(date.getHours()) + "" + getTimeHourswithZero(date.getMinutes()) + "" + getTimeHourswithZero(date.getSeconds());
        data.createdts = timestamp;
        kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave_note", data, function(res) {
            var obj = kony.apps.coe.ess.myLeave.leaveRequestDetailsUI();
            var prevForm = kony.application.getPreviousForm();
            if (prevForm.id === "frmSearchLog") {
                var ob = new kony.apps.coe.myLeave.search();
                ob.clear();
                prevForm.show();
            } else if (prevForm.id === "frmPendingLeaveRequest") {
                var prevobj = new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI();
                prevobj.showPendingForm();
                prevForm.show();
            } else {
                prevForm.show();
            }
            kony.apps.coe.ess.Sync.syncAsynchronously();
        }, function(err) {
            handleError(err);
        });
    }else{
        var obj = kony.apps.coe.ess.myLeave.leaveRequestDetailsUI();
        var prevForm = kony.application.getPreviousForm();
        if (prevForm.id === "frmSearchLog") {
            var ob = new kony.apps.coe.myLeave.search();
            ob.clear();
            prevForm.show();
        } else if (prevForm.id === "frmPendingLeaveRequest") {
            var prevobj = new kony.apps.coe.ess.myLeave.PendingLeaveRequestUI();
            prevobj.showPendingForm();
            prevForm.show();
        } else {
            prevForm.show();
        }
        kony.apps.coe.ess.Sync.syncAsynchronously();
    }
//  }
//     else{
//       var basicConfig = {
//         alertType : constants.ALERT_TYPE_CONFIRMATION,
//         message :kony.i18n.getLocalizedString("i18n.ess.common.permissionDeniedPleaseEnablePermssions"),
//         alertHandler : alertCallback
//       }
//       var pspConfig={};
//       kony.ui.Alert(basicConfig,pspConfig);
//     }
//   }
};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to get comments from delete popup.
 */

kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.setCancelComments = function() {
    try {
        var comments = frmLeaveRequestDetails.TxtAreaComments.text;
        if (comments == "Comments (optional)")
            comments = "";
        else
            comments = frmLeaveRequestDetails.TxtAreaComments.text;
    } catch (err) {
        handleError(err);

    }
};
/**
 * @member of  leaveRequestDetailsUI
 * @param  leaveid
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function for on click of edit/add button.
 */

kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.onClickEdit = function(lid) {
    //var lid = (frmSearchLog.segList.selectedRowItems[0].lblLeaveId).split("$")[0];
    try {
        var query = "select start_date,end_date from leave where id='" + lid + "'";
        kony.sync.single_select_execute(kony.sync.getDBName(), query, null, function(res) {
            var startdate = res[0].start_date;
            var stdate = parseInt(startdate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(startdate.substring(4, 6) * 1) - 1).toString()] + " " + parseInt(startdate.substring(0, 4) * 1);
            kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId = lid;
            kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate = stdate;
            if (kony.apps.coe.ess.globalVariables.isNativeTablet === false) {
            frmApplyLeave.destroy();
            kony.apps.coe.ess.myLeave.applyLeave.showForm();
            }
          else
            {
            var quert="select  id, name from leave_type";
            kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function(data) {
       		kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.mappingLeaveTypeData(data);
    		}, function(err) {
       		kony.print("-----Error in getting leave balance----" + err);
        	handleError(err);
    		}, false);
            }
        }, function(err) {
            handleError(err);
        }, false);
    } catch (err) {
        handleError(err);
    }

};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to fetch data for segcomments and intialization
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.commentQuery = function() {
    var leaveNoteQuery = "select ln.comments, ln.employee_id, ln.createdts, e.First_Name, e.Last_Name, e.Media_Id " +
        "from leave_note ln join Employee e on ln.employee_id=e.Id where ln.leave_id = '" + kony.apps.coe.ess.myLeave.leaveRequestDetails.leave_id + "' order by ln.createdts ASC";

    kony.sync.single_select_execute(kony.sync.getDBName(), leaveNoteQuery, null, function(res) {
        if (res === undefined || res === null || res.length <= 0) {
            frmLeaveRequestDetails.segComments.isVisible = false;
            (new kony.apps.coe.ess.myLeave.leaveRequestDetailsUI()).attachmentQuery();
        } else {
            kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.EmpData = res;
            kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.ImgIndex = 0;
            kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.ImgData = [];
            frmLeaveRequestDetails.segComments.isVisible = false;
            (new kony.apps.coe.ess.myLeave.leaveRequestDetailsUI()).getEmployeeImg();

        }
    }, function(err) {}, false);

};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to generate comments and fetch  Employee images
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.getEmployeeImg = function() {
    var data = kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.EmpData;
    var obj = new kony.apps.coe.ess.myLeave.leaveRequestDetailsUI();
    try {
        if (data.length > 0) {
            var empImgCount = data.length;
            var attachmentCount = data.length;
            obj.generateCommentRows();
            obj.fetchAllUserImages();
        } else {
            obj.generateCommentRows();
        }
    } catch (err) {
        handleError(err);
        kony.print("----getEmpplyImgError");
    }
};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to get Employee images in comments
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.fetchAllUserImages = function(){
    var data = kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.EmpData;
    var i = kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.ImgIndex;
    try{
        if (data[i].Media_Id !== undefined && data[i].Media_Id !== null && data[i].Media_Id !== "NULL") {
            (new kony.apps.coe.ess.myLeave.media()).fetchEmployeeImage({
                "mediaName": data[i].Media_Id
            }, kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.getImageSuccess.bind(this), function(err){kony.print(JSON.stringify(err));});
        }
    }catch(err){
        handleError(err);
        kony.print("----fetchAllUserImages");
    }

};
/*
 * @SuccessCallback for getEmployeeImg()
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.getImageSuccess = function(response) {
    kony.print("-------emp--------" + JSON.stringify(response));
    var obj = new kony.apps.coe.ess.myLeave.leaveRequestDetailsUI();
    if (response !== undefined && response !== null) {
        var successCallback = function(){
            kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.ImgIndex++;
            obj.fetchAllUserImages();
        };
        obj.insertFetchedUserImage(kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.ImgIndex, response, successCallback);
    }
};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function for binding data to the  segment comments.
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.generateCommentRows = function() {
    var res = kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.EmpData;
    var monthsJSON = Date.getMonthMapNumberToMonth;
    var obj = new kony.apps.coe.ess.myLeave.leaveRequestDetailsUI();
    var commentData = [];
  	var resLength = res.length;
    try {
        for (var i = 0; i < res.length; i++) {
            kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.employeeImg = null;
            var commentDate = "";
            if (!isNaN(res[i].createdts) && res[i].createdts !== null && res[i].createdts !== " " ) {
                var commentTime = "";
                commentTime = obj.setTime(res[i].createdts);
                commentDate = res[i].createdts.substring(6, 8) + " " + (monthsJSON[res[i].createdts.substring(4, 6) + ""]).substring(0, 3) + ", " + commentTime;
            } else {
                commentDate = " ";
            }

            if (res[i].employee_id === kony.apps.coe.ess.globalVariables.employeeId) {
                var tempCommentData = {};
                tempCommentData.template = flexleavenote;
                tempCommentData.labelnotes = " ";
                tempCommentData.lblapplier = "Me";
                tempCommentData.txtApplierComments = {
                    "text": res[i].comments,
                };

                tempCommentData.lblapplieddate = kony.i18n.getLocalizedString("i18n.ess.common.submittedon")+" " + commentDate;
                kony.print("------image data--" + JSON.stringify(kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.ImgData[i]));
                tempCommentData.imgapplier = "adduserpic.png";
                commentData.push(tempCommentData);
            } else{
              var mock = 0;
              if(i>0){
              	if(res[i].createdts === res[i-1].createdts){
              		mock = 1;
                }
              }
              	if(mock === 0){
                var empCommentData = {};
                  empCommentData.template = flexapprovernote;
                  empCommentData.imgapprover = "adduserpic.png";
                  empCommentData.labelapprovernotes = " ";
                  empCommentData.lblapprovername = res[i].First_Name;
                  empCommentData.txtComments = {
                      "text": res[i].comments,
                  };
                  empCommentData.lblapproveddate = kony.i18n.getLocalizedString("i18n.ess.common.submittedon")+" " + commentDate;
                  commentData.push(empCommentData);
                }
            }
        }
        frmLeaveRequestDetails.segComments.widgetDataMap = {
            "labelnotes": "labelnotes",
            "lblapplier": "lblapplier",
            "txtApplierComments": "txtApplierComments",
            "imgapprover": "imgapprover",
            "labelapprovernotes": "labelapprovernotes",
            "lblapprovername": "lblapprovername",
            "txtComments": "txtComments",
            "lblapproveddate": "lblapproveddate",
            "lblapplieddate": "lblapplieddate",
            "imgapplier": "imgapplier"
        };
        frmLeaveRequestDetails.segComments.isVisible = true;
        frmLeaveRequestDetails.segComments.setData(commentData);
        frmLeaveRequestDetails.forceLayout();
        obj.attachmentQuery();
    } catch (err) {
        kony.print("----catch error");
        handleError(err);

    }
};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - Inserts the fetched image to segment
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.insertFetchedUserImage = function(index, response, callback){
    try{
        var segData = frmLeaveRequestDetails.segComments.data[index];
        if(typeof segData.imgapprover === "undefined"){
            segData.imgapplier = {
                "base64": response
            };
        }else{
            segData.imgapprover = {
                "base64": response
            };
        }

        frmLeaveRequestDetails.segComments.setDataAt(segData, index);
    }catch(err){
        kony.print("----catch error");
        handleError(err);
    }
};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - Queries table for comment data
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.attachmentQuery = function() {
    var leaveid = kony.apps.coe.ess.myLeave.leaveRequestDetails.leave_id;
    var attachmentquery = "select distinct media_id,leavel_id from leave_attachments where leavel_id= '" + leaveid + "'";
    kony.sync.single_select_execute(kony.sync.getDBName(), attachmentquery, null, function(res) {
        if (res.length <= 0) {
            frmLeaveRequestDetails.flxAttachment.isVisible = "false";
            frmLeaveRequestDetails.segComments.height = "77.82%";
        } else {

            kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.AttachData = res;
            kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.AttachIndex = 0;
            (new kony.apps.coe.ess.myLeave.leaveRequestDetailsUI()).getAttachmentImg();

        }
    }, function(err) {}, false);

};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to get Attachment images and generate attachment flexes
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.getAttachmentImg = function() {
    var data = kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.AttachData;
    var obj = new kony.apps.coe.ess.myLeave.leaveRequestDetailsUI();
    try {
        if(data.length > 0){
            var attachmentCount = data.length;
            obj.generateAttachmentFlexes(attachmentCount);
            obj.fetchAllAttachments();
        } else {
            obj.generateAttachmentFlexes();
        }
    } catch (err) {
        handleError(err);
        kony.print("---- in getAttachmentImg");
    }
};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to get Attachment images.
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.fetchAllAttachments = function(){
    try{
        var data = kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.AttachData;
        var i = kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.AttachIndex;
		if(i<data.length){
			if (data[i].media_id !== undefined && data[i].media_id !== null) {
				(new kony.apps.coe.ess.myLeave.media()).fetchAttachment({
					"mediaName": data[i].media_id
				}, kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.getAttachSuccess.bind(this, kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.AttachIndex), function(err){kony.print(JSON.stringify(err))});
			}
		}
    }catch(err){
        handleError(err);
        kony.print("---- in fetchAllAttachments");
    }
}
/*
 * @SuccessCallback for getAttachmentImg()
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.getAttachSuccess = function(index,response) {
    var obj = new kony.apps.coe.ess.myLeave.leaveRequestDetailsUI();
    kony.print("-------attachment  " + JSON.stringify(response));
    if (response !== undefined && response !== null) {
        var successCallback = function(){
            kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.AttachIndex++;
            obj.fetchAllAttachments();
        }
        obj.insertFetchedAttachment(index, response, successCallback);
    } else {
       // frmLeaveRequestDetails.flxAttachment.isVisible = "false";
        //frmLeaveRequestDetails.segComments.height = "77.82%";
    }
};


/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to display attachments that are fetched.
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.generateAttachmentFlexes = function(attachmentCount) {
    try {
        var data = kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.AttachData;
        var w = 5;
        var width = 20;
        if (typeof attachmentCount !== 'undefined') {
            frmLeaveRequestDetails.flxAttachment.isVisible = "true";
            frmLeaveRequestDetails.segComments.height = "50.2%";
            for (var i = 0; i < attachmentCount; i++) {
                frmLeaveRequestDetails.flxAttachment.isVisible = "true";
                frmLeaveRequestDetails.segComments.height = "50.2%";
                var flxAttach = new kony.ui.FlexContainer({
                    "autogrowMode": kony.flex.AUTOGROW_NONE,
                    "clipBounds": true,
                    "height": "100%",
                    "id": "flxAttach" + i,
                    "isVisible": true,
                    "layoutType": kony.flex.FREE_FORM,
                    "left": w + "%",
                    "skin": "slFbox",
                    "top": "0%",
                    "width": width + "%"
                }, {}, {});
                flxAttach.setDefaultUnit(kony.flex.DP);

                var flxBorder = new kony.ui.FlexContainer({
                    "autogrowMode": kony.flex.AUTOGROW_NONE,
                    "centerX": "50%",
                    "centerY": "60%",
                    "clipBounds": true,
                    "height": "53%",
                    "id": "flxBorder" + i,
                    "isVisible": true,
                    "layoutType": kony.flex.FREE_FORM,
                    "skin": "sknFlx2ebaefBr2px",
                    "width": "95%",
                    "zIndex": 2
                }, {}, {});
                flxBorder.setDefaultUnit(kony.flex.DP);
                kony.print("--Start Creating imgReceipt--");
                var imgProof = new kony.ui.Image2({
                    "centerX": "50%",
                    "centerY": "50%",
                    "height": "98%",
                    "id": "imgProof" + i,
                    "isVisible": true,
                    "left": "0%",
                    "top": "5%",
                    "width": "95%",
                    "zIndex": 1
                }, {
                    "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
                    "padding": [0, 0, 0, 0],
                    "paddingInPixel": false
                }, {});
                w = w + width;
                flxAttach.add(flxBorder);
                flxBorder.add(imgProof);
                frmLeaveRequestDetails.flxAttachment.addAt(flxAttach, i);
            }
        } else {
            frmLeaveRequestDetails.flxAttachment.isVisible = "false";
            frmLeaveRequestDetails.segComments.height = "77.82%";
        }
    } catch (e) {
        handleError(e);
    }
};
/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @Desc - function called on preshow of frmLeaveRequestDetails.
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.leaveRequestDetailsPreShow = function() {
    /* It check whether the Audit Trail is enable or not.
       If Audit Trail is enabled then it make the Audit Trail Visiblity as true othewise it make the Audit Trail Visibility as false
    */
    if (kony.apps.coe.ess.appconfig.isAuditTrailEnabled == true) {
        frmLeaveRequestDetails.flxAudit.isVisible = true;
    } else {
        frmLeaveRequestDetails.flxAudit.isVisible = false;
    }
};

/**
 * @member of  leaveRequestDetailsUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to display attachments that are fetched.
 */
kony.apps.coe.ess.myLeave.leaveRequestDetailsUI.prototype.insertFetchedAttachment = function(index, response, callback) {
        kony.print("----img..." + JSON.stringify(response));
        if (typeof response !== "undefined" && response !== null && response !== undefined) {
            frmLeaveRequestDetails["imgProof" + index].rawBytes = kony.convertToRawBytes(response);
            frmLeaveRequestDetails["imgProof" + index].onTouchEnd=function(){
                frmLeaveRequestDetails.imgBigImage.rawBytes=kony.convertToRawBytes(response);
                frmLeaveRequestDetails.flxBigImage.isVisible=true;
              	frmLeaveRequestDetails.imgBigImage.isVisible=true;
            };
  			callback();
        } else {
            frmLeaveRequestDetails["imgProof" + index].isVisible = false;
        }
}
