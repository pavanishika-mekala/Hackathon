function onBackClickOfRequestDetailTab(eventobject) {
    return AS_FlexContainer_i8f0e3c748054f73b8151eaba4ebda4c(eventobject);
}

function AS_FlexContainer_i8f0e3c748054f73b8151eaba4ebda4c(eventobject) {
    var prevForm = kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.getPreviousFormID();
    var frmController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(prevForm);
    if (prevForm == "frmSearch") {
        kony.apps.coe.ess.Approvals.frmSearch.showFilteredData();
    } else {
        frmController.loadDataAndShowForm();
    }
}