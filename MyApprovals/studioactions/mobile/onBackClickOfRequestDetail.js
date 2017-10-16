function onBackClickOfRequestDetail(eventobject) {
    return AS_FlexContainer_f94a98c43549470697e5ceb5d12bdadd(eventobject);
}

function AS_FlexContainer_f94a98c43549470697e5ceb5d12bdadd(eventobject) {
    var prevForm = kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.getPreviousFormID();
    var frmController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(prevForm);
    if (prevForm == "frmSearch") {
        kony.apps.coe.ess.Approvals.frmSearch.showFilteredData();
    } else {
        frmController.loadDataAndShowForm();
    }
}