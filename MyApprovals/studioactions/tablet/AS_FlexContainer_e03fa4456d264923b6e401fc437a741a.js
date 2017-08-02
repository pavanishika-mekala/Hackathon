function AS_FlexContainer_e03fa4456d264923b6e401fc437a741a(eventobject) {
    frmTabApprovalHistory.flexDynamicPplsLayout.setVisibility(false);
    frmTabApprovalHistory.flxbottomPplSelection.setVisibility(false);
    ctppl = 1;
    if (kony.apps.coe.ess.ApprovalHistoryTab.selectedPpls.length > 0) frmTabApprovalHistory.flexselpplsH.setVisibility(true);
    for (var i = 0; i < 6 && i < kony.apps.coe.ess.ApprovalHistoryTab.selectedPpls.length; i++) {
        frmTabApprovalHistory["flexppl" + i].setVisibility(true);
    }
}