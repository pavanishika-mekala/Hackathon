function OnClickRejectMultiSelectTab(eventobject) {
    return AS_Button_c49862d46a084dd797bd5a994e44dd9b(eventobject);
}

function AS_Button_c49862d46a084dd797bd5a994e44dd9b(eventobject) {
    kony.apps.coe.ess.Approvals.MultiSelect.getSelectedID(frmMultiSelection.SegDetails.selectedRowItems, "1");
    showApprovalHome();
}