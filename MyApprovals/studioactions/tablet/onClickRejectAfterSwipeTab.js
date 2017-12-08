function onClickRejectAfterSwipeTab(eventobject, context) {
    return AS_Button_a89f068d0d5a4e9e93ea8063f6357c62(eventobject, context);
}

function AS_Button_a89f068d0d5a4e9e93ea8063f6357c62(eventobject, context) {
    try {
        kony.apps.coe.ess.Approvals.ApprovalRequests.Dataoperations.rejectRequest(frmRequestedList.SegDetails.selectedRowItems[0].ID);
    } catch (e) {
        handleError(e);
    }
}