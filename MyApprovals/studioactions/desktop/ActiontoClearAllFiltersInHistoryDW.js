function ActiontoClearAllFiltersInHistoryDW(eventobject) {
    return AS_Button_d35a8e5635354a878cdee28455b9cbad(eventobject);
}

function AS_Button_d35a8e5635354a878cdee28455b9cbad(eventobject) {
    //(new kony.apps.coe.ess.frmFilterHistoryUIDW()).onClickClearAll();
    kony.apps.coe.ess.ApprovalHistoryDW.clearAll();
}