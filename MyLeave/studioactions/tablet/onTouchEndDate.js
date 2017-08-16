function onTouchEndDate(eventobject, x, y) {
    return AS_Label_bb38472606294f85a388dd8c2dc50354(eventobject, x, y);
}

function AS_Label_bb38472606294f85a388dd8c2dc50354(eventobject, x, y) {
    frmHistory.flxCalendar.setVisibility(true);
    frmHistory.flxFilter.setVisibility(false);
    kony.apps.coe.myLeave.leaveHistory.endDateRef = frmHistory.lblToCal;
    (new kony.apps.ess.myLeave.historyCalendarUI(frmHistory.lblToCal)).addDynamicCalendar();
}