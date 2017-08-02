function actionflxRejectOnClick(eventobject) {
    return AS_FlexContainer_6cdab900e2b54471a2c6789a384796e0(eventobject);
}

function AS_FlexContainer_6cdab900e2b54471a2c6789a384796e0(eventobject) {
    kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.rejectRequest(selectedApprovalID);
}