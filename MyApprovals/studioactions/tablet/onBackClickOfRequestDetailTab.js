function onBackClickOfRequestDetailTab(eventobject) {
    return AS_FlexContainer_i8f0e3c748054f73b8151eaba4ebda4c(eventobject);
}

function AS_FlexContainer_i8f0e3c748054f73b8151eaba4ebda4c(eventobject) {
    var frmController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.getPreviousFormID());
    frmController.loadDataAndShowForm();
}