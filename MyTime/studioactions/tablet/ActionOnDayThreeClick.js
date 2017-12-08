function ActionOnDayThreeClick(eventobject) {
    return AS_FlexContainer_47a5fbb55a61461fa2ebe70122f96ed5(eventobject);
}

function AS_FlexContainer_47a5fbb55a61461fa2ebe70122f96ed5(eventobject) {
    var date_object = frmCalendarView.flxDay3.dateobject;
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).showTimeSheetDetailsDaybyDay(date_object);
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).setSkins("Day3");
}