function actiontoOpenPDFInApprovalRequestDetailsTab(eventobject, x, y) {
    return AS_Image_i3693fcc0cbe48a5a59da361dfbd2049(eventobject, x, y);
}

function AS_Image_i3693fcc0cbe48a5a59da361dfbd2049(eventobject, x, y) {
    try {
        kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.openPdf(kony.apps.coe.ess.globalVariables.ApprovalRequestDetailData.systemGeneratedAttachments[0].Media, true);
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
        kony.print("Error while fetching pdf " + e.message);
    }
}