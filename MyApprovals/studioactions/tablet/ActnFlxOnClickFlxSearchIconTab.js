function ActnFlxOnClickFlxSearchIconTab(eventobject) {
    return AS_FlexContainer_ac061280a7a84fe2960d1da014a2a654(eventobject);
}

function AS_FlexContainer_ac061280a7a84fe2960d1da014a2a654(eventobject) {
    kony.apps.coe.ess.Approvals.DynamicSegmentSetDatabyEmployeeHasApprovalRequests(kony.apps.coe.ess.globalVariables.FrmApprovalsPeopleSearch);
    frmTabListView.flxEmployeeSearch.setVisibility(true);
}