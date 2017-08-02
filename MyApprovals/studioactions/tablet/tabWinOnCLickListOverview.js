function tabWinOnCLickListOverview(eventobject) {
    return AS_FlexContainer_56f552859c6a48db886a67a3ceeea9ee(eventobject);
}

function AS_FlexContainer_56f552859c6a48db886a67a3ceeea9ee(eventobject) {
    frmTabListView.flxFulldetails.skin = "slFbox";
    frmTabListView.lblFullDetails.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxAuditTrail.skin = "slFbox";
    frmTabListView.lblAuditTrail.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxAttachments.skin = "slFbox";
    frmTabListView.lblAttachments.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxOverview.skin = "sknWinFlxOverviewFFFFFF";
    frmTabListView.lblOverview.skin = "sknWinLblOverviewffffff";
    frmTabListView.flxAttachment.isVisible = false;
    kony.print("Flx 2 executing");
    frmTabListView.flx2.isVisible = true;
    kony.print("Flx 2 executed");
    frmTabListView.flx3.isVisible = true;
    frmTabListView.flxAudit.isVisible = false;
    frmTabListView.flxDetails.isVisible = false;
}