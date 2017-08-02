function onClickApproveMultiSelect(eventobject) {
    return AS_Button_3dbc2db2f9d048859f324e6fe98688ad(eventobject);
}

function AS_Button_3dbc2db2f9d048859f324e6fe98688ad(eventobject) {
    kony.apps.coe.ess.Approvals.MultiSelect.getSelectedID(frmMultiSelection.SegDetails.selectedRowItems, "0");
    showApprovalHome();
}