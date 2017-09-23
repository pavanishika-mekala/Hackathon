function AS_segApprovalRequest_RowClickTab(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_i756659e2e1c42a1bffd2e84f836d638(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_i756659e2e1c42a1bffd2e84f836d638(eventobject, sectionNumber, rowNumber) {
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