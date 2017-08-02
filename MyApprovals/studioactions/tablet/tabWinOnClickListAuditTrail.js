function tabWinOnClickListAuditTrail(eventobject) {
    return AS_FlexContainer_cf14b1d22f054a3184898acd441e1885(eventobject);
}

function AS_FlexContainer_cf14b1d22f054a3184898acd441e1885(eventobject) {
    frmTabListView.flxFulldetails.skin = "slFbox";
    frmTabListView.lblFullDetails.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxAuditTrail.skin = "sknWinFlxOverviewFFFFFF";
    frmTabListView.lblAuditTrail.skin = "sknWinLblOverviewffffff";
    frmTabListView.flxAttachments.skin = "slFbox";
    frmTabListView.lblAttachments.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxOverview.skin = "slFbox";
    frmTabListView.lblOverview.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxAttachment.isVisible = false;
    frmTabListView.flxAudit.isVisible = true;
    frmTabListView.flxDetails.isVisible = false;
    frmTabListView.flx2.isVisible = false;
    frmTabListView.flx3.isVisible = false;
}