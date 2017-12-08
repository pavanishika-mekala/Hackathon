function actionOnClickOfCancelDelegationRequests(eventobject, x, y) {
    return AS_FlexContainer_2e13db56499b462cb4b8bda30e419425(eventobject, x, y);
}

function AS_FlexContainer_2e13db56499b462cb4b8bda30e419425(eventobject, x, y) {
    frmDelegationRequests.flxNewDelegationRequests.setVisibility(false);
    frmDelegationRequests.forceLayout();
    frmDelegationRequests.flxMain.setVisibility(true);
    frmDelegationRequests.forceLayout();
}