function actionbtnHoursOnCLick(eventobject) {
    return AS_Button_dfaae0e98cb74a3dbecb47b349cff20f(eventobject);
}

function AS_Button_dfaae0e98cb74a3dbecb47b349cff20f(eventobject) {
    kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelectionTab.onClickOfHoursTab(kony.apps.coe.Reusable.TimelineCreationTab.onClickOfHoursTab);
    kony.apps.coe.ess.globalVariables.fullDayButtonisSelected = false;
}