function ActiontoshowLeaveRequestListDW(eventobject, x, y) {
    return AS_FlexContainer_14c538dfb0154944a274cd612e9c9084(eventobject, x, y);
}

function AS_FlexContainer_14c538dfb0154944a274cd612e9c9084(eventobject, x, y) {
    (new kony.apps.coe.ess.frmPendingUIDW()).onClickOfLeaveReq();
    (new kony.apps.coe.ess.frmPendingUIDW()).filterPendingRequest("LEAVE");
}