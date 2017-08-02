function AS_FlexContainer_FooterApprovals(eventobject) {
    return AS_FlexContainer_8fb3ef58f00d4abcb9427bebbe594d80(eventobject);
}

function AS_FlexContainer_8fb3ef58f00d4abcb9427bebbe594d80(eventobject) {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
    formController.loadDataAndShowForm()
}