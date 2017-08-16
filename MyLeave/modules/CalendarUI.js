/**
 * @module CalendarUI 
 * @Author Shweta Dasari
 * @category UI/actions 
 * @description 
 * © 2016 Kony Inc. 
 */
// Region - namespaces. 
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.myLeave = kony.apps.ess.myLeave || {};
// Region - Class / object constructor.
/**
 * @class calendarUI
 * Contains the UI actions and the functions for the dynamic calendar
 */
kony.apps.ess.myLeave.calendarUI = function(ll) {
    kony.print("-- Start calendarUI --");
    kony.apps.ess.myLeave.calendarUI.labelWidget = ll;
    kony.print("-- End calendarUI --");
};
kony.apps.ess.myLeave.calendarUI.Initialization = {
    monthArray: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
};


kony.apps.ess.myLeave.calendarUI.prototype.addDynamicCalendar = function() {
    var currDate = new Date();
    //#ifdef windows8
    if (kony.apps.ess.myLeave.calendarUI.labelWidget === frmTabApplyLeave.lblFrmCal) {
        kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear(), "flxCalendar", "sknFlxMobOp0", "sknFlxFocus", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS90", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFCC3C4CCOp100S24px", this.isValidMonthandYearforCalendarCallBackFunction, this.errorcallbackIsValidMonthandYearCallBackFunction, this.onswipeCallBackFunction, this.onTouchEndCallBackFuntion, this.callbackMonthChangeFunction, this.callbackRefershTotalcalendarFucntion);
        frmTabApplyLeave.flxCalendar.add(kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.getcalendar());
        frmTabApplyLeave.flxCalendar.setVisibility(true);
        kony.application.dismissLoadingScreen();
    } else {
        kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear(), "flxCalendar2", "sknFlxMobOp0", "sknFlxFocus", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS90", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFCC3C4CCOp100S24px", this.isValidMonthandYearforCalendarCallBackFunction, this.errorcallbackIsValidMonthandYearCallBackFunction, this.onswipeCallBackFunction, this.onTouchEndCallBackFuntion, this.callbackMonthChangeFunction, this.callbackRefershTotalcalendarFucntion);
        frmTabApplyLeave.flxCalendar2.add(kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.getcalendar());
        frmTabApplyLeave.flxCalendar2.setVisibility(true);
        kony.application.dismissLoadingScreen();
    }

    //#else
    (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).addCalendarOnApplyLeaveForm();
    kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear(), "flxCalendar", "sknFlxMobOp0", "sknFlxFocus", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS90", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFCC3C4CCOp100S24px", this.isValidMonthandYearforCalendarCallBackFunction, this.errorcallbackIsValidMonthandYearCallBackFunction, this.onswipeCallBackFunction, this.onTouchEndCallBackFuntion, this.callbackMonthChangeFunction, this.callbackRefershTotalcalendarFucntion);
    //#endif

};

kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.
addCalendarOnApplyLeaveForm = function() {
    try {
        frmTabApplyLeave.flxCalendar.removeAll();
        kony.print("-- Start addCalendarOnApplyLeaveForm --");
        var currDate = new Date();
        kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear().toString().trim(0, 4), "flxCalendarWidget", "sknFlxMobOp0", "sknFlxFocus", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS90", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFCC3C4CCOp100S24px", this.isValidMonthandYearforCalender, this.errorIsValidMonthandYearforCalender, this.onSwipeCallback, this.onTouchEndCallBackFunction, this.monthRefresh, this.totalCalenderRefresh);
        frmTabApplyLeave.flxCalendar.add(kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.calendarWidget.getcalendar());
        kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.mappingBackendDataToCalendar();
        frmTabApplyLeave.flxCalendar.setVisibility(true);
        frmTabApplyLeave.flxCalendar.forceLayout();
        frmTabApplyLeave.forceLayout();
        kony.print("-- End addCalendarOnLeaveHome --");
    } catch (e) {
        kony.application.dismissLoadingScreen();
        handleError(e);
    }
    var query = "select name from leave_type";
    kony.sync.single_select_execute(kony.sync.getDBName(), query, null, leaveTypeSucess, error);

    function leaveTypeSucess(response) {
        kony.apps.coe.myLeave.leaveHistory.leaveTypeResponse = response;
    }
    query = "select Status_Name,Id from Status";
    kony.sync.single_select_execute(kony.sync.getDBName(), query, null, statusTypeSucess, error);

    function statusTypeSucess(response) {
        kony.apps.coe.myLeave.leaveHistory.statusTypeResponse = response;
        kony.application.dismissLoadingScreen();
    }

    function error(err) {
        kony.application.dismissLoadingScreen();
        handleError(err);
    }

};

