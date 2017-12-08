function AS_SegDetails_RowClickTab(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_g26635b4e77242e089adfa26ffa5e2b3(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_g26635b4e77242e089adfa26ffa5e2b3(eventobject, sectionNumber, rowNumber) {
    try {
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalRequestDetail");
        var selectedApprovalId = frmRequestedList.SegDetails.selectedRowItems[0].ID;
        formController.loadDataAndShowForm(selectedApprovalId)
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.unableToLoadForm"));
    }
}