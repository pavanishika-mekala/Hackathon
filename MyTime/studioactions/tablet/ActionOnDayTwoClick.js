function ActionOnDayTwoClick(eventobject) {
    return AS_FlexContainer_2ace0fd95285408b886c281ece9b7de1(eventobject);
}

function AS_FlexContainer_2ace0fd95285408b886c281ece9b7de1(eventobject) {
    var date_object = frmCalendarView.flxDay2.dateobject;
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).showTimeSheetDetailsDaybyDay(date_object);
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).setSkins("Day2");
}