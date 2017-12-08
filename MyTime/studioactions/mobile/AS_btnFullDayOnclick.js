function AS_btnFullDayOnclick(eventobject) {
    return AS_Button_ca98f3c27e0941dd90fdbe0995ae2ffa(eventobject);
}

function AS_Button_ca98f3c27e0941dd90fdbe0995ae2ffa(eventobject) {
    kony.apps.coe.ess.myTime.TimesheetCreate.storeSlider();
    var sliderObj = (new kony.apps.coe.Reusable.TimelineCreation());
    kony.apps.coe.ess.myTime.TimesheetCreate.HoursFullDayHalfDaySelection.onClickOfFullDay(sliderObj.fillFullDay);
    kony.apps.coe.ess.globalVariables.fullDayButtonisSelected = true;
}