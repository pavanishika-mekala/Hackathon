function AS_Btn_onclickActiverequestEmployee(eventobject) {
    return AS_Button_543c048c4f344998b6ffc480c60f1521(eventobject);
}

function AS_Button_543c048c4f344998b6ffc480c60f1521(eventobject) {
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeHasApprovalRequests(kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter();
}