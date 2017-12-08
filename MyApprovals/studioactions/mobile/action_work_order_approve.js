function action_work_order_approve(eventobject, context) {
    return AS_Button_864ea25e4d5f4fd5b20c377a8646dc45(eventobject, context);
}

function AS_Button_864ea25e4d5f4fd5b20c377a8646dc45(eventobject, context) {
    kony.apps.coe.ess.Approvals.ApprovalsHome.updateApproval(frmApprovalHome.segApprovalsList.selectedRowItems[0].approval_id, "0", context.rowIndex);
}