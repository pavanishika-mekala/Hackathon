function ActionOnApproveClickInList(eventobject) {
    return AS_FlexContainer_c130255cfbc240ad837d1cd8c21fca5d(eventobject);
}

function AS_FlexContainer_c130255cfbc240ad837d1cd8c21fca5d(eventobject) {
    (new kony.apps.coe.ess.Approvals.getApprovalsRequestList()).onClickApprove();
}