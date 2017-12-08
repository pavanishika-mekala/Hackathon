kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.myLeave = kony.apps.ess.myLeave || {};

// Region - Class / object constructor.

/**
 * @class calendarUI
 * Contains the UI actions and the functions for the dynamic calendar
 */
kony.apps.ess.myLeave.historyCalendarUI = function(ll) {
    kony.print("-- Start calendarUI --");
    kony.apps.ess.myLeave.historyCalendarUI.labelWidget = ll;
    kony.print("-- End calendarUI --");
};

kony.apps.ess.myLeave.historyCalendarUI.prototype.addDynamicCalendar = function() {
    kony.print("-- SHWETA Start addDynamicCalendar --");
    var currDate = new Date();
    kony.application.showLoadingScreen("", "loading calendar", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    //#ifdef windows8 
    if (kony.apps.ess.myLeave.historyCalendarUI.labelWidget === kony.apps.coe.myLeave.leaveHistory.startDateRef) {
        frmHistory.flxCalendar1.setVisibility(true);
        kony.apps.ess.myLeave.historyCalendarUI.demo_calendar_Widget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear(), "flxCalendar1", "sknFlxMobOp0", "sknFlxFocus", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS90", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFCC3C4CCOp100S24px", this.isValidMonthandYearforCalendarCallBackFunction, this.errorcallbackIsValidMonthandYearCallBackFunction, this.onswipeCallBackFunction, this.onTouchEndCallBackFuntion, this.callbackMonthChangeFunction, this.callbackRefershTotalcalendarFucntion);
        frmHistory.flxCalendar1.add(kony.apps.ess.myLeave.historyCalendarUI.demo_calendar_Widget.getcalendar());

    } else {
        frmHistory.flxCalendar2.setVisibility(true);
        kony.apps.ess.myLeave.historyCalendarUI.demo_calendar_Widget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear(), "flxCalendar2", "sknFlxMobOp0", "sknFlxFocus", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS90", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFCC3C4CCOp100S24px", this.isValidMonthandYearforCalendarCallBackFunction, this.errorcallbackIsValidMonthandYearCallBackFunction, this.onswipeCallBackFunction, this.onTouchEndCallBackFuntion, this.callbackMonthChangeFunction, this.callbackRefershTotalcalendarFucntion);
        frmHistory.flxCalendar2.add(kony.apps.ess.myLeave.historyCalendarUI.demo_calendar_Widget.getcalendar());

    }
    //#endif
    //#ifndef windows8
    kony.apps.ess.myLeave.historyCalendarUI.demo_calendar_Widget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear(), "flxCalendar", "sknFlxMobOp0", "sknFlxFocus", "sknFlxMobOp0", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS90", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFCC3C4CCOp100S24px", this.isValidMonthandYearforCalendarCallBackFunction, this.errorcallbackIsValidMonthandYearCallBackFunction, this.onswipeCallBackFunction, this.onTouchEndCallBackFuntion, this.callbackMonthChangeFunction, this.callbackRefershTotalcalendarFucntion);
    if ((frmHistory.flxCalendar.widgets()).length > 0) {
        frmHistory.flxCalendar.setVisibility(true);
        frmHistory.flxFilter.setVisibility(false);
    } else {
        frmHistory.flxCalendar.add(kony.apps.ess.myLeave.historyCalendarUI.demo_calendar_Widget.getcalendar());
    }
    //#endif
    kony.application.dismissLoadingScreen();
};


kony.apps.ess.myLeave.historyCalendarUI.prototype.isValidMonthandYearforCalendarCallBackFunction = function(month, year) {
    return true;
};

kony.apps.ess.myLeave.historyCalendarUI.prototype.errorcallbackIsValidMonthandYearCallBackFunction = function(month, year) {

};

kony.apps.ess.myLeave.historyCalendarUI.prototype.onswipeCallBackFunction = function() {

};


kony.apps.ess.myLeave.historyCalendarUI.prototype.onTouchEndCallBackFuntion = function(data) {
    var dateLabel = data.LABEL.Date; //(dateLabel);
    var format = new kony.apps.ess.myLeave.formattingDate();
    dateLabel = format.toFormatTabDateCal(dateLabel);
    var selectedWidgetRef = kony.apps.ess.myLeave.historyCalendarUI.labelWidget;
    selectedWidgetRef.text = dateLabel;
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
            "skin": "sknLblHistroyDateUnselected"
        }
    };

    kony.apps.ess.myLeave.historyCalendarUI.demo_calendar_Widget.resetTotalcalendarUI();
    var index = kony.apps.ess.myLeave.historyCalendarUI.demo_calendar_Widget.getIndexByDate(new Date(dateLabel));
    kony.apps.ess.myLeave.historyCalendarUI.demo_calendar_Widget.setCellStatus(index, cellData);
    selectedWidgetRef.skin = "sknLblHistroyDateUnselected";
    if (selectedWidgetRef === kony.apps.coe.myLeave.leaveHistory.startDateRef) {
        startDateSelected = true;
    } else if (selectedWidgetRef === kony.apps.coe.myLeave.leaveHistory.endDateRef) {
        endDateSelected = true;

    }
    //#ifndef windows8
    frmHistory.flxCalendar.setVisibility(false);
    frmHistory.flxFilter.setVisibility(true);
    //#endif
    //#ifdef windows8
    if (selectedWidgetRef === kony.apps.coe.myLeave.leaveHistory.startDateRef) {
        frmHistory.flxCalendar1.removeAll();
        frmHistory.flxCalendar1.setVisibility(false);
    } else if (selectedWidgetRef === kony.apps.coe.myLeave.leaveHistory.endDateRef) {
        frmHistory.flxCalendar2.removeAll();
        frmHistory.flxCalendar2.setVisibility(false);
    }
    //#endif
};
kony.apps.ess.myLeave.historyCalendarUI.prototype.callbackMonthChangeFunction = function(month, year, index) {

};

kony.apps.ess.myLeave.historyCalendarUI.prototype.callbackRefershTotalcalendarFucntion = function(month, year) {

};