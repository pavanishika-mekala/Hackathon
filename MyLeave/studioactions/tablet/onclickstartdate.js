function onclickstartdate(eventobject, x, y) {
    return AS_Label_95475796ae8f44ce8721903708e2fa5f(eventobject, x, y);
}

function AS_Label_95475796ae8f44ce8721903708e2fa5f(eventobject, x, y) {
    frmTabApplyLeave.lblFrmCal.skin = sknlbldateselectfocus;
    frmTabApplyLeave.flxOverlay.setVisibility(false);
    frmTabApplyLeave.flxCalendar.setVisibility(true);
    (new kony.apps.ess.myLeave.calendarUI(frmTabApplyLeave.lblFrmCal)).addDynamicCalendar();
}