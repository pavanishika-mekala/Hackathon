function action_purchase_order_reject(eventobject, context) {
    return AS_Button_f4abfe00419d4095958716d0bf3f045d(eventobject, context);
}

function AS_Button_f4abfe00419d4095958716d0bf3f045d(eventobject, context) {
    kony.apps.coe.ess.Approvals.ApprovalsHome.updateApproval(frmApprovalHome.segApprovalsList.selectedRowItems[0].approval_id, "1", context.rowIndex);
}