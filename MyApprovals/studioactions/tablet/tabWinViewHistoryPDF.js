function tabWinViewHistoryPDF(eventobject) {
    return AS_FlexContainer_362bdd483bd24cd4a7ebd6eecb499cbb(eventobject);
}

function AS_FlexContainer_362bdd483bd24cd4a7ebd6eecb499cbb(eventobject) {
    try {
        openPdfTab(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailDataTab.systemGeneratedAttachments[0].Media, true);
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
        kony.print("Error while fetching pdf " + e.message);
    }
}