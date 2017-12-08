function ActionOnSearchIconClick(eventobject) {
    return AS_FlexContainer_d63ba8e20acd4ad283f8976fb7170ce2(eventobject);
}

function AS_FlexContainer_d63ba8e20acd4ad283f8976fb7170ce2(eventobject) {
    frmCreateViewDW.flxAdvSeg.setVisibility(true);
    frmCreateViewDW.lblAdd.setVisibility(true);
    frmCreateViewDW.flxAdvSearchSegDropdown.setVisibility(false);
    frmCreateViewDW.forceLayout();
}