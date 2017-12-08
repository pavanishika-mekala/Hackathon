function AS_TextField_ad5d95ef84a74d3d854e218e70211171(eventobject, changedtext) {
    var searchText = frmApprovalHome.tbxSearch.text;
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeSearch(searchText, kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    kony.apps.coe.ess.Approvals.ApprovalsHome.showEmployeeFilter();
}