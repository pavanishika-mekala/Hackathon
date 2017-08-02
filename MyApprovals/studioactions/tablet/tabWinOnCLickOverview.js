function tabWinOnCLickOverview(eventobject) {
    return AS_FlexContainer_d87da55bddb5425db2048cbf7507b20f(eventobject);
}

function AS_FlexContainer_d87da55bddb5425db2048cbf7507b20f(eventobject) {
    frmTabReqTypeView.flxFulldetails.skin = "slFbox";
    frmTabReqTypeView.lblFullDetails.skin = "sknWinLblAttachment12636d";
    frmTabReqTypeView.flxAuditTrail.skin = "slFbox";
    frmTabReqTypeView.lblAuditTrail.skin = "sknWinLblAttachment12636d";
    frmTabReqTypeView.flxAttachments.skin = "slFbox";
    frmTabReqTypeView.lblAttachments.skin = "sknWinLblAttachment12636d";
    frmTabReqTypeView.flxOverview.skin = "sknWinFlxOverviewFFFFFF";
    frmTabReqTypeView.lblOverview.skin = "sknWinLblOverviewffffff";
    kony.pprint("Flx 2 is executing");
    frmTabReqTypeView.flx2.isVisible = true;
    kony.print("Flx 2 executed");
    frmTabReqTypeView.flx3.isVisible = true;
    frmTabReqTypeView.flxAttachment.isVisible = false;
    frmTabReqTypeView.flxAudit.isVisible = false;
    frmTabReqTypeView.flxDetails.isVisible = false;
}