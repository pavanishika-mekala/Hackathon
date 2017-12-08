function onRowClickOfAttachmentSegemnt(eventobject, sectionNumber, rowNumber) {
    return AS_Segment_34da50dbcb2d48bdb62a4a2f5583beef(eventobject, sectionNumber, rowNumber);
}

function AS_Segment_34da50dbcb2d48bdb62a4a2f5583beef(eventobject, sectionNumber, rowNumber) {
    try {
        kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.openPdf(frmApprovalRequestDetail.SegAttachments.selectedRowItems[0].Media, false);
    } catch (e) {
        handleError(kony.i18n.getLocalizedString("i18n.ess.myApprovals.pdfErrorMsg"));
        kony.print("Error while fetching pdf " + e.message);
    }
}