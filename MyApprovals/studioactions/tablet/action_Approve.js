function action_Approve(eventobject) {
    return AS_FlexContainer_8b216d0de3b740cba982d28f6610c088(eventobject);
}

function AS_FlexContainer_8b216d0de3b740cba982d28f6610c088(eventobject) {
    kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.approveRequest(selectedApprovalID);
}