function AS_TextField_b8c388c816224da38d6accf22a8cdbf0(eventobject, changedtext) {
    var searchText = frmApprovalHome.tbxSearch.text;
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeSearch(searchText, kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter();
}