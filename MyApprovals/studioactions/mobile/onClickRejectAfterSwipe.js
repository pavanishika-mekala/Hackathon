function onClickRejectAfterSwipe(eventobject, context) {
    return AS_Button_c49577c08a464d6b9943c26d6396b6d5(eventobject, context);
}

function AS_Button_c49577c08a464d6b9943c26d6396b6d5(eventobject, context) {
    try {
        kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.rejectRequest(frmRequestedList.SegDetails.selectedRowItems[0].ID);
    } catch (e) {
        handleError(e);
    }
}