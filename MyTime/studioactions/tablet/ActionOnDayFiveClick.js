function ActionOnDayFiveClick(eventobject) {
    return AS_FlexContainer_3b37a114f1e042d580cdaa79cbad309a(eventobject);
}

function AS_FlexContainer_3b37a114f1e042d580cdaa79cbad309a(eventobject) {
    var date_object = frmCalendarView.flxDay5.dateobject;
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).showTimeSheetDetailsDaybyDay(date_object);
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).setSkins("Day5");
}