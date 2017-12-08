/**
 * @module codeTimesheetHistoryUI_m
 * @author Nakul Gupta
 * @category UI 
 * @description TimesheetHistoryUI class. 
 * © 2016 Kony Inc. 
 */
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

//%Region - Constructor
kony.apps.coe.ess.myTime.
TimesheetHistoryUI = function() {
    try {
        kony.print("-- Start TimesheetHistoryUI --");
        calendarWidget = null;
        kony.print("-- End TimesheetHistoryUI --");
    } catch (e) {
        handleError(e);
    }
};
kony.apps.coe.ess.myTime.TimesheetHistoryUI.lastDate = "";
// %Region - Methods in TimesheetHistoryUI
/**
 * @class       TimesheetHistoryUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method dynamically creates the calendar widget and adds it to the form.
 */
kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.onfrmTimesheetHistoryInit = function() {
    try {
        kony.print("-- Start onfrmTimesheetHistoryInit --");
        kony.apps.coe.ess.myTime.TimesheetHistoryUI.monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var currDate = new Date();
        frmTimesheetHistory.lblCurrentMonth.text = kony.apps.coe.ess.myTime.TimesheetHistoryUI.monthsArray[currDate.getMonth()];
        frmTimesheetHistory.lblCurrentYear.text = currDate.getFullYear().toString().trim(0, 4);
        kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear().toString().trim(0, 4), "flxCalendarTimesheetHistory", "sknFlxBgFFFFFF0O", "sknFlxBgFFFFFF0O", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS100", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFC777777Op100S24px", this.isValidMonthandYearforCalender, this.errorIsValidMonthandYearforCalender, this.onSwipeCallback, this.onTouchEndCallback.bind(this), this.monthRefresh, this.totalCalenderRefresh);
        frmTimesheetHistory.flxCalendar.add(kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.getcalendar());
        kony.print("-- End onfrmTimesheetHistoryInit --");
    } catch (e) {
        handleError(e);
    }
};
/**
 * @class       TimesheetHistoryUI
 * @type        UI
 * @param       month, year
 * return       {Boolean}.
 * desc         This method is a callback function for the calendar widget called to check whether it is a valid month and year for the calendar or not.
 */

kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.isValidMonthandYearforCalender = function(month, year) {
    try {
        kony.print("-- Start isValidMonthandYearforCalender --");
        (new kony.apps.coe.ess.myTime.TimesheetHistoryUI()).generatingLastDateToAccess();
        var genratedDate = new Date(year, month).toYYYYMMDD("");
        if (genratedDate <= kony.apps.coe.ess.myTime.TimesheetHistoryUI.lastDate) {
            return true;
        } else {
            try {
                toastMessage.showToastMsg("These Timesheet are currently not available", 2000);
            } catch (e) {
                handleError(e);
            }
            return false;
        }
        kony.print("-- End isValidMonthandYearforCalender --");
    } catch (e) {
        handleError(e);
    }
};

kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.compareDateToLastDateToAccess = function(date) {
    this.generatingLastDateToAccess();
    if (date <= kony.apps.coe.ess.myTime.TimesheetHistoryUI.lastDate) {
        return true;
    } else {
        return false;
    }
};

kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.generatingLastDateToAccess = function() {
    var date = new Date();
    var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date, new Date(date.getFullYear(), 1, 1));
    var sd = interval[0].toYYYYMMDD("");
    var ed = interval[1].toYYYYMMDD("");
    for (var i = 0; i < kony.apps.coe.ess.globalVariables.futureTimesheets; i++) {

        interval[1].setDate(interval[1].getDate() + 1);
        interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(interval[1], new Date(date.getFullYear(), 1, 1));
    }
    kony.apps.coe.ess.myTime.TimesheetHistoryUI.lastDate = interval[1].toYYYYMMDD("");
};

/**
 * @class       TimesheetHistoryUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is an error callback function for the calendar widget.
 */
kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.errorIsValidMonthandYearforCalender = function(month, year) {

};


/**
 * @class       TimesheetHistoryUI
 * @type        UI
 * @param       myWidget, gestureInfo, context
 * return       None.
 * desc         This method is a callback function for the calendar widget called on swipe.
 */
kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.onSwipeCallback = function(myWidget, gestureInfo, context) {
    // this.monthRefresh();
};

/**
 * @class       TimesheetHistoryUI
 * @type        UI
 * @param       data
 * return       None.
 * desc         This method is a callback function for the calendar widget called on touch end.
 */
kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.onTouchEndCallback = function(data) {
    if (this.compareDateToLastDateToAccess(new Date(data.LABEL.Date).toYYYYMMDD(""))) {
        if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() == "monthly") {
            if (frmTimesheetHistory.lblTimesheetMonthlyViewStatus.text == kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.lblshowLblStatusTxt.valueKA") + " : " || kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[0].status.toLowerCase() == "saved") {
                var date = new Date(data.LABEL.Date);
                (new kony.apps.coe.ess.myTime.TimesheetHistoryUI()).settingHomeHeader(date);
                showTimesheetHomeForm(date);
            } else {
                kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId = kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[0].timesheetID;
                showViewTimeSheetForm();
            }

        } else {
            if (data.CELL.skin == "sknFlxBgFFFFFF0O") {
                var date1 = new Date(data.LABEL.Date);
                (new kony.apps.coe.ess.myTime.TimesheetHistoryUI()).settingHomeHeader(date1);
                 outerFlexFooterNavigation.flxBlueLine2Footer.isVisible = false;
                 outerFlexFooterNavigation.InnerFlex2Footer.skin = "sknFlxMobBgF8F7F5Op100BorCCCCCCC";
                 outerFlexFooterNavigation.imgTimeSheetHistoryFooter.src = "history_normal.png";
                 outerFlexFooterNavigation.flxBlueLine1Footer.isVisible = true;
                 outerFlexFooterNavigation.InnerFlex1Footer.skin = "sknFlxMobBgFFFFFFOp100BorCCCCCCC";
                 outerFlexFooterNavigation.imgTimesheetActiveFooter.src = "cal_active.png";
                 showTimesheetHomeForm(date1);
                 // showViewTimeSheetForm();
              
            } else {
                if (data.data.CellData.status.toLowerCase() === "saved") {
                    var date2 = new Date(data.LABEL.Date);
                    (new kony.apps.coe.ess.myTime.TimesheetHistoryUI()).settingHomeHeader(date2);
                     outerFlexFooterNavigation.flxBlueLine2Footer.isVisible = false;
                     outerFlexFooterNavigation.InnerFlex2Footer.skin = "sknFlxMobBgF8F7F5Op100BorCCCCCCC";
                     outerFlexFooterNavigation.imgTimeSheetHistoryFooter.src = "history_normal.png";
                     outerFlexFooterNavigation.flxBlueLine1Footer.isVisible = true;
                     outerFlexFooterNavigation.InnerFlex1Footer.skin = "sknFlxMobBgFFFFFFOp100BorCCCCCCC";
                     outerFlexFooterNavigation.imgTimesheetActiveFooter.src = "cal_active.png";
                   //  showViewTimeSheetForm();  
                     showTimesheetHomeForm(date2);
                } else {
                    if (data.data.CellData.status.toLowerCase() === "rejected" || data.data.CellData.status.toLowerCase() === "error") {
                        kony.apps.coe.ess.myTime.ViewTimeSheetUI.isRejected = true;
                    } else {
                        kony.apps.coe.ess.myTime.ViewTimeSheetUI.isRejected = false;
                    }
                    kony.apps.coe.ess.myTime.ViewTimeSheet.date = new Date(data.LABEL.Date);
                    kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId = data.data.CellData.timesheetID;
                    showViewTimeSheetForm();
                }
            }
        }
    } else {
        try {
            toastMessage.showToastMsg("These Timesheet are currently not available", 2000);
        } catch (e) {
            handleError(e);
        }
    }

};

kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.settingHomeHeader = function(date) {
    var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date, new Date(date.getFullYear(), 1, 1));
    var startDate = interval[0].toYYYYMMDD("");
    var endDate = interval[1].toYYYYMMDD("");
    if ((endDate.localeCompare(new Date().toYYYYMMDD(""))) < 0) {
        frmTimesheetHome.lblHeader.text = "Timesheet\n(backlog)";
    } else {
        frmTimesheetHome.lblHeader.text = "Timesheet";
    }
};

/**
 * @class       TimesheetHistoryUI
 * @type        UI
 * @param       month, year, index
 * return       None.
 * desc         This method is a callback function for the calendar widget called on month refresh.
 */
kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.monthRefresh = function(month, year, index) {
    try {
        kony.print("-- Start monthRefresh --");
        var getTimesheetHistoryDataObj = new kony.apps.coe.ess.myTime.TimesheetHistoryUI();
        getTimesheetHistoryDataObj.getTimesheetHistoryData();
        kony.print("-- End monthRefresh --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       TimesheetHistoryUI
 * @type        UI
 * @param       month, year
 * return       None.
 * desc         This method is a callback function for the calendar widget called on total calendar refresh.
 */
kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.totalCalenderRefresh = function(month, year) {
    try {
        kony.print("-- Start totalCalenderRefresh --");
        var getTimesheetHistoryDataObj = new kony.apps.coe.ess.myTime.TimesheetHistoryUI();
        getTimesheetHistoryDataObj.getTimesheetHistoryData();
        kony.print("-- End totalCalenderRefresh --");
    } catch (e) {
        handleError(e);
    }
};

kony.apps.coe.ess.myTime.TimesheetHistoryUI.isEmptyOrNot = function(successCallback, errorCallback) {
    if (kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData === null || kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData === undefined || kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData.length <= 0) {
        successCallback();
        return;
    }

    function success(index, res) {
        if (res !== null && res !== undefined && res.length > 0) {
            kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[index].isEntryPresentForSaved = true;
        } else {
            if (kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[index].statusID === "5") {
                kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[index].isEntryPresentForSaved = false;
            }
        }
        if (index >= kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData.length - 1) {
            successCallback();
        } else {
            checking(index + 1);
        }

    }
    var checking = function(i) {

        var query = "select te.Id from Time_Entry te where te.Timesheet_Id = '" + kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].timesheetID + "' AND te.StatusId != '3';";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success.bind(this, i), errorCallback);

    };
    checking(0);
};


/**
 * @class       TimesheetHistoryUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method gets the timesheet data from the backend
 */
kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.getTimesheetHistoryData = function() {
    try {
        if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() == "monthly") {
            frmTimesheetHistory.flxTimesheet.setVisibility(false);
            frmTimesheetHistory.flxTimesheetMonthView.setVisibility(true);
        } else {
            frmTimesheetHistory.flxTimesheet.setVisibility(true);
            frmTimesheetHistory.flxTimesheetMonthView.setVisibility(false);
        }
        var scopeObj = this;
        kony.print("-- Start getTimesheetHistoryData --");
        var currMonth = "" + (("0" + (parseInt(JSON.stringify(kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.month)) + 1)).slice(-2));
        var currDate = new Date();
        var currYear = String(kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.year).trim();
        var sqlQuery = "select ts.Start_Date as startDate,ts.End_Date as endDate,ts.Id as timesheetID,ts.Status_Id as statusID " +
            "from Timesheet ts where " +
            "(ts.Start_Date between '" + currYear + currMonth + "01'" +
            " AND '" + currYear + currMonth + "31') OR (ts.End_Date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31')";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", sqlQuery, function(res) {
            kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData = res;
            var statusArray = ["ACCEPTED", "REJECTED", "PENDING", "CANCEL", "SENTBACK", "SAVED", "ERROR", "Submitted"];
            kony.apps.coe.ess.myTime.TimesheetHistoryUI.isEmptyOrNot(function() {
                if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() == "monthly") {
                    if (kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData.length > 0) {
                        for (i = 0; i < kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData.length; i++) {
                            kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].status = statusArray[parseInt(kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].statusID)];
                            if ((kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].startDate.toString().slice(4, 6) == currMonth || kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].endDate.toString().slice(4, 6) == currMonth) && kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].status.toLowerCase() !== "cancel") {
                                kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].isValidTimesheet = true;
                            } else {
                                kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].isValidTimesheet = false;
                            }
                        }
                        frmTimesheetHistory.lblTimesheetMonthlyViewStatus.text = kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.lblshowLblStatusTxt.valueKA") + " : " + kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[0].status.toLowerCase();
                        (new kony.apps.coe.ess.myTime.TimesheetHistoryUI()).mapBackendDataForMonthlyView();
                    } else {
                        frmTimesheetHistory.lblTimesheetMonthlyViewStatus.text = kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.lblshowLblStatusTxt.valueKA") + " : ";
                        frmTimesheetHistory.lblTotalHoursValue.text = " - ";
                        frmTimesheetHistory.lblBillableHoursValue.text = " - ";
                        frmTimesheetHistory.lblOverTimeHoursValue.text = " - ";
                        frmTimesheetHistory.flxTimesheetMonthlyViewDetails1.isVisible = false;
                        frmTimesheetHistory.flxTimesheetMonthlyViewDetails2.isVisible = false;
                        frmTimesheetHistory.flxTimesheetMonthlyViewDetails3.isVisible = false;
                    }
                } else {
                    var statusCount = {
                        "saved": 0,
                        "submitted": 0,
                        "pending": 0,
                        "accepted": 0,
                        "sentback": 0,
                        "rejected": 0
                    };
                    var i = 0;
                    var prevTimsheetID = null;
                    var prevTimesheetEnddate = null;
                    var tempData = {};
                    for (i = 0; i < kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData.length; i++) {
                        kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].status = statusArray[parseInt(kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].statusID)];
                        if ((kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].startDate.toString().slice(4, 6) == currMonth || kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].endDate.toString().slice(4, 6) == currMonth) && kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].status.toLowerCase() !== "cancel") {
                            if (kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].isEntryPresentForSaved === true) {
                                statusCount[kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].status.toLowerCase()] = statusCount[kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].status.toLowerCase()] + 1;
                            }
                            kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].isValidTimesheet = true;
                        } else {
                            kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[i].isValidTimesheet = false;
                        }
                    }
                    frmTimesheetHistory.lblTimesheetStatus.text = (statusCount.accepted + statusCount.pending + statusCount.rejected + statusCount.saved + statusCount.submitted) + " " + kony.i18n.getLocalizedString("i18n.ess.myTime.frmTimesheetHistory.lblTimesheetStatus.valueKA");
                    frmTimesheetHistory.lblTimesheetStatusApprovedValue.text = "" + statusCount.accepted;
                    frmTimesheetHistory.lblTimesheetStatusPendingValue.text = "" + statusCount.pending;
                    frmTimesheetHistory.lblTimesheetStatusRejectedValue.text = "" + statusCount.rejected;
                    frmTimesheetHistory.lblTimesheetStatusSavedValue.text = "" + statusCount.saved;
                    frmTimesheetHistory.lblTimesheetStatusSubmittedValue.text = "" + statusCount.submitted;
                    scopeObj.mappingBackendDataToCalendar();
                }
            }, function(err) {
                handleError(err);
            });
        }, function(err) {
            handleError(err);
        }, false);
        kony.print("-- End getTimesheetHistoryData --");
    } catch (e) {
        handleError(e);
    }
    kony.apps.coe.ess.myTime.TimesheetHistoryUI.shiftingFlex();
};


