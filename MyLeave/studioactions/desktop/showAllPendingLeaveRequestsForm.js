function showAllPendingLeaveRequestsForm(eventobject) {
    return AS_FlexContainer_0a7ca0b9f87e4e34945dc1d2562c25fc(eventobject);
}

function AS_FlexContainer_0a7ca0b9f87e4e34945dc1d2562c25fc(eventobject) {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmPendingLeaveRequestsDW");
    formController.loadDataAndShowForm();
}