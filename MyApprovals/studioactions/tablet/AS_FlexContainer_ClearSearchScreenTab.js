function AS_FlexContainer_ClearSearchScreenTab(eventobject) {
    return AS_FlexContainer_h2db943fcb604a7b8b7cc3e50196517f(eventobject);
}

function AS_FlexContainer_h2db943fcb604a7b8b7cc3e50196517f(eventobject) {
    kony.apps.coe.ess.Approvals.frmSearch.onClickFilterClearSearch();
    kony.apps.coe.ess.Approvals.frmSearch.refreshData();
}