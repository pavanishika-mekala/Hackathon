function onRowClickOfAttachmentSegemntTab(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_c12223a2ce584a299b472e7868275d96(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_c12223a2ce584a299b472e7868275d96(eventobject, sectionNumber, rowNumber) {
    try {
        kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.openPdf(frmApprovalRequestDetail.SegAttachments.selectedRowItems[0].Media, false);
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
        kony.print("Error while fetching pdf " + e.message);
    }
}