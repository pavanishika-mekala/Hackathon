function AS_Button_ea904c28fbe246a199323e0227702d61(eventobject, context) {
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