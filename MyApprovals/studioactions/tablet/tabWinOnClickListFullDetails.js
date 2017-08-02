function tabWinOnClickListFullDetails(eventobject) {
    return AS_FlexContainer_29f9e2cbae9f48e18ffed28b618cb2d9(eventobject);
}

function AS_FlexContainer_29f9e2cbae9f48e18ffed28b618cb2d9(eventobject) {
    frmTabListView.flxFulldetails.skin = "sknWinFlxOverviewFFFFFF";
    frmTabListView.lblFullDetails.skin = "sknWinLblOverviewffffff";
    frmTabListView.flxAuditTrail.skin = "slFbox";
    frmTabListView.lblAuditTrail.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxAttachments.skin = "slFbox";
    frmTabListView.lblAttachments.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxOverview.skin = "slFbox";
    frmTabListView.lblOverview.skin = "sknWinLblAttachment12636d";
    frmTabListView.flxAttachment.isVisible = false;
    frmTabListView.flxAudit.isVisible = false;
    frmTabListView.flxDetails.isVisible = true;
    frmTabListView.flx2.isVisible = false;
    frmTabListView.flx3.isVisible = false;
}