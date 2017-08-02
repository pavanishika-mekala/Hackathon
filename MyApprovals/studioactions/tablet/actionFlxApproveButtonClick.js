function actionFlxApproveButtonClick(eventobject) {
    return AS_FlexContainer_7ce6aaa4cf714042b6337e290102ce73(eventobject);
}

function AS_FlexContainer_7ce6aaa4cf714042b6337e290102ce73(eventobject) {
    kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.approveRequest(selectedApprovalID);
}