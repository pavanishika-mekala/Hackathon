function ActionOnAdvSearchIconClick(eventobject) {
    return AS_FlexContainer_8c119ef8a9bd4188b84a0c4c5b7113fd(eventobject);
}

function AS_FlexContainer_8c119ef8a9bd4188b84a0c4c5b7113fd(eventobject) {
    frmCreateViewDW.flxAdvSeg.setVisibility(true);
    frmCreateViewDW.lblAdd.setVisibility(true);
    frmCreateViewDW.flxAdvSearchSegDropdown.setVisibility(false);
    frmCreateViewDW.forceLayout();
}