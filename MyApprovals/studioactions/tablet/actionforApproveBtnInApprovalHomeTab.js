function actionforApproveBtnInApprovalHomeTab(eventobject, context) {
    return AS_Button_c501337aab184b828adb2e5f8f5b4f37(eventobject, context);
}

function AS_Button_c501337aab184b828adb2e5f8f5b4f37(eventobject, context) {
    kony.apps.coe.ess.Approvals.ApprovalsHome.approveRequest(context);
}