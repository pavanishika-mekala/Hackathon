function action_Reject(eventobject) {
    return AS_FlexContainer_14a8f30e31734c438a593640c7ab26ca(eventobject);
}

function AS_FlexContainer_14a8f30e31734c438a593640c7ab26ca(eventobject) {
    kony.apps.coe.ess.Approvals.ApprovalRequests.tabDataoperations.rejectRequest(selectedApprovalID);
}