function actionFullDaysOnCLick(eventobject) {
    return AS_Button_d49818ee9b704f2b8ceac3c991a26d8f(eventobject);
}

function AS_Button_d49818ee9b704f2b8ceac3c991a26d8f(eventobject) {
    kony.apps.coe.ess.myTime.TimesheetCreate.storeSliderTab();
    var sliderObj = (new kony.apps.coe.Reusable.TimelineCreationTab());
    kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelectionTab.onClickOfFullDayTab(sliderObj.fillFullDayTab);
    kony.apps.coe.ess.globalVariables.fullDayButtonisSelected = true;
}