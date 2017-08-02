function ActiontoshowExpenselistPendingRequestDW(eventobject) {
    return AS_FlexContainer_01a6f4c32ec245e38d72c370d2236960(eventobject);
}

function AS_FlexContainer_01a6f4c32ec245e38d72c370d2236960(eventobject) {
    (new kony.apps.coe.ess.frmPendingUIDW()).onClickOfExpenseReq();
    (new kony.apps.coe.ess.frmPendingUIDW()).filterPendingRequest("EXPENSES");
}