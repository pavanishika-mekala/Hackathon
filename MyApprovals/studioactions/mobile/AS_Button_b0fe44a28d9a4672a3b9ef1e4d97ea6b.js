function AS_Button_b0fe44a28d9a4672a3b9ef1e4d97ea6b(eventobject, context) {
    if (kony.application.getCurrentForm().id == "frmRequestedList") {
        try {
            var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalRequestDetail");
            var selectedApprovalId = frmRequestedList.SegDetails.selectedRowItems[0].ID;
            formController.loadDataAndShowForm(selectedApprovalId)
        } catch (e) {
            handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.unableToLoadForm"));
        }
    }
}