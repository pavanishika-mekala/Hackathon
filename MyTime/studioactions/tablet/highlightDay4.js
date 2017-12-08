function highlightDay4(eventobject) {
    return AS_FlexContainer_c5d4c0364b424969a108dcbc7150c6c1(eventobject);
}

function AS_FlexContainer_c5d4c0364b424969a108dcbc7150c6c1(eventobject) {
    var day = frmCalendarView.lblDay4.text;
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).showTimeSheetDetailsDaybyDay(day);
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).setSkins(day, "Day4");
}