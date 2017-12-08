function onClickApproveAfterswipe(eventobject, context) {
    return AS_Button_9fe04ac569c64955b70da8653aab96a4(eventobject, context);
}

function AS_Button_9fe04ac569c64955b70da8653aab96a4(eventobject, context) {
    try {
        kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.approveRequest(frmRequestedList.SegDetails.selectedRowItems[0].ID);
    } catch (e) {
        handleError(e);
    }
}