kony.apps.coe.ess.myTime.TimesheetHistoryUI.shiftingFlex = function() {
    try {
        if (kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.calendarROWS <= 5) {
            kony.apps.coe.ess.myTime.TimesheetHistoryUI.shiftFlexUp();
        } else {
            kony.apps.coe.ess.myTime.TimesheetHistoryUI.shiftFlexDown();
        }
    } catch (e) {
        kony.print("-- error in animation --" + e);
    }

}
/**
 * @class       TimesheetHistoryUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method maps the timesheet data from the backend to the calendar widget
 */
kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.mappingBackendDataToCalendar = function() {
    try {
        kony.print("-- Start mappingBackendDataToCalendar --");
        //here 42 is the total number of cells in the calendar widget
        for (var i = 0; i < 42; i++) {
            for (var j = 0; j < kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData.length; j++) {

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
                var currCellData = kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.getCelldataAtIndex(i);
                var currCellDate = currCellData.LABEL.Date.split(' ');
                var currCellDateFormatted = currCellDate[3] + months["" + currCellDate[1]] + currCellDate[2];
                if (kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].isEntryPresentForSaved === false && kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].isValidTimesheet === true) {
                    if (currCellData.LABEL.isMothDay) {
                        var cellData = {
                            "CELL": {
                                "skin": "sknFlxBgFFFFFF0O"
                            },
                            "data": {
                                "CellData": kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j],
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
                        kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    } else {
                        var cellData = {
                            "CELL": {
                                "skin": "sknFlxBgFFFFFF0O"
                            },
                            "data": {
                                "CellData": kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j],
                                "TYPE": ""
                            },
                            "IMAGE": {
                                "isVisible": false,
                                "src": ""
                            },
                            "LABEL": {
                                "skin": "sknBtnMobBg0OpFC777777Op100S24px"
                            }
                        };
                        kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    }
                    continue;
                } else if (currCellDateFormatted == kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].startDate && currCellDateFormatted == kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].endDate && kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].isValidTimesheet === true) {
                    var cellData = {
                        "CELL": {
                            "skin": "sknFlexMob" + kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].status.toLowerCase() + "Daily"
                        },
                        "data": {
                            "CellData": kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j],
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
                    kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    break;
                } else if (currCellDateFormatted == kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].startDate && kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].isValidTimesheet === true) {
                    var cellData = {
                        "CELL": {
                            "skin": "sknFlexMob" + kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].status.toLowerCase() + "LeftBar"
                        },
                        "data": {
                            "CellData": kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j],
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
                    kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    break;
                } else if (currCellDateFormatted == kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].endDate && kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].isValidTimesheet === true) {
                    var cellData = {
                        "CELL": {
                            "skin": "sknFlexMob" + kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].status.toLowerCase() + "RightBar"
                        },
                        "data": {
                            "CellData": kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j],
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
                    kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    break;
                } else if (currCellDateFormatted > kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].startDate && currCellDateFormatted < kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].endDate && kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].isValidTimesheet === true) {
                    var cellData = {
                        "CELL": {
                            "skin": "sknFlexMob" + kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j].status.toLowerCase() + "MiddleBar"
                        },
                        "data": {
                            "CellData": kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[j],
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
                    kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    break;
                }

            }
        }
        kony.print("-- End mappingBackendDataToCalendar --");
    } catch (e) {
        handleError(e);
    }
    kony.apps.coe.ess.myTime.TimesheetHistoryUI.boldTheCurrentDate();

};
kony.apps.coe.ess.myTime.TimesheetHistoryUI.boldTheCurrentDate = function() {
    var index = kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.getIndexByDate(new Date());
    var data = kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.getCelldataAtIndex((index));
    if (data === null || data === undefined) {
        return;
    }
    var labelSkin;
    if (data.data.CellData === "" || data.data.CellData.isEntryPresentForSaved === false) {
        LabelSkin = {
            "LABEL": {
                "skin": "sknBtnMobBoldBgBlack"
            }
        };
    } else {
        LabelSkin = {
            "LABEL": {
                "skin": "sknBtnMobBoldBgWhite"
            }
        };
    }
    kony.apps.coe.ess.myTime.TimesheetHistoryUI.calendarWidget.setCellStatus(index, LabelSkin);
};
/**
 * @class       TimesheetHistoryUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method handles the navigation to view timesheet form 
 */
kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.navigateToViewTimesheetForm = function() {
    try {
        kony.print("-- Start navigateToViewTimesheetForm --");
        if (kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData.length > 0) {
            if (kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[0].status.toLowerCase() == "sentback") {
                kony.apps.coe.ess.myTime.ViewTimeSheet.isSendBack = true;
            } else {
                kony.apps.coe.ess.myTime.ViewTimeSheet.isSendBack = false;
            }
            kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId = kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[0].timesheetID;
        } else {
            kony.apps.coe.ess.myTime.ViewTimeSheet.isSendBack = false;
            kony.apps.coe.ess.myTime.ViewTimeSheet.timeSheetId = null;
        }
        (new kony.apps.coe.ess.myTime.ViewTimeSheet()).showViewTimeSheetForm();
        kony.print("-- End navigateToViewTimesheetForm --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       TimesheetHistoryUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method sets the backend data for monthly view to the history form 
 */
kony.apps.coe.ess.myTime.
TimesheetHistoryUI.prototype.mapBackendDataForMonthlyView = function() {
    try {
        kony.print("-- Start mapBackendDataForMonthlyView --");
        var sqlQuery = "select tt.isovertime,te.Actual_hours,te.StatusId,p.isBillable,p.Planned_hours,p.project_name as projectname from timesheet ts left join time_entry te" +
            " on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p" +
            " on p.id=pt.project_id left join time_type tt on te.time_type_id=tt.id where ts.id='" + kony.apps.coe.ess.myTime.TimesheetHistoryUI.finalTimesheetData[0].timesheetID + "' and te.StatusId != '3' ";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", sqlQuery, function(data) {
            if (data.length > 0) {
                frmTimesheetHistory.flxTimesheetMonthlyViewDetails1.isVisible = true;
                frmTimesheetHistory.flxTimesheetMonthlyViewDetails2.isVisible = true;
                frmTimesheetHistory.flxTimesheetMonthlyViewDetails3.isVisible = true;
                var overtimeHours = 0;
                var billableHours = 0;
                var totalHours = 0;
                var tempArr = [{
                    "projectName": null,
                    "time": 0
                }, {
                    "projectName": null,
                    "time": 0
                }];
                for (var i = 0; i < data.length; i++) {
                    totalHours = totalHours + parseInt(data[i].Actual_Hours);
                    if (tempArr[0].projectName === null) {
                        tempArr[0].projectName = data[i].projectname;
                    } else if (tempArr[0].projectName !== null && tempArr[1].projectName === null && tempArr[0].projectName != data[i].projectname) {
                        tempArr[1].projectName = data[i].projectname;
                    }
                    if (tempArr[0].projectName !== null && tempArr[0].projectName == data[i].projectname) {
                        tempArr[0].time = tempArr[0].time + parseInt(data[i].Actual_Hours);
                    } else if (tempArr[1].projectName !== null && tempArr[1].projectName == data[i].projectname) {
                        tempArr[1].time = tempArr[1].time + parseInt(data[i].Actual_Hours);
                    }
                    if (parseInt(data[i].ISOVERTIME) == 1) {
                        overtimeHours = overtimeHours + parseInt(data[i].Actual_Hours);
                    }
                    if (data[i].isBillable == 1) {
                        billableHours = billableHours + parseInt(data[i].Actual_Hours);
                    }
                }
                frmTimesheetHistory.lblTotalHoursValue.text = totalHours.toFixed();
                frmTimesheetHistory.lblBillableHoursValue.text = billableHours.toFixed();
                frmTimesheetHistory.lblOverTimeHoursValue.text = overtimeHours.toFixed();
                frmTimesheetHistory.lblTimesheetDetails1.text = tempArr[0].projectName;
                frmTimesheetHistory.lblTimesheetDetails1Value.text = tempArr[0].time + " h";
                if (tempArr[1].projectName === null) {
                    frmTimesheetHistory.lblTimesheetDetails2.text = "";
                    frmTimesheetHistory.lblTimesheetDetails2Value.text = "  ";
                } else {
                    frmTimesheetHistory.lblTimesheetDetails2.text = tempArr[1].projectName;
                    frmTimesheetHistory.lblTimesheetDetails2Value.text = tempArr[1].time + " h";
                }
            } else {
                frmTimesheetHistory.lblTotalHoursValue.text = " - ";
                frmTimesheetHistory.lblBillableHoursValue.text = " - ";
                frmTimesheetHistory.lblOverTimeHoursValue.text = " - ";
                frmTimesheetHistory.flxTimesheetMonthlyViewDetails1.isVisible = false;
                frmTimesheetHistory.flxTimesheetMonthlyViewDetails2.isVisible = false;
                frmTimesheetHistory.flxTimesheetMonthlyViewDetails3.isVisible = false;
            }

        }, function(err) {
            handleError(err);
        }, false);
        kony.print("-- End mapBackendDataForMonthlyView --");
        kony.apps.coe.ess.myTime.TimesheetHistoryUI.boldTheCurrentDate();
    } catch (e) {
        handleError(e);
    }

};
kony.apps.coe.ess.myTime.TimesheetHistoryUI.shiftFlexUp = function() {
    //var cell_height=5.73;
    kony.application.getCurrentForm().flxtimesheetMain.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": -1 - 5.73 + "%",
                "height": 42 + 5.73 + "%",
                "width": "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.5
        }, {
            "animationEnd":kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing
        });
    kony.application.getCurrentForm().flxTimesheetStatusOptions1.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "0%",
                "height": "34.5%",
                "width": "94%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": kony.print("---------upward movement---------")
        });
    kony.application.getCurrentForm().flxTimesheetStatusOptions2.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "0%",
                "height": "34.5%",
                "width": "94%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": kony.print("---------upward movement---------")
        });
    kony.application.getCurrentForm().flxBlank1.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "4.8%",
                "height": "0%",
                "width": "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": kony.print("---------upward movement---------")
        });
};
kony.apps.coe.ess.myTime.TimesheetHistoryUI.shiftFlexDown = function() {
    kony.application.getCurrentForm().flxtimesheetMain.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "-1%",
                "height": "42%",
                "width": "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.5
        }, {
            "animationEnd": kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing
        });
    kony.application.getCurrentForm().flxTimesheetStatusOptions1.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "0%",
                "height": "39.7%",
                "width": "94%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": kony.print("---------downward movement---------")
        });
    kony.application.getCurrentForm().flxTimesheetStatusOptions2.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "0%",
                "height": "39.7%",
                "width": "94%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": kony.print("---------downward movement---------")
        });
    kony.application.getCurrentForm().flxBlank1.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "0%",
                "height": "0%",
                "width": "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": kony.print("---------downward movement---------")
        });

};