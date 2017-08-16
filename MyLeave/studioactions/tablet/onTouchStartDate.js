function onTouchStartDate(eventobject, x, y) {
    return AS_Label_c94a47d127e7466684a4aaa0cb414d1a(eventobject, x, y);
}

function AS_Label_c94a47d127e7466684a4aaa0cb414d1a(eventobject, x, y) {
    frmHistory.flxCalendar.setVisibility(true);
    frmHistory.flxFilter.setVisibility(false);
    kony.apps.coe.myLeave.leaveHistory.startDateRef = frmHistory.lblFromCal;
    (new kony.apps.ess.myLeave.historyCalendarUI(frmHistory.lblFromCal)).addDynamicCalendar();
}