function Tab_ApproveBtn(eventobject) {
    return AS_FlexContainer_f4c78230d4794551a17ee58fa0df0cf1(eventobject);
}

function AS_FlexContainer_f4c78230d4794551a17ee58fa0df0cf1(eventobject) {
    kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.approveRequest(selectedApprovalID);
}