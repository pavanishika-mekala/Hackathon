function action_work_order_later(eventobject, context) {
    return AS_Button_35f1b675809b4e15bfb62ba477829dbf(eventobject, context);
}

function AS_Button_35f1b675809b4e15bfb62ba477829dbf(eventobject, context) {
    kony.apps.coe.ess.Approvals.ApprovalsHome.markAsLater(frmApprovalHome.segApprovalsList.selectedRowItems[0].approval_id, context.rowIndex);
}