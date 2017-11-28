function AS_Form_b435f3486e5540b9b0245681d9e2f589(eventobject) {
    var onFrmCalendarViewPreshowObj = new kony.apps.coe.ess.myTime.CalendarViewUI();
    onFrmCalendarViewPreshowObj.getCalendarViewData();
    //#ifdef windows8
    onFrmCalendarViewPreshowObj.addCalendarOnHome();
    onFrmCalendarViewPreshowObj.isValidMonthandYearforCalender();
    //#endif
    //(new kony.apps.coe.ess.myTime.CalendarViewUI()).populateInitialData(new Date());
}