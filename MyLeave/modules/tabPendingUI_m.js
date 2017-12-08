kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};
var check = true;
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI = function() {
    kony.print("-- Start tabPendingLeaveRequestUI --");
    prevId = "";
    kony.print("-- End tabPendingLeaveRequestUI --");
};

/**
 * @function showForm
 * @member of tabPendingLeaveRequestUI#
 * @return - {void}
 * @description - code that displays the pendingLeaveRequest form
 */
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.showForm = function() {
    kony.print("-- Start showForm --");
    frmTabPendingList.show();
    kony.print("-- End showForm --");
};

/**
 * @function processData
 * @member of tabPendingLeaveRequestUI#
 * @return - {processedData}
 * @description - code for data mapping for segment row
 */
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.getPendingData = function() {
    kony.print("-- Start getPendingData --");
    var currDate = new Date();
    var actualCurrYear = currDate.getFullYear().toString().trim(0, 4);
    var query = "select l.employee_id,l.id,l.no_of_hours,l.lastmodifiedts,l.start_date,l.end_date,l.createdts,lt.name,s.Status_Name from leave l,leave_type lt,Status s where l.leave_type_id = lt.id AND l.status_id = s.Id AND s.Status_Name like 'PENDING' and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " AND ((l.start_date between '" + (parseInt(actualCurrYear) - 1).toString() + "0101'" +
        " AND '" + (parseInt(actualCurrYear) + 1).toString() + "1231')) order by l.start_date";

    kony.sync.single_select_execute(kony.sync.getDBName(), query, null, function(data) {
            if (data.length > 0 || data !== undefined || data !== "" || data !== null) {
                var processedData = [];
                for (var i = 0; i < data.length; i++) {
                    var pendingData = {};
                    kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.leaveid = data[i].id;
                    data[i].lblLeaveId = data[i].id + "$" + data[i].start_date;
                    data[i].lblLeaveType = data[i].name;
                    frmTabPendingList.lblLeaveType.text = data[i].name;
                    var sdate = data[i].start_date;
                    var ldate = data[i].end_date;
                    var pendingDate = parseInt(sdate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(sdate.substring(4, 6) * 1) - 1).toString()] +
                        " - " + parseInt(ldate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(ldate.substring(4, 6) * 1) - 1).toString()];
                    data[i].lblDates = pendingDate;
                    frmTabPendingList.lblFromTo.text = pendingDate;
                    var adate = data[i].lastmodifiedts;
                    if (adate === "") {
                        data[i].lblDate = "";
                    } else {
                        adate = data[i].lastmodifiedts;
                        var mins = parseInt(adate.substring(10, 12) * 1);
                        if (mins < 10)
                            mins = "0" + parseInt(adate.substring(10, 12) * 1);
                        var hrs = parseInt(adate.substring(8, 10) * 1);
                        var AP = "AM";
                        if (hrs >= 12) {
                            hrs = hrs - 12;
                            AP = "PM";
                        }
                        data[i].lblAppliedDate = parseInt(adate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(adate.substring(4, 6) * 1) - 1).toString()] +
                            " " + parseInt(adate.substring(0, 4) * 1) + " " + hrs + ":" + mins + " " + AP;
                        data[i].lblDate = parseInt(adate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(adate.substring(4, 6) * 1) - 1).toString()] +
                            " " + parseInt(adate.substring(0, 4) * 1) + " " + hrs + ":" + mins + " " + AP;
                    }

                    if (data[i].Status_Name.toLowerCase() === "rejected") {
                        //#ifndef windows8
                        data[i].lblStatus = {
                            "text": kony.i18n.getLocalizedString("i18n.ess.common.rejected.valueKA"),
                            "skin": "sknlblff3b2fop100s28Heavy"
                        };
                        //#else
                        data[i].lblStatus = {
                            "text": "Rejected",
                            "skin": "sknlblff3b2fop100s28Heavy"
                        };
                        //#endif
                    } else if (data[i].Status_Name.toLowerCase() === "cancelled") {
                        //#ifndef windows8
                        data[i].lblStatus = {
                            "skin": "sknlblff3b2fop100s28Heavy",
                            "text": kony.i18n.getLocalizedString("i18n.ess.common.cancelled.valueKA")
                        };
                        //#else
                        data[i].lblStatus = {
                            "skin": "sknlblff3b2fop100s28Heavy",
                            "text": "Calcelled"
                        };
                        //#endif
                    } else if (data[i].Status_Name.toLowerCase() === "approved") {
                        //#ifndef windows8
                        data[i].lblStatus = {
                            "skin": "sknLbl00C6ADOp100S28px",
                            "text": kony.i18n.getLocalizedString("i18n.ess.common.approved.valueKA")
                        };
                        //#else
                        data[i].lblStatus = {
                            "skin": "sknLbl00C6ADOp100S28px",
                            "text": "Approved"
                        };
                        //#endif
                    } else if (data[i].Status_Name.toLowerCase() === "submitted") {
                        data[i].lblStatus = {
                            "skin": "sknlbl2EBAEFop100s28pxHeavy",
                            "text": res[k].status.slice(0, 1).toUpperCase() + "" + res[k].status.slice(1, statusLength).toLowerCase()
                        };
                    } else {
                        //#ifndef windows8
                        data[i].lblStatus = kony.i18n.getLocalizedString("i18n.ess.common.pending.valueKA");
                        //#else
                        data[i].lblStatus = "Pending";
                        //#endif
                    }
                    //check for full day or partial day
                    if (data[i].no_of_hours < 8 && data[i].no_of_hours !== "" && data[i].no_of_hours !== null) {
                        if (data[i].no_of_hours == 7.5) {
                            data[i].lblDays = "1 DAY";//Fullday
                        } else
                            data[i].lblDays = parseInt((data[i].no_of_hours)).toFixed() + " HOURS";//partial day
                    } else
                        data[i].lblDays =((parseInt(data[i].no_of_hours,10)) / 7.5).toFixed() + " DAYS";//fullday

                    processedData.push(data[i]);
                }
                var obj = new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI();
                obj.setDataToPendingForm(processedData);
            } else {
                frmTabLeaveDashboard.show();
                alert("No Pending Leave Requests");
            }
        },
        function(err) {
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
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.setDataToPendingForm = function(data) {
    kony.print("-- Start setDataToPendingForm --");
    if (data.length > 0) {
        showTabPendingListForm(data);
    } else {
        frmTabLeaveDashboard.show();
    }
    kony.print("-- End setDataToPendingForm --");
};

/**
 * @function onSegClick
 * @member of tabPendingLeaveRequestUI#
 * @return - {void}
 * @description - This method is used to navigate to Leave Request Details Form.
 */
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.onSegClick = function() {
    kony.print("--- Start onRowClick ---");
    var segData = frmTabPendingList.segPendingList.selectedRowItems[0];
  	kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.leave_id = frmTabPendingList.segPendingList.selectedItems[0].lblLeaveId.split("$")[0];
  	kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId =frmTabPendingList.segPendingList.selectedItems[0].lblLeaveId.split("$")[0]; 
  	(new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).setLeaveDetails(segData);
    kony.print("--- End onRowClick ---");
};

// %Region - Methods in tabPendingLeaveRequestUI
/**
 * @member of  tabPendingLeaveRequestUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function called after fetching the data to bind it to flxLeaveSelected,flxApprovalStatus
 */

kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.setLeaveDetails = function(data) {
    kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.leave_id = data.lblLeaveId.split("$")[0];
    frmTabPendingList.lblLeaveType.text = data.lblLeaveType;
    if (data.lblStatus.toString().toLowerCase() == "pending") {
        frmTabPendingList.flxLeaveDetailsEdit.setVisibility(true);
        frmTabPendingList.flxLeaveDetailsDelete.setVisibility(true);
    } else {
        frmTabPendingList.flxLeaveDetailsEdit.setVisibility(false);
        frmTabPendingList.flxLeaveDetailsDelete.setVisibility(false);
    }
    var startdate = data.start_date;
    var enddate = data.end_date;
    var dates = parseInt(startdate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(startdate.substring(4, 6) * 1) - 1).toString()] +
        " - " + parseInt(enddate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(enddate.substring(4, 6) * 1) - 1).toString()];
    frmTabPendingList.lblFromTo.text = dates;
    var atime = "",
        ltime = "";
    var lastdate = "",
        applydate = " ";
    //var adate = data.lblAppliedDate;
    var ldate = data.lastmodifiedts;

    //getting applied time and date
    // 	if (adate !== null || adate !== "") {
    // 		applydate = parseInt(adate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(adate.substring(4, 6) * 1) - 1).toString()] + " " + parseInt(adate.substring(0, 4) * 1);
    // 		atime = (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).setTime(adate);
    // 	} else {
    // 		applydate = " ";
    // 		atime = " ";
    // 	}

    //getting lastmodified date and time
    if (ldate !== null || ldate !== "") {
        lastdate = parseInt(ldate.substring(6, 8) * 1) + " " + kony.apps.coe.ess.myLeave.nToStr.month[(parseInt(ldate.substring(4, 6) * 1) - 1).toString()] + " " + parseInt(ldate.substring(0, 4) * 1);
        ltime = (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).setTime(ldate);

    } else {
        lastdate = " ";
        ltime = " ";
    }

    var appliedlbl = applydate + "," + atime;
    var lastlbl = lastdate + "," + ltime;
    //frmTabPendingList.lblApplied.text = kony.i18n.getLocalizedString("i18n.ess.common.applied.valueKA");
    frmTabPendingList.lblLeaveDetailApplyDate.text = data.lblAppliedDate;
    frmTabPendingList.lblSelectedLeaveStatusOtherDate.text = lastlbl;

    //check for full day or partial day
    if (data.no_of_hours < 8 && data.no_of_hours !== "") {
        if (data.no_of_hours === 7.5) {
            frmTabPendingList.lblLeaveTime.text = "1 DAY";
            frmTabPendingList.lblFullDay.text = kony.i18n.getLocalizedString("i18n.ess.common.fullDay.valueKA");
        } else {
            frmTabPendingList.lblLeaveTime.text = parseInt((data.no_of_hours)).toFixed() + " HOURS";
            frmTabPendingList.lblFullDay.text = kony.i18n.getLocalizedString("i18n.ess.common.partial.valueKA");
        }
    } else {
        if (data.no_of_hours !== undefined && data.no_of_hours !== "") {
            frmTabPendingList.lblLeaveTime.text = ((parseInt(data.no_of_hours) * 1) / 7.5).toFixed() + kony.i18n.getLocalizedString("i18.ess.frmTeamView.days");
            frmTabPendingList.lblFullDay.text = kony.i18n.getLocalizedString("i18n.ess.common.fullDay.valueKA");
        } else {
            frmTabPendingList.lblLeaveTime.isVisible = false;
            frmTabPendingList.lblFullDay.text = kony.i18n.getLocalizedString("i18n.ess.common.partial.valueKA");
        }
    }

    frmTabPendingList.flxLeaveDetails.isVisible = true;
    frmTabPendingList.flxSelectedLeaveStatusPending.isVisible = true;
    frmTabPendingList.flxLeaveDetailsAdd.isVisible = false;
    frmTabPendingList.lblSelectedLeaveStatusPending.text = kony.i18n.getLocalizedString("i18n.ess.common.pending.valueKA");
    frmTabPendingList.lblSelectedLeaveStatusPending.skin = "sknLblMobFFAE2B28Px";
    frmTabPendingList.flxAttachmentImg.isVisible = "false";
    frmTabPendingList.flxAttachment.isVisible = "false";
    (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).commentQuery();
};

