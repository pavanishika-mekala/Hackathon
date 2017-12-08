function ActiontoShowPOPendingRequestDW(eventobject) {
    return AS_FlexContainer_0bd164ab47d64788bc3fb440c5fc30f5(eventobject);
}

function AS_FlexContainer_0bd164ab47d64788bc3fb440c5fc30f5(eventobject) {
    (new kony.apps.coe.ess.frmPendingUIDW()).onClickOfPurchaseReq();
    (new kony.apps.coe.ess.frmPendingUIDW()).filterPendingRequest("PURCHASEREQUISITION");
}