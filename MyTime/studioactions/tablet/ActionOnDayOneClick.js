function ActionOnDayOneClick(eventobject) {
    return AS_FlexContainer_4d6e9df137374bef82e9e7794c825c6a(eventobject);
}

function AS_FlexContainer_4d6e9df137374bef82e9e7794c825c6a(eventobject) {
    var date_object = frmCalendarView.flxDay1.dateobject;
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).showTimeSheetDetailsDaybyDay(date_object);
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).setSkins("Day1");
}