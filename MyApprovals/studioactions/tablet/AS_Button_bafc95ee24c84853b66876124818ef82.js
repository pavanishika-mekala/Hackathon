function AS_Button_bafc95ee24c84853b66876124818ef82(eventobject, context) {
    if (frmApprovalRequestDetail.txtareaComments.text === "") {
        toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.myApprovals.frmMyAopprovalsHome.isMandatoryComment"), 3000);
    } else {
        kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.onClickReject();
    }
}