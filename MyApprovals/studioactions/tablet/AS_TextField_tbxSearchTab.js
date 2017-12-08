function AS_TextField_tbxSearchTab(eventobject, changedtext) {
    return AS_TextField_a2b16373b7ad4f34bfb58dbd078f8c34(eventobject, changedtext);
}

function AS_TextField_a2b16373b7ad4f34bfb58dbd078f8c34(eventobject, changedtext) {
    var searchText = frmApprovalHome.tbxSearch.text;
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeSearch(searchText, kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter();
}