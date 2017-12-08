function AS_Button_e85036aaff3a492e84196dbceacde823(eventobject) {
    return AS_Button_he17ad55072044a8975e36cffaccb491(eventobject);
}

function AS_Button_he17ad55072044a8975e36cffaccb491(eventobject) {
    var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalHome");
    formController.loadDataAndShowForm()
}