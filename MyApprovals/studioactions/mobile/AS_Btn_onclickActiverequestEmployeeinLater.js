function AS_Btn_onclickActiverequestEmployeeinLater(eventobject) {
    return AS_Button_c9df5be044bb4fc3b06cfecc2da9777f(eventobject);
}

function AS_Button_c9df5be044bb4fc3b06cfecc2da9777f(eventobject) {
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeHasApprovalRequests(kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter();
}