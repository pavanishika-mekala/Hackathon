function actionforRejectInApprovalRequestDetailForm(eventobject, context) {
    return AS_Button_0a344571d111421d925753b75856e63c(eventobject, context);
}

function AS_Button_0a344571d111421d925753b75856e63c(eventobject, context) {
    if (frmApprovalRequestDetail.txtareaComments.text === "") {
        toastMsg.showToastMsg(kony.i18n.getLocalizedString("i18n.ess.myApprovals.frmMyAopprovalsHome.isMandatoryComment"), 3000);
    } else {
        kony.apps.coe.ess.Approvals.frmApprovalRequestDetail.onClickReject();
    }
}