function actionforbtnBackInApprovalRequestDetail(eventobject) {
    return AS_Button_678b3f2879b546028dadeb6f7a8aaa84(eventobject);
}

function AS_Button_678b3f2879b546028dadeb6f7a8aaa84(eventobject) {
    var frmController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.getPreviousFormID());
    frmController.loadDataAndShowForm();
}