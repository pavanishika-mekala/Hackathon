/**
 * @module myLeaveHome_UI
 * @author Nakul Gupta
 * @category UI
 * @description LeaveHomeUI class.
 * © 2016 Kony Inc.
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myLeave = kony.apps.coe.ess.myLeave || {};

//%Region - Constructor
kony.apps.coe.ess.myLeave.MyLeaveHomeUI = function() {
    var syncHamburger = 0;
    try {
        kony.print("-- Start MyLeaveHomeUI --");
        ImageData = {};
        EmployeeData = [];
        kony.print("-- End MyLeaveHomeUI --");
    } catch (e) {
        handleError(e);
        kony.print("------------------------------------------In kony.apps.coe.ess.myLeave.MyLeaveHomeUI " + e);
    }
};

// %Region - Methods in MyLeaveHomeUI
/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method dynamically creates the calendar widget and adds it to the form.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.prototype.
addCalendarOnLeaveHome = function() {
    try {
        kony.print("-- Start addCalendarOnLeaveHome --");
        var currDate = new Date();
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear().toString().trim(0, 4), "flxCalendarWidget", "sknFlxMobOp0", "sknFlxFocus", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS90", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFCC3C4CCOp100S24px", this.isValidMonthandYearforCalender, this.errorIsValidMonthandYearforCalender, this.onSwipeCallback, this.onTouchEndCallback, this.monthRefresh, this.totalCalenderRefresh);
        frmLeaveHome.flxCalendar.removeAll();
        frmLeaveHome.flxCalendar.add(kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.getcalendar());
        kony.print("-- End addCalendarOnLeaveHome --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method checks wether the month and year are valid.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.prototype.isValidMonthandYearforCalender = function(month, year) {
    try {
        kony.print("-- Start isValidMonthandYearforCalender --");
        var currDate = new Date();
        if (year >= (currDate.getFullYear() - 1).toString().trim(0, 4) && year <= (currDate.getFullYear() + 1).toString().trim(0, 4)) {
            return true;
        } else {
            return false;
        }
        kony.print("-- End isValidMonthandYearforCalender --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is an error callback function for the calendar widget.
 */
kony.apps.coe.ess.myLeave.
MyLeaveHomeUI.prototype.errorIsValidMonthandYearforCalender = function(month, year) {

};


/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       myWidget, gestureInfo, context
 * return       None.
 * desc         This method is a callback function for the calendar widget called on swipe.
 */
