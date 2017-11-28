function onClickSubmitCalendarView(eventobject, x, y) {
    return AS_Button_gae8868c3c944861ba8091890f3f328f(eventobject, x, y);
}

function AS_Button_gae8868c3c944861ba8091890f3f328f(eventobject, x, y) {
    kony.apps.coe.ess.myTime.time_entry_retrieval_common.checkForSubmit = true;
    kony.apps.coe.ess.myTime.time_entry_retrieval_common.dayCounter = 0;
    (new kony.apps.coe.ess.myTime.time_entry_retrieval_common()).checkForSubmitStatus();
}