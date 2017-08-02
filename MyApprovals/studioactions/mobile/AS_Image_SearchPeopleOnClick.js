function AS_Image_SearchPeopleOnClick(eventobject, x, y) {
    return AS_Image_81f7aa90fcfc4247ba8087a4b07b4a4d(eventobject, x, y);
}

function AS_Image_81f7aa90fcfc4247ba8087a4b07b4a4d(eventobject, x, y) {
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeHasApprovalRequests(kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter();
}