kony.apps.ess.myLeave.calendarUI.prototype.isValidMonthandYearforCalendarCallBackFunction = function(month, year) {
    return true;
};

kony.apps.ess.myLeave.calendarUI.prototype.errorcallbackIsValidMonthandYearCallBackFunction = function(month, year) {

};

kony.apps.ess.myLeave.calendarUI.prototype.onswipeCallBackFunction = function() {

};


kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard.prototype.onTouchEndCallBackFunction = function(data) {
    if (data.LABEL.isMothDay) {
        if (JSON.stringify(data.data.CellData) !== "" && data.data.CellData.Name == "Non Working Day") {
            toastMsg.showToastMsg(data.data.CellData.Name, 2000);
            return;
        }
    }
    if (data.data.CellData.Type == "Holiday") {
        toastMsg.showToastMsg(data.data.CellData.Name, 2000);
        return;
    } else if (data.data.CellData.Type == "Event") {
        toastMsg.showToastMsg(data.data.CellData.Name, 2000);
        return;
    } else if (data.data.CellData.Type == "Leave") {
        toastMsg.showToastMsg("Leave is already created on selected day", 2000);
        return;
    }
    var dateLabel = data.LABEL.Date; //(dateLabel);
    if (kony.apps.ess.myLeave.calendarUI.labelWidget === frmTabApplyLeave.lblFrmCal) {
        kony.apps.ess.myLeave.calendarUI.startDate = data.LABEL.Date;
        kony.apps.ess.myLeave.calendarUI.endDate = data.LABEL.Date;

    } else if (kony.apps.ess.myLeave.calendarUI.labelWidget === frmTabApplyLeave.lblToCal) {
        kony.apps.ess.myLeave.calendarUI.endDate = data.LABEL.Date;

        //Validating the "To" date
        var from_date = new Date(frmTabApplyLeave.lblFrmCal.text);
        var end_date = new Date(kony.apps.ess.myLeave.calendarUI.endDate);
        if (from_date == "Invalid Date") {
            popupErrorAlert.lblMessage.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmTabApplyLeave.popup.SelectFromDateFirst");
            popupErrorAlert.show();
            (new kony.apps.ess.myLeave.calendarUI(frmTabApplyLeave.lblToCal)).addDynamicCalendar();
            return;
        }
        if (from_date < end_date) {
            //Do nothing
        } else {
            popupErrorAlert.lblMessage.text = kony.i18n.getLocalizedString("i18n.ess.myLeave.frmTabApplyLeave.popup.InvalidDate");
            popupErrorAlert.show();
            (new kony.apps.ess.myLeave.calendarUI(frmTabApplyLeave.lblToCal)).addDynamicCalendar();
            return;
        }
    }

    var format = new kony.apps.ess.myLeave.formattingDate();
    dateLabel = format.toFormatTabDateCal(dateLabel);
    var tt = kony.apps.ess.myLeave.calendarUI.labelWidget;
    tt.text = dateLabel;

    //Assigning same dates to both From and To if From date is selected
    if (kony.apps.ess.myLeave.calendarUI.labelWidget === frmTabApplyLeave.lblFrmCal) {
        frmTabApplyLeave.lblToCal.text = dateLabel;
    }

    if (frmTabApplyLeave.lblFrmCal.text !== "Select" && frmTabApplyLeave.lblToCal.text !== "Select") {
        var startd = [];
        startd = frmTabApplyLeave.lblFrmCal.text.split(" ");
        var frm = startd[0];

        var endd = [];
        endd = frmTabApplyLeave.lblToCal.text.split(" ");
        var to = endd[0];
        var diff = to - frm;

        frmTabApplyLeave.lblDaySelected.text = diff + 1;

        if (diff >= 1) {
            frmTabApplyLeave.lblDaySelected.text = frmTabApplyLeave.lblDaySelected.text + " Days Selected";
            frmTabApplyLeave.lblDurationHours.text = diff + 1 + " " + kony.i18n.getLocalizedString("i18.ess.frmTeamView.days");
            frmTabApplyLeave.lblDurationHours.isVisible = true;
            frmTabApplyLeave.lblDaySelected.isVisible = true;
        } else if (diff == 0) {
            frmTabApplyLeave.lblDaySelected.text = frmTabApplyLeave.lblDaySelected.text + " Day Selected";
            frmTabApplyLeave.lblDurationHours.text = "1 Day";
            frmTabApplyLeave.lblDurationHours.isVisible = true;
            frmTabApplyLeave.lblDaySelected.isVisible = true;
        } else {
            frmTabApplyLeave.lblDurationHours.isVisible = false;
            frmTabApplyLeave.lblDaySelected.isVisible = false;
        }
    }
    (new kony.apps.ess.myLeave.calendarUI()).mappingDataToCalendar();
    //#ifdef windows8
    if (kony.apps.ess.myLeave.calendarUI.labelWidget === frmTabApplyLeave.lblFrmCal) {
        frmTabApplyLeave.flxCalendar.removeAll();
        frmTabApplyLeave.flxCalendar.skin = "slFbox";
        frmTabApplyLeave.flxCalendar.setVisibility(false);
    } else if (kony.apps.ess.myLeave.calendarUI.labelWidget === frmTabApplyLeave.lblToCal) {
        frmTabApplyLeave.flxCalendar2.removeAll();
        frmTabApplyLeave.flxCalendar2.skin = "slFbox";
        frmTabApplyLeave.flxCalendar2.setVisibility(false);
    }
    //#else
    frmTabApplyLeave.flxOverlay.setVisibility(true);
    //#endif

};



