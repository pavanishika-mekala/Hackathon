function AS_btnManualTimeEntryFullDay_onClick(eventobject) {
    return AS_Button_b8372992a7e94c8ab5f42e720d7c927d(eventobject);
}

function AS_Button_b8372992a7e94c8ab5f42e720d7c927d(eventobject) {
    var sliderObj = (new kony.apps.coe.Reusable.TimelineCreation());
    kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.onClickOfFullDay(sliderObj.fillFullDay);
    kony.apps.coe.ess.globalVariables.fullDayButtonisSelected = true;
    frmTimeSheetCreate.tbxManualEntryhours.text = "8";
}