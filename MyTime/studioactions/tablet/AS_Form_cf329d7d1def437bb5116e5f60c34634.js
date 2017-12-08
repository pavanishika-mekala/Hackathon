function AS_Form_cf329d7d1def437bb5116e5f60c34634(eventobject) {
    var onFrmCalendarViewPreshowObj = new kony.apps.coe.ess.myTime.CalendarViewUI();
    onFrmCalendarViewPreshowObj.getCalendarViewData();
    //#ifdef windows8
    onFrmCalendarViewPreshowObj.addCalendarOnHome();
    onFrmCalendarViewPreshowObj.isValidMonthandYearforCalender();
    //#endif
    //(new kony.apps.coe.ess.myTime.CalendarViewUI()).populateInitialData(new Date());
}