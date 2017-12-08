function actiontoOpenPDFInApprovalRequestDetail(eventobject, x, y) {
    return AS_Image_4d6c3e7463c045e3b35106639c0c51db(eventobject, x, y);
}

function AS_Image_4d6c3e7463c045e3b35106639c0c51db(eventobject, x, y) {
    try {
        kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.openPdf(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.systemGeneratedAttachments[0].Media, true);
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
        kony.print("Error while fetching pdf " + e.message);
    }
}