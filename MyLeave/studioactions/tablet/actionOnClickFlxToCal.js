function actionOnClickFlxToCal(eventobject) {
    return AS_FlexContainer_1c954f3905d74a1db3bcdf107da03cc6(eventobject);
}

function AS_FlexContainer_1c954f3905d74a1db3bcdf107da03cc6(eventobject) {
    kony.application.showLoadingScreen("", kony.i18n.getLocalizedString("i18n.ess.myLeave.PleaseWait"), constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    frmTabApplyLeave.lblToCal.skin = sknlbldateselectfocus;
    frmTabApplyLeave.flxOverlay.setVisibility(false);
    frmTabApplyLeave.flxCalendar.setVisibility(false);
    (new kony.apps.ess.myLeave.calendarUI(frmTabApplyLeave.lblToCal)).addDynamicCalendar();
}