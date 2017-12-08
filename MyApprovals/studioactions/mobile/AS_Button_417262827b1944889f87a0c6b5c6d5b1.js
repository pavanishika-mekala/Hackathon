function AS_Button_417262827b1944889f87a0c6b5c6d5b1(eventobject) {
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