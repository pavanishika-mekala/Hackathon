function tabWinOnClickAuditTrail(eventobject) {
    return AS_FlexContainer_34eb9107510a4db8bc0c443e24bc9ea7(eventobject);
}

function AS_FlexContainer_34eb9107510a4db8bc0c443e24bc9ea7(eventobject) {
    frmTabReqTypeView.flxFulldetails.skin = "slFbox";
    frmTabReqTypeView.lblFullDetails.skin = "sknWinLblAttachment12636d";
    frmTabReqTypeView.flxAuditTrail.skin = "sknWinFlxOverviewFFFFFF";
    frmTabReqTypeView.lblAuditTrail.skin = "sknWinLblOverviewffffff";
    frmTabReqTypeView.flxAttachments.skin = "slFbox";
    frmTabReqTypeView.lblAttachments.skin = "sknWinLblAttachment12636d";
    frmTabReqTypeView.flxOverview.skin = "slFbox";
    frmTabReqTypeView.lblOverview.skin = "sknWinLblAttachment12636d";
    frmTabReqTypeView.flxAttachment.isVisible = false;
    frmTabReqTypeView.flxAudit.isVisible = true;
    frmTabReqTypeView.flxDetails.isVisible = false;
    frmTabReqTypeView.flx2.isVisible = false;
    frmTabReqTypeView.flx3.isVisible = false;
}