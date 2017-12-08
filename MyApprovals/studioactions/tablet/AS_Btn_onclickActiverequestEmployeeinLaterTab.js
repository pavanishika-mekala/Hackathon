function AS_Btn_onclickActiverequestEmployeeinLaterTab(eventobject) {
    return AS_Button_a70eded5aadc43ae96ff5039413422c7(eventobject);
}

function AS_Button_a70eded5aadc43ae96ff5039413422c7(eventobject) {
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeHasApprovalRequests(kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter();
}