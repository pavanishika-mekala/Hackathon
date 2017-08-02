function AS_Segment_onRowClickSegList(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_cd44310149cc4be78ae82cdc613bcfa2(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_cd44310149cc4be78ae82cdc613bcfa2(eventobject, sectionNumber, rowNumber) {
    try {
        var formController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmApprovalRequestDetail");
        var contextData = frmSearch.segList.selectedItems[0];
        formController.loadDataAndShowForm(contextData.ID)
    } catch (e) {
        handleError(new appException(kony.i18n.getLocalizedString("i18n.ess.frmSearch.ErrorMessage.requestDetails")));
    }
}