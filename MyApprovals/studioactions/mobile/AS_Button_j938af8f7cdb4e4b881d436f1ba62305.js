function AS_Button_j938af8f7cdb4e4b881d436f1ba62305(eventobject) {
    kony.apps.coe.ess.Approvals.ApprovalsHome.sliderAnimationToNow();
    //clear filter Data
    kony.apps.coe.ess.Approvals.ApprovalsHome.clearDataofFilter();
    kony.apps.coe.ess.Approvals.ApprovalsHome.SPAPreshow();
    frmApprovalHome.flxFiter.isVisible = false;
    frmApprovalHome.imgSPAFilter.src = "filter_unselected.png";
    frmApprovalHome.segApprovalsList.top = "0%";
    frmApprovalHome.flxFooterOptions.isVisible = false;
    frmApprovalHome.imgOption1.src = "circleinactive.png";
    frmApprovalHome.imgOption2.src = "circleinactive.png";
    frmApprovalHome.imgOption3.src = "circleinactive.png";
    frmApprovalHome.forceLayout();
}