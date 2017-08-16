function OnHideButtonFilter(eventobject) {
    return AS_FlexContainer_c25cc16a2e4c4a77a440d88aa8ca88af(eventobject);
}

function AS_FlexContainer_c25cc16a2e4c4a77a440d88aa8ca88af(eventobject) {
    frmPendingLeaveRequestsDW.flxFilter.setVisibility(false);
    frmPendingLeaveRequestsDW.segPendingLeaves.top = "0dp";
    frmPendingLeaveRequestsDW.segPendingLeaves.height = "700dp";
}