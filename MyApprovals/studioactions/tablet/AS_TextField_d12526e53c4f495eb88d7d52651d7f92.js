function AS_TextField_d12526e53c4f495eb88d7d52651d7f92(eventobject, changedtext) {
    var searchText = frmApprovalHome.tbxLaterFilter.text;
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeSearch(searchText, kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter();
}