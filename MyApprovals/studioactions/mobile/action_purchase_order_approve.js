function action_purchase_order_approve(eventobject, context) {
    return AS_Button_8bf713c3bcf94f8ea427cf6864c6e307(eventobject, context);
}

function AS_Button_8bf713c3bcf94f8ea427cf6864c6e307(eventobject, context) {
    kony.apps.coe.ess.Approvals.ApprovalsHome.updateApproval(frmApprovalHome.segApprovalsList.selectedRowItems[0].approval_id, "0", context.rowIndex);
}