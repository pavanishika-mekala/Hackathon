function AS_Label_f6632a8e44884b85ac34b234b126f905(eventobject, x, y) {
    frmHistory.flxCalendar.setVisibility(true);
    frmHistory.flxFilter.setVisibility(false);
    kony.apps.coe.myLeave.leaveHistory.endDateRef = frmHistory.lblToDate;
    (new kony.apps.ess.myLeave.historyCalendarUI(frmHistory.lblToDate)).addDynamicCalendar();
}