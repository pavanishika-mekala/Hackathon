function onClickBackSettingTab(eventobject) {
    return AS_FlexContainer_82bc33a9e3c24dc3a802aa9deb1a67c7(eventobject);
}

function AS_FlexContainer_82bc33a9e3c24dc3a802aa9deb1a67c7(eventobject) {
    var frmController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.getPreviousFormID());
    frmController.loadDataAndShowForm();
}