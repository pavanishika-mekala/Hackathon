function ActionOnAddBreakIconClick(eventobject) {
    return AS_FlexContainer_445ac338f21d48688e688e272a5e5f7d(eventobject);
}

function AS_FlexContainer_445ac338f21d48688e688e272a5e5f7d(eventobject) {
    frmCreateViewDW.flxBlank.setVisibility(true);
    frmCreateViewDW.flxSelectBreak.setVisibility(true);
    frmCreateViewDW.flxTask.setVisibility(false);
    frmCreateViewDW.forceLayout();
}