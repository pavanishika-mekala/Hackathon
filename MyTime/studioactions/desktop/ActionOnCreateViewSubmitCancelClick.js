function ActionOnCreateViewSubmitCancelClick(eventobject, x, y) {
    return AS_Label_c8538de595fa4f0dbdba909b9bbc998d(eventobject, x, y);
}

function AS_Label_c8538de595fa4f0dbdba909b9bbc998d(eventobject, x, y) {
    frmCreateViewDW.flxBlank.setVisibility(false);
    frmCreateViewDW.flxSubmitPopup.setVisibility(false);
    frmCreateViewDW.forceLayout();
}