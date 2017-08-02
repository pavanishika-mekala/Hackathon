function action_purchase_order_later(eventobject, context) {
    return AS_Button_b2b7d98da1584ffb98d8f73be9f4ce20(eventobject, context);
}

function AS_Button_b2b7d98da1584ffb98d8f73be9f4ce20(eventobject, context) {
    kony.apps.coe.ess.Approvals.ApprovalsHome.markAsLater(frmApprovalHome.segApprovalsList.selectedRowItems[0].approval_id, context.rowIndex);
}