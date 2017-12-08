function AS_Button_jc5db70d7d06432895945a0ba3577f7f(eventobject) {
    var sliderObj = (new kony.apps.coe.Reusable.TimelineCreation());
    kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.onClickOfFullDay(sliderObj.fillFullDay);
    kony.apps.coe.ess.globalVariables.fullDayButtonisSelected = true;
    frmTimeSheetCreate.tbxManualEntryhours.text = "8";
}