kony.apps.coe.ess.myLeave.
MyLeaveHomeUI.prototype.onSwipeCallback = function(myWidget, gestureInfo, context) {
    //enabling the hamburger menu icon as on click of pending request and swipe of calendar ,it gets disabled
    frmLeaveHome.flxHamburgerMenu.setVisibility(true);
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       data
 * return       None.
 * desc         This method is a callback function for the calendar widget called on touch end.
 */
kony.apps.coe.ess.myLeave.
MyLeaveHomeUI.prototype.onTouchEndCallback = function(data) {
    try {
        kony.print("-- Start onTouchEndCallback --");
        if (data.LABEL.isMothDay) {
            if (data.CELL.skin == "sknFlxMobOp0") {
                if (JSON.stringify(data.data.CellData) !== "" && data.data.CellData.Name == "Non Working Day") {
                    toastMsg.showToastMsg(data.data.CellData.Name, 2000);
                } else {
                    kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate = data.LABEL.Date;
                    kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId = null;
                    frmApplyLeave.destroy();
                    kony.apps.coe.ess.myLeave.applyLeave.showForm();
                }
            } else {
                if (data.data.CellData.Type == "Holiday") {
                    toastMsg.showToastMsg(data.data.CellData.Name, 2000);
                } else if (data.data.CellData.Type == "Event") {
                    toastMsg.showToastMsg(data.data.CellData.Name, 2000);
                } else if (data.data.CellData.Type == "Leave") {
                    if (frmLeaveHome.footers[0] !== null || frmLeaveHome.footers[0] !== undefined) {
                        frmLeaveHome.footers[0].setVisibility(false);
                        frmLeaveHome.flxFooterShadow.setVisibility(false);
                    }
                    frmLeaveHome.btnConfirm.onClick = kony.apps.coe.ess.myLeave.MyLeaveHomeUI.deleteLeave.bind(null, data);
                    frmLeaveHome.flxLeaveMonthDetailsMain.setEnabled(false);
                    var monthsJSON = Date.getMonthMapNumberToMonth;
                    kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate = (new Date(data.data.CellData.StartDate.substring(0, 4), data.data.CellData.StartDate.substring(4, 6) - 1, data.data.CellData.StartDate.substring(6, 8)).toString()).substring(0, 15);
                    kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId = data.data.CellData.LeaveID;
                    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.selectedLeaveID = data.data.CellData.LeaveID;
                    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.mappingBackendDataToCalendar();
                    frmLeaveHome.lblLeaveType.text = data.data.CellData.LeaveType;
                    var leaveNoteDataQuery = "select ln.comments, ln.employee_id, ln.createdts, e.First_Name, e.Last_Name, e.Media_Id " +
                        "from leave_note ln join Employee e on ln.employee_id=e.Id where ln.leave_id = '" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.selectedLeaveID + "' order by ln.createdts ASC";
                    kony.sync.single_select_execute(kony.sync.getDBName(), leaveNoteDataQuery, null, function(res) {

                        if (res.length <= 0) {

                            frmLeaveHome.segLeaveComments.isVisible = false;
                            frmLeaveHome.segLeaveComments2.isVisible = false;
                        } else {
                            kony.apps.coe.ess.myLeave.MyLeaveHomeUI.EmployeeData = res;
                            kony.apps.coe.ess.myLeave.MyLeaveHomeUI.ImgIndex = 0;
                            kony.apps.coe.ess.myLeave.MyLeaveHomeUI.ImageData = [];
                            kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
                            (new kony.apps.coe.ess.myLeave.MyLeaveHomeUI()).getEmployeeImages();
                        }
                    }, function(err) {
                        handleError(err);
                    }, false);
                    if (!isNaN(data.data.CellData.Hours) && data.data.CellData.Hours !== null && data.data.CellData.Hours !== "") {

                        if (parseFloat(data.data.CellData.Hours) >= kony.apps.coe.ess.appconfig.workingHours) {
                            frmLeaveHome.lblFullDay.text = "Full Day";
                        } else {
                            frmLeaveHome.lblFullDay.text = "Partial";
                        }

                        if (data.data.CellData.StartDate == data.data.CellData.EndDate) {
                            var totalTime = parseFloat(data.data.CellData.Hours).toString()+" "+kony.i18n.getLocalizedString("i18n.ess.myLeave.frmLeaveHome.Hours")+" ";
                            frmLeaveHome.lblLeaveTime.text = totalTime;
                            frmLeaveHome.lblFromTo.text = data.data.CellData.StartDate.substring(6, 8) + " " + (monthsJSON[data.data.CellData.StartDate.substring(4, 6) + ""]).substring(0, 3);
                            frmLeaveHome.lblLeaveTime.isVisible = true;
                        } else {
                            var totalDays = ((parseInt(data.data.CellData.Hours) * 1) / kony.apps.coe.ess.appconfig.workingHours).toFixed() + " "+ kony.i18n.getLocalizedString("i18.ess.frmTeamView.days");
                            frmLeaveHome.lblLeaveTime.text = totalDays;
                            frmLeaveHome.lblFromTo.text = data.data.CellData.StartDate.substring(6, 8) + " " + (monthsJSON[data.data.CellData.StartDate.substring(4, 6) + ""]).substring(0, 3) + " - " + data.data.CellData.EndDate.substring(6, 8) + " " + (monthsJSON[data.data.CellData.EndDate.substring(4, 6) + ""]).substring(0, 3);
                            frmLeaveHome.lblLeaveTime.isVisible = true;
                        }
                    } else {
                        frmLeaveHome.lblLeaveTime.isVisible = false;
                        frmLeaveHome.lblLeaveTime.text = " - ";
                        if (data.data.CellData.StartDate == data.data.CellData.EndDate) {
                            frmLeaveHome.lblFullDay.text = " ";
                            frmLeaveHome.lblFromTo.text = data.data.CellData.StartDate.substring(6, 8) + " " + (monthsJSON[data.data.CellData.StartDate.substring(4, 6) + ""]).substring(0, 3);
                        } else {
                            frmLeaveHome.lblFullDay.text = "Full Day";
                            frmLeaveHome.lblFromTo.text = data.data.CellData.StartDate.substring(6, 8) + " " + (monthsJSON[data.data.CellData.StartDate.substring(4, 6) + ""]).substring(0, 3) + " - " + data.data.CellData.EndDate.substring(6, 8) + " " + (monthsJSON[data.data.CellData.EndDate.substring(4, 6) + ""]).substring(0, 3);
                        }
                    }

                    if (!isNaN(data.data.CellData.CreateDate) && data.data.CellData.CreateDate !== null && data.data.CellData.CreateDate !== "") {
                        var appliedTime = "";
                        if (data.data.CellData.CreateDate.substring(8, 10) >= "12") {
                            appliedTime = (parseInt(data.data.CellData.CreateDate.substring(8, 10)) - 12) + ":" + data.data.CellData.CreateDate.substring(10, 12) + " PM";
                        } else {
                            appliedTime = data.data.CellData.CreateDate.substring(8, 10) + ":" + data.data.CellData.CreateDate.substring(10, 12) + " AM";
                        }
                        var appliedDate = data.data.CellData.CreateDate.substring(6, 8) + " " + (monthsJSON[data.data.CellData.CreateDate.substring(4, 6) + ""]).substring(0, 3) + " " + data.data.CellData.CreateDate.substring(0, 4) + ", " + appliedTime;
                        frmLeaveHome.lblAppliedDate.text = appliedDate;
                    } else {
                        frmLeaveHome.lblAppliedDate.text = " ";
                    }
                    if (data.data.CellData.Status.toLowerCase() == "pending") {
                        frmLeaveHome.flxSelectedLeaveStatusOther.isVisible = false;
                        frmLeaveHome.flxSelectedLeaveStatusPending.isVisible = true;
                        frmLeaveHome.flxSelectedLeaveFooterOthers.isVisible = false;
                        frmLeaveHome.flxSelectedLeaveFooterPending.isVisible = true;
                        frmLeaveHome.imgLeaveStatus.src = "cautionsymbolwithfill.png";
                        frmLeaveHome.lblSelectedLeaveStatusPending.text = kony.i18n.getLocalizedString("i18n.ess.common.pending.valueKA");
                        frmLeaveHome.lblSelectedLeaveStatusPending.skin = "sknLblMobFFAE2B28Px";
                    } else if (data.data.CellData.Status.toLowerCase() == "submitted") {
                        frmLeaveHome.flxSelectedLeaveStatusOther.isVisible = false;
                        frmLeaveHome.flxSelectedLeaveStatusPending.isVisible = true;
                        frmLeaveHome.flxSelectedLeaveFooterOthers.isVisible = false;
                        frmLeaveHome.flxSelectedLeaveFooterPending.isVisible = true;
                        frmLeaveHome.imgLeaveStatus.src = "submittedtickmarkwithfill.png";
                        frmLeaveHome.lblSelectedLeaveStatusPending.text = kony.i18n.getLocalizedString("i18n.ess.common.submitted.valueKA");
                        frmLeaveHome.lblSelectedLeaveStatusPending.skin = "sknLblMob2EbAEF28Px";
                    } else if (data.data.CellData.Status.toLowerCase() == "approved") {
                        frmLeaveHome.flxSelectedLeaveStatusOther.isVisible = true;
                        frmLeaveHome.flxSelectedLeaveStatusPending.isVisible = false;
                        frmLeaveHome.flxSelectedLeaveFooterOthers.isVisible = true;
                        frmLeaveHome.flxSelectedLeaveFooterPending.isVisible = false;
                        frmLeaveHome.imgLeaveStatus.src = "approvedtickmarkwithfill.png";
                        frmLeaveHome.imgSelectedLeaveFooterOthersAddButton.height = "50%";
                        frmLeaveHome.imgSelectedLeaveFooterOthersAddButton.src = "delete_red.png";
                        frmLeaveHome.lblSelectedLeaveStatusOther.text = kony.i18n.getLocalizedString("i18n.ess.common.approved.valueKA");
                        frmLeaveHome.lblSelectedLeaveStatusOther.skin = "sknLblMob00C6AE28Px";
                        if (!isNaN(data.data.CellData.LastModifiedDate) && data.data.CellData.LastModifiedDate !== null && data.data.CellData.LastModifiedDate !== "") {
                            var approvedTime = "";
                            if (data.data.CellData.LastModifiedDate.substring(8, 10) >= "12") {
                                approvedTime = (parseInt(data.data.CellData.LastModifiedDate.substring(8, 10)) - 12) + ":" + data.data.CellData.LastModifiedDate.substring(10, 12) + " PM";
                            } else {
                                approvedTime = data.data.CellData.LastModifiedDate.substring(8, 10) + ":" + data.data.CellData.LastModifiedDate.substring(10, 12) + " AM";
                            }
                            var approvedDate = data.data.CellData.LastModifiedDate.substring(6, 8) + " " + (monthsJSON[data.data.CellData.LastModifiedDate.substring(4, 6) + ""]).substring(0, 3) + " " + data.data.CellData.LastModifiedDate.substring(0, 4) + ", " + approvedTime;
                            frmLeaveHome.lblSelectedLeaveStatusOtherDate.text = approvedDate;
                        } else {
                            frmLeaveHome.lblSelectedLeaveStatusOtherDate.text = " ";
                        }
                    } else if (data.data.CellData.Status.toLowerCase() == "rejected") {
                        frmLeaveHome.flxSelectedLeaveStatusOther.isVisible = true;
                        frmLeaveHome.flxSelectedLeaveStatusPending.isVisible = false;
                        frmLeaveHome.flxSelectedLeaveFooterOthers.isVisible = true;
                        frmLeaveHome.flxSelectedLeaveFooterPending.isVisible = false;
                        frmLeaveHome.imgLeaveStatus.src = "rejectedcrosswithfill.png";
                        frmLeaveHome.imgSelectedLeaveFooterOthersAddButton.height = "100%";
                        frmLeaveHome.imgSelectedLeaveFooterOthersAddButton.src = "add.png";
                        frmLeaveHome.lblSelectedLeaveStatusOther.text = kony.i18n.getLocalizedString("i18n.ess.common.rejected.valueKA");
                        frmLeaveHome.lblSelectedLeaveStatusOther.skin = "sknLblMobF74B4B28Px";
                        if (!isNaN(data.data.CellData.LastModifiedDate) && data.data.CellData.LastModifiedDate !== null && data.data.CellData.LastModifiedDate !== "") {
                            var rejectedTime = "";
                            if (data.data.CellData.LastModifiedDate.substring(8, 10) >= "12") {
                                rejectedTime = (parseInt(data.data.CellData.LastModifiedDate.substring(8, 10)) - 12) + ":" + data.data.CellData.LastModifiedDate.substring(10, 12) + " PM";
                            } else {
                                rejectedTime = data.data.CellData.LastModifiedDate.substring(8, 10) + ":" + data.data.CellData.LastModifiedDate.substring(10, 12) + " AM";
                            }
                            var rejectedDate = data.data.CellData.LastModifiedDate.substring(6, 8) + " " + (monthsJSON[data.data.CellData.LastModifiedDate.substring(4, 6) + ""]).substring(0, 3) + " " + data.data.CellData.LastModifiedDate.substring(0, 4) + ", " + rejectedTime;
                            frmLeaveHome.lblSelectedLeaveStatusOtherDate.text = rejectedDate;
                        } else {
                            frmLeaveHome.lblSelectedLeaveStatusOtherDate.text = " ";
                        }
                    }
                  //the hamburger selection button is set to false as on click of hamburger from pending/rejected/approved leave request will show the footer again which should not be the case.
                    frmLeaveHome.flxHamburgerMenu.isVisible=false;
                    frmLeaveHome.flxLeaveDetail.isVisible = true;
                }
            }
        }
        kony.print("-- End onTouchEndCallback --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       data
 * return       None.
 * desc         Fetches employee images and generates rows for comments
 */
kony.apps.coe.ess.myLeave.
MyLeaveHomeUI.prototype.getEmployeeImages = function() {
    var data = kony.apps.coe.ess.myLeave.MyLeaveHomeUI.EmployeeData;
    var obj = new kony.apps.coe.ess.myLeave.MyLeaveHomeUI();
    try {
        if (data.length > 0) {
            var empImgCount = data.length;
            var attachmentCount = data.length;
            kony.apps.coe.ess.myLeave.MyLeaveHomeUI.generateCommentRows();
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
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       data
 * return       None.
 * desc         Get binary content of image
 */
kony.apps.coe.ess.myLeave.
MyLeaveHomeUI.prototype.fetchAllUserImages = function() {
    var data = kony.apps.coe.ess.myLeave.MyLeaveHomeUI.EmployeeData;
    var i = kony.apps.coe.ess.myLeave.MyLeaveHomeUI.ImgIndex;
    try {
        if (data[i].Media_Id !== undefined && data[i].Media_Id !== null && data[i].Media_Id !== "NULL") {
            (new kony.apps.coe.ess.myLeave.media()).fetchEmployeeImage({
                "mediaName": data[i].Media_Id
            }, kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getImageSuccess.bind(this, data[i].employee_id), function(err) { kony.print(JSON.stringify(err)); });
        }
    } catch (err) {
        handleError(err);
        kony.print("----fetchAllUserImages");
    }
}

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       data
 * return       None.
 * desc         callback for binary content fetch
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getImageSuccess = function(employeeID, response) {
    kony.print("-------emp--------" + JSON.stringify(response));
    var obj = new kony.apps.coe.ess.myLeave.MyLeaveHomeUI();
    if (response !== undefined && response !== null) {
        var successCallback = function() {
            kony.apps.coe.ess.myLeave.MyLeaveHomeUI.ImgIndex++;
            obj.fetchAllUserImages();
        };
        obj.insertFetchedUserImage(kony.apps.coe.ess.myLeave.MyLeaveHomeUI.ImgIndex, employeeID, response, successCallback);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       data
 * return       None.
 * desc         Method generates comment rows without image
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.generateCommentRows = function() {

    var data = kony.apps.coe.ess.myLeave.MyLeaveHomeUI.EmployeeData;
    var monthsJSON = Date.getMonthMapNumberToMonth;
    var commentData1 = [];
    var commentData2 = [];
    for (var i = 0; i < data.length; i++) {
        var tempCommentData = {};
        var tempCommentData2 = {};
        var commentDate = "";
        if (!isNaN(data[i].createdts) && data[i].createdts !== null && data[i].createdts !== "") {
            var commentTime = "";
            if (data[i].createdts.substring(8, 10) >= "12") {
                commentTime = (parseInt(data[i].createdts.substring(8, 10)) - 12) + ":" + data[i].createdts.substring(10, 12) + " PM";
            } else {
                commentTime = data[i].createdts.substring(8, 10) + ":" + data[i].createdts.substring(10, 12) + " AM";
            }
            commentDate = data[i].createdts.substring(6, 8) + " " + (monthsJSON[data[i].createdts.substring(4, 6) + ""]).substring(0, 3) + " , " + commentTime;
        } else {
            commentDate = " ";
        }

        if (data[i].employee_id === kony.apps.coe.ess.globalVariables.employeeId) {
            tempCommentData.labelnotes = " ";
            tempCommentData.lblapplier = "Me";
            tempCommentData.txtApplierComments = {
                "text": data[i].comments,
            };
            tempCommentData.lblapplieddate = "Submitted on " + commentDate;
            tempCommentData.imgapplier = "adduserpic.png";
            commentData1.push(tempCommentData);
        } else {
            tempCommentData2.template = flexapprovernote;
            tempCommentData2.imgapprover = "adduserpic.png";
            tempCommentData2.labelapprovernotes = " ";
            tempCommentData2.lblapprovername = data[i].First_Name;
            tempCommentData2.txtComments = {
                "text": data[i].comments,
            };
            tempCommentData2.lblapproveddate = "Submitted on " + commentDate;
            commentData2.push(tempCommentData2);
        }
    }
    if (commentData1.length > 0) {

        frmLeaveHome.segLeaveComments.removeAll();
        frmLeaveHome.segLeaveComments.setData(commentData1);
        frmLeaveHome.segLeaveComments.isVisible = true;
    } else {

        frmLeaveHome.segLeaveComments.setData([]);
        frmLeaveHome.segLeaveComments.isVisible = false;
    }
    if (commentData2.length > 0) {

        frmLeaveHome.segLeaveComments2.removeAll();
        frmLeaveHome.segLeaveComments2.setData(commentData2);
        frmLeaveHome.segLeaveComments2.isVisible = true;
    } else {

        frmLeaveHome.segLeaveComments2.setData([]);
        frmLeaveHome.segLeaveComments2.isVisible = false;
    }

    kony.application.dismissLoadingScreen();
    frmLeaveHome.forceLayout();
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       data
 * return       None.
 * desc         Inserts fetched image to segment
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.prototype.insertFetchedUserImage = function(index, employeeId, response, callback) {
        try {
            if (employeeId === kony.apps.coe.ess.globalVariables.employeeId) {
                var segData = frmLeaveHome.segLeaveComments.data;
                segData[index].imgapplier = {
                    "base64": response
                };
                frmLeaveHome.segLeaveComments.setData(segData);
            } else {
                var segData = frmLeaveHome.segLeaveComments2.data;
                segData[index].imgapprover = {
                    "base64": response
                };
                frmLeaveHome.segLeaveComments2.setData(segData);
            }
        } catch (err) {
            kony.print("----catch error");
            handleError(err);
        }
    }
/**
* @class       MyLeaveHomeUI
* @type        UI
* @param       month, year, index
* return       None.
* desc         This method is a callback function for the calendar widget called on month refresh.
*/
kony.apps.coe.ess.myLeave.
MyLeaveHomeUI.prototype.monthRefresh = function(month, year, index) {
    kony.print("---- in monthRefresh ----");
  	if (month === 0) {
        month = 12;
    }
  	if(kony.apps.coe.ess.globalVariables.isRightShift === true){
      month = month + 2;
      month = month % 12;
      if(month === 0){
        month = 12;
      }
      //To deal a shift between years
      if(month === 1){
        year = year + 1;
      }
      kony.apps.coe.ess.globalVariables.isRightShift = false;
    }  	
    var weekCount = kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getWeeksInMonth(month - 1, year);  	    
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.shiftMonthDetailsFlex(weekCount);
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveHomeData();
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       month, year
 * return       None.
 * desc         This method is a callback function for the calendar widget called on total calendar refresh.
 */
kony.apps.coe.ess.myLeave.
MyLeaveHomeUI.prototype.totalCalenderRefresh = function(month, year) {
    kony.print("---- in totalCalenderRefresh ----");
  	if (month === 0) {
        month = 12;
    }
  	if(kony.apps.coe.ess.globalVariables.isRightShift === true){
      month = month + 2;
      month = month % 12;
      if(month === 0){
        month = 12;
      }
      //To deal a shift between years
      if(month === 1){
        year = year + 1;
      }
      kony.apps.coe.ess.globalVariables.isRightShift = false;
    }  	
    var weekCount = kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getWeeksInMonth(month - 1, year);  	
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.shiftMonthDetailsFlex(weekCount);
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveHomeData();
};
/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       month, year
 * return       Number of weeks in a given month.
 * desc         This method returns number of weeks for a given month. 
 *              Also calculates the starting and ending days for every week in the given month
 */
kony.apps.coe.ess.myLeave.
MyLeaveHomeUI.getWeeksInMonth = function(month, year) {
    var weeks = [],
        firstDate = new Date(year, month, 1),
        lastDate = new Date(year, month + 1, 0),
        numDays = lastDate.getDate();

    var start = 1;
    var end = 7 - firstDate.getDay();
    while (start <= numDays) {
        weeks.push({ start: start, end: end });
        start = end + 1;
        end = end + 7;
        if (end > numDays)
            end = numDays;
    }
    return weeks.length;
};
/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       Number of weeks in a given month.
 * return       None.
 * desc         This method flxLeaveMonthDetailsMain adjusts the dimensions accordingly to the number of weeks a month consists
 */
kony.apps.coe.ess.myLeave.
MyLeaveHomeUI.shiftMonthDetailsFlex = function(weeksInMonth) { 
        frmLeaveHome.flxLeaveMonthDetailsMain.height = 44 + "%";
        frmLeaveHome.flxLeaveMonthDetailsMain.top = 56 + "%";
  	/*
	if (weeksInMonth === 6) {
        frmLeaveHome.flxLeaveMonthDetailsMain.height = 45.5 + "%";
        frmLeaveHome.flxLeaveMonthDetailsMain.top = 54.5 + "%";
      	frmLeaveHome.flxLeaveMonthDetailsMain.forceLayout();
    } else if (weeksInMonth === 5) {
        frmLeaveHome.flxLeaveMonthDetailsMain.height = 50.5 + "%";
        frmLeaveHome.flxLeaveMonthDetailsMain.top = 49.5 + "%";
      	frmLeaveHome.flxLeaveMonthDetailsMain.forceLayout();
    }
  	else if (weeksInMonth === 4) {
        frmLeaveHome.flxLeaveMonthDetailsMain.height = 55.5 + "%";
        frmLeaveHome.flxLeaveMonthDetailsMain.top = 44.5 + "%";
      	frmLeaveHome.flxLeaveMonthDetailsMain.forceLayout();
    }
	*/
};
/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is called on the preshow of the Home form.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveHomeData = function() {
    try {
        kony.print("-- Start leaveHomePreShow --");
        /* It check whether the Team Leave is enable or not.
          If Team Leave is enabled then it make the Team View  Visiblity as true othewise it make the Team Leave Visibility as false
        */
        // setting the visibility of footerShadow true
        frmLeaveHome.flxFooterShadow.setVisibility(true);
        // used to highlight the footer to point to frmLeaveHome page
        kony.apps.coe.ess.MyLeave.Footer.navigateFooter(0);
        if (kony.apps.coe.ess.appconfig.isTeamLeaveEnabled === true) {
            (new kony.apps.coe.ess.myLeave.TeamViewUI()).toggleSkin(frmLeaveHome, false);
        } else {
            frmLeaveHome.flxTeamView.isVisible = false;
            frmLeaveHome.flxIndividualView.right = "5%";
        }
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.selectedLeaveID = null;
        kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate = null;
        kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId = null;
        frmLeaveHome.flxLeaveDetail.isVisible = false;
        frmLeaveHome.footers[0].setVisibility(true);
        frmLeaveHome.flxLeaveMonthDetailsMain.setEnabled(true);
        var currDate = new Date();
        var actualCurrYear = currDate.getFullYear().toString().trim(0, 4);
        var currMonth = "" + (("0" + (parseInt(JSON.stringify(kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.month)) + 1)).slice(-2));
        var currYear = (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.year).toString().trim(0, 4);
        var getPendingRequestsQuery = "select count(l.id) as allPending from leave l " +
            "where l.status_id = 2 and l.employee_id = " + kony.apps.coe.ess.globalVariables.employeeId + " and ((l.start_date between '" + (parseInt(actualCurrYear) - 1).toString() + "0101'" +
            " AND '" + (parseInt(actualCurrYear) + 1).toString() + "1231') OR (l.end_date between '" + (parseInt(actualCurrYear) - 1).toString() + "0101' AND '" + (parseInt(actualCurrYear) + 1).toString() + "1231'))";
        kony.sync.single_select_execute(kony.sync.getDBName(), getPendingRequestsQuery, null, function(res) {
            frmLeaveHome.lblAllPendingRequestsCount.text = res[0].allPending + "";
        }, function(err) {
            handleError(err);
        }, false);
        var getTotalHolidaysQuery = "select count(Holiday_Date) as allHolidays from Holiday where Name !=\"Non Working Day\" and (Holiday_Date between '" + currYear + "0101' AND '" + currYear + "1231')";
        kony.sync.single_select_execute(kony.sync.getDBName(), getTotalHolidaysQuery, null, function(res) {
            frmLeaveHome.lblAllHolidaysCount.text = res[0].allHolidays + "";
        }, function(err) {
            handleError(err);
        }, false);
        var getTeamBirthdays = "select First_Name,Date_of_birth as Date from Employee where substr(Date_of_birth,5) between '" + currMonth + "01' AND '" + currMonth + "31'";
        kony.sync.single_select_execute(kony.sync.getDBName(), getTeamBirthdays, null, this.onSuccessCallbackForTeamBirthdays.bind(this), function(err) {
            handleError(err);
        }, false);
        kony.print("-- End leaveHomePreShow --");

    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is success callback for team members birthday.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.onSuccessCallbackForTeamBirthdays = function(res) {
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data = [];
    var monthsJSON = Date.getMonthMapNumberToMonth;
    for (var i = 0; i < res.length; i++) {
        var tempJSON = {};
        tempJSON = {
            "Type": "birthday",
            "isValid": true
        };
        tempJSON.Name = res[i].First_Name + "'s Birthday";
        tempJSON.Date = res[i].Date.toString().substring(6, 8) + " " + (monthsJSON[res[i].Date.toString().substring(4, 6) + ""]).substring(0, 3);
        tempJSON.FullDate = res[i].Date.toString();
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data.push(tempJSON);
    }

    var currMonth = "" + (("0" + (parseInt(JSON.stringify(kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.month)) + 1)).slice(-2));
    var currYear = (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.year).toString().trim(0, 4);
    var getHolidaysQuery = "select Holiday_Date as Date,Name from Holiday where Holiday_Date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31'";
    kony.sync.single_select_execute(kony.sync.getDBName(), getHolidaysQuery, null, this.onSuccessCallbackForHolidays.bind(this), function(err) {
        handleError(err);
    }, false);
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is success callback for get holidays query.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.onSuccessCallbackForHolidays = function(res) {
    var monthsJSON = Date.getMonthMapNumberToMonth;
    for (var i = 0; i < res.length; i++) {
        var tempJSON = {};
        if (res[i].Name !== "Non Working Day") {
            tempJSON = {
                "Type": "Holiday",
                "isValid": true
            };
        } else {
            tempJSON = {
                "Type": "Non Working Day",
                "isValid": true
            };
        }
        tempJSON.Name = res[i].Name;
        tempJSON.Date = res[i].Date.substring(6, 8) + " " + (monthsJSON[res[i].Date.substring(4, 6) + ""]).substring(0, 3);
        tempJSON.FullDate = res[i].Date;
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data.push(tempJSON);
    }

    var currMonth = "" + (("0" + (parseInt(JSON.stringify(kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.month)) + 1)).slice(-2));
    var currYear = (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.year).toString().trim(0, 4);
    var getEventsQuery = "select holiday_date as Date,name from event where (holiday_date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31')";
    kony.sync.single_select_execute(kony.sync.getDBName(), getEventsQuery, null, this.onSuccessCallbackForEvents.bind(this), function(err) {
        handleError(err);
    }, false);
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is success callback for get holidays query.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.onSuccessCallbackForEvents = function(res) {
    var monthsJSON = Date.getMonthMapNumberToMonth;
    for (var i = 0; i < res.length; i++) {
        var tempJSON = {
            "Type": "Event",
            "isValid": true
        };
        tempJSON.Name = res[i].Name;
        tempJSON.Date = res[i].Date.substring(6, 8) + " " + (monthsJSON[res[i].Date.substring(4, 6) + ""]).substring(0, 3);
        tempJSON.FullDate = res[i].Date;
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data.push(tempJSON);
    }
    var tempResult = [];
    for (var i = 0; i < kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data.length; i++) {
        if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].FullDate !== undefined && kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].FullDate !== null && String(kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].FullDate) !== "") {
            tempResult.push(kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i]);
        }
    }
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data = [];
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data = tempResult;
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data.sort(function(a, b) {
        var x = new Date(a.FullDate.substring(0, 4), a.FullDate.substring(4, 6), a.FullDate.substring(6, 8));
        var y = new Date(b.FullDate.substring(0, 4), b.FullDate.substring(4, 6), b.FullDate.substring(6, 8));
        return x.compareOnlyDate(y);
    });
    var formatedData = [];
    for (var i = 0; i < kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data.length; i++) {
        var tempJSON = {
            "imgPic": "",
            "lblDate": "",
            "lblHoliday": "",
            "lblLine1": " "
        };
        if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].Type.toLowerCase() === "holiday" && kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].isValid === true) {
            tempJSON.lblDate = {
                "text": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].Date
            };
            tempJSON.lblHoliday = {
                "skin": "sknlbl00AAFFOp100S32pxRoman",
                "text": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].Name
            };
            tempJSON.imgPic = "starblue_white.png";
            formatedData.push(tempJSON);
        } else if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].Type.toLowerCase() === "event") {
            tempJSON.lblDate = {
                "text": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].Date
            };
            tempJSON.lblHoliday = {
                "skin": "sknlblFA713BOp100S32pxRoman",
                "text": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].Name
            };
            tempJSON.imgPic = "company_event.png";
            formatedData.push(tempJSON);
        } else if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].Type.toLowerCase() === "birthday") {
            tempJSON.lblDate = {
                "text": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].Date
            };
            tempJSON.lblHoliday = {
                "skin": "sknLbl333333S30Px",
                "text": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].Name
            };
            tempJSON.imgPic = "birthday_cake.png";
            formatedData.push(tempJSON);
        }
    }
    frmLeaveHome.segHolidaysAndEvents.setData(formatedData);

    var currMonth = "" + (("0" + (parseInt(JSON.stringify(kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.month)) + 1)).slice(-2));
    var currYear = (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.year).toString().trim(0, 4);
    var getLeavesQuery = "select l.id as LeaveID, lt.name as LeaveType, l.status_id as StatusID, l.start_date as StartDate, l.end_date as EndDate, l.no_of_hours as Hours, l.lastmodifiedts as LastModifiedDate, l.createdts as CreateDate " +
        "from leave l join leave_type lt on l.leave_type_id = lt.id " +
        "where l.employee_id = '" + kony.apps.coe.ess.globalVariables.employeeId + "' and ((l.start_date between '" + currYear + currMonth + "01'" +
        " AND '" + currYear + currMonth + "31') OR (l.end_date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31'))";
    kony.sync.single_select_execute(kony.sync.getDBName(), getLeavesQuery, null, this.onSuccessCallbackForLeaves.bind(this), function(err) {
        handleError(err);
    }, false);
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is success callback for get Leave query.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.onSuccessCallbackForLeaves = function(res) {
    for (var i = 0; i < kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data.length; i++) {
        for (var j = 0; j < res.length; j++) {
            if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].FullDate >= res[j].StartDate && kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].FullDate <= res[j].EndDate && (res[j].StatusID == "2" || res[j].StatusID == "0" || res[j].StatusID == "1" || res[j].StatusID == "7")) {
                kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[i].isValid = false;
                break;
            }
        }
    }
    var statusArray = ["ACCEPTED", "REJECTED", "PENDING", "CANCEL", "SENTBACK", "SAVED", "ERROR", "Submitted"];
    var statusCount = {
        "pending": 0,
        "accepted": 0,
        "rejected": 0,
        "submitted": 0
    };
    for (var i = 0; i < res.length; i++) {
        res[i].Status = statusArray[parseInt(res[i].StatusID)];
        if (res[i].Status.toLowerCase() == "pending" || res[i].Status.toLowerCase() == "accepted" || res[i].Status.toLowerCase() == "rejected" || res[i].Status.toLowerCase() == "submitted") {
            statusCount[res[i].Status.toLowerCase()] = statusCount[res[i].Status.toLowerCase()] + 1;
        }
        var tempJSON = {
            "Type": "Leave"
        };
        tempJSON.LeaveID = res[i].LeaveID;
        tempJSON.LeaveType = res[i].LeaveType;
        tempJSON.StartDate = res[i].StartDate;
        tempJSON.EndDate = res[i].EndDate;
        tempJSON.Hours = res[i].Hours;
        tempJSON.CreateDate = res[i].CreateDate;
        tempJSON.LastModifiedDate = res[i].LastModifiedDate;
        if (res[i].Status.toLowerCase() == "accepted") {
            tempJSON.Status = "APPROVED";
        } else {
            tempJSON.Status = res[i].Status;
        }
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data.push(tempJSON);
    }
    frmLeaveHome.lblLeaveMonthDetailsStatusApprovedCount.text = "" + statusCount.accepted;
    frmLeaveHome.lblLeaveMonthDetailsStatusPendingCount.text = "" + statusCount.pending;
    frmLeaveHome.lblLeaveMonthDetailsStatusRejectedCount.text = "" + statusCount.rejected;
    frmLeaveHome.lblLeaveMonthDetailsStatusSubmittedCount.text = "" + statusCount.submitted;
    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.mappingBackendDataToCalendar();
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is called to map backend data to calendar widget.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.mappingBackendDataToCalendar = function() {
    try {
        kony.print("-- Start mappingBackendDataToCalendar --");
        //here 42 is the total number of cells in the calendar widget
        for (var i = 0; i < 42; i++) {
            for (var j = 0; j < kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data.length; j++) {
                var cellData = null;
                var months = {
                    "Jan": "01",
                    "Feb": "02",
                    "Mar": "03",
                    "Apr": "04",
                    "May": "05",
                    "Jun": "06",
                    "Jul": "07",
                    "Aug": "08",
                    "Sep": "09",
                    "Oct": "10",
                    "Nov": "11",
                    "Dec": "12"
                };
                var currCellData = kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.getCelldataAtIndex(i);
                var currCellDate = currCellData.LABEL.Date.split(' ');
                var currCellDateFormatted = currCellDate[3] + months["" + currCellDate[1]] + currCellDate[2];
                if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Type === "Holiday" && currCellDateFormatted == kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].FullDate && kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].isValid === true) {
                    cellData = {
                        "CELL": {
                            "skin": "sknFlxMobHoliday"
                        },
                        "data": {
                            "CellData": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j],
                            "TYPE": ""
                        },
                        "IMAGE": {
                            "isVisible": false,
                            "src": ""
                        },
                        "LABEL": {
                            "skin": "sknBtnMobBg0OpFC333333Op100S24px"
                        }
                    };
                    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    break;
                } else if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Type === "Non Working Day" && currCellDateFormatted == kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].FullDate && kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].isValid === true) {
                    cellData = {
                        "CELL": {
                            "skin": "sknFlxMobOp0"
                        },
                        "data": {
                            "CellData": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j],
                            "TYPE": ""
                        },
                        "IMAGE": {
                            "isVisible": false,
                            "src": ""
                        },
                        "LABEL": {
                            "skin": "sknBtnMobBg0OpFC333333Op100S24px"
                        }
                    };
                    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    break;
                } else if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Type === "Event" && currCellDateFormatted == kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].FullDate && kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].isValid === true) {
                    cellData = {
                        "CELL": {
                            "skin": "sknFlxMobEvent"
                        },
                        "data": {
                            "CellData": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j],
                            "TYPE": ""
                        },
                        "IMAGE": {
                            "isVisible": false,
                            "src": ""
                        },
                        "LABEL": {
                            "skin": "sknBtnMobBg0OpFC333333Op100S24px"
                        }
                    };
                    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    break;
                } else if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Type === "Leave" && (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() == "pending" || kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() == "approved" || kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() == "rejected" || kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() == "submitted")) {
                    if (currCellDateFormatted == kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].StartDate && currCellDateFormatted == kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].EndDate) {
                        if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.selectedLeaveID == kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].LeaveID) {
                            cellData = {
                                "CELL": {
                                    "skin": "sknFlxMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() + "Round"
                                },
                                "data": {
                                    "CellData": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j],
                                    "TYPE": ""
                                },
                                "IMAGE": {
                                    "isVisible": false,
                                    "src": ""
                                },
                                "LABEL": {
                                    "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
                                }
                            };
                        } else {
                            cellData = {
                                "CELL": {
                                    "skin": "sknFlxMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() + "RoundOutline"
                                },
                                "data": {
                                    "CellData": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j],
                                    "TYPE": ""
                                },
                                "IMAGE": {
                                    "isVisible": false,
                                    "src": ""
                                },
                                "LABEL": {
                                    "skin": "sknBtnMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase()
                                }
                            };
                        }
                        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.setDataAtIndex(1, i, cellData);
                        break;
                    } else if (currCellDateFormatted == kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].StartDate && currCellDateFormatted != kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].EndDate) {
                        if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.selectedLeaveID == kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].LeaveID) {
                            cellData = {
                                "CELL": {
                                    "skin": "sknFlxMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() + "LeftBar"
                                },
                                "data": {
                                    "CellData": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j],
                                    "TYPE": ""
                                },
                                "IMAGE": {
                                    "isVisible": false,
                                    "src": ""
                                },
                                "LABEL": {
                                    "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
                                }
                            };
                        } else {
                            cellData = {
                                "CELL": {
                                    "skin": "sknFlxMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() + "LeftBarOutline"
                                },
                                "data": {
                                    "CellData": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j],
                                    "TYPE": ""
                                },
                                "IMAGE": {
                                    "isVisible": false,
                                    "src": ""
                                },
                                "LABEL": {
                                    "skin": "sknBtnMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase()
                                }
                            };
                        }
                        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.setDataAtIndex(1, i, cellData);
                        break;
                    } else if (currCellDateFormatted != kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].StartDate && currCellDateFormatted == kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].EndDate) {
                        if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.selectedLeaveID == kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].LeaveID) {
                            cellData = {
                                "CELL": {
                                    "skin": "sknFlxMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() + "RightBar"
                                },
                                "data": {
                                    "CellData": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j],
                                    "TYPE": ""
                                },
                                "IMAGE": {
                                    "isVisible": false,
                                    "src": ""
                                },
                                "LABEL": {
                                    "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
                                }
                            };
                        } else {
                            cellData = {
                                "CELL": {
                                    "skin": "sknFlxMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() + "RightBarOutline"
                                },
                                "data": {
                                    "CellData": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j],
                                    "TYPE": ""
                                },
                                "IMAGE": {
                                    "isVisible": false,
                                    "src": ""
                                },
                                "LABEL": {
                                    "skin": "sknBtnMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase()
                                }
                            };
                        }
                        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.setDataAtIndex(1, i, cellData);
                        break;
                    } else if (currCellDateFormatted > kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].StartDate && currCellDateFormatted < kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].EndDate) {
                        if (kony.apps.coe.ess.myLeave.MyLeaveHomeUI.selectedLeaveID == kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].LeaveID) {
                            cellData = {
                                "CELL": {
                                    "skin": "sknFlxMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() + "MiddleBar"
                                },
                                "data": {
                                    "CellData": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j],
                                    "TYPE": ""
                                },
                                "IMAGE": {
                                    "isVisible": false,
                                    "src": ""
                                },
                                "LABEL": {
                                    "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
                                }
                            };
                        } else {
                            cellData = {
                                "CELL": {
                                    "skin": "sknFlxMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase() + "MiddleBarOutline"
                                },
                                "data": {
                                    "CellData": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j],
                                    "TYPE": ""
                                },
                                "IMAGE": {
                                    "isVisible": false,
                                    "src": ""
                                },
                                "LABEL": {
                                    "skin": "sknBtnMob" + kony.apps.coe.ess.myLeave.MyLeaveHomeUI.data[j].Status.toLowerCase()
                                }
                            };
                        }
                        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.setDataAtIndex(1, i, cellData);
                        break;
                    }
                } else {
                    if (currCellData.LABEL.isMothDay) {
                        var currDate = new Date();
                        var currYear = currDate.getFullYear().toString().trim(0, 4);
                        var currMonth = "0" + (currDate.getMonth() + 1).toString();
                        var formattedCurrDate = currYear + currMonth.slice(-2) + ("0" + currDate.getDate().toString()).slice(-2);
                        if (formattedCurrDate == currCellDateFormatted) {
                            cellData = {
                                "CELL": {
                                    "skin": "sknFlxMobOp0"
                                },
                                "data": {
                                    "CellData": "",
                                    "TYPE": ""
                                },
                                "IMAGE": {
                                    "isVisible": false,
                                    "src": ""
                                },
                                "LABEL": {
                                    "skin": "sknBtnMob2EBAEFS24Px"
                                }
                            };
                        } else {
                            cellData = {
                                "CELL": {
                                    "skin": "sknFlxMobOp0"
                                },
                                "data": {
                                    "CellData": "",
                                    "TYPE": ""
                                },
                                "IMAGE": {
                                    "isVisible": false,
                                    "src": ""
                                },
                                "LABEL": {
                                    "skin": "sknBtnMobBg0OpFC333333Op100S24px"
                                }
                            };
                        }
                    } else {
                        cellData = {
                            "CELL": {
                                "skin": "sknFlxMobOp0"
                            },
                            "data": {
                                "CellData": "",
                                "TYPE": ""
                            },
                            "IMAGE": {
                                "isVisible": false,
                                "src": ""
                            },
                            "LABEL": {
                                "skin": "sknBtnMobBg0OpFCC3C4CCOp100S24px"
                            }
                        };
                    }
                    kony.apps.coe.ess.myLeave.MyLeaveHomeUI.calendarWidget.setDataAtIndex(1, i, cellData);
                }
            }
        }
        kony.print("-- End mappingBackendDataToCalendar --");
    } catch (e) {
        handleError(e);
    }
};


