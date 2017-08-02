function actionforApproveBtnInApprovalHome(eventobject, context) {
    return AS_Button_cfe64cfc68ab479b8cc53459ac940c75(eventobject, context);
}

function AS_Button_cfe64cfc68ab479b8cc53459ac940c75(eventobject, context) {
    kony.apps.coe.ess.Approvals.ApprovalsHome.approveRequest(context);
}