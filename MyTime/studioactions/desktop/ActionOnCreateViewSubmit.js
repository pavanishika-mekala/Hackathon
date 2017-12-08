function ActionOnCreateViewSubmit(eventobject) {
    return AS_FlexContainer_e5c5036502e141d59292f56404fbc0d8(eventobject);
}

function AS_FlexContainer_e5c5036502e141d59292f56404fbc0d8(eventobject) {
    frmCreateViewDW.flxBlank.setVisibility(true);
    frmCreateViewDW.flxSubmitPopup.setVisibility(true);
    frmCreateViewDW.flxTask.setVisibility(false);
    frmCreateViewDW.forceLayout();
}