/**
 * @member of  tabPendingLeaveRequestUI
 * @param   datetime
 * @return formatted time.
 * @throws none.
 * @Desc - function for formatting 24 hr time to 12hr time
 */

kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.setTime = function(srcDateTime) {
    var time = "";

    if (parseInt(srcDateTime.substring(8, 10) * 1) > "12") {

        if ((parseInt(srcDateTime.substring(8, 10) * 1) % 12) === 0) {
            time = (getTimeHourswithZero((parseInt(srcDateTime.substring(8, 10)) * 1) % 12)) + ":" + getTimeHourswithZero(parseInt(srcDateTime.substring(10, 12) * 1)) + " AM";
        } else {
            time = (getTimeHourswithZero((parseInt(srcDateTime.substring(8, 10)) * 1) % 12)) + ":" + getTimeHourswithZero(parseInt(srcDateTime.substring(10, 12) * 1)) + " PM";
        }
    } else {
        if (parseInt(srcDateTime.substring(8, 10) * 1) == 12) {
            time = (getTimeHourswithZero(parseInt(srcDateTime.substring(8, 10) * 1))) + ":" + getTimeHourswithZero(parseInt(srcDateTime.substring(10, 12) * 1)) + " PM";
        } else {
            time = getTimeHourswithZero(parseInt(srcDateTime.substring(8, 10) * 1)) + ":" + getTimeHourswithZero(parseInt(srcDateTime.substring(10, 12) * 1)) + " AM";
        }
    }
    return time;

};

