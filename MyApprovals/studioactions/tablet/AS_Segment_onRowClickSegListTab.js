function AS_Segment_onRowClickSegListTab(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_d6537fe54400465c9b5b00876f13ccec(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_d6537fe54400465c9b5b00876f13ccec(eventobject, sectionNumber, rowNumber) {
    try {
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalRequestDetail");
        var contextData = frmSearch.segList.selectedItems[0];
        formController.loadDataAndShowForm(contextData.ID)
    } catch (e) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.requestDetails")));
    }
}