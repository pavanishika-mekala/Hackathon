function highlightDay1(eventobject) {
    return AS_FlexContainer_a1c85196ed50417da36e14eb99d674ce(eventobject);
}

function AS_FlexContainer_a1c85196ed50417da36e14eb99d674ce(eventobject) {
    var day = frmCalendarView.lblDay1.text;
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).showTimeSheetDetailsDaybyDay(day);
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).setSkins(day, "Day1");
}