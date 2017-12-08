function frmCalendarViewPreshow(eventobject) {
    return AS_Form_eb1ad0c82e12436bb64350e4b7604e03(eventobject);
}

function AS_Form_eb1ad0c82e12436bb64350e4b7604e03(eventobject) {
    var onFrmCalendarViewPreshowObj = new kony.apps.coe.ess.myTime.CalendarViewUI();
    onFrmCalendarViewPreshowObj.getCalendarViewData();
    //#ifdef windows8
    onFrmCalendarViewPreshowObj.addCalendarOnHome();
    onFrmCalendarViewPreshowObj.isValidMonthandYearforCalender();
    //#endif
    //(new kony.apps.coe.ess.myTime.CalendarViewUI()).populateInitialData(new Date());
}