function highlightDay2(eventobject) {
    return AS_FlexContainer_bfc45d9f06c14e43bef02e506a8a8da7(eventobject);
}

function AS_FlexContainer_bfc45d9f06c14e43bef02e506a8a8da7(eventobject) {
    var day = frmCalendarView.lblDay2.text;
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).showTimeSheetDetailsDaybyDay(day);
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).setSkins(day, "Day2");
}