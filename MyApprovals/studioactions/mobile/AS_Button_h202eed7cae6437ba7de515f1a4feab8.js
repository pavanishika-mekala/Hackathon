function AS_Button_h202eed7cae6437ba7de515f1a4feab8(eventobject, context) {
    //kony.apps.coe.ess.Approvals.ApprovalsHome.rejectRequest(context);
    try {
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalRequestDetail");
        if (kony.apps.coe.ess.globalVariables.isSPA) {
            var selectedApprovalId = frmApprovalHome.segApprovalsList.selecteditems[0].ID
        } else {
            var selectedApprovalId = frmApprovalHome.segApprovalsList.selectedRowItems[0].ID;
        }
        formController.loadDataAndShowForm(selectedApprovalId)
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.unableToLoadForm"));
    }
}