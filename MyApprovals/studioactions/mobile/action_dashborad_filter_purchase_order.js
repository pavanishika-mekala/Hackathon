function action_dashborad_filter_purchase_order(eventobject) {
    return AS_Button_b17f3b2e59454407bac543705d2de5b4(eventobject);
}

function AS_Button_b17f3b2e59454407bac543705d2de5b4(eventobject) {
    kony.apps.coe.ess.Approvals.ApprovalsHome.selectType(this);
    frmApprovalHome.flxScrlCategory.scrollToEnd();
}