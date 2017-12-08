function AS_TextField_tbxSearch(eventobject, changedtext) {
    return AS_TextField_7531091e1f424cf2a4dbf222e2815c95(eventobject, changedtext);
}

function AS_TextField_7531091e1f424cf2a4dbf222e2815c95(eventobject, changedtext) {
    var searchText = frmApprovalHome.tbxSearch.text;
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeSearch(searchText, kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter();
}