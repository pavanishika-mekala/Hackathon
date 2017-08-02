function AS_FlexContainer_ClearSearchScreen(eventobject) {
    return AS_FlexContainer_92392c6f69a948f5b1e0c48e7a003b19(eventobject);
}

function AS_FlexContainer_92392c6f69a948f5b1e0c48e7a003b19(eventobject) {
    kony.apps.coe.ess.Approvals.frmSearch.onClickFilterClearSearch();
    kony.apps.coe.ess.Approvals.frmSearch.refreshData();
}