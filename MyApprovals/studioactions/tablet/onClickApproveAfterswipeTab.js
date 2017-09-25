function onClickApproveAfterswipeTab(eventobject, context) {
    return AS_Button_eadf57faadef45c980e4a41b4d9cd496(eventobject, context);
}

function AS_Button_eadf57faadef45c980e4a41b4d9cd496(eventobject, context) {
    try {
        kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.approveRequest(frmRequestedList.SegDetails.selectedRowItems[0].ID);
    } catch (e) {
        handleError(e);
    }
}