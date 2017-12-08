function act_BtnLangTab(eventobject) {
    return AS_Button_d355f8ca18a74463aa356507b55d3f67(eventobject);
}

function AS_Button_d355f8ca18a74463aa356507b55d3f67(eventobject) {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
    formController.loadDataAndShowForm()
}