/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is called on the Init of the Home form.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.leaveHomeInit = function() {
    try {
        kony.print("-- Start leaveHomeInit --");
        var currDate = new Date();
        var currYear = currDate.getFullYear().toString().trim(0, 4);
        frmLeaveHome.lblLeaveHomeYear.text = currYear;
        var myLeaveHomeUIObj = new kony.apps.coe.ess.myLeave.MyLeaveHomeUI();
        myLeaveHomeUIObj.addCalendarOnLeaveHome();
        kony.print("-- End leaveHomeInit --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is called to show the home form.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showLeaveHome = function() {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmLeaveHome");
    formController.loadDataAndShowForm();
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is used to change the header and footer for SPA.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveDataSPA = function() {
    if (kony.apps.coe.ess.globalVariables.isSPA === true) {
        kony.print("---start getLeaveDataSPA------");
        var currentForm = kony.application.getCurrentForm().id;
        if (currentForm == "frmLeaveHome") {
            frmLeaveHome.flxLeaveHomeHeader.isVisible = false;
            frmLeaveHome.FlexHeaderNavigation.isVisible = true;
            frmLeaveHome.imgTeam.isVisible = true;
            frmLeaveHome.footers[0].setVisibility(false);
        } else if (currentForm == "frmLeaveWallet") {
            frmLeaveWallet.flxHeader.isVisible = false;
            frmLeaveWallet.FlexHeaderNavigation.isVisible = true;
            frmLeaveWallet.footers[0].setVisibility(false);
        } else if (currentForm == "frmShiftManagement") {
            frmShiftManagement.flxLeaveHomeHeader.isVisible = false;
            frmShiftManagement.FlexHeaderNavigation.isVisible = true;
            frmShiftManagement.ImgTeam.isVisible = true;
            frmShiftManagement.flxFooter.isVisible = false;
            frmShiftManagement.flxFooterShadow.isVisible = false;
            frmShiftManagement.flxShiftMonthDetailsMain.height = "49.8%";
        }
    }
    kony.print("---end getLeaveDataSPA------");
};
/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is called on click of more Options present in header.
 */

kony.apps.coe.ess.myLeave.MyLeaveHomeUI.onClickMoreOptions = function() {
    var currentForm = kony.application.getCurrentForm();
    if (currentForm.imgMore.isVisible === true) {
        currentForm.imgMore.isVisible = false;
        currentForm.imgMoreSelected.isVisible = true;
        currentForm.flxMoreOptions.isVisible = true;
    } else {
        currentForm.imgMore.isVisible = true;
        currentForm.imgMoreSelected.isVisible = false;
        currentForm.flxMoreOptions.isVisible = false;
    }


};


/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is used to hide the leave detail view.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.hideLeaveViewDetails = function() {
    try {
        kony.print("-- Start hideLeaveViewDetails --");
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.selectedLeaveID = null;
        kony.apps.coe.ess.myLeave.applyLeave.preShow.startDate = null;
        kony.apps.coe.ess.myLeave.applyLeave.preShow.selectedLeaveId = null;
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.mappingBackendDataToCalendar();
        //setting the hamburger button visibilty to true on click of back button from approved/pending/rejected leave request.
        frmLeaveHome.flxHamburgerMenu.isVisible=true;
        frmLeaveHome.flxLeaveDetail.isVisible = false;
        frmLeaveHome.flxLeaveMonthDetailsMain.setEnabled(true);
        frmLeaveHome.footers[0].setVisibility(true);
        frmLeaveHome.flxFooterShadow.setVisibility(true);
        kony.print("-- End hideLeaveViewDetails --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is used to call create leave form for editing a leave.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.modifyLeaveDetails = function() {
    try {
        kony.print("-- Start modifyLeaveDetails --");
        frmApplyLeave.destroy();
        kony.apps.coe.ess.myLeave.applyLeave.showForm();
        kony.print("-- End modifyLeaveDetails --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is used to check whether we need to create a leave or delete it.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.checkAddOrDelete = function() {
    try {
        kony.print("-- Start checkAddOrDelete --");
        if (frmLeaveHome.imgSelectedLeaveFooterOthersAddButton.src == "delete_red.png") {
            kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showPopup();
        } else if (frmLeaveHome.imgSelectedLeaveFooterOthersAddButton.src == "add.png") {
            frmApplyLeave.destroy();
            kony.apps.coe.ess.myLeave.applyLeave.showForm();
        }
        kony.print("-- End checkAddOrDelete --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is used to show popup.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.showPopup = function() {
    try {
        kony.print("-- Start showPopup --");
        frmLeaveHome.flxPopUp.isVisible = true;
        frmLeaveHome.TxtAreaComments.text = "";
        frmLeaveHome.flxLeaveHomeMain.setEnabled(false);
        kony.print("-- End showPopup --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is used to hide popup.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.hidePopup = function() {
    try {
        kony.print("-- Start hidePopup --");
        frmLeaveHome.flxLeaveHomeMain.setEnabled(true);
        frmLeaveHome.flxPopUp.isVisible = false;
        frmLeaveHome.TxtAreaComments.text = "";
        kony.print("-- End hidePopup --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is used to set text in comments of the popup.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.setCommentInPopup = function() {
    try {
        kony.print("-- Start setCommentInPopup --");
        frmLeaveHome.TxtAreaComments.text = "";
        kony.print("-- End setCommentInPopup --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       MyLeaveHomeUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is used to delete a leave.
 */
kony.apps.coe.ess.myLeave.MyLeaveHomeUI.deleteLeave = function(leaveData) {
    try {
        kony.print("-- Start deleteLeave --");
        frmLeaveHome.flxHamburgerMenu.setVisibility(true);
        var date1 = new Date();
        var tstamp = date1.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date1.getMonth() + 1) + "" + getTimeHourswithZero(date1.getDate()) + "" + getTimeHourswithZero(date1.getHours()) + "" + getTimeHourswithZero(date1.getMinutes()) + "" + getTimeHourswithZero(date1.getSeconds());
        var tempJSON = {
            "id": kony.apps.coe.ess.myLeave.MyLeaveHomeUI.selectedLeaveID,
            "status_id": "3",
            "employee_id": kony.apps.coe.ess.globalVariables.employeeId,
            "lastmodifiedts": tstamp,
        };
        //     	if(frmLeaveHome.TxtAreaComments.text != "Comments (optional)"){
        //             tempJSON.comments = frmLeaveHome.TxtAreaComments.text;
        //         }
        kony.apps.coe.ess.MVVM.update("MYLEAVE", "leave", tempJSON,
            kony.apps.coe.ess.myLeave.MyLeaveHomeUI.deleteLeaveSuccess.bind(this, leaveData),
            function(err) {
                kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveHomeData();
                kony.apps.coe.ess.myLeave.MyLeaveHomeUI.hidePopup();
                kony.print("------------------------------------------Error in kony.apps.coe.ess.myLeave.MyLeaveHomeUI.deleteLeave update " + err);
            });

        kony.print("-- End deleteLeave --");
    } catch (e) {
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveHomeData();
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.hidePopup();
        handleError(e);
    }
};

kony.apps.coe.ess.myLeave.MyLeaveHomeUI.deleteLeaveSuccess = function(leaveData, response) {
  var data = {};
  data.employee_id = kony.apps.coe.ess.globalVariables.employeeId;
  data.leave_id = kony.apps.coe.ess.myLeave.MyLeaveHomeUI.selectedLeaveID;
  var evtobj = {
    type: "starting",
    start: leaveData.data.CellData.StartDate.substring(6, 8) + "/" + leaveData.data.CellData.StartDate.substring(4, 6) + "/" + leaveData.data.CellData.StartDate.substring(0, 4) + " 00:00:00",
    finish: leaveData.data.CellData.EndDate.substring(6, 8) + "/" + leaveData.data.CellData.EndDate.substring(4, 6) + "/" + leaveData.data.CellData.EndDate.substring(0, 4) + " 23:59:59"
  };
  var options = {};
  var result = kony.application.checkPermission(kony.os.RESOURCE_CALENDAR,options);
  if(result.status == kony.application.PERMISSION_DENIED) {
    if(result.canRequestPermission){
      kony.application.requestPermission(kony.os.RESOURCE_CALENDAR, permissionStatusCallback);
    }
    else{
      var basicConfig = {
        alertType : constants.ALERT_TYPE_CONFIRMATION,
        message : kony.i18n.getLocalizedString("i18n.ess.common.enablePermissionSettings"),
        alertHandler : alertCallback
      }
      var pspConfig={};
      kony.ui.Alert(basicConfig,pspConfig);
    }
  }
  else{
    permissionStatusCallback(result);
  }  
  function alertCallback(resp){
    if(resp == true){
      kony.application.openApplicationSettings();
  }
}  
  function permissionStatusCallback(response){
    kony.print("permissionStatusCallback :: "+ JSON.stringify(response));
    //50002 is permission granted and 500001 is permission denied.
    if(response.status == true || response.status == 50002){
      //permission granted
      var events = kony.phone.findCalendarEvents(evtobj);
      for (var eventNo = 0; eventNo < events.length; eventNo++) {
        if (events[eventNo].summary.substring(0, 12) == kony.i18n.getLocalizedString("i18n.ess.common.MyLeaveApp.valueKA")) {
          kony.phone.removeCalendarEvent(events[eventNo]);
        }
      }
      if (typeof frmLeaveHome.TxtAreaComments.text !== "undefined" && frmLeaveHome.TxtAreaComments.text!== "" && frmLeaveHome.TxtAreaComments.text !== null) {
        data.comments = frmLeaveHome.TxtAreaComments.text;
        var date = new Date();
        var timestamp = date.getFullYear().toString().trim(0, 4) + "" + getTimeHourswithZero(date.getMonth() + 1) + "" + getTimeHourswithZero(date.getDate()) + "" + getTimeHourswithZero(date.getHours()) + "" + getTimeHourswithZero(date.getMinutes()) + "" + getTimeHourswithZero(date.getSeconds());
        data.createdts = timestamp;
        kony.apps.coe.ess.MVVM.createRecord("MYLEAVE", "leave_note", data, function(res) {
          kony.apps.coe.ess.Sync.syncAsynchronously();
          kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveHomeData();
          kony.apps.coe.ess.myLeave.MyLeaveHomeUI.hidePopup();
        }, function(err) {
          handleError(err);
        });
      } else {
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.getLeaveHomeData();
        kony.apps.coe.ess.myLeave.MyLeaveHomeUI.hidePopup();
        kony.apps.coe.ess.Sync.syncAsynchronously();
      }
    }
    else{
      var basicConfig = {
        alertType : constants.ALERT_TYPE_CONFIRMATION,
        message : kony.i18n.getLocalizedString("i18n.ess.common.permissionDeniedPleaseEnablePermssions"),
        alertHandler : alertCallback
      };
      var pspConfig={};
      kony.ui.Alert(basicConfig,pspConfig);
    }    
  }
};

kony.apps.coe.ess.myLeave.MyLeaveHomeUI.setCurrentDate = function(){
  var currDate = new Date();
  currDate = currDate.getDate();
  currDate = currDate.toFixed();
  frmLeaveHome.lblToday.text = currDate.toFixed();
};