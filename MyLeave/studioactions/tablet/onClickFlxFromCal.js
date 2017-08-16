function onClickFlxFromCal(eventobject) {
    return AS_FlexContainer_509dfba3ec2a41f9a115b39dc3ea097c(eventobject);
}

function AS_FlexContainer_509dfba3ec2a41f9a115b39dc3ea097c(eventobject) {
    kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.myLeave.PleaseWait"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    frmTabApplyLeave.lblFrmCal.skin = sknlbldateselectfocus;
    frmTabApplyLeave.flxOverlay.setVisibility(false);
    (new kony.apps.ess.myLeave.calendarUI(frmTabApplyLeave.lblFrmCal)).addDynamicCalendar();
}