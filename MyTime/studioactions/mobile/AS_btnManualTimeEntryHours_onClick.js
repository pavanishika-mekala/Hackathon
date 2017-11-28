function AS_btnManualTimeEntryHours_onClick(eventobject) {
    return AS_Button_15750e8c69b84e83ab4f8b61c5194853(eventobject);
}

function AS_Button_15750e8c69b84e83ab4f8b61c5194853(eventobject) {
    kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.onClickOfHours(kony.apps.coe.Reusable.TimelineCreation.onClickOfHours);
    kony.apps.coe.ess.globalVariables.fullDayButtonisSelected = false;
}