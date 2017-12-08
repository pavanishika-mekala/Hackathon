function actionOnDeletePendingLeave(eventobject) {
    return AS_FlexContainer_d9905bfc6c604c83ae25c382ebe1197e(eventobject);
}

function AS_FlexContainer_d9905bfc6c604c83ae25c382ebe1197e(eventobject) {
    (new kony.apps.coe.ess.myLeave.tabPendingLeaveRequestUI()).deleteLeave();
}