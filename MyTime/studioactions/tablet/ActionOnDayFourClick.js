function ActionOnDayFourClick(eventobject) {
    return AS_FlexContainer_b1a5b530c5c24ba890d612cabb5a5488(eventobject);
}

function AS_FlexContainer_b1a5b530c5c24ba890d612cabb5a5488(eventobject) {
    var date_object = frmCalendarView.flxDay4.dateobject;
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).showTimeSheetDetailsDaybyDay(date_object);
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).setSkins("Day4");
}