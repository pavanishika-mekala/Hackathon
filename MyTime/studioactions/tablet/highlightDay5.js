function highlightDay5(eventobject) {
    return AS_FlexContainer_a2113bc1073a41e898403de3b3d97e12(eventobject);
}

function AS_FlexContainer_a2113bc1073a41e898403de3b3d97e12(eventobject) {
    var day = frmCalendarView.lblDay5.text;
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).showTimeSheetDetailsDaybyDay(day);
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).setSkins(day, "Day5");
}