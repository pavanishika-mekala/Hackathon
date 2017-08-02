function AS_SegDetails_RowClick(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_8aedcc1246484f6188d52ab888344712(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_8aedcc1246484f6188d52ab888344712(eventobject, sectionNumber, rowNumber) {
    try {
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalRequestDetail");
        var selectedApprovalId = frmRequestedList.SegDetails.selectedRowItems[0].ID;
        formController.loadDataAndShowForm(selectedApprovalId)
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.unableToLoadForm"));
    }
}