/**
 * @member of  tabPendingLeaveRequestUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to fetch data for segcomments and intialization
 */
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.commentQuery = function() {
    //var leave_id = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.leave_id;
    var leaveNoteQuery = "select ln.comments, ln.employee_id, ln.createdts, e.First_Name, e.Last_Name, e.Media_Id " +
        "from leave_note ln join Employee e on ln.employee_id=e.Id where ln.leave_id = '" + kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.leave_id + "' order by ln.createdts ASC";
    kony.sync.single_select_execute(kony.sync.getDBName(), leaveNoteQuery, null, function(res) {
        if (res.length <= 0) {
            frmTabPendingList.segComments.isVisible = false;
            //frmTabPendingList.segChat.isVisible = false;
            //frmTabPendingList.segapproverChat.isVisible = false;
            (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).attachmentQuery();
        } else {
            kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.EmpData = res;
            kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.ImgIndex = 0;
            kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.ImgData = [];
            frmTabPendingList.segComments.isVisible = false;
            kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).getEmployeeImg();

        }
    }, function(err) {}, false);

};

kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.getEmployeeImg = function() {
    var data = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.EmpData;
    if (data.length > 0 && kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.ImgIndex < kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.EmpData.length && data!==undefined) {
        var i = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.ImgIndex;
        if (data[i].Media_Id !== undefined && data[i].Media_Id !== null) {
            (new kony.apps.coe.ess.myLeave.media()).fetchEmployeeImage({
                "mediaName": data[i].Media_Id
            }, kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.getImageSuccess, kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.getImageError);
        }
    } else {
        (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).setComments();
    }
};

kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.getImageSuccess = function(response) {
    kony.print("-------emp--------" + JSON.stringify(response));
    if (response !== undefined) {
        kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.ImgData.push(response);
        kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.ImgIndex = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.ImgIndex + 1;
        (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).getEmployeeImg();
    }
};

kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.getImageError = function(error) {
    (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).setComments();
};

kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.setComments = function() {
    var data = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.EmpData;
    var monthsJSON = Date.getMonthMapNumberToMonth;
    var obj = new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI();
    var commentData = [], commentDate = "";
    var tempCommentData = {};
    try{
    for (var i = 0; i < data.length; i++) {
        tempCommentData = {};
        commentDate = "";
        if (!isNaN(data[i].createdts) && data[i].createdts !== null && data[i].createdts !== "") {
            var commentTime = "";
            if (parseInt(data[i].createdts.substring(8, 10),10) >= 12) {
                commentTime = (parseInt(data[i].createdts.substring(8, 10)) - 12) + ":" + data[i].createdts.substring(10, 12) + kony.i18n.getLocalizedString("i18n.ess.myLeave.PM");
            } else {
                commentTime = data[i].createdts.substring(8, 10) + ":" + data[i].createdts.substring(10, 12) +  kony.i18n.getLocalizedString("i18n.ess.myLeave.AM");
            }
            commentDate = data[i].createdts.substring(6, 8) + " " + (monthsJSON[data[i].createdts.substring(4, 6) + ""]).substring(0, 3) + "," + commentTime;
        } else {
            commentDate = " ";
        }
        if (data[i].employee_id === kony.apps.coe.ess.globalVariables.employeeId) {
            tempCommentData.template = flxChat;
            tempCommentData.lblNotes = " ";
            tempCommentData.lblApplier = kony.i18n.getLocalizedString("i18n.ess.myLeave.me")
            tempCommentData.txtApplierComents = {
                "text": data[i].comments,
            };
            tempCommentData.lblAppliedDate = "Submitted on " + commentDate;
            if (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData !== undefined && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i] !== null && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i] !== undefined) {
                tempCommentData.imgUser = {
                    "base64": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i]
                };

            } else {
                tempCommentData.imgUser = "adduserpic.png";
            }
            commentData.push(tempCommentData);
        } else {
            tempCommentData.template = flxApproverNote;
            if (kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData !== undefined && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i] !== null && kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i] !== undefined) {
                tempCommentData.imgApprover = {
                    "base64": kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.ImageData[i]
                };
            } else {
                tempCommentData.imgApprover = "adduserpic.png";
            }
            tempCommentData.lblNotes = " ";
            tempCommentData.lblApplier = data[i].First_Name;
            tempCommentData.txtApplierComents = {
                "text": data[i].comments,
            };
            tempCommentData.lblAppliedDate = kony.i18n.getLocalizedString("i18n.ess.myLeave.SubmittedOn") + commentDate;
            commentData.push(tempCommentData);
        }
     }
        if(commentData.length>0){
        frmTabPendingList.segComments.isVisible = true;
      	frmTabPendingList.segComments.removeAll();
        frmTabPendingList.segComments.setData(commentData);
        }
        else{
           frmTabPendingList.segComments.isVisible = false;
        }
        kony.application.dismissLoadingScreen();
        obj.attachmentQuery();
    } catch (err) {
        kony.print("----catch error");
        handleError(err);

    }
};
/**
 * @member of  tabPendingLeaveRequestUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function for fetching the attachments data.
 */
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.attachmentQuery = function() {
    var leaveid = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.leave_id;
    var attachmentquery = "select distinct media_id,leavel_id from leave_attachments where leavel_id= '" + leaveid + "'";
    kony.sync.single_select_execute(kony.sync.getDBName(), attachmentquery, null, function(res) {
        if (res.length <= 0) {
            frmTabPendingList.flxAttachment.isVisible = "false";
        } else {
            kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachData = res;
            kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachIndex = 0;
            kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachImg = [];
            kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
            (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).getAttachmentImg();
        }
    }, function(err) {}, false);

};

