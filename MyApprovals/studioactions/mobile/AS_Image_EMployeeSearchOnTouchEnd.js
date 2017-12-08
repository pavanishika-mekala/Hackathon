function AS_Image_EMployeeSearchOnTouchEnd(eventobject, x, y) {
    return AS_Image_5bfd83cdca4e4c4dbc07b57a9ad30970(eventobject, x, y);
}

function AS_Image_5bfd83cdca4e4c4dbc07b57a9ad30970(eventobject, x, y) {
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeHasApprovalRequests(kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter();
}