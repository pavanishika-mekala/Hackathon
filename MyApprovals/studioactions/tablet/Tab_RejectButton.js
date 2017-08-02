function Tab_RejectButton(eventobject) {
    return AS_FlexContainer_d5761677f9e246d18737f8674b99b5a1(eventobject);
}

function AS_FlexContainer_d5761677f9e246d18737f8674b99b5a1(eventobject) {
    kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.rejectRequest(selectedApprovalID);
}