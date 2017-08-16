/**
 * @module CalendarTabUI 
 * @Author Jayaram.Garre
 * @category UI/actions 
 * @description 
 * © 2016 Kony Inc. 
 */
// Region - namespaces. 
kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.ess = kony.apps.ess || {};
kony.apps.ess.myLeaveTabUI = kony.apps.ess.myLeaveTabUI || {};

// Region - Class / object constructor.
/**
 * @class CalendarTabUI
 * Contains the UI actions and the functions for the dynamic calendar
 */
kony.apps.ess.myLeaveTabUI.CalendarTabUI = function() {
  kony.print("-- Start CalendarTabUI --");
  //kony.apps.ess.myLeaveTabUI.CalendarTabUI.labelWidget ="";
  kony.print("-- End CalendarTabUI --");
  //CalendarTabUI();
};


kony.apps.ess.myLeaveTabUI.CalendarTabUI.prototype.addDynamicCalendar = function() {
  //frmMyShiftDashboard.flxCalendar.skin="CopyslFbox0b4e899c7d8924b";
  var currDate = new Date();
  kony.apps.ess.myLeaveTabUI.CalendarTabUI.demo_calendar_Widget = new kony.apps.ess.myLeaveTabUI.Reusable.calendarWIDGET(currDate.getMonth(),currDate.getFullYear(),"flxCalendar","sknFlxMobOp0","sknFlxFocus","sknFlxMobOp0","sknFlxMobOp100BgColD8F4FF","sknBtnMobBg0OpFC777777Op100S79","sknBtnMobOp100Bg2EBAEFFcFFFFFF","sknLblMobFC333333Op100FS90","sknBtnMobBg0OpFC333333Op100S24px","sknBtnMobBg0OpFCC3C4CCOp100S24px",this.isValidMonthandYearforCalendarCallBackFunction,this.errorcallbackIsValidMonthandYearCallBackFunction,this.onswipeCallBackFunction,this.onTouchEndCallBackFuntion,this.callbackMonthChangeFunction,this.callbackRefershTotalcalendarFucntion);
  frmMyShiftDashboard.flxCalendar.add(kony.apps.ess.myLeaveTabUI.CalendarTabUI.demo_calendar_Widget.getcalendar());
  //kony.application.dismissLoadingScreen();
};


kony.apps.ess.myLeaveTabUI.CalendarTabUI.prototype.isValidMonthandYearforCalendarCallBackFunction = function(month,year) {
  return true;
};

kony.apps.ess.myLeaveTabUI.CalendarTabUI.prototype.errorcallbackIsValidMonthandYearCallBackFunction = function(month, year) {

};

kony.apps.ess.myLeaveTabUI.CalendarTabUI.prototype.onswipeCallBackFunction = function() {

};


kony.apps.ess.myLeaveTabUI.CalendarTabUI.prototype.onTouchEndCallBackFuntion = function(data) {
  var dateLabel = data.LABEL.Date;//(dateLabel);
  //var format = new kony.apps.ess.myLeaveTabUI.formattingDate();
  //dateLabel = format.toFormatTabDateCal(dateLabel);
  //var tt = kony.apps.ess.myLeaveTabUI.CalendarTabUI.labelWidget;
  //tt.text = dateLabel;

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
      "skin": "sknBtnMobOp100Bg2EBAEFFcFFFFFF"
    }
  };

  kony.apps.ess.myLeaveTabUI.CalendarTabUI.demo_calendar_Widget.resetTotalcalendarUI();
  var index= kony.apps.ess.myLeaveTabUI.CalendarTabUI.demo_calendar_Widget.getIndexByDate(new Date(dateLabel));
  kony.apps.ess.myLeaveTabUI.CalendarTabUI.demo_calendar_Widget.setCellStatus(index, cellData);
    //var taxtimerid="AnimationInitTimer";
        //var taxwait = 3;
        //kony.timer.schedule(taxtimerid,taxwait,false);

    //function closeCalendar() {
  frmMyShiftDashboard.flxCalendar.skin="slFbox";
  frmMyShiftDashboard.flxCalendar.setVisibility(false);


  frmMyShiftDashboard.flxCalendar.removeAll();
  if(frmMyShiftDashboard.flxCalendar.text!==""){
    var endDatearr = format.getSelectedMonthYear(dateLabel);
    var endDay = endDatearr[0];
    var endMonth =  endDatearr[1];
    var endYear = endDatearr[2];
    var startDatearr = format.getSelectedMonthYear(frmMyShiftDashboard.flxCalendar.text);
    var startDay = startDatearr[0];
    var startMonth =  startDatearr[1];
    var startYear = startDatearr[2];
    kony.print("startYear::"+startYear+", startMonth::"+startMonth+", startDay::"+startDay+", endYear::"+endYear+", endMonth::"+endMonth+", endDay::"+endDay);
    var dateObj = new kony.apps.ess.myLeaveTabUI.tabFilterActions();
    dateObj.filterBetweenDates(startYear, startMonth, startDay, endYear, endMonth, endDay);

  }

  //}
};
kony.apps.ess.myLeaveTabUI.CalendarTabUI.prototype.callbackMonthChangeFunction = function(month, year, index) {

};

kony.apps.ess.myLeaveTabUI.CalendarTabUI.prototype.callbackRefershTotalcalendarFucntion = function(month, year) {

};