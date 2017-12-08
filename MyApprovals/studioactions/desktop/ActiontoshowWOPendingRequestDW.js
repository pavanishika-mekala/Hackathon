function ActiontoshowWOPendingRequestDW(eventobject) {
    return AS_FlexContainer_1e9c2fba73d04dae9a7031c812a46d5c(eventobject);
}

function AS_FlexContainer_1e9c2fba73d04dae9a7031c812a46d5c(eventobject) {
    (new kony.apps.coe.ess.frmPendingUIDW()).onClickOfLeaveReq();
    (new kony.apps.coe.ess.frmPendingUIDW()).filterPendingRequest("PURCHASEORDER");
}