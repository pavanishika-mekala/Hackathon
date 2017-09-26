function onClickApproveMultiSelectTab(eventobject) {
    return AS_Button_gf599545504b4f9eb11762283108c327(eventobject);
}

function AS_Button_gf599545504b4f9eb11762283108c327(eventobject) {
    kony.apps.coe.ess.Approvals.MultiSelect.getSelectedID(frmMultiSelection.SegDetails.selectedRowItems, "0");
    showApprovalHome();
}