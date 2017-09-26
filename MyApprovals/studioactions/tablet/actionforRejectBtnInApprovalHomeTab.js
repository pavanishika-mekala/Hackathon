function actionforRejectBtnInApprovalHomeTab(eventobject, context) {
    return AS_Button_gf9013b571574a29bb7a28fa3e701d6b(eventobject, context);
}

function AS_Button_gf9013b571574a29bb7a28fa3e701d6b(eventobject, context) {
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