/**
 * @member of  tabPendingLeaveRequestUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to get Attachment images.
 */
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.getAttachmentImg = function() {
    var data = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachData;
    var obj = new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI();
    try {
        if (data.length > 0 && kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachIndex < data.length) {
            var i = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachIndex;

            if (data[i].media_id !== undefined && data[i].media_id !== null) {
                (new kony.apps.coe.ess.myLeave.media()).fetchAttachment({
                    "mediaName": data[i].media_id
                }, kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.getAttachSuccess, kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.getAttachError);
            } else {
                obj.assignAttachments();
            }
        } else {
            obj.assignAttachments();
        }
    } catch (err) {
        handleError(err);
        kony.print("---- in getAttachmentImgError");
    }
};

/*
 * @SuccessCallback for getAttachmentImg()
 */
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.getAttachSuccess = function(response) {
    var obj = new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI();
    kony.print("-------attachment  " + JSON.stringify(response));
    if (response !== undefined && response !== null) {
        kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachImg.push(response);
        kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachIndex = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachIndex + 1;
        obj.getAttachmentImg();

    } else {
        frmTabPendingList.flxAttachment.isVisible = "false";
        kony.application.dismissLoadingScreen();
    }
};
/*
 * @ErrorCallback for getAttachmentImg()
 */
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.getAttachError = function(error) {

    (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).assignAttachments();
};