kony.apps.ess.myLeave.calendarUI.prototype.mappingDataToCalendar = function() {

    var startDate = kony.apps.ess.myLeave.calendarUI.startDate;
    var endDate = kony.apps.ess.myLeave.calendarUI.endDate;
    if (startDate !== undefined && endDate !== undefined && endDate !== null && startDate !== null) {
        endDate = new Date(endDate);
        if (endDate.compareOnlyDate(startDate) >= 0) {
            var cellData;
            for (var i = 0; i < 42; i++) {
                var curData = kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.getCelldataAtIndex(i);
                if (new Date(curData.LABEL.Date).compareOnlyDate(startDate) === 0 && new Date(curData.LABEL.Date).compareOnlyDate(endDate) === 0) {
                    cellData = {
                        "CELL": {
                            "skin": "sknFlxOneDay"
                        },
                        "data": {
                            "CellData": {},
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
                    kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.setDataAtIndex(1, i, cellData);
                } else if ((new Date(curData.LABEL.Date)).compareOnlyDate(startDate) === 0) {
                    cellData = {
                        "CELL": {
                            "skin": "sknFlexMobsavedLeftBar"
                        },
                        "data": {
                            "CellData": {},
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
                    kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.setDataAtIndex(1, i, cellData);
                } else if ((new Date(curData.LABEL.Date)).compareOnlyDate(startDate) > 0 && (new Date(curData.LABEL.Date)).compareOnlyDate(endDate) < 0) {
                    cellData = {
                        "CELL": {
                            "skin": "sknFlexMobsavedMiddleBar"
                        },
                        "data": {
                            "CellData": {},
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
                    kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.setDataAtIndex(1, i, cellData);
                } else if ((new Date(curData.LABEL.Date)).compareOnlyDate(startDate) > 0 && (new Date(curData.LABEL.Date)).compareOnlyDate(endDate) === 0) {
                    cellData = {
                        "CELL": {
                            "skin": "sknFlexMobsavedRightBar"
                        },
                        "data": {
                            "CellData": {},
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
                    kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.setDataAtIndex(1, i, cellData);
                } else {
                    var lblskin = "";
                    if (curData.LABEL.isMothDay === false) {
                        lblskin = kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.labelSkinNotBelongsINmonth;
                    } else {
                        lblskin = kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.labelSkinBelongsINmonth;
                    }
                    cellData = {
                        "CELL": {
                            "skin": "sknFlxMobFFFFFFOp100"
                        },
                        "data": {
                            "CellData": {},
                            "TYPE": ""
                        },
                        "IMAGE": {
                            "isVisible": false,
                            "src": ""
                        },
                        "LABEL": {
                            "skin": lblskin
                        }
                    };
                    kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.setDataAtIndex(1, i, cellData);
                    kony.print("-----cellData---" + i + "---" + JSON.stringify(curData));
                }
            }
        }
    } else if (startDate !== null && startDate !== undefined) {
        var cellData1;
        for (var k = 0; k < 42; k++) {
            var curData1 = kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.getCelldataAtIndex(k);
            if (new Date(curData1.LABEL.Date).compareOnlyDate(startDate) === 0) {
                cellData1 = {
                    "CELL": {
                        "skin": "sknFlxOneDay"
                    },
                    "data": {
                        "CellData": {},
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
                kony.apps.ess.myLeave.calendarUI.demo_calendar_Widget.setDataAtIndex(1, k, cellData1);
            }
        }
    }

};



kony.apps.ess.myLeave.calendarUI.prototype.callbackMonthChangeFunction = function(month, year, index) {
    (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).getLeaveDashboardData();
};

kony.apps.ess.myLeave.calendarUI.prototype.callbackRefershTotalcalendarFucntion = function(month, year) {
    (new kony.apps.coe.ess.myLeaveTab.MyLeaveDashboard()).getLeaveDashboardData();
};