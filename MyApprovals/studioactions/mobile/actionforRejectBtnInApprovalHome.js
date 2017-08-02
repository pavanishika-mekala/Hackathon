function actionforRejectBtnInApprovalHome(eventobject, context) {
    return AS_Button_f2323d07756c49a5a4daad7e146b14cf(eventobject, context);
}

function AS_Button_f2323d07756c49a5a4daad7e146b14cf(eventobject, context) {
    kony.apps.coe.ess.Approvals.ApprovalsHome.rejectRequest(context);
}