/**
 * @member of  tabPendingLeaveRequestUI
 * @return {void} - none.
 * @throws Exception if something goes wrong,
 * @Desc - function to display attachments that are fetched.
 */
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.assignAttachments = function() {
    try {
        var data = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachData;
        var w = 5;
        var width = 20;
        if (data !== null && data !== undefined && data !== "") {
            frmTabPendingList.flxAttachment.isVisible = "true";
            frmTabPendingList.segComments.height = "50.2%";
            for (var i = 0; i < data.length; i++) {
                frmTabPendingList.flxAttachment.isVisible = "true";
                frmTabPendingList.segComments.height = "50.2%";
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
                frmTabPendingList.flxAttachment.addAt(flxAttach, i);

            }

            for (var j = 0; j < data.length; j++) {
                kony.print("----img..." + JSON.stringify(kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachImg[j]));
                if (kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachImg !== undefined && kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachImg[j] !== null && kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachImg[j] !== undefined) {
                    frmTabPendingList["imgProof" + j].rawBytes = kony.convertToRawBytes(kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.AttachImg[j]);
                } else {
                    frmTabPendingList["imgProof" + j].isVisible = false;
                }
            }
        } else {
            frmTabPendingList.flxAttachment.isVisible = "false";
        }
        kony.application.dismissLoadingScreen();
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       tabPendingLeaveRequestUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is used to delete a leave.
 */

kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.deleteLeave = function() {
    try {
        kony.print("-- Start deleteLeave --");
        var leaveid = "";
        leaveid =kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.leave_id;
        var tempJSON = {
            "id": leaveid,
            "status_id": "3",
            "employee_id": kony.apps.coe.ess.globalVariables.employeeId
        };
        kony.apps.coe.ess.MVVM.update("MYLEAVE", "leave", tempJSON, function(leaveid) {
                new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI().deleteLeaveSuccess();
            },
            kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.deleteLeaveSuccess,
            function(err) {
                (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).getPendingData();
                kony.print("------------------------------------------Error in kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.deleteLeave update " + err);
            });
        kony.print("-- End deleteLeave --");
    } catch (e) {
        (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).getPendingData();
        handleError(e);
    }
};

kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.deleteLeaveSuccess = function(response) {
    var data = {};
    data.employee_id = kony.apps.coe.ess.globalVariables.employeeId;
    data.leave_id = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.leave_id;
    var date = new Date();
    var timestamp = date.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date.getMonth() + 1) + "" + getTimeHourswithZero(date.getDate()) + "" + getTimeHourswithZero(date.getHours()) + "" + getTimeHourswithZero(date.getMinutes()) + "" + getTimeHourswithZero(date.getSeconds());
    data.createdts = timestamp;
    kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave_note", data, function(res) {
      if(kony.application.getPreviousForm().id==="frmTabLeaveDashboard")
        (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).getPendingData();
	  else
        (new kony.apps.coe.myLeave.leaveHistory()).done();
    }, function(err) {
        handleError(err);
    });
};

kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.editLeave = function() {
  kony.apps.ess.myLeave.tabApplyLeaveUI.selectedLeaveId = kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.leave_id;

  var data;
  if(frmTabPendingList.segPendingList.selectedItems===null)
    data = frmTabPendingList.segPendingList.data[0];
  else
    data = frmTabPendingList.segPendingList.selectedItems[0];
    if (data.no_of_hours < 8 && data.no_of_hours !== "") {
        if (data.no_of_hours === 7.5) {
            frmTabApplyLeave.lblDurationHours.text = "1 DAY";
            frmTabApplyLeave.btnFullDay.skin = "sknbtntab2ebaeeround";
            frmTabApplyLeave.btnHours.skin = "sknbtntabF4F4F4";
        } else {
            frmTabApplyLeave.lblDurationHours.text = parseInt((data.no_of_hours)).toFixed() + " HOURS";
            frmTabApplyLeave.btnFullDay.skin = "sknbtntabF4F4F4";
            frmTabApplyLeave.btnHours.skin = "sknbtntab2ebaeeround";
        }
    } else {
        if (data.no_of_hours !== undefined && data.no_of_hours !== "") {
            frmTabApplyLeave.lblDurationHours.text = ((parseInt(data.no_of_hours) * 1) / 7.5).toFixed() + " DAYS";
            frmTabApplyLeave.btnFullDay.skin = "sknbtntab2ebaeeround";
            frmTabApplyLeave.btnHours.skin = "sknbtntabF4F4F4";
        } else {
            frmTabApplyLeave.lblDurationHours.isVisible = false;
            frmTabApplyLeave.btnFullDay.skin = "sknbtntabF4F4F4";
            frmTabApplyLeave.btnHours.skin = "sknbtntab2ebaeeround";
        }
    }
    var query = "select  *  from leave_type";
    kony.sync.single_select_execute(kony.sync.getDBName(), query, null, function(res) {
        leaveType = res;
        for (var i = 0; i < leaveType.length; i++) {
            var btnLeaveTypeObj = new kony.ui.Button({
                id: "btnLeaveType" + leaveType[i].id,
                width: kony.flex.USE_PREFERRED_SIZE,
                centerY: "50%",
                left: "2%",
                //#ifdef windows8
                height: "90%",
                //#else
                height: "45%",
                //#endif
                skin: "sknbtntabF4F4F4",
                focusSkin: "sknbtntab4A90E2",
                text: "  " + leaveType[i].name + "   ",
                "widgetAlignment": constants.WIDGET_ALIGN_CENTER,
                isVisible: true,
                onClick: function() {
                    kony.apps.ess.myLeave.tabApplyLeaveUI.LeaveType.onClickOfLeaveType(this);
                }
            }, {
                "padding": [0, 0, 0, 0],
                "marginInPixel": false,
                "paddingInPixel": false,
                "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT
            }, {});
            frmTabApplyLeave.flxLeaveType.add(btnLeaveTypeObj);
        }
        if (data.lblLeaveType.toString().toLowerCase() === "annual leave")
            frmTabApplyLeave.flxLeaveType["btnLeaveType" + leaveType[0].id].skin = "sknbtntab4A90E2";
        else if (data.lblLeaveType.toString().toLowerCase() === "sick leave")
            frmTabApplyLeave.flxLeaveType["btnLeaveType" + leaveType[1].id].skin = "sknbtntab4A90E2";
        else
            frmTabApplyLeave.flxLeaveType["btnLeaveType" + leaveType[2].id].skin = "sknbtntab4A90E2";
            (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).setDefaultValues();

    }, function(err) {
        handleError(err);
    }, false);
};
kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI.prototype.setDefaultValues = function() {
    var leaveid = frmTabPendingList.segPendingList.selectedItems[0].lblLeaveId.split("$")[0];
    if (leaveid !== null && leaveid !== undefined) {
        var sqlQuery = "select l.id as LeaveID,l.start_time as StartTime, l.end_time as EndTime, lt.name as LeaveType, l.leave_type_id as LeaveTypeId,s.Status_Name as Status, l.start_date as StartDate, l.end_date as EndDate, l.no_of_hours as Hours, l.lastmodifiedts as LastModifiedDate, l.createdts as CreateDate, l.reason_desc as Comment " +
            "from leave l join leave_type lt on l.leave_type_id = lt.id " +
            "join Status s on l.status_id = s.id where l.id = '" + leaveid + "'";
        kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function(data) {
            kony.apps.coe.ess.myLeave.applyLeave.preShow.currentComment = data[0].Comment;
            frmTabApplyLeave.lblToCal.onClick = function() {};
            frmTabApplyLeave.flxAddAtachment.removeAll();
     		kony.apps.ess.myLeave.tabApplyLeaveUI.staticAttachmentImg.setImgPlus();
	 		kony.apps.ess.myLeave.tabApplyLeaveUI.AddAttachment.lastIndex = 0;
	 		kony.apps.ess.myLeave.tabApplyLeaveUI.Attachment.proofData = [];
            kony.apps.ess.myLeave.editLeave.updateUI.setData(data);
        }, function(err) {
            handleError(err);
        }, false);
    }
      else {
            frmTaApplyLeave.lblToCal.onClick = function() {
                //kony.apps.coe.ess.myLeave.applyLeave.Initialization.changeCalendarVisibility();
                //frmTabApplyLeave.flxCalendar.isVisible = true;
            };
        }
      frmTabApplyLeave.show();

};