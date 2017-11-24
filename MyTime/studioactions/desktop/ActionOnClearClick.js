function ActionOnClearClick(eventobject) {
    return AS_FlexContainer_aff63a44cde14aebbac81101488a4e3f(eventobject);
}

function AS_FlexContainer_aff63a44cde14aebbac81101488a4e3f(eventobject) {
    frmCreateViewDW.flxBlank.setVisibility(true);
    frmCreateViewDW.flxTask.setVisibility(false);
    frmCreateViewDW.flxDiscardTimesheetPopup.setVisibility(true);
    frmCreateViewDW.forceLayout();
}