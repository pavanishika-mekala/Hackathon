function ActionOnReconfigure(eventobject) {
    return AS_FlexContainer_e98c645c84de4f80bd0209b0c8b25f90(eventobject);
}

function AS_FlexContainer_e98c645c84de4f80bd0209b0c8b25f90(eventobject) {
    frmLoginDesk.flxLoginMain.setVisibility(false);
    frmLoginDesk.flxReconfigure.setVisibility(true);
    frmLoginDesk.forceLayout();
}