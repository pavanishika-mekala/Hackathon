function AS_Button_b60ae81b2b3b411d8391e195435dee39(eventobject, context) {
    if (kony.application.getCurrentForm().id == "frmRequestedList") {
        kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.approveRequest(frmRequestedList.SegDetails.selectedRowItems[0].ID);
    }
}