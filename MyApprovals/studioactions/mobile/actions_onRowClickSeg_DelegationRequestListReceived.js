function actions_onRowClickSeg_DelegationRequestListReceived(eventobject) {
    return AS_Button_a1d196c193364fde8d0c4fcfe93c263c(eventobject);
}

function AS_Button_a1d196c193364fde8d0c4fcfe93c263c(eventobject) {
    kony.apps.coe.ess.Approvals.DelegationRequestList.Actions.getInstance().onClickOfReceived();
}