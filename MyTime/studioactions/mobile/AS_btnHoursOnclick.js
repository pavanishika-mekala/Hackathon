function AS_btnHoursOnclick(eventobject) {
    return AS_Button_ecc47f12bf814efc9e91381c299a546e(eventobject);
}

function AS_Button_ecc47f12bf814efc9e91381c299a546e(eventobject) {
    kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.onClickOfHours(kony.apps.coe.Reusable.TimelineCreation.onClickOfHours);
    kony.apps.coe.ess.globalVariables.fullDayButtonisSelected = false;
    //kony.apps.coe.ess.myTime.TimesheetCreate.revertSlider();
}