function tabWinOnClickFullDetails(eventobject) {
    return AS_FlexContainer_e4a424dd6573437fa840d9dec07a9b0a(eventobject);
}

function AS_FlexContainer_e4a424dd6573437fa840d9dec07a9b0a(eventobject) {
    frmTabReqTypeView.flxFulldetails.skin = "sknWinFlxOverviewFFFFFF";
    frmTabReqTypeView.lblFullDetails.skin = "sknWinLblOverviewffffff";
    frmTabReqTypeView.flxAuditTrail.skin = "slFbox";
    frmTabReqTypeView.lblAuditTrail.skin = "sknWinLblAttachment12636d";
    frmTabReqTypeView.flxAttachments.skin = "slFbox";
    frmTabReqTypeView.lblAttachments.skin = "sknWinLblAttachment12636d";
    frmTabReqTypeView.flxOverview.skin = "slFbox";
    frmTabReqTypeView.lblOverview.skin = "sknWinLblAttachment12636d";
    frmTabReqTypeView.flxAttachment.isVisible = false;
    frmTabReqTypeView.flxAudit.isVisible = false;
    frmTabReqTypeView.flxDetails.isVisible = true;
    frmTabReqTypeView.flx2.isVisible = false;
    frmTabReqTypeView.flx3.isVisible = false;
}