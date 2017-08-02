function actiononDoneclickhistoryTab(eventobject) {
    return AS_FlexContainer_e03fa4456d264923b6e401fc437a741a(eventobject);
}

function AS_FlexContainer_e03fa4456d264923b6e401fc437a741a(eventobject) {
    frmTabApprovalHistory.flexDynamicPplsLayout.setVisibility(false);
    frmTabApprovalHistory.flxbottomPplSelection.setVisibility(false);
    ctppl = 1;
    (new kony.apps.coe.ess.FilterHistory()).popDownPplLayout();
    frmTabApprovalHistory.flexselpplsH.setVisibility(true);
}