function actionOnClickOfAddNewDelegationRequests(eventobject, x, y) {
    return AS_FlexContainer_2be34fa7889943ea97b82f7b50d32809(eventobject, x, y);
}

function AS_FlexContainer_2be34fa7889943ea97b82f7b50d32809(eventobject, x, y) {
    frmDelegationRequests.flxNewDelegationRequests.setVisibility(true);
    frmDelegationRequests.forceLayout();
    frmDelegationRequests.flxMain.setVisibility(false);
    frmDelegationRequests.forceLayout();
}