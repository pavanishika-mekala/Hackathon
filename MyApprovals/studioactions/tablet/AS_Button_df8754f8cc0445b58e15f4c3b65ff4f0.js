function AS_Button_df8754f8cc0445b58e15f4c3b65ff4f0(eventobject, context) {
    if (kony.application.getCurrentForm().id == "frmRequestedList") {
        kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.approveRequest(frmRequestedList.SegDetails.selectedRowItems[0].ID);
    }
}