function tabWinOnClickListAttachments(eventobject) {
    return AS_FlexContainer_7d8461e8589645b1b722af7344941cff(eventobject);
}

function AS_FlexContainer_7d8461e8589645b1b722af7344941cff(eventobject) {
    frmTabListView.flxFulldetails.skin = "slFbox";
    frmTabListView.lblFullDetails.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxAuditTrail.skin = "slFbox";
    frmTabListView.lblAuditTrail.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxAttachments.skin = "sknWinFlxOverviewFFFFFF";
    frmTabListView.lblAttachments.skin = "sknWinLblOverviewffffff";
    frmTabListView.flxOverview.skin = "slFbox";
    frmTabListView.lblOverview.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxAttachment.isVisible = true;
    frmTabListView.flx2.isVisible = false;
    frmTabListView.flx3.isVisible = false;
    frmTabListView.flxAudit.isVisible = false;
    frmTabListView.flxDetails.isVisible = false;
}