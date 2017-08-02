function OnClickRejectMultiSelect(eventobject) {
    return AS_Button_cffd3ce5ab724b738b20e28482a6213e(eventobject);
}

function AS_Button_cffd3ce5ab724b738b20e28482a6213e(eventobject) {
    kony.apps.coe.ess.Approvals.MultiSelect.getSelectedID(frmMultiSelection.SegDetails.selectedRowItems, "1");
    showApprovalHome();
}