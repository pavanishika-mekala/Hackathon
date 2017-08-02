function actWinListSearch(eventobject) {
    return AS_FlexContainer_35e8e9b567bc404ea6ddf4253525ec6e(eventobject);
}

function AS_FlexContainer_35e8e9b567bc404ea6ddf4253525ec6e(eventobject) {
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeHasApprovalRequests(kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    frmTabListView.flxEmployeeSearch.setVisibility(true);
}