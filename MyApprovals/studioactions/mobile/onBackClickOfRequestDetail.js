function onBackClickOfRequestDetail(eventobject) {
    return AS_FlexContainer_f94a98c43549470697e5ceb5d12bdadd(eventobject);
}

function AS_FlexContainer_f94a98c43549470697e5ceb5d12bdadd(eventobject) {
    var frmController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.getPreviousFormID());
    frmController.loadDataAndShowForm();
}