function AS_Label_e01b92450a424b57ba6157b8fc2915d0(eventobject, x, y) {
    frmHistory.flxCalendar.setVisibility(true);
    frmHistory.flxFilter.setVisibility(false);
    kony.apps.coe.myLeave.leaveHistory.startDateRef = frmHistory.lblFromDate;
    (new kony.apps.ess.myLeave.historyCalendarUI(frmHistory.lblFromDate)).addDynamicCalendar();
}