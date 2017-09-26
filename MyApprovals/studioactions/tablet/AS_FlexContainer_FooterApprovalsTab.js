function AS_FlexContainer_FooterApprovalsTab(eventobject) {
    return AS_FlexContainer_c82df87efb99403dae978f9de3936a7b(eventobject);
}

function AS_FlexContainer_c82df87efb99403dae978f9de3936a7b(eventobject) {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
    formController.loadDataAndShowForm()
}