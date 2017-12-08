function AS_Button_fd47d4907396453fabf2b2908acc5cbc(eventobject) {
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