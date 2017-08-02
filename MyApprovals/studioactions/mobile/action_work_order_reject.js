function action_work_order_reject(eventobject, context) {
    return AS_Button_b63f6706913a452f92047edfde00a0a9(eventobject, context);
}

function AS_Button_b63f6706913a452f92047edfde00a0a9(eventobject, context) {
    kony.apps.coe.ess.Approvals.ApprovalsHome.updateApproval(frmApprovalHome.segApprovalsList.selectedRowItems[0].approval_id, "1", context.rowIndex);
}