function highlightDay3(eventobject) {
    return AS_FlexContainer_eaf10995f54f49cda2af25ad75bf5ec7(eventobject);
}

function AS_FlexContainer_eaf10995f54f49cda2af25ad75bf5ec7(eventobject) {
    var day = frmCalendarView.lblDay3.text;
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).showTimeSheetDetailsDaybyDay(day);
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).setSkins(day, "Day3");
}