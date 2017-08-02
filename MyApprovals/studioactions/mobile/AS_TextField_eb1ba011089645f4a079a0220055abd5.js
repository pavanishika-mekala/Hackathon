function AS_TextField_eb1ba011089645f4a079a0220055abd5(eventobject, changedtext) {
    var searchText = frmApprovalHome.tbxLaterFilter.text;
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeSearch(searchText, kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter();
}