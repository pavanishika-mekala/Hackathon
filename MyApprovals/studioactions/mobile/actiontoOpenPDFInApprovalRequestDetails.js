function actiontoOpenPDFInApprovalRequestDetails(eventobject, x, y) {
    return AS_Image_d6f9f8c53ab74225814f0a40a539572e(eventobject, x, y);
}

function AS_Image_d6f9f8c53ab74225814f0a40a539572e(eventobject, x, y) {
    try {
        kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.openPdf(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.systemGeneratedAttachments[0].Media, true);
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
        kony.print("Error while fetching pdf " + e.message);
    }
}